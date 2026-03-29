import { test as base, expect } from '@playwright/test';

import { BaseTest } from './BaseTest';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

type FrameworkFixtures = {
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

BaseTest.registerHooks(test);

export { test, expect };