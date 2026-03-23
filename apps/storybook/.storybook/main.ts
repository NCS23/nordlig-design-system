import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../../../packages/components/src/**/*.stories.@(ts|tsx)',
    '../../../packages/components/src/**/*.mdx',
    '../stories/**/*.stories.@(ts|tsx)',
    '../stories/**/*.mdx',
  ],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-docs")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: (config) => {
    // Resolve @nordlig/styles imports to local dist files
    // (Storybook uses relative paths, not npm packages)
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const stylesDir = resolve(currentDir, '../../../packages/styles/dist');
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'nordlig-styles-resolver',
      resolveId(source) {
        if (source === '@nordlig/styles' || source === '@nordlig/styles/core') {
          return resolve(stylesDir, source === '@nordlig/styles' ? 'tokens.css' : 'tokens-core.css');
        }
        if (source === '@nordlig/styles/dark') {
          return resolve(stylesDir, 'dark-tokens.css');
        }
        const match = source.match(/^@nordlig\/styles\/tokens\/(.+)$/);
        if (match) {
          return resolve(stylesDir, `tokens/${match[1]}.css`);
        }
        return null;
      },
    });
    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
