import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import HomePage from '@/app/page';
import CategoryPage from '@/components/products/CategoryPage';
import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion with proper typing
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  
  disconnect(): void {}
  observe(target: Element): void {}
  unobserve(target: Element): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as any;

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

// Mock data fetching functions
jest.mock('@/lib/queries', () => ({
  getAllCategories: jest.fn(() => []),
  getPaginatedProducts: jest.fn(() => []),
}));

jest.mock('@/lib/assets/images', () => ({
  getProductImageFallback: jest.fn(() => '/fallback-image.jpg'),
}));

// Mock the cart store
jest.mock('@/store/cart', () => ({
  useCartStore: jest.fn(() => ({
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    items: [],
    total: 0,
    itemCount: 0,
  })),
}));

describe('Accessibility', () => {
  it('homepage has no violations', async () => {
    const { container } = render(<HomePage />);

    try {
      const results = await axe(container);
      (expect(results) as any).toHaveNoViolations();
    } catch (error) {
      console.error('Accessibility test error:', error);
      throw error;
    }
  });

  it('product page is accessible', async () => {
    const { container } = render(
      <CategoryPage 
        category="Wedding"
        categoryTitle="Wedding Rings"
        categoryDescription="Beautiful wedding rings"
        categoryImage="/wedding-rings.jpg"
      />
    );

    try {
      const results = await axe(container);
      (expect(results) as any).toHaveNoViolations();
    } catch (error) {
      console.error('Product accessibility test error:', error);
      throw error;
    }
  });
});
