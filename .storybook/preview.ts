import customThemes from '../src/data/customTheme';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

// All stories expect a theme arg
export const argTypes = {
  theme: {
    control: 'select',
    options: ['Default', 'DiBK', 'Arbeidstilsynet'],
    mapping: {
      Default: null,
      DiBK: customThemes.dibk,
      Arbeidstilsynet: customThemes.arbeidstilsynet,
    },
  },
};
