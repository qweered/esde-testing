import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'html',
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
      testMatch: /.*e2e\.test\.ts/,
    },
  ],
});
