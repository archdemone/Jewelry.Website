import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminApi } from '@/lib/admin/admin-auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

// Safe parse images function
function safeParseImages(imagesString: string | null): string[] {
  if (!imagesString) return [];
  try {
    const parsed = JSON.parse(imagesString);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    await db.$connect();

    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');

    let products;
    let categories;

    if (categorySlug && categorySlug !== 'all') {
      // Get products by category slug
      const category = await db.category.findFirst({
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
          'statement': 'statement-rings',
          'all': 'all-rings'
        };

        const mappedSlug = categoryMap[categorySlug];
        if (mappedSlug) {
          const mappedCategory = await db.category.findFirst({
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
      products = await db.product.findMany({
        include: { category: true }
      });
    }

    // Get all categories
    categories = await db.category.findMany({
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
      status: product.active ? 'active' : 'draft',
      sku: product.sku,
      createdAt: product.createdAt?.toISOString(),
      isFeatured: product.featured,
      featuredOrder: product.featured ? 1 : undefined,
      mixColors: [],
      isInStock: product.active
    }));

    return NextResponse.json({
      products: mappedProducts,
      categories
    }, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

// Create new product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    // Find the category
    const category = await db.category.findFirst({
      where: { slug: productData.category }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Create the product
    const newProduct = await db.product.create({
      data: {
        name: productData.name,
        slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, '-'),
        description: productData.description || '',
        price: productData.price,
        comparePrice: productData.originalPrice,
        sku: productData.sku || '',
        barcode: productData.sku || '',
        quantity: 10, // Default quantity
        weight: 5.0, // Default weight
        material: productData.material || 'Silver',
        gemstones: productData.gemColor || '',
        size: '7.0', // Default size
        images: JSON.stringify(productData.images || []),
        featured: productData.isFeatured || false,
        active: productData.status === 'active',
        categoryId: category.id,
        rating: productData.rating || 4.5,
        reviewCount: productData.reviews || 0,
        badge: productData.badge || 'Ready to Ship'
      }
    });

    // Revalidate after create
    revalidatePath('/products');
    revalidatePath(`/products/${newProduct.slug}`);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// Update product
export async function PUT(request: NextRequest) {
  try {
    const productData = await request.json();

    // Find the category
    const category = await db.category.findFirst({
      where: { slug: productData.category }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Get the old product to check slug changes
    const oldProduct = await db.product.findUnique({
      where: { id: productData.id },
      select: { slug: true }
    });

    // Update the product
    const updatedProduct = await db.product.update({
      where: { id: productData.id },
      data: {
        name: productData.name,
        slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, '-'),
        description: productData.description || '',
        price: productData.price,
        comparePrice: productData.originalPrice,
        sku: productData.sku || '',
        barcode: productData.sku || '',
        material: productData.material || 'Silver',
        gemstones: productData.gemColor || '',
        images: JSON.stringify(productData.images || []),
        featured: productData.isFeatured || false,
        active: productData.status === 'active',
        categoryId: category.id,
        rating: productData.rating || 4.5,
        reviewCount: productData.reviews || 0,
        badge: productData.badge || 'Ready to Ship'
      }
    });

    // Revalidate after update
    revalidatePath('/products');
    if (oldProduct && oldProduct.slug !== updatedProduct.slug) {
      revalidatePath(`/products/${oldProduct.slug}`);
    }
    revalidatePath(`/products/${updatedProduct.slug}`);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get the product before deleting to get its slug
    const product = await db.product.findUnique({
      where: { id },
      select: { slug: true }
    });

    await db.product.delete({
      where: { id }
    });

    // Revalidate after delete
    revalidatePath('/products');
    if (product) {
      revalidatePath(`/products/${product.slug}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
