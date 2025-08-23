import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedProducts } from '@/lib/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 12;
    const q = searchParams.get('q') || undefined;
    const categorySlug = searchParams.get('categorySlug') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sort = (searchParams.get('sort') as 'new' | 'price-asc' | 'price-desc') || 'new';

    const data = await getPaginatedProducts({
      page,
      pageSize,
      q,
      categorySlug,
      minPrice,
      maxPrice,
      sort,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
}
