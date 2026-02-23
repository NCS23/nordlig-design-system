#!/usr/bin/env node
/**
 * Bundle-Impact-Analyse pro Komponente
 *
 * Misst die Groesse jeder Komponente einzeln via esbuild,
 * um Tree-Shaking-Effizienz zu verifizieren und die groessten
 * Beitraege zum Bundle sichtbar zu machen.
 *
 * Usage:  node scripts/bundle-analysis.mjs [--json] [--threshold <KB>]
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { build } = require('esbuild');
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COMPONENTS_SRC = join(ROOT, 'packages/components/src');
const TMP_DIR = join(ROOT, '.bundle-analysis-tmp');

const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');
const thresholdIdx = args.indexOf('--threshold');
const thresholdKB = thresholdIdx !== -1 ? parseFloat(args[thresholdIdx + 1]) : 0;

// Parse index.ts to extract component exports
function parseExports() {
  const indexContent = readFileSync(join(COMPONENTS_SRC, 'index.ts'), 'utf-8');
  const exports = [];
  const re = /export\s+\{[^}]+\}\s+from\s+'\.\/([^']+)'/g;
  let match;
  while ((match = re.exec(indexContent)) !== null) {
    const modulePath = match[1];
    // Extract first named export for the entry name
    const bracketContent = match[0].match(/\{([^}]+)\}/)?.[1] ?? '';
    const names = bracketContent
      .split(',')
      .map(n => n.trim().split(/\s+as\s+/)[0])
      .filter(n => n && !n.startsWith('type '));
    if (names.length === 0) continue;
    const primaryName = names[0];
    exports.push({ name: primaryName, path: modulePath, allNames: names });
  }
  return exports;
}

async function measureComponent(entry) {
  const entryCode = `import { ${entry.allNames.join(', ')} } from '${join(COMPONENTS_SRC, entry.path)}';\nconsole.log(${entry.allNames.join(', ')});\n`;
  const entryFile = join(TMP_DIR, `${entry.name}.tsx`);
  writeFileSync(entryFile, entryCode);

  try {
    const result = await build({
      entryPoints: [entryFile],
      bundle: true,
      write: false,
      format: 'esm',
      target: 'es2020',
      minify: true,
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      treeShaking: true,
      jsx: 'automatic',
      loader: { '.tsx': 'tsx', '.ts': 'ts' },
      logLevel: 'silent',
    });

    const code = result.outputFiles[0].contents;
    const raw = code.length;
    const gzipped = gzipSync(Buffer.from(code)).length;
    return { raw, gzipped };
  } catch {
    return { raw: -1, gzipped: -1, error: true };
  }
}

function formatBytes(bytes) {
  if (bytes < 0) return 'ERR';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function bar(value, max, width = 30) {
  const filled = Math.round((value / max) * width);
  return '\u2588'.repeat(filled) + '\u2591'.repeat(width - filled);
}

async function main() {
  mkdirSync(TMP_DIR, { recursive: true });

  const entries = parseExports();
  if (!jsonOutput) {
    console.log(`\nAnalysiere ${entries.length} Komponenten-Exporte...\n`);
  }

  // Measure full bundle
  const fullEntryFile = join(TMP_DIR, '_full.tsx');
  writeFileSync(fullEntryFile, `export * from '${join(COMPONENTS_SRC, 'index')}';\n`);
  let fullSize;
  try {
    const fullResult = await build({
      entryPoints: [fullEntryFile],
      bundle: true,
      write: false,
      format: 'esm',
      target: 'es2020',
      minify: true,
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      treeShaking: true,
      jsx: 'automatic',
      loader: { '.tsx': 'tsx', '.ts': 'ts' },
      logLevel: 'silent',
    });
    const code = fullResult.outputFiles[0].contents;
    fullSize = { raw: code.length, gzipped: gzipSync(Buffer.from(code)).length };
  } catch (e) {
    console.error('Fehler beim Full-Bundle-Build:', e.message);
    process.exit(1);
  }

  // Measure each component
  const results = [];
  for (const entry of entries) {
    const size = await measureComponent(entry);
    results.push({ ...entry, ...size });
  }

  // Cleanup
  rmSync(TMP_DIR, { recursive: true, force: true });

  // Sort by gzipped size descending
  results.sort((a, b) => b.gzipped - a.gzipped);
  const maxGzipped = results[0]?.gzipped ?? 1;

  if (jsonOutput) {
    const output = {
      fullBundle: fullSize,
      components: results.map(r => ({
        name: r.name,
        path: r.path,
        minified: r.raw,
        gzipped: r.gzipped,
      })),
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Console output
  console.log('Full Bundle:');
  console.log(`  Minified: ${formatBytes(fullSize.raw)}`);
  console.log(`  Gzipped:  ${formatBytes(fullSize.gzipped)}\n`);

  console.log('Komponente'.padEnd(28) + 'Minified'.padStart(10) + 'Gzipped'.padStart(10) + '  ' + 'Anteil');
  console.log('─'.repeat(80));

  let thresholdExceeded = false;
  for (const r of results) {
    const pct = ((r.gzipped / fullSize.gzipped) * 100).toFixed(1);
    const gzipKB = r.gzipped / 1024;
    const flag = thresholdKB > 0 && gzipKB > thresholdKB ? ' ⚠' : '';
    if (flag) thresholdExceeded = true;
    console.log(
      r.name.padEnd(28) +
      formatBytes(r.raw).padStart(10) +
      formatBytes(r.gzipped).padStart(10) +
      `  ${bar(r.gzipped, maxGzipped)} ${pct}%${flag}`
    );
  }

  console.log('─'.repeat(80));
  console.log(`\n${results.length} Komponenten analysiert.`);

  if (thresholdKB > 0) {
    const over = results.filter(r => r.gzipped / 1024 > thresholdKB);
    if (over.length > 0) {
      console.log(`\n⚠  ${over.length} Komponente(n) ueber ${thresholdKB} KB (gzipped):`);
      for (const r of over) {
        console.log(`   - ${r.name}: ${formatBytes(r.gzipped)}`);
      }
    }
  }

  if (thresholdExceeded) process.exit(1);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
