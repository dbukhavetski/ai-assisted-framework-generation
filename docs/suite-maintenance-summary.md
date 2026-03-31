# suite-maintenance-summary.md

## Current state

- Runtime check: `npm run test:e2e -- --reporter=list`
- Result: 6/6 specs passed.
- Broken selectors found: none in the current Sauce Demo build. The page objects consistently use `data-test` selectors and the suite is green.

## Findings

1. Redundant cart coverage across three specs

   The scenario in [tests/e2e/inventory.spec.ts](../tests/e2e/inventory.spec.ts#L7) overlaps heavily with [tests/e2e/your-cart.spec.ts](../tests/e2e/your-cart.spec.ts#L9) and the first half of [tests/e2e/checkout.spec.ts](../tests/e2e/checkout.spec.ts#L15). All three build a cart from the inventory page and assert cart contents. This makes failures noisier without adding much behavioral coverage.

2. Environment-specific URL assertion in the invalid-login test

   [tests/e2e/login.spec.ts](../tests/e2e/login.spec.ts#L28) hard-codes `saucedemo.com` in the URL expectation even though the framework exposes a configurable `BASE_URL` through [src/utils/envHelper.ts](../src/utils/envHelper.ts). That assertion will become false if the suite is pointed at another environment, mirror, or preview deployment.

3. Positive login flow duplicates shared fixture behavior

   [tests/e2e/login.spec.ts](../tests/e2e/login.spec.ts#L7) is a legitimate smoke test, but its setup duplicates the authenticated fixture path already defined in [src/fixtures/testFixtures.ts](../src/fixtures/testFixtures.ts#L32). The suite should keep one explicit login-success spec, but the other specs should continue to rely on the fixture rather than re-proving authentication implicitly.

4. Cart verification is weaker than the test names imply

   [src/pages/YourCartPage.ts](../src/pages/YourCartPage.ts#L31) only checks that each expected item is visible. It does not assert exact cart size or absence of unexpected items, so a test can still pass if extra items are present. That is acceptable for a smoke check, but it is weak for a spec described as verifying the cart list.

5. The cart spec bypasses the user entry point it seems to represent

   [tests/e2e/your-cart.spec.ts](../tests/e2e/your-cart.spec.ts#L12) opens `/cart.html` directly instead of navigating through the header cart link. Since [tests/e2e/inventory.spec.ts](../tests/e2e/inventory.spec.ts#L10) already covers header navigation, the current cart spec is both less realistic and still overlapping.

## Consolidation plan

1. Keep [tests/e2e/login.spec.ts](../tests/e2e/login.spec.ts) as the owner of authentication coverage.
   Scope: one successful login smoke test and one failed-login error test.

2. Narrow [tests/e2e/inventory.spec.ts](../tests/e2e/inventory.spec.ts) to inventory-only behavior.
   Scope: sorting, filtering, item rendering, or inventory-specific interactions that do not leave the page.

3. Repurpose or remove [tests/e2e/your-cart.spec.ts](../tests/e2e/your-cart.spec.ts).
   Best option: replace the current duplicate “add items and verify list” flow with a unique cart behavior such as remove-from-cart, continue shopping, or quantity persistence.
   If no unique cart behavior is needed, remove the file and let checkout own cart assembly coverage.

4. Let [tests/e2e/checkout.spec.ts](../tests/e2e/checkout.spec.ts) own the end-to-end purchase preparation path.
   Scope: add items, validate cart contents, complete checkout info, and verify overview totals.

5. Tighten shared assertions before adding more specs.
   Update [src/pages/YourCartPage.ts](../src/pages/YourCartPage.ts#L31) to optionally assert exact cart item count, and replace the hard-coded domain assertion in [tests/e2e/login.spec.ts](../tests/e2e/login.spec.ts#L28) with a base-URL-agnostic check.

## Representative cleanup diff

The following diff shows one representative consolidation in [tests/e2e/inventory.spec.ts](../tests/e2e/inventory.spec.ts): remove the cart-building scenario so the file owns only inventory-specific behavior.

```diff
diff --git a/tests/e2e/inventory.spec.ts b/tests/e2e/inventory.spec.ts
index 1111111..2222222 100644
--- a/tests/e2e/inventory.spec.ts
+++ b/tests/e2e/inventory.spec.ts
@@
-test.describe('Sauce Demo inventory', () => {
-  test('adds the backpack to the cart after login', async ({ authenticatedInventoryPage, yourCartPage }) => {
-    await authenticatedInventoryPage.addItemToCart('Sauce Labs Backpack');
-    await authenticatedInventoryPage.header.expectCartBadgeCount(1);
-    await authenticatedInventoryPage.header.openCart();
-
-    await yourCartPage.expectLoaded();
-    await yourCartPage.verifyCartList(['Sauce Labs Backpack']);
-  });
-
+test.describe('Sauce Demo inventory', () => {
   test('orders items by price from low to high', async ({ authenticatedInventoryPage }) => {
     await authenticatedInventoryPage.sortItemsByPriceLowToHigh();
 
     await authenticatedInventoryPage.expectItemsSortedByPriceLowToHigh();
   });
 });
```

## Recommended next changes

1. Update the invalid-login URL assertion to avoid coupling the test to `saucedemo.com`.
2. Decide whether the cart spec should be rewritten around a unique cart behavior or deleted.
3. Strengthen `verifyCartList` so cart assertions can validate exact contents when needed.

## Final decision

For me there are balid point to improve the tests and the framework. I would move the test to the cart spec file.