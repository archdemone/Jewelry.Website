import { Card } from '@/components/ui/card';

export function CustomerTable() {
  const rows = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      orders: 5,
      total: '£1,250',
      joined: '2024-01-12',
      status: 'Active',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      orders: 1,
      total: '£80',
      joined: '2024-03-02',
      status: 'Inactive',
    },
    {
      name: 'Carol Lee',
      email: 'carol@example.com',
      orders: 9,
      total: '£2,980',
      joined: '2023-11-20',
      status: 'Active',
    },
  ];
  return (
    <Card className="p-4">
      <div className="mb-3 font-semibold">Customers</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Orders</th>
              <th className="py-2 text-left">Total Spent</th>
              <th className="py-2 text-left">Joined</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.email} className="border-t">
                <td className="py-2">{r.name}</td>
                <td className="py-2">{r.email}</td>
                <td className="py-2">{r.orders}</td>
                <td className="py-2">{r.total}</td>
                <td className="py-2">{r.joined}</td>
                <td className="py-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CustomerTable;
