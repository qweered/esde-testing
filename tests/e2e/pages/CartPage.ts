import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyItemCount(count: number): Promise<void> {
    const items = this.page.locator('.cart_item');
    await expect(items, `Expected ${count} items in cart`).toHaveCount(count);
  }

  async verifyItemVisible(itemName: string): Promise<void> {
    await expect(
      this.page.locator(`.cart_item:has-text("${itemName}")`),
      `Item "${itemName}" should be visible in cart`
    ).toBeVisible();
  }

  async removeItem(itemName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/\s/g, '-')}"]`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
} 