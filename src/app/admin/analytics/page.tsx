import SalesChart from '@/components/admin/SalesChart';
import { Card } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
              <div className="text-2xl font-bold">Analytics</div>
              <SalesChart />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card className="p-4">
              <div className="mb-2 font-semibold">Best Selling Products</div>
              <div className="text-sm text-gray-600">Coming soon...</div>
              </Card>
              <Card className="p-4">
              <div className="mb-2 font-semibold">Customer Acquisition</div>
              <div className="text-sm text-gray-600">Coming soon...</div>
              </Card>
              <Card className="p-4">
              <div className="mb-2 font-semibold">Average Order Value</div>
              <div className="text-sm text-gray-600">Coming soon...</div>
              </Card>
              <Card className="p-4">
              <div className="mb-2 font-semibold">Return Customer Rate</div>
              <div className="text-sm text-gray-600">Coming soon...</div>
              </Card>
              </div>
              </div>
  );
}
