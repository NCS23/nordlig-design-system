/**
 * Nordlig Design System - Style Dictionary Configuration
 *
 * Transforms DTCG token JSON files into multiple output formats:
 * - CSS Custom Properties (split: core + per-component + all-in-one)
 * - Tailwind Config
 * - TypeScript constants
 * - Flat JSON (for MCP, Figma, etc.)
 */
const fs = require('fs');
const path = require('path');

/* ------------------------------------------------------------------ */
/*  Discover semantic component token files + their CSS prefixes       */
/* ------------------------------------------------------------------ */

const semanticDir = path.join(__dirname, 'src/semantic');
const componentPrefixes = {};

for (const file of fs.readdirSync(semanticDir).filter(f => f.endsWith('.json'))) {
  const component = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(path.join(semanticDir, file), 'utf8'));
  const prefixes = new Set();
  for (const category of Object.keys(data)) {
    if (typeof data[category] === 'object') {
      for (const key of Object.keys(data[category])) {
        if (!key.startsWith('$')) prefixes.add(key);
      }
    }
  }
  componentPrefixes[component] = [...prefixes];
}

/* ------------------------------------------------------------------ */
/*  Filter helpers                                                     */
/* ------------------------------------------------------------------ */

/** Token belongs to a specific component (matches any of its prefixes) */
function isComponentToken(token, prefixes) {
  const name = token.name; // e.g. "color-btn-primary-bg"
  return prefixes.some(prefix => {
    // Match: <category>-<prefix>- at any position in the name
    // The CSS name is built from the full path: color.btn.primary.bg → color-btn-primary-bg
    const pattern = `-${prefix}-`;
    return name.includes(pattern) || name.endsWith(`-${prefix}`);
  });
}

/** Token belongs to ANY semantic component */
function isAnyComponentToken(token) {
  return Object.values(componentPrefixes).some(
    prefixes => isComponentToken(token, prefixes),
  );
}

/* ------------------------------------------------------------------ */
/*  Build per-component CSS file entries                               */
/* ------------------------------------------------------------------ */

const componentCssFiles = Object.entries(componentPrefixes).map(
  ([component, prefixes]) => ({
    destination: `tokens/${component}.css`,
    format: 'css/variables',
    filter: (token) => isComponentToken(token, prefixes),
    options: {
      outputReferences: true,
    },
  }),
);

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

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
      files: [
        // All-in-one (backward compatible)
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        // Core only: L1 Base + L2 Global + L3 Roles (no component tokens)
        {
          destination: 'tokens-core.css',
          format: 'css/variables',
          filter: (token) => !isAnyComponentToken(token),
          options: {
            outputReferences: true,
          },
        },
        // Per-component token files
        ...componentCssFiles,
      ],
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
