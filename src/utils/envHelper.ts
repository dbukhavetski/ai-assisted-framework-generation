/**
 * Describes the runtime configuration used by the test framework.
 */
export interface RuntimeEnvironment {
  baseUrl: string;
  headless: boolean;
  browserName: 'chromium' | 'firefox' | 'webkit';
  defaultTimeout: number;
}

/**
 * Centralizes environment variable parsing and validation.
 */
export class EnvHelper {
  /**
   * Returns a string environment variable or a fallback value.
   */
  public static getString(name: string, fallbackValue: string): string {
    return process.env[name]?.trim() || fallbackValue;
  }

  /**
   * Returns a boolean environment variable or a fallback value.
   */
  public static getBoolean(name: string, fallbackValue: boolean): boolean {
    const rawValue = process.env[name];

    if (rawValue === undefined) {
      return fallbackValue;
    }

    return rawValue.toLowerCase() === 'true';
  }

  /**
   * Returns a numeric environment variable or a fallback value.
   */
  public static getNumber(name: string, fallbackValue: number): number {
    const rawValue = process.env[name];

    if (rawValue === undefined) {
      return fallbackValue;
    }

    const parsedValue = Number(rawValue);
    return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
  }

  /**
   * Builds the normalized runtime configuration for Playwright.
   */
  public static getRuntimeEnvironment(): RuntimeEnvironment {
    const browserName = EnvHelper.getString('BROWSER', 'chromium');

    if (!EnvHelper.isSupportedBrowser(browserName)) {
      throw new Error(`Unsupported BROWSER value: ${browserName}`);
    }

    return {
      baseUrl: EnvHelper.getString('BASE_URL', 'https://www.saucedemo.com'),
      headless: EnvHelper.getBoolean('HEADLESS', true),
      browserName,
      defaultTimeout: EnvHelper.getNumber('DEFAULT_TIMEOUT', 30_000),
    };
  }

  /**
   * Checks whether the provided browser name is supported.
   */
  public static isSupportedBrowser(value: string): value is RuntimeEnvironment['browserName'] {
    return value === 'chromium' || value === 'firefox' || value === 'webkit';
  }
}