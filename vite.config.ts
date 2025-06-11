import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'DibkDesign',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
      },
      outDir: 'dist',
      sourcemap: true,
      emptyOutDir: true,
    },
    plugins: [
      react(),
      dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
    ],
  };
});
