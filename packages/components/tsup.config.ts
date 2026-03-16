import { defineConfig } from 'tsup';
import pkg from './package.json';

// Externalize ALL dependencies so consumers can tree-shake them
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
];

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.{test,stories,spec}.{ts,tsx}', '!src/test-setup.ts', '!src/examples/**'],
  format: ['esm', 'cjs'],
  dts: { entry: 'src/index.ts' },
  sourcemap: true,
  clean: true,
  splitting: true,
  external,
  treeshake: true,
});
