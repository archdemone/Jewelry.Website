"use client"

import { useCartStore } from '@/store/cart'
import CartItem from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyCart } from '@/components/cart/EmptyCart'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function CartPage() {
	const items = useCartStore((s) => s.items)
	const itemCount = useCartStore((s) => s.count)

	return (
		<>
			<Header />
			<main className="container py-10">
				<h1 className="font-[var(--font-serif)] text-2xl font-semibold text-secondary">Shopping Cart ({itemCount})</h1>
				<div className="mt-8 grid gap-8 lg:grid-cols-3">
					<div className="space-y-4 lg:col-span-2">
						{items.length === 0 ? (
							<EmptyCart />
						) : (
							items.map((i) => (
								<CartItem key={i.productId} id={i.productId} name={i.name} price={i.price} image={i.image} quantity={i.quantity} />
							))
						)}
					</div>
					<div>
						<CartSummary />
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}


