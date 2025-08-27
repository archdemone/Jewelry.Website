const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Create categories
    const categories = [
      { name: "Men's Rings", slug: 'mens-rings', order: 1 },
      { name: "Women's Rings", slug: 'womens-rings', order: 2 },
      { name: "Unisex Rings", slug: 'unisex-rings', order: 3 },
      { name: "Wedding Rings", slug: 'wedding-rings', order: 4 },
      { name: "Engagement Rings", slug: 'engagement-rings', order: 5 },
      { name: "Inlay Rings", slug: 'inlay-rings', order: 6 },
      { name: "Statement Rings", slug: 'statement-rings', order: 7 },
      { name: "All Rings", slug: 'all-rings', order: 8 }
    ];

    console.log('Creating categories...');
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }

    // Create sample products
    const products = [
      {
        name: "Men's Silver Ring",
        slug: 'mens-silver-ring',
        description: 'Elegant silver ring for men',
        price: 89.99,
        material: 'Silver',
        gemstones: 'Blue',
        categorySlug: 'mens-rings',
        images: JSON.stringify(['/images/products/mens-silver-ring.jpg']),
        featured: true,
        active: true,
        rating: 4.8,
        reviewCount: 12
      },
      {
        name: "Women's Gold Ring",
        slug: 'womens-gold-ring',
        description: 'Beautiful gold ring for women',
        price: 129.99,
        material: 'Gold',
        gemstones: 'Red',
        categorySlug: 'womens-rings',
        images: JSON.stringify(['/images/products/womens-gold-ring.jpg']),
        featured: true,
        active: true,
        rating: 4.9,
        reviewCount: 18
      },
      {
        name: "Unisex Carbon Ring",
        slug: 'unisex-carbon-ring',
        description: 'Modern carbon ring for everyone',
        price: 69.99,
        material: 'Carbon',
        gemstones: 'Green',
        categorySlug: 'unisex-rings',
        images: JSON.stringify(['/images/products/unisex-carbon-ring.jpg']),
        featured: false,
        active: true,
        rating: 4.7,
        reviewCount: 8
      }
    ];

    console.log('Creating products...');
    for (const product of products) {
      const category = await prisma.category.findUnique({
        where: { slug: product.categorySlug }
      });

      if (category) {
        await prisma.product.upsert({
          where: { slug: product.slug },
          update: {},
          create: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            material: product.material,
            gemstones: product.gemstones,
            images: product.images,
            featured: product.featured,
            active: product.active,
            rating: product.rating,
            reviewCount: product.reviewCount,
            categoryId: category.id,
            sku: `SKU-${product.slug}`,
            quantity: 10
          }
        });
      }
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
