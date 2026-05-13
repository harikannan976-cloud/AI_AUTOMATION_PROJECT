import { test, expect } from '@playwright/test';

const account = {
  email: process.env.STEVEMADDEN_TEST_EMAIL || `playwright-${Date.now()}@example.com`,
  password: process.env.STEVEMADDEN_TEST_PASSWORD || 'TestPass123!',
  firstName: 'Playwright',
  lastName: 'User',
};

async function dismissPopup(page) {
  const popupSelectors = [
    'button:has-text("Dismiss this popup")',
    'button:has-text("Close")',
    'button:has-text("No thanks")',
    'button:has-text("Not now")',
  ].join(', ');

  const popupButton = page.locator(popupSelectors);
  if (await popupButton.count()) {
    await popupButton.first().click({ timeout: 5000 }).catch(() => {});
  }

  const iframePopupButton = page.frameLocator('iframe').locator(popupSelectors);
  if (await iframePopupButton.count()) {
    await iframePopupButton.first().click({ timeout: 5000 }).catch(() => {});
  }

  await page.evaluate(() => {
    const overlay = document.querySelector('#attentive_overlay');
    if (overlay) overlay.remove();
    const iframe = document.querySelector('#attentive_creative');
    if (iframe) iframe.remove();
  });
}

test.describe.serial('Steve Madden account flow', () => {
  test('create a new user account on stevemadden.ca', async ({ page }) => {
    await page.goto('https://www.stevemadden.ca/account/register');
    await dismissPopup(page);

    await page.locator('input[name="customer[email]"]').fill(account.email);
    await page.locator('input[name="customer[first_name]"]').fill(account.firstName);
    await page.locator('input[name="customer[last_name]"]').fill(account.lastName);
    await page.locator('input[name="customer[password]"]').fill(account.password);

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => null),
      page.locator('input[type="submit"][value="Continue"]').click(),
    ]);

    await expect(page).toHaveURL(/\/account(\/.*)?$/, { timeout: 15000 });
  });

  test('sign in with the created stevemadden.ca account', async ({ page }) => {
    await page.goto('https://www.stevemadden.ca/account/login');
    await dismissPopup(page);

    await page.locator('input[name="emailaddress"]').fill(account.email);
    await Promise.all([
      page.waitForSelector('input#customer_password', { timeout: 15000 }),
      page.locator('input[type="submit"][value="Continue"]').click(),
    ]);

    await page.locator('input#customer_password').fill(account.password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => null),
      page.getByRole('button', { name: 'Sign in' }).click(),
    ]);

    await expect(page).toHaveURL(/\/account(\/.*)?$/, { timeout: 15000 });
  });
});
