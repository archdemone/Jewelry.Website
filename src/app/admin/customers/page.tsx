import CustomerTable from "@/components/admin/CustomerTable";

export default function AdminCustomersPage() {
	return (
		<div className="space-y-4">
			<div className="text-2xl font-bold">Customers</div>
			<CustomerTable />
		</div>
	);
}