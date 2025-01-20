import type { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }
} 