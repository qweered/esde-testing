import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['html'],
    ['list']
  ],
  workers: 4,
  fullyParallel: true,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /.*\.playwright\.test\.ts/,
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
    {
      name: 'e2e',
      testMatch: /.*saucedemo\.test\.ts/,
      use: {
        baseURL: 'https://www.saucedemo.com',
      },
    },
  ],
});
