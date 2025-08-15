import { Address, CartItem, Category, Collection, Order, OrderItem, Product, Review, User, Wishlist } from '@prisma/client'

export type ProductWithRelations = Product & {
	category: Category
	collections: Collection[]
	reviews: Review[]
	wishlist: Wishlist[]
}

export type OrderWithItems = Order & {
	items: OrderItem[]
}

export type UserWithRelations = User & {
	addresses: Address[]
	orders: Order[]
	reviews: Review[]
	cart: CartItem[]
	wishlist: Wishlist[]
}

export type ApiResponse<T> = {
	success: boolean
	data?: T
	error?: string
}


