import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: "[name]__[local]",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      // The package has "type": "module", so the CommonJS bundle must use the
      // .cjs extension — with .js it would be parsed as ESM and break require().
      fileName: (format) => (format === "es" ? "index.es.js" : "index.cjs"),
    },
    rollupOptions: {
      // Every package.json "dependencies" and "peerDependencies" entry belongs
      // here — anything missing gets bundled into dist/, so consumers install a
      // copy they never use and risk running two instances of it.
      external: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-router-dom",
        "react-select",
        /^react-select\//,
      ],
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { exportType: "default" } }),
    // Do not upgrade `typescript` past 6.x while this plugin is here. TS 7 is
    // the native compiler and ships no JavaScript Compiler API, so unplugin-dts
    // throws while this config file is being *loaded* — which breaks `build:lib`
    // and `storybook dev` alike, and the viteFinal strip in .storybook/main.ts
    // cannot help because the plugin has already been constructed by then.
    // (@typescript-eslint also has no TS 7 release, so `lint:eslint` breaks too.)
    dts({
      bundleTypes: true,
      include: ["src/**/*"],
      compilerOptions: { rootDir: "./src" },
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
