"use client"

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'

export function AddToCartButton({ productId, name, price, image }: { productId: string; name: string; price: number; image: string }) {
	const addItem = useCartStore((s) => s.addItem)
	return (
		<Button size="lg" onClick={() => addItem({ productId, name, price, image })}>Add to cart</Button>
	)
}


