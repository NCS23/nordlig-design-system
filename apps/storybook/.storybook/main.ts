import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../../../packages/components/src/**/*.stories.@(ts|tsx)',
    '../../../packages/components/src/**/*.mdx',
    '../stories/**/*.stories.@(ts|tsx)',
    '../stories/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
