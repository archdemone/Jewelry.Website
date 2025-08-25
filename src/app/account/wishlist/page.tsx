'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { WishlistSystem } from '@/components/wishlist/WishlistSystem';
import { useWishlistStore } from '@/store/wishlist';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function WishlistPage() {
  const { data: session } = useSession();
  const { items, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();

  useEffect(() => {
    if (session?.user && (session.user as any).id) {
      fetchWishlist((session.user as any).id);
    }
  }, [session?.user, fetchWishlist]);

  const handleRemoveItem = async (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      await removeFromWishlist(item.productId);
    }
  };

  const handleAddToCart = async (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  const handleShare = async (productId: string) => {
    // TODO: Implement share functionality
    console.log('Share product:', productId);
  };

  return (
    <AuthGuard>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <WishlistSystem 
          items={items}
          onRemoveItem={handleRemoveItem}
          onAddToCart={handleAddToCart}
          onShare={handleShare}
        />
      </div>
    </AuthGuard>
  );
}
