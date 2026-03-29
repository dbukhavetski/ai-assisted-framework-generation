import { expect, type Page } from '@playwright/test';

import { LoginFormComponent } from '../components/LoginFormComponent';
import { BasePage } from './BasePage';

/**
 * Models the Sauce Demo login page.
 */
export class LoginPage extends BasePage {
  public readonly loginForm: LoginFormComponent;

  constructor(page: Page) {
    super(page);
    this.loginForm = new LoginFormComponent(page);
  }

  /**
   * Opens the Sauce Demo login page.
   */
  public async open(): Promise<void> {
    await this.goto('/');
    await this.waitForPageReady();
  }

  /**
   * Verifies that the login page is ready for interaction.
   */
  public async expectLoaded(): Promise<void> {
    await this.loginForm.expectVisible();
    await expect(this.getLoginButton()).toBeVisible();
  }

  /**
   * Logs in with the supplied credentials.
   */
  public async login(username: string, password: string): Promise<void> {
    await this.loginForm.login(username, password);
  }

  private getLoginButton() {
    return this.getByTestId('login-button');
  }
}