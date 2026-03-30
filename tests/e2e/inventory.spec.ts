import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary inventory interaction flows for Sauce Demo.
 */
test.describe('Sauce Demo inventory', () => {
  test('adds the backpack to the cart after login', async ({ page, authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
    await authenticatedInventoryPage.header.openCart();

    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('orders items by price from low to high', async ({ page, authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.expectLoaded();
    await expect(page).toHaveURL(/.*inventory.html/);

    await authenticatedInventoryPage.sortItemsByPriceLowToHigh();

    await authenticatedInventoryPage.expectFirstItemToBeCheapest();
  });
});