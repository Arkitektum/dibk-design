import type React from "react";
import { useId, useState } from "react";
import logo from "../assets/svg/dibk-logo.svg?url";
import compactLogo from "../assets/svg/dibk-logo-mobile.svg?url";
import { classNameArrayToClassNameString } from "../functions/helpers";
import {
  getThemeAppName,
  getThemeLogo,
  getThemeLogoPadding,
} from "../functions/theme";
import style from "./NavigationBar.module.scss";
import NavigationBarListItem from "./NavigationBarListItem";
import type { ThemeProps } from "./Theme";

export interface ListItemObject {
  name: string;
  href: string;
  listItems?: ListItemObject[];
}

export interface NavigationBarProps {
  primaryListItems?: ListItemObject[];
  secondaryListItems?: ListItemObject[];
  menuContent?: React.ReactNode;
  logoLink?: string;
  logoLinkTitle?: string;
  openLogoLinkInNewTab?: boolean;
  theme?: ThemeProps;
  compact?: boolean;
  mainContentId?: string;
  color?: "primary" | "secondary" | "neutral";
  children?: React.ReactNode;
}

const NavigationBar = ({
  primaryListItems = [],
  secondaryListItems = [],
  menuContent,
  logoLink = "",
  logoLinkTitle,
  openLogoLinkInNewTab,
  theme,
  compact,
  mainContentId,
  color = "neutral",
  children,
}: NavigationBarProps) => {
  const [active, setActive] = useState(false);
  const toggleList = () => setActive(!active);
  const closeList = () => setActive(false);

  const getLogoThemeStyle = (theme?: ThemeProps) => ({
    padding: getThemeLogoPadding(theme),
  });

  const renderPrimaryList = (
    items: ListItemObject[] = primaryListItems,
    iteration = 0,
  ): React.ReactNode => {
    return items.length ? (
      <ul className={style.primaryList}>
        {items.map((item, i) => {
          const key = `${iteration}-${i}`;
          return item.listItems ? (
            <li key={key}>
              <span>{item.name}</span>
              {renderPrimaryList(item.listItems, iteration + 1)}
            </li>
          ) : (
            <NavigationBarListItem listItem={item} key={key} />
          );
        })}
      </ul>
    ) : null;
  };

  const renderSecondaryList = () => {
    return secondaryListItems.length ? (
      <ul className={style.secondaryList}>
        {secondaryListItems.map((item) => (
          <NavigationBarListItem listItem={item} key={item.name} />
        ))}
      </ul>
    ) : null;
  };

  const renderLogo = (link?: string, title?: string) => {
    const themeLogo = getThemeLogo(theme);
    const themeAppName = getThemeAppName(theme);

    const alt =
      link && title
        ? ""
        : themeLogo && themeAppName
          ? `${themeAppName} logo`
          : "DIBK logo";

    const logoElement = themeLogo ? (
      <img alt={alt} src={themeLogo} style={getLogoThemeStyle(theme)} />
    ) : (
      <img alt={alt} src={compact ? compactLogo : logo} />
    );

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

  const hasListItems =
    primaryListItems.length > 0 || secondaryListItems.length > 0;
  const hasMenu = hasListItems || Boolean(menuContent);
  const mainContentLinkId = useId();
  const mainContentLinkSpanId = useId();
  const dropdownId = useId();
  return (
    <div
      className={classNameArrayToClassNameString([
        compact && style.compact,
        color && style[color],
        style.navigationBarContainer,
      ])}
    >
      {mainContentId && (
        <a
          id={mainContentLinkId}
          href={`#${mainContentId}`}
          className={style.mainContentLink}
        >
          <span id={mainContentLinkSpanId}>Hopp til hovedinnhold</span>
        </a>
      )}

      <div
        className={classNameArrayToClassNameString([
          style.navigationBar,
        ])}
      >
        <div className={style.logoContainer}>
          {renderLogo(logoLink, logoLinkTitle)}
        </div>

        {children && <div className={style.childElements}>{children}</div>}

        {hasMenu && (
          <button
            type="button"
            className={`${style.menuToggle} ${active ? style.active : ""}`}
            onClick={toggleList}
            aria-expanded={active ? "true" : "false"}
            aria-controls={dropdownId}
          >
            {!compact && "Meny"}
            <span className={style.hamburgerIcon}>
              <span className={style.line}></span>
              <span className={style.line}></span>
              <span className={style.line}></span>
            </span>
          </button>
        )}
      </div>

      {hasMenu && (
        <div
          className={classNameArrayToClassNameString([
            style.dropdownContainer,
            active && style.active,
          ])}
          role="dialog"
          aria-modal="true"
          aria-label="Hovedmeny"
        >
          <div id={dropdownId} className={style.dropdown}>
            {menuContent ?? (
              <>
                {renderPrimaryList()}
                {renderSecondaryList()}
              </>
            )}
            {!compact && (
              <button
                type="button"
                className={style.closeOverlay}
                onClick={closeList}
                aria-label="Lukk meny"
              >
                <span className={style.closeText}>Lukk</span>
                <span aria-hidden="true" className={style.closeIcon}>
                  <span className={style.closeLine}></span>
                  <span className={style.closeLine}></span>
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
