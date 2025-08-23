'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, User, Verified, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  productVariant?: {
    size?: string;
    material?: string;
    color?: string;
  };
}

interface ReviewSystemProps {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Absolutely stunning!',
    content: 'This ring exceeded my expectations. The craftsmanship is incredible and it fits perfectly. I get compliments every time I wear it.',
    date: '2024-01-15',
    verified: true,
    helpful: 12,
    notHelpful: 0,
    productVariant: {
      size: '7',
      material: 'Rose Gold',
    }
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Michael R.',
    rating: 4,
    title: 'Great quality, fast shipping',
    content: 'Very happy with the purchase. The quality is excellent and shipping was faster than expected. Only minor issue was the packaging could be more premium.',
    date: '2024-01-10',
    verified: true,
    helpful: 8,
    notHelpful: 1,
    productVariant: {
      size: '9',
      material: 'White Gold',
    }
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Emma L.',
    rating: 5,
    title: 'Perfect engagement ring!',
    content: 'We chose this for our engagement and it was the perfect choice. The diamond is brilliant and the setting is secure. Highly recommend!',
    date: '2024-01-05',
    verified: true,
    helpful: 15,
    notHelpful: 0,
    productVariant: {
      size: '6.5',
      material: 'Platinum',
    }
  }
];

export function ReviewSystem({ productId, reviews = mockReviews, averageRating = 4.6, totalReviews = 23 }: ReviewSystemProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const StarRating = ({ rating, size = 'small' }: { rating: number; size?: 'small' | 'medium' | 'large' }) => {
    const sizeClasses = {
      small: 'h-4 w-4',
      medium: 'h-5 w-5',
      large: 'h-6 w-6'
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star}
            className={`${sizeClasses[size]} ${star <= rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  const RatingDistribution = () => {
    const distribution = [
      { stars: 5, count: 15, percentage: 65 },
      { stars: 4, count: 6, percentage: 26 },
      { stars: 3, count: 2, percentage: 9 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ];

    return (
      <div className="space-y-2">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 min-w-[60px]">
              <span>{item.stars}</span>
              <Star className="h-3 w-3 text-gold-500 fill-gold-500" />
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gold-500 h-2 rounded-full transition-all duration-300" style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-gray-600 min-w-[30px] text-right">{item.count}</span>
          </div>
        ))}
      </div>
    );
  };

  const filteredAndSortedReviews = React.useMemo(() => {
    let filtered = reviews;

    if (filterRating) {
      filtered = reviews.filter(review => review.rating === filterRating);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return sorted;
  }, [reviews, sortBy, filterRating]);

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg"
      >
        <div className="text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
              <StarRating rating={Math.round(averageRating)} size="medium" />
              <p className="text-sm text-gray-600 mt-1">Based on {totalReviews} reviews</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Rating Distribution</h4>
          <RatingDistribution />
        </div>
      </motion.div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <button onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <h4 className="font-medium text-gray-900 mb-3">Filter by Rating</h4>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterRating(null)} className={`px-3 py-1 rounded-full text-sm transition-colors ${filterRating === null
                  ? 'bg-gold-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button key={rating} onClick={() => setFilterRating(rating)} className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${filterRating === rating
                    ? 'bg-gold-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating} <Star className="h-3 w-3" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review, index) => (
          <motion.div key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-6 bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {review.userAvatar ? (
                  {/* eslint-disable-next-line @next/next/no-img-element */ }
                  < Image
                    src={review.userAvatar}
                alt={review.userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                  />
                ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Verified className="h-4 w-4" />
                        <span className="text-xs">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  {review.productVariant && (
                    <div className="text-xs text-gray-500">
                      {review.productVariant.size && `Size: ${review.productVariant.size}`}
                      {review.productVariant.material && ` • ${review.productVariant.material}`}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                </div>

                {/* Helpful buttons */}
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Was this helpful?</span>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{review.notHelpful}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write Review Button */}
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <button className="px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors">
          Write a Review
        </button>
      </motion.div>
    </div>
  );
}
