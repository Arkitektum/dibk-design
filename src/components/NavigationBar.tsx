// Dependencies
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

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
    /** Left empty for an item that only groups the items below it. */
    href: string;
    /**
     * Items below this one. A top-level item with children gets a button that
     * discloses them; deeper levels are listed inside that panel.
     */
    listItems?: ListItemObject[];
}

const itemKey = (item: ListItemObject) => `${item.name}-${item.href}`;

/**
 * Levels below the first are a nested list inside the open panel rather than a
 * flyout of their own: a second popup layer needs collision handling and hover
 * intent to be usable, and the panel has room to show the group inline.
 */
const SubmenuItems = ({ items }: { items: ListItemObject[] }) => (
    <>
        {items.map((item) => (
            <li key={itemKey(item)}>
                {item.href.length ? <a href={item.href}>{item.name}</a> : <span className={style.submenuGroupName}>{item.name}</span>}
                {item.listItems?.length ? (
                    <ul className={style.submenuGroup}>
                        <SubmenuItems items={item.listItems} />
                    </ul>
                ) : null}
            </li>
        ))}
    </>
);

const DisclosureItem = ({
    item,
    isOpen,
    onToggle,
    onClose,
    getSubmenuToggleLabel
}: {
    item: ListItemObject;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    getSubmenuToggleLabel: (name: string) => string;
}) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const submenuId = useId();
    const hasOwnLink = item.href.length > 0;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
        if (event.key !== "Escape" || !isOpen) return;

        onClose();
        // Focus is inside the panel that is about to disappear, so it has to be
        // put back on the control that opened it.
        triggerRef.current?.focus();
    };

    // Tabbing past the last link in the panel closes it. Without this the panel
    // stays open behind the reader while focus carries on down the page.
    const handleBlur = (event: React.FocusEvent<HTMLLIElement>) => {
        if (!isOpen) return;
        if (event.currentTarget.contains(event.relatedTarget)) return;

        onClose();
    };

    return (
        <li className={style.submenuContainer} onKeyDown={handleKeyDown} onBlur={handleBlur}>
            {/* The item keeps its own link and gets a separate button for the
                submenu, so a supplied href is honoured rather than swallowed by
                the toggle. With no href the button is the item itself. */}
            {hasOwnLink ? <a href={item.href}>{item.name}</a> : null}
            <button
                type="button"
                ref={triggerRef}
                className={classNameArrayToClassNameString([style.submenuTrigger, isOpen && style.submenuTriggerOpen])}
                // Labelled only when a link beside it already says the name —
                // otherwise the button's own text is the name, and an aria-label
                // would just repeat it.
                aria-label={hasOwnLink ? getSubmenuToggleLabel(item.name) : undefined}
                aria-expanded={isOpen}
                aria-controls={submenuId}
                onClick={onToggle}
            >
                {hasOwnLink ? null : item.name}
                <span className={style.submenuChevron} aria-hidden="true" />
            </button>
            <ul id={submenuId} className={classNameArrayToClassNameString([style.submenu, isOpen && style.submenuOpen])}>
                <SubmenuItems items={item.listItems ?? []} />
            </ul>
        </li>
    );
};

export interface NavigationBarProps {
    logoLink?: string;
    logoLinkTitle?: string;
    openLogoLinkInNewTab?: boolean;
    themeId?: CustomThemeName;
    links?: ListItemObject[];
    /**
     * Id of the element holding the page's main content, without the `#`.
     * Renders a skip link as the first focusable thing on the page, letting
     * keyboard and screen reader users bypass the navigation — WCAG 2.4.1.
     * Nothing is rendered without it, so the id has to exist in your page.
     */
    mainContentId?: string;
    /** Visible text of the skip link. */
    mainContentLinkText?: string;
    /**
     * Accessible name of the button that opens an item's submenu, for items
     * that also have a link of their own. Defaults to Norwegian.
     */
    getSubmenuToggleLabel?: (name: string) => string;
    children?: React.ReactNode;
}

const NavigationBar = ({
    logoLink = "https://www.dibk.no/",
    logoLinkTitle = "DIBK logo",
    openLogoLinkInNewTab = true,
    themeId,
    links = [],
    mainContentId,
    mainContentLinkText = "Hopp til hovedinnhold",
    getSubmenuToggleLabel = (name) => `Vis undermeny for ${name}`,
    children
}: NavigationBarProps) => {
    const resolvedTheme = themeId ? customThemes[themeId] : undefined;

    // One key at a time, so opening a submenu closes the one already open.
    const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
    const linksListRef = useRef<HTMLUListElement>(null);

    // A click anywhere outside the list dismisses the open panel. Bound only
    // while one is open, and on pointerdown so it fires before the click lands
    // on whatever is underneath.
    useEffect(() => {
        if (!openSubmenuKey) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (linksListRef.current?.contains(event.target as Node)) return;
            setOpenSubmenuKey(null);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [openSubmenuKey]);

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
        <div className={style.navigationBarContainer}>
            {/* First in the DOM so it is first in the tab order, which is the
                whole point of a skip link. */}
            {mainContentId?.length ? (
                <a id="main-content-link" href={`#${mainContentId}`} className={style.mainContentLink}>
                    <span id="main-content-link-text">{mainContentLinkText}</span>
                </a>
            ) : null}
            <div className={classNameArrayToClassNameString([style.navigationBar])}>
                <div className={style.logoContainer}>{renderLogo(logoLink, logoLinkTitle)}</div>
                <div className={style.linksContainer}>
                    {links.length > 0 ? (
                        <ul ref={linksListRef} className={style.linksList}>
                            {links.map((link) => {
                                const key = itemKey(link);

                                return link.listItems?.length ? (
                                    <DisclosureItem
                                        key={key}
                                        item={link}
                                        isOpen={openSubmenuKey === key}
                                        onToggle={() => setOpenSubmenuKey(openSubmenuKey === key ? null : key)}
                                        onClose={() => setOpenSubmenuKey(null)}
                                        getSubmenuToggleLabel={getSubmenuToggleLabel}
                                    />
                                ) : (
                                    <li key={key}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
