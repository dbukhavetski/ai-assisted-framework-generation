import { test } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary inventory interaction flows for Sauce Demo.
 */
test.describe('Sauce Demo inventory', () => {
  test('adds the backpack to the cart after login', async ({ authenticatedInventoryPage, yourCartPage }) => {
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
    await authenticatedInventoryPage.header.openCart();

    await yourCartPage.expectLoaded();
    await yourCartPage.verifyCartList(['Sauce Labs Backpack']);
  });

  test('orders items by price from low to high', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.sortItemsByPriceLowToHigh();

    await authenticatedInventoryPage.expectItemsSortedByPriceLowToHigh();
  });
});