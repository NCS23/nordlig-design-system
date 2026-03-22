import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import '../storybook.css';
import '../../../packages/styles/dist/tokens.css';
import '../../../packages/styles/dist/dark-tokens.css';
import '../../../packages/styles/src/global.css';

/**
 * Theme-Decorator: Setzt die .dark Klasse auf <html> und den Story-Container
 * basierend auf der Toolbar-Auswahl.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';
  const isDark = theme === 'dark';

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.backgroundColor = isDark ? '#0f172a' : '#f8fafc';
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
    };
  }, [isDark]);

  return React.createElement(Story);
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme fuer Komponenten',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
