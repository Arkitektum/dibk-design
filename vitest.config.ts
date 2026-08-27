import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";
import viteConfig from "./vite.config.ts";

// Markup-level tests, rendered with react-dom/server. Deliberately kept in its
// own config file rather than a project inside the Storybook one: importing
// @storybook/addon-vitest pulls in storybook -> oxc-parser, whose native binding
// is platform-specific, so a single shared config makes the fast suite
// unrunnable anywhere the Playwright/Storybook toolchain is not installed.
// Browser-level tests live in vitest.storybook.config.ts.
export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: { exportType: "default" } })],
  // Reused from the library config so CSS module class names in assertions
  // match what the build emits.
  css: viteConfig.css,
  resolve: viteConfig.resolve,
  test: {
    name: "unit",
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
