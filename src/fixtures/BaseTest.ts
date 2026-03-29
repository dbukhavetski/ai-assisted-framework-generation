import type { Page, TestInfo } from '@playwright/test';

import { logger } from '../utils/logger';

type HookCallback = (args: { page: Page }, testInfo: TestInfo) => Promise<void>;

interface HookRegistrar {
  beforeEach(callback: HookCallback): void;
  afterEach(callback: HookCallback): void;
}

/**
 * Registers common setup and teardown hooks for the test suite.
 */
export abstract class BaseTest {
  /**
   * Attaches the standard hooks to a Playwright test instance.
   */
  public static registerHooks(testType: HookRegistrar): void {
    testType.beforeEach(async ({ page }, testInfo) => {
      await BaseTest.setup(page, testInfo);
    });

    testType.afterEach(async ({ page }, testInfo) => {
      await BaseTest.teardown(page, testInfo);
    });
  }

  /**
   * Performs pre-test setup steps.
   */
  public static async setup(page: Page, testInfo: TestInfo): Promise<void> {
    logger.info(`Starting test: ${testInfo.title}`);
    await page.setViewportSize({ width: 1440, height: 900 });
  }

  /**
   * Performs post-test teardown steps.
   */
  public static async teardown(page: Page, testInfo: TestInfo): Promise<void> {
    logger.info(`Finished test: ${testInfo.title} (${testInfo.status})`);

    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('failure-url', {
        body: Buffer.from(page.url(), 'utf-8'),
        contentType: 'text/plain',
      });
    }
  }
}