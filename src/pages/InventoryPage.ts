import { expect, type Page } from '@playwright/test';

import { InventoryHeaderComponent } from '../components/InventoryHeaderComponent';
import { BasePage } from './BasePage';

type InventoryItem = 'Sauce Labs Backpack' | 'Sauce Labs Bike Light';

const addToCartButtonTestIds: Record<InventoryItem, string> = {
  'Sauce Labs Backpack': 'add-to-cart-sauce-labs-backpack',
  'Sauce Labs Bike Light': 'add-to-cart-sauce-labs-bike-light',
};

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
  public async addItemToCart(itemName: InventoryItem): Promise<void> {
    await this.getAddToCartButton(itemName).click();
  }

  /**
   * Verifies the backpack item is present in the product list.
   */
  public async expectBackpackVisible(): Promise<void> {
    await expect(this.getBackpackName()).toBeVisible();
  }

  private getInventoryContainer() {
    return this.getByTestId('inventory-container');
  }

  private getAddToCartButton(itemName: InventoryItem) {
    return this.getByTestId(addToCartButtonTestIds[itemName]);
  }

  private getBackpackName() {
    return this.getByTestId('item-4-title-link');
  }
}