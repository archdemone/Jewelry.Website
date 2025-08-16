"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import SmartImage from '@/components/common/SmartImage'
import { useCartStore } from '@/store/cart'
import toast from 'react-hot-toast'
import { DEFAULT_PLACEHOLDER } from '@/lib/assets/images'

type CartItemProps = {
	id: string
	name: string
	price: number
	quantity: number
	image?: string
}

export default function CartItem({ id, name, price, quantity, image }: CartItemProps) {
	const { removeItem, setQuantity } = useCartStore()
	const [isUpdating, setIsUpdating] = useState(false)

	const fallbacks = [DEFAULT_PLACEHOLDER]

	const safePrice = typeof price === 'number' && !Number.isNaN(price) ? price : 0

	const handleQuantityChange = async (newQuantity: number) => {
		if (newQuantity < 1) return
		setIsUpdating(true)
		setQuantity(id, newQuantity)
		toast.success('Quantity updated')
		setIsUpdating(false)
	}

	const handleRemove = async () => {
		setIsUpdating(true)
		removeItem(id)
		toast('Removed from cart', { icon: '🗑️' })
		setIsUpdating(false)
	}

	return (
		<div className="flex gap-4 rounded-lg border p-4">
			{/* Product Image */}
			<div className="aspect-square h-20 w-20 overflow-hidden rounded-md bg-gray-100">
				<SmartImage
					srcs={image ? [image, ...fallbacks] : fallbacks}
					alt={name}
					className="h-full w-full object-cover"
					width={80}
					height={80}
				/>
			</div>

			{/* Product Details */}
			<div className="flex flex-1 flex-col justify-between">
				<div>
					<h3 className="font-medium text-gray-900">{name}</h3>
					<p className="text-sm text-gray-500">${safePrice.toFixed(2)}</p>
				</div>

				{/* Quantity Controls */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleQuantityChange(quantity - 1)}
							disabled={isUpdating || quantity <= 1}
						>
							<Minus className="h-3 w-3" />
						</Button>
						<span className="w-8 text-center text-sm">{quantity}</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleQuantityChange(quantity + 1)}
							disabled={isUpdating}
						>
							<Plus className="h-3 w-3" />
						</Button>
					</div>

					{/* Remove Button */}
					<Button
						variant="ghost"
						size="sm"
						onClick={handleRemove}
						disabled={isUpdating}
						className="text-red-600 hover:text-red-700"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Total Price */}
			<div className="text-right">
				<p className="font-semibold text-gray-900">
					${(safePrice * quantity).toFixed(2)}
				</p>
			</div>
		</div>
	)
}


