import type { Preview } from '@storybook/react';
import '../storybook.css';
import '../../../packages/styles/dist/tokens.css';
import '../../../packages/styles/dist/tokens-annotated.css';
import '../../../packages/styles/src/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0f172a' },
        { name: 'surface', value: '#f1f5f9' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
