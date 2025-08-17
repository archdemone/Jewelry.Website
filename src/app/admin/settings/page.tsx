import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Settings</div>
      <Card className="space-y-3 p-4">
        <div className="font-semibold">Store Information</div>
        <Input placeholder="Store name" />
        <Input placeholder="Store email" />
        <Input placeholder="Phone" />
        <Input placeholder="Address" />
        <div>
          <div className="mb-1 text-sm text-gray-600">Logo</div>
          <input type="file" />
        </div>
      </Card>
      <Card className="space-y-3 p-4">
        <div className="font-semibold">Payment Settings</div>
        <select className="rounded border px-2 py-1 text-sm">
          <option>Stripe</option>
        </select>
        <Input placeholder="Currency (USD)" />
        <Input placeholder="Tax settings" />
      </Card>
      <Card className="space-y-3 p-4">
        <div className="font-semibold">Shipping Settings</div>
        <Input placeholder="Zones" />
        <Input placeholder="Rates" />
        <Input placeholder="Free shipping threshold" />
      </Card>
      <Card className="space-y-3 p-4">
        <div className="font-semibold">Email Templates</div>
        <Input placeholder="Order confirmation" />
        <Input placeholder="Shipping notification" />
        <Input placeholder="Password reset" />
      </Card>
      <Card className="space-y-3 p-4">
        <div className="font-semibold">SEO Settings</div>
        <Input placeholder="Default meta tags" />
        <Input placeholder="Google Analytics" />
        <Input placeholder="Facebook Pixel" />
      </Card>
      <div>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
