import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(PRODUCTS_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load products from file
async function loadProducts() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Return default products if file doesn't exist
    return [
      {
        id: 1,
        name: "Women's Silver Inlay Ring - Dark Red",
        price: 299,
        originalPrice: 349,
        images: ['/images/MyImages/IMG-20250816-WA0000.jpg'],
        material: 'Silver',
        gemColor: 'Red',
        gemDensity: 'medium',
        gemVariation: 'Dark',
        mixColors: [],
        category: 'Womens',
        subCategory: 'Inlay Ring',
        ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
        ringWidth: [4, 6, 8],
        isReadyToShip: true,
        rating: 4.8,
        reviews: 24,
        badge: 'Ready to Ship',
        slug: 'womens-silver-inlay-ring-dark-red',
        description: 'Beautiful handcrafted silver ring with dark red gem inlay.',
      },
    ];
  }
}

// Save products to file
async function saveProducts(products: any[]) {
  await ensureDataDirectory();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// Get all products
export async function GET() {
  try {
    const products = await loadProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}

// Create new product
export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    const products = await loadProducts();
    
    // Generate new ID
    const newId = Math.max(...products.map((p: any) => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    
    products.push(newProduct);
    await saveProducts(products);
    
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// Update product
export async function PUT(request: NextRequest) {
  try {
    const product = await request.json();
    const products = await loadProducts();
    
    const index = products.findIndex((p: any) => p.id === product.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    products[index] = product;
    await saveProducts(products);
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }
    
    const products = await loadProducts();
    const filteredProducts = products.filter((p: any) => p.id !== parseInt(id));
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    await saveProducts(filteredProducts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
