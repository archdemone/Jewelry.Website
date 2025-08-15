import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// Create categories
	const categories = await Promise.all([
		prisma.category.upsert({
			where: { slug: 'rings' },
			update: {},
			create: {
				name: 'Rings',
				slug: 'rings',
				description: 'Beautiful rings for every occasion',
				image: '/images/products/category-rings.jpg',
				order: 1,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'necklaces' },
			update: {},
			create: {
				name: 'Necklaces',
				slug: 'necklaces',
				description: 'Elegant necklaces to complement your style',
				image: '/images/products/category-necklaces.jpg',
				order: 2,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'bracelets' },
			update: {},
			create: {
				name: 'Bracelets',
				slug: 'bracelets',
				description: 'Stylish bracelets for your wrist',
				image: '/images/products/category-bracelets.jpg',
				order: 3,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'earrings' },
			update: {},
			create: {
				name: 'Earrings',
				slug: 'earrings',
				description: 'Dazzling earrings to frame your face',
				image: '/images/products/category-earrings.jpg',
				order: 4,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'watches' },
			update: {},
			create: {
				name: 'Watches',
				slug: 'watches',
				description: 'Luxury timepieces for the discerning collector',
				image: '/images/products/category-watches.jpg',
				order: 5,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'pendants' },
			update: {},
			create: {
				name: 'Pendants',
				slug: 'pendants',
				description: 'Stunning pendants to adorn your neck',
				image: '/images/products/category-pendants.jpg',
				order: 6,
			},
		}),
	])

	console.log('Categories created:', categories.length)

	// Create products
	const products = await Promise.all([
		prisma.product.upsert({
			where: { sku: 'RING-001' },
			update: {},
			create: {
				name: 'Diamond Solitaire Ring',
				slug: 'diamond-solitaire-ring',
				description: 'A stunning 1-carat diamond solitaire ring set in 18k white gold.',
				price: 2999.99,
				comparePrice: 3499.99,
				cost: 1800.00,
				sku: 'RING-001',
				barcode: '123456789012',
				quantity: 5,
				weight: 3.2,
				material: '18k White Gold',
				gemstones: 'Diamond',
				size: '6.5',
				images: ['/images/products/diamond-solitaire-ring-1.jpg', '/images/products/diamond-solitaire-ring-2.jpg', '/images/products/diamond-solitaire-ring-3.jpg'],
				featured: true,
				categoryId: categories[0].id, // rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'NECK-001' },
			update: {},
			create: {
				name: 'Gold Chain Necklace',
				slug: 'gold-chain-necklace',
				description: 'A classic 18k gold chain necklace, perfect for everyday wear.',
				price: 899.99,
				comparePrice: 1099.99,
				cost: 540.00,
				sku: 'NECK-001',
				barcode: '123456789013',
				quantity: 8,
				weight: 8.5,
				material: '18k Yellow Gold',
				size: '18"',
				images: ['/images/products/gold-chain-necklace-1.jpg', '/images/products/gold-chain-necklace-2.jpg'],
				featured: true,
				categoryId: categories[1].id, // necklaces
			},
		}),
		prisma.product.upsert({
			where: { sku: 'BRAC-001' },
			update: {},
			create: {
				name: 'Tennis Bracelet',
				slug: 'tennis-bracelet',
				description: 'A dazzling tennis bracelet featuring round-cut diamonds.',
				price: 2499.99,
				comparePrice: 2999.99,
				cost: 1500.00,
				sku: 'BRAC-001',
				barcode: '123456789014',
				quantity: 3,
				weight: 12.8,
				material: '14k White Gold',
				gemstones: 'Diamond',
				size: '7"',
				images: ['/images/products/tennis-bracelet-1.jpg', '/images/products/tennis-bracelet-2.jpg'],
				featured: true,
				categoryId: categories[2].id, // bracelets
			},
		}),
		prisma.product.upsert({
			where: { sku: 'EARR-001' },
			update: {},
			create: {
				name: 'Pearl Drop Earrings',
				slug: 'pearl-drop-earrings',
				description: 'Elegant freshwater pearl drop earrings with sterling silver.',
				price: 299.99,
				comparePrice: 399.99,
				cost: 120.00,
				sku: 'EARR-001',
				barcode: '123456789015',
				quantity: 12,
				weight: 4.2,
				material: 'Sterling Silver',
				gemstones: 'Freshwater Pearl',
				images: ['/images/products/pearl-drop-earrings-1.jpg', '/images/products/pearl-drop-earrings-2.jpg'],
				featured: false,
				categoryId: categories[3].id, // earrings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'WATCH-001' },
			update: {},
			create: {
				name: 'Luxury Automatic Watch',
				slug: 'luxury-automatic-watch',
				description: 'A sophisticated automatic watch with premium craftsmanship.',
				price: 4999.99,
				comparePrice: 5999.99,
				cost: 2500.00,
				sku: 'WATCH-001',
				barcode: '123456789016',
				quantity: 2,
				weight: 85.0,
				material: 'Stainless Steel',
				size: '42mm',
				images: ['/images/products/luxury-automatic-watch-1.jpg', '/images/products/luxury-automatic-watch-2.jpg'],
				featured: true,
				categoryId: categories[4].id, // watches
			},
		}),
	])

	console.log('Products created:', products.length)

	// Create a sample user
	const user = await prisma.user.upsert({
		where: { email: 'demo@example.com' },
		update: {},
		create: {
			email: 'demo@example.com',
			name: 'Demo User',
			password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhqKre', // password: demo123
			role: 'CUSTOMER',
		},
	})

	console.log('Demo user created:', user.email)

	console.log('Database seeded successfully!')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})


