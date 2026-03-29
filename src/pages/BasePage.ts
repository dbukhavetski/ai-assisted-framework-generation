import type { Locator, Page } from '@playwright/test';

/**
 * Provides shared page-level actions and selector helpers for all pages.
 */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /**
   * Navigates to the supplied application path.
   */
  public async goto(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Waits until the page reaches a stable loaded state.
   */
  public async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns the current page URL.
   */
  public getCurrentUrl(): string {
    return this.page.url();
  }

  protected getByRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role, options);
  }

  protected getByLabel(text: string | RegExp, options?: Parameters<Page['getByLabel']>[1]): Locator {
    return this.page.getByLabel(text, options);
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}