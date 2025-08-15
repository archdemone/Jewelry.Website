import { addBusinessDays, addDays, format } from 'date-fns'

export function calculateShippingCost(methodPrice: number, subtotal: number): number {
	// Example: free shipping over $150
	if (subtotal >= 150) return 0
	return Number(methodPrice.toFixed(2))
}

export function calculateTax(subtotal: number, shipping: number, rate = 0.0725): number {
	const taxBase = subtotal + shipping
	return Number((taxBase * rate).toFixed(2))
}

export function calculateTotal(subtotal: number, shipping: number, tax: number, discount = 0): number {
	return Number((subtotal + shipping + tax - discount).toFixed(2))
}

export function getEstimatedDeliveryDate(estimatedDays: number): string {
	const date = addBusinessDays(new Date(), estimatedDays)
	return format(date, 'EEE, MMM d')
}

export function formatCurrency(amount: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}