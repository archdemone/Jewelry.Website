'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
<<<<<<< HEAD
              <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">You're Offline</h1>
              <p className="text-gray-600 mb-6">
          Please check your internet connection and try again.
        </p>
              <button onClick={() => window.location.reload()}
=======
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-6">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Try Again
        </button>
<<<<<<< HEAD
              </div>
              </div>
=======
      </div>
    </div>
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
  );
}
