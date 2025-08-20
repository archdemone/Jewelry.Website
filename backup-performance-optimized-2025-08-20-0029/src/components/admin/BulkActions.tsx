import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BulkActions() {
  return (
    <Card className="flex items-center gap-2 p-3">
      <div className="text-sm text-gray-600">Bulk Actions:</div>
      <Button variant="outline">Delete</Button>
      <Button variant="outline">Set Active</Button>
      <Button variant="outline">Set Draft</Button>
      <Button variant="outline">Export CSV</Button>
    </Card>
  );
}

export default BulkActions;
