/**
 * Build script for the Figma plugin.
 * Bundles code.ts → dist/code.js and copies ui.html → dist/ui.html
 */

import { build } from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const distDir = resolve(__dirname, 'plugin/dist');
  mkdirSync(distDir, { recursive: true });

  // Bundle plugin code
  await build({
    entryPoints: [resolve(__dirname, 'plugin/code.ts')],
    bundle: true,
    outfile: resolve(distDir, 'code.js'),
    format: 'iife',
    target: 'es2015',
    minify: false, // Keep readable for debugging
  });

  // Copy UI HTML
  copyFileSync(
    resolve(__dirname, 'plugin/ui.html'),
    resolve(distDir, 'ui.html')
  );

  console.log('Plugin built successfully → plugin/dist/');
}

main().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
