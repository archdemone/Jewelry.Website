'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BulkActions from '@/components/admin/BulkActions';
import { Badge } from '@/components/ui/badge';

export default function AdminProductsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const rows = [
    {
      id: 'p1',
      image: '/placeholder.png',
      name: 'Gold Ring',
      sku: 'RNG-001',
      category: 'Rings',
      price: '$199.00',
      stock: 12,
      status: 'active',
    },
    {
      id: 'p2',
      image: '/placeholder.png',
      name: 'Diamond Necklace',
      sku: 'NCK-014',
      category: 'Necklaces',
      price: '$1,299.00',
      stock: 2,
      status: 'draft',
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Products</div>
        <Link href="/admin/products/new" className="btn btn-primary">
          <Button>Add New</Button>
        </Link>
      </div>
      <Card className="p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search name or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
          <select
            className="rounded border px-2 py-1 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="rings">Rings</option>
            <option value="necklaces">Necklaces</option>
          </select>
          <select
            className="rounded border px-2 py-1 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-gray-500">
              <tr>
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-left">SKU</th>
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Stock</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded bg-gray-200" />
                      <div className="font-medium">{r.name}</div>
                    </div>
                  </td>
                  <td className="py-2">{r.sku}</td>
                  <td className="py-2">{r.category}</td>
                  <td className="py-2">{r.price}</td>
                  <td className="py-2">{r.stock}</td>
                  <td className="py-2">
                    {r.status === 'active' ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${r.id}`} className="text-amber-700">
                        Edit
                      </Link>
                      <button className="text-gray-600">Delete</button>
                      <button className="text-gray-600">Duplicate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <BulkActions />
    </div>
  );
}
