/**
 * Polska odmiana liczebników: 1 worek, 2–4 worki, 5+ worków (12–14 → worków, 22 → worki).
 */
export function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const d = n % 10;
  const dd = n % 100;
  return Number.isInteger(n) && d >= 2 && d <= 4 && !(dd >= 12 && dd <= 14) ? few : many;
}
