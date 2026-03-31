# Playwright E2E Framework

TypeScript end-to-end test framework for Sauce Demo built with Playwright Test, page objects, reusable UI components, shared fixtures, and CI automation.

## Overview

This framework is organized around a layered test architecture:

- `tests/e2e`: business-level test scenarios for login, inventory, cart, and checkout flows
- `src/pages`: page objects that model full application screens
- `src/components`: reusable component objects for shared UI regions and forms
- `src/fixtures`: custom Playwright fixtures and shared hooks
- `src/utils`: environment parsing and logging helpers

Core framework characteristics:

- Playwright Test with TypeScript
- Page Object Model plus component objects
- Centralized runtime configuration via environment variables
- Shared fixtures for authenticated and unauthenticated flows
- Shared base hooks for viewport setup, logging, and failure diagnostics
- HTML reporting enabled on every run
- Trace, screenshot, and video capture retained on failure
- CI workflow for E2E execution, security scanning, artifact publishing, Teams notifications, and GitHub Pages publishing logic

## Project Structure

```text
.
├── .env.example
├── .github/
│   ├── actions/
│   │   └── setup-yarn-workspace/
│   ├── scripts/
│   │   ├── notify-teams-on-failure.py
│   │   ├── prepare-pages-history.js
│   │   └── run-security-scan.sh
│   └── workflows/
│       └── playwright-tests.yml
├── docs/
│   ├── legacy-test-analysis.md
│   ├── refactoring-summary.md
│   └── suite-maintenance-summary.md
├── src/
│   ├── components/
│   ├── fixtures/
│   ├── pages/
│   └── utils/
├── tests/
│   └── e2e/
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- Corepack enabled
- Yarn 4.x

## Setup

1. Enable Corepack.

```bash
corepack enable
```

2. Install dependencies.

```bash
yarn install --immutable
```

3. Install Playwright browsers.

```bash
yarn playwright install
```

4. Optionally create a local environment file from the example. The framework already has safe defaults, so `.env` is only required when you want to override them.

macOS or Linux:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Example runtime settings:

```env
BASE_URL=https://www.saucedemo.com
HEADLESS=true
BROWSER=chromium
DEFAULT_TIMEOUT=30000
```

## Execution

Run the full E2E suite:

```bash
yarn test:e2e
```

Run headed:

```bash
yarn test:e2e:headed
```

Run in debug mode:

```bash
yarn test:e2e:debug
```

Run with the Playwright UI:

```bash
yarn test:e2e:ui
```

Open the generated HTML report:

```bash
yarn playwright show-report
```

Run a single spec file:

```bash
yarn playwright test tests/e2e/login.spec.ts
```

## Runtime Configuration

The framework reads configuration from environment variables through `EnvHelper` in `src/utils/envHelper.ts`.

Supported variables:

- `BASE_URL`: application base URL
- `HEADLESS`: `true` or `false`
- `BROWSER`: `chromium`, `firefox`, or `webkit`
- `DEFAULT_TIMEOUT`: timeout in milliseconds

Default values used when `.env` is missing:

- `BASE_URL=https://www.saucedemo.com`
- `HEADLESS=true`
- `BROWSER=chromium`
- `DEFAULT_TIMEOUT=30000`

Examples:

```bash
HEADLESS=false BROWSER=firefox yarn test:e2e
```

```bash
BASE_URL=https://www.saucedemo.com DEFAULT_TIMEOUT=45000 yarn test:e2e
```

## Framework Design

### Pages

Page objects in `src/pages` represent full screens and expose intent-focused methods such as opening pages, logging in, and asserting readiness.

Examples include:

- `LoginPage`
- `InventoryPage`
- `YourCartPage`
- `CheckoutYourInformationPage`
- `CheckoutOverviewPage`

### Components

Component objects in `src/components` encapsulate reusable UI regions and controls under a stable root locator.

The framework standardizes selector access through base helpers that wrap:

- `getByRole`
- `getByLabel`
- `getByTestId`

Examples include:

- `LoginFormComponent`
- `InventoryHeaderComponent`

### Fixtures and Hooks

Custom fixtures in `src/fixtures/testFixtures.ts` provide ready-to-use objects such as:

- `loginPage`
- `inventoryPage`
- `yourCartPage`
- `checkoutYourInformationPage`
- `checkoutOverviewPage`
- `authenticatedInventoryPage`
- `standardUser`

Shared hooks from `BaseTest` apply common setup and teardown behavior such as:

- standard viewport initialization
- test lifecycle logging
- failure URL attachment when a test ends unexpectedly

The default test viewport is `1440x900`.

## Reporting and Failure Artifacts

Playwright is configured to generate:

- HTML report
- list reporter output in the terminal
- traces on failure
- screenshots on failure
- video on failure

Relevant output folders:

- `playwright-report/`
- `test-results/`

## CI Workflow

The GitHub Actions workflow in `.github/workflows/playwright-tests.yml` currently includes:

- dependency vulnerability scanning with `yarn npm audit --severity high`
- Playwright browser installation and E2E execution
- HTML report upload as a build artifact
- trace upload when traces exist
- Microsoft Teams notification on failure
- GitHub Pages artifact and deployment steps guarded to `main` refs

Supporting CI scripts live in `.github/scripts/`, and the repository also contains a local reusable action in `.github/actions/setup-yarn-workspace/`.

Current trigger behavior:

- the workflow runs on `pull_request` targeting `main`
- the Pages publish steps are additionally gated by `github.ref == 'refs/heads/main'`
- as written today, those publish steps do not run for pull request refs

## Current Test Coverage

The suite currently covers the main Sauce Demo user journeys:

- successful login and invalid login validation
- inventory sorting by price
- cart entry and multi-item verification
- checkout through overview subtotal validation

## Useful Commands

Install dependencies:

```bash
yarn install --immutable
```

Install browsers and OS dependencies in CI-style environments:

```bash
yarn playwright install --with-deps
```

Run a security scan locally:

```bash
yarn npm audit --severity high
```

## Maintenance Notes

- Prefer `data-test` selectors when extending page and component objects.
- Keep new test logic inside page objects, components, and fixtures rather than raw spec files when possible.
- Add reusable behavior to `BasePage`, `BaseComponent`, or shared fixtures when a pattern repeats.