import { test } from '../../src/fixtures/testFixtures';

const cartItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * Covers the primary cart list flow for Sauce Demo.
 */
test.describe('Sauce Demo your cart', () => {
  test.beforeEach(async ({ loginPage, standardUser }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(standardUser.username, standardUser.password);
  });

  test('adds items to the cart and verifies the cart list', async ({ inventoryPage, yourCartPage }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await yourCartPage.open();
    await yourCartPage.verifyCartList(cartItems);
  });
});