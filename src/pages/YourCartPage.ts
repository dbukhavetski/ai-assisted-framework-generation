import { expect, type Page } from '@playwright/test';

import { BasePage } from './BasePage';

/**
 * Models the Sauce Demo Your Cart page.
 */
export class YourCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens the Sauce Demo cart page.
   */
  public async open(): Promise<void> {
    await this.goto('/cart.html');
    await this.waitForPageReady();
  }

  /**
   * Verifies that the cart list is visible and contains the expected items.
   */
  public async verifyCartList(itemNames: string[]): Promise<void> {
    await expect(this.getCartList()).toBeVisible();

    for (const itemName of itemNames) {
      await expect(this.getCartItemLink(itemName)).toBeVisible();
    }
  }

  private getCartList() {
    return this.getByTestId('cart-list');
  }

  private getCartItemLink(itemName: string) {
    return this.getByRole('link', { name: itemName });
  }
}