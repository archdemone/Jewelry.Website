import { Suspense } from 'react';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchFilters } from '@/components/search/SearchFilters';

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const category = searchParams.category;
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const sort = searchParams.sort as 'new' | 'price-asc' | 'price-desc' | undefined;

  return (
    <main className="min-h-screen bg-gray-50">
<<<<<<< HEAD
              <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
=======
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
            {query ? `Search Results for "${query}"` : 'Search Products'}
          </h1>
          {query && (
            <p className="text-gray-600">
              Find the perfect ring that matches your search criteria
            </p>
          )}
        </div>
<<<<<<< HEAD
              <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
              <SearchFilters              query={query}              category={category}              minPrice={minPrice}              maxPrice={maxPrice}              sort={sort}
            />
              </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
              <Suspense fallback={
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
            }>
              <SearchResults              query={query}              category={category}              minPrice={minPrice}              maxPrice={maxPrice}              sort={sort}
              />
              </Suspense>
              </div>
              </div>
              </div>
              </main>
=======

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters 
              query={query}
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sort={sort}
            />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <Suspense fallback={
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
            }>
              <SearchResults 
                query={query}
                category={category}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sort={sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
  );
}