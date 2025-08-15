import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
	if (!stripeClient) {
		const apiKey = process.env.STRIPE_SECRET_KEY
		if (!apiKey) throw new Error('STRIPE_SECRET_KEY is not set')
		stripeClient = new Stripe(apiKey, { typescript: true })
	}
	return stripeClient
}