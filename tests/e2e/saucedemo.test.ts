import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { UserBuilder, CustomerBuilder, ProductBuilder } from '../shared/builders/TestDataBuilder';

test.describe('Sauce Demo Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  const standardUser = UserBuilder.standard().build();
  const invalidUser = UserBuilder.invalid().build();
  const customer = CustomerBuilder.default().build();
  const products = ProductBuilder.getProducts();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
  });

  test('Verify User Login', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.verifyAppLogo();
  });

  test('Verify Adding Item to Cart', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.addToCart(products.BACKPACK);
    await inventoryPage.verifyCartBadge('1');
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemVisible(products.BACKPACK);
  });

  test('Verify Adding Multiple Items to Cart', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.addToCart(products.BACKPACK);
    await inventoryPage.verifyCartBadge('1');
    await inventoryPage.addToCart(products.BIKE_LIGHT);
    await inventoryPage.verifyCartBadge('2');
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemVisible(products.BACKPACK);
    await cartPage.verifyItemVisible(products.BIKE_LIGHT);
  });

  test('Verify Removing Item from Cart', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.addToCart(products.BACKPACK);
    await inventoryPage.openCart();
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemVisible(products.BACKPACK);
    await cartPage.removeItem(products.BACKPACK);
    await cartPage.verifyItemCount(0);
    await inventoryPage.verifyCartBadgeNotVisible();
  });

  test('Verify Checkout Process', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.addToCart(products.BACKPACK);
    await inventoryPage.openCart();
    await cartPage.verifyItemVisible(products.BACKPACK);
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    await checkoutPage.verifySummaryTotal('Total: $32.39');
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
  });

  test('Verify Non-Existing User Is not Able to Login', async () => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Verify User is able to logout', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.openMenu();
    await inventoryPage.verifyBurgerMenuVisible();
    await inventoryPage.logout();
    await loginPage.verifyLoginFormVisible();
  });
}); 