import { PrismaClient, Role, AddressType, OrderStatus, PaymentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const passwordHash = await bcrypt.hash('admin123', 10)

	// Categories
	const categoryData = [
		{ name: 'Rings', slug: 'rings' },
		{ name: 'Necklaces', slug: 'necklaces' },
		{ name: 'Bracelets', slug: 'bracelets' },
		{ name: 'Earrings', slug: 'earrings' },
		{ name: 'Watches', slug: 'watches' },
		{ name: 'Pendants', slug: 'pendants' },
	]

	const categories = await Promise.all(
		categoryData.map((c, i) =>
			prisma.category.upsert({
				where: { slug: c.slug },
				update: {},
				create: { ...c, order: i },
			})
		)
	)

	// Admin user
	const admin = await prisma.user.upsert({
		where: { email: 'admin@jewelry.com' },
		update: {},
		create: {
			email: 'admin@jewelry.com',
			name: 'Admin',
			password: passwordHash,
			role: Role.ADMIN,
			addresses: {
				create: [
					{
						type: AddressType.SHIPPING,
						isDefault: true,
						firstName: 'Admin',
						lastName: 'User',
						address1: '123 Market St',
						city: 'San Francisco',
						state: 'CA',
						postalCode: '94103',
						country: 'US',
					},
				],
			},
		},
	})

	// Products
	const sampleProducts = Array.from({ length: 12 }).map((_, i) => {
		const cat = categories[i % categories.length]
		return {
			name: `Sample Jewelry ${i + 1}`,
			slug: `sample-jewelry-${i + 1}`,
			description: 'Elegant handcrafted piece with meticulous detail.',
			price: 199 + i * 10,
			comparePrice: i % 3 === 0 ? 249 + i * 10 : null,
			cost: 90 + i * 5,
			sku: `SKU-${1000 + i}`,
			trackQuantity: true,
			quantity: 10 + i,
			material: ['Gold 14k', 'Sterling Silver', 'Platinum', 'Rose Gold'][i % 4],
			gemstones: ['Diamond', 'Ruby', 'Sapphire', 'Emerald'][i % 4],
			size: i % 2 === 0 ? '7' : null,
			images: [
				`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60`,
			],
			featured: i < 4,
			active: true,
			categoryId: cat.id,
			metadata: { warranty: '1 year', origin: 'Italy' },
		}
	})

	await prisma.product.createMany({ data: sampleProducts })

	// Sample review
	const anyProduct = await prisma.product.findFirst()
	if (anyProduct) {
		await prisma.review.upsert({
			where: { productId_userId: { productId: anyProduct.id, userId: admin.id } },
			update: {},
			create: {
				productId: anyProduct.id,
				userId: admin.id,
				rating: 5,
				comment: 'Absolutely stunning craftsmanship!',
				verified: true,
			},
		})
	}

	console.log('Seed complete:', {
		categories: categories.length,
		admin: admin.email,
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})


