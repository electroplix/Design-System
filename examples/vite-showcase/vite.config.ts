import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@electroplix/components': resolve(__dirname, '../../packages/components/src/index.ts'),
    },
  },
});
