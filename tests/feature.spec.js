const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { loadData } = require('../utils/dataLoader');
const data = loadData();

test('feature-based SauceDemo checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  console.log('Given the user opens the SauceDemo login page');
  await loginPage.open();
  await expect(page).toHaveTitle(/Swag Labs/);

  console.log('When the user logs in with valid credentials');
  await loginPage.login(data.login.username, data.login.password);
  await expect(page).toHaveURL(/inventory/);

  console.log('And the user adds the first product to the cart');
  await inventoryPage.addFirstProductToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  console.log('And the user opens the cart and proceeds to checkout');
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one/);

  console.log('And the user fills in the checkout information');
  await checkoutPage.fillInfo(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);

  console.log('Then the order should be completed successfully');
  await checkoutPage.finishOrder();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(checkoutPage.completeTitle).toBeVisible();
});
