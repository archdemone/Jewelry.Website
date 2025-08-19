import { Card } from '@/components/ui/card';

export function InventoryTable() {
  const rows = [
    { sku: 'RNG-001', name: 'Gold Ring', stock: 12, low: 5 },
    { sku: 'NCK-014', name: 'Diamond Necklace', stock: 2, low: 3 },
    { sku: 'BRC-201', name: 'Silver Bracelet', stock: 0, low: 4 },
  ];
  return (
    <Card className="p-4">
      <div className="mb-3 font-semibold">Inventory</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="py-2 text-left">SKU</th>
              <th className="py-2 text-left">Product</th>
              <th className="py-2 text-left">Stock</th>
              <th className="py-2 text-left">Low Threshold</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.sku}
                className={`border-t ${r.stock === 0 ? 'bg-red-50' : r.stock <= r.low ? 'bg-amber-50' : ''}`}
              >
                <td className="py-2">{r.sku}</td>
                <td className="py-2">{r.name}</td>
                <td className="py-2">{r.stock}</td>
                <td className="py-2">{r.low}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default InventoryTable;
