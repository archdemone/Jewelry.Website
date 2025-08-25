'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Eye, X, Star } from 'lucide-react';
import { getFeaturedProducts, type FeaturedProduct } from '@/lib/featured-products';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { showToast } from '@/components/ui/SimpleToast';

const FeaturedProducts = () => {

  const [featuredRings, setFeaturedRings] = useState<FeaturedProduct[]>([]);
  const [mounted, setMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<FeaturedProduct | null>(null);
  const [showAddToCartToast, setShowAddToCartToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<FeaturedProduct | null>(null);
  const { addItem, items, isHydrated } = useCartStore();

  // Use Zustand wishlist store
  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem, isInWishlist, hydrate, hydrated } = useWishlistStore();

  // Customization state
  const [customization, setCustomization] = useState({
    material: '',
    gemColor: '',
    gemDensity: '',
    gemVariation: '',
    ringSize: '',
    ringWidth: '',
    mixColors: [] as string[],
    sizeType: 'us' as 'us' | 'eu'
  });

  const availableMaterials = ['Silver', 'Damascus', 'Ceramic(white)', 'Ceramic(black)', 'Carbon', 'Tungsten', 'Titanium', 'Stainless Steel', 'Gold'];
  const availableGemColors = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Custom'];
  const availableGemDensities = ['small', 'medium', 'large'];
  const availableGemVariations = ['Dark', 'Mixed', 'Bright'];

  useEffect(() => {
    setMounted(true);
    // Hydrate wishlist store
    hydrate();

    // Load featured products immediately after mounting
    setFeaturedRings(getFeaturedProducts());

    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Wishlist is now handled by Zustand store
      // No need to load from localStorage manually

      // Listen for storage changes to refresh the data
      const handleStorageChange = () => {
        setFeaturedRings(getFeaturedProducts());
      };

      window.addEventListener('storage', handleStorageChange);

      // Also listen for custom events (for same-tab updates)
      window.addEventListener('featuredProductsUpdated', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('featuredProductsUpdated', handleStorageChange);
      };
    }
  }, [hydrate]);

  const handleWishlistToggle = (productId: string) => {
    const product = featuredRings.find(ring => ring.id === productId);

    if (isInWishlist(productId)) {
      removeWishlistItem(productId);
      showToast(`${product?.name} removed from wishlist`, 'info');
    } else if (product) {
      addWishlistItem({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug || '',
        material: product.material || undefined,
        gemColor: product.gemColor || undefined,
        category: product.category || undefined,
      });
      showToast(`${product?.name} added to wishlist!`, 'success');
    }
  };

  const handleAddToCart = (ring: FeaturedProduct) => {
    if (!isHydrated) {
      showToast('Cart is still loading, please try again', 'error');
      return;
    }

    addItem({
      productId: ring.id,
      name: ring.name,
      price: ring.price,
      image: ring.image,
      material: ring.material,
      gemColor: ring.gemColor,
      gemDensity: ring.gemDensity,
      gemVariation: ring.gemVariation,
      ringSize: ring.ringSizes.us[0]?.toString() || '7',
      ringWidth: ring.ringWidth[0]?.toString() || '6'
    });

    // Show success toast
    showToast(`${ring.name} added to cart!`, 'success');
  };

  const initializeCustomization = (product: FeaturedProduct) => {
    setCustomization({
      material: product.material,
      gemColor: product.gemColor,
      gemDensity: product.gemDensity,
      gemVariation: product.gemVariation,
      ringSize: product.ringSizes.us[0]?.toString() || '',
      ringWidth: product.ringWidth[0]?.toString() || '',
      mixColors: product.mixColors,
      sizeType: 'us'
    });
  };

  const hasCustomizationChanged = () => {
    if (!quickViewProduct) return false;
    return (
      customization.material !== quickViewProduct.material ||
      customization.gemColor !== quickViewProduct.gemColor ||
      customization.gemDensity !== quickViewProduct.gemDensity ||
      customization.gemVariation !== quickViewProduct.gemVariation
    );
  };

  const handleCustomizeClick = () => {
    if (!quickViewProduct) return;

    // Create custom product name
    const customName = `Custom ${quickViewProduct.name}`;

    addItem({
      productId: `custom-${quickViewProduct.id}`,
      name: customName,
      price: quickViewProduct.price,
      image: quickViewProduct.image,
      material: customization.material as any,
      gemColor: customization.gemColor as any,
      gemDensity: customization.gemDensity as any,
      gemVariation: customization.gemVariation as any,
      ringSize: customization.ringSize,
      ringWidth: customization.ringWidth
    });

    setShowAddToCartToast(true);
    setAddedProduct({ ...quickViewProduct, name: customName });
    setQuickViewProduct(null);

    setTimeout(() => {
      setShowAddToCartToast(false);
      setAddedProduct(null);
    }, 3000);
  };

  const handleWishlistClick = () => {
    if (!quickViewProduct) return;
    // This function is no longer needed as isInWishlist and removeWishlistItem are removed.
    // The logic for adding/removing from wishlist is now handled by Zustand.
  };

  // Show 6 products for better engagement and variety
  const initialProducts = featuredRings.slice(0, 6);

  // Show loading state only if not mounted or no products loaded
  if (!mounted || featuredRings.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl heading-primary text-charcoal-900 mb-4">
              Featured Rings
            </h2>
            <p className="text-xl body-text text-gray-600 max-w-2xl mx-auto">
              Discover our most popular handcrafted pieces, each telling a unique story of craftsmanship and beauty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" data-testid="featured-products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl heading-primary text-charcoal-900 mb-4"
          >
            Featured Rings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl body-text text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular handcrafted pieces, each telling a unique story of craftsmanship and beauty.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-products-grid">
          {initialProducts.map((ring, index) => (
            <motion.div key={ring.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all"
            >
              {/* Product Image */}
              <div className="relative h-64">
                <img
                  src={ring.image}
                  alt={ring.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Ready to Ship Badge */}
                {ring.isReadyToShip && (
                  <div className="absolute left-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                    ✓ Ready to Ship
                  </div>
                )}

                {/* Quick View Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setQuickViewProduct(ring);
                    initializeCustomization(ring);
                  }}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-colors hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Color Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
                    {ring.material}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded border ${ring.gemColor === 'Red' ? 'bg-red-100 text-red-800 border-red-300' :
                      ring.gemColor === 'Blue' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        ring.gemColor === 'Green' ? 'bg-green-100 text-green-800 border-green-300' :
                          ring.gemColor === 'Purple' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                            ring.gemColor === 'Yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                              'bg-gray-100 text-gray-700 border-gray-300'
                    }`}>
                    {ring.gemVariation === 'Dark' ? `Dark ${ring.gemColor}` :
                      ring.gemVariation === 'Bright' ? `Bright ${ring.gemColor}` :
                        ring.gemVariation === 'Mixed' ? `Mixed ${ring.gemColor}` :
                          ring.gemColor}
                  </span>
                </div>

                <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                  {ring.name}
                </h3>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(ring.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({ring.reviews || 12})</span>
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      £{ring.price}
                    </span>
                    {ring.originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        £{ring.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleWishlistToggle(ring.id)}
                    className={`p-2 transition-colors ${isInWishlist(ring.id)
                        ? 'text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(ring.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setQuickViewProduct(ring);
                    initializeCustomization(ring);
                  }}
                  className="w-full rounded-lg bg-white border-2 border-black text-white bg-black py-2 font-medium transition-colors hover:bg-orange-500 hover:text-white hover:border-orange-500"
                >
                  Customize This Ring
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 backdrop-blur-sm pt-20"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="grid lg:grid-cols-3">
                {/* Image Gallery */}
                <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 lg:col-span-1 lg:h-full">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Ready to Ship Badge */}
                  {quickViewProduct.isReadyToShip && (
                    <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                      ✓ Ready to Ship
                    </div>
                  )}
                </div>

                {/* Product Details & Customization */}
                <div className="overflow-y-auto p-4 lg:col-span-2">
                  <h2 className="mb-1 text-xl font-bold text-orange-600">
                    {quickViewProduct.name}
                  </h2>
                  <p className="mb-3 text-sm text-gray-600">{quickViewProduct.description}</p>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(quickViewProduct.rating || 4.5) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({quickViewProduct.reviews || 12} reviews)
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      £{quickViewProduct.price}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="ml-2 text-base text-gray-400 line-through">
                        £{quickViewProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-gray-800">Customize Your Ring</h3>
                      {hasCustomizationChanged() && (
                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                          Customized
                        </span>
                      )}
                    </div>

                    {/* Material Selection */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Material
                      </label>
                      <select
                        value={customization.material}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, material: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        {availableMaterials.map((material) => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Gem Color Selection */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Color
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {availableGemColors.map((color) => (
                          <div key={color} className="group relative">
                            <button
                              onClick={() =>
                                setCustomization((prev) => ({ ...prev, gemColor: color }))
                              }
                              className={`w-full rounded-lg border-2 p-2 text-sm transition-all ${customization.gemColor === color
                                  ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                            >
                              <span className="font-medium text-gray-900">{color}</span>
                            </button>

                            {/* Hover Popup with Gem Image */}
                            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                                <div className="relative h-32 w-32 overflow-hidden rounded">
                                  <img
                                    src={`/images/gems/colour/${color.toLowerCase()}.jpg`}
                                    alt={`${color} gem`}
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                </div>
                                <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 transform border-b border-l border-gray-200 bg-white"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gem Density */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Density
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {availableGemDensities.map((density) => (
                          <button
                            key={density}
                            onClick={() =>
                              setCustomization((prev) => ({ ...prev, gemDensity: density }))
                            }
                            className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemDensity === density
                                ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                          >
                            <span className={`font-medium capitalize ${customization.gemDensity === density ? 'text-gray-900' : 'text-gray-900'
                              }`}>
                              {density}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gem Variation */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gem Variation
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {availableGemVariations.map((variation) => (
                          <button
                            key={variation}
                            onClick={() =>
                              setCustomization((prev) => ({ ...prev, gemVariation: variation }))
                            }
                            className={`rounded-lg border-2 p-2 text-sm transition-all ${customization.gemVariation === variation
                                ? 'border-green-500 bg-green-100 shadow-md ring-2 ring-green-200'
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                          >
                            <span className={`font-medium ${customization.gemVariation === variation ? 'text-gray-900' : 'text-gray-900'
                              }`}>
                              {variation}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ring Size */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ring Size
                      </label>
                      <div className="mb-1 flex gap-3">
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-1 transition-all hover:bg-gray-50">
                          <input
                            type="radio"
                            checked={customization.sizeType === 'us'}
                            onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'us' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
                          <span className="text-xs font-medium text-gray-900">US</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-1 transition-all hover:bg-gray-50">
                          <input
                            type="radio"
                            checked={customization.sizeType === 'eu'}
                            onChange={() =>
                              setCustomization((prev) => ({ ...prev, sizeType: 'eu' }))
                            }
                            className="text-gold-500 focus:ring-gold-500"
                          />
                          <span className="text-xs font-medium text-gray-900">EU</span>
                        </label>
                      </div>
                      <select
                        value={customization.ringSize}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, ringSize: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="">Select size</option>
                        {quickViewProduct.ringSizes[customization.sizeType].map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ring Width */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ring Width (mm)
                      </label>
                      <select
                        value={customization.ringWidth}
                        onChange={(e) =>
                          setCustomization((prev) => ({ ...prev, ringWidth: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="">Select width</option>
                        {quickViewProduct.ringWidth.map((width) => (
                          <option key={width} value={width}>
                            {width}mm
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    {hasCustomizationChanged() ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCustomizeClick}
                        className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                      >
                        Customize This Ring
                      </motion.button>
                    ) : quickViewProduct.isReadyToShip ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => (window.location.href = '/cart')}
                          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                        >
                          Purchase
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(quickViewProduct)}
                          className="flex-1 rounded-lg bg-green-500 py-2 font-medium text-white transition-colors hover:bg-green-600"
                        >
                          Add to Cart
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCustomizeClick}
                        className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-lg"
                      >
                        Customize This Ring
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWishlistClick}
                      className={`flex h-10 w-20 items-center justify-center gap-1 rounded-lg border transition-colors ${isInWishlist(quickViewProduct.id)
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-300 text-gray-900 hover:border-red-400 hover:bg-red-50'
                        }`}
                    >
                      <span className="text-sm">❤️</span>
                      <span className="text-xs font-medium">
                        {isInWishlist(quickViewProduct.id) ? 'Added!' : 'Save'}
                      </span>
                    </motion.button>
                  </div>
                  <Link
                    href={`/products/${quickViewProduct.slug}`}
                    className="mt-3 block text-center text-sm font-medium text-gold-600 hover:text-gold-700"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Toast Popup */}
      <AnimatePresence>
        {showAddToCartToast && addedProduct && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                {/* Success Icon */}
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {addedProduct.name.startsWith('Custom ')
                      ? 'Customized Ring Added!'
                      : 'Added to Cart!'}
                  </p>
                  <p className="truncate text-sm text-gray-600">{addedProduct.name}</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowAddToCartToast(false);
                    setAddedProduct(null);
                  }}
                  className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="h-1 w-full rounded-full bg-gray-200">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                    className="h-1 rounded-full bg-green-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProducts;
