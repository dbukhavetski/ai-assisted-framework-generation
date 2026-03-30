import { expect, type Page } from '@playwright/test';

import { BasePage } from './BasePage';

interface CheckoutAddress {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Models the Sauce Demo checkout information step.
 */
export class CheckoutYourInformationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Verifies that the checkout information step is displayed.
   */
  public async expectLoaded(): Promise<void> {
    await expect(this.getTitle()).toHaveText('Checkout: Your Information');
    await expect(this.getContinueButton()).toBeVisible();
  }

  /**
   * Completes the address form and continues to overview.
   */
  public async fillAddressAndContinue(address: CheckoutAddress): Promise<void> {
    await this.getFirstNameInput().fill(address.firstName);
    await this.getLastNameInput().fill(address.lastName);
    await this.getPostalCodeInput().fill(address.postalCode);
    await this.getContinueButton().click();
  }

  private getTitle() {
    return this.getByTestId('title');
  }

  private getFirstNameInput() {
    return this.getByTestId('firstName');
  }

  private getLastNameInput() {
    return this.getByTestId('lastName');
  }

  private getPostalCodeInput() {
    return this.getByTestId('postalCode');
  }

  private getContinueButton() {
    return this.getByTestId('continue');
  }
}