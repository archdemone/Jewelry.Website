"use client"

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useMemo, useState } from 'react'
import { stripePromise } from '@/lib/stripe/stripe-client'
import { useCartStore } from '@/store/cart'

function InnerPaymentForm({ clientSecret }: { clientSecret: string }) {
	const stripe = useStripe()
	const elements = useElements()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!stripe || !elements) return
		setLoading(true)
		setError(null)
		const { error: submitError } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: typeof window !== 'undefined' ? `${window.location.origin}/checkout/success` : undefined,
			},
			redirect: 'if_required',
		})
		if (submitError) setError(submitError.message || 'Payment failed')
		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<PaymentElement options={{ layout: 'tabs' }} />
			{error && <p className="text-sm text-red-600">{error}</p>}
			<button disabled={loading || !stripe} className="w-full rounded-md bg-yellow-500 py-2 text-white disabled:opacity-50">{loading ? 'Processing…' : 'Pay now'}</button>
		</form>
	)
}

export default function PaymentForm() {
	const { subtotal } = useCartStore()
	const [clientSecret, setClientSecret] = useState<string | null>(null)

	useEffect(() => {
		async function createIntent() {
			const res = await fetch('/api/checkout/payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: subtotal, currency: 'usd', metadata: {} }),
			})
			const data = await res.json()
			setClientSecret(data.clientSecret)
		}
		createIntent()
	}, [subtotal])

	const options = useMemo(() => ({ clientSecret: clientSecret ?? '' }), [clientSecret])
	if (!clientSecret) return <p className="text-sm text-muted-foreground">Loading payment form…</p>
	return (
		<Elements stripe={stripePromise} options={options as any}>
			<InnerPaymentForm clientSecret={clientSecret} />
		</Elements>
	)
}