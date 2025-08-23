'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Upload, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review must be less than 1000 characters'),
  productVariant: z.object({
    size: z.string().optional(),
    material: z.string().optional(),
    color: z.string().optional(),
  }).optional(),
  wouldRecommend: z.boolean(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface WriteReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (data: ReviewFormData) => void;
  onCancel: () => void;
}

export function WriteReviewForm({ productId, productName, onSubmit, onCancel }: WriteReviewFormProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      wouldRecommend: true,
    },
  });

  const watchedContent = watch('content', '');
  const contentLength = watchedContent?.length || 0;

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + uploadedImages.length <= 5) {
      setUploadedImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data: ReviewFormData) => {
    onSubmit(data);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Write a Review</h3>
        <p className="text-gray-600">Share your experience with {productName}</p>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star}
                type="button" onClick={() => handleRatingSelect(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star className={`h-8 w-8 ${star <= (hoverRating || selectedRating)
                  ? 'text-gold-500 fill-gold-500'
                  : 'text-gray-300 hover:text-gold-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {selectedRating > 0 && (
                <>
                  {selectedRating === 1 && 'Poor'}
                  {selectedRating === 2 && 'Fair'}
                  {selectedRating === 3 && 'Good'}
                  {selectedRating === 4 && 'Very Good'}
                  {selectedRating === 5 && 'Excellent'}
                </>
              )}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
            Review Title *
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Summarize your experience"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-2">
            Your Review *
          </label>
          <textarea
            {...register('content')}
            id="content"
            rows={6}
            placeholder="Tell others about your experience with this product. What did you like or dislike? How was the quality? Would you recommend it?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 resize-none"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.content ? (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.content.message}
              </p>
            ) : (
              <span className="text-sm text-gray-500">Minimum 10 characters</span>
            )}
            <span className={`text-sm ${contentLength > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
              {contentLength}/1000
            </span>
          </div>
        </div>

        {/* Product Variant (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-900 mb-2">
              Size (Optional)
            </label>
            <input
              {...register('productVariant.size')}
              type="text"
              id="size"
              placeholder="e.g., 7"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-900 mb-2">
              Material (Optional)
            </label>
            <input
              {...register('productVariant.material')}
              type="text"
              id="material"
              placeholder="e.g., Rose Gold"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-900 mb-2">
              Color (Optional)
            </label>
            <input
              {...register('productVariant.color')}
              type="text"
              id="color"
              placeholder="e.g., Silver"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Add Photos (Optional)
          </label>
          <div className="space-y-3">
            {uploadedImages.length < 5 && (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gold-400 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photos</p>
                  <p className="text-xs text-gray-500">Max 5 photos</p>
                </div>
                <input type="file"
                  multiple accept="image/*" onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button type="button" onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Would Recommend */}
        <div>
          <label className="flex items-center gap-3">
            <input
              {...register('wouldRecommend')}
              type="checkbox"
              className="w-4 h-4 text-gold-600 bg-gray-100 border-gray-300 rounded focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-900">
              I would recommend this product to others
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
