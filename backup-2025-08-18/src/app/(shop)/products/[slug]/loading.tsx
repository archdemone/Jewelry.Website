export default function ProductLoading() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-4xl">
        {/* Product skeleton */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
            
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
