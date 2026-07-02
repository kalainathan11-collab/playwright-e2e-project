const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { loadData } = require('../utils/dataLoader');
const data = loadData();

test('end-to-end demo flow on SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  console.log('Step 1: Open SauceDemo login page');
  await loginPage.open();
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();

  console.log('Step 2: Login with valid credentials');
  await loginPage.login(data.login.username, data.login.password);

  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.pageTitle).toBeVisible();
  await expect(inventoryPage.inventoryList).toBeVisible();
  console.log('Step 3: Verify inventory page loaded');

  console.log('Step 4: Add first product to cart');
  await inventoryPage.addFirstProductToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  console.log('Step 5: Open cart');
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart/);
  await expect(cartPage.pageTitle).toBeVisible();
  await expect(cartPage.checkoutButton).toBeVisible();

  console.log('Step 6: Proceed to checkout');
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one/);
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

  console.log('Step 7: Fill checkout information');
  await checkoutPage.fillInfo(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

  console.log('Step 8: Finish order');
  await checkoutPage.finishOrder();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(checkoutPage.completeTitle).toBeVisible();
  console.log('Test completed successfully');
});
