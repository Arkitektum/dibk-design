import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export interface RenderResult {
    html: string;
    /** Anything React logged while rendering — development warnings included. */
    warnings: string[];
}

/**
 * Renders to static markup and captures React's console output, so a test can
 * assert on the markup and on the absence of warnings in one pass.
 */
export const renderHtml = (element: ReactElement): RenderResult => {
    const warnings: string[] = [];
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
    console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

    try {
        return { html: renderToStaticMarkup(element), warnings };
    } finally {
        console.error = originalError;
        console.warn = originalWarn;
    }
};

/** All `<tag ...>` opening tags in document order. */
export const openingTags = (html: string, tag: string): string[] => {
    return [...html.matchAll(new RegExp(`<${tag}[^>]*>`, "g"))].map((match) => match[0]);
};

// Attribute matching is case-insensitive because HTML attribute names are, and
// React does not lower-case every prop it passes through (readOnly, for one).

/** Value of `attribute` on the first `tag`, or null when absent. */
export const attribute = (html: string, tag: string, name: string): string | null => {
    const opening = openingTags(html, tag)[0];
    if (!opening) return null;
    return opening.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] ?? null;
};

/** Whether a boolean attribute is present on the first `tag`. */
export const hasAttribute = (html: string, tag: string, name: string): boolean => {
    const opening = openingTags(html, tag)[0];
    return opening ? new RegExp(`\\s${name}(=|\\s|>|/)`, "i").test(opening) : false;
};

/** Text content of every `<td>`, in document order. */
export const cellText = (html: string): string[] => {
    return [...html.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => match[1].replace(/<[^>]*>/g, "").trim());
};
