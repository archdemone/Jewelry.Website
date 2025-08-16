import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripe(): any {
	const apiKey = process.env.STRIPE_SECRET_KEY
	if (!apiKey) {
		return {
			paymentIntents: {
				create: async (_args: any) => ({ client_secret: 'test_client_secret' }),
			},
		} as any
	}
	if (!stripeClient) {
		stripeClient = new Stripe(apiKey, { typescript: true })
	}
	return stripeClient
}