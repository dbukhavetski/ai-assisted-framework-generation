import { expect, type Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';

/**
 * Models the header region on the Sauce Demo inventory pages.
 */
export class InventoryHeaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByTestId('header-container'));
  }

  /**
   * Verifies that the products header title is visible.
   */
  public async expectProductsTitle(): Promise<void> {
    await expect(this.getTitle()).toHaveText('Products');
  }

  /**
   * Opens the shopping cart from the header.
   */
  public async openCart(): Promise<void> {
    await this.getCartLink().click();
  }

  /**
   * Verifies the current cart badge count.
   */
  public async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.getCartBadge()).toHaveText(String(count));
  }

  private getTitle() {
    return this.getByTestId('title');
  }

  private getCartLink() {
    return this.getByTestId('shopping-cart-link');
  }

  private getCartBadge() {
    return this.getByTestId('shopping-cart-badge');
  }
}