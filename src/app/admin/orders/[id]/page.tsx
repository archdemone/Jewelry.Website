import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Order #{params.id}</div>
        <div className="flex gap-2">
          <Button>Mark as fulfilled</Button>
          <Button variant="outline">Send tracking</Button>
          <Button variant="outline">Issue refund</Button>
          <Button variant="ghost">Print packing slip</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="space-y-3 p-4">
            <div className="font-semibold">Items</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-12 w-12 rounded bg-gray-200" />
                  <div>
                    <div className="font-medium">Gold Ring</div>
                    <div className="text-xs text-gray-500">RNG-001</div>
                  </div>
                </div>
                <div className="text-sm">1 × £199.00</div>
              </div>
            </div>
          </Card>
          <Card className="space-y-3 p-4">
            <div className="font-semibold">Order Timeline</div>
            <div className="text-sm text-gray-600">Created, Payment captured, ...</div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="space-y-2 p-4">
            <div className="font-semibold">Customer</div>
            <div className="text-sm">Alice Johnson</div>
            <div className="text-xs text-gray-500">alice@example.com</div>
          </Card>
          <Card className="space-y-2 p-4">
            <div className="font-semibold">Shipping Address</div>
            <div className="text-sm">123 Main St, New York, NY</div>
          </Card>
          <Card className="space-y-2 p-4">
            <div className="font-semibold">Billing Address</div>
            <div className="text-sm">123 Main St, New York, NY</div>
          </Card>
          <Card className="space-y-2 p-4">
            <div className="font-semibold">Payment</div>
            <div className="text-sm">Paid with card •••• 4242</div>
          </Card>
          <Card className="space-y-2 p-4">
            <div className="font-semibold">Notes</div>
            <textarea
              className="w-full rounded border p-2 text-sm"
              rows={3}
              placeholder="Add internal note..."
            />
            <Button variant="outline">Add Note</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
