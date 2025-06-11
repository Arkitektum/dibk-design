import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },

  staticDirs: ['static'],
  typescript: { reactDocgen: 'react-docgen-typescript' },
};

export default config;
