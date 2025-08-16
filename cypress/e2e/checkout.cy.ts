describe('Checkout Flow', () => {
	it('adds product to cart and proceeds to checkout steps', () => {
		cy.visit('/products')
		cy.get('[data-testid="product-card"] a').first().click()
		cy.get('[data-testid="add-to-cart"]').click()
		cy.get('[data-testid="cart-icon"]').click()
		cy.url().should('include', '/cart')
		cy.get('[data-testid="checkout-button"]').click()
		cy.url().should('include', '/checkout')
		cy.contains('Continue').click()
		cy.contains('Continue').click()
	})
})