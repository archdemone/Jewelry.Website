import { readableTextColor } from '@/lib/utils/color';

describe('readableTextColor', () => {
  it('prefers white text on dark backgrounds', () => {
    // Use explicit assertion with strict equality
    expect(readableTextColor('#111111')).toEqual('#FFFFFF');
    expect(readableTextColor('#2563eb')).toEqual('#FFFFFF');
  });

  it('prefers dark text on light backgrounds', () => {
    // Use explicit assertion with strict equality
    expect(readableTextColor('#f9fafb')).toEqual('#111827');
    expect(readableTextColor('#ca8a04')).toEqual('#111827');
  });
});


