import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Nordlig Design System',

  // Farben passend zum DS Dark Mode
  colorPrimary: '#38bdf8',
  colorSecondary: '#38bdf8',

  // UI
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appPreviewBg: '#0f172a',
  appBorderColor: '#334155',
  appBorderRadius: 6,

  // Text
  textColor: '#f1f5f9',
  textInverseColor: '#0f172a',
  textMutedColor: '#94a3b8',

  // Toolbar
  barTextColor: '#94a3b8',
  barSelectedColor: '#38bdf8',
  barHoverColor: '#f1f5f9',
  barBg: '#1e293b',

  // Inputs
  inputBg: '#1e293b',
  inputBorder: '#475569',
  inputTextColor: '#f1f5f9',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: darkTheme,
});
