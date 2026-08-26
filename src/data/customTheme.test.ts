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
const variablesReadByStylesheets = (): Set<string> => {
    const read = new Set<string>();
    for (const file of collectScssFiles(path.join(projectRoot, "src"))) {
        for (const match of readFileSync(file, "utf8").matchAll(/var\(\s*(--color-[a-z0-9-]+)/g)) read.add(match[1]);
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
