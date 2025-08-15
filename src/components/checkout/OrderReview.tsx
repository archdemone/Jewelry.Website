"use client"

import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/checkout/checkout-utils'
import { useFormContext, useWatch } from 'react-hook-form'

export default function OrderReview({ onEdit }: { onEdit?: (section: 'information' | 'shipping' | 'payment') => void }) {
	const { items } = useCartStore()
	const { getValues } = useFormContext()
	const shipping = useWatch({ name: 'shipping' })
	const shippingMethod = useWatch({ name: 'shippingMethod' })

	return (
		<div className="space-y-6">
			<section className="rounded-md border p-4">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold">Items</h3>
				</div>
				<div className="space-y-2 text-sm">
					{items.map(i => (
						<div key={i.productId} className="flex justify-between">
							<span>{i.name} × {i.quantity}</span>
							<span>{formatCurrency(i.price * i.quantity)}</span>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-md border p-4">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold">Shipping address</h3>
					<button type="button" className="text-sm underline" onClick={() => onEdit?.('information')}>Edit</button>
				</div>
				<p className="text-sm text-muted-foreground">{shipping?.firstName} {shipping?.lastName}, {shipping?.address1}{shipping?.address2 ? `, ${shipping.address2}` : ''}, {shipping?.city}, {shipping?.state} {shipping?.postalCode}, {shipping?.country}</p>
			</section>

			<section className="rounded-md border p-4">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold">Shipping method</h3>
					<button type="button" className="text-sm underline" onClick={() => onEdit?.('shipping')}>Edit</button>
				</div>
				<p className="text-sm text-muted-foreground">{shippingMethod?.name}</p>
			</section>

		</div>
	)
}