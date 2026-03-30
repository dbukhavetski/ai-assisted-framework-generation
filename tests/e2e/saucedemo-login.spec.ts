import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary authentication flow for Sauce Demo.
 */
test.describe('Sauce Demo authentication', () => {
  test('logs in with a standard user and opens the inventory page', async ({ page, loginPage, inventoryPage, standardUser }) => {
    await loginPage.open();
    await loginPage.expectLoaded();
    await loginPage.login(standardUser.username, standardUser.password);

    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.expectLoaded();
    await inventoryPage.expectItemVisible('Sauce Labs Backpack');
  });
});