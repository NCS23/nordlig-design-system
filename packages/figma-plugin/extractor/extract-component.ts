/**
 * Component Extractor — Rendert Storybook-Stories mit Playwright
 * und extrahiert Computed Styles + Layout-Daten für den Figma Import.
 *
 * Usage: pnpm extract:button
 * Requires: Storybook running on localhost:6006
 */

import { chromium, type Page } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, '../output/components');
const TOKENS_PATH = resolve(__dirname, '../output/tokens.json');
const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006';

// --- Types ---

type InteractionState = 'default' | 'hover' | 'active' | 'disabled';

interface VariantConfig {
  storyId: string;
  args?: Record<string, string>;
  props: Record<string, string>;
  label: string;
  state: InteractionState;
}

interface ComponentConfig {
  name: string;
  category: string;
  selector: string; // CSS selector for the target element within #storybook-root
  variants: Record<string, string[]>;
  defaultVariant: Record<string, string>;
  combinations: VariantConfig[];
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
  tokenBindings: Record<string, string>;
}

interface ComponentOutput {
  name: string;
  category: string;
  extractedAt: string;
  variants: Record<string, string[]>;
  defaultVariant: Record<string, string>;
  combinations: ExtractedCombination[];
}

// --- Button Configuration ---

const BUTTON_CONFIG: ComponentConfig = {
  name: 'Button',
  category: 'atoms',
  selector: 'button',
  variants: {
    variant: ['primary', 'secondary', 'ghost'],
    size: ['sm', 'md', 'lg'],
    state: ['default', 'hover', 'active', 'disabled'],
  },
  defaultVariant: { variant: 'primary', size: 'md', state: 'default' },
  combinations: generateButtonCombinations(),
};

function generateButtonCombinations(): VariantConfig[] {
  const variants = ['primary', 'secondary', 'ghost'];
  const sizes = ['sm', 'md', 'lg'];
  const states: InteractionState[] = ['default', 'hover', 'active', 'disabled'];
  const labels: Record<string, string> = {
    primary: 'Primary Button',
    secondary: 'Secondary Button',
    ghost: 'Ghost Button',
  };

  const combos: VariantConfig[] = [];
  for (const variant of variants) {
    for (const size of sizes) {
      for (const state of states) {
        const args: Record<string, string> = {};
        if (size !== 'md') args.size = size;
        if (state === 'disabled') args.disabled = '!true';

        combos.push({
          storyId: `atoms-button--${variant}`,
          args: Object.keys(args).length > 0 ? args : undefined,
          props: { variant, size, state },
          label: labels[variant],
          state,
        });
      }
    }
  }
  return combos;
}

// --- Alert Configuration ---

const ALERT_CONFIG: ComponentConfig = {
  name: 'Alert',
  category: 'atoms',
  selector: '[role="alert"]',
  variants: {
    variant: ['info', 'success', 'warning', 'error'],
    closeable: ['false', 'true'],
  },
  defaultVariant: { variant: 'info', closeable: 'false' },
  combinations: generateAlertCombinations(),
};

function generateAlertCombinations(): VariantConfig[] {
  const variants = ['info', 'success', 'warning', 'error'];
  const closeables = ['false', 'true'];
  const labels: Record<string, string> = {
    info: 'Information',
    success: 'Erfolg',
    warning: 'Warnung',
    error: 'Fehler',
  };

  const combos: VariantConfig[] = [];
  for (const variant of variants) {
    for (const closeable of closeables) {
      combos.push({
        storyId: closeable === 'true'
          ? 'atoms-alert--with-close-button'
          : 'atoms-alert--all-variants',
        props: { variant, closeable },
        label: labels[variant],
        state: 'default',
      });
    }
  }
  return combos;
}

// --- Icon Configuration ---

const ICON_NAMES = [
  'Info', 'CheckCircle', 'AlertTriangle', 'XCircle', 'X',
  'Search', 'Star', 'Copy', 'Check', 'Eye', 'EyeOff',
  'Sun', 'Moon', 'ChevronLeft', 'ChevronRight', 'UploadCloud', 'File', 'Heart',
];

const ICON_SIZE_NAMES = ['sm', 'md', 'lg', 'xl'];

const ICON_SIZES: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

function generateIconCombinations(): VariantConfig[] {
  const combos: VariantConfig[] = [];
  for (const icon of ICON_NAMES) {
    for (const size of ICON_SIZE_NAMES) {
      combos.push({
        storyId: 'atoms-icon--gallery',
        props: { icon, size },
        label: icon,
        state: 'default',
      });
    }
  }
  return combos;
}

const ICON_CONFIG: ComponentConfig = {
  name: 'Icon',
  category: 'atoms',
  selector: 'svg',
  variants: {
    icon: ICON_NAMES,
    size: ICON_SIZE_NAMES,
  },
  defaultVariant: { icon: 'Info', size: 'md' },
  combinations: generateIconCombinations(),
};

// --- Badge Configuration ---

function generateBadgeCombinations(): VariantConfig[] {
  const variants = ['success', 'warning', 'error', 'info', 'neutral'];
  const sizes = ['sm', 'md', 'lg'];
  const combos: VariantConfig[] = [];
  for (const variant of variants) {
    for (const size of sizes) {
      const args: Record<string, string> = {};
      if (size !== 'md') args.size = size;
      combos.push({
        storyId: `atoms-badge--${variant}`,
        args: Object.keys(args).length > 0 ? args : undefined,
        props: { variant, size },
        label: variant.charAt(0).toUpperCase() + variant.slice(1),
        state: 'default',
      });
    }
  }
  return combos;
}

const BADGE_CONFIG: ComponentConfig = {
  name: 'Badge',
  category: 'atoms',
  selector: 'span',
  variants: {
    variant: ['success', 'warning', 'error', 'info', 'neutral'],
    size: ['sm', 'md', 'lg'],
  },
  defaultVariant: { variant: 'neutral', size: 'md' },
  combinations: generateBadgeCombinations(),
};

// --- Input Configuration ---

function generateInputCombinations(): VariantConfig[] {
  const sizes = ['sm', 'md', 'lg'];
  const states: InteractionState[] = ['default', 'hover', 'active', 'disabled'];
  // We repurpose InteractionState: 'hover' = focus, 'active' = error for Input
  const inputStates = ['default', 'focus', 'disabled', 'error'];
  const stateToStory: Record<string, string> = {
    default: 'atoms-input--default',
    focus: 'atoms-input--default',     // derived from default
    disabled: 'atoms-input--disabled',
    error: 'atoms-input--error',
  };

  const combos: VariantConfig[] = [];
  for (const size of sizes) {
    for (const state of inputStates) {
      const args: Record<string, string> = {};
      if (size !== 'md') args.inputSize = size;
      combos.push({
        storyId: stateToStory[state],
        args: Object.keys(args).length > 0 ? args : undefined,
        props: { inputSize: size, state },
        label: `Input ${size}`,
        state: state === 'focus' ? 'hover' : state === 'error' ? 'active' : state as InteractionState,
      });
    }
  }
  return combos;
}

const INPUT_CONFIG: ComponentConfig = {
  name: 'Input',
  category: 'atoms',
  selector: 'input',
  variants: {
    inputSize: ['sm', 'md', 'lg'],
    state: ['default', 'focus', 'disabled', 'error'],
  },
  defaultVariant: { inputSize: 'md', state: 'default' },
  combinations: generateInputCombinations(),
};

// --- Checkbox Configuration ---

function generateCheckboxCombinations(): VariantConfig[] {
  const states = ['unchecked', 'checked', 'indeterminate'];
  const disabledValues = ['false', 'true'];
  const interactions = ['default', 'hover'];
  const combos: VariantConfig[] = [];
  for (const state of states) {
    for (const disabled of disabledValues) {
      for (const interaction of interactions) {
        // Skip hover for disabled variants (disabled elements have no hover state)
        if (disabled === 'true' && interaction === 'hover') continue;
        combos.push({
          storyId: 'atoms-checkbox--all-states',
          props: { state, disabled, interaction },
          label: state.charAt(0).toUpperCase() + state.slice(1),
          state: 'default',
        });
      }
    }
  }
  return combos;
}

const CHECKBOX_CONFIG: ComponentConfig = {
  name: 'Checkbox',
  category: 'atoms',
  selector: '[role="checkbox"]',
  variants: {
    state: ['unchecked', 'checked', 'indeterminate'],
    disabled: ['false', 'true'],
    interaction: ['default', 'hover'],
  },
  defaultVariant: { state: 'unchecked', disabled: 'false', interaction: 'default' },
  combinations: generateCheckboxCombinations(),
};

// --- CheckboxField Configuration ---

function generateCheckboxFieldCombinations(): VariantConfig[] {
  const states = ['unchecked', 'checked', 'indeterminate'];
  const disabledValues = ['false', 'true'];
  const hasDescValues = ['false', 'true'];
  const combos: VariantConfig[] = [];
  for (const state of states) {
    for (const disabled of disabledValues) {
      for (const hasDescription of hasDescValues) {
        combos.push({
          storyId: 'atoms-checkbox--with-label', // base story, overridden per variant
          props: { state, disabled, hasDescription },
          label: `${state} ${disabled === 'true' ? 'disabled' : ''} ${hasDescription === 'true' ? 'desc' : ''}`.trim(),
          state: 'default',
        });
      }
    }
  }
  return combos;
}

const CHECKBOXFIELD_CONFIG: ComponentConfig = {
  name: 'CheckboxField',
  category: 'atoms',
  selector: '.flex.items-start',
  variants: {
    state: ['unchecked', 'checked', 'indeterminate'],
    disabled: ['false', 'true'],
    hasDescription: ['false', 'true'],
  },
  defaultVariant: { state: 'unchecked', disabled: 'false', hasDescription: 'false' },
  combinations: generateCheckboxFieldCombinations(),
};

// --- Token Reverse Map ---

interface TokenEntry {
  name: string;
  value: string;
}

function buildTokenList(): TokenEntry[] {
  const entries: TokenEntry[] = [];
  try {
    const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf-8'));
    for (const collection of Object.values(tokens.collections) as any[]) {
      for (const [name, variable] of Object.entries(collection.variables) as [string, any][]) {
        if (variable.light && typeof variable.light === 'string') {
          entries.push({ name, value: variable.light.toLowerCase() });
        } else if (variable.default !== undefined && typeof variable.default === 'number') {
          entries.push({ name, value: String(variable.default) });
        }
      }
    }
  } catch {
    console.warn('Warning: tokens.json not found. Run extract:tokens first.');
  }
  return entries;
}

/**
 * Find the best matching token for a hex value, preferring component-specific tokens.
 * E.g. for componentPrefix "btn", "--color-btn-primary-bg" beats "--color-toggle-active-border"
 *
 * State-aware: for hover/active states, matches tokens with the state suffix first.
 * For disabled, matches shared disabled tokens (--color-btn-disabled-bg).
 */
function findToken(
  tokenList: TokenEntry[],
  hexValue: string,
  componentPrefix: string,
  property?: string, // "bg", "text", "border"
  state: InteractionState = 'default',
): string | null {
  const hex = hexValue.toLowerCase();
  const matches = tokenList.filter(t => t.value === hex);
  if (matches.length === 0) return null;

  // For disabled state, look for shared disabled tokens first
  if (state === 'disabled' && property) {
    const disabledToken = matches.find(t =>
      t.name.includes(`-${componentPrefix}-disabled-`) && t.name.endsWith(`-${property}`)
    );
    if (disabledToken) return disabledToken.name;
    // Also try just ending with -disabled-{property}
    const disabledFallback = matches.find(t =>
      t.name.includes(`-${componentPrefix}-`) && t.name.includes('disabled')
    );
    if (disabledFallback) return disabledFallback.name;
  }

  // For hover/active states, look for state-suffixed tokens first
  if ((state === 'hover' || state === 'active') && property) {
    const stateToken = matches.find(t =>
      t.name.includes(`-${componentPrefix}-`) && t.name.endsWith(`-${property}-${state}`)
    );
    if (stateToken) return stateToken.name;
  }

  // Priority 1: exact component + property match (e.g. --color-btn-primary-bg)
  if (property) {
    const exact = matches.find(t =>
      t.name.includes(`-${componentPrefix}-`) && t.name.endsWith(`-${property}`)
    );
    if (exact) return exact.name;
  }

  // Priority 2: component token (e.g. --color-btn-*)
  const componentMatch = matches.find(t => t.name.includes(`-${componentPrefix}-`));
  if (componentMatch) return componentMatch.name;

  // Priority 3: L3 role token (e.g. --color-bg-primary)
  const l3Match = matches.find(t =>
    /^--color-(bg|text|border|interactive)-/.test(t.name)
  );
  if (l3Match) return l3Match.name;

  // Fallback: first match
  return matches[0].name;
}

/**
 * Find the best matching token for a numeric value (padding, radius, height).
 * Prioritizes component-specific tokens over generic ones.
 */
function findNumericToken(
  tokenList: TokenEntry[],
  value: number,
  componentPrefix: string,
  category: string, // 'spacing', 'radius', 'sizing', 'font-base-size', etc.
  tolerance: number = 0.5,
): string | null {
  if (value === 0) return null;
  const matches = tokenList.filter(t => {
    const numVal = parseFloat(t.value);
    return !isNaN(numVal) && Math.abs(numVal - value) < tolerance;
  });
  if (matches.length === 0) return null;

  const categoryPrefix = `--${category}-`;

  // Only match tokens from the correct category to avoid cross-category false matches
  const categoryMatches = matches.filter(t => t.name.startsWith(categoryPrefix));
  if (categoryMatches.length === 0) return null;

  // Sort by distance (closest match first)
  categoryMatches.sort((a, b) => {
    const distA = Math.abs(parseFloat(a.value) - value);
    const distB = Math.abs(parseFloat(b.value) - value);
    return distA - distB;
  });

  // Priority 1: component-specific within category (e.g. --spacing-btn-padding-x or --radius-alert)
  // But only if it's the closest or very close to the closest
  const closestDist = Math.abs(parseFloat(categoryMatches[0].value) - value);
  const compCatMatches = categoryMatches.filter(t =>
    (t.name.includes(`-${componentPrefix}-`) || t.name.endsWith(`-${componentPrefix}`)) &&
    Math.abs(parseFloat(t.value) - value) <= closestDist + 0.01
  );
  if (compCatMatches.length > 0) return compCatMatches[0].name;

  // Priority 2: closest generic category token (e.g. --radius-base-md)
  return categoryMatches[0].name;
}

/**
 * Find an L4 component-specific token by constructing the expected name.
 * Token naming convention:
 *   Size-specific: --sizing-{prefix}-{size}-{property}  (e.g., --sizing-btn-sm-padding-x)
 *   Size-independent: --sizing-{prefix}-{property}      (e.g., --sizing-btn-border-width)
 *   Spacing: --spacing-{prefix}-{property}              (e.g., --spacing-btn-gap)
 */
function findL4Token(
  tokenList: TokenEntry[],
  componentPrefix: string,
  sizeKey: string,
  propertyName: string,
): string | null {
  // 1. Try size-specific sizing token: --sizing-btn-sm-padding-x
  if (sizeKey) {
    const sizedName = `--sizing-${componentPrefix}-${sizeKey}-${propertyName}`;
    if (tokenList.some(t => t.name === sizedName)) return sizedName;
  }
  // 2. Try size-independent sizing token: --sizing-btn-border-width
  const unsizedName = `--sizing-${componentPrefix}-${propertyName}`;
  if (tokenList.some(t => t.name === unsizedName)) return unsizedName;
  // 3. Try spacing token: --spacing-btn-gap
  const spacingName = `--spacing-${componentPrefix}-${propertyName}`;
  if (tokenList.some(t => t.name === spacingName)) return spacingName;
  return null;
}

function rgbToHex(rgb: string): string | null {
  // Check for transparent rgba(0, 0, 0, 0)
  const alphaMatch = rgb.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (alphaMatch && parseFloat(alphaMatch[4]) === 0) return null; // transparent

  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

/**
 * Map CSS system font names to actual font families usable in Figma.
 * Tailwind's default font-family: ui-sans-serif, system-ui, ... → Inter
 */
function mapSystemFont(family: string): string {
  const systemFonts = [
    'ui-sans-serif', 'system-ui', '-apple-system',
    'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue',
  ];
  if (systemFonts.includes(family)) return 'Inter';
  if (family === 'ui-monospace' || family === 'SFMono-Regular') return 'Roboto Mono';
  if (family === 'ui-serif' || family === 'Georgia') return 'Roboto Slab';
  return family;
}

// --- Storybook Navigation ---

async function gotoStory(page: Page, storyId: string, args?: Record<string, string>) {
  let url = `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`;
  if (args) {
    const argsStr = Object.entries(args).map(([k, v]) => `${k}:${v}`).join(';');
    url += `&args=${argsStr}`;
  }
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
  await page.waitForTimeout(500);
}

// --- Style Extraction ---

async function extractElementData(
  page: Page,
  selector: string,
  tokenList: TokenEntry[],
  componentPrefix: string,
  props: Record<string, string>,
  state: InteractionState = 'default',
): Promise<{ layout: ExtractedLayout; styles: ExtractedStyles; text: ExtractedText; tokenBindings: Record<string, string> }> {
  const data = await page.evaluate((sel: string) => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');

    const el = root.querySelector(sel);
    if (!el) throw new Error(`Element "${sel}" not found in storybook root`);

    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    return {
      // Layout
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      display: cs.display,
      flexDirection: cs.flexDirection,
      alignItems: cs.alignItems,
      justifyContent: cs.justifyContent,
      gap: cs.gap,
      paddingLeft: parseFloat(cs.paddingLeft) || 0,
      paddingRight: parseFloat(cs.paddingRight) || 0,
      paddingTop: parseFloat(cs.paddingTop) || 0,
      paddingBottom: parseFloat(cs.paddingBottom) || 0,

      // Colors
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      borderColor: cs.borderColor,
      borderWidth: parseFloat(cs.borderWidth) || 0,

      // Shape
      borderRadius: parseFloat(cs.borderRadius) || 0,

      // Typography
      fontSize: parseFloat(cs.fontSize) || 16,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      lineHeight: parseFloat(cs.lineHeight) || 0,
      letterSpacing: parseFloat(cs.letterSpacing) || 0,
      textContent: (el.textContent || '').trim(),
    };
  }, selector);

  // Convert rgb() to hex for token matching
  const bgHex = rgbToHex(data.backgroundColor);
  const textHex = rgbToHex(data.color);
  const borderHex = rgbToHex(data.borderColor);

  // Map alignment values to Figma equivalents
  const alignMap: Record<string, string> = {
    'flex-start': 'MIN',
    'start': 'MIN',
    'center': 'CENTER',
    'flex-end': 'MAX',
    'end': 'MAX',
    'space-between': 'SPACE_BETWEEN',
  };

  const layout: ExtractedLayout = {
    width: data.width,
    height: data.height,
    direction: data.flexDirection === 'column' ? 'VERTICAL' : 'HORIZONTAL',
    paddingLeft: Math.round(data.paddingLeft),
    paddingRight: Math.round(data.paddingRight),
    paddingTop: Math.round(data.paddingTop),
    paddingBottom: Math.round(data.paddingBottom),
    itemSpacing: parseFloat(data.gap) || 8,
    primaryAxisAlign: alignMap[data.justifyContent] || 'CENTER',
    counterAxisAlign: alignMap[data.alignItems] || 'CENTER',
  };

  const styles: ExtractedStyles = {
    fills: {
      token: bgHex ? findToken(tokenList, bgHex, componentPrefix, 'bg', state) : null,
      value: bgHex || data.backgroundColor,
    },
    strokes: data.borderWidth > 0 ? {
      token: borderHex ? findToken(tokenList, borderHex, componentPrefix, 'border', state) : null,
      value: borderHex || data.borderColor,
    } : null,
    strokeWeight: Math.round(data.borderWidth),
    cornerRadius: Math.round(data.borderRadius),
  };

  const text: ExtractedText = {
    content: data.textContent,
    fills: {
      token: textHex ? findToken(tokenList, textHex, componentPrefix, 'text', state) : null,
      value: textHex || data.color,
    },
    fontSize: Math.round(data.fontSize),
    fontWeight: parseInt(data.fontWeight) || 400,
    fontFamily: mapSystemFont(data.fontFamily.split(',')[0].replace(/["']/g, '').trim()),
    lineHeight: Math.round(data.lineHeight),
    letterSpacing: Math.round(data.letterSpacing * 100) / 100,
  };

  // Match numeric properties against tokens for variable binding
  // Strategy: Try L4 component tokens first (by name construction), then generic fallback (by value)
  const tokenBindings: Record<string, string> = {};
  const sizeKey = props.size || '';

  // Padding — L4: --sizing-btn-sm-padding-x, fallback: generic spacing
  const plToken = findL4Token(tokenList, componentPrefix, sizeKey, 'padding-x')
    || findNumericToken(tokenList, layout.paddingLeft, componentPrefix, 'spacing');
  if (plToken) tokenBindings.paddingLeft = plToken;
  const prToken = findL4Token(tokenList, componentPrefix, sizeKey, 'padding-x')
    || findNumericToken(tokenList, layout.paddingRight, componentPrefix, 'spacing');
  if (prToken) tokenBindings.paddingRight = prToken;
  const ptToken = findL4Token(tokenList, componentPrefix, sizeKey, 'padding-y')
    || findNumericToken(tokenList, layout.paddingTop, componentPrefix, 'spacing');
  if (ptToken) tokenBindings.paddingTop = ptToken;
  const pbToken = findL4Token(tokenList, componentPrefix, sizeKey, 'padding-y')
    || findNumericToken(tokenList, layout.paddingBottom, componentPrefix, 'spacing');
  if (pbToken) tokenBindings.paddingBottom = pbToken;

  // Gap — L4: --sizing-btn-sm-gap
  const gapToken = findL4Token(tokenList, componentPrefix, sizeKey, 'gap')
    || findNumericToken(tokenList, layout.itemSpacing, componentPrefix, 'spacing');
  if (gapToken) tokenBindings.itemSpacing = gapToken;

  // Corner radius — L4: --sizing-btn-sm-radius
  const radiusToken = findL4Token(tokenList, componentPrefix, sizeKey, 'radius')
    || findNumericToken(tokenList, styles.cornerRadius, componentPrefix, 'radius');
  if (radiusToken) tokenBindings.cornerRadius = radiusToken;

  // Min height — L4: --sizing-btn-sm-height
  const heightToken = findL4Token(tokenList, componentPrefix, sizeKey, 'height')
    || findNumericToken(tokenList, layout.height, componentPrefix, 'sizing');
  if (heightToken) tokenBindings.minHeight = heightToken;

  // Stroke weight — L4: --sizing-btn-border-width
  if (styles.strokeWeight > 0) {
    const swToken = findL4Token(tokenList, componentPrefix, sizeKey, 'border-width')
      || findNumericToken(tokenList, styles.strokeWeight, componentPrefix, 'sizing')
      || findNumericToken(tokenList, styles.strokeWeight, componentPrefix, 'spacing');
    if (swToken) tokenBindings.strokeWeight = swToken;
  }

  // Font size — L4: --sizing-btn-sm-font-size, fallback: --font-base-size-sm
  const fsToken = findL4Token(tokenList, componentPrefix, sizeKey, 'font-size')
    || findNumericToken(tokenList, text.fontSize, componentPrefix, 'font-base-size');
  if (fsToken) tokenBindings.fontSize = fsToken;
  // Line-height — L4: --sizing-btn-sm-line-height (pixel value), fallback: percent-based generic token
  if (text.lineHeight > 0 && text.fontSize > 0) {
    const lhL4Token = findL4Token(tokenList, componentPrefix, sizeKey, 'line-height');
    if (lhL4Token) {
      tokenBindings.lineHeight = lhL4Token;
    } else {
      const lhPercent = Math.round((text.lineHeight / text.fontSize) * 100);
      const lhToken = findNumericToken(tokenList, lhPercent, componentPrefix, 'font-base-line-height', 1);
      if (lhToken) tokenBindings.lineHeight = lhToken;
    }
  }
  // Letter spacing (px values, use tight tolerance)
  if (text.letterSpacing !== 0) {
    const lsToken = findNumericToken(tokenList, text.letterSpacing, componentPrefix, 'font-base-letter-spacing', 0.1);
    if (lsToken) tokenBindings.letterSpacing = lsToken;
  } else {
    // letterSpacing 0 → check for "normal" token
    const lsNormal = tokenList.find(t =>
      t.name.startsWith('--font-base-letter-spacing-') && parseFloat(t.value) === 0
    );
    if (lsNormal) tokenBindings.letterSpacing = lsNormal.name;
  }
  // Font weight (numeric: 400, 500, 700, etc.)
  const fwToken = findNumericToken(tokenList, text.fontWeight, componentPrefix, 'font-base-weight', 1);
  if (fwToken) tokenBindings.fontWeight = fwToken;

  return { layout, styles, text, tokenBindings };
}

// --- State Derivation ---

/**
 * Derive hover/active/disabled variants from a default-state extraction.
 * Only color tokens change between states — layout and sizing stay the same.
 *
 * Token naming conventions:
 *   hover:    --color-btn-{variant}-bg-hover
 *   active:   --color-btn-{variant}-bg-active
 *   disabled: --color-btn-disabled-bg, --color-btn-disabled-text (shared)
 */
function deriveStateVariant(
  defaultCombo: ExtractedCombination,
  state: InteractionState,
  variant: string,
  tokenList: TokenEntry[],
  componentPrefix: string,
): ExtractedCombination {
  const derived: ExtractedCombination = JSON.parse(JSON.stringify(defaultCombo));
  derived.props = { ...defaultCombo.props, state };

  if (state === 'disabled') {
    // Disabled uses shared tokens (not variant-specific)
    const bgToken = `--color-${componentPrefix}-disabled-bg`;
    const textToken = `--color-${componentPrefix}-disabled-text`;
    const bgEntry = tokenList.find(t => t.name === bgToken);
    const textEntry = tokenList.find(t => t.name === textToken);

    if (bgEntry) {
      derived.styles.fills = { token: bgToken, value: bgEntry.value };
    }
    if (textEntry) {
      derived.text.fills = { token: textToken, value: textEntry.value };
    }
    // Disabled buttons have no visible stroke
    derived.styles.strokes = null;
  } else {
    // Hover/Active: only bg fill changes
    const bgToken = `--color-${componentPrefix}-${variant}-bg-${state}`;
    const bgEntry = tokenList.find(t => t.name === bgToken);

    if (bgEntry) {
      derived.styles.fills = { token: bgToken, value: bgEntry.value };
    }
  }

  return derived;
}

// --- Alert Extraction ---

/**
 * Extract Alert component data from a rendered Storybook story.
 * Extracts multi-node structure: Container → Icon + Content (Title + Description) + optional Close.
 *
 * Uses AllVariants story (4 alerts on one page) with index-based selection.
 */
// Map alert variant to lucide icon name
const ALERT_ICON_MAP: Record<string, string> = {
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  error: 'XCircle',
};

async function extractAlertData(
  page: Page,
  alertIndex: number,
  tokenList: TokenEntry[],
  variantName: string,
  componentPrefix: string,
): Promise<{ layout: ExtractedLayout; styles: ExtractedStyles; text: ExtractedText; children: ChildNode[]; tokenBindings: Record<string, string> }> {
  const data = await page.evaluate((idx: number) => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');

    const alerts = root.querySelectorAll('[role="alert"]');
    const el = alerts[idx];
    if (!el) throw new Error(`Alert at index ${idx} not found (found ${alerts.length} alerts)`);

    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    // Extract individual border widths (for border-l-4)
    const borderLeftWidth = parseFloat(cs.borderLeftWidth) || 0;
    const borderRightWidth = parseFloat(cs.borderRightWidth) || 0;
    const borderTopWidth = parseFloat(cs.borderTopWidth) || 0;
    const borderBottomWidth = parseFloat(cs.borderBottomWidth) || 0;

    // Icon: first SVG element
    const iconEl = el.querySelector('svg');
    let iconData = null;
    if (iconEl) {
      const iconCs = getComputedStyle(iconEl);
      // Extract cleaned SVG markup for Figma vector import
      const svgClone = iconEl.cloneNode(true) as SVGElement;
      svgClone.removeAttribute('class');
      // Replace currentColor with computed stroke color (hex)
      const computedColor = iconCs.color;
      svgClone.setAttribute('stroke', computedColor);
      svgClone.setAttribute('fill', 'none');
      // Ensure viewBox is present
      if (!svgClone.getAttribute('viewBox')) {
        svgClone.setAttribute('viewBox', '0 0 24 24');
      }
      iconData = {
        color: iconCs.color,
        width: Math.round(iconEl.getBoundingClientRect().width),
        height: Math.round(iconEl.getBoundingClientRect().height),
        svgMarkup: svgClone.outerHTML,
      };
    }

    // Content wrapper: the flex-1 div after the icon
    const contentWrapper = el.querySelector(':scope > div.flex-1, :scope > div:nth-child(2)');
    let contentData = null;
    if (contentWrapper) {
      const cwCs = getComputedStyle(contentWrapper);
      contentData = {
        display: cwCs.display,
        flexDirection: cwCs.flexDirection,
        gap: cwCs.gap,
      };
    }

    // Title: h5 element
    const titleEl = el.querySelector('h5');
    let titleData = null;
    if (titleEl) {
      const tCs = getComputedStyle(titleEl);
      titleData = {
        text: (titleEl.textContent || '').trim(),
        color: tCs.color,
        fontSize: parseFloat(tCs.fontSize) || 14,
        fontWeight: tCs.fontWeight,
        fontFamily: tCs.fontFamily,
        lineHeight: parseFloat(tCs.lineHeight) || 0,
        letterSpacing: parseFloat(tCs.letterSpacing) || 0,
      };
    }

    // Description: the div inside the content wrapper (not the wrapper itself)
    const descEl = contentWrapper ? contentWrapper.querySelector(':scope > div') : null;
    let descData = null;
    if (descEl) {
      const dCs = getComputedStyle(descEl);
      descData = {
        text: (descEl.textContent || '').trim(),
        color: dCs.color,
        fontSize: parseFloat(dCs.fontSize) || 14,
        fontWeight: dCs.fontWeight,
        fontFamily: dCs.fontFamily,
        lineHeight: parseFloat(dCs.lineHeight) || 0,
        letterSpacing: parseFloat(dCs.letterSpacing) || 0,
      };
    }

    // Close button (if present)
    const closeBtn = el.querySelector('button[aria-label]');
    let closeBtnData = null;
    if (closeBtn) {
      const cbCs = getComputedStyle(closeBtn);
      const cbIcon = closeBtn.querySelector('svg');
      let cbSvgMarkup = '';
      if (cbIcon) {
        const cbSvgClone = cbIcon.cloneNode(true) as SVGElement;
        cbSvgClone.removeAttribute('class');
        cbSvgClone.setAttribute('stroke', cbCs.color);
        cbSvgClone.setAttribute('fill', 'none');
        if (!cbSvgClone.getAttribute('viewBox')) {
          cbSvgClone.setAttribute('viewBox', '0 0 24 24');
        }
        cbSvgMarkup = cbSvgClone.outerHTML;
      }
      closeBtnData = {
        width: Math.round(closeBtn.getBoundingClientRect().width),
        height: Math.round(closeBtn.getBoundingClientRect().height),
        iconSize: cbIcon ? Math.round(cbIcon.getBoundingClientRect().width) : 16,
        color: cbCs.color,
        svgMarkup: cbSvgMarkup,
      };
    }

    return {
      // Container
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      display: cs.display,
      flexDirection: cs.flexDirection,
      alignItems: cs.alignItems,
      justifyContent: cs.justifyContent,
      gap: cs.gap,
      paddingLeft: parseFloat(cs.paddingLeft) || 0,
      paddingRight: parseFloat(cs.paddingRight) || 0,
      paddingTop: parseFloat(cs.paddingTop) || 0,
      paddingBottom: parseFloat(cs.paddingBottom) || 0,
      backgroundColor: cs.backgroundColor,
      borderLeftColor: cs.borderLeftColor,
      borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth,
      borderRadius: parseFloat(cs.borderRadius) || 0,
      // Children
      iconData,
      contentData,
      titleData,
      descData,
      closeBtnData,
    };
  }, alertIndex);

  // -- Convert raw data to typed structures --

  const alignMap: Record<string, string> = {
    'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER',
    'flex-end': 'MAX', 'end': 'MAX', 'space-between': 'SPACE_BETWEEN',
  };

  const bgHex = rgbToHex(data.backgroundColor);
  const borderHex = rgbToHex(data.borderLeftColor);

  const layout: ExtractedLayout = {
    width: data.width,
    height: data.height,
    direction: data.flexDirection === 'column' ? 'VERTICAL' : 'HORIZONTAL',
    paddingLeft: Math.round(data.paddingLeft),
    paddingRight: Math.round(data.paddingRight),
    paddingTop: Math.round(data.paddingTop),
    paddingBottom: Math.round(data.paddingBottom),
    itemSpacing: parseFloat(data.gap) || 12,
    primaryAxisAlign: alignMap[data.justifyContent] || 'MIN',
    counterAxisAlign: alignMap[data.alignItems] || 'MIN',
  };

  const styles: ExtractedStyles = {
    fills: {
      token: bgHex ? findToken(tokenList, bgHex, componentPrefix, 'bg') : null,
      value: bgHex || data.backgroundColor,
    },
    strokes: data.borderLeftWidth > 0 ? {
      token: borderHex ? findToken(tokenList, borderHex, componentPrefix, 'border') : null,
      value: borderHex || data.borderLeftColor,
    } : null,
    strokeWeight: Math.round(data.borderLeftWidth),
    strokeSides: {
      top: Math.round(data.borderTopWidth),
      right: Math.round(data.borderRightWidth),
      bottom: Math.round(data.borderBottomWidth),
      left: Math.round(data.borderLeftWidth),
    },
    cornerRadius: Math.round(data.borderRadius),
  };

  // Token bindings for container
  const tokenBindings: Record<string, string> = {};
  const radiusToken = findNumericToken(tokenList, styles.cornerRadius, componentPrefix, 'radius');
  if (radiusToken) tokenBindings.cornerRadius = radiusToken;

  // Padding — L4: --spacing-alert-padding
  const padToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-padding` && Math.abs(parseFloat(t.value) - layout.paddingLeft) < 1);
  if (padToken) {
    tokenBindings.paddingLeft = padToken.name;
    tokenBindings.paddingRight = padToken.name;
    tokenBindings.paddingTop = padToken.name;
    tokenBindings.paddingBottom = padToken.name;
  }

  // Gap — L4: --spacing-alert-gap
  const gapToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-gap` && Math.abs(parseFloat(t.value) - layout.itemSpacing) < 1);
  if (gapToken) tokenBindings.itemSpacing = gapToken.name;

  // Border width — L4: --sizing-alert-border-width
  if (styles.strokeWeight > 0) {
    const bwToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-border-width` && Math.abs(parseFloat(t.value) - styles.strokeWeight) < 1);
    if (bwToken) tokenBindings.strokeWeight = bwToken.name;
  }

  // -- Build children array --
  const children: ChildNode[] = [];

  // Icon child — use iconRef to reference the Icon Component Set
  if (data.iconData) {
    const iconHex = rgbToHex(data.iconData.color);
    const iconName = ALERT_ICON_MAP[variantName] || 'Info';
    // Alert uses size=20 which maps to Icon size "md"
    children.push({
      type: 'icon',
      name: 'Icon',
      iconSize: data.iconData.width || 20,
      iconRef: { component: 'Icon', variant: { icon: iconName, size: 'md' } },
      styles: {
        fills: {
          token: iconHex ? findToken(tokenList, iconHex, componentPrefix, 'icon') : null,
          value: iconHex || data.iconData.color,
        },
      },
    });
  }

  // Content wrapper with Title + Description
  const contentChildren: ChildNode[] = [];

  if (data.titleData) {
    const titleHex = rgbToHex(data.titleData.color);
    // Match L4 typography tokens for Title
    const titleFsToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-font-size`);
    const titleLhToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-line-height`);
    const titleFwToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-title-weight`);
    const titleTextBindings: Record<string, string> = {};
    if (titleFsToken) titleTextBindings.fontSize = titleFsToken.name;
    if (titleLhToken) titleTextBindings.lineHeight = titleLhToken.name;
    if (titleFwToken) titleTextBindings.fontWeight = titleFwToken.name;
    contentChildren.push({
      type: 'text',
      name: 'Title',
      text: {
        content: data.titleData.text,
        fills: {
          token: titleHex ? findToken(tokenList, titleHex, componentPrefix, 'title') : null,
          value: titleHex || data.titleData.color,
        },
        fontSize: Math.round(data.titleData.fontSize),
        fontWeight: parseInt(data.titleData.fontWeight) || 600,
        fontFamily: mapSystemFont(data.titleData.fontFamily.split(',')[0].replace(/["']/g, '').trim()),
        lineHeight: Math.round(data.titleData.lineHeight),
        letterSpacing: Math.round(data.titleData.letterSpacing * 100) / 100,
      },
      tokenBindings: Object.keys(titleTextBindings).length > 0 ? titleTextBindings : undefined,
    });
  }

  if (data.descData) {
    const descHex = rgbToHex(data.descData.color);
    // Match L4 typography tokens for Description
    const descFsToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-font-size`);
    const descLhToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-line-height`);
    const descFwToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-desc-weight`);
    const descTextBindings: Record<string, string> = {};
    if (descFsToken) descTextBindings.fontSize = descFsToken.name;
    if (descLhToken) descTextBindings.lineHeight = descLhToken.name;
    if (descFwToken) descTextBindings.fontWeight = descFwToken.name;
    contentChildren.push({
      type: 'text',
      name: 'Description',
      text: {
        content: data.descData.text,
        fills: {
          token: descHex ? findToken(tokenList, descHex, componentPrefix, 'description') : null,
          value: descHex || data.descData.color,
        },
        fontSize: Math.round(data.descData.fontSize),
        fontWeight: parseInt(data.descData.fontWeight) || 400,
        fontFamily: mapSystemFont(data.descData.fontFamily.split(',')[0].replace(/["']/g, '').trim()),
        lineHeight: Math.round(data.descData.lineHeight),
        letterSpacing: Math.round(data.descData.letterSpacing * 100) / 100,
      },
      tokenBindings: Object.keys(descTextBindings).length > 0 ? descTextBindings : undefined,
    });
  }

  if (contentChildren.length > 0) {
    const contentGap = data.contentData ? (parseFloat(data.contentData.gap) || 4) : 4;
    // Content-gap token — L4: --spacing-alert-content-gap
    const contentGapToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-content-gap` && Math.abs(parseFloat(t.value) - contentGap) < 1);
    children.push({
      type: 'frame',
      name: 'Content',
      layout: {
        width: 0, height: 0, // auto-sized
        direction: 'VERTICAL',
        paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
        itemSpacing: contentGap,
        primaryAxisAlign: 'MIN',
        counterAxisAlign: 'MIN',
      },
      children: contentChildren,
      tokenBindings: contentGapToken ? { itemSpacing: contentGapToken.name } : undefined,
    });
  }

  // Close button (only present in WithCloseButton story)
  // Uses iconRef to reference Icon Component Set (X icon at size=sm)
  if (data.closeBtnData) {
    const closeBtnHex = rgbToHex(data.closeBtnData.color);
    children.push({
      type: 'close-button',
      name: 'Close',
      iconSize: data.closeBtnData.iconSize || 16,
      iconRef: { component: 'Icon', variant: { icon: 'X', size: 'sm' } },
      styles: {
        fills: {
          token: closeBtnHex ? findToken(tokenList, closeBtnHex, componentPrefix, 'title') : null,
          value: closeBtnHex || data.closeBtnData.color,
        },
      },
    });
  }

  // Placeholder text (for backward compat — use title text)
  const titleText = contentChildren.find(c => c.name === 'Title')?.text;
  const text: ExtractedText = titleText || {
    content: '', fills: { token: null, value: '' },
    fontSize: 14, fontWeight: 600, fontFamily: 'Inter',
    lineHeight: 21, letterSpacing: 0,
  };

  return { layout, styles, text, children, tokenBindings };
}

// --- Icon Extraction ---

/**
 * Extract all icons from the Icon Gallery story.
 * Returns a map of icon name → cleaned SVG markup.
 */
async function extractIconGallery(
  page: Page,
): Promise<Map<string, string>> {
  const icons = await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');

    const cards = root.querySelectorAll('.grid > div');
    const result: Array<{ name: string; svgMarkup: string }> = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const svg = card.querySelector('svg');
      const nameEl = card.querySelector('span');
      if (!svg || !nameEl) continue;

      const name = (nameEl.textContent || '').trim();
      if (!name) continue;

      // Clone SVG and clean it for Figma import
      const svgClone = svg.cloneNode(true) as SVGElement;
      svgClone.removeAttribute('class');
      // Use black stroke as default (will be overridden via variable binding)
      svgClone.setAttribute('stroke', '#000000');
      svgClone.setAttribute('fill', 'none');
      svgClone.setAttribute('stroke-width', '2');
      svgClone.setAttribute('stroke-linecap', 'round');
      svgClone.setAttribute('stroke-linejoin', 'round');
      if (!svgClone.getAttribute('viewBox')) {
        svgClone.setAttribute('viewBox', '0 0 24 24');
      }
      // Remove width/height attributes (Figma will handle sizing)
      svgClone.removeAttribute('width');
      svgClone.removeAttribute('height');

      result.push({ name, svgMarkup: svgClone.outerHTML });
    }

    return result;
  });

  const iconMap = new Map<string, string>();
  for (const icon of icons) {
    iconMap.set(icon.name, icon.svgMarkup);
  }
  return iconMap;
}

// --- Input Extraction ---

async function extractInputData(
  page: Page,
  tokenList: TokenEntry[],
  componentPrefix: string,
  props: Record<string, string>,
): Promise<{ layout: ExtractedLayout; styles: ExtractedStyles; text: ExtractedText; tokenBindings: Record<string, string> }> {
  const sizeKey = props.inputSize || 'md';

  const data = await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');
    const el = root.querySelector('input') as HTMLInputElement | null;
    if (!el) throw new Error('Input element not found');
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      paddingLeft: parseFloat(cs.paddingLeft) || 0,
      paddingRight: parseFloat(cs.paddingRight) || 0,
      paddingTop: parseFloat(cs.paddingTop) || 0,
      paddingBottom: parseFloat(cs.paddingBottom) || 0,
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      borderColor: cs.borderColor,
      borderWidth: parseFloat(cs.borderWidth) || 0,
      borderRadius: parseFloat(cs.borderRadius) || 0,
      fontSize: parseFloat(cs.fontSize) || 16,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      lineHeight: parseFloat(cs.lineHeight) || 0,
      letterSpacing: parseFloat(cs.letterSpacing) || 0,
      placeholder: el.getAttribute('placeholder') || '',
      opacity: parseFloat(cs.opacity),
    };
  });

  const bgHex = rgbToHex(data.backgroundColor);
  const textHex = rgbToHex(data.color);
  const borderHex = rgbToHex(data.borderColor);
  const inputState = props.state || 'default';

  const layout: ExtractedLayout = {
    width: data.width,
    height: data.height,
    direction: 'HORIZONTAL',
    paddingLeft: Math.round(data.paddingLeft),
    paddingRight: Math.round(data.paddingRight),
    paddingTop: Math.round(data.paddingTop),
    paddingBottom: Math.round(data.paddingBottom),
    itemSpacing: 0,
    primaryAxisAlign: 'MIN',
    counterAxisAlign: 'CENTER',
  };

  // Map state to token-matching property names
  let borderProperty = 'border';
  if (inputState === 'error') borderProperty = 'border-error';
  else if (inputState === 'disabled') borderProperty = 'border';

  let bgProperty = 'bg';
  if (inputState === 'disabled') bgProperty = 'bg-disabled';

  let textProperty = 'text-placeholder';
  if (inputState === 'disabled') textProperty = 'text-placeholder';

  const styles: ExtractedStyles = {
    fills: {
      token: bgHex ? findToken(tokenList, bgHex, componentPrefix, bgProperty) : null,
      value: bgHex || data.backgroundColor,
    },
    strokes: data.borderWidth > 0 ? {
      token: borderHex ? findToken(tokenList, borderHex, componentPrefix, borderProperty) : null,
      value: borderHex || data.borderColor,
    } : null,
    strokeWeight: Math.round(data.borderWidth),
    cornerRadius: Math.round(data.borderRadius),
  };

  const text: ExtractedText = {
    content: data.placeholder,
    fills: {
      token: textHex ? findToken(tokenList, textHex, componentPrefix, textProperty) : null,
      value: textHex || data.color,
    },
    fontSize: Math.round(data.fontSize),
    fontWeight: parseInt(data.fontWeight) || 400,
    fontFamily: mapSystemFont(data.fontFamily.split(',')[0].replace(/["']/g, '').trim()),
    lineHeight: Math.round(data.lineHeight),
    letterSpacing: Math.round(data.letterSpacing * 100) / 100,
  };

  // Token bindings
  const tokenBindings: Record<string, string> = {};

  // Height
  const heightToken = findL4Token(tokenList, componentPrefix, sizeKey, 'height');
  if (heightToken) tokenBindings.minHeight = heightToken;
  // Padding-x
  const pxToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-padding-x`);
  if (pxToken) {
    tokenBindings.paddingLeft = pxToken.name;
    tokenBindings.paddingRight = pxToken.name;
  }
  // Corner radius
  const radiusToken = findL4Token(tokenList, componentPrefix, sizeKey, 'radius');
  if (radiusToken) tokenBindings.cornerRadius = radiusToken;
  // Stroke weight
  if (styles.strokeWeight > 0) {
    const bwToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-border-width`);
    if (bwToken) tokenBindings.strokeWeight = bwToken.name;
  }
  // Font size
  const fsToken = findL4Token(tokenList, componentPrefix, sizeKey, 'font-size');
  if (fsToken) tokenBindings.fontSize = fsToken;
  // Font weight
  const fwToken = tokenList.find(t => t.name === `--font-${componentPrefix}-weight`);
  if (fwToken) tokenBindings.fontWeight = fwToken.name;
  // Line height — L4: --sizing-input-{size}-line-height
  const lhToken = findL4Token(tokenList, componentPrefix, sizeKey, 'line-height');
  if (lhToken) tokenBindings.lineHeight = lhToken;
  // Letter spacing
  if (text.letterSpacing !== 0) {
    const lsToken = findNumericToken(tokenList, text.letterSpacing, componentPrefix, 'font-base-letter-spacing', 0.1);
    if (lsToken) tokenBindings.letterSpacing = lsToken;
  } else {
    const lsNormal = tokenList.find(t =>
      t.name.startsWith('--font-base-letter-spacing-') && parseFloat(t.value) === 0
    );
    if (lsNormal) tokenBindings.letterSpacing = lsNormal.name;
  }

  return { layout, styles, text, tokenBindings };
}

function deriveInputState(
  defaultCombo: ExtractedCombination,
  targetState: string,
  tokenList: TokenEntry[],
  componentPrefix: string,
): ExtractedCombination {
  const derived: ExtractedCombination = JSON.parse(JSON.stringify(defaultCombo));
  derived.props = { ...defaultCombo.props, state: targetState };

  if (targetState === 'focus') {
    // Focus: only border color changes to border-focus
    const focusBorderToken = `--color-${componentPrefix}-border-focus`;
    const focusBorderEntry = tokenList.find(t => t.name === focusBorderToken);
    if (focusBorderEntry && derived.styles.strokes) {
      derived.styles.strokes = { token: focusBorderToken, value: focusBorderEntry.value };
    }
  }
  return derived;
}

// --- Checkbox Extraction ---

async function extractCheckboxData(
  page: Page,
  index: number,
  tokenList: TokenEntry[],
  componentPrefix: string,
): Promise<ExtractedCombination> {
  const data = await page.evaluate((idx: number) => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');
    const checkboxes = root.querySelectorAll('[role="checkbox"]');
    const el = checkboxes[idx] as HTMLElement;
    if (!el) throw new Error(`Checkbox at index ${idx} not found (found ${checkboxes.length})`);

    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const dataState = el.getAttribute('data-state') || 'unchecked';
    const isDisabled = el.hasAttribute('disabled') || el.getAttribute('data-disabled') !== null;

    // Extract SVG icon if present (for checked/indeterminate)
    // Icon color lives on the Indicator <span>, NOT on the button itself
    let svgMarkup: string | null = null;
    let iconColor = cs.color; // fallback
    const indicator = el.querySelector('span[data-state]');
    if (indicator) {
      iconColor = getComputedStyle(indicator).color;
    }
    const svg = el.querySelector('svg');
    if (svg && dataState !== 'unchecked') {
      const clone = svg.cloneNode(true) as SVGElement;
      // Remove classes, set stroke/fill for Figma
      clone.removeAttribute('class');
      // Convert rgb() to hex inline — Figma's createNodeFromSvg() requires hex colors
      let strokeHex = iconColor;
      const rgbMatch = iconColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const rr = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
        const gg = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
        const bb = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
        strokeHex = '#' + rr + gg + bb;
      }
      clone.setAttribute('stroke', strokeHex);
      clone.setAttribute('fill', 'none');
      if (!clone.getAttribute('viewBox')) {
        clone.setAttribute('viewBox', '0 0 24 24');
      }
      // Remove width/height — Figma handles sizing via the frame
      clone.removeAttribute('width');
      clone.removeAttribute('height');
      svgMarkup = clone.outerHTML;
    }

    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      borderWidth: parseFloat(cs.borderWidth) || 0,
      borderRadius: parseFloat(cs.borderRadius) || 0,
      opacity: parseFloat(cs.opacity),
      iconColor, // from Indicator span (--color-checkbox-checked-icon)
      dataState,
      isDisabled,
      svgMarkup,
    };
  }, index);

  const bgHex = rgbToHex(data.backgroundColor);
  const borderHex = rgbToHex(data.borderColor);
  const iconHex = rgbToHex(data.iconColor);
  const isChecked = data.dataState === 'checked' || data.dataState === 'indeterminate';

  // Determine state for token matching
  const bgProperty = isChecked ? 'checked-bg' : (data.isDisabled ? 'disabled-bg' : 'bg');
  const borderProperty = isChecked ? 'checked-border' : 'border';

  const styles: ExtractedStyles = {
    fills: {
      token: bgHex ? findToken(tokenList, bgHex, componentPrefix, bgProperty) : null,
      value: bgHex || data.backgroundColor,
    },
    strokes: data.borderWidth > 0 ? {
      token: borderHex ? findToken(tokenList, borderHex, componentPrefix, borderProperty) : null,
      value: borderHex || data.borderColor,
    } : null,
    strokeWeight: Math.round(data.borderWidth),
    cornerRadius: Math.round(data.borderRadius),
    ...(data.opacity < 1 ? { opacity: data.opacity } : {}),
  };

  const layout: ExtractedLayout = {
    width: data.width,
    height: data.height,
    direction: 'HORIZONTAL',
    paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
    itemSpacing: 0,
    primaryAxisAlign: 'CENTER',
    counterAxisAlign: 'CENTER',
  };

  // Children: SVG icon for checked/indeterminate
  const children: ChildNode[] = [];
  if (data.svgMarkup && isChecked) {
    children.push({
      type: 'icon',
      name: data.dataState === 'indeterminate' ? 'Minus' : 'Check',
      iconSize: 14,
      svgData: data.svgMarkup,
      styles: {
        fills: {
          token: iconHex ? findToken(tokenList, iconHex, componentPrefix, 'checked-icon') : null,
          value: iconHex || data.iconColor,
        },
      },
    });
  }

  // Token bindings
  const tokenBindings: Record<string, string> = {};
  const boxToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-box-size`);
  if (boxToken) {
    tokenBindings.width = boxToken.name;
    tokenBindings.height = boxToken.name;
  }
  const radiusToken = tokenList.find(t => t.name === `--radius-${componentPrefix}`);
  if (radiusToken) tokenBindings.cornerRadius = radiusToken.name;
  if (styles.strokeWeight > 0) {
    const bwToken = tokenList.find(t => t.name === `--sizing-${componentPrefix}-border-width`);
    if (bwToken) tokenBindings.strokeWeight = bwToken.name;
  }

  const state = data.dataState === 'checked' ? 'checked' :
    data.dataState === 'indeterminate' ? 'indeterminate' : 'unchecked';

  return {
    props: { state, disabled: data.isDisabled ? 'true' : 'false' },
    label: state.charAt(0).toUpperCase() + state.slice(1),
    layout,
    styles,
    text: {
      content: '', fills: { token: null, value: '' },
      fontSize: 0, fontWeight: 400, fontFamily: 'Inter',
      lineHeight: 0, letterSpacing: 0,
    },
    children: children.length > 0 ? children : undefined,
    tokenBindings,
  };
}

// --- CheckboxField Extraction ---

async function extractCheckboxFieldData(
  page: Page,
  tokenList: TokenEntry[],
  componentPrefix: string,
  checkboxState: string,
  isDisabled: boolean,
  hasDescription: boolean,
): Promise<ExtractedCombination> {
  const data = await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    if (!root) throw new Error('Storybook root not found');
    // Find the first flex container (CheckboxField wrapper)
    const container = root.querySelector('.flex.items-start') as HTMLElement;
    if (!container) throw new Error('CheckboxField container not found');

    const cs = getComputedStyle(container);
    const rect = container.getBoundingClientRect();

    // Extract label
    const label = container.querySelector('label') as HTMLElement;
    const labelCs = label ? getComputedStyle(label) : null;

    // Extract description
    const desc = container.querySelector('p') as HTMLElement;
    const descCs = desc ? getComputedStyle(desc) : null;

    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      gap: parseFloat(cs.gap) || 8,
      labelText: label?.textContent?.trim() || '',
      labelColor: labelCs?.color || '',
      labelFontSize: parseFloat(labelCs?.fontSize || '14'),
      labelFontWeight: labelCs?.fontWeight || '500',
      labelFontFamily: labelCs?.fontFamily || '',
      labelLineHeight: parseFloat(labelCs?.lineHeight || '20'),
      labelOpacity: parseFloat(labelCs?.opacity || '1'),
      descText: desc?.textContent?.trim() || '',
      descColor: descCs?.color || '',
      descFontSize: parseFloat(descCs?.fontSize || '12'),
      descFontWeight: descCs?.fontWeight || '400',
      descFontFamily: descCs?.fontFamily || '',
      descLineHeight: parseFloat(descCs?.lineHeight || '16'),
      hasDesc: !!desc,
    };
  });

  const labelHex = rgbToHex(data.labelColor);
  const descHex = data.hasDesc ? rgbToHex(data.descColor) : null;

  const layout: ExtractedLayout = {
    width: data.width,
    height: data.height,
    direction: 'HORIZONTAL',
    paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
    itemSpacing: Math.round(data.gap),
    primaryAxisAlign: 'MIN',
    counterAxisAlign: 'MIN',
  };

  // Children: Checkbox instance + Content frame (Label + optional Description)
  const children: ChildNode[] = [];

  // Checkbox instance reference
  children.push({
    type: 'icon',
    name: 'Checkbox',
    iconSize: 20,
    iconRef: {
      component: 'Checkbox',
      variant: { state: checkboxState, disabled: isDisabled ? 'true' : 'false', interaction: 'default' },
    },
    styles: { fills: { token: null, value: 'transparent' } },
  });

  // Content frame with Label + optional Description
  const contentChildren: ChildNode[] = [];

  // Label
  const labelFsToken = tokenList.find(t => t.name === `--font-${componentPrefix}-label-size`);
  const labelFwToken = tokenList.find(t => t.name === `--font-${componentPrefix}-label-weight`);
  const labelLhToken = tokenList.find(t => t.name === `--font-${componentPrefix}-label-line-height`);
  const labelBindings: Record<string, string> = {};
  if (labelFsToken) labelBindings.fontSize = labelFsToken.name;
  if (labelFwToken) labelBindings.fontWeight = labelFwToken.name;
  if (labelLhToken) labelBindings.lineHeight = labelLhToken.name;

  contentChildren.push({
    type: 'text',
    name: 'Label',
    text: {
      content: data.labelText || 'Label text',
      fills: {
        token: labelHex ? findToken(tokenList, labelHex, componentPrefix, 'label') : null,
        value: labelHex || data.labelColor,
      },
      fontSize: Math.round(data.labelFontSize),
      fontWeight: parseInt(data.labelFontWeight) || 500,
      fontFamily: mapSystemFont((data.labelFontFamily || 'Inter').split(',')[0].replace(/["']/g, '').trim()),
      lineHeight: Math.round(data.labelLineHeight),
      letterSpacing: 0,
    },
    tokenBindings: Object.keys(labelBindings).length > 0 ? labelBindings : undefined,
  });

  // Description (only for hasDescription variants)
  if (hasDescription && data.hasDesc) {
    const descFsToken = tokenList.find(t => t.name === `--font-${componentPrefix}-desc-size`);
    const descFwToken = tokenList.find(t => t.name === `--font-${componentPrefix}-desc-weight`);
    const descLhToken = tokenList.find(t => t.name === `--font-${componentPrefix}-desc-line-height`);
    const descBindings: Record<string, string> = {};
    if (descFsToken) descBindings.fontSize = descFsToken.name;
    if (descFwToken) descBindings.fontWeight = descFwToken.name;
    if (descLhToken) descBindings.lineHeight = descLhToken.name;

    contentChildren.push({
      type: 'text',
      name: 'Description',
      text: {
        content: data.descText || 'Description text',
        fills: {
          token: descHex ? findToken(tokenList, descHex, componentPrefix, 'description') : null,
          value: descHex || data.descColor,
        },
        fontSize: Math.round(data.descFontSize),
        fontWeight: parseInt(data.descFontWeight) || 400,
        fontFamily: mapSystemFont((data.descFontFamily || 'Inter').split(',')[0].replace(/["']/g, '').trim()),
        lineHeight: Math.round(data.descLineHeight),
        letterSpacing: 0,
      },
      tokenBindings: Object.keys(descBindings).length > 0 ? descBindings : undefined,
    });
  }

  // Content frame gap binding — L4: --spacing-checkbox-content-gap
  const contentGapToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-content-gap`);
  children.push({
    type: 'frame',
    name: 'Content',
    layout: {
      width: 0, height: 0,
      direction: 'VERTICAL',
      paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
      itemSpacing: 2, // gap-0.5 = 2px
      primaryAxisAlign: 'MIN',
      counterAxisAlign: 'MIN',
    },
    children: contentChildren,
    tokenBindings: contentGapToken ? { itemSpacing: contentGapToken.name } : undefined,
  });

  // Container gap binding — L4: --spacing-checkbox-field-gap
  const fieldGapToken = tokenList.find(t => t.name === `--spacing-${componentPrefix}-field-gap`);
  const containerTokenBindings: Record<string, string> = {};
  if (fieldGapToken) containerTokenBindings.itemSpacing = fieldGapToken.name;

  return {
    props: { state: checkboxState, disabled: isDisabled ? 'true' : 'false', hasDescription: hasDescription ? 'true' : 'false' },
    label: `${checkboxState} ${isDisabled ? 'disabled' : ''} ${hasDescription ? 'desc' : ''}`.trim(),
    layout,
    styles: {
      fills: { token: null, value: 'transparent' },
      strokes: null,
      strokeWeight: 0,
      cornerRadius: 0,
    },
    text: {
      content: '', fills: { token: null, value: '' },
      fontSize: 0, fontWeight: 400, fontFamily: 'Inter',
      lineHeight: 0, letterSpacing: 0,
    },
    children,
    tokenBindings: containerTokenBindings,
  };
}

// --- Main ---

async function main() {
  const componentName = process.argv.slice(2).find(a => !a.startsWith('-')) || 'button';

  const configs: Record<string, ComponentConfig> = {
    button: BUTTON_CONFIG,
    alert: ALERT_CONFIG,
    icon: ICON_CONFIG,
    badge: BADGE_CONFIG,
    input: INPUT_CONFIG,
    checkbox: CHECKBOX_CONFIG,
    checkboxfield: CHECKBOXFIELD_CONFIG,
  };

  const config = configs[componentName];
  if (!config) {
    console.error(`Unknown component: ${componentName}. Available: ${Object.keys(configs).join(', ')}`);
    process.exit(1);
  }

  console.log(`Extracting ${config.name} component from Storybook...`);
  console.log(`  Storybook URL: ${STORYBOOK_URL}`);
  console.log(`  Combinations: ${config.combinations.length}`);

  // Build token list for context-aware matching
  const tokenList = buildTokenList();
  console.log(`  Token list: ${tokenList.length} entries`);

  // Derive component prefix from name (Button → btn)
  const prefixMap: Record<string, string> = {
    Button: 'btn', Input: 'input', Card: 'card', Badge: 'badge',
    Toggle: 'toggle', Tooltip: 'tooltip', Kbd: 'kbd', Select: 'select',
    Dialog: 'dialog', Alert: 'alert', Checkbox: 'checkbox', Radio: 'radio',
    Switch: 'switch', Progress: 'progress', Slider: 'slider',
    Tab: 'tab', Accordion: 'accordion', Avatar: 'avatar',
  };
  const componentPrefix = prefixMap[config.name] || config.name.toLowerCase();

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const combinations: ExtractedCombination[] = [];

  if (componentName === 'icon') {
    // --- Icon: Extract SVG data from Gallery, create combinations for each icon × size ---
    console.log('  Navigating to Icon Gallery story...');
    await gotoStory(page, 'atoms-icon--gallery');

    const iconSvgMap = await extractIconGallery(page);
    console.log(`  Extracted ${iconSvgMap.size} icon SVGs from Gallery`);

    // Map icon names from Alert variants to their correct Gallery names
    const alertIconMap: Record<string, string> = {
      info: 'Info',
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
    };

    for (const [iconName, svgData] of iconSvgMap) {
      for (const [sizeKey, sizeValue] of Object.entries(ICON_SIZES)) {
        // L4 token: --sizing-icon-{size} (references L3 via alias in Figma)
        const sizingToken = `--sizing-icon-${sizeKey}`;
        const sizingTokenExists = tokenList.some(t => t.name === sizingToken);

        const extracted: ExtractedCombination = {
          props: { icon: iconName, size: sizeKey },
          label: iconName,
          layout: {
            width: sizeValue,
            height: sizeValue,
            direction: 'HORIZONTAL',
            paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0,
            itemSpacing: 0,
            primaryAxisAlign: 'CENTER',
            counterAxisAlign: 'CENTER',
          },
          styles: {
            fills: { token: null, value: 'transparent' },
            strokes: null,
            strokeWeight: 0,
            cornerRadius: 0,
          },
          text: {
            content: '', fills: { token: null, value: '' },
            fontSize: 0, fontWeight: 400, fontFamily: 'Inter',
            lineHeight: 0, letterSpacing: 0,
          },
          svgData,
          tokenBindings: {
            ...(sizingTokenExists ? { width: sizingToken, height: sizingToken } : {}),
          },
        };

        combinations.push(extracted);
        process.stdout.write(`  ${iconName}/${sizeKey} (${sizeValue}px)...`);
        console.log(' OK');
      }
    }
  } else if (componentName === 'alert') {
    // --- Alert: Multi-element extraction from AllVariants + WithCloseButton ---
    const variantOrder = ['info', 'success', 'warning', 'error'];

    // Step 1: Extract base variants from AllVariants story (4 alerts, closeable=false)
    console.log('  Navigating to AllVariants story...');
    await gotoStory(page, 'atoms-alert--all-variants');

    const baseExtractions = new Map<string, ExtractedCombination>();
    for (let i = 0; i < variantOrder.length; i++) {
      const variant = variantOrder[i];
      process.stdout.write(`  Extracting variant=${variant}, closeable=false...`);
      try {
        const { layout, styles, text, children, tokenBindings } = await extractAlertData(
          page, i, tokenList, variant, componentPrefix,
        );
        const extracted: ExtractedCombination = {
          props: { variant, closeable: 'false' },
          label: variant.charAt(0).toUpperCase() + variant.slice(1),
          layout, styles, text, children, tokenBindings,
        };
        baseExtractions.set(variant, extracted);
        combinations.push(extracted);
        console.log(` OK (${layout.width}×${layout.height}, ${children.length} children)`);
      } catch (err) {
        console.log(` FAILED: ${(err as Error).message}`);
      }
    }

    // Step 2: Extract closeable variant from WithCloseButton story (info only)
    console.log('  Navigating to WithCloseButton story...');
    await gotoStory(page, 'atoms-alert--with-close-button');

    let closeButtonChild: ChildNode | null = null;
    try {
      process.stdout.write('  Extracting close button structure...');
      const closeData = await extractAlertData(page, 0, tokenList, 'info', componentPrefix);
      closeButtonChild = closeData.children.find(c => c.type === 'close-button') || null;
      console.log(closeButtonChild ? ' OK (close button found)' : ' OK (no close button)');
    } catch (err) {
      console.log(` FAILED: ${(err as Error).message}`);
    }

    // Step 3: Derive closeable=true variants from base extractions + close button
    for (const variant of variantOrder) {
      const base = baseExtractions.get(variant);
      if (!base) continue;

      const closeable: ExtractedCombination = JSON.parse(JSON.stringify(base));
      closeable.props = { variant, closeable: 'true' };

      // Add close button child if extracted
      if (closeButtonChild) {
        closeable.children = [...(closeable.children || []), JSON.parse(JSON.stringify(closeButtonChild))];
      }

      process.stdout.write(`  Derived variant=${variant}, closeable=true...`);
      console.log(` OK (${(closeable.children || []).length} children)`);
      combinations.push(closeable);
    }
  } else if (componentName === 'badge') {
    // --- Badge: Simple extraction, no state derivation ---
    for (const combo of config.combinations) {
      const propsStr = Object.entries(combo.props).map(([k, v]) => `${k}=${v}`).join(', ');
      process.stdout.write(`  Extracting ${propsStr}...`);
      try {
        await gotoStory(page, combo.storyId, combo.args);
        const { layout, styles, text, tokenBindings } = await extractElementData(
          page, config.selector, tokenList, componentPrefix, combo.props, 'default',
        );
        // Badge font-weight token
        const badgeFwToken = tokenList.find(t => t.name === `--font-${componentPrefix}-weight`);
        if (badgeFwToken) tokenBindings.fontWeight = badgeFwToken.name;

        combinations.push({ props: combo.props, label: combo.label, layout, styles, text, tokenBindings });
        console.log(` OK (${layout.width}×${layout.height})`);
      } catch (err) {
        console.log(` FAILED: ${(err as Error).message}`);
      }
    }
  } else if (componentName === 'input') {
    // --- Input: Placeholder-text extraction + focus derivation ---
    const sizes = ['sm', 'md', 'lg'];
    const directStates = ['default', 'disabled', 'error']; // extracted directly
    const derivedStates = ['focus']; // derived from default

    const defaultExtractions = new Map<string, ExtractedCombination>();

    for (const size of sizes) {
      for (const state of directStates) {
        const propsStr = `inputSize=${size}, state=${state}`;
        process.stdout.write(`  Extracting ${propsStr}...`);
        try {
          const storyId = state === 'error' ? 'atoms-input--error'
            : state === 'disabled' ? 'atoms-input--disabled'
            : 'atoms-input--default';
          const args: Record<string, string> = {};
          if (size !== 'md') args.inputSize = size;

          await gotoStory(page, storyId, Object.keys(args).length > 0 ? args : undefined);
          const result = await extractInputData(page, tokenList, componentPrefix, { inputSize: size, state });

          const extracted: ExtractedCombination = {
            props: { inputSize: size, state },
            label: `Input ${size}`,
            ...result,
          };

          if (state === 'default') {
            defaultExtractions.set(size, extracted);
          }
          combinations.push(extracted);
          console.log(` OK (${result.layout.width}×${result.layout.height})`);
        } catch (err) {
          console.log(` FAILED: ${(err as Error).message}`);
        }
      }

      // Derive focus state from default
      const defaultCombo = defaultExtractions.get(size);
      if (defaultCombo) {
        const derived = deriveInputState(defaultCombo, 'focus', tokenList, componentPrefix);
        process.stdout.write(`  Derived inputSize=${size}, state=focus...`);
        console.log(` OK`);
        combinations.push(derived);
      }
    }
  } else if (componentName === 'checkbox') {
    // --- Checkbox: data-state extraction from AllStates story ---
    console.log('  Navigating to AllStates story...');
    await gotoStory(page, 'atoms-checkbox--all-states');

    // AllStates renders: unchecked(0), checked(1), indeterminate(2), disabled-unchecked(3), disabled-checked(4)
    const stateMap = [
      { index: 0, state: 'unchecked', disabled: 'false' },
      { index: 1, state: 'checked', disabled: 'false' },
      { index: 2, state: 'indeterminate', disabled: 'false' },
      { index: 3, state: 'unchecked', disabled: 'true' },
      { index: 4, state: 'checked', disabled: 'true' },
    ];

    const extractedMap = new Map<string, ExtractedCombination>();

    for (const { index, state, disabled } of stateMap) {
      process.stdout.write(`  Extracting state=${state}, disabled=${disabled}...`);
      try {
        const extracted = await extractCheckboxData(page, index, tokenList, componentPrefix);
        // Override props to match our config (include interaction: 'default')
        extracted.props = { state, disabled, interaction: 'default' };
        extractedMap.set(`${state}/${disabled}`, extracted);
        combinations.push(extracted);
        console.log(` OK (${extracted.layout.width}×${extracted.layout.height}${extracted.children ? ', ' + extracted.children.length + ' children' : ''})`);
      } catch (err) {
        console.log(` FAILED: ${(err as Error).message}`);
      }
    }

    // Derive disabled+indeterminate from indeterminate (not in AllStates story)
    // Keep checked-bg (blue) + opacity 0.5 — NOT disabled-bg (gray)
    // Indeterminate is a "checked" state, so disabled version keeps the blue fill
    const indeterminateBase = extractedMap.get('indeterminate/false');
    if (indeterminateBase) {
      const derived: ExtractedCombination = JSON.parse(JSON.stringify(indeterminateBase));
      derived.props = { state: 'indeterminate', disabled: 'true', interaction: 'default' };
      // Only apply opacity — keep original checked-bg fill color
      derived.styles.opacity = 0.5;
      process.stdout.write('  Derived state=indeterminate, disabled=true...');
      console.log(' OK');
      combinations.push(derived);
    }

    // Derive hover variants from non-disabled default states
    const hoverBorderToken = `--color-${componentPrefix}-border-hover`;
    const hoverBorderEntry = tokenList.find(t => t.name === hoverBorderToken);
    for (const state of ['unchecked', 'checked', 'indeterminate']) {
      const base = extractedMap.get(`${state}/false`);
      if (!base) continue;
      const hover: ExtractedCombination = JSON.parse(JSON.stringify(base));
      hover.props = { state, disabled: 'false', interaction: 'hover' };
      // Unchecked hover: border changes to --color-checkbox-border-hover
      if (state === 'unchecked' && hoverBorderEntry) {
        hover.styles.strokes = {
          token: hoverBorderToken,
          value: hoverBorderEntry.value,
        };
      }
      // Checked/indeterminate hover: no visual change (bg is already interactive color)
      process.stdout.write(`  Derived state=${state}, interaction=hover...`);
      console.log(' OK');
      combinations.push(hover);
    }
  } else if (componentName === 'checkboxfield') {
    // --- CheckboxField: Composition extraction from various stories ---
    const checkboxPrefix = 'checkbox'; // tokens are under --color-checkbox-*

    // Extract base label-only variant (unchecked, not disabled, no description)
    console.log('  Navigating to WithLabel story...');
    await gotoStory(page, 'atoms-checkbox--with-label');
    let baseLabelOnly: ExtractedCombination | null = null;
    try {
      baseLabelOnly = await extractCheckboxFieldData(page, tokenList, checkboxPrefix, 'unchecked', false, false);
      process.stdout.write('  Extracted base label-only...');
      console.log(' OK');
    } catch (err) {
      console.log(` FAILED: ${(err as Error).message}`);
    }

    // Extract base with-description variant
    console.log('  Navigating to WithDescription story...');
    await gotoStory(page, 'atoms-checkbox--with-description');
    let baseWithDesc: ExtractedCombination | null = null;
    try {
      baseWithDesc = await extractCheckboxFieldData(page, tokenList, checkboxPrefix, 'unchecked', false, true);
      process.stdout.write('  Extracted base with-description...');
      console.log(' OK');
    } catch (err) {
      console.log(` FAILED: ${(err as Error).message}`);
    }

    // Generate all 12 combinations by deriving from bases
    const states = ['unchecked', 'checked', 'indeterminate'];
    const disabledValues = [false, true];
    const descValues = [false, true];

    for (const state of states) {
      for (const disabled of disabledValues) {
        for (const hasDesc of descValues) {
          const base = hasDesc ? baseWithDesc : baseLabelOnly;
          if (!base) continue;

          const combo: ExtractedCombination = JSON.parse(JSON.stringify(base));
          combo.props = { state, disabled: disabled ? 'true' : 'false', hasDescription: hasDesc ? 'true' : 'false' };
          combo.label = `${state}${disabled ? ' disabled' : ''}${hasDesc ? ' desc' : ''}`;

          // Update checkbox iconRef to match state/disabled
          if (combo.children) {
            const checkboxChild = combo.children.find(c => c.name === 'Checkbox');
            if (checkboxChild && checkboxChild.iconRef) {
              checkboxChild.iconRef.variant = { state, disabled: disabled ? 'true' : 'false', interaction: 'default' };
            }
          }

          // Apply disabled styling: reduce content opacity
          if (disabled && combo.children) {
            const contentFrame = combo.children.find(c => c.type === 'frame');
            if (contentFrame) {
              if (!contentFrame.styles) contentFrame.styles = {};
              contentFrame.styles.opacity = 0.5;
            }
          }

          // Remove description child for hasDesc=false variants
          if (!hasDesc && combo.children) {
            const contentFrame = combo.children.find(c => c.type === 'frame');
            if (contentFrame && contentFrame.children) {
              contentFrame.children = contentFrame.children.filter(c => c.name !== 'Description');
            }
          }

          const propsStr = Object.entries(combo.props).map(([k, v]) => `${k}=${v}`).join(', ');
          process.stdout.write(`  Derived ${propsStr}...`);
          console.log(' OK');
          combinations.push(combo);
        }
      }
    }
  } else {
    // --- Button: Default-state extraction + state derivation ---
    const defaultExtractions = new Map<string, ExtractedCombination>();
    const defaultCombos = config.combinations.filter(c => c.state === 'default');

    for (const combo of defaultCombos) {
      const propsStr = Object.entries(combo.props).map(([k, v]) => `${k}=${v}`).join(', ');
      process.stdout.write(`  Extracting ${propsStr}...`);

      try {
        await gotoStory(page, combo.storyId, combo.args);
        const { layout, styles, text, tokenBindings } = await extractElementData(
          page, config.selector, tokenList, componentPrefix, combo.props, 'default',
        );

        const extracted: ExtractedCombination = {
          props: combo.props,
          label: combo.label,
          layout, styles, text, tokenBindings,
        };

        const key = `${combo.props.variant}/${combo.props.size}`;
        defaultExtractions.set(key, extracted);

        console.log(` OK (${layout.width}×${layout.height})`);
      } catch (err) {
        console.log(` FAILED: ${(err as Error).message}`);
      }
    }

    // Derive hover/active/disabled variants from default extractions
    for (const combo of config.combinations) {
      const key = `${combo.props.variant}/${combo.props.size}`;
      const defaultCombo = defaultExtractions.get(key);
      if (!defaultCombo) continue;

      if (combo.state === 'default') {
        combinations.push(defaultCombo);
      } else {
        const derived = deriveStateVariant(
          defaultCombo, combo.state, combo.props.variant, tokenList, componentPrefix,
        );
        process.stdout.write(`  Derived ${Object.entries(derived.props).map(([k, v]) => `${k}=${v}`).join(', ')}...`);
        console.log(` OK (${derived.styles.fills.token || 'transparent'})`);
        combinations.push(derived);
      }
    }
  }

  await browser.close();

  // Build output
  const output: ComponentOutput = {
    name: config.name,
    category: config.category,
    extractedAt: new Date().toISOString(),
    variants: config.variants,
    defaultVariant: config.defaultVariant,
    combinations,
  };

  // Write output
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = resolve(OUTPUT_DIR, `${componentName}.json`);
  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nTotal: ${combinations.length}/${config.combinations.length} combinations`);
  console.log(`Written to: ${outputPath}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
