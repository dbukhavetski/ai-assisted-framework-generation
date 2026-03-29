import { test as base, expect } from '@playwright/test';

import { BaseTest } from './BaseTest';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';

type FrameworkFixtures = {
  homePage: PlaywrightHomePage;
};

const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new PlaywrightHomePage(page));
  },
});

BaseTest.registerHooks(test);

export { test, expect };