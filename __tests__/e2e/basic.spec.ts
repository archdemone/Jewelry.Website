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
<<<<<<< HEAD
  await page.goto('/about-artisan');
  await expect(page).toHaveURL(/\/about-artisan/);
=======
  await page.goto('/about');
  await expect(page).toHaveURL(/\/about/);
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
});
