import { expect, type Page } from '@playwright/test';

import { InventoryHeaderComponent } from '../components/InventoryHeaderComponent';
import { BasePage } from './BasePage';

/**
 * Models the Sauce Demo inventory page after authentication.
 */
export class InventoryPage extends BasePage {
  public readonly header: InventoryHeaderComponent;
  private static readonly PRICE_LOW_TO_HIGH_OPTION = 'lohi';

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
   * Orders inventory items by price from low to high.
   */
  public async sortItemsByPriceLowToHigh(): Promise<void> {
    await this.getSortDropdown().selectOption(InventoryPage.PRICE_LOW_TO_HIGH_OPTION);
  }

  /**
   * Verifies the supplied inventory item is present in the product list.
   */
  public async expectItemVisible(itemName: string): Promise<void> {
    await expect(this.getInventoryItem(itemName)).toBeVisible();
  }

  /**
   * Verifies that the first displayed inventory item has the lowest price.
   */
  public async expectFirstItemToBeCheapest(): Promise<void> {
    const priceTexts = await this.getInventoryItemPrices().allInnerTexts();
    const prices = priceTexts.map((priceText) => this.parsePrice(priceText));
    const lowestPrice = Math.min(...prices);

    expect(prices[0]).toBe(lowestPrice);
  }

  private getInventoryContainer() {
    return this.getByTestId('inventory-container');
  }

  private getSortDropdown() {
    return this.getByTestId('product-sort-container');
  }

  private getAddToCartButton(itemName: string) {
    return this.getInventoryItem(itemName).getByTestId(`add-to-cart-${this.toInventorySlug(itemName)}`);
  }

  private getInventoryItem(itemName: string) {
    return this.getInventoryContainer().getByTestId('inventory-item').filter({ hasText: itemName });
  }

  private getInventoryItemPrices() {
    return this.getInventoryContainer().getByTestId('inventory-item-price');
  }

  private parsePrice(priceText: string) {
    return Number.parseFloat(priceText.replace('$', ''));
  }

  private toInventorySlug(itemName: string) {
    return itemName.trim().toLowerCase().replace(/\s+/g, '-');
  }
}