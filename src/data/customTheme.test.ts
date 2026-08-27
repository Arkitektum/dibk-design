import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import customThemes from "./customTheme";
import { getCssVariablesFromTheme } from "../functions/helpers";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

const collectScssFiles = (dir: string, found: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) collectScssFiles(full, found);
        else if (full.endsWith(".scss")) found.push(full);
    }
    return found;
};

// Variables actually read through var(), not ones a stylesheet happens to define.
const variablesReadByStylesheets = (prefix = "--color-"): Set<string> => {
    const read = new Set<string>();
    const pattern = new RegExp(`var\\(\\s*(${prefix}[a-z0-9-]+)`, "g");
    for (const file of collectScssFiles(path.join(projectRoot, "src"))) {
        for (const match of readFileSync(file, "utf8").matchAll(pattern)) read.add(match[1]);
    }
    return read;
};

describe("custom themes", () => {
    // Regression: the Arbeidstilsynet theme spelled these defaultBackground and
    // secondaryBackground, emitting variables no stylesheet reads, so its
    // backgrounds silently fell through to the DiBK defaults.
    it("emits the background variables the stylesheets read", () => {
        const variables = getCssVariablesFromTheme(undefined, customThemes.arbeidstilsynet);

        expect(variables["--color-background-default"]).toBe("#EDEEF2");
        expect(variables["--color-background-secondary"]).toBe("#f6f7f9");
    });

    it("emits a contrast text colour for the Arbeidstilsynet theme", () => {
        const variables = getCssVariablesFromTheme(undefined, customThemes.arbeidstilsynet);

        expect(variables["--color-default-contrast-text"]).toBe("#ffffff");
    });

    it("emits the background variables for the DiBK theme", () => {
        const variables = getCssVariablesFromTheme(undefined, customThemes.dibk);

        expect(variables["--color-background-default"]).toBeTruthy();
        expect(variables["--color-background-secondary"]).toBeTruthy();
    });

    it.each(["dibk", "arbeidstilsynet"] as const)("maps every %s colour to a variable the stylesheets read", (themeName) => {
        const read = variablesReadByStylesheets();
        const variables = getCssVariablesFromTheme(undefined, customThemes[themeName]);

        // Known exceptions: tokens defined for completeness but not consumed yet.
        const allowedUnused = new Set(["--color-info-light", "--color-primary-text", "--color-secondary-contrast"]);
        const unused = Object.keys(variables).filter((name) => !read.has(name) && !allowedUnused.has(name));

        expect(unused).toEqual([]);
    });
});

// Regression: a theme's `sizes` were emitted as --size-* custom properties that
// no stylesheet read, so the option set the properties and changed nothing. The
// colour equivalent of this test existed and would have caught it, but it only
// ever looked at --color-*.
describe("theme sizes", () => {
    it("emits a variable for each size, kebab-cased", () => {
        const variables = getCssVariablesFromTheme({ appName: "test", logo: "", sizes: { contentWidth: "1200px" } });

        expect(variables["--size-content-width"]).toBe("1200px");
    });

    it("maps every emitted size variable to one the stylesheets read", () => {
        const read = variablesReadByStylesheets("--size-");
        const variables = getCssVariablesFromTheme({ appName: "test", logo: "", sizes: { contentWidth: "1200px" } });

        const unused = Object.keys(variables).filter((name) => !read.has(name));

        expect(unused).toEqual([]);
    });
});
