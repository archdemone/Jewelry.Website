'use client';

import React from 'react';

interface ReviewSystemProps {
  productId: string;
  reviews?: any[];
  averageRating?: number;
  totalReviews?: number;
}

export function ReviewSystem({ productId }: ReviewSystemProps) {
  return (
    <div className="space-y-6">
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Reviews</h3>
        <p className="text-gray-600">Reviews feature coming soon!</p>
      </div>
    </div>
  );
}
