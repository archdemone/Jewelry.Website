describe('Homepage', () => {
	it('loads and shows key sections', () => {
		cy.visit('/')
		cy.contains('Aurora Jewelry')
		cy.contains('Featured')
	})
})