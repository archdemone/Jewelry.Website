"use client"

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'

export function AddToCartButton({ productId, name, price, image }: { productId: string; name: string; price: number; image: string }) {
	const addItem = useCartStore((s) => s.addItem)
	return (
		<Button size="lg" data-testid="add-to-cart-card" onClick={() => { addItem({ productId, name, price, image }); toast.success('Added to cart') }}>Add to cart</Button>
	)
}


