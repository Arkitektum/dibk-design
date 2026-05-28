import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            parser: tsParser,
            globals: { ...globals.browser, ...globals.node }
        },
        ignores: ["dist/", "docs/", "node_modules/", "**/vendor/*.js"],
        rules: {
            "sort-imports": [
                "error",
                {
                    allowSeparatedGroups: true
                }
            ]
        }
    },
    {
        files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"], // 👈 Only apply to test files
        languageOptions: {
            globals: {
                ...globals.jest // 👈 Add Jest globals like `describe`, `it`, `expect`
            }
        },
        rules: {
            // Optional: Jest-specific rules
            "no-undef": "off" // Jest defines globals, so we disable this warning
        }
    }
]);
