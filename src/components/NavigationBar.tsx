// Dependencies
import type React from "react";

// Components
import type { ThemeProps } from "./Theme";

// Helpers
import { getThemeAppName, getThemeLogo, getThemeLogoPadding } from "../functions/theme";
import { classNameArrayToClassNameString } from "../functions/helpers";

// Data
import customThemes, { type CustomThemeName } from "../data/customTheme";

// Stylesheets
import style from "./NavigationBar.module.scss";

export interface ListItemObject {
    name: string;
    href: string;
    listItems?: ListItemObject[];
}

export interface NavigationBarProps {
    logoLink?: string;
    logoLinkTitle?: string;
    openLogoLinkInNewTab?: boolean;
    themeId?: CustomThemeName;
    color?: "secondary" | "neutral";
    links?: ListItemObject[];
    children?: React.ReactNode;
}

const NavigationBar = ({
    logoLink = "https://www.dibk.no/",
    logoLinkTitle = "DIBK logo",
    openLogoLinkInNewTab = true,
    themeId,
    color = "neutral",
    links = [],
    children
}: NavigationBarProps) => {
    const resolvedTheme = themeId ? customThemes[themeId] : undefined;

    const getLogoThemeStyle = (theme?: ThemeProps) => ({
        padding: getThemeLogoPadding(theme),
        height: "47px"
    });

    const renderLogo = (link?: string, title?: string) => {
        const themeLogo = getThemeLogo(resolvedTheme);
        const themeAppName = getThemeAppName(resolvedTheme);

        // Without a themeId there is no logo. Rendering the element anyway gives
        // it src="", which makes the browser re-request the current page, and an
        // empty link has no accessible name.
        if (!themeLogo.length) return null;

        const alt = link && title ? "" : themeAppName ? `${themeAppName} logo` : "DIBK logo";

        const logoElement = <img alt={alt} src={themeLogo} style={getLogoThemeStyle(resolvedTheme)} />;

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
        <div className={classNameArrayToClassNameString([color && style[color], style.navigationBarContainer])}>
            <div className={classNameArrayToClassNameString([style.navigationBar])}>
                <div className={style.logoContainer}>{renderLogo(logoLink, logoLinkTitle)}</div>
                <div className={style.linksContainer}>
                    {links.length > 0 ? (
                        <ul className={style.linksList}>
                            {links.map((link) => (
                                <li key={`${link.name}-${link.href}`}>
                                    <a href={link.href}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
