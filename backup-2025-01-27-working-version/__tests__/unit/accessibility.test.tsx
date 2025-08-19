import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

// Mock the dynamic components from the homepage
jest.mock('@/components/home/HeroCarousel', () => {
  return function MockHeroCarousel() {
    return <section data-testid="hero-carousel">Hero Carousel</section>;
  };
});

jest.mock('@/components/home/TrustSignals', () => {
  return function MockTrustSignals() {
    return <section data-testid="trust-signals">Trust Signals</section>;
  };
});

jest.mock('@/components/home/FeaturedProducts', () => {
  return function MockFeaturedProducts() {
    return <section data-testid="featured-products">Featured Products</section>;
  };
});

jest.mock('@/components/home/SocialProof', () => {
  return function MockSocialProof() {
    return <section data-testid="social-proof">Social Proof</section>;
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

    // Wait for the main homepage content to be present
    await waitFor(() => {
      expect(container.querySelector('[data-testid="homepage-main"]')).toBeInTheDocument();
    });

    // Wait for all dynamic components to be loaded
    await waitFor(() => {
      expect(container.querySelector('[data-testid="hero-carousel"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="trust-signals"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="featured-products"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="social-proof"]')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Additional wait to ensure all animations and async operations are complete
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    // Wait for the component to be fully rendered
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    // Additional wait to ensure all async operations are complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const results = await axe(container);
      (expect(results) as any).toHaveNoViolations();
    } catch (error) {
      console.error('Product accessibility test error:', error);
      throw error;
    }
  });
});
