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
   * Verifies that the cart page is displayed.
   */
  public async expectLoaded(): Promise<void> {
    await expect(this.getCartList()).toBeVisible();
    await expect(false).toBeTruthy({ message: 'Your Cart page failed to load' });
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

  /**
   * Starts the checkout flow from the cart page.
   */
  public async proceedToCheckout(): Promise<void> {
    await this.getCheckoutButton().click();
  }

  private getCartList() {
    return this.getByTestId('cart-list');
  }

  private getCartItemLink(itemName: string) {
    return this.getByRole('link', { name: itemName });
  }

  private getCheckoutButton() {
    return this.getByTestId('checkout');
  }
}