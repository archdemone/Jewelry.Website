import { Card } from '@/components/ui/card';

export function RecentOrders() {
  const rows = [
      { id: '1001', customer: 'Alice Johnson', total: '£250.00', status: 'Paid' },
  { id: '1002', customer: 'Bob Smith', total: '£120.00', status: 'Pending' },
  { id: '1003', customer: 'Carol Lee', total: '£980.00', status: 'Refunded' },
  ];
  return (
    <Card className="p-4">
      <div className="mb-3 font-semibold">Recent Orders</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="py-2 text-left">Order</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Total</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2">#{r.id}</td>
                <td className="py-2">{r.customer}</td>
                <td className="py-2">{r.total}</td>
                <td className="py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default RecentOrders;
