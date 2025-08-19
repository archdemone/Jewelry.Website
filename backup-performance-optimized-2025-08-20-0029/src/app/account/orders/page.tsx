import { AuthGuard } from '@/components/auth/AuthGuard';
import { Package, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/account" className="inline-flex items-center text-gold-600 hover:text-gold-700 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Account
            </Link>
            <h1 className="font-serif text-4xl font-bold text-gray-900 md:text-5xl">
              My Orders
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Track your orders and view order history
            </p>
          </div>

          {/* Coming Soon State */}
          <Card className="mx-auto max-w-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gold-100">
                <Package className="h-10 w-10 text-gold-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Order Tracking Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="mb-6 text-gray-600">
                We're working hard to bring you a comprehensive order tracking system. 
                Soon you'll be able to view your order history, track shipments, and manage returns all in one place.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Expected launch: Coming soon</span>
                </div>
                
                <div className="pt-4">
                  <Button asChild className="bg-gold-600 text-white hover:bg-gold-700">
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Order History</h3>
                <p className="text-sm text-gray-600">
                  View all your past orders with detailed information
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Track your shipments with real-time updates
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <Package className="h-6 w-6 text-rose-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">
                  Initiate returns and exchanges with just a few clicks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
