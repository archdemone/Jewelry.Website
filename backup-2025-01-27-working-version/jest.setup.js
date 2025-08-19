import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { toHaveNoViolations } from 'jest-axe';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

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

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');
  
  // Create a motion component factory
  const createMotionComponent = (tag) => {
    return React.forwardRef(({ children, ...props }, ref) => {
      return React.createElement(tag, { ...props, ref }, children);
    });
  };

  return {
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      img: createMotionComponent('img'),
      Image: createMotionComponent('img'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      h4: createMotionComponent('h4'),
      h5: createMotionComponent('h5'),
      h6: createMotionComponent('h6'),
      p: createMotionComponent('p'),
      a: createMotionComponent('a'),
      ul: createMotionComponent('ul'),
      li: createMotionComponent('li'),
      section: createMotionComponent('section'),
      article: createMotionComponent('article'),
      header: createMotionComponent('header'),
      footer: createMotionComponent('footer'),
      nav: createMotionComponent('nav'),
      main: createMotionComponent('main'),
      aside: createMotionComponent('aside'),
      form: createMotionComponent('form'),
      input: createMotionComponent('input'),
      label: createMotionComponent('label'),
      textarea: createMotionComponent('textarea'),
      select: createMotionComponent('select'),
      option: createMotionComponent('option'),
      table: createMotionComponent('table'),
      thead: createMotionComponent('thead'),
      tbody: createMotionComponent('tbody'),
      tr: createMotionComponent('tr'),
      th: createMotionComponent('th'),
      td: createMotionComponent('td'),
    },
    AnimatePresence: ({ children }) => children,
  };
});
