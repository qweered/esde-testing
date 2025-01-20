import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async verifySummaryTotal(total: string): Promise<void> {
    await expect(
      this.page.locator('.summary_total_label'),
      `Order total should be ${total}`
    ).toHaveText(total);
  }

  async finishCheckout(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async verifyOrderComplete(): Promise<void> {
    await expect(
      this.page.locator('.complete-header'),
      'Order completion message should be visible'
    ).toHaveText('Thank you for your order!');
  }
} 