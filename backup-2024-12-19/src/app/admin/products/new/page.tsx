'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Settings,
  Package,
  Gem,
  Ruler,
  Palette,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

interface RingFormData {
  name: string;
  sku: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  material: string;
  gemColor: string;
  gemDensity: string;
  gemVariation: string;
  mixColors: string[];
  ringSizes: {
    us: number[];
    eu: number[];
  };
  ringWidth: number[];
  isReadyToShip: boolean;
  status: 'active' | 'draft';
  images: string[];
  description: string;
}

export default function AddNewRingPage() {
  const [formData, setFormData] = useState<RingFormData>({
    name: '',
    sku: '',
    category: '',
    subCategory: '',
    price: 0,
    originalPrice: undefined,
    material: '',
    gemColor: '',
    gemDensity: '',
    gemVariation: '',
    mixColors: [],
    ringSizes: { us: [], eu: [] },
    ringWidth: [],
    isReadyToShip: false,
    status: 'draft',
    images: [],
    description: '',
  });

  const [showGemPopup, setShowGemPopup] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Wedding',
    'Inlay Ring',
    'Couple Ring Set',
    'Mens',
    'Womens',
    'Unisex',
    'Single Inlay',
    'Double Inlay',
  ];
  const materials = [
    'Silver',
    'Damascus',
    'Ceramic(white)',
    'Ceramic(black)',
    'Carbon',
    'Tungsten',
    'Titanium',
    'Stainless Steel',
    'Gold',
  ];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const gemDensities = ['small', 'medium', 'large'];
  const gemVariations = ['Dark', 'Mixed', 'Bright'];
  const allRingSizes = {
    us: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    eu: [44, 46, 49, 52, 54, 57, 59, 61, 63, 65, 67, 69],
  };
  const allRingWidths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16];

  const gemColorImages = {
    Red: '/images/MyImages/gem-red.jpg',
    Green: '/images/MyImages/gem-green.jpg',
    Blue: '/images/MyImages/gem-blue.jpg',
    Purple: '/images/MyImages/gem-purple.jpg',
    Yellow: '/images/MyImages/gem-yellow.jpg',
    Custom: '/images/MyImages/gem-custom.jpg',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form data:', formData);
    setIsSubmitting(false);

    // Redirect to products list
    window.location.href = '/admin/products';
  };

  const toggleRingSize = (sizeType: 'us' | 'eu', size: number) => {
    setFormData((prev) => ({
      ...prev,
      ringSizes: {
        ...prev.ringSizes,
        [sizeType]: prev.ringSizes[sizeType].includes(size)
          ? prev.ringSizes[sizeType].filter((s) => s !== size)
          : [...prev.ringSizes[sizeType], size].sort((a, b) => a - b),
      },
    }));
  };

  const toggleRingWidth = (width: number) => {
    setFormData((prev) => ({
      ...prev,
      ringWidth: prev.ringWidth.includes(width)
        ? prev.ringWidth.filter((w) => w !== width)
        : [...prev.ringWidth, width].sort((a, b) => a - b),
    }));
  };

  const toggleMixColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      mixColors: prev.mixColors.includes(color)
        ? prev.mixColors.filter((c) => c !== color)
        : [...prev.mixColors, color],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Ring</h1>
            <p className="mt-1 text-gray-600">Create a new handcrafted ring for your collection</p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-gold-500 hover:bg-gold-600"
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Ring
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Ring Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Women's Silver Inlay Ring - Dark Red"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">SKU *</label>
                  <Input
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))}
                    placeholder="e.g., RNG-W-SIL-RED-001"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sub Category
                  </label>
                  <Input
                    value={formData.subCategory}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subCategory: e.target.value }))
                    }
                    placeholder="e.g., Inlay Ring, Wedding Band"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price (£) *
                  </label>
                  <Input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="299.00"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Original Price (£)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))
                    }
                    placeholder="349.00"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Describe the ring's features, craftsmanship, and appeal..."
                  rows={3}
                />
              </div>
            </Card>

            {/* Material & Gem Details */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Gem className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Material & Gem Details</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Material *</label>
                  <select
                    required
                    value={formData.material}
                    onChange={(e) => setFormData((prev) => ({ ...prev, material: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="">Select material</option>
                    {materials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gem Color *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {gemColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, gemColor: color }))}
                        onMouseEnter={() => setShowGemPopup(color)}
                        onMouseLeave={() => setShowGemPopup(null)}
                        className={`relative rounded-lg border-2 p-3 transition-all ${
                          formData.gemColor === color
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-sm font-medium">{color}</span>

                        {/* Gem Color Popup */}
                        {showGemPopup === color &&
                          gemColorImages[color as keyof typeof gemColorImages] && (
                            <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                              <div className="rounded-lg border bg-white p-2 shadow-lg">
                                <img
                                  src={gemColorImages[color as keyof typeof gemColorImages]}
                                  alt={`${color} gem`}
                                  className="h-20 w-20 rounded object-cover"
                                />
                              </div>
                            </div>
                          )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gem Density *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {gemDensities.map((density) => (
                      <button
                        key={density}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, gemDensity: density }))}
                        className={`rounded-lg border-2 p-3 transition-all ${
                          formData.gemDensity === density
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-sm font-medium capitalize">{density}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gem Variation *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {gemVariations.map((variation) => (
                      <button
                        key={variation}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, gemVariation: variation }))
                        }
                        className={`rounded-lg border-2 p-3 transition-all ${
                          formData.gemVariation === variation
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-sm font-medium">{variation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mix Colors */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mix Colors (Optional)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {gemColors
                    .filter((color) => color !== 'Custom')
                    .map((color) => (
                      <label
                        key={color}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.mixColors.includes(color)}
                          onChange={() => toggleMixColor(color)}
                          className="rounded"
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                </div>
              </div>
            </Card>

            {/* Ring Sizes & Widths */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Ring Sizes & Widths</h2>
              </div>

              {/* US Ring Sizes */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  US Ring Sizes
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {allRingSizes.us.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleRingSize('us', size)}
                      className={`rounded-lg border-2 p-2 transition-all ${
                        formData.ringSizes.us.includes(size)
                          ? 'border-gold-500 bg-gold-50 text-gold-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* EU Ring Sizes */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  EU Ring Sizes
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {allRingSizes.eu.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleRingSize('eu', size)}
                      className={`rounded-lg border-2 p-2 transition-all ${
                        formData.ringSizes.eu.includes(size)
                          ? 'border-gold-500 bg-gold-50 text-gold-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Widths */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ring Widths (mm)
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {allRingWidths.map((width) => (
                    <button
                      key={width}
                      type="button"
                      onClick={() => toggleRingWidth(width)}
                      className={`rounded-lg border-2 p-2 transition-all ${
                        formData.ringWidth.includes(width)
                          ? 'border-gold-500 bg-gold-50 text-gold-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {width}mm
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Settings */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Status & Settings</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as 'active' | 'draft',
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isReadyToShip}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isReadyToShip: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Ready to Ship</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Check if this ring is available for immediate purchase
                  </p>
                </div>
              </div>
            </Card>

            {/* Images */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Images</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                  <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload ring images</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Ring ${index + 1}`}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Preview */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gold-600" />
                <h2 className="text-xl font-semibold">Preview</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Name:</span>
                  <p className="text-gray-600">{formData.name || 'Not set'}</p>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-gray-600">{formData.category || 'Not set'}</p>
                </div>
                <div>
                  <span className="font-medium">Material:</span>
                  <p className="text-gray-600">{formData.material || 'Not set'}</p>
                </div>
                <div>
                  <span className="font-medium">Gem:</span>
                  <p className="text-gray-600">
                    {formData.gemColor
                      ? `${formData.gemColor} (${formData.gemDensity}, ${formData.gemVariation})`
                      : 'Not set'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <p className="text-gray-600">£{formData.price || '0'}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge
                    className={
                      formData.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {formData.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Availability:</span>
                  <Badge
                    className={
                      formData.isReadyToShip
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }
                  >
                    {formData.isReadyToShip ? 'Ready to Ship' : 'Custom Order'}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
