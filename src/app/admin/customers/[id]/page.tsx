import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="text-2xl font-bold">Customer #{params.id}</div>
				<div className="flex gap-2">
					<Button variant="secondary">Send Email</Button>
					<Button variant="secondary">Add Note</Button>
					<Button variant="ghost">Disable Account</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2 space-y-4">
					<Card className="p-4 space-y-2">
						<div className="font-semibold">Contact</div>
						<div className="text-sm">Alice Johnson</div>
						<div className="text-xs text-gray-500">alice@example.com</div>
					</Card>
					<Card className="p-4 space-y-2">
						<div className="font-semibold">Addresses</div>
						<div className="text-sm">123 Main St, New York, NY</div>
					</Card>
					<Card className="p-4 space-y-2">
						<div className="font-semibold">Order History</div>
						<div className="text-sm">Order #1001, #1005, #1011 ...</div>
					</Card>
				</div>
				<div className="space-y-4">
					<Card className="p-4 space-y-1">
						<div className="font-semibold">Metrics</div>
						<div className="text-sm">Total LTV: $2,980</div>
						<div className="text-sm">Average Order: $220</div>
						<div className="text-sm">Last Order: 2024-05-03</div>
					</Card>
					<Card className="p-4 space-y-2">
						<div className="font-semibold">Tags</div>
						<div className="flex gap-2 text-xs">
							<span className="px-2 py-1 bg-gray-100 rounded">VIP</span>
							<span className="px-2 py-1 bg-gray-100 rounded">Wholesale</span>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}