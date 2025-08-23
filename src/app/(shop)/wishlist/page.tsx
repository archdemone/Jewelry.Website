'use client';

import { WishlistSystem } from '@/components/wishlist/WishlistSystem';

export default function WishlistPage() {
  const handleRemoveItem = (itemId: string) => {
    console.log('Remove item:', itemId);
    // Implementation will be added when we integrate with a backend
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Implementation will be added when we integrate with cart system
  };

  const handleShare = (productId: string) => {
    console.log('Share product:', productId);
    // Implementation will be added for sharing functionality
  };

  return (
    <div className="container py-8">
              <WishlistSystem onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
      />
              </div>
  );
}
