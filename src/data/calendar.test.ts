import { expect, it } from 'vitest';
import { calendar, seasonOfMonth } from './calendar';

it('przypisuje pory roku do miesięcy', () => {
  expect(calendar.map((_, i) => seasonOfMonth(i))).toEqual([
    'winter', 'winter', 'spring', 'spring', 'spring', 'summer',
    'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter',
  ]);
});
