import { test } from '../../src/fixtures/testFixtures';

const cartScenarios = [
  {
    testName: 'opens the cart from the header and shows the added backpack',
    itemNames: ['Sauce Labs Backpack'],
  },
  {
    testName: 'shows multiple added items in the cart',
    itemNames: ['Sauce Labs Backpack', 'Sauce Labs Bike Light'],
  },
];

/**
 * Covers the primary cart entry and list verification flows for Sauce Demo.
 */
test.describe('Sauce Demo your cart', () => {
  for (const { testName, itemNames } of cartScenarios) {
    test(testName, async ({ authenticatedInventoryPage, yourCartPage }) => {
      await authenticatedInventoryPage.addItemsToCart(itemNames);
      await authenticatedInventoryPage.header.openCart();

      await yourCartPage.expectLoaded();
      await yourCartPage.verifyCartList(itemNames);
    });
  }
});