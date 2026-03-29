import { type Page } from '@playwright/test';

import { BaseComponent } from './BaseComponent';

/**
 * Models the Sauce Demo login form interactions.
 */
export class LoginFormComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByTestId('login-container'));
  }

  /**
   * Enters the username value into the login form.
   */
  public async enterUsername(username: string): Promise<void> {
    await this.getUsernameField().fill(username);
  }

  /**
   * Enters the password value into the login form.
   */
  public async enterPassword(password: string): Promise<void> {
    await this.getPasswordField().fill(password);
  }

  /**
   * Submits the login form.
   */
  public async submit(): Promise<void> {
    await this.getLoginButton().click();
  }

  /**
   * Logs in with the supplied credentials.
   */
  public async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }

  /**
   * Returns the visible login error message.
   */
  public async getErrorMessage(): Promise<string> {
    return (await this.getErrorBanner().textContent())?.trim() ?? '';
  }

  private getUsernameField() {
    return this.getByTestId('username');
  }

  private getPasswordField() {
    return this.getByTestId('password');
  }

  private getLoginButton() {
    return this.getByTestId('login-button');
  }

  private getErrorBanner() {
    return this.getByTestId('error');
  }
}