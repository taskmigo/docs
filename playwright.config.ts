import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/prepare-pages-preview.mjs && npx serve .pages-preview --listen 4173 --no-clipboard',
    url: 'http://127.0.0.1:4173/docs/',
    reuseExistingServer: !process.env.CI,
  },
});
