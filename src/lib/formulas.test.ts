import { describe, expect, it } from 'vitest';
import { calcBark, calcHedge, calcLawn, ceilPieces } from './formulas';

const ok = <T>(r: { ok: true; value: T } | { ok: false; error: string }): T => {
  if (!r.ok) throw new Error(r.error);
  return r.value;
};

describe('ceilPieces', () => {
  it('zaokrągla w górę do pełnych sztuk', () => {
    expect(ceilPieces(1.01)).toBe(2);
    expect(ceilPieces(2)).toBe(2);
  });
  it('ignoruje błędy zmiennoprzecinkowe', () => {
    expect(ceilPieces(0.1 * 3 * 10)).toBe(3); // 3.0000000000000004
  });
});

describe('kora', () => {
  it('10 m² × 5 cm = 500 l = 7 worków po 80 l', () => {
    const r = ok(calcBark({ area: 10, depthCm: 5, bagLiters: 80 }));
    expect(r.liters).toBe(500);
    expect(r.cubicMeters).toBe(0.5);
    expect(r.bags).toBe(7); // 6,25 → 7
  });
  it('dokładnie pełne worki nie dostają dodatkowego', () => {
    expect(ok(calcBark({ area: 8, depthCm: 5, bagLiters: 80 })).bags).toBe(5);
  });
  it('odrzuca zero, ujemne i złą grubość', () => {
    expect(calcBark({ area: 0, depthCm: 5, bagLiters: 80 }).ok).toBe(false);
    expect(calcBark({ area: -3, depthCm: 5, bagLiters: 80 }).ok).toBe(false);
    expect(calcBark({ area: 10, depthCm: 50, bagLiters: 80 }).ok).toBe(false);
    expect(calcBark({ area: NaN, depthCm: 5, bagLiters: 80 }).ok).toBe(false);
  });
});

describe('trawnik', () => {
  it('nowy trawnik z siewu: 100 m² → 3 kg → 3 op. po 1 kg, nawóz 3 kg → 1 op. 5 kg', () => {
    const r = ok(calcLawn({ area: 100, method: 'seed-new', seedPackKg: 1, fertilizerPackKg: 5 }));
    expect(r.seedKg).toBe(3);
    expect(r.seedPacks).toBe(3);
    expect(r.fertilizerPacks).toBe(1);
    expect(r.rolls).toBeUndefined();
  });
  it('dosiewka zużywa połowę nasion', () => {
    const r = ok(calcLawn({ area: 50, method: 'seed-overseed', seedPackKg: 0.5, fertilizerPackKg: 5 }));
    expect(r.seedKg).toBe(0.75);
    expect(r.seedPacks).toBe(2); // 1,5 → 2
  });
  it('rolki z 5% zapasem, w górę', () => {
    const r = ok(calcLawn({ area: 41, method: 'roll', seedPackKg: 1, fertilizerPackKg: 5 }));
    expect(r.rolls).toBe(44); // 43,05 → 44
    expect(r.seedKg).toBeUndefined();
  });
  it('odrzuca powierzchnię 0', () => {
    expect(calcLawn({ area: 0, method: 'roll', seedPackKg: 1, fertilizerPackKg: 5 }).ok).toBe(false);
  });
});

describe('żywopłot', () => {
  it('10 m tui Smaragd co 0,5 m = 20 szt.', () => {
    expect(ok(calcHedge({ length: 10, spacingM: 0.5, rows: 1 })).plants).toBe(20);
  });
  it('dwa rzędy podwajają liczbę', () => {
    const r = ok(calcHedge({ length: 10.2, spacingM: 0.6, rows: 2 }));
    expect(r.perRow).toBe(17);
    expect(r.plants).toBe(34);
  });
  it('niepełny odcinek zaokrągla w górę', () => {
    expect(ok(calcHedge({ length: 7.1, spacingM: 0.5, rows: 1 })).plants).toBe(15);
  });
  it('bardzo krótki odcinek to min. 1 sadzonka', () => {
    expect(ok(calcHedge({ length: 0.1, spacingM: 0.5, rows: 1 })).plants).toBe(1);
  });
  it('odrzuca złe dane', () => {
    expect(calcHedge({ length: 0, spacingM: 0.5, rows: 1 }).ok).toBe(false);
    expect(calcHedge({ length: 10, spacingM: 0, rows: 1 }).ok).toBe(false);
    expect(calcHedge({ length: 10, spacingM: 0.5, rows: 4 }).ok).toBe(false);
  });
});
