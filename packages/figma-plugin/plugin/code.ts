/**
 * Nordlig DS Import — Figma Plugin
 *
 * Creates Figma Variables from extracted token data and
 * Figma Components from extracted component data.
 * Generates Design System documentation pages.
 */

import { generateDocumentation } from './generate-docs';

// --- Types (matching extractor output) ---

interface TokenVariable {
  type: 'COLOR' | 'FLOAT';
  scopes?: string[];
  [mode: string]: string | number | string[] | undefined;
}

interface TokenCollection {
  modes: string[];
  variables: Record<string, TokenVariable>;
}

interface TokenData {
  collections: Record<string, TokenCollection>;
}

interface ExtractedLayout {
  width: number;
  height: number;
  direction: 'HORIZONTAL' | 'VERTICAL';
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
  primaryAxisAlign: string;
  counterAxisAlign: string;
}

interface ExtractedStyles {
  fills: { token: string | null; value: string };
  strokes: { token: string | null; value: string } | null;
  strokeWeight: number;
  strokeSides?: { top: number; right: number; bottom: number; left: number };
  cornerRadius: number;
  opacity?: number;
}

interface ExtractedText {
  content: string;
  fills: { token: string | null; value: string };
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
}

interface ChildNode {
  type: 'icon' | 'text' | 'frame' | 'close-button';
  name: string;
  layout?: ExtractedLayout;
  styles?: Partial<ExtractedStyles>;
  text?: ExtractedText;
  iconSize?: number;
  svgData?: string;
  iconRef?: { component: string; variant: Record<string, string> };
  children?: ChildNode[];
  tokenBindings?: Record<string, string>;
}

interface ExtractedCombination {
  props: Record<string, string>;
  label: string;
  layout: ExtractedLayout;
  styles: ExtractedStyles;
  text: ExtractedText;
  children?: ChildNode[];
  svgData?: string;
  tokenBindings?: Record<string, string>;
}

interface ComponentData {
  name: string;
  category: string;
  variants: Record<string, string[]>;
  defaultVariant: Record<string, string>;
  combinations: ExtractedCombination[];
}

// --- Helper Functions ---

function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

function hexToFigmaRGB(hex: string): RGB | null {
  if (!isValidHex(hex)) return null;
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var r = parseInt(hex.slice(0, 2), 16) / 255;
  var g = parseInt(hex.slice(2, 4), 16) / 255;
  var b = parseInt(hex.slice(4, 6), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r: r, g: g, b: b };
}

function hexToSolidPaint(hex: string): SolidPaint | null {
  var rgb = hexToFigmaRGB(hex);
  if (!rgb) return null;
  return { type: 'SOLID', color: rgb };
}

function fontWeightToStyle(weight: number): string {
  if (weight <= 300) return 'Light';
  if (weight <= 400) return 'Regular';
  if (weight <= 500) return 'Medium';
  if (weight <= 600) return 'SemiBold';
  if (weight <= 700) return 'Bold';
  return 'ExtraBold';
}

// --- Token Import ---

async function importTokens(data: TokenData): Promise<Map<string, Variable>> {
  const variableMap = new Map<string, Variable>();
  let totalCreated = 0;
  let totalAliases = 0;
  let totalRemoved = 0;

  // Clean up existing Nordlig collections to avoid duplicates
  var existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
  for (var ci = 0; ci < existingCollections.length; ci++) {
    if (existingCollections[ci].name.startsWith('Nordlig/')) {
      // Remove all variables in this collection first
      for (var vi = 0; vi < existingCollections[ci].variableIds.length; vi++) {
        var existingVar = await figma.variables.getVariableByIdAsync(existingCollections[ci].variableIds[vi]);
        if (existingVar) {
          existingVar.remove();
          totalRemoved++;
        }
      }
      existingCollections[ci].remove();
    }
  }
  if (totalRemoved > 0) {
    figma.ui.postMessage({
      type: 'log',
      text: totalRemoved + ' alte Variables bereinigt.',
    });
  }

  // Track all created variables with their token data for alias pass
  var allVarEntries: Array<{
    name: string;
    figmaVar: Variable;
    tokenData: TokenVariable;
    modeIds: Record<string, string>;
    modes: string[];
  }> = [];

  for (const [collectionName, collection] of Object.entries(data.collections)) {
    // Import color, sizing, spacing, radius and typography collections
    if (!['color', 'sizing', 'spacing', 'radius', 'typography'].includes(collectionName)) continue;

    const figmaCollection = figma.variables.createVariableCollection(
      'Nordlig/' + collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
    );

    // Rename default mode and add additional modes
    const defaultModeId = figmaCollection.modes[0].modeId;
    figmaCollection.renameMode(defaultModeId, collection.modes[0]);

    var modeIds: Record<string, string> = {};
    modeIds[collection.modes[0]] = defaultModeId;

    for (var i = 1; i < collection.modes.length; i++) {
      var newModeId = figmaCollection.addMode(collection.modes[i]);
      modeIds[collection.modes[i]] = newModeId;
    }

    // Pass 1: Create all variables with resolved values
    for (const [name, variable] of Object.entries(collection.variables)) {
      var figmaType = variable.type === 'COLOR' ? 'COLOR' as const : 'FLOAT' as const;

      // Clean up variable name for Figma (remove -- prefix, use / separator)
      // Prepend token hierarchy level (L1 Base, L2 Global, L3 Role, L4 Component)
      var tokenLevel = (variable as any).level || 'L2 Global';
      var figmaName = tokenLevel + '/' + name
        .replace(/^--/, '')
        .replace(/-/g, '/');

      var figmaVariable = figma.variables.createVariable(
        figmaName,
        figmaCollection,
        figmaType
      );

      // Set scopes for color variables
      if (variable.type === 'COLOR' && variable.scopes) {
        figmaVariable.scopes = variable.scopes as VariableScope[];
      }

      // Set resolved values for each mode
      var skipVariable = false;
      for (const mode of collection.modes) {
        var value = variable[mode];
        if (value === undefined) continue;

        var modeId = modeIds[mode];
        if (figmaType === 'COLOR' && typeof value === 'string') {
          var rgb = hexToFigmaRGB(value);
          if (rgb) {
            figmaVariable.setValueForMode(modeId, rgb);
          } else {
            skipVariable = true;
          }
        } else if (figmaType === 'FLOAT' && typeof value === 'number') {
          if (!isNaN(value)) {
            figmaVariable.setValueForMode(modeId, value);
          }
        }
      }
      if (skipVariable) {
        figmaVariable.remove();
        continue;
      }

      variableMap.set(name, figmaVariable);
      allVarEntries.push({
        name: name,
        figmaVar: figmaVariable,
        tokenData: variable,
        modeIds: modeIds,
        modes: collection.modes,
      });
      totalCreated++;
    }
  }

  // Pass 2: Set up VariableAlias references where tokens reference other tokens
  for (var idx = 0; idx < allVarEntries.length; idx++) {
    var entry = allVarEntries[idx];
    var td = entry.tokenData;

    // Determine ref for each mode
    var lightRef = td.lightRef as string | undefined;
    var darkRef = td.darkRef as string | undefined;
    var defaultRef = td.defaultRef as string | undefined;

    if (!lightRef && !darkRef && !defaultRef) continue;

    var aliasSet = false;
    for (var mi = 0; mi < entry.modes.length; mi++) {
      var mode = entry.modes[mi];
      var ref: string | undefined;
      if (mode === 'light') ref = lightRef;
      else if (mode === 'dark') ref = darkRef;
      else if (mode === 'default') ref = defaultRef;

      if (!ref) continue;

      // Look up the referenced variable
      var refVar = variableMap.get(ref);
      if (refVar) {
        var alias = figma.variables.createVariableAlias(refVar);
        entry.figmaVar.setValueForMode(entry.modeIds[mode], alias);
        aliasSet = true;
      }
    }
    if (aliasSet) totalAliases++;
  }

  figma.ui.postMessage({
    type: 'log',
    text: totalCreated + ' Variables erstellt, ' + totalAliases + ' mit Alias-Referenzen.',
  });

  return variableMap;
}

// --- Child Node Creation (Multi-Node Components) ---

/**
 * Recursively create child nodes for multi-node components like Alert.
 * Handles icon placeholders, text nodes, nested frames, and close buttons.
 */
async function createChildNodes(
  parent: FrameNode | ComponentNode,
  children: ChildNode[],
  variableMap: Map<string, Variable>,
  fontFamily: string,
  textStyleMap?: Map<string, TextStyle>,
): Promise<void> {
  for (var ci = 0; ci < children.length; ci++) {
    var child = children[ci];

    if (child.type === 'icon') {
      var iconSize = child.iconSize || 20;

      if (child.iconRef) {
        // Create instance of the Icon ComponentSet
        var iconInstance = findAndCreateInstance(child.iconRef.component, child.iconRef.variant);
        if (iconInstance) {
          iconInstance.name = child.name;

          // Override stroke colors on the instance to match alert variant
          if (child.styles && child.styles.fills) {
            var refIconHex = child.styles.fills.value;
            var refIconPaint = refIconHex ? hexToSolidPaint(refIconHex) : null;
            if (refIconPaint) {
              var boundRefIconPaint = refIconPaint;
              if (child.styles.fills.token) {
                var refIconVar = variableMap.get(child.styles.fills.token);
                if (refIconVar) {
                  boundRefIconPaint = figma.variables.setBoundVariableForPaint(
                    refIconPaint, 'color', refIconVar
                  );
                }
              }
              // Apply stroke color override to vector nodes inside the instance
              // Skip frames/instances/components to avoid adding borders to containers
              function applyStrokeOverride(node: SceneNode, paint: SolidPaint): void {
                var t = node.type;
                if (t !== 'FRAME' && t !== 'INSTANCE' && t !== 'COMPONENT' && 'strokes' in node) {
                  (node as VectorNode).strokes = [paint];
                }
                if ('children' in node) {
                  var kids = (node as FrameNode).children;
                  for (var k = 0; k < kids.length; k++) {
                    applyStrokeOverride(kids[k], paint);
                  }
                }
              }
              applyStrokeOverride(iconInstance, boundRefIconPaint);
            }
          }

          parent.appendChild(iconInstance);
        } else {
          // Fallback: Icon ComponentSet not found, create SVG or placeholder
          figma.ui.postMessage({
            type: 'log',
            text: 'Warning: Icon ComponentSet "' + child.iconRef.component + '" not found. Using placeholder.',
          });
          var fallbackFrame = figma.createFrame();
          fallbackFrame.name = child.name + ' (missing Icon)';
          fallbackFrame.resize(iconSize, iconSize);
          fallbackFrame.cornerRadius = 2;
          fallbackFrame.fills = [];
          parent.appendChild(fallbackFrame);
        }
      } else if (child.svgData) {
        // Direct SVG vector import (no iconRef)
        var svgFrame = figma.createNodeFromSvg(child.svgData);
        svgFrame.name = child.name;
        svgFrame.resize(iconSize, iconSize);
        svgFrame.layoutSizingHorizontal = 'FIXED';
        svgFrame.layoutSizingVertical = 'FIXED';
        // Clear strokes/fills on outer SVG frame (only inner vectors need them)
        svgFrame.strokes = [];
        svgFrame.fills = [];

        // Apply stroke color + variable binding to all vector children
        if (child.styles && child.styles.fills) {
          var iconHex = child.styles.fills.value;
          var iconPaint = iconHex ? hexToSolidPaint(iconHex) : null;
          if (iconPaint) {
            var boundIconPaint = iconPaint;
            if (child.styles.fills.token) {
              var iconVar = variableMap.get(child.styles.fills.token);
              if (iconVar) {
                boundIconPaint = figma.variables.setBoundVariableForPaint(
                  iconPaint, 'color', iconVar
                );
              }
            }
            // Apply to all vector children (lucide icons use strokes, not fills)
            for (var vi = 0; vi < svgFrame.children.length; vi++) {
              var vectorChild = svgFrame.children[vi];
              if ('strokes' in vectorChild) {
                (vectorChild as VectorNode).strokes = [boundIconPaint];
              }
              // Also check nested groups
              if ('children' in vectorChild) {
                var groupChildren = (vectorChild as GroupNode).children;
                for (var gi = 0; gi < groupChildren.length; gi++) {
                  if ('strokes' in groupChildren[gi]) {
                    (groupChildren[gi] as VectorNode).strokes = [boundIconPaint];
                  }
                }
              }
            }
          }
        }

        parent.appendChild(svgFrame);
      } else {
        // Fallback: colored square frame (placeholder)
        var iconFrame = figma.createFrame();
        iconFrame.name = child.name;
        iconFrame.resize(iconSize, iconSize);
        iconFrame.layoutSizingHorizontal = 'FIXED';
        iconFrame.layoutSizingVertical = 'FIXED';
        iconFrame.fills = [];

        if (child.styles && child.styles.fills) {
          var iconHex2 = child.styles.fills.value;
          if (iconHex2) {
            var iconPaint2 = hexToSolidPaint(iconHex2);
            if (iconPaint2) {
              iconFrame.fills = [iconPaint2];
              if (child.styles.fills.token) {
                var iconVar2 = variableMap.get(child.styles.fills.token);
                if (iconVar2) {
                  var boundIconPaint2 = figma.variables.setBoundVariableForPaint(
                    iconPaint2, 'color', iconVar2
                  );
                  iconFrame.fills = [boundIconPaint2];
                }
              }
            }
          }
        }

        iconFrame.cornerRadius = 2;
        parent.appendChild(iconFrame);
      }

    } else if (child.type === 'text' && child.text) {
      // Text node
      var textNode = figma.createText();
      textNode.name = child.name;

      var tFontStyle = fontWeightToStyle(child.text.fontWeight);
      try {
        await figma.loadFontAsync({ family: child.text.fontFamily || fontFamily, style: tFontStyle });
        textNode.fontName = { family: child.text.fontFamily || fontFamily, style: tFontStyle };
      } catch {
        textNode.fontName = { family: 'Roboto', style: 'Regular' };
      }

      textNode.characters = child.text.content;

      // Apply text style if available (role-based: "Title", "Description", etc.)
      var childTextStyle = textStyleMap ? textStyleMap.get(child.name) : null;
      if (childTextStyle) {
        await textNode.setTextStyleIdAsync(childTextStyle.id);
      } else {
        // Fallback: set properties directly
        textNode.fontSize = child.text.fontSize;
        if (child.text.lineHeight > 0 && child.text.fontSize > 0) {
          textNode.lineHeight = { value: child.text.lineHeight, unit: 'PIXELS' };
        }
      }

      // Text color with variable binding (fills are node-level, not style-level)
      var tHex = child.text.fills.value;
      var tPaint = hexToSolidPaint(tHex);
      if (tPaint) {
        textNode.fills = [tPaint];
        if (child.text.fills.token) {
          var tVar = variableMap.get(child.text.fills.token);
          if (tVar) {
            var boundTPaint = figma.variables.setBoundVariableForPaint(
              tPaint, 'color', tVar
            );
            textNode.fills = [boundTPaint];
          }
        }
      }

      textNode.textAutoResize = 'WIDTH_AND_HEIGHT';
      parent.appendChild(textNode);
      // FILL can only be set after appending to an auto-layout parent
      textNode.layoutSizingHorizontal = 'FILL';

    } else if (child.type === 'frame') {
      // Nested frame with auto-layout
      var nestedFrame = figma.createFrame();
      nestedFrame.name = child.name;
      nestedFrame.fills = [];

      if (child.layout) {
        nestedFrame.layoutMode = child.layout.direction;
        nestedFrame.primaryAxisSizingMode = 'AUTO';
        nestedFrame.counterAxisSizingMode = 'AUTO';
        nestedFrame.paddingLeft = child.layout.paddingLeft;
        nestedFrame.paddingRight = child.layout.paddingRight;
        nestedFrame.paddingTop = child.layout.paddingTop;
        nestedFrame.paddingBottom = child.layout.paddingBottom;
        nestedFrame.itemSpacing = child.layout.itemSpacing;
        nestedFrame.primaryAxisAlignItems = (child.layout.primaryAxisAlign || 'MIN') as
          'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
        nestedFrame.counterAxisAlignItems = (child.layout.counterAxisAlign || 'MIN') as
          'MIN' | 'CENTER' | 'MAX';
      }

      // Bind child frame numeric properties to variables
      if (child.tokenBindings) {
        var childNumBindings: Array<[string, string]> = [
          ['paddingLeft', 'paddingLeft'], ['paddingRight', 'paddingRight'],
          ['paddingTop', 'paddingTop'], ['paddingBottom', 'paddingBottom'],
          ['itemSpacing', 'itemSpacing'],
        ];
        for (var cbi = 0; cbi < childNumBindings.length; cbi++) {
          var cbKey = childNumBindings[cbi][0];
          var cbField = childNumBindings[cbi][1];
          var cbTokenName = child.tokenBindings[cbKey];
          if (cbTokenName) {
            var cbVar = variableMap.get(cbTokenName);
            if (cbVar) {
              nestedFrame.setBoundVariable(cbField as VariableBindableNodeField, cbVar);
            }
          }
        }
      }

      // Recursively create children
      if (child.children && child.children.length > 0) {
        await createChildNodes(nestedFrame, child.children, variableMap, fontFamily, textStyleMap);
      }

      parent.appendChild(nestedFrame);
      // FILL can only be set after appending to an auto-layout parent
      nestedFrame.layoutSizingHorizontal = 'FILL';

    } else if (child.type === 'close-button') {
      // Close button: frame containing Icon instance (X) or fallback
      var closeFrame = figma.createFrame();
      closeFrame.name = child.name;
      var closeBtnSize = (child.iconSize || 16) + 8; // padding around icon
      closeFrame.resize(closeBtnSize, closeBtnSize);
      closeFrame.layoutSizingHorizontal = 'FIXED';
      closeFrame.layoutSizingVertical = 'FIXED';
      closeFrame.cornerRadius = 4;
      closeFrame.fills = [];

      var closeIconSize = child.iconSize || 16;

      // Prepare paint for the icon color override
      var closeBoundPaint: SolidPaint | null = null;
      if (child.styles && child.styles.fills) {
        var closeHex = child.styles.fills.value;
        if (closeHex) {
          var closePaint = hexToSolidPaint(closeHex);
          if (closePaint) {
            closeBoundPaint = closePaint;
            if (child.styles.fills.token) {
              var closeVar = variableMap.get(child.styles.fills.token);
              if (closeVar) {
                closeBoundPaint = figma.variables.setBoundVariableForPaint(
                  closePaint, 'color', closeVar
                );
              }
            }
          }
        }
      }

      closeFrame.layoutMode = 'HORIZONTAL';
      closeFrame.primaryAxisAlignItems = 'CENTER';
      closeFrame.counterAxisAlignItems = 'CENTER';

      if (child.iconRef) {
        // Create instance of Icon ComponentSet (X icon)
        var closeIconInstance = findAndCreateInstance(child.iconRef.component, child.iconRef.variant);
        if (closeIconInstance) {
          closeIconInstance.name = 'X';
          closeIconInstance.opacity = 0.5;

          // Apply stroke color override
          if (closeBoundPaint) {
            function applyCloseStroke(node: SceneNode, paint: SolidPaint): void {
              var ct = node.type;
              if (ct !== 'FRAME' && ct !== 'INSTANCE' && ct !== 'COMPONENT' && 'strokes' in node) {
                (node as VectorNode).strokes = [paint];
              }
              if ('children' in node) {
                var cKids = (node as FrameNode).children;
                for (var ck = 0; ck < cKids.length; ck++) {
                  applyCloseStroke(cKids[ck], paint);
                }
              }
            }
            applyCloseStroke(closeIconInstance, closeBoundPaint);
          }

          closeFrame.appendChild(closeIconInstance);
        } else {
          // Fallback placeholder if Icon not found
          var closeFallback = figma.createFrame();
          closeFallback.name = 'X (missing Icon)';
          closeFallback.resize(closeIconSize, closeIconSize);
          closeFallback.fills = closeBoundPaint ? [closeBoundPaint] : [];
          closeFallback.cornerRadius = 2;
          closeFallback.opacity = 0.5;
          closeFrame.appendChild(closeFallback);
        }
      } else if (child.svgData) {
        // Direct SVG vector for close icon (no iconRef)
        var closeSvg = figma.createNodeFromSvg(child.svgData);
        closeSvg.name = 'X';
        closeSvg.resize(closeIconSize, closeIconSize);
        closeSvg.opacity = 0.5;

        // Apply stroke color to vector children
        if (closeBoundPaint) {
          for (var cvi = 0; cvi < closeSvg.children.length; cvi++) {
            var cvChild = closeSvg.children[cvi];
            if ('strokes' in cvChild) {
              (cvChild as VectorNode).strokes = [closeBoundPaint];
            }
            if ('children' in cvChild) {
              var cvGroupChildren = (cvChild as GroupNode).children;
              for (var cgi = 0; cgi < cvGroupChildren.length; cgi++) {
                if ('strokes' in cvGroupChildren[cgi]) {
                  (cvGroupChildren[cgi] as VectorNode).strokes = [closeBoundPaint];
                }
              }
            }
          }
        }
        closeFrame.appendChild(closeSvg);
      } else {
        // Fallback: colored square placeholder
        var closeIcon = figma.createFrame();
        closeIcon.name = 'X';
        closeIcon.resize(closeIconSize, closeIconSize);
        closeIcon.fills = closeBoundPaint ? [closeBoundPaint] : [];
        closeIcon.cornerRadius = 2;
        closeIcon.opacity = 0.5;
        closeFrame.appendChild(closeIcon);
      }

      parent.appendChild(closeFrame);
    }
  }
}

// --- Icon Instance Lookup ---

/**
 * Find a ComponentSet by name on the current page and create an instance
 * matching the given variant props (e.g., { icon: 'Info', size: 'md' }).
 */
function findAndCreateInstance(
  componentSetName: string,
  variantProps: Record<string, string>,
): InstanceNode | null {
  // Search all component sets on the current page
  var allComponentSets = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  var targetSet: ComponentSetNode | null = null;
  for (var csi = 0; csi < allComponentSets.length; csi++) {
    if (allComponentSets[csi].name === componentSetName) {
      targetSet = allComponentSets[csi] as ComponentSetNode;
      break;
    }
  }
  if (!targetSet) return null;

  // Build the variant name string: "icon=Info, size=md"
  var variantName = Object.entries(variantProps)
    .map(function(entry) { return entry[0] + '=' + entry[1]; })
    .join(', ');

  // Find the matching variant component within the set
  var targetComponent: ComponentNode | null = null;
  for (var vi = 0; vi < targetSet.children.length; vi++) {
    var child = targetSet.children[vi];
    if (child.type === 'COMPONENT' && child.name === variantName) {
      targetComponent = child as ComponentNode;
      break;
    }
  }
  if (!targetComponent) return null;

  return targetComponent.createInstance();
}

// --- Component Import ---

async function importComponent(
  data: ComponentData,
  variableMap: Map<string, Variable>,
): Promise<void> {
  const components: ComponentNode[] = [];

  // Always pre-load Roboto Regular as ultimate fallback
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });

  // Load fonts — collect from both top-level text and child text nodes
  const firstCombo = data.combinations[0];
  const fontFamily = (firstCombo && firstCombo.text.fontFamily) || 'Inter';
  const fontsToLoad = new Set<string>();
  for (const combo of data.combinations) {
    fontsToLoad.add(fontWeightToStyle(combo.text.fontWeight));
    // Also collect fonts from children
    if (combo.children) {
      var childStack = [...combo.children];
      while (childStack.length > 0) {
        var ch = childStack.pop()!;
        if (ch.text) fontsToLoad.add(fontWeightToStyle(ch.text.fontWeight));
        if (ch.children) childStack.push(...ch.children);
      }
    }
  }
  for (const style of fontsToLoad) {
    try {
      await figma.loadFontAsync({ family: fontFamily, style });
    } catch {
      // Fallback to Roboto if font not available
      try {
        await figma.loadFontAsync({ family: 'Roboto', style });
      } catch {
        // Roboto Regular already loaded above
      }
    }
  }

  // --- Text Styles ---
  // Clean up existing text styles for this component
  var existingTextStyles = await figma.getLocalTextStylesAsync();
  for (var sti = 0; sti < existingTextStyles.length; sti++) {
    if (existingTextStyles[sti].name.startsWith(data.name + '/')) {
      existingTextStyles[sti].remove();
    }
  }

  // Create text styles — size-based (Button) or role-based (Alert children)
  var textStyleMap = new Map<string, TextStyle>();

  // Skip text style creation for components without text (e.g. Icon with only SVG)
  var hasTextContent = data.combinations.some(function(c) {
    return c.text.content !== '' && c.text.fontSize > 0;
  });

  // Check if this is a multi-node component (has children with text nodes)
  var hasChildren = data.combinations.some(function(c) { return c.children && c.children.length > 0; });

  if (hasChildren) {
    // Role-based text styles: create one per unique child text role (Title, Description, etc.)
    // Check children FIRST — components like CheckboxField have empty root text but text in children
    var processedRoles = new Set<string>();
    for (var ci2 = 0; ci2 < data.combinations.length; ci2++) {
      var combo2 = data.combinations[ci2];
      if (!combo2.children) continue;
      var childStack2 = [...combo2.children];
      while (childStack2.length > 0) {
        var ch2 = childStack2.pop()!;
        if (ch2.type === 'text' && ch2.text && !processedRoles.has(ch2.name)) {
          processedRoles.add(ch2.name);

          var roleStyleName = data.name + '/' + ch2.name;
          var roleStyle = figma.createTextStyle();
          roleStyle.name = roleStyleName;

          var roleFamily = ch2.text.fontFamily || fontFamily;
          var roleFontStyle = fontWeightToStyle(ch2.text.fontWeight);
          try {
            await figma.loadFontAsync({ family: roleFamily, style: roleFontStyle });
            roleStyle.fontName = { family: roleFamily, style: roleFontStyle };
          } catch {
            roleStyle.fontName = { family: 'Roboto', style: 'Regular' };
          }

          roleStyle.fontSize = ch2.text.fontSize;
          try { roleStyle.fontWeight = ch2.text.fontWeight as any; } catch {}

          if (ch2.text.lineHeight > 0 && ch2.text.fontSize > 0) {
            roleStyle.lineHeight = { value: ch2.text.lineHeight, unit: 'PIXELS' };
          }

          if (ch2.text.letterSpacing && ch2.text.letterSpacing !== 0) {
            roleStyle.letterSpacing = { value: ch2.text.letterSpacing, unit: 'PIXELS' };
          }

          // Bind text style properties to variables (fontSize, lineHeight, fontWeight)
          if (ch2.tokenBindings) {
            var tsFsToken = ch2.tokenBindings['fontSize'];
            if (tsFsToken) {
              var tsFsVar = variableMap.get(tsFsToken);
              if (tsFsVar) {
                try { roleStyle.setBoundVariable('fontSize', tsFsVar); } catch (e) { console.log('Cannot bind fontSize on text style:', e); }
              }
            }
            var tsLhToken = ch2.tokenBindings['lineHeight'];
            if (tsLhToken) {
              var tsLhVar = variableMap.get(tsLhToken);
              if (tsLhVar) {
                try { roleStyle.setBoundVariable('lineHeight', tsLhVar); } catch (e) { console.log('Cannot bind lineHeight on text style:', e); }
              }
            }
            var tsFwToken = ch2.tokenBindings['fontWeight'];
            if (tsFwToken) {
              var tsFwVar = variableMap.get(tsFwToken);
              if (tsFwVar) {
                try { roleStyle.setBoundVariable('fontWeight' as any, tsFwVar); } catch (e) { console.log('Cannot bind fontWeight on text style:', e); }
              }
            }
          }

          textStyleMap.set(ch2.name, roleStyle);
        }
        if (ch2.children) childStack2.push(...ch2.children);
      }
    }
  } else if (hasTextContent) {
    // Size-based text styles (Button-style: SM, MD, LG)
    var processedSizes = new Set<string>();
    for (var si = 0; si < data.combinations.length; si++) {
      var sizeVal = data.combinations[si].props.size || data.combinations[si].props.inputSize || 'default';
      if (processedSizes.has(sizeVal)) continue;
      processedSizes.add(sizeVal);

      var sizeCombo = data.combinations[si];
      var styleName = data.name + '/' + sizeVal.toUpperCase();
      var textStyle = figma.createTextStyle();
      textStyle.name = styleName;

      // Set font on style
      var tsFamily = sizeCombo.text.fontFamily || fontFamily;
      var tsFontStyle = fontWeightToStyle(sizeCombo.text.fontWeight);
      try {
        await figma.loadFontAsync({ family: tsFamily, style: tsFontStyle });
        textStyle.fontName = { family: tsFamily, style: tsFontStyle };
      } catch {
        textStyle.fontName = { family: 'Roboto', style: 'Regular' };
      }

      // Set font size
      textStyle.fontSize = sizeCombo.text.fontSize;

      // Set font weight numerically
      try { textStyle.fontWeight = sizeCombo.text.fontWeight as any; } catch {}

      // Set line height
      if (sizeCombo.text.lineHeight > 0 && sizeCombo.text.fontSize > 0) {
        var tsLhToken = sizeCombo.tokenBindings ? sizeCombo.tokenBindings['lineHeight'] : null;
        if (tsLhToken && tsLhToken.startsWith('--sizing-')) {
          textStyle.lineHeight = { value: sizeCombo.text.lineHeight, unit: 'PIXELS' };
        } else {
          var tsLhPercent = Math.round((sizeCombo.text.lineHeight / sizeCombo.text.fontSize) * 100);
          textStyle.lineHeight = { value: tsLhPercent, unit: 'PERCENT' };
        }
      }

      // Set letter spacing (px)
      if (sizeCombo.text.letterSpacing && sizeCombo.text.letterSpacing !== 0) {
        textStyle.letterSpacing = { value: sizeCombo.text.letterSpacing, unit: 'PIXELS' };
      }

      // Bind variables to text style
      if (sizeCombo.tokenBindings) {
        var tsFsToken = sizeCombo.tokenBindings['fontSize'];
        if (tsFsToken) {
          var tsFsVar = variableMap.get(tsFsToken);
          if (tsFsVar) {
            try { textStyle.setBoundVariable('fontSize' as any, tsFsVar); } catch {}
          }
        }
        var tsFwToken = sizeCombo.tokenBindings['fontWeight'];
        if (tsFwToken) {
          var tsFwVar = variableMap.get(tsFwToken);
          if (tsFwVar) {
            try { textStyle.setBoundVariable('fontWeight' as any, tsFwVar); } catch {}
          }
        }
        var tsLhToken2 = sizeCombo.tokenBindings['lineHeight'];
        if (tsLhToken2) {
          var tsLhVar = variableMap.get(tsLhToken2);
          if (tsLhVar) {
            try { textStyle.setBoundVariable('lineHeight' as any, tsLhVar); } catch {}
          }
        }
        var tsLsToken = sizeCombo.tokenBindings['letterSpacing'];
        if (tsLsToken) {
          var tsLsVar = variableMap.get(tsLsToken);
          if (tsLsVar) {
            try { textStyle.setBoundVariable('letterSpacing' as any, tsLsVar); } catch {}
          }
        }
      }

      // Build description with all token references
      var descParts: string[] = [];
      if (sizeCombo.tokenBindings) {
        if (sizeCombo.tokenBindings['fontWeight']) {
          descParts.push('Weight: ' + sizeCombo.tokenBindings['fontWeight']);
        }
        if (sizeCombo.tokenBindings['lineHeight']) {
          descParts.push('Line Height: ' + sizeCombo.tokenBindings['lineHeight']);
        }
        if (sizeCombo.tokenBindings['letterSpacing']) {
          descParts.push('Letter Spacing: ' + sizeCombo.tokenBindings['letterSpacing']);
        }
      }
      if (descParts.length > 0) {
        textStyle.description = 'Token refs: ' + descParts.join(', ');
      }

      textStyleMap.set(sizeVal, textStyle);
    }
  } else {
    // No text styles needed (e.g. Icon component — only SVG vectors, no text content)
  }

  figma.ui.postMessage({
    type: 'log',
    text: textStyleMap.size + ' Text Styles erstellt (' + Array.from(textStyleMap.keys()).join(', ') + ').',
  });

  for (const combo of data.combinations) {
    // Create component for this variant combination
    const component = figma.createComponent();

    // Name follows Figma variant naming: "variant=primary, size=md"
    const variantName = Object.entries(combo.props)
      .map(([key, val]) => `${key}=${val}`)
      .join(', ');
    component.name = variantName;

    // Configure auto-layout
    var isFixedSizeComponent = data.name === 'Icon' || data.name === 'Checkbox';
    component.layoutMode = combo.layout.direction;
    if (isFixedSizeComponent) {
      // Fixed-size: Icon (SVG vector), Checkbox (20×20 box)
      component.primaryAxisSizingMode = 'FIXED';
      component.counterAxisSizingMode = 'FIXED';
      component.resize(combo.layout.width, combo.layout.height);
    } else {
      component.primaryAxisSizingMode = 'AUTO';
      component.counterAxisSizingMode = 'AUTO';
      // Set min height from extracted data
      component.minHeight = combo.layout.height;
    }
    component.paddingLeft = combo.layout.paddingLeft;
    component.paddingRight = combo.layout.paddingRight;
    component.paddingTop = combo.layout.paddingTop;
    component.paddingBottom = combo.layout.paddingBottom;
    component.itemSpacing = combo.layout.itemSpacing;
    component.primaryAxisAlignItems = combo.layout.primaryAxisAlign as
      'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
    component.counterAxisAlignItems = combo.layout.counterAxisAlign as
      'MIN' | 'CENTER' | 'MAX';

    // Set background fill
    const bgHex = combo.styles.fills.value;
    if (bgHex && bgHex !== 'rgba(0, 0, 0, 0)' && bgHex !== 'transparent') {
      const fillPaint = hexToSolidPaint(bgHex);
      if (fillPaint) {
        component.fills = [fillPaint];

        // Bind to variable if token exists
        if (combo.styles.fills.token) {
          const variable = variableMap.get(combo.styles.fills.token);
          if (variable) {
            const boundPaint = figma.variables.setBoundVariableForPaint(
              fillPaint, 'color', variable
            );
            component.fills = [boundPaint];
          }
        }
      } else {
        component.fills = [];
      }
    } else {
      // Transparent background (ghost variant)
      component.fills = [];
    }

    // Set stroke
    if (combo.styles.strokes && combo.styles.strokeWeight > 0) {
      const strokeHex = combo.styles.strokes.value;
      const strokePaint = hexToSolidPaint(strokeHex);
      if (strokePaint) {
        component.strokes = [strokePaint];
        component.strokeAlign = 'INSIDE'; // Match CSS border-box behavior

        // Per-side strokes (e.g. border-l-4 for Alert)
        if (combo.styles.strokeSides) {
          component.strokeTopWeight = combo.styles.strokeSides.top;
          component.strokeRightWeight = combo.styles.strokeSides.right;
          component.strokeBottomWeight = combo.styles.strokeSides.bottom;
          component.strokeLeftWeight = combo.styles.strokeSides.left;
          component.strokesIncludedInLayout = true;
        } else {
          component.strokeWeight = combo.styles.strokeWeight;
        }

        if (combo.styles.strokes.token) {
          const strokeVar = variableMap.get(combo.styles.strokes.token);
          if (strokeVar) {
            var boundStrokePaint = figma.variables.setBoundVariableForPaint(
              strokePaint, 'color', strokeVar
            );
            component.strokes = [boundStrokePaint];
          }
        }
      }
    }

    // Set corner radius
    component.cornerRadius = combo.styles.cornerRadius;

    // Clip content so children (SVG icons, etc.) respect parent's corner radius
    // Only clip when there are actual children to clip — empty frames may render corners differently
    var hasChildContent = !!combo.svgData || (combo.children && combo.children.length > 0);
    if (combo.styles.cornerRadius > 0 && hasChildContent) {
      component.clipsContent = true;
    }

    // Smooth corners for better Figma rendering (reduces inner/outer radius mismatch
    // when strokeWeight >= cornerRadius with INSIDE alignment)
    if (combo.styles.cornerRadius > 0) {
      component.cornerSmoothing = 0.6;
    }

    // Set opacity (e.g. Checkbox disabled = 0.5)
    if (combo.styles.opacity !== undefined && combo.styles.opacity < 1) {
      component.opacity = combo.styles.opacity;
    }

    // Bind numeric properties to variables (padding, gap, radius, height, width)
    if (combo.tokenBindings) {
      var numBindings: Array<[string, string]> = [
        ['paddingLeft', 'paddingLeft'],
        ['paddingRight', 'paddingRight'],
        ['paddingTop', 'paddingTop'],
        ['paddingBottom', 'paddingBottom'],
        ['itemSpacing', 'itemSpacing'],
        ['minHeight', 'minHeight'],
        ['width', 'width'],
        ['height', 'height'],
      ];
      for (var bi = 0; bi < numBindings.length; bi++) {
        var bindKey = numBindings[bi][0];
        var bindField = numBindings[bi][1];
        var tokenName = combo.tokenBindings[bindKey];
        if (tokenName) {
          var boundVar = variableMap.get(tokenName);
          if (boundVar) {
            component.setBoundVariable(bindField as VariableBindableNodeField, boundVar);
          }
        }
      }
      // Stroke weight: bind per-side when strokeSides is defined, uniform otherwise
      var swTokenName = combo.tokenBindings['strokeWeight'];
      if (swTokenName) {
        var swVar = variableMap.get(swTokenName);
        if (swVar) {
          if (combo.styles.strokeSides) {
            // Bind only to sides that have non-zero weight
            if (combo.styles.strokeSides.left > 0)
              component.setBoundVariable('strokeLeftWeight' as VariableBindableNodeField, swVar);
            if (combo.styles.strokeSides.right > 0)
              component.setBoundVariable('strokeRightWeight' as VariableBindableNodeField, swVar);
            if (combo.styles.strokeSides.top > 0)
              component.setBoundVariable('strokeTopWeight' as VariableBindableNodeField, swVar);
            if (combo.styles.strokeSides.bottom > 0)
              component.setBoundVariable('strokeBottomWeight' as VariableBindableNodeField, swVar);
          } else {
            component.setBoundVariable('strokeWeight' as VariableBindableNodeField, swVar);
          }
        }
      }
      // Corner radius: bind all 4 corners to the same variable
      var radiusTokenName = combo.tokenBindings['cornerRadius'];
      if (radiusTokenName) {
        var radiusVar = variableMap.get(radiusTokenName);
        if (radiusVar) {
          component.setBoundVariable('topLeftRadius' as VariableBindableNodeField, radiusVar);
          component.setBoundVariable('topRightRadius' as VariableBindableNodeField, radiusVar);
          component.setBoundVariable('bottomLeftRadius' as VariableBindableNodeField, radiusVar);
          component.setBoundVariable('bottomRightRadius' as VariableBindableNodeField, radiusVar);
        }
      }
    }

    // Create child nodes — SVG-based (Icon), multi-node (Alert) or single text (Button)
    if (combo.svgData) {
      // SVG-based component (Icon): create vector from SVG data
      var svgNode = figma.createNodeFromSvg(combo.svgData);
      svgNode.name = 'Vector';

      // Apply default stroke color (L4: --color-icon-default)
      var defaultStrokeHex = '#000000';
      var defaultStrokePaint = hexToSolidPaint(defaultStrokeHex);
      var textBaseVar = variableMap.get('--color-icon-default') || variableMap.get('--color-text-base');
      if (defaultStrokePaint && textBaseVar) {
        var boundDefaultStroke = figma.variables.setBoundVariableForPaint(
          defaultStrokePaint, 'color', textBaseVar
        );
        // Apply to vector children only (skip frames/instances/components)
        function applyDefaultStroke(node: SceneNode, paint: SolidPaint): void {
          var dt = node.type;
          if (dt !== 'FRAME' && dt !== 'INSTANCE' && dt !== 'COMPONENT' && 'strokes' in node) {
            (node as VectorNode).strokes = [paint];
          }
          if ('children' in node) {
            var dkids = (node as FrameNode).children;
            for (var dk = 0; dk < dkids.length; dk++) {
              applyDefaultStroke(dkids[dk], paint);
            }
          }
        }
        applyDefaultStroke(svgNode, boundDefaultStroke);
      }

      // Clear strokes/fills on the outer SVG frame (only inner vectors need strokes)
      svgNode.strokes = [];
      svgNode.fills = [];

      component.appendChild(svgNode);
      // SVG fills the component frame
      svgNode.layoutSizingHorizontal = 'FILL';
      svgNode.layoutSizingVertical = 'FILL';

    } else if (combo.children && combo.children.length > 0) {
      // Multi-node component: recursively create children
      await createChildNodes(component, combo.children, variableMap, fontFamily, textStyleMap);
    } else if (combo.text.fontSize > 0 && combo.text.content) {
      // Single text node (Button-style) — skip if no text content (e.g. Checkbox unchecked)
      const textNode = figma.createText();
      const fontStyle = fontWeightToStyle(combo.text.fontWeight);
      try {
        textNode.fontName = { family: fontFamily, style: fontStyle };
      } catch {
        textNode.fontName = { family: 'Roboto', style: 'Regular' };
      }
      textNode.characters = combo.text.content;

      // Apply text style (handles fontSize, lineHeight, fontName via style + variable bindings)
      var comboSizeKey = combo.props.size || combo.props.inputSize || 'default';
      var appliedTextStyle = textStyleMap.get(comboSizeKey);
      if (appliedTextStyle) {
        await textNode.setTextStyleIdAsync(appliedTextStyle.id);
      } else {
        // Fallback: set properties directly if no text style available
        textNode.fontSize = combo.text.fontSize;
        if (combo.text.lineHeight > 0 && combo.text.fontSize > 0) {
          var fbLhToken = combo.tokenBindings ? combo.tokenBindings['lineHeight'] : null;
          if (fbLhToken && fbLhToken.startsWith('--sizing-')) {
            textNode.lineHeight = { value: combo.text.lineHeight, unit: 'PIXELS' };
          } else {
            var lhPercent = Math.round((combo.text.lineHeight / combo.text.fontSize) * 100);
            textNode.lineHeight = { value: lhPercent, unit: 'PERCENT' };
          }
        }
      }

      // Set text color (independent of text style — fills are node-level)
      const textHex = combo.text.fills.value;
      const textPaint = hexToSolidPaint(textHex);
      if (textPaint) {
        textNode.fills = [textPaint];

        if (combo.text.fills.token) {
          const textColorVar = variableMap.get(combo.text.fills.token);
          if (textColorVar) {
            var boundTextPaint = figma.variables.setBoundVariableForPaint(
              textPaint, 'color', textColorVar
            );
            textNode.fills = [boundTextPaint];
          }
        }
      }

      // Auto-sizing for text
      textNode.textAutoResize = 'WIDTH_AND_HEIGHT';

      component.appendChild(textNode);
    }

    components.push(component);
  }

  // Arrange components in a grid before combining
  // Strategy: last variant axis = columns, all other axes combined = rows
  // Button (variant×size×state): cols=state(4), rows=variant×size(9)
  // Alert (variant×closeable): cols=closeable(2), rows=variant(4)
  // Icon (icon×size): cols=size(4), rows=icon(18)
  if (components.length > 0) {
    var variantKeys = Object.keys(data.variants);
    var GRID_GAP = 40;

    if (variantKeys.length >= 2) {
      // Columns = last axis, Rows = cartesian product of all other axes
      var colKey = variantKeys[variantKeys.length - 1];
      var rowKeys = variantKeys.slice(0, -1);
      var colValues = data.variants[colKey];

      // Build unique row keys from the cartesian product of all non-column axes
      var rowLabels: string[] = [];
      var rowLabelSet = new Set<string>();
      for (var gi = 0; gi < data.combinations.length; gi++) {
        var rowLabel = rowKeys.map(function(k) { return data.combinations[gi].props[k]; }).join('|');
        if (!rowLabelSet.has(rowLabel)) {
          rowLabelSet.add(rowLabel);
          rowLabels.push(rowLabel);
        }
      }

      // Calculate max dimensions per column and row
      var colWidths: number[] = new Array(colValues.length).fill(0);
      var rowHeights: number[] = new Array(rowLabels.length).fill(0);

      for (var gi2 = 0; gi2 < components.length; gi2++) {
        var gCombo = data.combinations[gi2];
        var colIdx = colValues.indexOf(gCombo.props[colKey]);
        var gRowLabel = rowKeys.map(function(k) { return gCombo.props[k]; }).join('|');
        var rowIdx = rowLabels.indexOf(gRowLabel);
        if (colIdx < 0 || rowIdx < 0) continue;
        var gw = components[gi2].width;
        var gh = components[gi2].height;
        if (gw > colWidths[colIdx]) colWidths[colIdx] = gw;
        if (gh > rowHeights[rowIdx]) rowHeights[rowIdx] = gh;
      }

      // Position each component in the grid
      for (var gi3 = 0; gi3 < components.length; gi3++) {
        var gCombo2 = data.combinations[gi3];
        var ci3 = colValues.indexOf(gCombo2.props[colKey]);
        var gRowLabel2 = rowKeys.map(function(k) { return gCombo2.props[k]; }).join('|');
        var ri = rowLabels.indexOf(gRowLabel2);
        if (ci3 < 0 || ri < 0) continue;

        var gx = 0;
        for (var cx = 0; cx < ci3; cx++) gx += colWidths[cx] + GRID_GAP;
        var gy = 0;
        for (var ry = 0; ry < ri; ry++) gy += rowHeights[ry] + GRID_GAP;

        components[gi3].x = gx;
        components[gi3].y = gy;
      }
    } else if (variantKeys.length === 1) {
      // Single axis: arrange in a row (wrap after 8 columns)
      var WRAP_COLS = 8;
      var maxW = 0;
      var maxH = 0;
      for (var si2 = 0; si2 < components.length; si2++) {
        if (components[si2].width > maxW) maxW = components[si2].width;
        if (components[si2].height > maxH) maxH = components[si2].height;
      }
      for (var si3 = 0; si3 < components.length; si3++) {
        var col = si3 % WRAP_COLS;
        var row = Math.floor(si3 / WRAP_COLS);
        components[si3].x = col * (maxW + GRID_GAP);
        components[si3].y = row * (maxH + GRID_GAP);
      }
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = data.name;

    // Position nicely on canvas
    componentSet.x = 100;
    componentSet.y = 100;

    // Add description
    componentSet.description = `${data.name} component from Nordlig Design System.\nVariants: ${
      Object.entries(data.variants)
        .map(([k, v]) => `${k} (${v.join(', ')})`)
        .join(' × ')
    }`;
  }
}

// --- Plugin UI Communication ---

figma.showUI(__html__, { width: 480, height: 680 });

figma.ui.onmessage = async (msg: {
  type: string;
  tokens?: string;
  component?: string;
  tokensForDocs?: string;
}) => {
  try {
    if (msg.type === 'import-tokens') {
      const data: TokenData = JSON.parse(msg.tokens!);
      const variableMap = await importTokens(data);
      figma.ui.postMessage({
        type: 'status',
        text: `${variableMap.size} Figma Variables erstellt.`,
        success: true,
      });
    }

    if (msg.type === 'import-component') {
      const data: ComponentData = JSON.parse(msg.component!);

      // Get existing variables for token binding (async API required for dynamic-page access)
      const variableMap = new Map<string, Variable>();
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      for (const collection of collections) {
        for (const varId of collection.variableIds) {
          const variable = await figma.variables.getVariableByIdAsync(varId);
          if (variable) {
            // Convert Figma name back to CSS custom property name
            // Strip level prefix (e.g. "L1 Base/", "L4 Component/") before converting
            let varName = variable.name;
            varName = varName.replace(/^L\d [^/]+\//, '');
            const cssName = '--' + varName.replace(/\//g, '-');
            variableMap.set(cssName, variable);
          }
        }
      }

      await importComponent(data, variableMap);
      figma.ui.postMessage({
        type: 'status',
        text: `Component "${data.name}" mit ${data.combinations.length} Varianten erstellt.`,
        success: true,
      });
    }

    if (msg.type === 'generate-docs') {
      await generateDocumentation(msg.tokensForDocs!);
    }

    if (msg.type === 'close') {
      figma.closePlugin();
    }
  } catch (err) {
    figma.ui.postMessage({
      type: 'status',
      text: `Fehler: ${(err as Error).message}`,
      success: false,
    });
  }
};
