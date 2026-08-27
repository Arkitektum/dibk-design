import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

// Runs every story in a real browser. Requires `npx playwright install chromium`
// and the Storybook toolchain; see vitest.config.ts for the fast Node suite.
export default mergeConfig(
  viteConfig,
  defineConfig({
    // Pre-bundled up front rather than discovered while the suite runs. react-router
    // is only reached through the preview decorator and a few stories, so Vite found
    // it mid-run, re-optimized and reloaded, which invalidates the ?v= hashes the
    // browser has already resolved and fails unrelated imports. Vitest warns about
    // exactly this and asks for the dependency to be listed here.
    optimizeDeps: {
      include: ["react-router"],
    },
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(import.meta.dirname, ".storybook"),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: "pnpm storybook --ci",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
);
