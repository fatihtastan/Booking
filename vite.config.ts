import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  },
  plugins: [
    react(),
    checker({
      enableBuild: true,
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/*/.{ts,tsx}"',
        dev: {
          logLevel: ['error', 'warning']
        }
      }
    })
  ]
});
