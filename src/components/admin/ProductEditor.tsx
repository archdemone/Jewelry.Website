'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getProductImage } from '@/lib/assets/images';
import type { Product } from '@/types';
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Star,
  X,
  Save,
} from 'lucide-react';

interface ImageFile {
  name: string;
  url: string;
  size: number;
}

type ProductEditorProps = {
  product?: Product;               // undefined = create
  open: boolean;
  onClose: () => void;
  onSaved: (p: Product) => void;   // return saved product from API response
  mode?: 'main' | 'featured';      // 'main' for main products, 'featured' for featured products
};

export default function ProductEditor({ product, open, onClose, onSaved, mode = 'main' }: ProductEditorProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [hoveredGemColor, setHoveredGemColor] = useState<string | null>(null);
  const [hoveredGemColor2, setHoveredGemColor2] = useState<string | null>(null);
  const [hoveredMixColor, setHoveredMixColor] = useState<string | null>(null);
  const [hoveredMixColor2, setHoveredMixColor2] = useState<string | null>(null);

  // Categories and options
  const categories = ['mens-rings', 'womens-rings', 'unisex-rings', 'wedding-rings', 'engagement-rings', 'inlay-rings', 'statement-rings'];
  const materials = ['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'];
  const gemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const gemDensities = ['small', 'medium', 'large'];
  const gemVariations = ['Dark', 'Mixed', 'Bright'];

  // Helper functions for gem colors
  const getGemColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      'Red': '#dc2626',
      'Green': '#16a34a',
      'Blue': '#2563eb',
      'Purple': '#9333ea',
      'Yellow': '#ca8a04',
      'Custom': '#6b7280',
    };
    return colorMap[color] || '#6b7280';
  };

  const getGemColorImage = (color: string): string => {
    const imageMap: Record<string, string> = {
      'Red': '/images/gems/colour/red.jpg',
      'Green': '/images/gems/colour/green.jpg',
      'Blue': '/images/gems/colour/blue.jpg',
      'Purple': '/images/gems/colour/purple.jpg',
      'Yellow': '/images/gems/colour/yellow.jpg',
      'Custom': '/images/gems/colour/custom.jpg',
    };
    return imageMap[color] || '/images/gems/colour/custom.jpg';
  };

  // Normalize images from API response (handles both array and JSON string)
  function normalizeImages(x: unknown): string[] {
    if (Array.isArray(x)) return x as string[];
    if (typeof x === 'string') {
      try {
        const j = JSON.parse(x);
        return Array.isArray(j) ? j : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  useEffect(() => {
    if (open) {
      if (product) {
        // Convert FeaturedProduct to Product format if needed
        if (mode === 'featured') {
          const convertedProduct = {
            ...product,
            images: (product as any).image ? [(product as any).image] : [], // Convert single image to array
          };
          setEditingProduct(convertedProduct);
        } else {
          setEditingProduct({ ...product });
        }
        setIsAddingProduct(false);
      } else {
        setEditingProduct({
          id: 0,
          name: '',
          sku: '',
          slug: '',
          category: 'Womens',
          price: 0,
          material: 'Silver',
          gemColor: 'Red',
          gemDensity: 'medium',
          gemVariation: 'Dark',
          mixColors: [],
          ringSizes: { us: [6, 7, 8, 9], eu: [52, 54, 57, 59] },
          ringWidth: [4, 6, 8],
          isReadyToShip: false,
          isInStock: true,
          status: 'draft',
          images: [],
          isFeatured: false,
        });
        setIsAddingProduct(true);
      }
      loadImages();
    }
  }, [open, product, mode]);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/images');
      if (response.ok) {
        const data = await response.json();
        setAvailableImages(data);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  // Helper function to get the correct image for display
  const getDisplayImage = (product: Product) => {
    if (mode === 'featured') {
      // For featured products, use the single image field
      return (product as any).image || '/images/placeholder.png';
    } else {
      // For main products, use the images array
      return getProductImage(product);
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      if (mode === 'featured') {
        // For featured products, convert the Product type back to FeaturedProduct format
        const featuredProduct = {
          ...editingProduct,
          id: String(editingProduct.id), // Ensure ID is string for FeaturedProduct
          image: editingProduct.images?.[0] || '', // Convert images array to single image
        };
        onSaved(featuredProduct as any);
        onClose();
      } else {
        // For main products, use the API
        const method = isAddingProduct ? 'POST' : 'PUT';
        const url = '/api/products';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProduct),
        });

        if (response.ok) {
          const savedProduct = await response.json();

          // Normalize images in the returned product
          const normalizedSavedProduct = {
            ...savedProduct,
            images: normalizeImages(savedProduct.images)
          };

          onSaved(normalizedSavedProduct);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (!open || !editingProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isAddingProduct ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)] overflow-hidden">
          {/* Left Column - Product Images */}
          <div className="w-1/3 p-6 border-r bg-gray-50 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>

            {/* Main Image Preview */}
            <div className="mb-6">
              <div className="relative aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                <img
                  src={getDisplayImage(editingProduct)}
                  alt={editingProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
                {editingProduct.isReadyToShip && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Ready to Ship
                  </div>
                )}
                {editingProduct.status && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
                    editingProduct.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      editingProduct.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {editingProduct.status === 'active' ? 'Active' :
                      editingProduct.status === 'draft' ? 'Draft' :
                        editingProduct.status === 'archived' ? 'Archived' :
                          'Out of Stock'}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Images Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Images</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {availableImages.map((image) => (
                  <button key={image.url} onClick={() => {
                    const currentImages = editingProduct.images || [];
                    const newImages = currentImages.includes(image.url)
                      ? currentImages.filter(img => img !== image.url)
                      : [...currentImages, image.url];
                    setEditingProduct({ ...editingProduct, images: newImages });
                  }} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${(editingProduct.images || []).includes(image.url)
                    ? 'border-gold-500 ring-2 ring-gold-200'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getProductImage({ images: [image.url] })}
                      alt={image.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    {(editingProduct.images || []).includes(image.url) && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Product Name & SKU - Side by Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" value={editingProduct.sku} onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Category & Sub Category - Side by Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <input type="text" value={editingProduct.subCategory || ''} onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                  placeholder="e.g., Engagement, Anniversary"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Price & Original Price - Side by Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (£)</label>
                <input type="number" value={editingProduct.originalPrice || ''} onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Material - Full Width */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <select value={editingProduct.material} onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  {materials.map((material) => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
              </div>

              {/* Primary Gem Color & Mix Colors - Side by Side */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Gem Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {gemColors.map((color) => (
                        <button key={color}
                          type="button" onClick={() => setEditingProduct({ ...editingProduct, gemColor: color })} onMouseEnter={() => setHoveredGemColor(color)} onMouseLeave={() => setHoveredGemColor(null)} className={`relative rounded-lg border-2 p-3 transition-all ${editingProduct.gemColor === color
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" style={{
                              backgroundColor: getGemColorHex(color),
                              aspectRatio: '1 / 1',
                              minWidth: '16px',
                              minHeight: '16px'
                            }}
                            />
                            <span className="text-sm font-medium">{color}</span>
                          </div>

                          {/* Gem Color Popup */}
                          {hoveredGemColor === color && (
                            <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                              <div className="rounded-lg border bg-white p-4 shadow-lg">
                                <img
                                  src={getGemColorImage(color)}
                                  alt={`${color} gem`}
                                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors (for Custom option)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                        <label key={color}
                          className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer" onMouseEnter={() => setHoveredMixColor(color)} onMouseLeave={() => setHoveredMixColor(null)}
                        >
                          <input type="checkbox" checked={(editingProduct.mixColors || []).includes(color)} onChange={(e) => {
                            const currentMixColors = editingProduct.mixColors || [];
                            const newMixColors = e.target.checked
                              ? [...currentMixColors, color]
                              : currentMixColors.filter(c => c !== color);
                            setEditingProduct({ ...editingProduct, mixColors: newMixColors });
                          }}
                            className="mr-2"
                          />
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{
                              backgroundColor: getGemColorHex(color),
                              aspectRatio: '1 / 1',
                              minWidth: '16px',
                              minHeight: '16px'
                            }}
                            />
                            <span className="text-sm truncate">{color}</span>
                          </div>

                          {/* Mix Color Popup */}
                          {hoveredMixColor === color && (
                            <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                              <div className="rounded-lg border bg-white p-4 shadow-lg">
                                <img
                                  src={getGemColorImage(color)}
                                  alt={`${color} gem`}
                                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Gem Color & Mix Colors for Couple Rings - Side by Side */}
              {editingProduct.category === 'Couple Ring Set' && (
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Second Gem Color (Ring 2)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {gemColors.map((color) => (
                          <button key={color}
                            type="button" onClick={() => setEditingProduct({ ...editingProduct, gemColor2: color })} onMouseEnter={() => setHoveredGemColor2(color)} onMouseLeave={() => setHoveredGemColor2(null)} className={`relative rounded-lg border-2 p-3 transition-all ${editingProduct.gemColor2 === color
                              ? 'border-gold-500 bg-gold-50'
                              : 'border-gray-300 hover:border-gray-400'
                              }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" style={{
                                backgroundColor: getGemColorHex(color),
                                aspectRatio: '1 / 1',
                                minWidth: '16px',
                                minHeight: '16px'
                              }}
                              />
                              <span className="text-sm font-medium">{color}</span>
                            </div>

                            {/* Gem Color Popup */}
                            {hoveredGemColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-4 shadow-lg">
                                  <img
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mix Colors for Ring 2 (Custom option)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Black', 'White', 'Pink', 'Orange', 'Turquoise'].map((color) => (
                          <label key={color}
                            className="relative flex items-center p-2 rounded border hover:bg-gray-50 cursor-pointer" onMouseEnter={() => setHoveredMixColor2(color)} onMouseLeave={() => setHoveredMixColor2(null)}
                          >
                            <input type="checkbox" checked={editingProduct.mixColors2?.includes(color) || false} onChange={(e) => {
                              const newMixColors2 = e.target.checked
                                ? [...(editingProduct.mixColors2 || []), color]
                                : (editingProduct.mixColors2 || []).filter(c => c !== color);
                              setEditingProduct({ ...editingProduct, mixColors2: newMixColors2 });
                            }}
                              className="mr-2"
                            />
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0" style={{
                                backgroundColor: getGemColorHex(color),
                                aspectRatio: '1 / 1',
                                minWidth: '16px',
                                minHeight: '16px'
                              }}
                              />
                              <span className="text-sm truncate">{color}</span>
                            </div>

                            {/* Mix Color Popup */}
                            {hoveredMixColor2 === color && (
                              <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform">
                                <div className="rounded-lg border bg-white p-4 shadow-lg">
                                  <img
                                    src={getGemColorImage(color)}
                                    alt={`${color} gem`}
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gem Density & Gem Variation - Side by Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gem Density</label>
                <select value={editingProduct.gemDensity} onChange={(e) => setEditingProduct({ ...editingProduct, gemDensity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  {gemDensities.map((density) => (
                    <option key={density} value={density}>{density}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gem Variation</label>
                <select value={editingProduct.gemVariation} onChange={(e) => setEditingProduct({ ...editingProduct, gemVariation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  {gemVariations.map((variation) => (
                    <option key={variation} value={variation}>{variation}</option>
                  ))}
                </select>
              </div>

              {/* Ring Sizes & Ring Width - Side by Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (US)</label>
                <input type="text" value={editingProduct.ringSizes?.us?.join(', ') || ''} onChange={(e) => {
                  const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                  setEditingProduct({
                    ...editingProduct,
                    ringSizes: { ...editingProduct.ringSizes, us: sizes }
                  });
                }}
                  placeholder="e.g., 5, 6, 7, 8, 9"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ring Sizes (EU)</label>
                <input type="text" value={editingProduct.ringSizes?.eu?.join(', ') || ''} onChange={(e) => {
                  const sizes = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                  setEditingProduct({
                    ...editingProduct,
                    ringSizes: { ...editingProduct.ringSizes, eu: sizes }
                  });
                }}
                  placeholder="e.g., 49, 52, 54, 57, 59"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ring Width (mm)</label>
                <input type="text" value={editingProduct.ringWidth?.join(', ') || ''} onChange={(e) => {
                  const widths = e.target.value.split(',').map(s => s.trim()).filter(s => s).map(Number);
                  setEditingProduct({ ...editingProduct, ringWidth: widths });
                }}
                  placeholder="e.g., 2, 3, 4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Status - Side by Side with Ring Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={editingProduct.status} onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Ready to Ship & In Stock - Side by Side */}
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox"
                    id="readyToShip" checked={editingProduct.isReadyToShip} onChange={(e) => setEditingProduct({ ...editingProduct, isReadyToShip: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="readyToShip" className="text-sm font-medium text-gray-700">Ready to Ship</label>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox"
                    id="isInStock" checked={editingProduct.isInStock ?? true} onChange={(e) => setEditingProduct({ ...editingProduct, isInStock: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isInStock" className="text-sm font-medium text-gray-700">In Stock</label>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox"
                    id="isFeatured" checked={editingProduct.isFeatured || false} onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      isFeatured: e.target.checked,
                      featuredOrder: e.target.checked ? (editingProduct.featuredOrder || 1) : null
                    })}
                    className="rounded"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
                </div>
              </div>

              {/* Featured Order - Manual Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Order</label>
                <input type="number" value={editingProduct.featuredOrder || ''} onChange={(e) => setEditingProduct({
                  ...editingProduct,
                  featuredOrder: e.target.value ? parseInt(e.target.value) : null
                })}
                  placeholder="e.g., 1, 2, 3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Description - Full Width */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editingProduct.description || ''} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>

              {/* Status Badge Preview - Full Width */}
              <div className="col-span-2 mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Status Preview</h4>
                <div className="flex items-center gap-2">
                  {/* Status Badge - Show for valid statuses */}
                  {editingProduct.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${editingProduct.status === 'active' ? 'bg-green-100 text-green-800' :
                      editingProduct.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        editingProduct.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {editingProduct.status === 'active' ? 'Active' :
                        editingProduct.status === 'draft' ? 'Draft' :
                          editingProduct.status === 'archived' ? 'Archived' :
                            'Unknown'}
                    </span>
                  )}

                  {/* Stock Status - Based on isInStock property */}
                  {editingProduct.isInStock !== false && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      In Stock
                    </span>
                  )}
                  {editingProduct.isInStock === false && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}

                  {/* Ready to Ship */}
                  {editingProduct.isReadyToShip && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Ready to Ship
                    </span>
                  )}

                  {/* Featured */}
                  {editingProduct.isFeatured && (
                    <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
              <button onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleSaveProduct}
                className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isAddingProduct ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
