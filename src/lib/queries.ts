import { db } from './db'
import type { ProductWithRelations } from '@/types'

export async function getFeaturedProducts(limit = 4): Promise<ProductWithRelations[]> {
	return db.product.findMany({
		where: { featured: true }, // Removed active filter temporarily
		take: limit,
		orderBy: { createdAt: 'desc' },
		include: { category: true, collections: true, reviews: true, wishlist: true },
	}) as any
}

export async function getPaginatedProducts({
	page = 1,
	pageSize = 24,
	q,
	categorySlug,
	minPrice,
	maxPrice,
	sort = 'new',
}: {
	page?: number
	pageSize?: number
	q?: string
	categorySlug?: string
	minPrice?: number
	maxPrice?: number
	sort?: 'new' | 'price-asc' | 'price-desc'
}) {
	const skip = (page - 1) * pageSize
	const where: any = {} // Removed active filter temporarily
	if (q && q.trim()) {
		where.OR = [
			{ name: { contains: q, mode: 'insensitive' } },
			{ description: { contains: q, mode: 'insensitive' } },
		]
	}
	if (categorySlug) {
		where.category = { slug: categorySlug }
	}
	if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
		where.price = {}
		if (typeof minPrice === 'number') where.price.gte = minPrice
		if (typeof maxPrice === 'number') where.price.lte = maxPrice
	}

	let orderBy: any = { createdAt: 'desc' }
	if (sort === 'price-asc') orderBy = { price: 'asc' }
	if (sort === 'price-desc') orderBy = { price: 'desc' }

	const [items, total] = await Promise.all([
		db.product.findMany({
			skip,
			take: pageSize,
			where,
			orderBy,
			include: { category: true },
		}),
		db.product.count({ where }),
	])

	return {
		items,
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize),
	}
}

export async function getProductBySlug(slug: string) {
	return db.product.findUnique({ where: { slug }, include: { category: true, reviews: true } })
}

export async function getAllCategories() {
	return db.category.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 6) {
	return db.product.findMany({
		where: { categoryId, NOT: { id: productId } }, // Removed active filter temporarily
		take: limit,
		orderBy: { createdAt: 'desc' },
	})
}

