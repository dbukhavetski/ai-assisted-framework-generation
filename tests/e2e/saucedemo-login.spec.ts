import { test, expect } from '../../src/fixtures/testFixtures';

const standardUser = 'standard_user';
const validPassword = 'secret_sauce';

/**
 * Covers the primary authentication and cart flows for Sauce Demo.
 */
test.describe('Sauce Demo authentication', () => {
  test('logs in with a standard user and opens the inventory page', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(standardUser, validPassword);

    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.expectLoaded();
    await inventoryPage.expectBackpackVisible();
  });

  test('adds the backpack to the cart after login', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(standardUser, validPassword);
    await inventoryPage.expectLoaded();
    await inventoryPage.addBackpackToCart();
    await inventoryPage.header.expectCartBadgeCount(1);
    await inventoryPage.header.openCart();

    await expect(page).toHaveURL(/.*cart.html/);
  });
});