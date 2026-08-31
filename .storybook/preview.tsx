import type { Decorator, Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import ThemeProvider from "../src/components/ThemeProvider";
import customThemes from "../src/data/customTheme";

// Published builds get the @font-face rules from dist/fonts.css; Storybook
// renders from source, so it has to load them itself.
import "../src/style/base/_fonts.scss";

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
  // No global `theme` argType: the theme is a global (see globalTypes below),
  // read from context.globals by the decorator above — never from args. A
  // global argType put a dead `theme` control on every component's Controls
  // tab, and on ThemeProvider it shadowed the real `theme` prop, offering the
  // string "dibk" where the component expects a ThemeProps object.
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
        
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
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

