import { expect, type Page } from '@playwright/test';

import { HeaderComponent } from '../components/HeaderComponent';
import { BasePage } from './BasePage';

/**
 * Models the public Playwright landing page used by the sample tests.
 */
export class PlaywrightHomePage extends BasePage {
  public readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  /**
   * Opens the application home page.
   */
  public async open(): Promise<void> {
    await this.goto('/');
    await this.waitForPageReady();
  }

  /**
   * Verifies that the page hero call to action is visible.
   */
  public async expectLoaded(): Promise<void> {
    await expect(this.getStartedLink()).toBeVisible();
  }

  /**
   * Opens the getting started documentation from the hero area.
   */
  public async openGetStarted(): Promise<void> {
    await this.getStartedLink().click();
  }

  private getStartedLink() {
    return this.getByRole('link', { name: 'Get started' });
  }
}