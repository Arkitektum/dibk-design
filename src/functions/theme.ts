import type { ThemeProps } from "../components/Theme";

export const getThemeLogo = (theme?: ThemeProps): string => {
  return theme?.logo ?? "";
};

export const getThemeLogoPadding = (theme?: ThemeProps): string => {
  return theme?.logoPadding ?? "";
};

export const getThemeAppName = (theme?: ThemeProps): string => {
  return theme?.appName ?? "";
};
