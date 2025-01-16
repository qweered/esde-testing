/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'tests/**/*.vitest.test.ts', 
      'tests/unit/**/*.ts'
    ],
    exclude: [
      'tests/e2e/**/*',
      'tests/**/*.playwright.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      extension: ['.ts'],
      exclude: [
        'node_modules/**',
        'coverage/**',
        '.github/**',
      ],
      include: [
        'src/**/*.ts'
      ],
      reportsDirectory: './coverage'
    }
  }
}) 