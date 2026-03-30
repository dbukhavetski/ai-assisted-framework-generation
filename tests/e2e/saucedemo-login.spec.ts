import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary authentication and cart flows for Sauce Demo.
 */
test.describe('Sauce Demo authentication', () => {
  test('logs in with a standard user and opens the inventory page', async ({ page, loginPage, inventoryPage, standardUser }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(standardUser.username, standardUser.password);

    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.expectLoaded();
    await inventoryPage.expectBackpackVisible();
  });

  test('adds the backpack to the cart after login', async ({ page, authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
    await authenticatedInventoryPage.header.openCart();

    await expect(page).toHaveURL(/.*cart.html/);
  });
});