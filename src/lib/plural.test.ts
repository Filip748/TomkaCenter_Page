import { expect, it } from 'vitest';
import { plural } from './plural';

it('odmienia polskie liczebniki', () => {
  const w = (n: number) => plural(n, 'worek', 'worki', 'worków');
  expect([1, 2, 4, 5, 12, 14, 22, 25, 101, 112].map(w)).toEqual([
    'worek', 'worki', 'worki', 'worków', 'worków', 'worków', 'worki', 'worków', 'worków', 'worków',
  ]);
});
