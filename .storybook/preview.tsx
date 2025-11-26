import React from "react";
import { MemoryRouter } from "react-router-dom";
import ThemeProvider from "../src/components/ThemeProvider";
import customThemes from "../src/data/customTheme";
import type { Decorator, Preview } from "@storybook/react";

const withThemeProvider: Decorator = (Story, { parameters }) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={parameters.theme}>
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withThemeProvider],
};

export default preview;

// All stories expect a theme arg
export const argTypes = {
  theme: {
    control: "select",
    options: ["Default", "DiBK", "Arbeidstilsynet"],

    mapping: {
      Default: undefined,
      DiBK: customThemes.dibk,
      Arbeidstilsynet: customThemes.arbeidstilsynet,
    },
  },
};
