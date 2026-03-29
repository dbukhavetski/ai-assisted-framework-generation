import { test as base, expect } from '@playwright/test';

import { BaseTest } from './BaseTest';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { YourCartPage } from '../pages/YourCartPage';

interface SauceDemoUser {
  username: string;
  password: string;
}

type FrameworkFixtures = {
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  standardUser: SauceDemoUser;
  yourCartPage: YourCartPage;
};

const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  yourCartPage: async ({ page }, use) => {
    await use(new YourCartPage(page));
  },
  standardUser: async ({}, use) => {
    await use({
      username: 'standard_user',
      password: 'secret_sauce',
    });
  },
});

BaseTest.registerHooks(test);

export { test, expect };