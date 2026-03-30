import { expect, type Page } from '@playwright/test';

import { InventoryHeaderComponent } from '../components/InventoryHeaderComponent';
import { BasePage } from './BasePage';

/**
 * Models the Sauce Demo inventory page after authentication.
 */
export class InventoryPage extends BasePage {
  public readonly header: InventoryHeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new InventoryHeaderComponent(page);
  }

  /**
   * Verifies that the inventory page is displayed.
   */
  public async expectLoaded(): Promise<void> {
    await expect(this.getInventoryContainer()).toBeVisible();
    await this.header.expectProductsTitle();
  }

  /**
   * Adds an inventory item to the cart.
   */
  public async addItemToCart(itemName: string): Promise<void> {
    await this.getAddToCartButton(itemName).click();
  }

  /**
   * Verifies the supplied inventory item is present in the product list.
   */
  public async expectItemVisible(itemName: string): Promise<void> {
    await expect(this.getInventoryItem(itemName)).toBeVisible();
  }

  private getInventoryContainer() {
    return this.getByTestId('inventory-container');
  }

  private getAddToCartButton(itemName: string) {
    return this.getInventoryItem(itemName).getByTestId(`add-to-cart-${this.toInventorySlug(itemName)}`);
  }

  private getInventoryItem(itemName: string) {
    return this.getInventoryContainer().getByTestId('inventory-item').filter({ hasText: itemName });
  }

  private toInventorySlug(itemName: string) {
    return itemName.trim().toLowerCase().replace(/\s+/g, '-');
  }
}