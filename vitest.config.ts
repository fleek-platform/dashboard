import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
