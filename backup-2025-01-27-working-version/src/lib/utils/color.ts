// Utility functions for color handling and accessibility

export function hexToRgb(hex: string) {
  const cleaned = hex.replace('#', '');
  const normalized = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const bigint = parseInt(normalized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const channel = (v: number) => {
    const srgb = v / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };
  const R = channel(r);
  const G = channel(g);
  const B = channel(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function readableTextColor(bgHex: string): string {
  try {
    const L = relativeLuminance(hexToRgb(bgHex));
    const contrastBlack = (L + 0.05) / 0.05; // vs black (L=0)
    const contrastWhite = 1.05 / (L + 0.05); // vs white (L=1)
    return contrastWhite >= contrastBlack ? '#FFFFFF' : '#111827'; // slate-900
  } catch (err) {
    return '#111827';
  }
}

// Map common gem names to representative hex values
export function gemNameToHex(gemName: string): string {
  switch ((gemName || '').toLowerCase()) {
    case 'red':
      return '#dc2626';
    case 'green':
      return '#16a34a';
    case 'blue':
      return '#2563eb';
    case 'purple':
      return '#9333ea';
    case 'yellow':
      return '#ca8a04';
    case 'custom':
    default:
      return '#6b7280'; // gray-500
  }
}


