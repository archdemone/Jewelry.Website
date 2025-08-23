'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GemColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const gemColors = [
  { name: 'Red', color: '#dc2626', image: '/images/MyImages/gem-red.jpg' },
  { name: 'Green', color: '#16a34a', image: '/images/MyImages/gem-green.jpg' },
  { name: 'Blue', color: '#2563eb', image: '/images/MyImages/gem-blue.jpg' },
  { name: 'Purple', color: '#9333ea', image: '/images/MyImages/gem-purple.jpg' },
  { name: 'Yellow', color: '#ca8a04', image: '/images/MyImages/gem-yellow.jpg' },
  { name: 'Custom', color: '#6b7280', image: '/images/MyImages/gem-custom.jpg' },
];

export function GemColorSelector({ selectedColor, onColorChange }: GemColorSelectorProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {gemColors.map((gem) => (
        <button key={gem.name}
          type="button"
          onClick={() => onColorChange(gem.name)}
          onMouseEnter={() => setHoveredColor(gem.name)}
          onMouseLeave={() => setHoveredColor(null)}
          className={`relative rounded-lg border-2 p-3 transition-all ${
            selectedColor === gem.name
              ? 'border-gold-500 bg-gold-50' : 'border-gray-300 hover:border-gray-400' }`}
        >
              <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full border-2 border-gray-200"              style={{ backgroundColor: gem.color }}
            />
              <span className="text-sm font-medium">{gem.name}</span>
              </div>

          {/* Gem Color Popup */}
          {hoveredColor === gem.name && gem.image && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
              <div className="rounded-lg border bg-white p-2 shadow-lg">
              <Image              src={gem.image}              alt={`${gem.name} gem`}              width={80}              height={80}
                  className="rounded object-cover"              style={{ minWidth: '80px', minHeight: '80px' }}
                />
              </div>
              </div>
          )}
        </button>
      ))}
    </div>
  );
}
