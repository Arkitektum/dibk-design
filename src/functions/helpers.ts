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

export const getCssVariablesFromTheme = (theme?: ThemeProps): CSSVariables => {
    return {
        ...getCssColorVariablesFromTheme(theme),
        ...getCssSizeVariablesFromTheme(theme)
    };
};

export const addGlobalStylesheet = (styleElementId: string, styles: string): void => {
    if (typeof document === "undefined") return;

    const style = document.createElement("style");
    style.setAttribute("id", styleElementId);
    style.textContent = styles;

    const existing = document.getElementById(styleElementId);
    if (existing) existing.remove();

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
    const autoFocusElement = document.createElement("button");
    autoFocusElement.style.position = "absolute";
    autoFocusElement.style.opacity = "0";
    element.prepend(autoFocusElement);
    autoFocusElement.focus();
    autoFocusElement.remove();
};

export const getFocusableElementsInsideElement = (element: HTMLElement): HTMLElement[] => {
    const focusableSelectors = 'button, [href], input, [tabindex="0"]';
    return Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => !!el);
};

export const addFocusTrapInsideElement = (element: HTMLElement): void => {
    setFocusToElement(element);

    const focusableElements = getFocusableElementsInsideElement(element);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1] || first;

    if (first) {
        first.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Tab" && event.shiftKey) {
                event.preventDefault();
                last.focus();
            }
        };
    }

    if (last) {
        last.onclick = () => {
            first?.focus();
        };
        last.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Tab" && !event.shiftKey) {
                event.preventDefault();
                first?.focus();
            }
        };
    }
};
