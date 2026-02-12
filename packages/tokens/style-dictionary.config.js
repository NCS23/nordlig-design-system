/**
 * Nordlig Design System - Style Dictionary Configuration
 *
 * Transforms DTCG token JSON files into multiple output formats:
 * - CSS Custom Properties
 * - Tailwind Config
 * - TypeScript constants
 * - Flat JSON (for MCP, Figma, etc.)
 */
module.exports = {
  source: [
    'src/base/**/*.json',
    'src/global/**/*.json',
    'src/roles/**/*.json',
    'src/semantic/**/*.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: '../styles/dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
        },
      }],
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: '../styles/dist/',
      files: [{
        destination: 'tailwind-tokens.js',
        format: 'javascript/es6',
      }],
    },
    ts: {
      transformGroup: 'js',
      buildPath: '../components/src/tokens/',
      files: [{
        destination: 'tokens.ts',
        format: 'javascript/es6',
      }],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.json',
        format: 'json/flat',
      }],
    },
  },
};
