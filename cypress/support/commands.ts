declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Chainable<void>
		}
	}
}

Cypress.Commands.add('login', (email: string, password: string) => {
	// Implement programmatic login via NextAuth API or UI flow
	cy.request('POST', '/api/auth/callback/credentials', {
		csrfToken: '',
		email,
		password,
	})
})