/**
 * Design System Documentation Generator
 *
 * Generiert 9 professionelle Dokumentationsseiten in Figma:
 * Cover, Prinzipien, Farben, Typografie, Spacing, Radius, Atoms, Molecules, Organisms.
 * Gestylt mit den eigenen DS-Tokens ("Dogfooding").
 */

// --- Types ---

interface TokenData {
  collections: Record<string, TokenCollection>;
}

interface TokenCollection {
  modes: string[];
  variables: Record<string, TokenVariable>;
}

interface TokenVariable {
  type: 'COLOR' | 'FLOAT';
  level?: string;
  scopes?: string[];
  [mode: string]: string | number | string[] | undefined;
}

interface ColorEntry {
  light: string;
  dark: string;
}

interface DocTokenLookup {
  colors: {
    l1: Map<string, ColorEntry>;
    l2: Map<string, ColorEntry>;
    l3: Map<string, ColorEntry>;
    l4: Map<string, ColorEntry>;
  };
  typography: Map<string, number>;
  spacing: Map<string, number>;
  sizing: Map<string, number>;
  radius: Map<string, number>;
}

interface ComponentEntry {
  name: string;
  hasTokens: boolean;
}

// --- Layout Constants ---

var PAGE_W = 1440;
var CONTENT_W = 1200;
var MARGIN_X = 120;
var SECTION_GAP = 64;
var SUBSECTION_GAP = 32;
var ITEM_GAP = 16;
var SWATCH_SIZE = 64;
var HEADER_H = 120;

// --- Color Helpers ---

function hexToFigmaRGB(hex: string): RGB | null {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return null;
  var r = parseInt(hex.slice(0, 2), 16) / 255;
  var g = parseInt(hex.slice(2, 4), 16) / 255;
  var b = parseInt(hex.slice(4, 6), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r: r, g: g, b: b };
}

function hexToPaint(hex: string): SolidPaint | null {
  var rgb = hexToFigmaRGB(hex);
  if (!rgb) return null;
  return { type: 'SOLID', color: rgb };
}

function isLightColor(hex: string): boolean {
  hex = hex.replace('#', '');
  if (hex.length !== 6) return false;
  var r = parseInt(hex.slice(0, 2), 16);
  var g = parseInt(hex.slice(2, 4), 16);
  var b = parseInt(hex.slice(4, 6), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 220;
}

// --- Fallback Colors (used when lookup is incomplete) ---

var C_PRIMARY = '#0ea5e9';
var C_BG_BASE = '#f8fafc';
var C_BG_PAPER = '#ffffff';
var C_BG_SURFACE = '#f1f5f9';
var C_BG_PRIMARY_SUBTLE = '#f0f9ff';
var C_TEXT_HEADING = '#0f172a';
var C_TEXT_BASE = '#0f172a';
var C_TEXT_MUTED = '#475569';
var C_TEXT_ON_PRIMARY = '#ffffff';
var C_BORDER_MUTED = '#e2e8f0';
var C_SUCCESS_BG = '#ecfdf5';
var C_SUCCESS_TEXT = '#065f46';

function lookupColor(lookup: DocTokenLookup, token: string, mode: 'light' | 'dark'): string {
  for (var level of [lookup.colors.l3, lookup.colors.l2, lookup.colors.l1, lookup.colors.l4]) {
    var entry = level.get(token);
    if (entry) return entry[mode];
  }
  return '#cccccc';
}

// --- Token Lookup Builder ---

function buildTokenLookup(data: TokenData): DocTokenLookup {
  var lookup: DocTokenLookup = {
    colors: { l1: new Map(), l2: new Map(), l3: new Map(), l4: new Map() },
    typography: new Map(),
    spacing: new Map(),
    sizing: new Map(),
    radius: new Map(),
  };

  var colorColl = data.collections['color'];
  if (colorColl) {
    for (var name in colorColl.variables) {
      var v = colorColl.variables[name];
      var lvl = (v.level as string) || 'L2 Global';
      var entry: ColorEntry = {
        light: (v['light'] as string) || '#cccccc',
        dark: (v['dark'] as string) || '#cccccc',
      };
      if (lvl === 'L1 Base') lookup.colors.l1.set(name, entry);
      else if (lvl === 'L2 Global') lookup.colors.l2.set(name, entry);
      else if (lvl === 'L3 Role') lookup.colors.l3.set(name, entry);
      else if (lvl === 'L4 Component') lookup.colors.l4.set(name, entry);
    }
  }

  var numCollections: Array<[string, Map<string, number>]> = [
    ['typography', lookup.typography],
    ['spacing', lookup.spacing],
    ['sizing', lookup.sizing],
    ['radius', lookup.radius],
  ];
  for (var i = 0; i < numCollections.length; i++) {
    var collName = numCollections[i][0];
    var targetMap = numCollections[i][1];
    var coll = data.collections[collName];
    if (coll) {
      for (var n in coll.variables) {
        var val = coll.variables[n]['default'];
        if (typeof val === 'number') targetMap.set(n, val);
      }
    }
  }

  return lookup;
}

// --- Font Loading ---

async function loadDocFonts(): Promise<void> {
  var fonts: Array<{ family: string; style: string }> = [
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Medium' },
    { family: 'Inter', style: 'SemiBold' },
    { family: 'Inter', style: 'Bold' },
    { family: 'Inter', style: 'Light' },
    { family: 'Merriweather', style: 'Bold' },
    { family: 'JetBrains Mono', style: 'Regular' },
    { family: 'JetBrains Mono', style: 'Medium' },
  ];
  for (var f of fonts) {
    try { await figma.loadFontAsync(f); } catch (_e) { /* fallback handled per node */ }
  }
  // Always load fallback
  try { await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' }); } catch (_e) {}
}

// --- Layout Primitives ---

async function createDocPage(name: string): Promise<PageNode> {
  var page = figma.createPage();
  page.name = 'Docs / ' + name;
  await figma.setCurrentPageAsync(page);
  return page;
}

function createPageWrapper(): FrameNode {
  var frame = figma.createFrame();
  frame.name = 'Page';
  frame.resize(PAGE_W, 100);
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingBottom = 80;
  frame.itemSpacing = 0;
  var paint = hexToPaint(C_BG_BASE);
  if (paint) frame.fills = [paint];
  return frame;
}

function createPageHeader(title: string, subtitle: string): FrameNode {
  var header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.resize(PAGE_W, HEADER_H);
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'FIXED';
  header.paddingLeft = MARGIN_X;
  header.paddingRight = MARGIN_X;
  header.paddingTop = 32;
  header.paddingBottom = 24;
  header.itemSpacing = 4;
  header.primaryAxisAlignItems = 'MAX';
  var paint = hexToPaint(C_PRIMARY);
  if (paint) header.fills = [paint];

  var titleNode = createTextNode(title, 'Inter', 'Bold', 30, C_TEXT_ON_PRIMARY);
  header.appendChild(titleNode);

  var subNode = createTextNode(subtitle, 'Inter', 'Regular', 14, C_TEXT_ON_PRIMARY);
  subNode.opacity = 0.8;
  header.appendChild(subNode);

  return header;
}

function createContentSection(name: string): FrameNode {
  var section = figma.createFrame();
  section.name = name;
  section.layoutMode = 'VERTICAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'FIXED';
  section.resize(PAGE_W, 100);
  section.paddingLeft = MARGIN_X;
  section.paddingRight = MARGIN_X;
  section.paddingTop = 48;
  section.paddingBottom = 48;
  section.itemSpacing = SUBSECTION_GAP;
  section.fills = [];
  return section;
}

function createSectionHeading(text: string): TextNode {
  var node = createTextNode(text, 'Inter', 'SemiBold', 24, C_TEXT_HEADING);
  node.lineHeight = { value: 36, unit: 'PIXELS' };
  return node;
}

function createSubHeading(text: string): TextNode {
  var node = createTextNode(text, 'Inter', 'SemiBold', 18, C_TEXT_HEADING);
  node.lineHeight = { value: 28, unit: 'PIXELS' };
  return node;
}

function createBodyText(content: string, maxWidth?: number): TextNode {
  var node = createTextNode(content, 'Inter', 'Regular', 16, C_TEXT_BASE);
  node.lineHeight = { value: 24, unit: 'PIXELS' };
  if (maxWidth) {
    node.textAutoResize = 'HEIGHT';
    node.resize(maxWidth, 24);
  }
  return node;
}

function createMutedText(content: string, fontSize?: number): TextNode {
  return createTextNode(content, 'Inter', 'Regular', fontSize || 13, C_TEXT_MUTED);
}

function createMonoText(content: string, fontSize?: number): TextNode {
  return createTextNode(content, 'JetBrains Mono', 'Regular', fontSize || 12, C_TEXT_MUTED);
}

function createTextNode(
  content: string, family: string, style: string, size: number, color: string
): TextNode {
  var node = figma.createText();
  try {
    node.fontName = { family: family, style: style };
  } catch (_e) {
    try { node.fontName = { family: 'Inter', style: 'Regular' }; } catch (_e2) {
      node.fontName = { family: 'Roboto', style: 'Regular' };
    }
  }
  node.characters = content;
  node.fontSize = size;
  var paint = hexToPaint(color);
  if (paint) node.fills = [paint];
  node.textAutoResize = 'WIDTH_AND_HEIGHT';
  return node;
}

function createDivider(): FrameNode {
  var line = figma.createFrame();
  line.name = 'Divider';
  line.resize(CONTENT_W, 1);
  var paint = hexToPaint(C_BORDER_MUTED);
  if (paint) line.fills = [paint];
  return line;
}

/** Append child and set FILL sizing afterwards (FILL requires auto-layout parent) */
function appendFill(parent: FrameNode, child: SceneNode): void {
  parent.appendChild(child);
  if ('layoutSizingHorizontal' in child) {
    (child as FrameNode).layoutSizingHorizontal = 'FILL';
  }
}

function createHorizontalRow(name: string, gap: number): FrameNode {
  var row = figma.createFrame();
  row.name = name;
  row.layoutMode = 'HORIZONTAL';
  row.primaryAxisSizingMode = 'AUTO';
  row.counterAxisSizingMode = 'AUTO';
  row.itemSpacing = gap;
  row.fills = [];
  return row;
}

function createVerticalStack(name: string, gap: number): FrameNode {
  var stack = figma.createFrame();
  stack.name = name;
  stack.layoutMode = 'VERTICAL';
  stack.primaryAxisSizingMode = 'AUTO';
  stack.counterAxisSizingMode = 'AUTO';
  stack.itemSpacing = gap;
  stack.fills = [];
  return stack;
}

// --- Color Swatches ---

function createColorSwatch(hex: string, label: string, size: number, showLabel: boolean): FrameNode {
  var container = createVerticalStack('Swatch', 4);

  var rect = figma.createRectangle();
  rect.name = 'Color';
  rect.resize(size, size);
  rect.cornerRadius = 6;
  var paint = hexToPaint(hex);
  if (paint) rect.fills = [paint];
  if (isLightColor(hex)) {
    var borderPaint = hexToPaint(C_BORDER_MUTED);
    if (borderPaint) { rect.strokes = [borderPaint]; rect.strokeWeight = 1; }
  }
  container.appendChild(rect);

  if (showLabel) {
    var labelNode = createMonoText(label, 11);
    container.appendChild(labelNode);
    var hexNode = createMonoText(hex, 10);
    hexNode.opacity = 0.7;
    container.appendChild(hexNode);
  }

  return container;
}

function createPaletteRow(paletteName: string, lookup: DocTokenLookup): FrameNode {
  var row = createVerticalStack(paletteName, 8);

  var label = createTextNode(
    paletteName.charAt(0).toUpperCase() + paletteName.slice(1),
    'Inter', 'SemiBold', 14, C_TEXT_HEADING
  );
  row.appendChild(label);

  var swatches = createHorizontalRow('Swatches', 4);
  var shades = ['50','100','200','300','400','500','600','700','800','900','950'];
  for (var shade of shades) {
    var token = lookup.colors.l1.get('--color-base-' + paletteName + '-' + shade);
    if (token) {
      var swatch = createColorSwatch(token.light, shade, SWATCH_SIZE, true);
      swatches.appendChild(swatch);
    }
  }
  row.appendChild(swatches);

  return row;
}

function createRoleColorRow(tokenName: string, entry: ColorEntry): FrameNode {
  var row = createHorizontalRow(tokenName, 16);
  row.counterAxisAlignItems = 'CENTER';
  row.paddingTop = 6;
  row.paddingBottom = 6;

  var nameNode = createMonoText(tokenName, 12);
  nameNode.resize(300, 18);
  nameNode.textAutoResize = 'NONE';
  row.appendChild(nameNode);

  // Light swatch
  var lightRect = figma.createRectangle();
  lightRect.resize(32, 32);
  lightRect.cornerRadius = 4;
  var lp = hexToPaint(entry.light);
  if (lp) lightRect.fills = [lp];
  if (isLightColor(entry.light)) {
    var bp = hexToPaint(C_BORDER_MUTED);
    if (bp) { lightRect.strokes = [bp]; lightRect.strokeWeight = 1; }
  }
  row.appendChild(lightRect);

  var lightHex = createMonoText(entry.light, 12);
  lightHex.resize(80, 18);
  lightHex.textAutoResize = 'NONE';
  row.appendChild(lightHex);

  // Dark swatch
  var darkRect = figma.createRectangle();
  darkRect.resize(32, 32);
  darkRect.cornerRadius = 4;
  var dp = hexToPaint(entry.dark);
  if (dp) darkRect.fills = [dp];
  if (isLightColor(entry.dark)) {
    var bp2 = hexToPaint(C_BORDER_MUTED);
    if (bp2) { darkRect.strokes = [bp2]; darkRect.strokeWeight = 1; }
  }
  row.appendChild(darkRect);

  var darkHex = createMonoText(entry.dark, 12);
  row.appendChild(darkHex);

  return row;
}

// --- Component Inventory ---

var ATOMS: ComponentEntry[] = [
  { name: 'Alert', hasTokens: true },
  { name: 'AspectRatio', hasTokens: false },
  { name: 'Avatar', hasTokens: false },
  { name: 'Badge', hasTokens: true },
  { name: 'Banner', hasTokens: false },
  { name: 'Blockquote', hasTokens: false },
  { name: 'Button', hasTokens: true },
  { name: 'Checkbox', hasTokens: true },
  { name: 'Code', hasTokens: false },
  { name: 'CopyButton', hasTokens: false },
  { name: 'Heading', hasTokens: false },
  { name: 'Highlight', hasTokens: false },
  { name: 'HoverCard', hasTokens: false },
  { name: 'Icon', hasTokens: true },
  { name: 'Image', hasTokens: false },
  { name: 'Input', hasTokens: true },
  { name: 'InputOTP', hasTokens: false },
  { name: 'Kbd', hasTokens: false },
  { name: 'Label', hasTokens: false },
  { name: 'Link', hasTokens: false },
  { name: 'LoadingOverlay', hasTokens: false },
  { name: 'NumberInput', hasTokens: false },
  { name: 'PasswordInput', hasTokens: false },
  { name: 'Popover', hasTokens: false },
  { name: 'Progress', hasTokens: false },
  { name: 'Rating', hasTokens: false },
  { name: 'ScrollArea', hasTokens: false },
  { name: 'SearchInput', hasTokens: false },
  { name: 'Separator', hasTokens: false },
  { name: 'Skeleton', hasTokens: false },
  { name: 'Slider', hasTokens: false },
  { name: 'Spinner', hasTokens: false },
  { name: 'Switch', hasTokens: false },
  { name: 'Tag', hasTokens: false },
  { name: 'Text', hasTokens: false },
  { name: 'ThemeToggle', hasTokens: false },
  { name: 'Toggle', hasTokens: false },
  { name: 'ToggleGroup', hasTokens: false },
  { name: 'Tooltip', hasTokens: false },
  { name: 'VisuallyHidden', hasTokens: false },
];

var MOLECULES: ComponentEntry[] = [
  { name: 'Accordion', hasTokens: false },
  { name: 'AlertDialog', hasTokens: false },
  { name: 'Breadcrumbs', hasTokens: false },
  { name: 'Collapsible', hasTokens: false },
  { name: 'Combobox', hasTokens: false },
  { name: 'ContextMenu', hasTokens: false },
  { name: 'DatePicker', hasTokens: false },
  { name: 'Dialog', hasTokens: false },
  { name: 'Drawer', hasTokens: false },
  { name: 'DropdownMenu', hasTokens: false },
  { name: 'EmptyState', hasTokens: false },
  { name: 'FileUpload', hasTokens: false },
  { name: 'Form', hasTokens: false },
  { name: 'InputField', hasTokens: false },
  { name: 'Menubar', hasTokens: false },
  { name: 'NavigationMenu', hasTokens: false },
  { name: 'Pagination', hasTokens: false },
  { name: 'RadioGroup', hasTokens: false },
  { name: 'Resizable', hasTokens: false },
  { name: 'Select', hasTokens: false },
  { name: 'Sheet', hasTokens: false },
  { name: 'Stepper', hasTokens: false },
  { name: 'Tabs', hasTokens: false },
  { name: 'Textarea', hasTokens: false },
  { name: 'Toast', hasTokens: false },
  { name: 'Toolbar', hasTokens: false },
];

var ORGANISMS: ComponentEntry[] = [
  { name: 'Card', hasTokens: false },
  { name: 'Carousel', hasTokens: false },
  { name: 'Chart', hasTokens: false },
  { name: 'Command', hasTokens: false },
  { name: 'DataTable', hasTokens: false },
  { name: 'Modal', hasTokens: false },
  { name: 'SessionCard', hasTokens: false },
  { name: 'Sidebar', hasTokens: false },
  { name: 'StatCard', hasTokens: false },
  { name: 'Table', hasTokens: false },
  { name: 'Timeline', hasTokens: false },
  { name: 'Tree', hasTokens: false },
];

// --- Component Card & Grid ---

function createComponentCard(comp: ComponentEntry): FrameNode {
  var card = createVerticalStack(comp.name, 0);
  card.cornerRadius = 8;
  card.clipsContent = true;
  var borderPaint = hexToPaint(C_BORDER_MUTED);
  if (borderPaint) { card.strokes = [borderPaint]; card.strokeWeight = 1; card.strokeAlign = 'INSIDE'; }

  // Preview area
  var preview = figma.createFrame();
  preview.name = 'Preview';
  preview.resize(282, 160);
  preview.layoutMode = 'VERTICAL';
  preview.primaryAxisSizingMode = 'FIXED';
  preview.counterAxisSizingMode = 'FIXED';
  preview.primaryAxisAlignItems = 'CENTER';
  preview.counterAxisAlignItems = 'CENTER';
  var surfacePaint = hexToPaint(C_BG_SURFACE);
  if (surfacePaint) preview.fills = [surfacePaint];

  var previewLabel = createTextNode(comp.name, 'Inter', 'Medium', 18, C_TEXT_MUTED);
  preview.appendChild(previewLabel);

  if (comp.hasTokens) {
    var figmaNote = createTextNode('In Figma verfuegbar', 'Inter', 'Regular', 11, C_PRIMARY);
    figmaNote.opacity = 0.8;
    preview.appendChild(figmaNote);
  }

  card.appendChild(preview);
  preview.layoutSizingHorizontal = 'FILL';

  // Info area
  var info = figma.createFrame();
  info.name = 'Info';
  info.layoutMode = 'HORIZONTAL';
  info.primaryAxisSizingMode = 'FIXED';
  info.counterAxisSizingMode = 'AUTO';
  info.resize(282, 20);
  info.paddingLeft = 16;
  info.paddingRight = 16;
  info.paddingTop = 12;
  info.paddingBottom = 12;
  info.itemSpacing = 8;
  info.counterAxisAlignItems = 'CENTER';
  var paperPaint = hexToPaint(C_BG_PAPER);
  if (paperPaint) info.fills = [paperPaint];

  var nameNode = createTextNode(comp.name, 'Inter', 'SemiBold', 14, C_TEXT_HEADING);
  info.appendChild(nameNode);

  // Status badge
  var badge = figma.createFrame();
  badge.name = 'Status';
  badge.layoutMode = 'HORIZONTAL';
  badge.primaryAxisSizingMode = 'AUTO';
  badge.counterAxisSizingMode = 'AUTO';
  badge.paddingLeft = 8;
  badge.paddingRight = 8;
  badge.paddingTop = 2;
  badge.paddingBottom = 2;
  badge.cornerRadius = 4;

  if (comp.hasTokens) {
    var successBg = hexToPaint('#dcfce7');
    if (successBg) badge.fills = [successBg];
    var badgeText = createTextNode('Tokens', 'Inter', 'Medium', 10, '#166534');
    badge.appendChild(badgeText);
  } else {
    var implBg = hexToPaint(C_SUCCESS_BG);
    if (implBg) badge.fills = [implBg];
    var implText = createTextNode('Implementiert', 'Inter', 'Medium', 10, C_SUCCESS_TEXT);
    badge.appendChild(implText);
  }

  info.appendChild(badge);
  card.appendChild(info);
  info.layoutSizingHorizontal = 'FILL';

  return card;
}

function createComponentGrid(components: ComponentEntry[]): FrameNode {
  var grid = createVerticalStack('Component Grid', 24);

  for (var i = 0; i < components.length; i += 4) {
    var row = figma.createFrame();
    row.name = 'Row';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(CONTENT_W, 100);
    row.itemSpacing = 24;
    row.fills = [];

    for (var j = i; j < Math.min(i + 4, components.length); j++) {
      var card = createComponentCard(components[j]);
      row.appendChild(card);
      card.layoutSizingHorizontal = 'FILL';
    }

    grid.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';
  }

  return grid;
}

// ============================================================
// PAGE GENERATORS
// ============================================================

// --- Page 1: Cover ---

async function generateCoverPage(lookup: DocTokenLookup): Promise<void> {
  await createDocPage('Cover');

  var cover = figma.createFrame();
  cover.name = 'Cover';
  cover.resize(PAGE_W, 900);
  cover.layoutMode = 'VERTICAL';
  cover.primaryAxisSizingMode = 'FIXED';
  cover.counterAxisSizingMode = 'FIXED';
  cover.primaryAxisAlignItems = 'CENTER';
  cover.counterAxisAlignItems = 'CENTER';
  cover.itemSpacing = 0;
  var paint = hexToPaint(C_PRIMARY);
  if (paint) cover.fills = [paint];

  // Center content stack
  var content = createVerticalStack('Content', 24);
  content.counterAxisAlignItems = 'CENTER';

  // Title
  var titleNode = createTextNode('Nordlig', 'Merriweather', 'Bold', 72, C_TEXT_ON_PRIMARY);
  content.appendChild(titleNode);

  var subtitleNode = createTextNode('Design System', 'Inter', 'Light', 36, C_TEXT_ON_PRIMARY);
  subtitleNode.opacity = 0.9;
  content.appendChild(subtitleNode);

  // Divider
  var divider = figma.createFrame();
  divider.name = 'Divider';
  divider.resize(200, 2);
  var divPaint = hexToPaint(C_TEXT_ON_PRIMARY);
  if (divPaint) divider.fills = [divPaint];
  divider.opacity = 0.3;
  content.appendChild(divider);

  // Version
  var versionNode = createTextNode('v1.0.0-alpha', 'JetBrains Mono', 'Regular', 14, C_TEXT_ON_PRIMARY);
  versionNode.opacity = 0.6;
  content.appendChild(versionNode);

  // Spacer
  var spacer1 = figma.createFrame();
  spacer1.name = 'Spacer';
  spacer1.resize(10, 32);
  spacer1.fills = [];
  content.appendChild(spacer1);

  // Tagline
  var tagline1 = createTextNode(
    'Ein modulares, token-basiertes Design System',
    'Inter', 'Regular', 18, C_TEXT_ON_PRIMARY
  );
  tagline1.opacity = 0.85;
  content.appendChild(tagline1);

  var tagline2 = createTextNode(
    'mit 4-Layer Architektur, Dark Mode und WCAG 2.1 AA Konformitaet.',
    'Inter', 'Regular', 18, C_TEXT_ON_PRIMARY
  );
  tagline2.opacity = 0.85;
  content.appendChild(tagline2);

  // Spacer
  var spacer2 = figma.createFrame();
  spacer2.name = 'Spacer';
  spacer2.resize(10, 24);
  spacer2.fills = [];
  content.appendChild(spacer2);

  // Stats
  var totalTokens = 0;
  var collectionCount = 0;
  for (var _k in lookup.colors) totalTokens += (lookup.colors as any)[_k].size;
  totalTokens += lookup.typography.size + lookup.spacing.size + lookup.sizing.size + lookup.radius.size;
  collectionCount = 5;
  var compCount = ATOMS.length + MOLECULES.length + ORGANISMS.length;

  var stats = createHorizontalRow('Stats', 48);
  stats.counterAxisAlignItems = 'CENTER';

  var statsData = [
    [String(compCount), 'Komponenten'],
    [String(totalTokens), 'Tokens'],
    [String(collectionCount), 'Collections'],
  ];
  for (var s of statsData) {
    var statItem = createVerticalStack('Stat', 2);
    statItem.counterAxisAlignItems = 'CENTER';
    var numNode = createTextNode(s[0], 'Inter', 'SemiBold', 28, C_TEXT_ON_PRIMARY);
    statItem.appendChild(numNode);
    var labelNode = createTextNode(s[1], 'Inter', 'Regular', 14, C_TEXT_ON_PRIMARY);
    labelNode.opacity = 0.7;
    statItem.appendChild(labelNode);
    stats.appendChild(statItem);
  }
  content.appendChild(stats);

  cover.appendChild(content);
}

// --- Page 2: Principles ---

async function generatePrinciplesPage(): Promise<void> {
  await createDocPage('Designprinzipien');
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(
    'Designprinzipien',
    'Die fuehrenden Grundsaetze des Nordlig Design Systems'
  ));

  var section = createContentSection('Principles');

  var principles = [
    {
      num: '1',
      title: 'Accessibility & Standards',
      desc: 'WCAG 2.1 AA Minimum. Barrierefreiheit ist keine Option, sondern Pflicht. Keyboard-Navigation, Screen Reader und Fokus-Indikatoren in jeder Komponente.',
    },
    {
      num: '2',
      title: 'Token-Hierarchie Integritaet',
      desc: 'Strikte 4-Layer Architektur: L1 Base \u2192 L2 Global \u2192 L3 Role \u2192 L4 Component. Niemals Ebenen ueberspringen. Diese Hierarchie ist sakrosankt.',
    },
    {
      num: '3',
      title: 'Consumer-Kompatibilitaet',
      desc: 'Keine Breaking Changes ohne Diskussion. Token-Aenderungen propagieren zu allen Consumer-Apps. Stabilitaet hat Prioritaet.',
    },
    {
      num: '4',
      title: 'Developer Experience',
      desc: 'Klare APIs, gute Dokumentation, konsistente Naming Conventions. Jede Komponente ist selbstdokumentierend ueber Storybook.',
    },
    {
      num: '5',
      title: 'Performance',
      desc: 'Optimierte Bundle-Groesse, minimale CSS-Komplexitaet. Jede Abhaengigkeit wird bewusst ausgewaehlt.',
    },
  ];

  for (var p of principles) {
    var card = createHorizontalRow('Principle ' + p.num, 24);
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.counterAxisAlignItems = 'MIN';
    var paperPaint = hexToPaint(C_BG_PAPER);
    if (paperPaint) card.fills = [paperPaint];
    card.cornerRadius = 12;

    // Number circle
    var circle = figma.createFrame();
    circle.name = 'Number';
    circle.resize(48, 48);
    circle.layoutMode = 'VERTICAL';
    circle.primaryAxisSizingMode = 'FIXED';
    circle.counterAxisSizingMode = 'FIXED';
    circle.primaryAxisAlignItems = 'CENTER';
    circle.counterAxisAlignItems = 'CENTER';
    circle.cornerRadius = 9999;
    var circlePaint = hexToPaint(C_BG_PRIMARY_SUBTLE);
    if (circlePaint) circle.fills = [circlePaint];
    var numText = createTextNode(p.num, 'Inter', 'SemiBold', 20, C_PRIMARY);
    circle.appendChild(numText);
    card.appendChild(circle);

    // Text content
    var textStack = createVerticalStack('Text', 8);
    var titleNode = createTextNode(p.title, 'Inter', 'SemiBold', 18, C_TEXT_HEADING);
    textStack.appendChild(titleNode);
    var descNode = createBodyText(p.desc, 900);
    var descPaint = hexToPaint(C_TEXT_MUTED);
    if (descPaint) descNode.fills = [descPaint];
    descNode.fontSize = 15;
    textStack.appendChild(descNode);
    card.appendChild(textStack);

    section.appendChild(card);
    card.layoutSizingHorizontal = 'FILL';
  }

  // 4-Layer Diagram
  var divider1 = createDivider();
  section.appendChild(divider1);
  divider1.layoutSizingHorizontal = 'FILL';
  section.appendChild(createSectionHeading('4-Layer Token-Architektur'));

  var layers = [
    { label: 'L1 Base', desc: 'Rohe Hex-Werte, Paletten', color: '#e0f2fe', textColor: '#075985' },
    { label: 'L2 Global', desc: 'Theme-Zuordnung (primary, accent)', color: '#bae6fd', textColor: '#0369a1' },
    { label: 'L3 Role', desc: 'Funktionale Rollen (bg, text, border)', color: '#7dd3fc', textColor: '#0c4a6e' },
    { label: 'L4 Component', desc: 'Komponentenspezifisch (btn, input)', color: '#0ea5e9', textColor: '#ffffff' },
  ];

  for (var layer of layers) {
    var bar = figma.createFrame();
    bar.name = layer.label;
    bar.resize(CONTENT_W, 56);
    bar.layoutMode = 'HORIZONTAL';
    bar.primaryAxisSizingMode = 'FIXED';
    bar.counterAxisSizingMode = 'FIXED';
    bar.paddingLeft = 24;
    bar.paddingRight = 24;
    bar.counterAxisAlignItems = 'CENTER';
    bar.itemSpacing = 16;
    bar.cornerRadius = 8;
    var barPaint = hexToPaint(layer.color);
    if (barPaint) bar.fills = [barPaint];

    var barLabel = createTextNode(layer.label, 'Inter', 'SemiBold', 16, layer.textColor);
    bar.appendChild(barLabel);
    var barDesc = createTextNode(layer.desc, 'Inter', 'Regular', 14, layer.textColor);
    barDesc.opacity = 0.8;
    bar.appendChild(barDesc);

    section.appendChild(bar);
    bar.layoutSizingHorizontal = 'FILL';
  }

  wrapper.appendChild(section);
}

// --- Page 3: Colors ---

async function generateColorsPage(lookup: DocTokenLookup): Promise<void> {
  await createDocPage('Farben');
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(
    'Farben',
    'Vollstaendige Farbpalette des Nordlig Design Systems'
  ));

  // L1 Base Section
  var l1Section = createContentSection('L1 Base');
  l1Section.appendChild(createSectionHeading('L1 Base \u2014 Basis-Paletten'));
  l1Section.appendChild(createBodyText(
    'Rohe Farbwerte ohne semantische Bedeutung. Nur diese Ebene enthaelt Hex-Codes.',
    800
  ));

  var palettes = ['slate', 'sky', 'indigo', 'blue', 'teal', 'cyan', 'emerald', 'amber', 'red', 'yellow', 'green', 'stone', 'zinc'];
  for (var pal of palettes) {
    // Only show palette if tokens exist
    var hasTokens = lookup.colors.l1.has('--color-base-' + pal + '-500');
    if (hasTokens) {
      l1Section.appendChild(createPaletteRow(pal, lookup));
    }
  }

  // Special base colors (white, black)
  var specialRow = createHorizontalRow('Special', 16);
  var whiteEntry = lookup.colors.l1.get('--color-base-white');
  if (whiteEntry) specialRow.appendChild(createColorSwatch(whiteEntry.light, 'white', SWATCH_SIZE, true));
  var blackEntry = lookup.colors.l1.get('--color-base-black');
  if (blackEntry) specialRow.appendChild(createColorSwatch(blackEntry.light, 'black', SWATCH_SIZE, true));
  l1Section.appendChild(specialRow);

  wrapper.appendChild(l1Section);

  // L2 Global Section
  var l2Section = createContentSection('L2 Global');
  l2Section.appendChild(createSectionHeading('L2 Global \u2014 Themenfarben'));
  l2Section.appendChild(createBodyText(
    'Semantische Zuordnung der Basis-Paletten zu Theme-Rollen. Hier wird z.B. Sky zu Primary.',
    800
  ));

  var l2Groups = ['primary', 'secondary', 'accent', 'neutral'];
  for (var group of l2Groups) {
    var groupStack = createVerticalStack(group, 8);
    var groupLabel = createTextNode(
      group.charAt(0).toUpperCase() + group.slice(1),
      'Inter', 'SemiBold', 14, C_TEXT_HEADING
    );
    groupStack.appendChild(groupLabel);

    var groupSwatches = createHorizontalRow('Swatches', 4);
    var count = 0;
    lookup.colors.l2.forEach(function(entry, name) {
      if (name.indexOf('--color-' + group) === 0 && count < 14) {
        var shortLabel = name.replace('--color-' + group + '-', '');
        groupSwatches.appendChild(createColorSwatch(entry.light, shortLabel, 48, true));
        count++;
      }
    });
    groupStack.appendChild(groupSwatches);
    l2Section.appendChild(groupStack);
  }

  wrapper.appendChild(l2Section);

  // L3 Role Section
  var l3Section = createContentSection('L3 Role');
  l3Section.appendChild(createSectionHeading('L3 Role \u2014 Funktionale Farben'));
  l3Section.appendChild(createBodyText(
    'Abstrakte Funktionsrollen (Hintergrund, Text, Border). Light- und Dark-Werte nebeneinander.',
    800
  ));

  var l3Groups = ['bg', 'text', 'border', 'interactive', 'success', 'warning', 'error', 'info'];
  for (var l3g of l3Groups) {
    var l3Stack = createVerticalStack(l3g, 4);
    l3Stack.appendChild(createSubHeading(l3g.charAt(0).toUpperCase() + l3g.slice(1)));

    lookup.colors.l3.forEach(function(entry, name) {
      if (name.indexOf('--color-' + l3g + '-') === 0 || name === '--color-' + l3g) {
        l3Stack.appendChild(createRoleColorRow(name, entry));
      }
    });
    l3Section.appendChild(l3Stack);
  }

  wrapper.appendChild(l3Section);

  // L4 Component Examples
  var l4Section = createContentSection('L4 Component');
  l4Section.appendChild(createSectionHeading('L4 Component \u2014 Beispiele'));
  l4Section.appendChild(createBodyText(
    'Komponentenspezifische Tokens referenzieren nur L3 Role Tokens. Hier einige Beispiele.',
    800
  ));

  var l4Examples = ['btn', 'badge', 'alert', 'checkbox', 'input'];
  for (var comp of l4Examples) {
    var compStack = createVerticalStack(comp, 4);
    compStack.appendChild(createSubHeading(comp.charAt(0).toUpperCase() + comp.slice(1)));
    var compCount = 0;
    lookup.colors.l4.forEach(function(entry, name) {
      if (name.indexOf('--color-' + comp + '-') === 0 && compCount < 8) {
        compStack.appendChild(createRoleColorRow(name, entry));
        compCount++;
      }
    });
    l4Section.appendChild(compStack);
  }

  wrapper.appendChild(l4Section);
}

// --- Page 4: Typography ---

async function generateTypographyPage(lookup: DocTokenLookup): Promise<void> {
  await createDocPage('Typografie');
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(
    'Typografie',
    'Schriften, Groessen und Gewichtungen'
  ));

  // Font Families
  var familiesSection = createContentSection('Schriftfamilien');
  familiesSection.appendChild(createSectionHeading('Schriftfamilien'));

  var families = [
    { name: 'Inter', style: 'Regular', role: 'Primaere UI-Schrift (sans-serif)' },
    { name: 'Merriweather', style: 'Bold', role: 'Serifenschrift fuer Akzente' },
    { name: 'JetBrains Mono', style: 'Regular', role: 'Code, Token-Namen und Monospace' },
  ];

  for (var fam of families) {
    var famStack = createVerticalStack(fam.name, 8);
    var famHeader = createHorizontalRow('Header', 16);
    famHeader.counterAxisAlignItems = 'CENTER';
    var famName = createTextNode(fam.name, 'Inter', 'SemiBold', 16, C_TEXT_HEADING);
    famHeader.appendChild(famName);
    var famRole = createMutedText(fam.role, 14);
    famHeader.appendChild(famRole);
    famStack.appendChild(famHeader);

    var sample = createTextNode(
      'Aa Bb Cc Dd Ee Ff Gg 0123456789 !@#$%',
      fam.name, fam.style, 24, C_TEXT_BASE
    );
    famStack.appendChild(sample);
    familiesSection.appendChild(famStack);
    var famDivider = createDivider();
    familiesSection.appendChild(famDivider);
    famDivider.layoutSizingHorizontal = 'FILL';
  }

  wrapper.appendChild(familiesSection);

  // Font Size Scale
  var scaleSection = createContentSection('Schriftgroessen');
  scaleSection.appendChild(createSectionHeading('Schriftgroessen-Skala'));

  var sizes = [
    { name: 'xs', px: 12 }, { name: 'sm', px: 14 }, { name: 'base', px: 16 },
    { name: 'lg', px: 18 }, { name: 'xl', px: 20 }, { name: '2xl', px: 24 },
    { name: '3xl', px: 30 }, { name: '4xl', px: 36 }, { name: '5xl', px: 48 },
  ];

  for (var sz of sizes) {
    var sizeRow = createHorizontalRow('size-' + sz.name, 24);
    sizeRow.counterAxisAlignItems = 'CENTER';
    sizeRow.paddingTop = 8;
    sizeRow.paddingBottom = 8;

    var sizeLabel = createMonoText('--font-size-' + sz.name, 12);
    sizeLabel.resize(200, 18);
    sizeLabel.textAutoResize = 'NONE';
    sizeRow.appendChild(sizeLabel);

    var sizeSample = createTextNode('Design System', 'Inter', 'Regular', sz.px, C_TEXT_BASE);
    sizeRow.appendChild(sizeSample);

    var sizeValue = createMutedText(sz.px + 'px', 12);
    sizeRow.appendChild(sizeValue);

    scaleSection.appendChild(sizeRow);
  }

  wrapper.appendChild(scaleSection);

  // Font Weights
  var weightsSection = createContentSection('Schriftgewichte');
  weightsSection.appendChild(createSectionHeading('Schriftgewichte'));

  var weightsRow = createHorizontalRow('Weights', 32);
  var weights = [
    { name: 'Light', style: 'Light', val: 300 },
    { name: 'Regular', style: 'Regular', val: 400 },
    { name: 'Medium', style: 'Medium', val: 500 },
    { name: 'SemiBold', style: 'SemiBold', val: 600 },
    { name: 'Bold', style: 'Bold', val: 700 },
  ];

  for (var w of weights) {
    var wStack = createVerticalStack(w.name, 4);
    wStack.counterAxisAlignItems = 'CENTER';
    var wSample = createTextNode('Nordlig', 'Inter', w.style, 24, C_TEXT_BASE);
    wStack.appendChild(wSample);
    var wLabel = createMutedText(w.name + ' (' + w.val + ')', 12);
    wStack.appendChild(wLabel);
    weightsRow.appendChild(wStack);
  }

  weightsSection.appendChild(weightsRow);
  wrapper.appendChild(weightsSection);
}

// --- Page 5: Spacing & Sizing ---

async function generateSpacingPage(lookup: DocTokenLookup): Promise<void> {
  await createDocPage('Spacing & Sizing');
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(
    'Abstaende & Groessen',
    'Spacing- und Sizing-Tokens des Design Systems'
  ));

  // Spacing Scale
  var spacingSection = createContentSection('Spacing');
  spacingSection.appendChild(createSectionHeading('Spacing-Skala'));
  spacingSection.appendChild(createBodyText(
    'Einheitliche Abstandswerte basierend auf 4px-Inkrementen.',
    800
  ));

  var spacingSteps = [
    { name: '0', px: 0 }, { name: '0-5', px: 2 }, { name: '1', px: 4 },
    { name: '1-5', px: 6 }, { name: '2', px: 8 }, { name: '2-5', px: 10 },
    { name: '3', px: 12 }, { name: '3-5', px: 14 }, { name: '4', px: 16 },
    { name: '5', px: 20 }, { name: '6', px: 24 }, { name: '7', px: 28 },
    { name: '8', px: 32 }, { name: '10', px: 40 }, { name: '12', px: 48 },
    { name: '16', px: 64 },
  ];

  for (var step of spacingSteps) {
    var stepRow = createHorizontalRow('spacing-' + step.name, 16);
    stepRow.counterAxisAlignItems = 'CENTER';
    stepRow.paddingTop = 4;
    stepRow.paddingBottom = 4;

    var stepLabel = createMonoText('--spacing-base-' + step.name, 11);
    stepLabel.resize(200, 16);
    stepLabel.textAutoResize = 'NONE';
    stepRow.appendChild(stepLabel);

    var stepValue = createMutedText(step.px + 'px', 11);
    stepValue.resize(50, 16);
    stepValue.textAutoResize = 'NONE';
    stepRow.appendChild(stepValue);

    if (step.px > 0) {
      var bar = figma.createFrame();
      bar.name = 'Bar';
      bar.resize(Math.min(step.px * 4, 800), 20);
      bar.cornerRadius = 4;
      var barPaint = hexToPaint('#bae6fd');
      if (barPaint) bar.fills = [barPaint];
      stepRow.appendChild(bar);
    }

    spacingSection.appendChild(stepRow);
  }

  wrapper.appendChild(spacingSection);

  // Sizing Standards
  var sizingSection = createContentSection('Sizing');
  sizingSection.appendChild(createSectionHeading('Sizing-Standards'));
  sizingSection.appendChild(createBodyText(
    'Standard-Hoehen fuer interaktive Elemente (Buttons, Inputs).',
    800
  ));

  var sizingRow = createHorizontalRow('Sizes', 32);
  var sizings = [
    { name: 'sm', height: 36 },
    { name: 'md', height: 40 },
    { name: 'lg', height: 44 },
  ];

  for (var sz of sizings) {
    var szStack = createVerticalStack(sz.name, 8);
    szStack.counterAxisAlignItems = 'CENTER';

    var szBox = figma.createFrame();
    szBox.name = sz.name;
    szBox.resize(120, sz.height);
    szBox.layoutMode = 'VERTICAL';
    szBox.primaryAxisAlignItems = 'CENTER';
    szBox.counterAxisAlignItems = 'CENTER';
    szBox.cornerRadius = 8;
    var szPaint = hexToPaint(C_BG_PRIMARY_SUBTLE);
    if (szPaint) szBox.fills = [szPaint];
    var szLabel = createTextNode(sz.height + 'px', 'Inter', 'Medium', 14, C_PRIMARY);
    szBox.appendChild(szLabel);
    szStack.appendChild(szBox);

    var szName = createMutedText('--sizing-input-' + sz.name + '-height', 11);
    szStack.appendChild(szName);
    sizingRow.appendChild(szStack);
  }

  sizingSection.appendChild(sizingRow);
  wrapper.appendChild(sizingSection);
}

// --- Page 6: Radius ---

async function generateRadiusPage(lookup: DocTokenLookup): Promise<void> {
  await createDocPage('Radius');
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(
    'Rundungen',
    'Corner Radius Tokens des Design Systems'
  ));

  var section = createContentSection('Radius');
  section.appendChild(createSectionHeading('Radius-Skala'));

  var radiusSteps = [
    { name: 'none', value: 0 },
    { name: 'sm', value: 2 },
    { name: 'default', value: 4 },
    { name: 'md', value: 6 },
    { name: 'lg', value: 8 },
    { name: 'xl', value: 12 },
    { name: '2xl', value: 16 },
    { name: '3xl', value: 24 },
    { name: 'full', value: 9999 },
  ];

  var radiusRow = createHorizontalRow('Radius Scale', 24);
  radiusRow.layoutWrap = 'WRAP';

  for (var rs of radiusSteps) {
    var rsStack = createVerticalStack(rs.name, 8);
    rsStack.counterAxisAlignItems = 'CENTER';

    var rsBox = figma.createFrame();
    rsBox.name = rs.name;
    rsBox.resize(80, 80);
    rsBox.cornerRadius = Math.min(rs.value, 40);
    var rsPaint = hexToPaint(C_BG_PRIMARY_SUBTLE);
    if (rsPaint) rsBox.fills = [rsPaint];
    var rsBorder = hexToPaint(C_PRIMARY);
    if (rsBorder) { rsBox.strokes = [rsBorder]; rsBox.strokeWeight = 2; rsBox.strokeAlign = 'INSIDE'; }
    rsStack.appendChild(rsBox);

    var rsLabel = createMonoText(rs.name, 12);
    rsStack.appendChild(rsLabel);
    var rsValue = createMutedText(rs.value === 9999 ? '9999px' : rs.value + 'px', 11);
    rsStack.appendChild(rsValue);
    radiusRow.appendChild(rsStack);
  }

  section.appendChild(radiusRow);

  // Context examples
  var radDivider = createDivider();
  section.appendChild(radDivider);
  radDivider.layoutSizingHorizontal = 'FILL';
  section.appendChild(createSubHeading('Verwendung in Komponenten'));

  var contexts = [
    { comp: 'Button', token: '--radius-btn', value: 'md (6px)' },
    { comp: 'Badge', token: '--radius-badge', value: 'full (9999px)' },
    { comp: 'Card', token: '--radius-card', value: 'lg (8px)' },
    { comp: 'Input', token: '--radius-input', value: 'md (6px)' },
    { comp: 'Checkbox', token: '--radius-checkbox', value: 'sm (2px)' },
    { comp: 'Dialog', token: '--radius-dialog', value: 'xl (12px)' },
  ];

  for (var ctx of contexts) {
    var ctxRow = createHorizontalRow(ctx.comp, 16);
    ctxRow.counterAxisAlignItems = 'CENTER';
    ctxRow.paddingTop = 6;
    ctxRow.paddingBottom = 6;

    var ctxName = createTextNode(ctx.comp, 'Inter', 'Medium', 14, C_TEXT_HEADING);
    ctxName.resize(120, 20);
    ctxName.textAutoResize = 'NONE';
    ctxRow.appendChild(ctxName);

    var ctxToken = createMonoText(ctx.token, 12);
    ctxToken.resize(200, 18);
    ctxToken.textAutoResize = 'NONE';
    ctxRow.appendChild(ctxToken);

    var ctxValue = createMutedText(ctx.value, 13);
    ctxRow.appendChild(ctxValue);

    section.appendChild(ctxRow);
  }

  wrapper.appendChild(section);
}

// --- Pages 7-9: Component Overviews ---

async function generateComponentPage(
  pageName: string, title: string, subtitle: string, components: ComponentEntry[]
): Promise<void> {
  await createDocPage(pageName);
  var wrapper = createPageWrapper();

  wrapper.appendChild(createPageHeader(title, subtitle));

  var section = createContentSection('Components');
  section.appendChild(createSectionHeading(
    title + ' (' + components.length + ')'
  ));

  var grid = createComponentGrid(components);
  section.appendChild(grid);

  wrapper.appendChild(section);
}

// ============================================================
// MAIN ENTRY POINT
// ============================================================

export async function generateDocumentation(tokensJson: string): Promise<void> {
  var data: TokenData = JSON.parse(tokensJson);
  var lookup = buildTokenLookup(data);

  // Load fonts
  figma.ui.postMessage({ type: 'status', text: 'Lade Schriften...', success: true });
  await loadDocFonts();

  // Cleanup existing doc pages
  var existingPages = figma.root.children.filter(function(p) {
    return p.name.startsWith('Docs / ');
  });
  for (var page of existingPages) {
    page.remove();
  }

  // Generate pages sequentially with progress updates
  figma.ui.postMessage({ type: 'status', text: 'Seite 1/9: Cover...', success: true });
  await generateCoverPage(lookup);

  figma.ui.postMessage({ type: 'status', text: 'Seite 2/9: Designprinzipien...', success: true });
  await generatePrinciplesPage();

  figma.ui.postMessage({ type: 'status', text: 'Seite 3/9: Farben...', success: true });
  await generateColorsPage(lookup);

  figma.ui.postMessage({ type: 'status', text: 'Seite 4/9: Typografie...', success: true });
  await generateTypographyPage(lookup);

  figma.ui.postMessage({ type: 'status', text: 'Seite 5/9: Spacing & Sizing...', success: true });
  await generateSpacingPage(lookup);

  figma.ui.postMessage({ type: 'status', text: 'Seite 6/9: Radius...', success: true });
  await generateRadiusPage(lookup);

  figma.ui.postMessage({ type: 'status', text: 'Seite 7/9: Atoms...', success: true });
  await generateComponentPage(
    'Atoms', 'Atoms',
    ATOMS.length + ' atomare Grundbausteine des Design Systems',
    ATOMS
  );

  figma.ui.postMessage({ type: 'status', text: 'Seite 8/9: Molecules...', success: true });
  await generateComponentPage(
    'Molecules', 'Molecules',
    MOLECULES.length + ' zusammengesetzte Komponenten',
    MOLECULES
  );

  figma.ui.postMessage({ type: 'status', text: 'Seite 9/9: Organisms...', success: true });
  await generateComponentPage(
    'Organisms', 'Organisms',
    ORGANISMS.length + ' komplexe UI-Strukturen',
    ORGANISMS
  );

  // Navigate to Cover page
  var coverPage = figma.root.children.find(function(p) {
    return p.name === 'Docs / Cover';
  });
  if (coverPage) await figma.setCurrentPageAsync(coverPage);
}
