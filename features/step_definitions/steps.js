const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { loadData } = require('../../utils/dataLoader');

let browser, context, page;
let loginPage, inventoryPage, cartPage, checkoutPage;
const data = loadData();

// Increase default step timeout to 60s for slower environments
setDefaultTimeout(60 * 1000);

Before(async function () {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

Given('the user opens the SauceDemo login page', async function () {
  await loginPage.open();
});

When('the user logs in with valid credentials', async function () {
  await loginPage.login(data.login.username, data.login.password);
});

When('the user adds the first product to the cart', async function () {
  await inventoryPage.addFirstProductToCart();
});

When('the user opens the cart and proceeds to checkout', async function () {
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();
});

When('the user fills in the checkout information', async function () {
  await checkoutPage.fillInfo(data.checkout.firstName, data.checkout.lastName, data.checkout.postalCode);
});

Then('the order should be completed successfully', async function () {
  await checkoutPage.finishOrder();
  // simple assertion
  if (!(await checkoutPage.completeTitle.isVisible())) {
    throw new Error('Order not completed');
  }
});
