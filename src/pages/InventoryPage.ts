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
    await this.waitForPageReady();
    await expect(this.getInventoryContainer()).toBeVisible();
    await expect(this.getInventoryItems().first()).toBeVisible();
    await this.header.expectProductsTitle();
  }

  /**
   * Adds an inventory item to the cart.
   */
  public async addItemToCart(itemName: string): Promise<void> {
    await this.getAddToCartButton(itemName).click();
  }

  /**
   * Adds multiple inventory items to the cart and verifies the badge count after each add.
   */
  public async addItemsToCart(itemNames: string[]): Promise<void> {
    for (const [index, itemName] of itemNames.entries()) {
      await this.addItemToCart(itemName);
      await this.header.expectCartBadgeCount(index + 1);
    }
  }

  /**
   * Returns the displayed price for an inventory item.
   */
  public async getItemPrice(itemName: string): Promise<number> {
    const priceText = await this.getInventoryItemPrice(itemName).innerText();

    return this.parsePrice(priceText);
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
   * Verifies that displayed inventory items are sorted by ascending price.
   */
  public async expectItemsSortedByPriceLowToHigh(): Promise<void> {
    const priceTexts = await this.getInventoryItemPrices().allInnerTexts();
    const prices = priceTexts.map((priceText) => this.parsePrice(priceText));
    const sortedPrices = [...prices].sort((left, right) => left - right);

    expect(prices.length).toBeGreaterThan(0);
    expect(prices).toEqual(sortedPrices);
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

  private getInventoryItems() {
    return this.getInventoryContainer().getByTestId('inventory-item');
  }

  private getInventoryItem(itemName: string) {
    return this.getInventoryItems().filter({ hasText: itemName });
  }

  private getInventoryItemPrices() {
    return this.getInventoryItems().getByTestId('inventory-item-price');
  }

  private getInventoryItemPrice(itemName: string) {
    return this.getInventoryItem(itemName).getByTestId('inventory-item-price');
  }

  private parsePrice(priceText: string) {
    return Number.parseFloat(priceText.replace('$', ''));
  }

  private toInventorySlug(itemName: string) {
    return itemName.trim().toLowerCase().replace(/\s+/g, '-');
  }
}