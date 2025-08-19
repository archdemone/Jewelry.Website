// Utility functions for color manipulation in admin UI

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split('').map(c => c + c).join('') 
    : cleanHex;
  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function getRelativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getReadableTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  const luminance = getRelativeLuminance(rgb);
  // Using WCAG contrast ratio formula
  const whiteContrast = (1.05) / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;
  
  return whiteContrast >= blackContrast ? '#FFFFFF' : '#111827';
}

// Gem color mapping
export const gemColorMap: Record<string, string> = {
  'Red': '#DC2626',
  'Green': '#16A34A', 
  'Blue': '#2563EB',
  'Purple': '#9333EA',
  'Yellow': '#EAB308',
  'Custom': '#6B7280',
  'Black': '#000000',
  'White': '#FFFFFF',
  'Pink': '#EC4899',
  'Orange': '#F97316',
  'Turquoise': '#06B6D4',
  'Amber': '#F59E0B'
};

export function getGemColorHex(colorName: string): string {
  return gemColorMap[colorName] || '#6B7280';
}