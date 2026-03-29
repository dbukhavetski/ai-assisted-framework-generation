import 'dotenv/config';

import { defineConfig, devices } from '@playwright/test';

import { EnvHelper } from './src/utils/envHelper';

const environment = EnvHelper.getRuntimeEnvironment();

const deviceByBrowser = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
} as const;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: environment.defaultTimeout,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: environment.baseUrl,
    headless: environment.headless,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: environment.defaultTimeout,
    navigationTimeout: environment.defaultTimeout,
  },
  projects: [
    {
      name: environment.browserName,
      use: {
        ...deviceByBrowser[environment.browserName],
        browserName: environment.browserName,
      },
    },
  ],
});