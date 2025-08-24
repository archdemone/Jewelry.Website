'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { showToast } from '@/components/ui/SimpleToast';
// Removed direct import of getPaginatedProducts - now using API route

interface SearchResultsProps {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'new' | 'price-asc' | 'price-desc';
}

export function SearchResults({ query, category, minPrice, maxPrice, sort }: SearchResultsProps) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { addItem, isHydrated } = useCartStore();

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: '12',
          ...(query && { q: query }),
          ...(category && { categorySlug: category }),
          ...(minPrice && { minPrice: minPrice.toString() }),
          ...(maxPrice && { maxPrice: maxPrice.toString() }),
          sort: sort || 'new',
        });

        const response = await fetch(`/api/search?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await response.json();
        setResults(data.items);
        setTotal(data.total);
      } catch (error) {
        console.error('Search error:', error);
        showToast('Failed to load search results', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [query, category, minPrice, maxPrice, sort, currentPage]);

  useEffect(() => {
    // Load wishlist from localStorage
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      }
    }
  }, []);

  const handleWishlistToggle = (productId: string) => {
    const newWishlist = new Set(wishlist);
    const product = results.find(p => p.id === productId);

    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      showToast(`${product?.name} removed from wishlist`, 'info');
    } else {
      newWishlist.add(productId);
      showToast(`${product?.name} added to wishlist!`, 'success');
    }
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
    }
  };

  const handleAddToCart = (product: any) => {
    if (!isHydrated) {
      showToast('Cart is still loading, please try again', 'error');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '/images/placeholder.jpg',
      material: product.material,
      gemColor: product.gemColor,
      gemDensity: product.gemDensity,
      gemVariation: product.gemVariation,
      ringSize: '7',
      ringWidth: '6'
    });

    showToast(`${product.name} added to cart!`, 'success');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 mb-6">
          {query
            ? `We couldn't find any products matching "${query}"`
            : 'Try adjusting your search criteria or browse our full collection'
          }
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-gold-600 text-white font-medium rounded-lg hover:bg-gold-700 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {results.length} of {total} results
          {query && ` for "${query}"`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images?.[0] || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistToggle(product.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${wishlist.has(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                aria-label={wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Add to Cart */}
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  £{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    £{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {product.material && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
                    {product.material}
                  </span>
                )}
                {product.gemColor && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-300">
                    {product.gemColor}
                  </span>
                )}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="block w-full text-center bg-gold-600 text-white py-3 px-4 rounded-lg hover:bg-gold-700 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > 12 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {Math.ceil(total / 12)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(total / 12)))}
              disabled={currentPage >= Math.ceil(total / 12)}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
