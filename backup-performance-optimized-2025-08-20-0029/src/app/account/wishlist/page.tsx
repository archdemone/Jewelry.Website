import { AuthGuard } from '@/components/auth/AuthGuard';
import { Heart, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
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
              My Wishlist
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Save and organize your favorite jewelry pieces
            </p>
          </div>

          {/* Coming Soon State */}
          <Card className="mx-auto max-w-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
                <Heart className="h-10 w-10 text-rose-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Wishlist Feature Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="mb-6 text-gray-600">
                We're creating a beautiful wishlist system where you can save your favorite pieces, 
                organize them by occasion, and share them with loved ones. Perfect for planning future purchases!
              </p>
              
              <div className="pt-4">
                <Button asChild className="bg-gold-600 text-white hover:bg-gold-700">
                  <Link href="/products">
                    Browse Collection
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <Heart className="h-6 w-6 text-rose-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Save Favorites</h3>
                <p className="text-sm text-gray-600">
                  Heart your favorite pieces for easy access later
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100">
                    <Star className="h-6 w-6 text-gold-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Organize & Share</h3>
                <p className="text-sm text-gray-600">
                  Create collections and share with family and friends
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Price Alerts</h3>
                <p className="text-sm text-gray-600">
                  Get notified when your wishlist items go on sale
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wishlist Benefits */}
          <div className="mt-8">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-gray-900">Why Create a Wishlist?</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Keep track of pieces you love but aren't ready to buy yet</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Perfect for planning gifts for special occasions</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Compare different styles and designs easily</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Share your wishlist with family and friends</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Get notified about sales and new arrivals</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gold-600"></div>
                      <p className="text-sm text-gray-600">Organize pieces by occasion or style</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
