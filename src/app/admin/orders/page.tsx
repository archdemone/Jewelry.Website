'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function AdminOrdersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const rows = [
    {
      id: '1001',
      date: '2024-05-01',
      customer: 'Alice Johnson',
      total: '£250.00',
      payment: 'Paid',
      fulfillment: 'Unfulfilled',
    },
    {
      id: '1002',
      date: '2024-05-02',
      customer: 'Bob Smith',
      total: '£120.00',
      payment: 'Pending',
      fulfillment: 'Pending',
    },
  ];
  return (
    <div className="space-y-4">
              <div className="text-2xl font-bold">Orders</div>
              <Card className="p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
              <Input placeholder="Search order # or customer..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
              <select className="rounded border px-2 py-1 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
              <option value="all">All</option>
              <option value="unfulfilled">Unfulfilled</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              </select>
              <input type="date" className="rounded border px-2 py-1 text-sm" />
              <input type="date" className="rounded border px-2 py-1 text-sm" />
              <Button variant="outline">Export</Button>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
              <thead className="text-xs uppercase text-gray-500">
              <tr>
              <th className="py-2 text-left">Order</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Total</th>
              <th className="py-2 text-left">Payment</th>
              <th className="py-2 text-left">Fulfillment</th>
              <th className="py-2 text-left">Actions</th>
              </tr>
              </thead>
              <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
              <td className="py-2">#{r.id}</td>
              <td className="py-2">{r.date}</td>
              <td className="py-2">{r.customer}</td>
              <td className="py-2">{r.total}</td>
              <td className="py-2">
              <OrderStatusBadge status={r.payment} />
              </td>
              <td className="py-2">{r.fulfillment}</td>
              <td className="py-2">
              <a href={`/admin/orders/${r.id}`} className="text-amber-700">
                      View
                    </a>
              </td>
              </tr>
              ))}
            </tbody>
              </table>
              </div>
              </Card>
              </div>
  );
}
