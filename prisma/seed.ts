import { PrismaClient } from '@prisma/client';
import { UserRole } from '../src/types/enums';
import { stringifyImages } from '../src/lib/utils/json-helpers';

const prisma = new PrismaClient();

async function main() {
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

  // Create ring products
  const products = await Promise.all([
    // Engagement Rings (categories[5] = engagement-rings)
    prisma.product.upsert({
      where: { sku: 'ENG-001' },
      update: {},
      create: {
        name: 'Classic Solitaire Engagement Ring',
        slug: 'classic-solitaire-engagement-ring',
        description:
          'Handcrafted from locally-sourced 18k gold, featuring a brilliant cut diamond. Each ring is personally crafted from start to finish.',
        price: 95.0,
        comparePrice: 120.0,
        cost: 45.0,
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
        categoryId: categories[5].id, // engagement-rings
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
        price: 110.0,
        comparePrice: 120.0,
        cost: 55.0,
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
        categoryId: categories[5].id, // engagement-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'ENG-003' },
      update: {},
      create: {
        name: 'Modern Three-Stone Ring',
        slug: 'modern-three-stone-ring',
        description: 'Contemporary three-stone design symbolizing past, present, and future.',
        price: 105.0,
        comparePrice: 120.0,
        cost: 50.0,
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
        categoryId: categories[5].id, // engagement-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'ENG-004' },
      update: {},
      create: {
        name: 'Rose Gold Pave Engagement Ring',
        slug: 'rose-gold-pave-engagement-ring',
        description: 'Romantic rose gold ring with pave diamond accents for extra sparkle.',
        price: 115.0,
        comparePrice: 130.0,
        cost: 55.0,
        sku: 'ENG-004',
        barcode: '123456789004',
        quantity: 2,
        weight: 3.5,
        material: '18k Rose Gold',
        gemstones: '0.8ct Diamond + Pave',
        size: '6.5',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0006.jpg',
          '/images/MyImages/IMG-20250816-WA0007.jpg',
        ]),
        featured: true,
        categoryId: categories[5].id, // engagement-rings
      },
    }),
    // Wedding Bands (categories[4] = wedding-rings)
    prisma.product.upsert({
      where: { sku: 'WED-001' },
      update: {},
      create: {
        name: 'Hammered Wedding Band',
        slug: 'hammered-wedding-band',
        description:
          'Artisan-textured band, each hammer strike placed by hand for a unique finish.',
        price: 75.0,
        comparePrice: 95.0,
        cost: 35.0,
        sku: 'WED-001',
        barcode: '123456789005',
        quantity: 8,
        weight: 4.5,
        material: '14k White Gold',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0008.jpg',
          '/images/MyImages/IMG-20250816-WA0009.jpg',
        ]),
        featured: true,
        categoryId: categories[4].id, // wedding-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'WED-002' },
      update: {},
      create: {
        name: 'Classic Plain Wedding Band',
        slug: 'classic-plain-wedding-band',
        description: 'Timeless simplicity in 18k gold, perfect for everyday wear.',
        price: 65.0,
        comparePrice: 80.0,
        cost: 30.0,
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
         categoryId: categories[4].id, // wedding-rings
       },
     }),
     prisma.product.upsert({
       where: { sku: 'WED-003' },
       update: {},
       create: {
         name: 'Diamond Pave Wedding Band',
         slug: 'diamond-pave-wedding-band',
         description: 'Elegant pave setting with small diamonds for added sparkle.',
         price: 85.0,
         comparePrice: 100.0,
         cost: 40.0,
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
         categoryId: categories[4].id, // wedding-rings
       },
     }),
     // Mens Rings (categories[1] = mens-rings)
     prisma.product.upsert({
       where: { sku: 'MEN-001' },
       update: {},
       create: {
         name: 'Damascus Steel Men\'s Ring',
         slug: 'damascus-steel-mens-ring',
         description: 'Handcrafted Damascus steel ring with unique patterns, perfect for the modern man.',
         price: 85.0,
         comparePrice: 100.0,
         cost: 40.0,
         sku: 'MEN-001',
         barcode: '123456789007',
         quantity: 5,
         weight: 6.2,
         material: 'Damascus Steel',
         gemstones: 'None',
         size: '10.0',
         images: stringifyImages([
           '/images/MyImages/IMG-20250816-WA0012.jpg',
           '/images/MyImages/IMG-20250816-WA0013.jpg',
         ]),
         featured: true,
         categoryId: categories[1].id, // mens-rings
       },
     }),
     prisma.product.upsert({
       where: { sku: 'MEN-002' },
       update: {},
       create: {
         name: 'Titanium Men\'s Ring',
         slug: 'titanium-mens-ring',
         description: 'Lightweight and durable titanium ring with a sleek design.',
         price: 75.0,
         comparePrice: 90.0,
         cost: 35.0,
         sku: 'MEN-002',
         barcode: '123456789008',
         quantity: 8,
         weight: 3.1,
         material: 'Titanium',
         gemstones: 'None',
         size: '10.0',
         images: stringifyImages([
           '/images/MyImages/IMG-20250816-WA0014.jpg',
           '/images/MyImages/IMG-20250816-WA0015.jpg',
         ]),
         featured: false,
         categoryId: categories[1].id, // mens-rings
       },
     }),
     // Womens Rings (categories[2] = womens-rings)
     prisma.product.upsert({
       where: { sku: 'WOM-001' },
       update: {},
       create: {
         name: 'Silver Inlay Women\'s Ring',
         slug: 'silver-inlay-womens-ring',
         description: 'Elegant silver ring with beautiful gemstone inlay work.',
         price: 95.0,
         comparePrice: 110.0,
         cost: 45.0,
         sku: 'WOM-001',
         barcode: '123456789009',
         quantity: 6,
         weight: 4.2,
         material: 'Sterling Silver',
         gemstones: 'Sapphire Inlay',
         size: '7.0',
         images: stringifyImages([
           '/images/MyImages/IMG-20250816-WA0016.jpg',
           '/images/MyImages/IMG-20250816-WA0017.jpg',
         ]),
         featured: true,
         categoryId: categories[2].id, // womens-rings
       },
     }),
     prisma.product.upsert({
       where: { sku: 'WOM-002' },
       update: {},
       create: {
         name: 'Gold Women\'s Ring',
         slug: 'gold-womens-ring',
         description: 'Classic gold ring with delicate details and timeless appeal.',
         price: 105.0,
         comparePrice: 120.0,
         cost: 50.0,
         sku: 'WOM-002',
         barcode: '123456789010',
         quantity: 4,
         weight: 3.8,
         material: '18k Yellow Gold',
         gemstones: 'Diamond Accent',
         size: '7.0',
         images: stringifyImages([
           '/images/MyImages/IMG-20250816-WA0018.jpg',
           '/images/MyImages/IMG-20250816-WA0019.jpg',
         ]),
         featured: false,
         categoryId: categories[2].id, // womens-rings
       },
     }),
    // Statement Rings (categories[7] = statement-rings)
    prisma.product.upsert({
      where: { sku: 'STAT-001' },
      update: {},
      create: {
        name: 'Bold Geometric Statement Ring',
        slug: 'bold-geometric-statement-ring',
        description: 'Striking geometric design with mixed metals and gemstones for a bold statement.',
        price: 95.0,
        comparePrice: 120.0,
        cost: 45.0,
        sku: 'STAT-001',
        barcode: '123456789014',
        quantity: 3,
        weight: 5.2,
        material: 'Mixed Metals',
        gemstones: 'Sapphire + Diamond',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0022.jpg',
          '/images/MyImages/IMG-20250816-WA0023.jpg',
        ]),
        featured: true,
        categoryId: categories[7].id, // statement-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'STAT-002' },
      update: {},
      create: {
        name: 'Artistic Floral Statement Ring',
        slug: 'artistic-floral-statement-ring',
        description: 'Handcrafted floral design with intricate details and vibrant gemstones.',
        price: 110.0,
        comparePrice: 130.0,
        cost: 55.0,
        sku: 'STAT-002',
        barcode: '123456789015',
        quantity: 2,
        weight: 4.8,
        material: '18k Yellow Gold',
        gemstones: 'Ruby + Emerald',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0024.jpg',
          '/images/MyImages/IMG-20250816-WA0025.jpg',
        ]),
        featured: true,
        categoryId: categories[7].id, // statement-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'STAT-003' },
      update: {},
      create: {
        name: 'Modern Abstract Statement Ring',
        slug: 'modern-abstract-statement-ring',
        description: 'Contemporary abstract design with asymmetrical elements and mixed textures.',
        price: 105.0,
        comparePrice: 125.0,
        cost: 50.0,
        sku: 'STAT-003',
        barcode: '123456789016',
        quantity: 4,
        weight: 6.1,
        material: 'Sterling Silver',
        gemstones: 'Onyx + Crystal',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0026.jpg',
          '/images/MyImages/IMG-20250816-WA0027.jpg',
        ]),
        featured: false,
        categoryId: categories[7].id, // statement-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'STAT-004' },
      update: {},
      create: {
        name: 'Vintage-Inspired Statement Ring',
        slug: 'vintage-inspired-statement-ring',
        description: 'Timeless vintage design with ornate details and precious gemstones.',
        price: 120.0,
        comparePrice: 140.0,
        cost: 60.0,
        sku: 'STAT-004',
        barcode: '123456789017',
        quantity: 2,
        weight: 5.5,
        material: '18k White Gold',
        gemstones: 'Diamond + Sapphire',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0028.jpg',
          '/images/MyImages/IMG-20250816-WA0029.jpg',
        ]),
        featured: true,
        categoryId: categories[7].id, // statement-rings
      },
    }),
    // Unisex Rings (categories[3] = unisex-rings)
    prisma.product.upsert({
      where: { sku: 'UNI-001' },
      update: {},
      create: {
        name: 'Minimalist Carbon Fiber Ring',
        slug: 'minimalist-carbon-fiber-ring',
        description: 'Lightweight and durable carbon fiber ring with a modern minimalist design.',
        price: 65.0,
        comparePrice: 80.0,
        cost: 30.0,
        sku: 'UNI-001',
        barcode: '123456789018',
        quantity: 10,
        weight: 1.2,
        material: 'Carbon Fiber',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0030.jpg',
          '/images/MyImages/IMG-20250816-WA0031.jpg',
        ]),
        featured: true,
        categoryId: categories[3].id, // unisex-rings
      },
    }),
    prisma.product.upsert({
      where: { sku: 'UNI-002' },
      update: {},
      create: {
        name: 'Ceramic Unisex Ring',
        slug: 'ceramic-unisex-ring',
        description: 'Sleek ceramic ring with a smooth finish, perfect for any style preference.',
        price: 55.0,
        comparePrice: 70.0,
        cost: 25.0,
        sku: 'UNI-002',
        barcode: '123456789019',
        quantity: 12,
        weight: 1.5,
        material: 'Ceramic',
        gemstones: 'None',
        size: '7.0',
        images: stringifyImages([
          '/images/MyImages/IMG-20250816-WA0032.jpg',
          '/images/MyImages/IMG-20250816-WA0033.jpg',
        ]),
        featured: false,
        categoryId: categories[3].id, // unisex-rings
      },
    }),
  ]);

  console.log('Ring products created:', products.length);

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhqKre', // password: demo123
      role: UserRole.CUSTOMER,
    },
  });

  // Create admin user with correct credentials
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@jewelry.com' },
    update: {},
    create: {
      email: 'admin@jewelry.com',
      name: 'Admin User',
      password: '$2b$12$JmgEjavpcj4cQ53CfwUxeeTdwp4uNtZtTSbderb9RwVoRqjOy7euG', // password: boberpoper34
      role: UserRole.ADMIN,
    },
  });

  console.log('Demo user created:', demoUser.email);
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
