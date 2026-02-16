/**
 * Token Extractor — Parst tokens.css + dark-tokens.css → tokens.json
 *
 * Liest alle CSS Custom Properties aus :root (light) und .dark (dark mode),
 * gruppiert sie in Collections (color, sizing, spacing, etc.) und
 * konvertiert Werte in Figma-kompatible Formate.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STYLES_DIR = resolve(__dirname, '../../../packages/styles/dist');
const OUTPUT_DIR = resolve(__dirname, '../output');

// --- Types ---

interface TokenVariable {
  type: 'COLOR' | 'FLOAT';
  level?: string;  // 'L1 Base' | 'L2 Global' | 'L3 Role' | 'L4 Component'
  scopes?: string[];
  [mode: string]: string | number | string[] | undefined;
}

interface TokenCollection {
  modes: string[];
  variables: Record<string, TokenVariable>;
}

interface TokenOutput {
  extractedAt: string;
  collections: Record<string, TokenCollection>;
}

// --- CSS Parsing ---

function parseCSSVariables(css: string, selector: ':root' | '.dark'): Record<string, string> {
  const vars: Record<string, string> = {};

  // Match the selector block
  const selectorEscaped = selector.replace('.', '\\.');
  const regex = new RegExp(`${selectorEscaped}\\s*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, 'gs');

  // Simpler approach: find the selector, then extract all --var: value pairs
  const selectorIndex = css.indexOf(selector === ':root' ? ':root {' : '.dark {');
  if (selectorIndex === -1) return vars;

  // Find matching closing brace
  let braceCount = 0;
  let blockStart = -1;
  let blockEnd = -1;
  for (let i = selectorIndex; i < css.length; i++) {
    if (css[i] === '{') {
      if (braceCount === 0) blockStart = i + 1;
      braceCount++;
    } else if (css[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        blockEnd = i;
        break;
      }
    }
  }

  if (blockStart === -1 || blockEnd === -1) return vars;

  const block = css.slice(blockStart, blockEnd);

  // Extract --property: value pairs (ignoring comments)
  const propRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = propRegex.exec(block)) !== null) {
    const name = match[1].trim();
    let value = match[2].trim();
    // Remove inline comments
    value = value.replace(/\/\*.*?\*\//g, '').trim();
    vars[name] = value;
  }

  return vars;
}

// --- Value Conversion ---

function hexToRGB01(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) return null;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return { r: Math.round(r * 1000) / 1000, g: Math.round(g * 1000) / 1000, b: Math.round(b * 1000) / 1000 };
}

function isColorValue(value: string): boolean {
  return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl');
}

function parseDimension(value: string): number | null {
  if (value.endsWith('px')) {
    return parseFloat(value);
  }
  if (value.endsWith('rem')) {
    return parseFloat(value) * 16;
  }
  if (value.endsWith('em')) {
    return parseFloat(value) * 16;
  }
  if (value.endsWith('%')) {
    return parseFloat(value);
  }
  const num = parseFloat(value);
  if (!isNaN(num) && value === String(num)) {
    return num;
  }
  return null;
}

function classifyToken(name: string): string {
  if (name.startsWith('--color-')) return 'color';
  if (name.startsWith('--sizing-')) return 'sizing';
  if (name.startsWith('--spacing-')) return 'spacing';
  if (name.startsWith('--radius-')) return 'radius';
  if (name.startsWith('--font-')) return 'typography';
  if (name.startsWith('--shadow-')) return 'shadow';
  if (name.startsWith('--opacity-')) return 'opacity';
  return 'other';
}

// --- Token Hierarchy Level Classification ---

const KNOWN_COMPONENTS = [
  'btn', 'input', 'badge', 'checkbox', 'alert', 'icon', 'table',
  'code', 'bq', 'kbd', 'hl', 'img', 'menubar', 'toolbar', 'rsz',
  'toast', 'dialog', 'popover', 'tooltip', 'avatar', 'card',
  'tag', 'switch', 'radio', 'select', 'textarea',
];

// L3 Color Role groups (top-level keys from roles/colors.json)
const L3_COLOR_ROLE_GROUPS = [
  'bg', 'text', 'border', 'interactive',
  'success', 'warning', 'error', 'info',
];

function classifyTokenLevel(name: string): string {
  // L1 Base: contains -base- or is a primitive typography token
  if (name.includes('-base-')) return 'L1 Base';
  if (/^--font-(size|weight|line-height|family)-/.test(name) &&
      !name.includes('-component-')) return 'L1 Base';

  // L3 Role: contains -component- (sizing, spacing, radius, typography)
  if (name.includes('-component-')) return 'L3 Role';

  // L3 Role: color role tokens (from roles/colors.json)
  if (name.startsWith('--color-')) {
    const colorStripped = name.replace(/^--color-/, '');
    const firstSegment = colorStripped.split('-')[0];
    if (L3_COLOR_ROLE_GROUPS.includes(firstSegment)) return 'L3 Role';
  }

  // L4 Component: first segment after category prefix is a known component name
  const stripped = name.replace(/^--(color|sizing|spacing|radius|font|opacity)-/, '');
  const firstSegment = stripped.split('-')[0];
  if (KNOWN_COMPONENTS.includes(firstSegment)) return 'L4 Component';

  // L2 Global: everything else (palette tokens like --color-primary-1-500, etc.)
  return 'L2 Global';
}

function inferScopes(name: string): string[] {
  if (name.includes('-bg')) return ['FRAME_FILL', 'SHAPE_FILL'];
  if (name.includes('-text')) return ['TEXT_FILL'];
  if (name.includes('-border') || name.includes('-stroke')) return ['STROKE_COLOR'];
  if (name.includes('-shadow')) return ['EFFECT_COLOR'];
  return ['ALL_SCOPES'];
}

// --- var() Reference Extraction ---

/**
 * Extract direct var() reference from a raw CSS value.
 * Returns the referenced custom property name, or null if the value is not a simple var() reference.
 * Only matches simple `var(--name)`, not compound values like `1px solid var(--name)`.
 */
function extractVarReference(value: string): string | null {
  const match = value.match(/^var\((--[\w-]+)\)$/);
  return match ? match[1] : null;
}

// --- var() Resolution ---

function resolveVarReferences(vars: Record<string, string>): Record<string, string> {
  const resolved: Record<string, string> = {};
  const MAX_DEPTH = 10;

  function resolve(value: string, depth: number): string {
    if (depth > MAX_DEPTH) return value;
    const varMatch = value.match(/var\((--[\w-]+)\)/);
    if (!varMatch) return value;
    const refName = varMatch[1];
    const refValue = vars[refName];
    if (!refValue) return value;
    // Replace var() with the referenced value and resolve recursively
    const newValue = value.replace(`var(${refName})`, refValue);
    return resolve(newValue, depth + 1);
  }

  for (const [name, value] of Object.entries(vars)) {
    resolved[name] = resolve(value, 0);
  }

  return resolved;
}

// --- Main ---

function main() {
  console.log('Extracting tokens from CSS...');

  const tokensCss = readFileSync(resolve(STYLES_DIR, 'tokens.css'), 'utf-8');
  const darkTokensCss = readFileSync(resolve(STYLES_DIR, 'dark-tokens.css'), 'utf-8');

  const lightVarsRaw = parseCSSVariables(tokensCss, ':root');
  const darkVarsRaw = parseCSSVariables(darkTokensCss, '.dark');

  // Resolve var() references to get actual values
  const lightVars = resolveVarReferences(lightVarsRaw);

  // Dark mode: merge dark overrides onto light, then resolve ALL
  // This correctly resolves var() chains where dark overrides intermediate tokens
  const mergedForDark = { ...lightVarsRaw, ...darkVarsRaw };
  const darkVarsAllResolved = resolveVarReferences(mergedForDark);

  console.log(`  Light mode: ${Object.keys(lightVars).length} variables`);
  console.log(`  Dark mode:  ${Object.keys(darkVarsRaw).length} overrides`);

  // Build collections
  const collections: Record<string, TokenCollection> = {};

  // Process light mode variables
  for (const [name, value] of Object.entries(lightVars)) {
    const category = classifyToken(name);

    // Skip shadow tokens (compound values, not directly usable as Figma variables)
    if (category === 'shadow') continue;

    if (!collections[category]) {
      collections[category] = {
        modes: category === 'color' ? ['light', 'dark'] : ['default'],
        variables: {},
      };
    }

    const isColor = category === 'color' && isColorValue(value);

    if (isColor) {
      const rgb = hexToRGB01(value);
      if (!rgb) continue; // Skip rgba/hsla for now

      const variable: TokenVariable = {
        type: 'COLOR',
        level: classifyTokenLevel(name),
        scopes: inferScopes(name),
        light: value,
      };

      // Get dark mode value (resolved through var() chain with dark overrides)
      const darkValue = darkVarsAllResolved[name];
      if (darkValue && isColorValue(darkValue)) {
        const darkRgb = hexToRGB01(darkValue);
        if (darkRgb) {
          variable.dark = darkValue;
        } else {
          variable.dark = value;
        }
      } else {
        variable.dark = value;
      }

      // Track var() references for Figma alias creation
      const lightRef = extractVarReference(lightVarsRaw[name]);
      if (lightRef) {
        variable.lightRef = lightRef;
        // If dark mode has its own override, track its ref separately
        const darkRawValue = darkVarsRaw[name];
        if (darkRawValue) {
          const darkRefVal = extractVarReference(darkRawValue);
          variable.darkRef = darkRefVal || lightRef;
        } else {
          // No dark override — same alias applies to both modes
          variable.darkRef = lightRef;
        }
      }

      collections[category].variables[name] = variable;
    } else {
      const numValue = parseDimension(value);
      if (numValue !== null) {
        collections[category] = collections[category] || {
          modes: ['default'],
          variables: {},
        };
        const floatVar: TokenVariable = {
          type: 'FLOAT',
          level: classifyTokenLevel(name),
          default: numValue,
        };
        // Track var() reference for FLOAT tokens too
        const ref = extractVarReference(lightVarsRaw[name]);
        if (ref) floatVar.defaultRef = ref;
        collections[category].variables[name] = floatVar;
      }
    }
  }

  // Also process dark-only variables that don't exist in light
  for (const [name] of Object.entries(darkVarsRaw)) {
    const category = classifyToken(name);
    if (category === 'shadow') continue;
    if (collections[category]?.variables[name]) continue; // Already processed

    const resolvedValue = darkVarsAllResolved[name];
    if (category === 'color' && resolvedValue && isColorValue(resolvedValue)) {
      if (!collections[category]) {
        collections[category] = { modes: ['light', 'dark'], variables: {} };
      }
      collections[category].variables[name] = {
        type: 'COLOR',
        level: classifyTokenLevel(name),
        scopes: inferScopes(name),
        light: resolvedValue,
        dark: resolvedValue,
      };
    }
  }

  const output: TokenOutput = {
    extractedAt: new Date().toISOString(),
    collections,
  };

  // Stats
  let totalVars = 0;
  for (const [category, collection] of Object.entries(collections)) {
    const count = Object.keys(collection.variables).length;
    totalVars += count;
    console.log(`  ${category}: ${count} variables (modes: ${collection.modes.join(', ')})`);
  }
  console.log(`  Total: ${totalVars} variables`);

  // Write output
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = resolve(OUTPUT_DIR, 'tokens.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nWritten to: ${outputPath}`);
}

main();
