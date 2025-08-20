'use client';

import React from 'react';
import { gemNameToHex, readableTextColor } from '@/lib/utils/color';

interface ColorChipProps {
  gemName: string;
  className?: string;
}

export function ColorChip({ gemName, className }: ColorChipProps) {
  const gemHex = gemNameToHex(gemName);
  const textColor = readableTextColor(gemHex);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs shadow-sm ${className || ''}`}
      style={{
        backgroundColor: gemHex,
        color: textColor,
        borderColor: 'rgba(0,0,0,0.08)',
      }}
      title={`Gem colour: ${gemName}`}
    >
      <span
        className="h-2.5 w-2.5 rounded-full border"
        style={{ backgroundColor: gemHex, borderColor: 'rgba(0,0,0,0.1)' }}
      />
      {gemName}
    </span>
  );
}


