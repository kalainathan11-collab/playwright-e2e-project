class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByText('Your Cart');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };