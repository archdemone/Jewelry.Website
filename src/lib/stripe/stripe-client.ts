import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
	? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
	: Promise.resolve(null as any)