describe('Products', () => {
	it('navigates to products and lists items', () => {
		cy.visit('/')
		cy.get('[data-testid="nav-products"]').click()
		cy.url().should('include', '/products')
		cy.get('[data-testid="product-card"]').should('exist')
	})
})