/**
 * Nordlig Form Builder — Figma Plugin
 *
 * Generiert Formulare aus Markdown-Tabellen.
 * Nutzt vorhandene DS-Komponenten (ComponentSets) wenn verfuegbar,
 * sonst Fallback auf Figma-Primitiven.
 */

// --- Types ---

interface FormFieldDefinition {
  name: string;
  type: string;
  required: boolean;
  hint: string;
  component: string;
  variantOverrides?: Record<string, string>;
}

interface FormDefinition {
  title: string;
  fields: FormFieldDefinition[];
  submitLabel: string;
  formWidth: number;
}

interface AvailableComponent {
  name: string;
  key: string;
  variants: Record<string, string[]>;
  defaultVariant: Record<string, string>;
}

// --- Design Token Values (hardcoded Fallback) ---

var DS = {
  color: {
    bgPaper: '#ffffff',
    bgSurface: '#f1f5f9',
    textBase: '#0f172a',
    textMuted: '#475569',
    textPlaceholder: '#94a3b8',
    textOnPrimary: '#f8fafc',
    primary: '#0ea5e9',
    error: '#ef4444',
    inputBg: '#ffffff',
    inputBorder: '#cbd5e1',
    checkboxBorder: '#cbd5e1',
    switchTrack: '#cbd5e1',
    switchThumb: '#ffffff',
    btnPrimaryBg: '#0ea5e9',
    btnPrimaryText: '#f8fafc',
    divider: '#e2e8f0',
  },
  sizing: {
    inputHeight: 40,
    checkboxSize: 20,
    radioSize: 20,
    switchWidth: 44,
    switchHeight: 24,
    switchThumb: 20,
  },
  spacing: {
    formPadding: 32,
    fieldGap: 24,
    labelGap: 6,
    inputPaddingX: 12,
    inputPaddingY: 8,
    checkboxGap: 10,
    radioItemGap: 12,
  },
  radius: {
    input: 6,
    form: 12,
    button: 6,
    checkbox: 4,
    full: 9999,
  },
  font: {
    family: 'Inter',
    fallback: 'Roboto',
    titleSize: 20,
    titleWeight: 600,
    labelSize: 14,
    labelWeight: 500,
    inputSize: 14,
    inputWeight: 400,
    hintSize: 12,
    hintWeight: 400,
    buttonSize: 14,
    buttonWeight: 500,
  },
};

// --- ComponentSet Registry ---

var componentSetMap: Map<string, ComponentSetNode> = new Map();

async function scanComponentSets(): Promise<AvailableComponent[]> {
  componentSetMap.clear();
  var results: AvailableComponent[] = [];

  // Load all pages before scanning
  await figma.loadAllPagesAsync();

  // Scan all pages for ComponentSets
  for (var p = 0; p < figma.root.children.length; p++) {
    var page = figma.root.children[p];
    var sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
    for (var s = 0; s < sets.length; s++) {
      var cs = sets[s] as ComponentSetNode;
      var name = cs.name;

      // Skip duplicates (first found wins)
      if (componentSetMap.has(name)) continue;
      componentSetMap.set(name, cs);

      // Extract variants from children
      var variantMap: Record<string, Set<string>> = {};
      var defaultVariant: Record<string, string> = {};

      for (var c = 0; c < cs.children.length; c++) {
        var child = cs.children[c];
        if (child.type === 'COMPONENT') {
          var props = child.variantProperties;
          if (props) {
            var keys = Object.keys(props);
            for (var k = 0; k < keys.length; k++) {
              var key = keys[k];
              if (!variantMap[key]) variantMap[key] = new Set();
              variantMap[key].add(props[key]);
            }
          }
        }
      }

      // Convert Sets to arrays and pick defaults
      var variants: Record<string, string[]> = {};
      var varKeys = Object.keys(variantMap);
      for (var vi = 0; vi < varKeys.length; vi++) {
        var vk = varKeys[vi];
        variants[vk] = Array.from(variantMap[vk]);
        // Default: prefer "default", "md", "false", or first value
        var vals = variants[vk];
        if (vals.indexOf('default') !== -1) defaultVariant[vk] = 'default';
        else if (vals.indexOf('md') !== -1) defaultVariant[vk] = 'md';
        else if (vals.indexOf('false') !== -1) defaultVariant[vk] = 'false';
        else if (vals.indexOf('unchecked') !== -1) defaultVariant[vk] = 'unchecked';
        else if (vals.indexOf('vertical') !== -1) defaultVariant[vk] = 'vertical';
        else defaultVariant[vk] = vals[0];
      }

      results.push({
        name: name,
        key: cs.key,
        variants: variants,
        defaultVariant: defaultVariant,
      });
    }
  }

  return results;
}

function findComponentVariant(
  setName: string,
  variantProps: Record<string, string>
): ComponentNode | null {
  var cs = componentSetMap.get(setName);
  if (!cs) return null;

  // Find matching component child
  for (var i = 0; i < cs.children.length; i++) {
    var child = cs.children[i];
    if (child.type !== 'COMPONENT') continue;
    var props = child.variantProperties;
    if (!props) continue;

    var match = true;
    var requestedKeys = Object.keys(variantProps);
    for (var k = 0; k < requestedKeys.length; k++) {
      var key = requestedKeys[k];
      if (props[key] !== variantProps[key]) {
        match = false;
        break;
      }
    }
    if (match) return child;
  }

  // Fallback: return default variant (first child)
  if (cs.children.length > 0 && cs.children[0].type === 'COMPONENT') {
    return cs.children[0] as ComponentNode;
  }
  return null;
}

// --- Helpers ---

function hexToFigmaRGB(hex: string): RGB | null {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) return null;
  var r = parseInt(hex.slice(0, 2), 16) / 255;
  var g = parseInt(hex.slice(2, 4), 16) / 255;
  var b = parseInt(hex.slice(4, 6), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r: r, g: g, b: b };
}

function hexToSolidPaint(hex: string): SolidPaint {
  var rgb = hexToFigmaRGB(hex);
  if (!rgb) rgb = { r: 0, g: 0, b: 0 };
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

async function loadFonts(): Promise<void> {
  var styles = ['Regular', 'Medium', 'SemiBold'];
  for (var i = 0; i < styles.length; i++) {
    try {
      await figma.loadFontAsync({ family: DS.font.family, style: styles[i] });
    } catch (_e) {
      await figma.loadFontAsync({ family: DS.font.fallback, style: 'Regular' });
    }
  }
  try {
    await figma.loadFontAsync({ family: DS.font.fallback, style: 'Regular' });
  } catch (_e) { /* ignore */ }
}

function createTextNode(content: string, opts: {
  size: number;
  weight: number;
  color: string;
  maxWidth?: number;
}): TextNode {
  var node = figma.createText();
  var style = fontWeightToStyle(opts.weight);
  try {
    node.fontName = { family: DS.font.family, style: style };
  } catch (_e) {
    node.fontName = { family: DS.font.fallback, style: 'Regular' };
  }
  node.characters = content;
  node.fontSize = opts.size;
  node.lineHeight = { value: Math.round(opts.size * 1.5), unit: 'PIXELS' };
  node.fills = [hexToSolidPaint(opts.color)];
  node.textAutoResize = 'WIDTH_AND_HEIGHT';
  return node;
}

function createDivider(): FrameNode {
  var div = figma.createFrame();
  div.name = 'Divider';
  div.resize(100, 1);
  div.fills = [hexToSolidPaint(DS.color.divider)];
  div.layoutSizingVertical = 'FIXED';
  return div;
}

// --- SVG Icons (Fallback when no real components available) ---

var ICON_CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

var ICON_CALENDAR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';

var ICON_UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';

var ICON_MINUS = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

var ICON_PLUS = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

function createSvgIcon(svg: string, size: number): FrameNode {
  var node = figma.createNodeFromSvg(svg);
  node.resize(size, size);
  node.layoutSizingHorizontal = 'FIXED';
  node.layoutSizingVertical = 'FIXED';
  return node;
}

// --- Component Instance Creators ---

// Mapping from form component type to DS ComponentSet name + default variant props
var COMPONENT_TYPE_MAP: Record<string, { setName: string; variantProps: Record<string, string> }> = {
  'input': { setName: 'Input', variantProps: { inputSize: 'md', state: 'default' } },
  'textarea': { setName: 'Textarea', variantProps: { inputSize: 'md', state: 'default' } },
  'select': { setName: 'Select', variantProps: { inputSize: 'md', state: 'default' } },
  'checkbox': { setName: 'Checkbox', variantProps: { state: 'unchecked', disabled: 'false' } },
  'switch': { setName: 'Switch', variantProps: { state: 'unchecked', disabled: 'false' } },
  'radio': { setName: 'RadioGroup', variantProps: { orientation: 'vertical', disabled: 'false' } },
  'label': { setName: 'Label', variantProps: { required: 'false', disabled: 'false' } },
  'button': { setName: 'Button', variantProps: { variant: 'primary', size: 'md', state: 'default' } },
};

// Field wrapper mapping — these contain Label + Component + Hint as one unit
var FIELD_TYPE_MAP: Record<string, { setName: string; variantProps: (field: FormFieldDefinition) => Record<string, string> }> = {
  'input': {
    setName: 'InputField',
    variantProps: function(f) { return { inputSize: 'md', state: 'default', required: f.required ? 'true' : 'false' }; }
  },
  'textarea': {
    setName: 'TextareaField',
    variantProps: function(f) { return { inputSize: 'md', state: 'default', required: f.required ? 'true' : 'false' }; }
  },
  'select': {
    setName: 'SelectField',
    variantProps: function(f) { return { inputSize: 'md', state: 'default', required: f.required ? 'true' : 'false' }; }
  },
  'switch': {
    setName: 'SwitchField',
    variantProps: function(_f) { return { state: 'unchecked', disabled: 'false' }; }
  },
};

function createComponentInstance(componentType: string, overrides?: Record<string, string>): InstanceNode | null {
  var mapping = COMPONENT_TYPE_MAP[componentType];
  if (!mapping) return null;

  var props = Object.assign({}, mapping.variantProps);
  if (overrides) {
    var oKeys = Object.keys(overrides);
    for (var oi = 0; oi < oKeys.length; oi++) {
      props[oKeys[oi]] = overrides[oKeys[oi]];
    }
  }

  var component = findComponentVariant(mapping.setName, props);
  if (!component) return null;

  return component.createInstance();
}

// --- Fallback Field Renderers (Primitiven) ---

function createInputVisual(placeholder: string): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'Input';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = DS.sizing.inputHeight;
  frame.paddingLeft = DS.spacing.inputPaddingX;
  frame.paddingRight = DS.spacing.inputPaddingX;
  frame.paddingTop = DS.spacing.inputPaddingY;
  frame.paddingBottom = DS.spacing.inputPaddingY;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [hexToSolidPaint(DS.color.inputBg)];
  frame.strokes = [hexToSolidPaint(DS.color.inputBorder)];
  frame.strokeWeight = 1;
  frame.strokeAlign = 'INSIDE';
  frame.cornerRadius = DS.radius.input;

  var text = createTextNode(placeholder, {
    size: DS.font.inputSize,
    weight: DS.font.inputWeight,
    color: DS.color.textPlaceholder,
  });
  frame.appendChild(text);
  text.layoutSizingHorizontal = 'FILL';

  return frame;
}

function renderInputFallback(field: FormFieldDefinition): FrameNode {
  var placeholders: Record<string, string> = {
    'email': 'name@example.com',
    'password': '********',
    'url': 'https://',
    'tel': '+49...',
    'phone': '+49...',
  };
  var placeholder = placeholders[field.type] || field.name + ' eingeben...';
  return createInputVisual(placeholder);
}

function renderTextareaFallback(_field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'Textarea';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = 100;
  frame.paddingLeft = DS.spacing.inputPaddingX;
  frame.paddingRight = DS.spacing.inputPaddingX;
  frame.paddingTop = DS.spacing.inputPaddingY;
  frame.paddingBottom = DS.spacing.inputPaddingY;
  frame.fills = [hexToSolidPaint(DS.color.inputBg)];
  frame.strokes = [hexToSolidPaint(DS.color.inputBorder)];
  frame.strokeWeight = 1;
  frame.strokeAlign = 'INSIDE';
  frame.cornerRadius = DS.radius.input;

  var text = createTextNode(_field.name + ' eingeben...', {
    size: DS.font.inputSize,
    weight: DS.font.inputWeight,
    color: DS.color.textPlaceholder,
  });
  frame.appendChild(text);
  text.layoutSizingHorizontal = 'FILL';

  return frame;
}

function renderSelectFallback(field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'Select';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = DS.sizing.inputHeight;
  frame.paddingLeft = DS.spacing.inputPaddingX;
  frame.paddingRight = DS.spacing.inputPaddingX;
  frame.paddingTop = DS.spacing.inputPaddingY;
  frame.paddingBottom = DS.spacing.inputPaddingY;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [hexToSolidPaint(DS.color.inputBg)];
  frame.strokes = [hexToSolidPaint(DS.color.inputBorder)];
  frame.strokeWeight = 1;
  frame.strokeAlign = 'INSIDE';
  frame.cornerRadius = DS.radius.input;

  var placeholder = 'Auswaehlen...';
  var text = createTextNode(placeholder, {
    size: DS.font.inputSize,
    weight: DS.font.inputWeight,
    color: DS.color.textPlaceholder,
  });
  frame.appendChild(text);
  text.layoutSizingHorizontal = 'FILL';

  var chevron = createSvgIcon(ICON_CHEVRON, 16);
  chevron.name = 'Chevron';
  frame.appendChild(chevron);

  return frame;
}

function renderCheckboxFallback(field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'CheckboxField';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.itemSpacing = DS.spacing.checkboxGap;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [];

  var box = figma.createFrame();
  box.name = 'Checkbox';
  box.resize(DS.sizing.checkboxSize, DS.sizing.checkboxSize);
  box.layoutSizingHorizontal = 'FIXED';
  box.layoutSizingVertical = 'FIXED';
  box.fills = [hexToSolidPaint(DS.color.inputBg)];
  box.strokes = [hexToSolidPaint(DS.color.checkboxBorder)];
  box.strokeWeight = 2;
  box.strokeAlign = 'INSIDE';
  box.cornerRadius = DS.radius.checkbox;
  frame.appendChild(box);

  var labelText = field.name + (field.required ? ' *' : '');
  var label = createTextNode(labelText, {
    size: DS.font.labelSize,
    weight: DS.font.labelWeight,
    color: DS.color.textBase,
  });
  frame.appendChild(label);

  return frame;
}

function renderSwitchFallback(field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'SwitchField';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.itemSpacing = DS.spacing.checkboxGap;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [];

  var track = figma.createFrame();
  track.name = 'Switch';
  track.resize(DS.sizing.switchWidth, DS.sizing.switchHeight);
  track.layoutSizingHorizontal = 'FIXED';
  track.layoutSizingVertical = 'FIXED';
  track.fills = [hexToSolidPaint(DS.color.switchTrack)];
  track.cornerRadius = DS.radius.full;
  track.layoutMode = 'HORIZONTAL';
  track.paddingLeft = 2;
  track.paddingTop = 2;
  track.paddingBottom = 2;
  track.counterAxisAlignItems = 'CENTER';

  var thumb = figma.createEllipse();
  thumb.name = 'Thumb';
  thumb.resize(DS.sizing.switchThumb, DS.sizing.switchThumb);
  thumb.fills = [hexToSolidPaint(DS.color.switchThumb)];
  track.appendChild(thumb);

  frame.appendChild(track);

  var labelText = field.name + (field.required ? ' *' : '');
  var label = createTextNode(labelText, {
    size: DS.font.labelSize,
    weight: DS.font.labelWeight,
    color: DS.color.textBase,
  });
  frame.appendChild(label);

  return frame;
}

function renderRadioFallback(field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'RadioGroup';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.itemSpacing = DS.spacing.radioItemGap;
  frame.fills = [];

  var options = field.hint ? field.hint.split(',').map(function(s) { return s.trim(); }) : ['Option 1', 'Option 2', 'Option 3'];

  for (var i = 0; i < options.length; i++) {
    var item = figma.createFrame();
    item.name = 'RadioItem';
    item.layoutMode = 'HORIZONTAL';
    item.primaryAxisSizingMode = 'AUTO';
    item.counterAxisSizingMode = 'AUTO';
    item.itemSpacing = DS.spacing.checkboxGap;
    item.counterAxisAlignItems = 'CENTER';
    item.fills = [];

    var outer = figma.createEllipse();
    outer.name = 'Radio';
    outer.resize(DS.sizing.radioSize, DS.sizing.radioSize);
    outer.fills = [hexToSolidPaint(DS.color.inputBg)];
    outer.strokes = [hexToSolidPaint(DS.color.checkboxBorder)];
    outer.strokeWeight = 2;
    outer.strokeAlign = 'INSIDE';
    item.appendChild(outer);

    var optText = createTextNode(options[i], {
      size: DS.font.inputSize,
      weight: DS.font.inputWeight,
      color: DS.color.textBase,
    });
    item.appendChild(optText);

    frame.appendChild(item);
  }

  return frame;
}

function renderNumberInputFallback(_field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'NumberInput';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = DS.sizing.inputHeight;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [hexToSolidPaint(DS.color.inputBg)];
  frame.strokes = [hexToSolidPaint(DS.color.inputBorder)];
  frame.strokeWeight = 1;
  frame.strokeAlign = 'INSIDE';
  frame.cornerRadius = DS.radius.input;
  frame.clipsContent = true;

  var minusBtn = figma.createFrame();
  minusBtn.name = 'Minus';
  minusBtn.resize(36, DS.sizing.inputHeight);
  minusBtn.layoutSizingHorizontal = 'FIXED';
  minusBtn.layoutSizingVertical = 'FILL';
  minusBtn.fills = [hexToSolidPaint(DS.color.bgSurface)];
  minusBtn.layoutMode = 'HORIZONTAL';
  minusBtn.primaryAxisAlignItems = 'CENTER';
  minusBtn.counterAxisAlignItems = 'CENTER';
  var minusIcon = createSvgIcon(ICON_MINUS, 16);
  minusBtn.appendChild(minusIcon);
  frame.appendChild(minusBtn);

  var valueArea = figma.createFrame();
  valueArea.name = 'Value';
  valueArea.layoutMode = 'HORIZONTAL';
  valueArea.primaryAxisSizingMode = 'FIXED';
  valueArea.counterAxisSizingMode = 'AUTO';
  valueArea.paddingLeft = DS.spacing.inputPaddingX;
  valueArea.paddingRight = DS.spacing.inputPaddingX;
  valueArea.paddingTop = DS.spacing.inputPaddingY;
  valueArea.paddingBottom = DS.spacing.inputPaddingY;
  valueArea.counterAxisAlignItems = 'CENTER';
  valueArea.primaryAxisAlignItems = 'CENTER';
  valueArea.fills = [];

  var text = createTextNode('0', {
    size: DS.font.inputSize,
    weight: DS.font.inputWeight,
    color: DS.color.textBase,
  });
  valueArea.appendChild(text);
  text.layoutSizingHorizontal = 'FILL';
  text.textAlignHorizontal = 'CENTER';

  frame.appendChild(valueArea);
  valueArea.layoutSizingHorizontal = 'FILL';

  var plusBtn = figma.createFrame();
  plusBtn.name = 'Plus';
  plusBtn.resize(36, DS.sizing.inputHeight);
  plusBtn.layoutSizingHorizontal = 'FIXED';
  plusBtn.layoutSizingVertical = 'FILL';
  plusBtn.fills = [hexToSolidPaint(DS.color.bgSurface)];
  plusBtn.layoutMode = 'HORIZONTAL';
  plusBtn.primaryAxisAlignItems = 'CENTER';
  plusBtn.counterAxisAlignItems = 'CENTER';
  var plusIcon = createSvgIcon(ICON_PLUS, 16);
  plusBtn.appendChild(plusIcon);
  frame.appendChild(plusBtn);

  return frame;
}

function renderDatePickerFallback(_field: FormFieldDefinition): FrameNode {
  var frame = createInputVisual('TT.MM.JJJJ');
  frame.name = 'DatePicker';
  var icon = createSvgIcon(ICON_CALENDAR, 16);
  icon.name = 'Calendar';
  frame.appendChild(icon);
  return frame;
}

function renderFileUploadFallback(_field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'FileUpload';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = 100;
  frame.paddingLeft = 24;
  frame.paddingRight = 24;
  frame.paddingTop = 24;
  frame.paddingBottom = 24;
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.itemSpacing = 8;
  frame.fills = [hexToSolidPaint(DS.color.bgSurface)];
  frame.strokes = [hexToSolidPaint(DS.color.inputBorder)];
  frame.strokeWeight = 2;
  frame.strokeAlign = 'INSIDE';
  frame.cornerRadius = DS.radius.input;
  frame.dashPattern = [6, 4];

  var icon = createSvgIcon(ICON_UPLOAD, 24);
  icon.name = 'UploadIcon';
  frame.appendChild(icon);

  var text = createTextNode('Datei auswaehlen oder hierhin ziehen', {
    size: DS.font.inputSize,
    weight: DS.font.inputWeight,
    color: DS.color.textMuted,
  });
  frame.appendChild(text);

  return frame;
}

function renderSliderFallback(_field: FormFieldDefinition): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'Slider';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = 24;
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [];

  var track = figma.createFrame();
  track.name = 'Track';
  track.resize(200, 4);
  track.fills = [hexToSolidPaint(DS.color.inputBorder)];
  track.cornerRadius = 2;
  frame.appendChild(track);
  track.layoutSizingHorizontal = 'FILL';
  track.layoutSizingVertical = 'FIXED';

  var thumb = figma.createEllipse();
  thumb.name = 'Thumb';
  thumb.resize(20, 20);
  thumb.fills = [hexToSolidPaint(DS.color.primary)];
  frame.appendChild(thumb);

  return frame;
}

// --- Main Render Functions ---

function renderField(field: FormFieldDefinition): FrameNode | InstanceNode {
  // --- Strategy 1: Try Field wrapper (InputField, SelectField, etc.) ---
  // These contain Label + Component + Hint as a single composed unit
  var fieldMapping = FIELD_TYPE_MAP[field.component];
  if (fieldMapping && componentSetMap.has(fieldMapping.setName)) {
    var fieldVariantProps = fieldMapping.variantProps(field);
    // Apply user variant overrides (e.g. inputSize, state)
    if (field.variantOverrides) {
      var overrideKeys = Object.keys(field.variantOverrides);
      for (var oi = 0; oi < overrideKeys.length; oi++) {
        fieldVariantProps[overrideKeys[oi]] = field.variantOverrides[overrideKeys[oi]];
      }
    }
    var fieldComp = findComponentVariant(fieldMapping.setName, fieldVariantProps);
    if (fieldComp) {
      var fieldInstance = fieldComp.createInstance();
      fieldInstance.name = field.name;
      return fieldInstance;
    }
  }

  // --- Strategy 2: Build from individual components (Label + Atom + Hint) ---
  var wrapper = figma.createFrame();
  wrapper.name = field.name;
  wrapper.layoutMode = 'VERTICAL';
  wrapper.primaryAxisSizingMode = 'AUTO';
  wrapper.counterAxisSizingMode = 'AUTO';
  wrapper.itemSpacing = DS.spacing.labelGap;
  wrapper.fills = [];

  // Label — checkbox and switch have inline labels, skip for those
  var inlineLabel = field.component === 'checkbox' || field.component === 'switch';

  if (!inlineLabel) {
    var labelInstance: InstanceNode | null = null;
    if (componentSetMap.has('Label')) {
      var reqProp = field.required ? 'true' : 'false';
      var labelComp = findComponentVariant('Label', { required: reqProp, disabled: 'false' });
      if (labelComp) {
        labelInstance = labelComp.createInstance();
        var labelTextNode = labelInstance.findOne(function(n) {
          return n.type === 'TEXT';
        }) as TextNode | null;
        if (labelTextNode) {
          var fontName = labelTextNode.fontName as FontName;
          try {
            figma.loadFontAsync(fontName).then(function() {
              if (labelTextNode) {
                labelTextNode.characters = field.name;
              }
            });
          } catch (_e) { /* ignore */ }
        }
      }
    }

    if (labelInstance) {
      wrapper.appendChild(labelInstance);
      labelInstance.layoutSizingHorizontal = 'FILL';
    } else {
      var labelText = field.name + (field.required ? ' *' : '');
      var label = createTextNode(labelText, {
        size: DS.font.labelSize,
        weight: DS.font.labelWeight,
        color: DS.color.textBase,
      });
      if (field.required) {
        var starStart = field.name.length + 1;
        label.setRangeFills(starStart, starStart + 1, [hexToSolidPaint(DS.color.error)]);
      }
      wrapper.appendChild(label);
      label.layoutSizingHorizontal = 'FILL';
    }
  }

  // Component — try real component first, then fallback
  var instance = createComponentInstance(field.component, field.variantOverrides);

  if (instance) {
    wrapper.appendChild(instance);
    instance.layoutSizingHorizontal = 'FILL';
  } else {
    var fallback: FrameNode | null = null;
    switch (field.component) {
      case 'input': fallback = renderInputFallback(field); break;
      case 'textarea': fallback = renderTextareaFallback(field); break;
      case 'select': fallback = renderSelectFallback(field); break;
      case 'checkbox': fallback = renderCheckboxFallback(field); break;
      case 'switch': fallback = renderSwitchFallback(field); break;
      case 'radio': fallback = renderRadioFallback(field); break;
      case 'number-input': fallback = renderNumberInputFallback(field); break;
      case 'date-picker': fallback = renderDatePickerFallback(field); break;
      case 'file-upload': fallback = renderFileUploadFallback(field); break;
      case 'slider': fallback = renderSliderFallback(field); break;
      default: fallback = renderInputFallback(field); break;
    }
    if (fallback) {
      wrapper.appendChild(fallback);
      fallback.layoutSizingHorizontal = 'FILL';
    }
  }

  // Hint text
  var showHint = field.hint && field.component !== 'select' && field.component !== 'radio';
  if (showHint) {
    var hint = createTextNode(field.hint, {
      size: DS.font.hintSize,
      weight: DS.font.hintWeight,
      color: DS.color.textMuted,
    });
    wrapper.appendChild(hint);
    hint.layoutSizingHorizontal = 'FILL';
  }

  return wrapper;
}

function createSubmitButton(label: string): FrameNode | InstanceNode {
  // Try real Button component
  var btnInstance = createComponentInstance('button');
  if (btnInstance) {
    // Try to override button text
    var btnTextNode = btnInstance.findOne(function(n) {
      return n.type === 'TEXT';
    }) as TextNode | null;
    if (btnTextNode) {
      var fontName = btnTextNode.fontName as FontName;
      try {
        figma.loadFontAsync(fontName).then(function() {
          if (btnTextNode) {
            btnTextNode.characters = label;
          }
        });
      } catch (_e) { /* ignore */ }
    }
    return btnInstance;
  }

  // Fallback
  var frame = figma.createFrame();
  frame.name = 'Submit';
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.minHeight = DS.sizing.inputHeight;
  frame.paddingLeft = 24;
  frame.paddingRight = 24;
  frame.paddingTop = 10;
  frame.paddingBottom = 10;
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.fills = [hexToSolidPaint(DS.color.btnPrimaryBg)];
  frame.cornerRadius = DS.radius.button;

  var text = createTextNode(label, {
    size: DS.font.buttonSize,
    weight: DS.font.buttonWeight,
    color: DS.color.btnPrimaryText,
  });
  frame.appendChild(text);

  return frame;
}

async function renderForm(form: FormDefinition): Promise<void> {
  await loadFonts();

  var formFrame = figma.createFrame();
  formFrame.name = form.title || 'Formular';
  formFrame.layoutMode = 'VERTICAL';
  formFrame.primaryAxisSizingMode = 'AUTO';
  formFrame.counterAxisSizingMode = 'FIXED';
  formFrame.resize(form.formWidth, 100);
  formFrame.paddingLeft = DS.spacing.formPadding;
  formFrame.paddingRight = DS.spacing.formPadding;
  formFrame.paddingTop = DS.spacing.formPadding;
  formFrame.paddingBottom = DS.spacing.formPadding;
  formFrame.itemSpacing = DS.spacing.fieldGap;
  formFrame.fills = [hexToSolidPaint(DS.color.bgPaper)];
  formFrame.cornerRadius = DS.radius.form;
  formFrame.strokes = [hexToSolidPaint(DS.color.divider)];
  formFrame.strokeWeight = 1;
  formFrame.strokeAlign = 'INSIDE';

  // Title
  if (form.title) {
    var title = createTextNode(form.title, {
      size: DS.font.titleSize,
      weight: DS.font.titleWeight,
      color: DS.color.textBase,
    });
    formFrame.appendChild(title);
    title.layoutSizingHorizontal = 'FILL';

    var divider = createDivider();
    formFrame.appendChild(divider);
    divider.layoutSizingHorizontal = 'FILL';
  }

  // Fields
  for (var i = 0; i < form.fields.length; i++) {
    figma.ui.postMessage({
      type: 'log',
      text: 'Feld ' + (i + 1) + '/' + form.fields.length + ': ' + form.fields[i].name,
    });

    var fieldFrame = renderField(form.fields[i]);
    formFrame.appendChild(fieldFrame);
    fieldFrame.layoutSizingHorizontal = 'FILL';
  }

  // Submit button
  var submitBtn = createSubmitButton(form.submitLabel || 'Absenden');
  formFrame.appendChild(submitBtn);

  // Position and focus
  formFrame.x = Math.round(figma.viewport.center.x - form.formWidth / 2);
  formFrame.y = Math.round(figma.viewport.center.y - 200);

  figma.currentPage.selection = [formFrame];
  figma.viewport.scrollAndZoomIntoView([formFrame]);
}

// --- Plugin Entry ---

figma.showUI(__html__, { width: 520, height: 680 });

// Scan for available components and send to UI
scanComponentSets().then(function(components) {
  figma.ui.postMessage({
    type: 'available-components',
    components: components,
  });
});

figma.ui.onmessage = async function(msg: {
  type: string;
  form?: FormDefinition;
}) {
  try {
    if (msg.type === 'rescan-components') {
      var components = await scanComponentSets();
      figma.ui.postMessage({
        type: 'available-components',
        components: components,
      });
    }

    if (msg.type === 'generate-form' && msg.form) {
      figma.ui.postMessage({ type: 'log', text: 'Generiere Formular...' });
      await renderForm(msg.form);
      figma.ui.postMessage({
        type: 'status',
        text: 'Formular mit ' + msg.form.fields.length + ' Feldern erstellt!',
        success: true,
      });
    }

    if (msg.type === 'close') {
      figma.closePlugin();
    }
  } catch (err) {
    figma.ui.postMessage({
      type: 'status',
      text: 'Fehler: ' + (err instanceof Error ? err.message : String(err)),
      success: false,
    });
  }
};
