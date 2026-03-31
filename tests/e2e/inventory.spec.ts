import { test } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary inventory interaction flows for Sauce Demo.
 */
test.describe('Sauce Demo inventory', () => {
  test('orders items by price from low to high', async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.sortItemsByPriceLowToHigh();

    await authenticatedInventoryPage.expectItemsSortedByPriceLowToHigh();
  });
});