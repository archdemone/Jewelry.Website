'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BulkActions from '@/components/admin/BulkActions';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  Package,
  Settings,
  Star,
} from 'lucide-react';
import { ColorChip } from '@/components/admin/ColorChip';

interface RingProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  subCategory?: string;
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
  rating?: number;
  reviews?: number;
  status: 'active' | 'draft' | 'archived';
  images: string[];
  description?: string;
}

export default function AdminProductsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [material, setMaterial] = useState('all');
  const [readyToShip, setReadyToShip] = useState('all');

  // Default seed data
  const defaultProducts: RingProduct[] = [
    {
      id: 'p1',
      name: "Women's Silver Inlay Ring - Dark Red",
      sku: 'RNG-W-SIL-RED-001',
      category: 'Womens',
      subCategory: 'Inlay Ring',
      price: 299,
      originalPrice: 349,
      material: 'Silver',
      gemColor: 'Red',
      gemDensity: 'medium',
      gemVariation: 'Dark',
      mixColors: [],
      ringSizes: { us: [5, 6, 7, 8, 9], eu: [49, 52, 54, 57, 59] },
      ringWidth: [4, 6, 8],
      isReadyToShip: true,
      rating: 4.8,
      reviews: 24,
      status: 'active',
      images: ['/images/MyImages/IMG-20250816-WA0000.jpg'],
      description: 'Beautiful handcrafted silver ring with dark red gem inlay.',
    },
    {
      id: 'p2',
      name: "Men's Damascus Wedding Ring - Bright Blue",
      sku: 'RNG-M-DAM-BLU-001',
      category: 'Mens',
      subCategory: 'Wedding',
      price: 449,
      material: 'Damascus',
      gemColor: 'Blue',
      gemDensity: 'large',
      gemVariation: 'Bright',
      mixColors: [],
      ringSizes: { us: [8, 9, 10, 11, 12], eu: [57, 59, 61, 63, 65] },
      ringWidth: [6, 8, 10],
      isReadyToShip: true,
      rating: 4.9,
      reviews: 18,
      status: 'active',
      images: ['/images/MyImages/IMG-20250816-WA0001.jpg'],
      description: 'Stunning Damascus steel wedding ring with bright blue gem inlay.',
    },
    {
      id: 'p3',
      name: 'Unisex Carbon Inlay Ring - Mixed Green',
      sku: 'RNG-U-CAR-GRN-001',
      category: 'Unisex',
      subCategory: 'Inlay Ring',
      price: 199,
      originalPrice: 249,
      material: 'Carbon',
      gemColor: 'Green',
      gemDensity: 'small',
      gemVariation: 'Mixed',
      mixColors: ['Green', 'Blue'],
      ringSizes: { us: [6, 7, 8, 9, 10], eu: [52, 54, 57, 59, 61] },
      ringWidth: [4, 6],
      isReadyToShip: false,
      rating: 4.7,
      reviews: 31,
      status: 'draft',
      images: ['/images/MyImages/IMG-20250816-WA0002.jpg'],
      description: 'Lightweight carbon ring with mixed green and blue gem inlay.',
    },
  ];

  const [products, setProducts] = useState<RingProduct[]>(defaultProducts);

  // Load admin-created products from localStorage and merge
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('admin_products') : null;
      if (raw) {
        const created: RingProduct[] = JSON.parse(raw);
        // Deduplicate by id if overlaps
        const map = new Map<string, RingProduct>();
        [...created, ...defaultProducts].forEach((p) => map.set(p.id, p));
        setProducts(Array.from(map.values()));
      } else {
        setProducts(defaultProducts);
      }
    } catch {
      setProducts(defaultProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      query === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.sku.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === 'all' || product.status === status;
    const matchesCategory = category === 'all' || product.category === category;
    const matchesMaterial = material === 'all' || product.material === material;
    const matchesReadyToShip =
      readyToShip === 'all' ||
      (readyToShip === 'ready' && product.isReadyToShip) ||
      (readyToShip === 'custom' && !product.isReadyToShip);

    return (
      matchesQuery && matchesStatus && matchesCategory && matchesMaterial && matchesReadyToShip
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ring Products</h1>
          <p className="mt-1 text-gray-600">Manage your handcrafted ring collection</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gold-500 hover:bg-gold-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Ring
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative min-w-[300px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search rings by name or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="all">All Materials</option>
            {materials.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={readyToShip}
            onChange={(e) => setReadyToShip(e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="ready">Ready to Ship</option>
            <option value="custom">Custom Orders</option>
          </select>

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-gold-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Material
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Gem Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.subCategory}</div>
                        {product.rating && (
                          <div className="mt-1 flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-xs text-gray-500">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{product.category}</div>
                    {product.subCategory && (
                      <div className="text-xs text-gray-500">{product.subCategory}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-xs">
                      {product.material}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <ColorChip gemName={product.gemColor} />
                        <span className="text-xs text-gray-600">
                          {product.gemDensity} • {product.gemVariation}
                        </span>
                      </div>
                      {product.mixColors.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1 text-xs text-gray-600">
                          {product.mixColors.map((c) => (
                            <ColorChip key={c} gemName={c} />
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">£{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          £{product.originalPrice}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.isReadyToShip ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        ✓ Ready to Ship
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Custom Order
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : product.status === 'draft' ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Draft
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Archived
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-1 text-gold-600 hover:text-gold-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/products/${product.id}`}
                        className="p-1 text-gray-600 hover:text-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-1 text-gray-600 hover:text-gray-700">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No rings found</h3>
            <p className="mb-4 text-gray-600">Try adjusting your search or filters</p>
            <Link href="/admin/products/new">
              <Button className="bg-gold-500 hover:bg-gold-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Ring
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rings</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready to Ship</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.isReadyToShip).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-yellow-100 p-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <BulkActions />
    </div>
  );
}
