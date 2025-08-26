export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <div className="px-4 text-center">
              <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-primary" />
              </div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">We&#39;ll be back soon!</h1>
              <p className="mx-auto mb-8 max-w-md text-lg text-gray-600">
          We&#39;re currently performing scheduled maintenance. We should be back online shortly.
        </p>
              <div className="space-y-4">
              <p className="text-sm text-gray-500">Expected completion: 2 hours</p>
              <p className="text-sm text-gray-500">
            For urgent inquiries: support@j&m-jewelry.co.uk
          </p>
              </div>
              </div>
              </div>
  );
}
