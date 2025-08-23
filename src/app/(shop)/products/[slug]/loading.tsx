export default function ProductLoading() {
  return (
    <div className="container py-16">
              <div className="mx-auto max-w-4xl">
        {/* Product skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="space-y-4">
              <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />
              <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded bg-gray-200" />
              ))}
            </div>
              </div>

          {/* Content skeleton */}
          <div className="space-y-6">
              <div className="space-y-2">
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="space-y-3">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="space-y-4">
              <div className="h-12 animate-pulse rounded bg-gray-200" />
              <div className="h-12 animate-pulse rounded bg-gray-200" />
              </div>
              </div>
              </div>
              </div>
              </div>
  );
}
