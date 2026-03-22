// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default tseslint.config(// Base JS rules
js.configs.recommended, // TypeScript rules
...tseslint.configs.recommended, // React
{
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}, // Accessibility
{
  plugins: {
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    ...jsxA11yPlugin.configs.recommended.rules,
  },
}, // Project-specific overrides
{
  rules: {
    // Allow any types in design system (common in forwardRef patterns)
    '@typescript-eslint/no-explicit-any': 'warn',
    // Allow unused vars with underscore prefix
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // Allow empty interfaces (common for extending)
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
  },
}, // Stories: Enforce DS component usage, relax type rules
{
  files: ['**/*.stories.tsx'],
  rules: {
    // --- Enforce DS component usage (KEINE rohen HTML-Elemente!) ---
    'no-restricted-syntax': [
      'error',
      {
        selector: 'JSXOpeningElement[name.name="button"]',
        message: 'Use <Button> from the design system instead of raw <button>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="input"]',
        message: 'Use <Input>, <InputField>, or <SearchInput> instead of raw <input>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="a"]',
        message: 'Use <Link> from the design system instead of raw <a>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h1"]',
        message: 'Use <Heading level={1}> instead of raw <h1>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h2"]',
        message: 'Use <Heading level={2}> instead of raw <h2>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h3"]',
        message: 'Use <Heading level={3}> instead of raw <h3>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h4"]',
        message: 'Use <Heading level={4}> instead of raw <h4>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h5"]',
        message: 'Use <Heading level={5}> instead of raw <h5>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="h6"]',
        message: 'Use <Heading level={6}> instead of raw <h6>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="label"]',
        message: 'Use <Label> from the design system instead of raw <label>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="select"]',
        message: 'Use <Select> from the design system instead of raw <select>.',
      },
      {
        selector: 'JSXOpeningElement[name.name="textarea"]',
        message: 'Use <Textarea> from the design system instead of raw <textarea>.',
      },
    ],
    // Relax rules in stories (common patterns like args spreads, useState in render)
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'off',
    // a11y violations in stories are warnings, not errors (demo code, not production)
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
  },
}, // Ignore patterns
{
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.next/**',
    '**/coverage/**',
    '**/storybook-static/**',
    'packages/figma-plugin/plugin/dist/**',
    'scripts/**',
    '**/*.config.{js,mjs,ts}',
    '**/*.test.tsx',
  ],
}, storybook.configs["flat/recommended"]);
