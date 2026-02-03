import { arbeidstilsynetLogo, dibkLogoWithTitle } from "../icons";
import type { ThemeProps } from "../components/Theme";
import { colorTokens } from "./generated/colors";

const dibk: ThemeProps = {
  appName: "DiBK",
  logo: dibkLogoWithTitle,

  colors: {
    backgroundDefault: colorTokens["color-background-default"],
    backgroundSecondary: colorTokens["color-background-secondary"],
    backgroundInfo: colorTokens["color-background-info"],

    defaultText: colorTokens["color-default-text"],
    defaultContrastText: colorTokens["color-default-contrast-text"],
    headingText: colorTokens["color-heading-text"],
    formElement: colorTokens["color-form-element"],

    primary: colorTokens["color-primary"],
    primaryLight: colorTokens["color-primary-light"],
    primaryXLight: colorTokens["color-primary-x-light"],

    secondary: colorTokens["color-secondary"],
    secondaryLight: colorTokens["color-secondary-light"],

    border: colorTokens["color-border"],
    focus: colorTokens["color-focus"],

    success: colorTokens["color-success"],
    successLight: colorTokens["color-success-light"],
    successXLight: colorTokens["color-success-x-light"],
    warning: colorTokens["color-warning"],
    warningLight: colorTokens["color-warning-light"],
    warningXLight: colorTokens["color-warning-x-light"],
    error: colorTokens["color-error"],
    errorLight: colorTokens["color-error-light"],
    errorXLight: colorTokens["color-error-x-light"],
  },
};
const arbeidstilsynet: ThemeProps = {
  appName: "Arbeidstilsynet",
  logo: arbeidstilsynetLogo,

  colors: {
    bodyBackground: "#e7f9f7",
    defaultText: "#262626",
    headingText: "#323232",
    primaryText: "#D13C0A",
    primary: "#0D7168",
    primaryLight: "#4a958e" /*75%*/,
    primaryXLight: "#86b8b4" /*50%*/,
    primaryContrast: "#ffffff",
    secondary: "#a0e6df",
    secondaryLight: "#d0f3ef" /*50%*/,
    secondaryXLight: "#e7f9f7" /*25%*/,
    secondaryContrast: "#38514e",
    formElement: "#333",
    border: "#0D7168",
    focus: "#00C0B0",
    defaultBackground: "#EDEEF2",
    secondaryBackground: "#f6f7f9",
    success: "#13D646",
    successLight: "#c4f5d1",
    successXLight: "#e2fae8",
    warning: "#FFC414",
    warningLight: "#fff0c2",
    warningXLight: "#fff7e0",
    error: "#FF3116",
    errorLight: "#ffccc5",
    errorXLight: "#ffe5e2",
  },
};

const customThemes = {
  dibk,
  arbeidstilsynet,
};

export type CustomThemeName = keyof typeof customThemes;

const customThemeNameByAppName: Record<string, CustomThemeName> = {
  dibk: "dibk",
  arbeidstilsynet: "arbeidstilsynet",
};

export const getCustomThemeName = (
  appName?: string,
): CustomThemeName | undefined => {
  if (!appName) return undefined;

  return customThemeNameByAppName[appName.toLowerCase()];
};

export default customThemes;
