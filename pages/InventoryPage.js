class InventoryPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.pageTitle = page.getByText('Products');
    this.inventoryList = page.locator('.inventory_list');
  }

  async addFirstProductToCart() {
    await this.products.first().locator('button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };