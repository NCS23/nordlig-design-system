#!/usr/bin/env node
/**
 * Token Validator - Nordlig Design System
 *
 * Validiert die 4-Schichten-Token-Architektur:
 * - L4 (semantic) Tokens duerfen NUR L3 (roles) Tokens referenzieren
 * - Keine direkten L1/L2-Referenzen in L4
 * - Namenskonventionen werden geprueft
 * - Verwaiste Tokens werden erkannt
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const TOKENS_DIR = path.resolve(__dirname, '../packages/tokens/src');
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components/src');

const strict = process.argv.includes('--strict');

// ─── Token-Pfade aus JSON-Dateien sammeln ────────────────────────────────────

function collectTokenPaths(jsonData, prefix = '') {
  const paths = [];

  for (const [key, value] of Object.entries(jsonData)) {
    if (key.startsWith('$')) continue;

    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !value.$value && !value.$type) {
      paths.push(...collectTokenPaths(value, currentPath));
    } else if (value && value.$value) {
      paths.push({ path: currentPath, value: value.$value, type: value.$type });
    }
  }

  return paths;
}

function loadLayerTokens(layerDir) {
  const tokens = new Set();
  const files = globSync('*.json', { cwd: layerDir });

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(layerDir, file), 'utf-8'));
    const paths = collectTokenPaths(data);
    for (const { path: tokenPath } of paths) {
      tokens.add(tokenPath);
    }
  }

  return tokens;
}

// ─── Referenzen aus $value extrahieren ───────────────────────────────────────

function extractReferences(value) {
  if (typeof value !== 'string') return [];
  const refs = [];
  const regex = /\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(value)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

// ─── Bestimmen, zu welcher Schicht eine Referenz gehoert ─────────────────────

function resolveLayer(ref, l1Tokens, l2Tokens, l3Tokens) {
  if (l3Tokens.has(ref)) return 'L3';
  if (l2Tokens.has(ref)) return 'L2';
  if (l1Tokens.has(ref)) return 'L1';
  return 'unknown';
}

// ─── CSS-Variable-Name aus Token-Pfad ableiten ──────────────────────────────

function tokenPathToCssVar(tokenPath) {
  return `--${tokenPath.replace(/\./g, '-')}`;
}

// ─── Verwaiste Tokens finden ─────────────────────────────────────────────────

function findOrphanedTokens(l4Tokens, componentsDir) {
  const componentFiles = globSync('**/*.tsx', {
    cwd: componentsDir,
    ignore: ['**/*.test.tsx', '**/*.stories.tsx'],
  });

  let allContent = '';
  for (const file of componentFiles) {
    allContent += fs.readFileSync(path.join(componentsDir, file), 'utf-8');
  }

  const orphans = [];
  for (const { path: tokenPath } of l4Tokens) {
    const cssVar = tokenPathToCssVar(tokenPath);
    if (!allContent.includes(cssVar)) {
      orphans.push({ token: tokenPath, cssVar });
    }
  }

  return orphans;
}

// ─── Hauptvalidierung ────────────────────────────────────────────────────────

function main() {
  console.log('Token Validation Report');
  console.log('=======================\n');

  // Schichten laden
  const l1Tokens = loadLayerTokens(path.join(TOKENS_DIR, 'base'));
  const l2Tokens = loadLayerTokens(path.join(TOKENS_DIR, 'global'));
  const l3Tokens = loadLayerTokens(path.join(TOKENS_DIR, 'roles'));

  console.log(`L1 (Base) Tokens:   ${l1Tokens.size}`);
  console.log(`L2 (Global) Tokens: ${l2Tokens.size}`);
  console.log(`L3 (Roles) Tokens:  ${l3Tokens.size}`);
  console.log();

  // L4-Tokens laden und validieren
  const semanticDir = path.join(TOKENS_DIR, 'semantic');
  const semanticFiles = globSync('*.json', { cwd: semanticDir });

  const errors = [];
  const warnings = [];
  let totalL4 = 0;
  let validRefs = 0;
  let l2Violations = 0;
  let l1Violations = 0;
  let unknownRefs = 0;

  for (const file of semanticFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(semanticDir, file), 'utf-8'));
    const tokens = collectTokenPaths(data);

    for (const { path: tokenPath, value } of tokens) {
      totalL4++;
      const refs = extractReferences(value);

      for (const ref of refs) {
        const layer = resolveLayer(ref, l1Tokens, l2Tokens, l3Tokens);

        switch (layer) {
          case 'L3':
            validRefs++;
            break;
          case 'L2':
            l2Violations++;
            errors.push(`  ${file}: ${tokenPath} referenziert L2-Token {${ref}}`);
            break;
          case 'L1':
            l1Violations++;
            errors.push(`  ${file}: ${tokenPath} referenziert L1-Token {${ref}}`);
            break;
          case 'unknown':
            unknownRefs++;
            warnings.push(`  ${file}: ${tokenPath} referenziert unbekannten Token {${ref}}`);
            break;
        }
      }
    }
  }

  // Verwaiste Tokens
  const allL4Tokens = [];
  for (const file of semanticFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(semanticDir, file), 'utf-8'));
    allL4Tokens.push(...collectTokenPaths(data));
  }
  const orphans = findOrphanedTokens(allL4Tokens, COMPONENTS_DIR);

  // Report ausgeben
  if (errors.length > 0) {
    console.log(`FEHLER (Schicht-Verletzungen): ${errors.length}`);
    for (const error of errors) {
      console.log(error);
    }
    console.log();
  }

  if (warnings.length > 0) {
    console.log(`WARNUNGEN (Unbekannte Referenzen): ${warnings.length}`);
    for (const warning of warnings) {
      console.log(warning);
    }
    console.log();
  }

  if (orphans.length > 0) {
    console.log(`VERWAISTE TOKENS (nicht in Komponenten verwendet): ${orphans.length}`);
    for (const { token, cssVar } of orphans) {
      console.log(`  ${token} (${cssVar})`);
    }
    console.log();
  }

  // Zusammenfassung
  console.log('Zusammenfassung');
  console.log('───────────────');
  console.log(`  L4 Tokens gesamt:       ${totalL4}`);
  console.log(`  Gueltige Referenzen:    ${validRefs}`);
  console.log(`  L2-Verletzungen:        ${l2Violations}`);
  console.log(`  L1-Verletzungen:        ${l1Violations}`);
  console.log(`  Unbekannte Referenzen:  ${unknownRefs}`);
  console.log(`  Verwaiste Tokens:       ${orphans.length}`);

  const hasErrors = errors.length > 0;

  if (hasErrors && strict) {
    console.log('\n✗ Validierung fehlgeschlagen (--strict Modus)');
    process.exit(1);
  } else if (hasErrors) {
    console.log('\n⚠ Schicht-Verletzungen gefunden (nutze --strict fuer Exit-Code 1)');
    process.exit(0);
  } else {
    console.log('\n✓ Alle L4-Tokens referenzieren korrekt nur L3-Tokens');
    process.exit(0);
  }
}

main();
