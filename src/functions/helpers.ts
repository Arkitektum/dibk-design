// helpers.ts
import { Children, Fragment, type ReactElement, type ReactNode, cloneElement, isValidElement } from "react";
import type { ThemeProps } from "../components/Theme";

type CSSVariables = Record<string, string>;

export const classNameArrayToClassNameString = (classNameArray: (string | undefined | null | false)[]): string => {
    return classNameArray?.filter(Boolean).join(" ") || "";
};

export const camelCaseToKebabCase = (input: string): string => {
    return input.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const getCssColorVariablesFromTheme = (theme?: ThemeProps): CSSVariables => {
    if (!theme?.colors || !Object.entries(theme.colors).length) return {};

    return Object.entries(theme.colors).reduce<CSSVariables>((acc, [key, value]) => {
        if (key && value) {
            acc[`--color-${camelCaseToKebabCase(key)}`] = value;
        }
        return acc;
    }, {});
};

export const getCssSizeVariablesFromTheme = (theme?: ThemeProps): CSSVariables => {
    if (!theme?.sizes || !Object.entries(theme.sizes).length) return {};

    return Object.entries(theme.sizes).reduce<CSSVariables>((acc, [key, value]) => {
        if (key && value) {
            acc[`--size-${camelCaseToKebabCase(key)}`] = value;
        }
        return acc;
    }, {});
};

export const getCssVariablesFromTheme = (theme?: ThemeProps, customThemeColors?: ThemeProps): CSSVariables => {
    return {
        ...getCssColorVariablesFromTheme(customThemeColors),
        ...getCssSizeVariablesFromTheme(theme)
    };
};

export const addGlobalStylesheet = (styleElementId: string, styles: string): void => {
    if (typeof document === "undefined") return;

    const existing = document.getElementById(styleElementId);
    if (existing) {
        // Update in place — replacing the element would force the browser to
        // re-parse and re-apply the whole stylesheet on every call.
        if (existing.textContent !== styles) existing.textContent = styles;
        return;
    }

    const style = document.createElement("style");
    style.setAttribute("id", styleElementId);
    style.textContent = styles;
    document.head.appendChild(style);
};

export const stringifyCssColorVariables = (colorVariables: CSSVariables): string => {
    return Object.entries(colorVariables)
        .map(([key, value]) => `${key}: ${value};`)
        .join("");
};

export const cloneThroughFragments = (children: ReactNode): ReactNode[] => {
    const result: ReactNode[] = [];

    Children.forEach(children, (child) => {
        if (isValidElement(child)) {
            // biome-ignore lint/suspicious/noExplicitAny: <any allowed>
            const element = child as ReactElement<any>;

            if (element.type === Fragment) {
                const nested = cloneThroughFragments(element.props.children);
                result.push(...nested);
            } else {
                result.push(cloneElement(element, { ...element.props }));
            }
        } else {
            result.push(child);
        }
    });

    return result;
};

export const setFocusToElement = (element: HTMLElement): void => {
    if (typeof document === "undefined") return;

    const autoFocusTarget = element.querySelector<HTMLElement>("[autofocus]");
    if (autoFocusTarget) {
        autoFocusTarget.focus();
        return;
    }

    // Focus the container itself rather than its first control, so assistive
    // technology announces the whole region instead of just a button. Needs a
    // tabindex to be programmatically focusable.
    if (!element.hasAttribute("tabindex")) {
        element.setAttribute("tabindex", "-1");
    }
    element.focus();
};

const focusableSelector = [
    "a[href]",
    "area[href]",
    "button",
    "input",
    "select",
    "textarea",
    "audio[controls]",
    "video[controls]",
    "iframe",
    '[contenteditable]:not([contenteditable="false"])',
    "[tabindex]"
].join(", ");

export const getFocusableElementsInsideElement = (element: HTMLElement): HTMLElement[] => {
    return Array.from(element.querySelectorAll<HTMLElement>(focusableSelector)).filter((candidate) => {
        if (candidate.hasAttribute("disabled") || candidate.getAttribute("aria-hidden") === "true") return false;
        if (Number(candidate.getAttribute("tabindex")) < 0) return false;
        // Cheap visibility test that, unlike offsetParent, also works for
        // position: fixed subtrees such as a dialog.
        return candidate.getClientRects().length > 0;
    });
};

export const addFocusTrapInsideElement = (element: HTMLElement): (() => void) => {
    if (typeof document === "undefined") return () => {};

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    setFocusToElement(element);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        // Recomputed per keypress — the contents can change while open, so a
        // list captured up front goes stale.
        const focusableElements = getFocusableElementsInsideElement(element);
        if (!focusableElements.length) {
            event.preventDefault();
            return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const active = document.activeElement;

        if (event.shiftKey) {
            // The container is focusable too, and tabbing back off it would
            // otherwise leave the trap.
            if (active === first || active === element) {
                event.preventDefault();
                last.focus();
            }
            return;
        }

        if (active === last) {
            event.preventDefault();
            first.focus();
        }
    };

    element.addEventListener("keydown", handleKeyDown);

    return () => {
        element.removeEventListener("keydown", handleKeyDown);
        // Hand focus back to whatever opened the region, rather than dropping it
        // to <body>.
        if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
};
