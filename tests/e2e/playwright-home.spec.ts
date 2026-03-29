import { test, expect } from '../../src/fixtures/testFixtures';

/**
 * Covers the primary navigation flow from the landing page.
 */
test.describe('Playwright home page', () => {
  test('opens the getting started guide from the hero section', async ({ page, homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.openGetStarted();

    await expect(page).toHaveURL(/.*docs\/intro/);
  });

  test('opens the docs page from the header navigation', async ({ page, homePage }) => {
    await homePage.open();
    await homePage.header.expectVisible();
    await homePage.header.openDocs();

    await expect(page).toHaveURL(/.*docs\//);
  });
});