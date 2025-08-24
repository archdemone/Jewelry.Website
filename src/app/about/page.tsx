import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us — J&M',
  description:
    'A local passion project turned thriving business, crafting quality jewelry with documented materials and council approval.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
