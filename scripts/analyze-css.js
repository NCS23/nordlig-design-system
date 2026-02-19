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
  }

  // Token-Nutzung zaehlen
  const colorTokens = (content.match(TOKEN_COLOR_PATTERN) || []).length;
  const spacingTokens = (content.match(TOKEN_SPACING_PATTERN) || []).length;

  return { findings, colorTokens, spacingTokens };
}

// ─── Hauptanalyse ────────────────────────────────────────────────────────────

function main() {
  console.log('CSS Analysis Report - Nordlig Design System');
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

  // Nach Typ gruppieren
  const hardcodedColors = totalFindings.filter(f => f.type === 'HARDCODED_COLOR');
  const tailwindColors = totalFindings.filter(f => f.type === 'TAILWIND_COLOR');
  const hardcodedSpacing = totalFindings.filter(f => f.type === 'HARDCODED_SPACING');

  // Report ausgeben
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
  const totalIssues = totalFindings.length;
  const totalTokenUsage = totalColorTokens + totalSpacingTokens;
  const compliance = totalTokenUsage > 0
    ? ((totalTokenUsage / (totalTokenUsage + totalIssues)) * 100).toFixed(1)
    : '100.0';

  console.log('TOKEN-NUTZUNGSSTATISTIKEN');
  console.log('────────────────────────');
  console.log(`  Farb-Token-Referenzen:     ${totalColorTokens}`);
  console.log(`  Spacing-Token-Referenzen:  ${totalSpacingTokens}`);
  console.log(`  Hartcodierte Werte:        ${totalIssues}`);
  console.log(`  Dateien analysiert:        ${componentFiles.length}`);
  console.log(`  Compliance:                ${compliance}%`);

  if (totalIssues > 0) {
    console.log(`\n⚠ ${totalIssues} Probleme gefunden`);
    process.exit(1);
  } else {
    console.log('\n✓ Alle Komponenten verwenden das Token-System korrekt');
    process.exit(0);
  }
}

main();
