'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CreditCard, User } from 'lucide-react';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{orderId}</h1>
          <p className="text-gray-600">Order details and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order Items
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-600">Order items will be displayed here</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Shipping Information
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-600">Shipping details will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-600">Customer information will be displayed here</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-600">Payment details will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800">
          This order detail page is under construction. Full order management functionality will be available soon.
        </p>
      </div>
    </div>
  );
}