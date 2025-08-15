import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Fetch all products
	const products = await db.product.findMany({
		where: { active: true },
		select: { slug: true, updatedAt: true },
	})

	// Fetch all categories
	const categories = await db.category.findMany({
		select: { slug: true, updatedAt: true },
	})

	// Blog posts are static in this demo; include known slugs with a recent date
	const posts: { slug: string; updatedAt: Date }[] = [
		{ slug: 'care-tips', updatedAt: new Date() },
		{ slug: 'ring-sizing', updatedAt: new Date() },
	]

	const baseUrl = 'https://yourjewelrystore.com'

	const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${baseUrl}/products/${product.slug}`,
		lastModified: product.updatedAt,
		changeFrequency: 'weekly',
		priority: 0.8,
	}))

	const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
		url: `${baseUrl}/products?category=${category.slug}`,
		lastModified: category.updatedAt,
		changeFrequency: 'weekly',
		priority: 0.7,
	}))

	const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.updatedAt,
		changeFrequency: 'monthly',
		priority: 0.6,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${baseUrl}/products`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		...productUrls,
		...categoryUrls,
		...blogUrls,
	]
}