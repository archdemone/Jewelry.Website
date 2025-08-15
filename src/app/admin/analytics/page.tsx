import SalesChart from "@/components/admin/SalesChart";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
	return (
		<div className="space-y-4">
			<div className="text-2xl font-bold">Analytics</div>
			<SalesChart />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card className="p-4">
					<div className="font-semibold mb-2">Best Selling Products</div>
					<div className="text-sm text-gray-600">Coming soon...</div>
				</Card>
				<Card className="p-4">
					<div className="font-semibold mb-2">Customer Acquisition</div>
					<div className="text-sm text-gray-600">Coming soon...</div>
				</Card>
				<Card className="p-4">
					<div className="font-semibold mb-2">Average Order Value</div>
					<div className="text-sm text-gray-600">Coming soon...</div>
				</Card>
				<Card className="p-4">
					<div className="font-semibold mb-2">Return Customer Rate</div>
					<div className="text-sm text-gray-600">Coming soon...</div>
				</Card>
			</div>
		</div>
	);
}