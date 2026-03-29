import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Provides shared selector helpers and assertions for reusable UI components.
 */
export abstract class BaseComponent {
  protected constructor(
    protected readonly page: Page,
    protected readonly root: Locator,
  ) {}

  /**
   * Verifies that the component root is visible.
   */
  public async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  /**
   * Returns whether the component root is visible.
   */
  public async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  protected getByRole(role: Parameters<Locator['getByRole']>[0], options?: Parameters<Locator['getByRole']>[1]): Locator {
    return this.root.getByRole(role, options);
  }

  protected getByLabel(text: string | RegExp, options?: Parameters<Locator['getByLabel']>[1]): Locator {
    return this.root.getByLabel(text, options);
  }

  protected getByTestId(testId: string): Locator {
    return this.root.getByTestId(testId);
  }
}