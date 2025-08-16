import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// Create ring-specific categories
	const categories = await Promise.all([
		prisma.category.upsert({
			where: { slug: 'engagement-rings' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Engagement Rings',
				slug: 'engagement-rings',
				description: 'Handcrafted engagement rings with ethically sourced diamonds',
				image: '/images/products/category-engagement-rings.jpg',
=======
				name: 'Rings',
				slug: 'rings',
				description: 'Beautiful rings for every occasion',
				image: '/images/products/placeholder-ring.svg',
>>>>>>> main
				order: 1,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'wedding-bands' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Wedding Bands',
				slug: 'wedding-bands',
				description: 'Matching wedding bands for your special day',
				image: '/images/products/category-wedding-bands.jpg',
=======
				name: 'Necklaces',
				slug: 'necklaces',
				description: 'Elegant necklaces to complement your style',
				image: '/images/products/placeholder-necklace.svg',
>>>>>>> main
				order: 2,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'eternity-rings' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Eternity Rings',
				slug: 'eternity-rings',
				description: 'Celebrate eternal love with continuous stones',
				image: '/images/products/category-eternity-rings.jpg',
=======
				name: 'Bracelets',
				slug: 'bracelets',
				description: 'Stylish bracelets for your wrist',
				image: '/images/products/placeholder-bracelet.svg',
>>>>>>> main
				order: 3,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'signet-rings' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Signet Rings',
				slug: 'signet-rings',
				description: 'Classic signet rings with custom engraving options',
				image: '/images/products/category-signet-rings.jpg',
=======
				name: 'Earrings',
				slug: 'earrings',
				description: 'Dazzling earrings to frame your face',
				image: '/images/products/placeholder-earrings.svg',
>>>>>>> main
				order: 4,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'statement-rings' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Statement Rings',
				slug: 'statement-rings',
				description: 'Bold designs that express your personality',
				image: '/images/products/category-statement-rings.jpg',
=======
				name: 'Watches',
				slug: 'watches',
				description: 'Luxury timepieces for the discerning collector',
				image: '/images/products/placeholder-watch.svg',
>>>>>>> main
				order: 5,
			},
		}),
		prisma.category.upsert({
			where: { slug: 'stackable-rings' },
			update: {},
			create: {
<<<<<<< HEAD
				name: 'Stackable Rings',
				slug: 'stackable-rings',
				description: 'Delicate rings designed to be worn together',
				image: '/images/products/category-stackable-rings.jpg',
=======
				name: 'Pendants',
				slug: 'pendants',
				description: 'Stunning pendants to adorn your neck',
				image: '/images/products/placeholder-pendant.svg',
>>>>>>> main
				order: 6,
			},
		}),
	])

	console.log('Ring categories created:', categories.length)

	// Create ring products
	const products = await Promise.all([
		// Engagement Rings
		prisma.product.upsert({
			where: { sku: 'ENG-001' },
			update: {},
			create: {
				name: 'Classic Solitaire Engagement Ring',
				slug: 'classic-solitaire-engagement-ring',
				description: 'Handcrafted from locally-sourced 18k gold, featuring a brilliant cut diamond. Each ring is personally crafted from start to finish.',
				price: 3500.00,
				comparePrice: 4200.00,
				cost: 2100.00,
				sku: 'ENG-001',
				barcode: '123456789001',
				quantity: 3,
				weight: 3.2,
				material: '18k Yellow Gold',
				gemstones: '1ct Diamond',
				size: '6.5',
				images: ['/images/products/classic-solitaire-engagement-ring-1.jpg', '/images/products/classic-solitaire-engagement-ring-2.jpg'],
				featured: true,
				categoryId: categories[0].id, // engagement-rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'ENG-002' },
			update: {},
			create: {
				name: 'Vintage-Inspired Halo Ring',
				slug: 'vintage-inspired-halo-ring',
				description: 'A timeless halo design with intricate details, handcrafted using traditional techniques.',
				price: 4200.00,
				comparePrice: 4800.00,
				cost: 2520.00,
				sku: 'ENG-002',
				barcode: '123456789002',
				quantity: 2,
				weight: 4.1,
				material: '18k White Gold',
				gemstones: '1.2ct Diamond + Halo',
				size: '7.0',
				images: ['/images/products/vintage-halo-ring-1.jpg', '/images/products/vintage-halo-ring-2.jpg'],
				featured: true,
				categoryId: categories[0].id, // engagement-rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'ENG-003' },
			update: {},
			create: {
				name: 'Modern Three-Stone Ring',
				slug: 'modern-three-stone-ring',
				description: 'Contemporary three-stone design symbolizing past, present, and future.',
				price: 3800.00,
				comparePrice: 4500.00,
				cost: 2280.00,
				sku: 'ENG-003',
				barcode: '123456789003',
				quantity: 4,
				weight: 3.8,
				material: 'Platinum',
				gemstones: 'Three Diamonds',
				size: '6.5',
				images: ['/images/products/modern-three-stone-ring-1.jpg', '/images/products/modern-three-stone-ring-2.jpg'],
				featured: false,
				categoryId: categories[0].id, // engagement-rings
			},
		}),
		// Wedding Bands
		prisma.product.upsert({
			where: { sku: 'WED-001' },
			update: {},
			create: {
				name: 'Hammered Wedding Band',
				slug: 'hammered-wedding-band',
				description: 'Artisan-textured band, each hammer strike placed by hand for a unique finish.',
				price: 850.00,
				comparePrice: 1100.00,
				cost: 510.00,
				sku: 'WED-001',
				barcode: '123456789004',
				quantity: 8,
				weight: 4.5,
				material: '14k White Gold',
				gemstones: 'None',
				size: '7.0',
				images: ['/images/products/hammered-wedding-band-1.jpg', '/images/products/hammered-wedding-band-2.jpg'],
				featured: true,
				categoryId: categories[1].id, // wedding-bands
			},
		}),
		prisma.product.upsert({
			where: { sku: 'WED-002' },
			update: {},
			create: {
				name: 'Classic Plain Wedding Band',
				slug: 'classic-plain-wedding-band',
				description: 'Timeless simplicity in 18k gold, perfect for everyday wear.',
				price: 650.00,
				comparePrice: 800.00,
				cost: 390.00,
				sku: 'WED-002',
				barcode: '123456789005',
				quantity: 12,
				weight: 3.2,
				material: '18k Yellow Gold',
				gemstones: 'None',
				size: '7.0',
				images: ['/images/products/classic-plain-wedding-band-1.jpg', '/images/products/classic-plain-wedding-band-2.jpg'],
				featured: false,
				categoryId: categories[1].id, // wedding-bands
			},
		}),
		prisma.product.upsert({
			where: { sku: 'WED-003' },
			update: {},
			create: {
				name: 'Diamond Pave Wedding Band',
				slug: 'diamond-pave-wedding-band',
				description: 'Elegant pave setting with small diamonds for added sparkle.',
				price: 1200.00,
				comparePrice: 1500.00,
				cost: 720.00,
				sku: 'WED-003',
				barcode: '123456789006',
				quantity: 6,
				weight: 2.8,
				material: '14k White Gold',
				gemstones: 'Pave Diamonds',
				size: '7.0',
				images: ['/images/products/diamond-pave-wedding-band-1.jpg', '/images/products/diamond-pave-wedding-band-2.jpg'],
				featured: true,
				categoryId: categories[1].id, // wedding-bands
			},
		}),
		// Eternity Rings
		prisma.product.upsert({
			where: { sku: 'ETERN-001' },
			update: {},
			create: {
				name: 'Sapphire Eternity Ring',
				slug: 'sapphire-eternity-ring',
				description: 'A continuous circle of vibrant sapphires, symbolizing eternal love.',
				price: 2200.00,
				comparePrice: 2800.00,
				cost: 1320.00,
				sku: 'ETERN-001',
				barcode: '123456789007',
				quantity: 4,
				weight: 3.5,
				material: '18k White Gold',
				gemstones: 'Sapphires',
				size: '7.0',
				images: ['/images/products/sapphire-eternity-ring-1.jpg', '/images/products/sapphire-eternity-ring-2.jpg'],
				featured: true,
				categoryId: categories[2].id, // eternity-rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'ETERN-002' },
			update: {},
			create: {
				name: 'Diamond Eternity Ring',
				slug: 'diamond-eternity-ring',
				description: 'Full eternity band with brilliant cut diamonds in a classic setting.',
				price: 2800.00,
				comparePrice: 3500.00,
				cost: 1680.00,
				sku: 'ETERN-002',
				barcode: '123456789008',
				quantity: 3,
				weight: 2.9,
				material: 'Platinum',
				gemstones: 'Diamonds',
				size: '7.0',
				images: ['/images/products/diamond-eternity-ring-1.jpg', '/images/products/diamond-eternity-ring-2.jpg'],
				featured: false,
				categoryId: categories[2].id, // eternity-rings
			},
		}),
		// Signet Rings
		prisma.product.upsert({
			where: { sku: 'SIGNET-001' },
			update: {},
			create: {
				name: 'Classic Signet Ring',
				slug: 'classic-signet-ring',
				description: 'Traditional signet ring with space for custom engraving.',
				price: 450.00,
				comparePrice: 600.00,
				cost: 270.00,
				sku: 'SIGNET-001',
				barcode: '123456789009',
				quantity: 10,
				weight: 8.2,
				material: '18k Yellow Gold',
				gemstones: 'None',
				size: '10.0',
				images: ['/images/products/classic-signet-ring-1.jpg', '/images/products/classic-signet-ring-2.jpg'],
				featured: false,
				categoryId: categories[3].id, // signet-rings
			},
		}),
		// Statement Rings
		prisma.product.upsert({
			where: { sku: 'STAT-001' },
			update: {},
			create: {
				name: 'Emerald Statement Ring',
				slug: 'emerald-statement-ring',
				description: 'Bold emerald center stone with diamond accents in a modern setting.',
				price: 1800.00,
				comparePrice: 2200.00,
				cost: 1080.00,
				sku: 'STAT-001',
				barcode: '123456789010',
				quantity: 2,
				weight: 5.1,
				material: '18k Yellow Gold',
				gemstones: 'Emerald + Diamonds',
				size: '7.0',
				images: ['/images/products/emerald-statement-ring-1.jpg', '/images/products/emerald-statement-ring-2.jpg'],
				featured: true,
				categoryId: categories[4].id, // statement-rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'STAT-002' },
			update: {},
			create: {
				name: 'Ruby Cocktail Ring',
				slug: 'ruby-cocktail-ring',
				description: 'Dramatic ruby cocktail ring perfect for special occasions.',
				price: 1600.00,
				comparePrice: 2000.00,
				cost: 960.00,
				sku: 'STAT-002',
				barcode: '123456789011',
				quantity: 3,
				weight: 4.8,
				material: '18k White Gold',
				gemstones: 'Ruby + Diamonds',
				size: '7.0',
				images: ['/images/products/ruby-cocktail-ring-1.jpg', '/images/products/ruby-cocktail-ring-2.jpg'],
				featured: false,
				categoryId: categories[4].id, // statement-rings
			},
		}),
		// Stackable Rings
		prisma.product.upsert({
			where: { sku: 'STACK-001' },
			update: {},
			create: {
				name: 'Minimalist Gold Band',
				slug: 'minimalist-gold-band',
				description: 'Simple yet elegant, perfect for everyday wear or stacking.',
				price: 450.00,
				comparePrice: 600.00,
				cost: 270.00,
				sku: 'STACK-001',
				barcode: '123456789012',
				quantity: 15,
				weight: 2.1,
				material: '18k Rose Gold',
				gemstones: 'None',
				size: '7.0',
				images: ['/images/products/minimalist-gold-band-1.jpg', '/images/products/minimalist-gold-band-2.jpg'],
				featured: true,
				categoryId: categories[5].id, // stackable-rings
			},
		}),
		prisma.product.upsert({
			where: { sku: 'STACK-002' },
			update: {},
			create: {
				name: 'Diamond Accent Band',
				slug: 'diamond-accent-band',
				description: 'Delicate band with small diamond accents, perfect for stacking.',
				price: 750.00,
				comparePrice: 950.00,
				cost: 450.00,
				sku: 'STACK-002',
				barcode: '123456789013',
				quantity: 8,
				weight: 1.8,
				material: '14k White Gold',
				gemstones: 'Small Diamonds',
				size: '7.0',
				images: ['/images/products/diamond-accent-band-1.jpg', '/images/products/diamond-accent-band-2.jpg'],
				featured: false,
				categoryId: categories[5].id, // stackable-rings
			},
		}),
	])

	console.log('Ring products created:', products.length)

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

	console.log('Ring-focused database seeded successfully!')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})


