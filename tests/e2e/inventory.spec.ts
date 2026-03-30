import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary inventory interaction flow for Sauce Demo.
 */
test.describe('Sauce Demo inventory', () => {
  test('adds the backpack to the cart after login', async ({ page, authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
    await authenticatedInventoryPage.header.openCart();

    await expect(page).toHaveURL(/.*cart.html/);
  });
});