import { AuthGuard } from '@/components/auth/AuthGuard';
import Link from 'next/link';
import { User, Package, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AccountPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-gray-900 md:text-5xl">
              My Account
            </h1>
            <p className="text-lg text-gray-600">
              Manage your profile, orders, and preferences
            </p>
          </div>

          {/* Account Navigation Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Profile Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <Link href="/account/profile" className="block">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                      <User className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                    Profile
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Update your personal information and account settings
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Orders Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <Link href="/account/orders" className="block">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Package className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                    Orders
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    View your order history and track current orders
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Addresses Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <Link href="/account/addresses" className="block">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                    Addresses
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Manage your shipping and billing addresses
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Wishlist Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <Link href="/account/wishlist" className="block">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <Heart className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                    Wishlist
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Save and organize your favorite jewelry pieces
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gold-600">0</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gold-600">0</div>
                  <div className="text-sm text-gray-600">Wishlist Items</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gold-600">0</div>
                  <div className="text-sm text-gray-600">Saved Addresses</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
