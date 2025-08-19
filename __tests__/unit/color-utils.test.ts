import { readableTextColor } from '@/lib/utils/color';
import '@testing-library/jest-dom';

describe('readableTextColor', () => {
  it('prefers white text on dark backgrounds', () => {
    // Use Jest assertions
    (expect(readableTextColor('#111111')) as any).toBe('#FFFFFF');
    (expect(readableTextColor('#2563eb')) as any).toBe('#FFFFFF');
  });

  it('prefers dark text on light backgrounds', () => {
    // Use Jest assertions
    (expect(readableTextColor('#f9fafb')) as any).toBe('#111827');
    (expect(readableTextColor('#ca8a04')) as any).toBe('#111827');
  });
});


