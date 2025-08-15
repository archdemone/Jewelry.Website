import { Card } from "@/components/ui/card";

export function InventoryTable() {
	const rows = [
		{ sku: "RNG-001", name: "Gold Ring", stock: 12, low: 5 },
		{ sku: "NCK-014", name: "Diamond Necklace", stock: 2, low: 3 },
		{ sku: "BRC-201", name: "Silver Bracelet", stock: 0, low: 4 },
	];
	return (
		<Card className="p-4">
			<div className="font-semibold mb-3">Inventory</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="text-xs uppercase text-gray-500">
						<tr>
							<th className="text-left py-2">SKU</th>
							<th className="text-left py-2">Product</th>
							<th className="text-left py-2">Stock</th>
							<th className="text-left py-2">Low Threshold</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.sku} className={`border-t ${r.stock === 0 ? "bg-red-50" : r.stock <= r.low ? "bg-amber-50" : ""}`}>
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