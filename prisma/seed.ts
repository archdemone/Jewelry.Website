import { PrismaClient } from '@prisma/client';
import { UserRole } from '../src/types/enums';
import { stringifyImages } from '../src/lib/utils/json-helpers';

const prisma = new PrismaClient();

async function main() {
  // First, delete all existing products to start fresh
  console.log('Deleting all existing products...');
  await prisma.product.deleteMany({});
  console.log('All existing products deleted.');

  // Create ring-specific categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'all-rings' },
      update: {},
      create: {
        name: 'All Rings',
        slug: 'all-rings',
        description: 'Browse our complete collection of handcrafted rings',
        image: '/images/categories/allrings/allrings.webp',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mens-rings' },
      update: {},
      create: {
        name: 'Mens Rings',
        slug: 'mens-rings',
        description: 'Handcrafted rings designed specifically for men',
        image: '/images/categories/mensrings/mensrings.webp',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'womens-rings' },
      update: {},
      create: {
        name: 'Womens Rings',
        slug: 'womens-rings',
        description: 'Elegant rings crafted for women',
        image: '/images/categories/womensrings/womensrings.webp',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'unisex-rings' },
      update: {},
      create: {
        name: 'Unisex Rings',
        slug: 'unisex-rings',
        description: 'Versatile ring designs perfect for anyone',
        image: '/images/categories/unisex/unisex.webp',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wedding-rings' },
      update: {},
      create: {
        name: 'Wedding Rings',
        slug: 'wedding-rings',
        description: 'Beautiful wedding rings for your special day',
        image: '/images/categories/wedding/wedding.webp',
        order: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'engagement-rings' },
      update: {},
      create: {
        name: 'Engagement Rings',
        slug: 'engagement-rings',
        description: 'Handcrafted engagement rings with ethically sourced diamonds',
        image: '/images/categories/engagement/engagement.webp',
        order: 6,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'inlay-rings' },
      update: {},
      create: {
        name: 'Inlay Rings',
        slug: 'inlay-rings',
        description: 'Unique rings featuring beautiful inlay work',
        image: '/images/categories/inlay/inlay.webp',
        order: 7,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'statement-rings' },
      update: {},
      create: {
        name: 'Statement Rings',
        slug: 'statement-rings',
        description: 'Bold designs that express your personality',
        image: '/images/categories/statement/statement.webp',
        order: 8,
      },
    }),
  ]);

  console.log('Ring categories created:', categories.length);

  // Product images array (using .webp files from products directory)
  const productImages = [
    '/images/products/1.webp',
    '/images/products/2.webp',
    '/images/products/3.webp',
    '/images/products/4.webp',
    '/images/products/5.webp',
    '/images/products/6.webp',
    '/images/products/IMG-20250816-WA0000.webp',
    '/images/products/IMG-20250816-WA0001.webp',
    '/images/products/IMG-20250816-WA0002.webp',
    '/images/products/IMG-20250816-WA0003.webp',
    '/images/products/IMG-20250816-WA0004.webp',
    '/images/products/IMG-20250816-WA0005.webp',
    '/images/products/IMG-20250816-WA0006.webp',
    '/images/products/IMG-20250816-WA0007.webp',
    '/images/products/IMG-20250816-WA0008.webp',
    '/images/products/IMG-20250816-WA0009.webp',
    '/images/products/IMG-20250816-WA0011.webp',
    '/images/products/IMG-20250816-WA0012.webp',
    '/images/products/IMG-20250816-WA0013.webp',
    '/images/products/IMG-20250816-WA0014.webp',
    '/images/products/IMG-20250816-WA0015.webp',
    '/images/products/IMG-20250816-WA0016.webp',
    '/images/products/IMG-20250816-WA0017.webp',
    '/images/products/IMG-20250816-WA0018.webp',
    '/images/products/IMG-20250816-WA0019.webp',
    '/images/products/IMG-20250816-WA0020.webp',
    '/images/products/IMG-20250816-WA0021.webp',
    '/images/products/IMG-20250816-WA0022.webp',
    '/images/products/IMG-20250816-WA0023.webp',
    '/images/products/IMG-20250816-WA0024.webp',
    '/images/products/IMG-20250816-WA0025.webp',
    '/images/products/IMG-20250816-WA0026.webp',
    '/images/products/IMG-20250816-WA0027.webp',
    '/images/products/IMG-20250816-WA0028.webp',
    '/images/products/IMG-20250816-WA0029.webp',
    '/images/products/IMG-20250816-WA0030.webp',
    '/images/products/IMG-20250816-WA0031.webp',
    '/images/products/IMG-20250816-WA0032.webp',
    '/images/products/IMG-20250816-WA0033.webp',
    '/images/products/IMG-20250816-WA0034.webp',
    '/images/products/IMG-20250816-WA0035.webp',
    '/images/products/IMG-20250816-WA0036.webp',
    '/images/products/IMG-20250816-WA0037.webp',
    '/images/products/IMG-20250816-WA0038.webp',
    '/images/products/IMG-20250816-WA0039.webp',
  ];

  // Helper function to get random image
  const getRandomImage = () => {
    return productImages[Math.floor(Math.random() * productImages.length)];
  };

  // Create products for each category
  const products = await Promise.all([
    // MENS RINGS (categories[1] = mens-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Classic Damascus Dark Red Mens Ring',
        slug: 'classic-damascus-dark-red-mens-ring',
        description: 'Handcrafted Damascus steel ring with dark red gem inlay, perfect for the modern man who appreciates bold design and durability.',
        price: 85.0,
        comparePrice: 100.0,
        cost: 40.0,
        sku: 'MEN-001',
        barcode: '123456789001',
        quantity: 5,
        weight: 6.2,
        material: 'Damascus',
        gemstones: 'Dark Red Gem',
        size: '10.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[1].id, // mens-rings
        rating: 4.8,
        reviewCount: 24,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Titanium Bright Blue Mens Ring',
        slug: 'titanium-bright-blue-mens-ring',
        description: 'Lightweight titanium ring with bright blue gemstone, offering both style and comfort for everyday wear.',
        price: 75.0,
        comparePrice: 90.0,
        cost: 35.0,
        sku: 'MEN-002',
        barcode: '123456789002',
        quantity: 8,
        weight: 3.1,
        material: 'Titanium',
        gemstones: 'Bright Blue Gem',
        size: '10.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[1].id, // mens-rings
        rating: 4.6,
        reviewCount: 18,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Carbon Fiber Mixed Green Mens Ring',
        slug: 'carbon-fiber-mixed-green-mens-ring',
        description: 'Modern carbon fiber ring with mixed green gemstone inlay, perfect for the tech-savvy individual.',
        price: 65.0,
        comparePrice: 80.0,
        cost: 30.0,
        sku: 'MEN-003',
        barcode: '123456789003',
        quantity: 10,
        weight: 1.2,
        material: 'Carbon',
        gemstones: 'Mixed Green Gem',
        size: '10.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[1].id, // mens-rings
        rating: 4.7,
        reviewCount: 22,
        badge: 'Ready to Ship',
      },
    }),

    // WOMENS RINGS (categories[2] = womens-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Elegant Silver Dark Purple Womens Ring',
        slug: 'elegant-silver-dark-purple-womens-ring',
        description: 'Timeless silver ring with dark purple gemstone inlay, perfect for any occasion.',
        price: 95.0,
        comparePrice: 110.0,
        cost: 45.0,
        sku: 'WOM-001',
        barcode: '123456789004',
        quantity: 6,
        weight: 4.2,
        material: 'Silver',
        gemstones: 'Dark Purple Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[2].id, // womens-rings
        rating: 4.9,
        reviewCount: 31,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gold Bright Yellow Womens Ring',
        slug: 'gold-bright-yellow-womens-ring',
        description: 'Luxurious gold ring with bright yellow gemstone, adding warmth and elegance to any outfit.',
        price: 115.0,
        comparePrice: 130.0,
        cost: 55.0,
        sku: 'WOM-002',
        barcode: '123456789005',
        quantity: 4,
        weight: 3.8,
        material: 'Gold',
        gemstones: 'Bright Yellow Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[2].id, // womens-rings
        rating: 4.8,
        reviewCount: 27,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Ceramic White Mixed Red Womens Ring',
        slug: 'ceramic-white-mixed-red-womens-ring',
        description: 'Sleek white ceramic ring with mixed red gemstone, offering a modern and sophisticated look.',
        price: 85.0,
        comparePrice: 100.0,
        cost: 40.0,
        sku: 'WOM-003',
        barcode: '123456789006',
        quantity: 7,
        weight: 2.5,
        material: 'Ceramic(white)',
        gemstones: 'Mixed Red Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[2].id, // womens-rings
        rating: 4.7,
        reviewCount: 19,
        badge: 'Ready to Ship',
      },
    }),

    // UNISEX RINGS (categories[3] = unisex-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Modern Silver Mixed Red and Yellow Unisex Ring',
        slug: 'modern-silver-mixed-red-yellow-unisex-ring',
        description: 'Contemporary silver ring featuring a stunning combination of mixed red and yellow gemstones.',
        price: 90.0,
        comparePrice: 105.0,
        cost: 42.0,
        sku: 'UNI-001',
        barcode: '123456789007',
        quantity: 8,
        weight: 3.5,
        material: 'Silver',
        gemstones: 'Mixed Red & Yellow Gems',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[3].id, // unisex-rings
        rating: 4.8,
        reviewCount: 25,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Carbon Fiber Bright Blue Unisex Ring',
        slug: 'carbon-fiber-bright-blue-unisex-ring',
        description: 'Lightweight carbon fiber ring with bright blue gemstone, perfect for active lifestyles.',
        price: 70.0,
        comparePrice: 85.0,
        cost: 33.0,
        sku: 'UNI-002',
        barcode: '123456789008',
        quantity: 12,
        weight: 1.8,
        material: 'Carbon',
        gemstones: 'Bright Blue Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[3].id, // unisex-rings
        rating: 4.6,
        reviewCount: 16,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Tungsten Dark Green Unisex Ring',
        slug: 'tungsten-dark-green-unisex-ring',
        description: 'Durable tungsten ring with dark green gemstone, offering both style and strength.',
        price: 80.0,
        comparePrice: 95.0,
        cost: 38.0,
        sku: 'UNI-003',
        barcode: '123456789009',
        quantity: 6,
        weight: 4.8,
        material: 'Tungsten',
        gemstones: 'Dark Green Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[3].id, // unisex-rings
        rating: 4.7,
        reviewCount: 21,
        badge: 'Ready to Ship',
      },
    }),

    // WEDDING RINGS (categories[4] = wedding-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Classic Gold Bright Red Wedding Ring',
        slug: 'classic-gold-bright-red-wedding-ring',
        description: 'Timeless gold wedding ring with bright red gemstone, symbolizing love and commitment.',
        price: 110.0,
        comparePrice: 125.0,
        cost: 52.0,
        sku: 'WED-001',
        barcode: '123456789010',
        quantity: 4,
        weight: 4.2,
        material: 'Gold',
        gemstones: 'Bright Red Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[4].id, // wedding-rings
        rating: 4.9,
        reviewCount: 35,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silver Mixed Blue Wedding Ring',
        slug: 'silver-mixed-blue-wedding-ring',
        description: 'Elegant silver wedding ring with mixed blue gemstone, perfect for a modern ceremony.',
        price: 95.0,
        comparePrice: 110.0,
        cost: 45.0,
        sku: 'WED-002',
        barcode: '123456789011',
        quantity: 6,
        weight: 3.8,
        material: 'Silver',
        gemstones: 'Mixed Blue Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[4].id, // wedding-rings
        rating: 4.8,
        reviewCount: 28,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Damascus Steel Dark Purple Wedding Ring',
        slug: 'damascus-steel-dark-purple-wedding-ring',
        description: 'Unique Damascus steel wedding ring with dark purple gemstone, for couples who want something extraordinary.',
        price: 105.0,
        comparePrice: 120.0,
        cost: 50.0,
        sku: 'WED-003',
        barcode: '123456789012',
        quantity: 3,
        weight: 5.5,
        material: 'Damascus',
        gemstones: 'Dark Purple Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[4].id, // wedding-rings
        rating: 4.9,
        reviewCount: 32,
        badge: 'Ready to Ship',
      },
    }),

    // ENGAGEMENT RINGS (categories[5] = engagement-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Classic Gold Bright Yellow Engagement Ring',
        slug: 'classic-gold-bright-yellow-engagement-ring',
        description: 'Traditional gold engagement ring with bright yellow gemstone, perfect for your special moment.',
        price: 120.0,
        comparePrice: 135.0,
        cost: 57.0,
        sku: 'ENG-001',
        barcode: '123456789013',
        quantity: 3,
        weight: 4.5,
        material: 'Gold',
        gemstones: 'Bright Yellow Gem',
        size: '6.5',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[5].id, // engagement-rings
        rating: 4.9,
        reviewCount: 38,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silver Mixed Red Engagement Ring',
        slug: 'silver-mixed-red-engagement-ring',
        description: 'Elegant silver engagement ring with mixed red gemstone, symbolizing passion and love.',
        price: 100.0,
        comparePrice: 115.0,
        cost: 47.0,
        sku: 'ENG-002',
        barcode: '123456789014',
        quantity: 5,
        weight: 3.9,
        material: 'Silver',
        gemstones: 'Mixed Red Gem',
        size: '6.5',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[5].id, // engagement-rings
        rating: 4.8,
        reviewCount: 26,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Titanium Dark Blue Engagement Ring',
        slug: 'titanium-dark-blue-engagement-ring',
        description: 'Modern titanium engagement ring with dark blue gemstone, perfect for contemporary couples.',
        price: 110.0,
        comparePrice: 125.0,
        cost: 52.0,
        sku: 'ENG-003',
        barcode: '123456789015',
        quantity: 4,
        weight: 3.2,
        material: 'Titanium',
        gemstones: 'Dark Blue Gem',
        size: '6.5',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[5].id, // engagement-rings
        rating: 4.7,
        reviewCount: 23,
        badge: 'Ready to Ship',
      },
    }),

    // INLAY RINGS (categories[6] = inlay-rings) - 3 products
    prisma.product.create({
      data: {
        name: 'Damascus Steel Mixed Green Inlay Ring',
        slug: 'damascus-steel-mixed-green-inlay-ring',
        description: 'Artisan Damascus steel ring with intricate mixed green gemstone inlay work.',
        price: 115.0,
        comparePrice: 130.0,
        cost: 55.0,
        sku: 'INL-001',
        barcode: '123456789016',
        quantity: 3,
        weight: 5.8,
        material: 'Damascus',
        gemstones: 'Mixed Green Inlay',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[6].id, // inlay-rings
        rating: 4.9,
        reviewCount: 29,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silver Bright Purple Inlay Ring',
        slug: 'silver-bright-purple-inlay-ring',
        description: 'Handcrafted silver ring with bright purple gemstone inlay, showcasing traditional craftsmanship.',
        price: 95.0,
        comparePrice: 110.0,
        cost: 45.0,
        sku: 'INL-002',
        barcode: '123456789017',
        quantity: 6,
        weight: 4.1,
        material: 'Silver',
        gemstones: 'Bright Purple Inlay',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[6].id, // inlay-rings
        rating: 4.8,
        reviewCount: 24,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gold Dark Red Inlay Ring',
        slug: 'gold-dark-red-inlay-ring',
        description: 'Luxurious gold ring with dark red gemstone inlay, featuring intricate detail work.',
        price: 125.0,
        comparePrice: 140.0,
        cost: 60.0,
        sku: 'INL-003',
        barcode: '123456789018',
        quantity: 2,
        weight: 4.7,
        material: 'Gold',
        gemstones: 'Dark Red Inlay',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[6].id, // inlay-rings
        rating: 4.9,
        reviewCount: 31,
        badge: 'Ready to Ship',
      },
    }),

    // STATEMENT RINGS (categories[7] = statement-rings) - 4 products
    prisma.product.create({
      data: {
        name: 'Bold Damascus Mixed Yellow Statement Ring',
        slug: 'bold-damascus-mixed-yellow-statement-ring',
        description: 'Striking Damascus steel statement ring with mixed yellow gemstone, making a bold impression.',
        price: 120.0,
        comparePrice: 135.0,
        cost: 57.0,
        sku: 'STA-001',
        barcode: '123456789019',
        quantity: 3,
        weight: 6.5,
        material: 'Damascus',
        gemstones: 'Mixed Yellow Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[7].id, // statement-rings
        rating: 4.8,
        reviewCount: 27,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Modern Silver Bright Green Statement Ring',
        slug: 'modern-silver-bright-green-statement-ring',
        description: 'Contemporary silver statement ring with bright green gemstone, perfect for making a statement.',
        price: 100.0,
        comparePrice: 115.0,
        cost: 47.0,
        sku: 'STA-002',
        barcode: '123456789020',
        quantity: 5,
        weight: 4.9,
        material: 'Silver',
        gemstones: 'Bright Green Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[7].id, // statement-rings
        rating: 4.7,
        reviewCount: 22,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Titanium Dark Purple Statement Ring',
        slug: 'titanium-dark-purple-statement-ring',
        description: 'Sleek titanium statement ring with dark purple gemstone, combining modern design with bold style.',
        price: 110.0,
        comparePrice: 125.0,
        cost: 52.0,
        sku: 'STA-003',
        barcode: '123456789021',
        quantity: 4,
        weight: 3.8,
        material: 'Titanium',
        gemstones: 'Dark Purple Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: true,
        categoryId: categories[7].id, // statement-rings
        rating: 4.8,
        reviewCount: 25,
        badge: 'Ready to Ship',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Ceramic Black Bright Red Statement Ring',
        slug: 'ceramic-black-bright-red-statement-ring',
        description: 'Bold black ceramic statement ring with bright red gemstone, creating a striking contrast.',
        price: 105.0,
        comparePrice: 120.0,
        cost: 50.0,
        sku: 'STA-004',
        barcode: '123456789022',
        quantity: 4,
        weight: 3.2,
        material: 'Ceramic(black)',
        gemstones: 'Bright Red Gem',
        size: '7.0',
        images: stringifyImages([getRandomImage()]),
        featured: false,
        categoryId: categories[7].id, // statement-rings
        rating: 4.6,
        reviewCount: 18,
        badge: 'Ready to Ship',
      },
    }),
  ]);

  console.log('Ring products created:', products.length);

  // Delete all existing users first
  console.log('Deleting all existing users...');
  await prisma.user.deleteMany({});
  console.log('All existing users deleted.');

  // Create admin user with correct credentials
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@jewelry.com',
      name: 'Admin User',
      password: '$2b$12$JmgEjavpcj4cQ53CfwUxeeTdwp4uNtZtTSbderb9RwVoRqjOy7euG', // password: boberpoper34
      role: UserRole.ADMIN,
    },
  });

  console.log('Admin user created:', adminUser.email);

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
