import { PrismaClient } from '@prisma/client';
import { UserRole } from '../src/types/enums';
import { stringifyImages } from '../src/lib/utils/json-helpers';

const prisma = new PrismaClient();

async function main() {
  // Create ring-specific categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'engagement-rings' },
      update: {},
      create: {
        name: 'Engagement Rings',
        slug: 'engagement-rings',
        description: 'Handcrafted engagement rings with ethically sourced diamonds',
        image: '/images/MyImages/category-engagement-rings.jpg',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wedding-bands' },
      update: {},
      create: {
        name: 'Wedding Bands',
        slug: 'wedding-bands',
        description: 'Matching wedding bands for your special day',
        image: '/images/MyImages/category-wedding-bands.jpg',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'eternity-rings' },
      update: {},
      create: {
        name: 'Eternity Rings',
        slug: 'eternity-rings',
        description: 'Celebrate eternal love with continuous stones',
        image: '/images/MyImages/category-eternity-rings.jpg',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'signet-rings' },
      update: {},
      create: {
        name: 'Signet Rings',
        slug: 'signet-rings',
        description: 'Classic signet rings with custom engraving options',
        image: '/images/MyImages/category-signet-rings.jpg',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'statement-rings' },
      update: {},
      create: {
        name: 'Statement Rings',
        slug: 'statement-rings',
        description: 'Bold designs that express your personality',
        image: '/images/MyImages/category-statement-rings.jpg',
        order: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'stackable-rings' },
      update: {},
      create: {
        name: 'Stackable Rings',
        slug: 'stackable-rings',
        description: 'Delicate rings designed to be worn together',
        image: '/images/MyImages/category-stackable-rings.jpg',
        order: 6,
      },
    }),
  ]);

  console.log('Ring categories created:', categories.length);

  // Create ring products
  const products = await Promise.all([
    // Engagement Rings
    prisma.product.upsert({
      where: { sku: 'ENG-001' },
      update: {},
      create: {
        name: 'Classic Solitaire Engagement Ring',
        slug: 'classic-solitaire-engagement-ring',
        description:
          'Handcrafted from locally-sourced 18k gold, featuring a brilliant cut diamond. Each ring is personally crafted from start to finish.',
        price: 3500.0,
        comparePrice: 4200.0,
        cost: 2100.0,
        sku: 'ENG-001',
        barcode: '123456789001',
        quantity: 3,
        weight: 3.2,
        material: '18k Yellow Gold',
        gemstones: '1ct Diamond',
        size: '6.5',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0000.jpg',
          '/images/MyImages/IMG-20250816-WA0001.jpg',
        ]),
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
        description:
          'A timeless halo design with intricate details, handcrafted using traditional techniques.',
        price: 4200.0,
        comparePrice: 4800.0,
        cost: 2520.0,
        sku: 'ENG-002',
        barcode: '123456789002',
        quantity: 2,
        weight: 4.1,
        material: '18k White Gold',
        gemstones: '1.2ct Diamond + Halo',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0002.jpg',
          '/images/MyImages/IMG-20250816-WA0003.jpg',
        ]),
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
        price: 3800.0,
        comparePrice: 4500.0,
        cost: 2280.0,
        sku: 'ENG-003',
        barcode: '123456789003',
        quantity: 4,
        weight: 3.8,
        material: 'Platinum',
        gemstones: 'Three Diamonds',
        size: '6.5',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0004.jpg',
          '/images/MyImages/IMG-20250816-WA0005.jpg',
        ]),
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
        description:
          'Artisan-textured band, each hammer strike placed by hand for a unique finish.',
        price: 850.0,
        comparePrice: 1100.0,
        cost: 510.0,
        sku: 'WED-001',
        barcode: '123456789004',
        quantity: 8,
        weight: 4.5,
        material: '14k White Gold',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0006.jpg',
          '/images/MyImages/IMG-20250816-WA0007.jpg',
        ]),
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
        price: 650.0,
        comparePrice: 800.0,
        cost: 390.0,
        sku: 'WED-002',
        barcode: '123456789005',
        quantity: 12,
        weight: 3.2,
        material: '18k Yellow Gold',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0008.jpg',
          '/images/MyImages/IMG-20250816-WA0009.jpg',
        ]),
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
        price: 1200.0,
        comparePrice: 1500.0,
        cost: 720.0,
        sku: 'WED-003',
        barcode: '123456789006',
        quantity: 6,
        weight: 2.8,
        material: '14k White Gold',
        gemstones: 'Pave Diamonds',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0010.jpg',
          '/images/MyImages/IMG-20250816-WA0011.jpg',
        ]),
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
        price: 2200.0,
        comparePrice: 2800.0,
        cost: 1320.0,
        sku: 'ETERN-001',
        barcode: '123456789007',
        quantity: 4,
        weight: 3.5,
        material: '18k White Gold',
        gemstones: 'Sapphires',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0012.jpg',
          '/images/MyImages/IMG-20250816-WA0013.jpg',
        ]),
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
        price: 2800.0,
        comparePrice: 3500.0,
        cost: 1680.0,
        sku: 'ETERN-002',
        barcode: '123456789008',
        quantity: 3,
        weight: 2.9,
        material: 'Platinum',
        gemstones: 'Diamonds',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0014.jpg',
          '/images/MyImages/IMG-20250816-WA0015.jpg',
        ]),
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
        price: 450.0,
        comparePrice: 600.0,
        cost: 270.0,
        sku: 'SIGNET-001',
        barcode: '123456789009',
        quantity: 10,
        weight: 8.2,
        material: '18k Yellow Gold',
        gemstones: 'None',
        size: '10.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0016.jpg',
          '/images/MyImages/IMG-20250816-WA0017.jpg',
        ]),
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
        price: 1800.0,
        comparePrice: 2200.0,
        cost: 1080.0,
        sku: 'STAT-001',
        barcode: '123456789010',
        quantity: 2,
        weight: 5.1,
        material: '18k Yellow Gold',
        gemstones: 'Emerald + Diamonds',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0018.jpg',
          '/images/MyImages/IMG-20250816-WA0019.jpg',
        ]),
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
        price: 1600.0,
        comparePrice: 2000.0,
        cost: 960.0,
        sku: 'STAT-002',
        barcode: '123456789011',
        quantity: 3,
        weight: 4.8,
        material: '18k White Gold',
        gemstones: 'Ruby + Diamonds',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0020.jpg',
          '/images/MyImages/IMG-20250816-WA0021.jpg',
        ]),
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
        price: 450.0,
        comparePrice: 600.0,
        cost: 270.0,
        sku: 'STACK-001',
        barcode: '123456789012',
        quantity: 15,
        weight: 2.1,
        material: '18k Rose Gold',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0022.jpg',
          '/images/MyImages/IMG-20250816-WA0023.jpg',
        ]),
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
        price: 750.0,
        comparePrice: 950.0,
        cost: 450.0,
        sku: 'STACK-002',
        barcode: '123456789013',
        quantity: 8,
        weight: 1.8,
        material: '14k White Gold',
        gemstones: 'Small Diamonds',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0024.jpg',
          '/images/MyImages/IMG-20250816-WA0025.jpg',
        ]),
        featured: false,
        categoryId: categories[5].id, // stackable-rings
      },
    }),
  ]);

  console.log('Ring products created:', products.length);

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhqKre', // password: demo123
      role: UserRole.CUSTOMER,
    },
  });

  console.log('Demo user created:', user.email);

  console.log('Ring-focused database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
