import React from "react";
import { MemoryRouter } from "react-router-dom";
import ThemeProvider from "../src/components/ThemeProvider";
import customThemes from "../src/data/customTheme";
import type { Decorator, Preview } from "@storybook/react-vite";

const withThemeProvider: Decorator = (Story, context) => {
  const themeKey = context.globals.theme ?? "dibk";
  const theme = customThemes[themeKey as keyof typeof customThemes];
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  );
};

const preview: Preview = {
  argTypes: {theme: {
    control: "select",
    options: ["dibk", "arbeidstilsynet"],
    defaultValue: "dibk",
  }},
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
        
      },
    },
  },
  decorators: [withThemeProvider],
  
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dibk", title: "DiBK" },
          { value: "arbeidstilsynet", title: "Arbeidstilsynet" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dibk",
  },
};

export default preview;

