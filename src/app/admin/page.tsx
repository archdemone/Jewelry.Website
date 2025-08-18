import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import SalesChart from '@/components/admin/SalesChart';
import RecentOrders from '@/components/admin/RecentOrders';
import QuickActions from '@/components/admin/QuickActions';
import { Card } from '@/components/ui/card';

export const metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const stats = [
  {
    title: 'Total Revenue',
            value: '£45,231.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  { title: 'Orders', value: '145', change: '+12% from last month', icon: ShoppingBag },
  { title: 'Customers', value: '1,234', change: '+19% from last month', icon: Users },
  { title: 'Conversion Rate', value: '3.2%', change: '+2% from last month', icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>
      <SalesChart />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentOrders />
        <Card className="p-4">
          <div className="mb-3 font-semibold">Top Selling Products</div>
          <div className="text-sm text-gray-600">Coming soon...</div>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 font-semibold">Low Stock Alerts</div>
          <div className="text-sm text-gray-600">Coming soon...</div>
        </Card>
        <Card className="p-4">
          <div className="mb-3 font-semibold">Activity Feed</div>
          <div className="text-sm text-gray-600">Coming soon...</div>
        </Card>
      </div>
      <QuickActions />
    </div>
  );
}
