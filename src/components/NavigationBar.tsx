import type React from "react";
import customThemes, { type CustomThemeName } from "../data/customTheme";
import { classNameArrayToClassNameString } from "../functions/helpers";
import {
  getThemeAppName,
  getThemeLogo,
  getThemeLogoPadding,
} from "../functions/theme";
import style from "./NavigationBar.module.scss";

import type { ThemeProps } from "./Theme";

export interface ListItemObject {
  name: string;
  href: string;
  listItems?: ListItemObject[];
}

export interface NavigationBarProps {
  logoLink?: string;
  logoLinkTitle?: string;
  openLogoLinkInNewTab?: boolean;
  theme?: CustomThemeName;
  color?: "primary" | "secondary" | "neutral";
  children?: React.ReactNode;
}

const NavigationBar = ({
  logoLink = "",
  logoLinkTitle,
  openLogoLinkInNewTab,
  theme,
  color = "neutral",
}: NavigationBarProps) => {
  const resolvedTheme = theme ? customThemes[theme] : undefined;

  const getLogoThemeStyle = (theme?: ThemeProps) => ({
    padding: getThemeLogoPadding(theme),
  });

  const renderLogo = (link?: string, title?: string) => {
    const themeLogo = getThemeLogo(resolvedTheme);
    const themeAppName = getThemeAppName(resolvedTheme);

    const alt =
      link && title
        ? ""
        : themeLogo && themeAppName
          ? `${themeAppName} logo`
          : "DIBK logo";

    const logoElement = themeLogo ? (
      <img alt={alt} src={themeLogo} style={getLogoThemeStyle(resolvedTheme)} />
    ) : null;

    if (link?.length) {
      return (
        <a
          href={link}
          title={title}
          target={openLogoLinkInNewTab ? "_blank" : undefined}
          rel={openLogoLinkInNewTab ? "noopener noreferrer" : undefined}
        >
          {logoElement}
        </a>
      );
    }

    return logoElement;
  };

  return (
    <div
      className={classNameArrayToClassNameString([
        color && style[color],
        style.navigationBarContainer,
      ])}
    >
      <div className={classNameArrayToClassNameString([style.navigationBar])}>
        <div className={style.logoContainer}>
          {renderLogo(logoLink, logoLinkTitle)}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
