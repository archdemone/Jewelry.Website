import { requireAdminApi } from '@/lib/admin/admin-auth';
import { audit } from '@/lib/audit';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Helper function to extract gem color from gemstones string
function extractGemColor(gemstones: string | null): string {
  if (!gemstones) return '';
  const gemColor = gemstones.toLowerCase();
  if (gemColor.includes('red')) return 'Red';
  if (gemColor.includes('blue')) return 'Blue';
  if (gemColor.includes('green')) return 'Green';
  if (gemColor.includes('purple')) return 'Purple';
  if (gemColor.includes('yellow')) return 'Yellow';
  return '';
}

// Helper function to extract gem variation from gemstones string
function extractGemVariation(gemstones: string | null): string {
  if (!gemstones) return '';
  const gemColor = gemstones.toLowerCase();
  if (gemColor.includes('dark')) return 'Dark';
  if (gemColor.includes('bright')) return 'Bright';
  if (gemColor.includes('mixed')) return 'Mixed';
  return 'Bright'; // Default
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');

    let products;
    let categories;

    if (categorySlug && categorySlug !== 'all') {
      // Get products by category slug
      const category = await prisma.category.findFirst({
        where: { slug: categorySlug },
        include: { products: true }
      });

      if (category) {
        products = category.products;
      } else {
        // Fallback: try to match by category name
        const categoryMap: { [key: string]: string } = {
          'womens': 'womens-rings',
          'mens': 'mens-rings',
          'unisex': 'unisex-rings',
          'wedding': 'wedding-rings',
          'engagement': 'engagement-rings',
          'inlay': 'inlay-rings',
          'statement': 'statement-rings'
        };

        const mappedSlug = categoryMap[categorySlug];
        if (mappedSlug) {
          const mappedCategory = await prisma.category.findFirst({
            where: { slug: mappedSlug },
            include: { products: true }
          });
          products = mappedCategory?.products || [];
        } else {
          products = [];
        }
      }
    } else {
      // Get all products
      products = await prisma.product.findMany({
        include: { category: true }
      });
    }

    // Get all categories
    categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });

    // Map database products to frontend Product interface
    const mappedProducts = products.map(product => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.comparePrice,
      images: product.images ? JSON.parse(product.images) : [],
      material: product.material,
      gemColor: extractGemColor(product.gemstones),
      gemDensity: 'medium', // Default value
      gemVariation: extractGemVariation(product.gemstones),
      category: product.category?.slug,
      subCategory: product.category?.name,
      ringSizes: { us: [6, 7, 8, 9, 10], eu: [52, 54, 57, 59, 61] }, // Default sizes
      ringWidth: [4, 6, 8], // Default widths
      isReadyToShip: true, // Default value
      rating: product.rating,
      reviews: product.reviewCount,
      badge: product.badge,
      description: product.description,
      status: product.active ? 'active' : 'draft'
    }));

    return NextResponse.json({
      products: mappedProducts,
      categories
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const gate = await requireAdminApi();
  if ((gate as any)?.ok !== true) return gate as Response;
  try {
    const body = await req.json().catch(() => ({}));
    // TODO: persist to DB
    await audit('product:create', 'product', undefined, null, body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
