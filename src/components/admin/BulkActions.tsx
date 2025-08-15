import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BulkActions() {
	return (
		<Card className="p-3 flex items-center gap-2">
			<div className="text-sm text-gray-600">Bulk Actions:</div>
			<Button variant="secondary">Delete</Button>
			<Button variant="secondary">Set Active</Button>
			<Button variant="secondary">Set Draft</Button>
			<Button variant="secondary">Export CSV</Button>
		</Card>
	);
}

export default BulkActions;