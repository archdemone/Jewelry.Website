describe('Admin Dashboard', () => {
	it('shows forbidden without login', () => {
		cy.visit('/admin/products')
		cy.contains('Forbidden')
	})
})