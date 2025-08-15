import { test, expect } from '@playwright/test'

test('checkout continues through steps', async ({ page }) => {
	await page.goto('/products')
	await page.locator('a[href^="/products/"]').first().click()
	await page.getByRole('button', { name: /add to cart/i }).click()
	await page.getByRole('link', { name: /cart/i }).click()
	await page.getByRole('button', { name: /proceed to checkout/i }).click()
	await expect(page).toHaveURL(/\/checkout/)
})