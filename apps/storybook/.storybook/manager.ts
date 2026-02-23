import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const lightTheme = create({
  base: 'light',
  brandTitle: 'Nordlig Design System',

  colorPrimary: '#0284c7',
  colorSecondary: '#0284c7',

  // UI
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: 'transparent',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 6,

  // Text
  textColor: '#1e293b',
  textInverseColor: '#f8fafc',
  textMutedColor: '#64748b',

  // Toolbar
  barTextColor: '#64748b',
  barSelectedColor: '#0284c7',
  barHoverColor: '#1e293b',
  barBg: '#ffffff',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
  inputTextColor: '#1e293b',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: lightTheme,
});
