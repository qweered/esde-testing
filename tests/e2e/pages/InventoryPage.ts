import { type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyAppLogo(): Promise<void> {
    await expect(this.page.locator('.app_logo'), 'App logo should be visible').toHaveText('Swag Labs');
  }

  async addToCart(itemName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/\s/g, '-')}"]`).click();
  }

  async verifyCartBadge(count: string): Promise<void> {
    await expect(
      this.page.locator('.shopping_cart_badge'),
      `Cart badge should show ${count} items`
    ).toHaveText(count);
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async openMenu(): Promise<void> {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout(): Promise<void> {
    await this.page.locator('#logout_sidebar_link').click();
  }

  async verifyBurgerMenuVisible(): Promise<void> {
    await expect(this.page.locator('.bm-menu-wrap'), 'Burger menu should be visible').toBeVisible();
  }

  async verifyCartBadgeNotVisible(): Promise<void> {
    await expect(this.page.locator('.shopping_cart_badge'), 'Cart badge should not be visible').not.toBeVisible();
  }
} 