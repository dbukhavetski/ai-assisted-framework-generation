import { expect, type Page } from '@playwright/test';

import { BasePage } from './BasePage';

/**
 * Models the Sauce Demo checkout overview step.
 */
export class CheckoutOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Verifies that the checkout overview step is displayed.
   */
  public async expectLoaded(): Promise<void> {
    await expect(this.getTitle()).toHaveText('Checkout: Overview');
    await expect(this.getSummaryContainer()).toBeVisible();
  }

  /**
   * Verifies that the item subtotal matches the expected amount.
   */
  public async expectItemTotal(expectedTotal: string): Promise<void> {
    await expect(this.getItemTotalLabel()).toHaveText(`Item total: ${expectedTotal}`);
  }

  private getTitle() {
    return this.getByTestId('title');
  }

  private getSummaryContainer() {
    return this.getByTestId('checkout-summary-container');
  }

  private getItemTotalLabel() {
    return this.getByTestId('subtotal-label');
  }
}