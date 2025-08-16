// Lightweight app-level types that do not rely on generated Prisma client types.
// These are sufficient for compile-time checks in the UI and API layers.

export type CategoryRef = { id: string; slug: string; name: string }
export type CollectionRef = { id: string; slug: string; name: string }
export type ReviewRef = { id: string; rating: number; title?: string | null; comment?: string | null }
export type WishlistRef = { id: string; productId: string; userId?: string }
export type AddressRef = { id: string }
export type CartItemRef = { id: string; productId: string; quantity: number }

export type ProductWithRelations = {
  id: string
  slug: string
  name: string
  price: number
  category: CategoryRef
  collections: CollectionRef[]
  reviews: ReviewRef[]
  wishlist: WishlistRef[]
}

export type OrderItemRef = { id: string; productId: string; name?: string; quantity: number; price: number }
export type OrderWithItems = { id: string; items: OrderItemRef[] }

export type UserWithRelations = {
  id: string
  name?: string | null
  email: string
  addresses: AddressRef[]
  orders: OrderWithItems[]
  reviews: ReviewRef[]
  cart: CartItemRef[]
  wishlist: WishlistRef[]
}

export type ApiResponse<T> = {
	success: boolean
	data?: T
	error?: string
}


