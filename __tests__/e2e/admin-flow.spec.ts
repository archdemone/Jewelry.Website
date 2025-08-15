import { test, expect } from '@playwright/test'

test('admin area requires auth', async ({ page }) => {
	await page.goto('/admin/products')
	await expect(page.getByText(/forbidden/i)).toBeVisible()
})