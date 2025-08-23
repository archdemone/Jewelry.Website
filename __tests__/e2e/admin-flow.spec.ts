import { test, expect } from '@playwright/test';

test('admin area requires auth', async ({ page }) => {
  await page.goto('/admin/products');
  // Should redirect to login page when not authenticated
  await expect(page).toHaveURL(/\/auth\/login/);
});
