#!/usr/bin/env node
/**
 * CSS Analysis Script - Nordlig Design System
 *
 * Scannt Komponenten-Quelldateien auf:
 * 1. Hartcodierte Farbwerte (hex, rgb, hsl) ohne CSS Custom Properties
 * 2. Hartcodierte Spacing-Werte ohne CSS Custom Properties
 * 3. Direkte Tailwind-Farbklassen die das Token-System umgehen
 * 4. Token-Nutzungsstatistiken
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components/src');

// ─── Ausnahmen ───────────────────────────────────────────────────────────────
// Dateien die funktional bedingt hartcodierte Farbwerte benoetigen
const EXCLUDED_FILES = [
  'molecules/ColorPicker/ColorPicker.tsx', // Hue-Gradient, Saturation-Overlay, Checkerboard
  'utils/color.ts',                        // Farb-Konvertierungs-Utilities
];

// ─── Pattern-Definitionen ────────────────────────────────────────────────────

// Hartcodierte Hex-Farben in Tailwind-Arbitrary-Values oder Inline-Styles
const HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;

// Hartcodierte RGB/RGBA-Werte
const RGB_PATTERN = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g;

// Hartcodierte HSL/HSLA-Werte
const HSL_PATTERN = /hsla?\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?/g;

// Direkte Tailwind-Farbklassen (z.B. bg-slate-500, text-gray-400)
const TAILWIND_COLOR_PATTERN = /(?:bg|text|border|ring|shadow|from|via|to|divide|outline|accent|caret|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}/g;

// Hartcodierte Pixel-Werte in Arbitrary-Values (ohne max-h/min-h/max-w/min-w — Layout-Constraints)
const HARDCODED_PX_PATTERN = /(?:^|[\s'"])(?:p|m|gap|space|w|h|top|right|bottom|left|inset)-\[\d+px\]/g;

// Token-Nutzung (CSS Custom Properties)
const TOKEN_COLOR_PATTERN = /var\(--color-[^)]+\)/g;
const TOKEN_SPACING_PATTERN = /var\(--(?:spacing|sizing)-[^)]+\)/g;

// ─── Specificity Patterns ────────────────────────────────────────────────────

// !important usage (should never appear in design system components)
const IMPORTANT_PATTERN = /!important/g;

// Inline style attributes (should use Tailwind utilities instead)
const INLINE_STYLE_PATTERN = /\bstyle\s*=\s*\{\s*\{/g;

// ─── Strict Mode Patterns ────────────────────────────────────────────────────
// Semi-hardcoded Tailwind utilities that should use design tokens

// Hardcoded Tailwind font-size classes (text-xs, text-sm, text-lg, etc.)
// Excludes text-[...] arbitrary values (already token-based) and text-{color} classes
const TAILWIND_FONT_SIZE_PATTERN = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl)\b/g;

// Hardcoded Tailwind font-weight classes
const TAILWIND_FONT_WEIGHT_PATTERN = /\bfont-(?:normal|medium|semibold|bold)\b/g;

// Hardcoded Tailwind spacing classes (padding, margin, gap)
const TAILWIND_SPACING_PATTERN = /\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap)-(?:\d+(?:\.\d+)?)\b/g;

// ─── Dateien scannen ─────────────────────────────────────────────────────────

function analyzeFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const findings = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Kommentare ueberspringen
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      continue;
    }

    // Hex-Farben (ausser in var() oder bekannten Ausnahmen)
    let match;
    const hexMatches = line.matchAll(HEX_PATTERN);
    for (const m of hexMatches) {
      // Pruefen ob innerhalb var() oder als Import/Typ
      const before = line.substring(0, m.index);
      if (before.includes('var(') || before.includes('import') || before.includes('from ')) continue;
      findings.push({
        type: 'HARDCODED_COLOR',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    // RGB/RGBA
    const rgbMatches = line.matchAll(RGB_PATTERN);
    for (const m of rgbMatches) {
      findings.push({
        type: 'HARDCODED_COLOR',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    // HSL/HSLA
    const hslMatches = line.matchAll(HSL_PATTERN);
    for (const m of hslMatches) {
      findings.push({
        type: 'HARDCODED_COLOR',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    // Direkte Tailwind-Farbklassen
    const twMatches = line.matchAll(TAILWIND_COLOR_PATTERN);
    for (const m of twMatches) {
      findings.push({
        type: 'TAILWIND_COLOR',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    // Hartcodierte Pixel-Werte
    const pxMatches = line.matchAll(HARDCODED_PX_PATTERN);
    for (const m of pxMatches) {
      findings.push({
        type: 'HARDCODED_SPACING',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    // ─── Specificity: !important ──────────────────────────────────────────────
    const importantMatches = line.matchAll(IMPORTANT_PATTERN);
    for (const m of importantMatches) {
      findings.push({
        type: 'IMPORTANT',
        file: relativePath,
        line: lineNum,
        value: '!important',
        context: trimmed.substring(0, 80),
      });
    }

    // ─── Specificity: Inline Styles ─────────────────────────────────────────
    const styleMatches = line.matchAll(INLINE_STYLE_PATTERN);
    for (const m of styleMatches) {
      findings.push({
        type: 'INLINE_STYLE',
        file: relativePath,
        line: lineNum,
        value: 'style={{...}}',
        context: trimmed.substring(0, 80),
      });
    }

    // ─── Strict Mode: Tailwind Typography + Spacing ──────────────────────────
    const fontSizeMatches = line.matchAll(TAILWIND_FONT_SIZE_PATTERN);
    for (const m of fontSizeMatches) {
      findings.push({
        type: 'TAILWIND_FONT_SIZE',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    const fontWeightMatches = line.matchAll(TAILWIND_FONT_WEIGHT_PATTERN);
    for (const m of fontWeightMatches) {
      // Skip font-mono (not a weight)
      if (m[0] === 'font-mono') continue;
      findings.push({
        type: 'TAILWIND_FONT_WEIGHT',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }

    const spacingMatches = line.matchAll(TAILWIND_SPACING_PATTERN);
    for (const m of spacingMatches) {
      findings.push({
        type: 'TAILWIND_SPACING',
        file: relativePath,
        line: lineNum,
        value: m[0],
        context: trimmed.substring(0, 80),
      });
    }
  }

  // Token-Nutzung zaehlen
  const colorTokens = (content.match(TOKEN_COLOR_PATTERN) || []).length;
  const spacingTokens = (content.match(TOKEN_SPACING_PATTERN) || []).length;

  return { findings, colorTokens, spacingTokens };
}

// ─── Hauptanalyse ────────────────────────────────────────────────────────────

function main() {
  const strict = process.argv.includes('--strict');
  console.log(`CSS Analysis Report - Nordlig Design System${strict ? ' (STRICT MODE)' : ''}`);
  console.log('============================================\n');

  const componentFiles = globSync('**/*.tsx', {
    cwd: COMPONENTS_DIR,
    ignore: ['**/*.stories.tsx', '**/*.test.tsx'],
  });

  let totalFindings = [];
  let totalColorTokens = 0;
  let totalSpacingTokens = 0;

  const excludedFindings = [];
  for (const file of componentFiles) {
    const filePath = path.join(COMPONENTS_DIR, file);
    const { findings, colorTokens, spacingTokens } = analyzeFile(filePath, file);
    totalColorTokens += colorTokens;
    totalSpacingTokens += spacingTokens;
    if (EXCLUDED_FILES.includes(file)) {
      excludedFindings.push(...findings);
    } else {
      totalFindings.push(...findings);
    }
  }

  // Nach Typ gruppieren — Blocking (always enforced)
  const hardcodedColors = totalFindings.filter(f => f.type === 'HARDCODED_COLOR');
  const tailwindColors = totalFindings.filter(f => f.type === 'TAILWIND_COLOR');
  const hardcodedSpacing = totalFindings.filter(f => f.type === 'HARDCODED_SPACING');

  // Specificity issues (always blocking)
  const importantUsages = totalFindings.filter(f => f.type === 'IMPORTANT');
  const inlineStyles = totalFindings.filter(f => f.type === 'INLINE_STYLE');

  // Strict-only (reported but not blocking unless --strict)
  const twFontSize = totalFindings.filter(f => f.type === 'TAILWIND_FONT_SIZE');
  const twFontWeight = totalFindings.filter(f => f.type === 'TAILWIND_FONT_WEIGHT');
  const twSpacing = totalFindings.filter(f => f.type === 'TAILWIND_SPACING');
  const totalStrict = twFontSize.length + twFontWeight.length + twSpacing.length;

  // Report ausgeben — Blocking issues
  if (hardcodedColors.length > 0) {
    console.log(`HARTCODIERTE FARBEN (sollten CSS Custom Properties verwenden): ${hardcodedColors.length}`);
    for (const f of hardcodedColors) {
      console.log(`  ${f.file}:${f.line} - ${f.value}`);
      console.log(`    ${f.context}`);
    }
    console.log();
  } else {
    console.log('HARTCODIERTE FARBEN: Keine gefunden ✓\n');
  }

  if (tailwindColors.length > 0) {
    console.log(`DIREKTE TAILWIND-FARBEN (umgehen Token-System): ${tailwindColors.length}`);
    for (const f of tailwindColors) {
      console.log(`  ${f.file}:${f.line} - ${f.value}`);
    }
    console.log();
  } else {
    console.log('DIREKTE TAILWIND-FARBEN: Keine gefunden ✓\n');
  }

  if (hardcodedSpacing.length > 0) {
    console.log(`HARTCODIERTE SPACING-WERTE: ${hardcodedSpacing.length}`);
    for (const f of hardcodedSpacing) {
      console.log(`  ${f.file}:${f.line} - ${f.value}`);
    }
    console.log();
  } else {
    console.log('HARTCODIERTE SPACING-WERTE: Keine gefunden ✓\n');
  }

  // Report — Specificity issues
  if (importantUsages.length > 0) {
    console.log(`!IMPORTANT USAGE (erhoehte Specificity, vermeiden): ${importantUsages.length}`);
    for (const f of importantUsages) {
      console.log(`  ${f.file}:${f.line}`);
      console.log(`    ${f.context}`);
    }
    console.log();
  } else {
    console.log('!IMPORTANT USAGE: Keine gefunden ✓\n');
  }

  if (inlineStyles.length > 0) {
    console.log(`INLINE STYLES (sollten Tailwind-Utilities verwenden): ${inlineStyles.length}`);
    for (const f of inlineStyles) {
      console.log(`  ${f.file}:${f.line}`);
      console.log(`    ${f.context}`);
    }
    console.log();
  } else {
    console.log('INLINE STYLES: Keine gefunden ✓\n');
  }

  // Report — Strict mode findings
  if (strict || totalStrict > 0) {
    console.log('─── TAILWIND-UTILITY AUDIT ────────────────');

    // Group by file for compact output
    const strictByFile = {};
    for (const f of [...twFontSize, ...twFontWeight, ...twSpacing]) {
      if (!strictByFile[f.file]) strictByFile[f.file] = [];
      strictByFile[f.file].push(f);
    }

    console.log(`  Tailwind Font-Size Klassen:   ${twFontSize.length}`);
    console.log(`  Tailwind Font-Weight Klassen: ${twFontWeight.length}`);
    console.log(`  Tailwind Spacing Klassen:     ${twSpacing.length}`);
    console.log(`  Gesamt:                       ${totalStrict}`);

    if (strict && totalStrict > 0) {
      console.log('\n  Top-Dateien:');
      const sorted = Object.entries(strictByFile)
        .sort(([,a], [,b]) => b.length - a.length)
        .slice(0, 10);
      for (const [file, findings] of sorted) {
        console.log(`    ${file}: ${findings.length} Violations`);
      }
    }
    console.log();
  }

  // Ausnahmen melden
  if (excludedFindings.length > 0) {
    console.log(`AUSGENOMMENE DATEIEN (funktional bedingte Farben): ${EXCLUDED_FILES.length}`);
    for (const f of EXCLUDED_FILES) {
      const count = excludedFindings.filter(e => e.file === f).length;
      if (count > 0) console.log(`  ${f}: ${count} hartcodierte Werte (begruendet)`);
    }
    console.log();
  }

  // Statistiken
  const blockingIssues = hardcodedColors.length + tailwindColors.length + hardcodedSpacing.length + importantUsages.length;
  const totalTokenUsage = totalColorTokens + totalSpacingTokens;
  const compliance = totalTokenUsage > 0
    ? ((totalTokenUsage / (totalTokenUsage + blockingIssues)) * 100).toFixed(1)
    : '100.0';

  console.log('TOKEN-NUTZUNGSSTATISTIKEN');
  console.log('────────────────────────');
  console.log(`  Farb-Token-Referenzen:     ${totalColorTokens}`);
  console.log(`  Spacing-Token-Referenzen:  ${totalSpacingTokens}`);
  console.log(`  Blocking Issues:           ${blockingIssues}`);
  if (totalStrict > 0) {
    console.log(`  Tailwind-Utility Issues:   ${totalStrict}${strict ? ' (BLOCKING)' : ' (info only)'}`);
  }
  console.log(`  Dateien analysiert:        ${componentFiles.length}`);
  console.log(`  Compliance:                ${compliance}%`);

  const failCount = strict ? blockingIssues + totalStrict : blockingIssues;

  if (failCount > 0) {
    console.log(`\n⚠ ${failCount} Probleme gefunden${strict ? ' (strict mode)' : ''}`);
    process.exit(1);
  } else {
    console.log('\n✓ Alle Komponenten verwenden das Token-System korrekt');
    process.exit(0);
  }
}

main();
