import { AuthGuard } from '@/components/auth/AuthGuard';
import { MapPin, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AddressesPage() {
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
              My Addresses
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your shipping and billing addresses
            </p>
          </div>

          {/* Coming Soon State */}
          <Card className="mx-auto max-w-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <MapPin className="h-10 w-10 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Address Management Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="mb-6 text-gray-600">
                We're building a comprehensive address management system. 
                Soon you'll be able to save multiple addresses, set default shipping addresses, and manage your billing information with ease.
              </p>
              
              <div className="pt-4">
                <Button asChild className="bg-gold-600 text-white hover:bg-gold-700">
                  <Link href="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Multiple Addresses</h3>
                <p className="text-sm text-gray-600">
                  Save multiple shipping addresses for convenience
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <Plus className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Easy Management</h3>
                <p className="text-sm text-gray-600">
                  Add, edit, and delete addresses with simple forms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Default Settings</h3>
                <p className="text-sm text-gray-600">
                  Set default shipping and billing addresses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Address Types Preview */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold text-gray-900">Shipping Addresses</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Home delivery addresses</li>
                  <li>• Work addresses</li>
                  <li>• Gift recipient addresses</li>
                  <li>• International shipping</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold text-gray-900">Billing Addresses</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Credit card billing</li>
                  <li>• Invoice addresses</li>
                  <li>• Tax purposes</li>
                  <li>• Business accounts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
