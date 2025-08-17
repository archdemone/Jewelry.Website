import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock next/link to avoid router issues in jsdom
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    const React = require('react');
    return React.createElement('a', { href, ...props }, children);
  };
});

// Mock next/navigation for components using it
jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
    usePathname: () => '/',
  };
});
