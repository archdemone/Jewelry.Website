import { db } from '@/lib/db'
import { getStripe } from '@/lib/stripe/stripe-server'

export async function POST(req: Request) {
	try {
		const payload = await req.json()
		// 1. Validate cart, prices, inventory (placeholder)
		// 2. Create or confirm payment intent (placeholder)
		// 3. Create order in DB (simplified example)
		const order = await db.order.create({
			data: {
				orderNumber: `ORD-${Date.now()}`,
				email: payload.shipping?.email,
				subtotal: payload.subtotal,
				shipping: payload.shippingCost ?? 0,
				tax: payload.tax ?? 0,
				total: payload.total,
				currency: payload.currency ?? 'USD',
				shippingAddress: payload.shipping,
				billingAddress: payload.billing ?? payload.shipping,
				status: 'PROCESSING',
				paymentStatus: 'PAID',
			},
		})
		return Response.json({ ok: true, orderId: order.id, orderNumber: order.orderNumber })
	} catch (e) {
		return new Response('Failed to process order', { status: 400 })
	}
}