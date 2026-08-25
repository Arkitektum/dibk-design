import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

// Biome is the primary linter, but its files.includes only covers
// src/**/*.{ts,tsx}. ESLint's job here is the rest of the repo — scripts/,
// .storybook/ and the *.config.ts files — plus js/recommended on top of Biome
// inside src.
export default defineConfig([
    // Global ignores must be a config object of their own. Combined with `files`
    // they only narrow that one block, which left the built bundle in dist/ being
    // linted — some 11k errors from minified code.
    {
        ignores: ["dist/", "docs/", "storybook-static/", "node_modules/", "**/vendor/*.js"]
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            parser: tsParser,
            globals: { ...globals.browser, ...globals.node }
        }
        // `sort-imports` is deliberately not enabled: Biome's organizeImports
        // assist already owns import ordering, and the two use different orders,
        // so enabling both makes every fix for one a violation of the other.
    },
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            // Base no-unused-vars reads a parameter name in a type annotation —
            // `accessor?: (item: T) => string` — as an unused binding, because the
            // TS parser is used without the @typescript-eslint plugin that would
            // replace this rule with a TS-aware one. tsconfig's noUnusedLocals
            // and noUnusedParameters already cover this properly.
            "no-unused-vars": "off"
        }
    }
]);
