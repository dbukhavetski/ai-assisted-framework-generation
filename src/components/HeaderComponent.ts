import type { Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';

/**
 * Models the primary site header navigation.
 */
export class HeaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('navigation'));
  }

  /**
   * Opens the Docs section from the header.
   */
  public async openDocs(): Promise<void> {
    await this.getDocsLink().click();
  }

  /**
   * Opens the API section from the header.
   */
  public async openApi(): Promise<void> {
    await this.getApiLink().click();
  }

  private getDocsLink() {
    return this.getByRole('link', { name: 'Docs' });
  }

  private getApiLink() {
    return this.getByRole('link', { name: 'API' });
  }
}