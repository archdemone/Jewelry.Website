import { readableTextColor } from '@/lib/utils/color';

describe('readableTextColor', () => {
  it('prefers white text on dark backgrounds', () => {
    // Use Jest assertions
    expect(readableTextColor('#111111')).to.equal('#FFFFFF');
    expect(readableTextColor('#2563eb')).to.equal('#FFFFFF');
  });

  it('prefers dark text on light backgrounds', () => {
    // Use Jest assertions
    expect(readableTextColor('#f9fafb')).to.equal('#111827');
    expect(readableTextColor('#ca8a04')).to.equal('#111827');
  });
});


