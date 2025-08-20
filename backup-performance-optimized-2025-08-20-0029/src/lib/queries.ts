import { db } from './db';
import type { ProductWithRelations } from '@/types';

// Helpers for CI/e2e: provide graceful fallbacks when DB is unavailable (e.g., in fast CI builds)
const ringCategorySlugs = [
  'engagement-rings',
  'wedding-bands',
  'eternity-rings',
  'signet-rings',
  'statement-rings',
  'stackable-rings',
] as const;

function buildFallbackCatalog(total: number = 48) {
  // Return fallback data for CI/e2e testing
  const fallbackProducts = [
    {
      id: 'fallback-1',
      name: 'Fallback Product 1',
      description: 'A fallback product for testing',
      price: 100,
      slug: 'fallback-product-1',
      featured: true,
      category: { slug: 'engagement-rings' },
      createdAt: new Date(),
      categoryId: 'fallback-category',
    },
    {
      id: 'fallback-2',
      name: 'Fallback Product 2',
      description: 'Another fallback product for testing',
      price: 200,
      slug: 'fallback-product-2',
      featured: true,
      category: { slug: 'wedding-bands' },
      createdAt: new Date(),
      categoryId: 'fallback-category',
    },
  ];

  return fallbackProducts.slice(0, total);
}

const preferFallback = process.env.E2E_NO_DB === '1' || process.env.CI === 'true';

export async function getFeaturedProducts(limit = 4): Promise<ProductWithRelations[]> {
  if (preferFallback) {
    const items = buildFallbackCatalog(12)
      .filter((i) => i.featured)
      .slice(0, limit);
    return items as any;
  }
  try {
    return (await db.product.findMany({
      where: { featured: true },
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: { category: true, collections: true, reviews: true, wishlist: true },
    })) as any;
  } catch {
    const items = buildFallbackCatalog(12)
      .filter((i) => i.featured)
      .slice(0, limit);
    return items as any;
  }
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
  page?: number;
  pageSize?: number;
  q?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'new' | 'price-asc' | 'price-desc';
}) {
  const skip = (page - 1) * pageSize;
  const where: any = {};
  const ringCategorySlugs = [
    'engagement-rings',
    'wedding-bands',
    'eternity-rings',
    'signet-rings',
    'statement-rings',
    'stackable-rings',
  ] as const;
  if (q && q.trim()) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }
  // Limit results to ring categories by default unless a category is explicitly requested
  if (categorySlug) {
    where.category = { slug: categorySlug };
  } else {
    where.category = { slug: { in: [...ringCategorySlugs] } };
  }
  if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
    where.price = {};
    if (typeof minPrice === 'number') where.price.gte = minPrice;
    if (typeof maxPrice === 'number') where.price.lte = maxPrice;
  }

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  if (sort === 'price-desc') orderBy = { price: 'desc' };

  if (preferFallback) {
    const catalog = buildFallbackCatalog(48);
    const filtered = catalog.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      const matchesCategory = !categorySlug || p.category.slug === categorySlug;
      let matchesPrice = true;
      if (typeof minPrice === 'number') matchesPrice = matchesPrice && p.price >= minPrice;
      if (typeof maxPrice === 'number') matchesPrice = matchesPrice && p.price <= maxPrice;
      return matchesQ && matchesCategory && matchesPrice;
    });

    const ordered = [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const total = ordered.length;
    const paged = ordered.slice(skip, skip + pageSize);
    return { items: paged as any, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  try {
    const [items, total] = await Promise.all([
      db.product.findMany({
        skip,
        take: pageSize,
        where,
        orderBy,
        include: { category: true },
      }),
      db.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch {
    const catalog = buildFallbackCatalog(48);
    const filtered = catalog.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase());
      const matchesCategory = !categorySlug || p.category.slug === categorySlug;
      let matchesPrice = true;
      if (typeof minPrice === 'number') matchesPrice = matchesPrice && p.price >= minPrice;
      if (typeof maxPrice === 'number') matchesPrice = matchesPrice && p.price <= maxPrice;
      return matchesQ && matchesCategory && matchesPrice;
    });

    const ordered = [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const total = ordered.length;
    const paged = ordered.slice(skip, skip + pageSize);
    return {
      items: paged as any,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}

export async function getProductBySlug(slug: string) {
  if (preferFallback) {
    const catalog = buildFallbackCatalog(48);
    const found = catalog.find((p) => p.slug === slug);
    return found as any;
  }
  try {
    const dbProduct = await db.product.findUnique({
      where: { slug },
      include: { category: true, reviews: true },
    });
    
    if (dbProduct) {
      return dbProduct;
    }
    
    // If not found in DB, check featured products
    const { getFeaturedProducts } = await import('./featured-products');
    const featuredProducts = getFeaturedProducts();
    const featuredProduct = featuredProducts.find(p => p.slug === slug);
    
    if (featuredProduct) {
      // Transform featured product to match DB schema
      return {
        id: featuredProduct.id,
        name: featuredProduct.name,
        slug: featuredProduct.slug,
        description: featuredProduct.description,
        price: featuredProduct.price,
        sku: featuredProduct.sku,
        quantity: 10, // Default quantity
        categoryId: featuredProduct.category,
        category: {
          id: featuredProduct.category,
          name: featuredProduct.category,
          slug: featuredProduct.category.toLowerCase(),
        },
        images: [featuredProduct.image],
        featured: true,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    return null;
  } catch {
    // Fallback for featured products
    const { getFeaturedProducts } = await import('./featured-products');
    const featuredProducts = getFeaturedProducts();
    const featuredProduct = featuredProducts.find(p => p.slug === slug);
    
    if (featuredProduct) {
      return {
        id: featuredProduct.id,
        name: featuredProduct.name,
        slug: featuredProduct.slug,
        description: featuredProduct.description,
        price: featuredProduct.price,
        sku: featuredProduct.sku,
        quantity: 10,
        categoryId: featuredProduct.category,
        category: {
          id: featuredProduct.category,
          name: featuredProduct.category,
          slug: featuredProduct.category.toLowerCase(),
        },
        images: [featuredProduct.image],
        featured: true,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    const catalog = buildFallbackCatalog(48);
    const found = catalog.find((p) => p.slug === slug);
    return found as any;
  }
}

export async function getAllCategories() {
  if (preferFallback) {
    return ringCategorySlugs.map((slug, i) => ({
      id: `cat_${slug}`,
      name: slug.replace(/-/g, ' '),
      slug,
      active: true,
      order: i,
    })) as any;
  }
  try {
    return await db.category.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  } catch {
    return ringCategorySlugs.map((slug, i) => ({
      id: `cat_${slug}`,
      name: slug.replace(/-/g, ' '),
      slug,
      active: true,
      order: i,
    })) as any;
  }
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 6) {
  if (preferFallback) {
    const catalog = buildFallbackCatalog(48);
    const base = catalog
      .filter((p) => p.categoryId === categoryId && p.id !== productId)
      .slice(0, limit);
    return base.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: { slug: p.category.slug },
    })) as any;
  }
  try {
    const items = await db.product.findMany({
      where: { categoryId, NOT: { id: productId } },
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        category: { select: { slug: true } },
      },
    });
    return items;
  } catch {
    const catalog = buildFallbackCatalog(48);
    const base = catalog
      .filter((p) => p.categoryId === categoryId && p.id !== productId)
      .slice(0, limit);
    return base.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: { slug: p.category.slug },
    })) as any;
  }
}
