import { readableTextColor } from '@/lib/utils/color';

describe('readableTextColor', () => {
  it('prefers white text on dark backgrounds', () => {
    expect(readableTextColor('#111111')).toBe('#FFFFFF');
    expect(readableTextColor('#2563eb')).toBe('#FFFFFF');
  });

  it('prefers dark text on light backgrounds', () => {
    expect(readableTextColor('#f9fafb')).toBe('#111827');
    expect(readableTextColor('#ca8a04')).toBe('#111827');
  });
});


