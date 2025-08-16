import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BulkActions() {
	return (
		<Card className="p-3 flex items-center gap-2">
			<div className="text-sm text-gray-600">Bulk Actions:</div>
			<Button variant="outline">Delete</Button>
			<Button variant="outline">Set Active</Button>
			<Button variant="outline">Set Draft</Button>
			<Button variant="outline">Export CSV</Button>
		</Card>
	);
}

export default BulkActions;