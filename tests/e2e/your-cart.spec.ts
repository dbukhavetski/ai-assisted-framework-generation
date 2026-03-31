import { test } from '../../src/fixtures/testFixtures';

const singleCartItem = ['Sauce Labs Backpack'];
const multipleCartItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * Covers the primary cart entry and list verification flows for Sauce Demo.
 */
test.describe('Sauce Demo your cart', () => {
  test('opens the cart from the header and shows the added backpack', async ({ authenticatedInventoryPage, yourCartPage }) => {
    await authenticatedInventoryPage.addItemToCart(singleCartItem[0]);
    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
    await authenticatedInventoryPage.header.openCart();

    await yourCartPage.expectLoaded();
    await yourCartPage.verifyCartList(singleCartItem);
  });

  test('shows multiple added items in the cart', async ({ authenticatedInventoryPage, yourCartPage }) => {
    for (const [index, itemName] of multipleCartItems.entries()) {
      await authenticatedInventoryPage.addItemToCart(itemName);
      await authenticatedInventoryPage.header.expectCartBadgeCount(index + 1);
    }

    await authenticatedInventoryPage.header.openCart();
    await yourCartPage.expectLoaded();
    await yourCartPage.verifyCartList(multipleCartItems);
  });
});