import InventoryTable from '@/components/admin/InventoryTable';

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Inventory</div>
      <InventoryTable />
    </div>
  );
}
