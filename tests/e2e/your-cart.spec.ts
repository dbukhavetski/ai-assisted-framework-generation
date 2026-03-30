import { test } from '../../src/fixtures/testFixtures';

const cartItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * Covers the primary cart list flow for Sauce Demo.
 */
test.describe('Sauce Demo your cart', () => {
  test('adds items to the cart and verifies the cart list', async ({ authenticatedInventoryPage, yourCartPage }) => {
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Bike Light');
    await yourCartPage.open();
    await yourCartPage.verifyCartList(cartItems);
  });
});