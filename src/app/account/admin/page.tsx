'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    // Check if user is admin
    if ((session.user as any)?.role !== 'ADMIN') {
      router.push('/account');
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {session?.user?.name || 'Admin'}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Products Management */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Products</h3>
                <p className="text-blue-700 text-sm mb-4">Manage your product catalog</p>
                <button
                  onClick={() => router.push('/admin/products')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Manage Products
                </button>
              </div>

              {/* Orders Management */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Orders</h3>
                <p className="text-green-700 text-sm mb-4">View and manage customer orders</p>
                <button
                  onClick={() => router.push('/admin/orders')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  View Orders
                </button>
              </div>

              {/* Customers Management */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Customers</h3>
                <p className="text-purple-700 text-sm mb-4">Manage customer accounts</p>
                <button
                  onClick={() => router.push('/admin/customers')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Manage Customers
                </button>
              </div>

              {/* Inventory Management */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Inventory</h3>
                <p className="text-orange-700 text-sm mb-4">Track stock levels</p>
                <button
                  onClick={() => router.push('/admin/inventory')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  View Inventory
                </button>
              </div>

              {/* Analytics */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">Analytics</h3>
                <p className="text-indigo-700 text-sm mb-4">View sales and performance data</p>
                <button
                  onClick={() => router.push('/admin/analytics')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Analytics
                </button>
              </div>

              {/* Settings */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-700 text-sm mb-4">Configure store settings</p>
                <button
                  onClick={() => router.push('/admin/settings')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Manage Settings
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/admin/create')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  + Add New Product
                </button>
                <button
                  onClick={() => router.push('/admin/media')}
                  className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors"
                >
                  📁 Media Library
                </button>
                <button
                  onClick={() => router.push('/admin/audit')}
                  className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
                >
                  📋 Audit Log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
