import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    const errorMessage = this.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(expectedMessage);
  }

  async verifyLoginFormVisible(): Promise<void> {
    await expect(this.page.locator('[data-test="username"]')).toBeVisible();
    await expect(this.page.locator('[data-test="password"]')).toBeVisible();
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }
} 