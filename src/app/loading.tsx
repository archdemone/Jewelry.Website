export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4">
          <span className="sr-only">Loading...</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
