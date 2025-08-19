import { readableTextColor } from '@/lib/utils/color';
import '@testing-library/jest-dom';
import { expect, describe, it } from '@jest/globals';

describe('readableTextColor', () => {
  it('prefers white text on dark backgrounds', () => {
    // Use Jest assertions with .toEqual instead of .toBe
    expect(readableTextColor('#111111')).toEqual('#FFFFFF');
    expect(readableTextColor('#2563eb')).toEqual('#FFFFFF');
  });

  it('prefers dark text on light backgrounds', () => {
    // Use Jest assertions with .toEqual instead of .toBe
    expect(readableTextColor('#f9fafb')).toEqual('#111827');
    expect(readableTextColor('#ca8a04')).toEqual('#111827');
  });
});


