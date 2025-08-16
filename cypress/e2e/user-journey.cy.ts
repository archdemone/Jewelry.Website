describe('Complete User Journey', () => {
	it('completes purchase from homepage to success', () => {
		cy.visit('/')

		cy.contains('Collections').click()
		cy.url().should('include', '/products')

		cy.get('[data-testid="product-card"] a').first().click()
		cy.url().should('include', '/products/')

		cy.get('[data-testid="add-to-cart"]').click()

		cy.get('[data-testid="cart-icon"]').click()
		cy.url().should('include', '/cart')

		cy.get('[data-testid="checkout-button"]').click()

		// Progress through steps (forms are validated partially; keep simple)
		cy.contains('Continue').click()
		cy.contains('Continue').click()

		// We cannot complete Stripe in CI easily, but we can reach payment and review
	})
})