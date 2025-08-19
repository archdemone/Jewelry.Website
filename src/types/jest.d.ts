/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

export {};
