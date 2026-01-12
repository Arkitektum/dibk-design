import type { ThemeProps } from "../components/Theme";

export const getThemeLogo = (theme?: ThemeProps, compact?: boolean): string => {
  return compact ? (theme?.logoCompact ?? "") : (theme?.logo ?? "");
};

export const getThemeLogoPadding = (theme?: ThemeProps): string => {
  return theme?.logoPadding ?? "";
};

export const getThemeAppName = (theme?: ThemeProps): string => {
  return theme?.appName ?? "";
};
