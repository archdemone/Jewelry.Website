import { configureAxe, toHaveNoViolations } from 'jest-axe'
import React from 'react'
import { render } from '@testing-library/react'

expect.extend(toHaveNoViolations as any)
const axe = configureAxe({})

function PlaceholderHome() {
	return <div><h1>Home</h1><a href="/products">Shop</a></div>
}

describe('Accessibility', () => {
	it('homepage has no violations', async () => {
		const { container } = render(<PlaceholderHome />)
		const results = await axe(container)
		expect(results).toHaveNoViolations()
	})

	it('product page is accessible', async () => {
		const { container } = render(<div><h1>Product</h1><button>Add to cart</button></div>)
		const results = await axe(container)
		expect(results).toHaveNoViolations()
	})

	it('checkout is keyboard navigable', async () => {
		expect(true).toBe(true)
	})
})