import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';
import CategoryPage from '@/components/products/CategoryPage';

expect.extend(toHaveNoViolations);

// Mock IntersectionObserver for Framer Motion
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock the data
const mockProducts = [
  {
    id: '1',
    name: 'Test Ring',
    price: 100,
    images: ['/test-image.jpg'],
    material: 'Gold',
    gemColor: 'Red',
    gemDensity: 'medium',
    gemVariation: 'Bright',
    mixColors: ['red', 'blue'],
    category: 'Wedding',
    subCategory: 'Engagement',
    slug: 'test-ring',
    description: 'A beautiful test ring',
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false,
    sale: false,
    salePrice: null,
    originalPrice: null,
    weight: 5.5,
    dimensions: '18x18x2mm',
    sku: 'TEST-001',
    tags: ['test', 'ring'],
    rating: 4.5,
    reviewCount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock the components that might cause issues
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>;
  };
});

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock('@/components/layout/ConditionalFooter', () => {
  return function MockConditionalFooter() {
    return <footer data-testid="conditional-footer">Conditional Footer</footer>;
  };
});

describe('Accessibility', () => {
  it('homepage has no violations', async () => {
    const { container } = render(<HomePage />);

    try {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.error('Accessibility test error:', error);
      throw error;
    }
  });

  it('product page is accessible', async () => {
    const { container } = render(
      <CategoryPage 
        products={mockProducts}
        category="Wedding"
        subCategory="Engagement"
      />
    );

    try {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.error('Product accessibility test error:', error);
      throw error;
    }
  });
});
