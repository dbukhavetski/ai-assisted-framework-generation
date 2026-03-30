import { test } from '../../src/fixtures/testFixtures';

const cartItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

const mockedAddress = {
  firstName: 'Taylor',
  lastName: 'Tester',
  postalCode: '10001',
};

/**
 * Covers the primary checkout flow through overview.
 */
test.describe('Sauce Demo checkout', () => {
  test('adds several items, proceeds to checkout, and verifies the overview subtotal', async ({
    authenticatedInventoryPage,
    checkoutOverviewPage,
    checkoutYourInformationPage,
    yourCartPage,
  }) => {
    let expectedItemTotal = 0;

    for (const [index, itemName] of cartItems.entries()) {
      expectedItemTotal += await authenticatedInventoryPage.getItemPrice(itemName);
      await authenticatedInventoryPage.addItemToCart(itemName);
      await authenticatedInventoryPage.header.expectCartBadgeCount(index + 1);
    }

    await authenticatedInventoryPage.header.openCart();
    await yourCartPage.expectLoaded();
    await yourCartPage.verifyCartList(cartItems);
    await yourCartPage.proceedToCheckout();

    await checkoutYourInformationPage.expectLoaded();
    await checkoutYourInformationPage.fillAddressAndContinue(mockedAddress);

    await checkoutOverviewPage.expectLoaded();
    await checkoutOverviewPage.expectItemTotal(`$${expectedItemTotal.toFixed(2)}`);
  });
});