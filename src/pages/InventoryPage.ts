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
   * Adds the Sauce Labs Backpack item to the cart.
   */
  public async addBackpackToCart(): Promise<void> {
    await this.getAddBackpackButton().click();
  }

  /**
   * Adds the Sauce Labs Bike Light item to the cart.
   */
  public async addBikeLightToCart(): Promise<void> {
    await this.getAddBikeLightButton().click();
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

  private getAddBackpackButton() {
    return this.getByTestId('add-to-cart-sauce-labs-backpack');
  }

  private getAddBikeLightButton() {
    return this.getByTestId('add-to-cart-sauce-labs-bike-light');
  }

  private getBackpackName() {
    return this.getByTestId('item-4-title-link');
  }
}