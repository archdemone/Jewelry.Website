import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image cache busting utility
export function getImageUrl(path: string, version?: string): string {
  // TEMPORARILY DISABLE cache busting for performance testing
  // if (process.env.NODE_ENV === 'development') {
  //   // In development, use timestamp to force refresh
  //   return `${path}?t=${Date.now()}`;
  // }

  // In production, use version parameter if provided
  if (version) {
    return `${path}?v=${version}`;
  }

  return path;
}

// Alternative: Use a global version that you can update
export const IMAGE_VERSION = '1.0'; // Update this when you change images

export function getImageUrlWithVersion(path: string): string {
  return getImageUrl(path, IMAGE_VERSION);
}
