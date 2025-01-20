import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

// Test Data
const USER = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  INVALID: {
    username: 'standard_user_123',
    password: 'secret_sauce_123'
  }
};

const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light'
};

const CHECKOUT = {
  CUSTOMER: {
    firstName: 'John',
    lastName: 'Dou',
    postalCode: '12345'
  },
  TOTALS: {
    singleItem: 'Total: $32.39',
    multipleItems: 'Total: $43.18'
  }
};

test.describe('Sauce Demo Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
  });

  test('Verify User Login', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.verifyAppLogo();
  });

  test('Verify Adding Item to Cart', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.addToCart(PRODUCTS.BACKPACK);
    await inventoryPage.verifyCartBadge('1');
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemVisible(PRODUCTS.BACKPACK);
  });

  test('Verify Adding Multiple Items to Cart', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.addToCart(PRODUCTS.BACKPACK);
    await inventoryPage.verifyCartBadge('1');
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT);
    await inventoryPage.verifyCartBadge('2');
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemVisible(PRODUCTS.BACKPACK);
    await cartPage.verifyItemVisible(PRODUCTS.BIKE_LIGHT);
  });

  test('Verify Removing Item from Cart', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.addToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemVisible(PRODUCTS.BACKPACK);
    await cartPage.removeItem(PRODUCTS.BACKPACK);
    await cartPage.verifyItemCount(0);
    await inventoryPage.verifyCartBadgeNotVisible();
  });

  test('Verify Checkout Process', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.addToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();
    await cartPage.verifyItemVisible(PRODUCTS.BACKPACK);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo(
      CHECKOUT.CUSTOMER.firstName,
      CHECKOUT.CUSTOMER.lastName,
      CHECKOUT.CUSTOMER.postalCode
    );
    await checkoutPage.verifySummaryTotal(CHECKOUT.TOTALS.singleItem);
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
  });

  test('Verify Checkout Process for multiple items', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.addToCart(PRODUCTS.BACKPACK);
    await inventoryPage.verifyCartBadge('1');
    await inventoryPage.addToCart(PRODUCTS.BIKE_LIGHT);
    await inventoryPage.verifyCartBadge('2');
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemVisible(PRODUCTS.BACKPACK);
    await cartPage.verifyItemVisible(PRODUCTS.BIKE_LIGHT);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo(
      CHECKOUT.CUSTOMER.firstName,
      CHECKOUT.CUSTOMER.lastName,
      CHECKOUT.CUSTOMER.postalCode
    );
    await checkoutPage.verifySummaryTotal(CHECKOUT.TOTALS.multipleItems);
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
  });

  test('Verify Non-Existing User Is not Able to Login', async () => {
    await loginPage.login(USER.INVALID.username, USER.INVALID.password);
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Verify User is able to logout', async () => {
    await loginPage.login(USER.STANDARD.username, USER.STANDARD.password);
    await inventoryPage.openMenu();
    await inventoryPage.verifyBurgerMenuVisible();
    await inventoryPage.logout();
    await loginPage.verifyLoginFormVisible();
  });
}); 