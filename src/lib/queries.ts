import { db } from './db'
import type { ProductWithRelations } from '@/types'

export async function getFeaturedProducts(limit = 4): Promise<ProductWithRelations[]> {
	return db.product.findMany({
		where: { featured: true, active: true },
		take: limit,
		include: { category: true, collections: true, reviews: true, wishlist: true },
	}) as any
}


