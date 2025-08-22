import { test, expect } from '@playwright/test';

test('admin area requires auth', async ({ page }) => {
  await page.goto('/admin/products');
<<<<<<< HEAD
  // Should redirect to login page when not authenticated
  await expect(page).toHaveURL(/\/auth\/login/);
=======
  await expect(page.getByText(/forbidden/i)).toBeVisible();
>>>>>>> efe9b86fc74c3a51342e610dd3cfb0a77ccc824b
});
