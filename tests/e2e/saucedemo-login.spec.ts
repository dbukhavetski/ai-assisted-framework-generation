import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary authentication flow for Sauce Demo.
 */
test.describe('Sauce Demo authentication', () => {
  test('opens login, submits valid credentials, and shows inventory items', async ({ page, loginPage, inventoryPage, standardUser }) => {
    await loginPage.open();
    await loginPage.expectLoaded();

    await loginPage.loginForm.enterUsername(standardUser.username);
    await loginPage.loginForm.enterPassword(standardUser.password);
    await loginPage.loginForm.submit();

    await expect(page).toHaveURL(/.*inventory.html/);
    await inventoryPage.expectLoaded();
    await inventoryPage.expectItemVisible('Sauce Labs Backpack');
  });

  test('shows an error message for invalid credentials', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoaded();

    await loginPage.loginForm.enterUsername('locked_out_user');
    await loginPage.loginForm.enterPassword('invalid_password');
    await loginPage.loginForm.submit();

    await expect(page).toHaveURL(/.*saucedemo.com\/?$/);
    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('Username and password do not match');
  });
});