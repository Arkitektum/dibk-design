import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
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
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      // The package has "type": "module", so the CommonJS bundle must use the
      // .cjs extension — with .js it would be parsed as ESM and break require().
      fileName: (format) => (format === "es" ? "index.es.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react/jsx-dev-runtime", "react-dom", "react-router-dom"],
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { exportType: "default" } }),
    dts({
      bundleTypes: true,
      include: ["src/**/*"],
      compilerOptions: { rootDir: "./src" },
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
