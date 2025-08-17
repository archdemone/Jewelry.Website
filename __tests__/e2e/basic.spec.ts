import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');
});

test('products page loads', async ({ page }) => {
  await page.goto('/products');
  await expect(page).toHaveURL(/\/products/);
});

test('about page loads', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveURL(/\/about/);
});
