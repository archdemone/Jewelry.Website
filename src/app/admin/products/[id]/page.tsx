'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Package } from 'lucide-react';

export default function AdminEditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  return (
    <div className="space-y-6">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
              <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600">Product ID: {productId}</p>
              </div>
              </div>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center">
              <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="max-w-2xl mx-auto text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Editor Under Construction</h2>
              <p className="text-gray-600 mb-6">
            The product editing interface is currently being developed. You can manage products from the main dashboard or products list page.
          </p>
              <div className="flex gap-4 justify-center">
              <Link href="/admin/products" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Back to Products
            </Link>
              <Link href="/admin" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Go to Dashboard
            </Link>
              </div>
              </div>
              </div>
              </div>
  );
}