import type { ComponentType } from 'react';
import { Card } from '@/components/ui/card';

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="flex items-center gap-4 p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-100 text-amber-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-500">{change}</div>
      </div>
    </Card>
  );
}

export default StatsCard;
