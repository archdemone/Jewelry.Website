'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, Edit, Eye } from 'lucide-react';
import SmartImage from '@/components/common/SmartImage';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import { DEFAULT_PLACEHOLDER } from '@/lib/assets/images';

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  material?: string;
  gemColor?: string;
  gemDensity?: string;
  gemVariation?: string;
  ringSize?: string;
  ringWidth?: string;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  material,
  gemColor,
  gemDensity,
  gemVariation,
  ringSize,
  ringWidth,
}: CartItemProps) {
  const { removeItem, setQuantity } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const fallbacks = [DEFAULT_PLACEHOLDER];
  const safePrice = typeof price === 'number' && !Number.isNaN(price) ? price : 0;
  const originalPrice = safePrice * 1.11; // 10% discount
  const discount = originalPrice - safePrice;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    setQuantity(id, newQuantity);
    toast.success('Quantity updated');
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    removeItem(id);
    toast('Removed from cart', { icon: '🗑️' });
    setIsUpdating(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="h-32 w-32 overflow-hidden rounded-lg bg-gray-100">
            <SmartImage
              srcs={image ? [image, ...fallbacks] : fallbacks}
              alt={name}
              className="h-full w-full object-cover"
              width={128}
              height={128}
            />
          </div>
          {/* Discount Badge */}
          <div className="absolute -left-2 -top-2 rounded bg-black px-2 py-1 text-xs font-bold text-green-400">
            -10%
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Product Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <p className="mb-1 text-sm text-orange-500">#customring01</p>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2" onClick={handleRemove}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                View Details
              </Button>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Ring Size</span>
                <span className="font-medium text-gray-900">{ringSize || 'N (Ø 17,1)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gem Color</span>
                <span className="font-medium text-gray-900">{gemColor || 'Red'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gem Density</span>
                <span className="font-medium capitalize text-gray-900">
                  {gemDensity || 'medium'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Material</span>
                <span className="font-medium text-gray-900">{material || '925 Silver'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gem Variation</span>
                <span className="font-medium text-gray-900">{gemVariation || 'Dark'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ring Width</span>
                <span className="font-medium text-gray-900">
                  {ringWidth ? `${ringWidth}mm` : '6mm'}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mb-4 space-y-2">
            <div className="cursor-pointer text-sm text-blue-600 hover:underline">
              + Extended Protection Plan
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="gift-wrapping" className="rounded" />
              <label htmlFor="gift-wrapping" className="text-sm text-gray-700">
                Add free gift wrapping
              </label>
            </div>
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Qty {quantity}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={isUpdating || quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isUpdating}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">£{safePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">
                  £{originalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
