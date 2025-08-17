import { test, expect } from '@playwright/test';

test('user journey to checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Collections').click();
  await expect(page).toHaveURL(/\/products/);
  await page.locator('a[href^="/products/"]').first().click();
  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /cart/i }).click();
  await expect(page).toHaveURL(/\/cart/);
  await page.getByRole('button', { name: /proceed to checkout/i }).click();
  await expect(page).toHaveURL(/\/checkout/);
});
