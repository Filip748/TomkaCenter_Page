/**
 * WZORY KALKULATORÓW OGRODOWYCH
 * ─────────────────────────────
 * Wszystkie stałe i wzory w jednym miejscu, żeby łatwo je skorygować.
 * Zasada: wyniki w SZTUKACH (worki, rolki, opakowania, sadzonki) zawsze
 * zaokrąglamy W GÓRĘ (Math.ceil) – lepiej, żeby trochę zostało, niż zabrakło.
 *
 * Wartości to typowe zalecenia producentów/szkółek – przy konkretnym produkcie
 * zawsze warto sprawdzić dawkę na opakowaniu.
 */

/* ════════════════════════ Wspólne ════════════════════════ */

/** Maksymalne sensowne wartości – chronią przed literówkami (np. 100000 zamiast 100). */
export const LIMITS = {
  /** m² – ok. 10 ha */
  maxArea: 100_000,
  /** metry bieżące żywopłotu */
  maxLength: 10_000,
} as const;

export type CalcResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** Sprawdza, czy liczba jest dodatnia i nie przekracza limitu. Komunikaty po polsku. */
function validatePositive(value: number, label: string, max: number): string | null {
  if (!Number.isFinite(value)) return `Podaj ${label} jako liczbę.`;
  if (value <= 0) return `${capitalize(label)} musi być większa od zera.`;
  if (value > max) return `${capitalize(label)} wydaje się za duża (maks. ${max.toLocaleString('pl-PL')}).`;
  return null;
}
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Zaokrąglenie w górę do pełnych sztuk, odporne na błędy zmiennoprzecinkowe
 * (np. 0.1 * 3 = 0.30000000000000004 nie powinno dać 1 sztuki więcej).
 */
export function ceilPieces(x: number): number {
  return Math.ceil(Math.round(x * 1e6) / 1e6);
}

/* ════════════════════════ KORA ════════════════════════ */

/**
 * Objętość kory: 1 m² × 1 cm grubości = 0,01 m³ = 10 litrów.
 * Zalecana grubość warstwy ściółki: 5–8 cm (mniej = chwasty przebijają,
 * więcej = ryzyko zaparzenia korzeni). Domyślnie 5 cm.
 */
export const BARK = {
  litersPerM2PerCm: 10,
  defaultDepthCm: 5,
  minDepthCm: 2,
  maxDepthCm: 15,
  /** Popularne pojemności worków kory [l]. */
  bagSizes: [50, 60, 80] as const,
  defaultBagLiters: 80,
} as const;

export interface BarkInput {
  /** powierzchnia rabaty [m²] */
  area: number;
  /** grubość warstwy [cm] */
  depthCm: number;
  /** pojemność worka [l] */
  bagLiters: number;
}

export interface BarkOutput {
  liters: number;
  cubicMeters: number;
  bags: number;
}

export function calcBark({ area, depthCm, bagLiters }: BarkInput): CalcResult<BarkOutput> {
  const err =
    validatePositive(area, 'powierzchnia', LIMITS.maxArea) ??
    (depthCm < BARK.minDepthCm || depthCm > BARK.maxDepthCm || !Number.isFinite(depthCm)
      ? `Grubość warstwy podaj w zakresie ${BARK.minDepthCm}–${BARK.maxDepthCm} cm.`
      : null) ??
    validatePositive(bagLiters, 'pojemność worka', 1000);
  if (err) return { ok: false, error: err };

  // litry = m² × cm × 10
  const liters = area * depthCm * BARK.litersPerM2PerCm;
  return {
    ok: true,
    value: {
      liters,
      cubicMeters: liters / 1000,
      // worki = litry / pojemność worka → w górę
      bags: ceilPieces(liters / bagLiters),
    },
  };
}

/* ════════════════════════ TRAWNIK ════════════════════════ */

/**
 * Nasiona: zakładanie nowego trawnika ≈ 30 g/m² (3 kg na 100 m²),
 *          dosiewanie/renowacja ≈ 15 g/m².
 * Trawa z rolki: standardowa rolka 0,4 × 2,5 m = 1 m²; doliczamy 5% zapasu
 *          na docinki przy krawędziach.
 * Nawóz:   typowa dawka nawozu granulowanego ≈ 30 g/m² na jedno nawożenie
 *          (nawóz startowy przy zakładaniu lub wiosenny).
 */
export const LAWN = {
  seedGramsPerM2: { new: 30, overseed: 15 } as const,
  /** Opakowania nasion [kg]. */
  seedPackSizes: [0.5, 1, 5, 15] as const,
  defaultSeedPackKg: 1,

  rollAreaM2: 1,
  rollWasteFactor: 1.05,

  fertilizerGramsPerM2: 30,
  /** Opakowania nawozu [kg]. */
  fertilizerPackSizes: [1, 2.5, 5, 10, 20] as const,
  defaultFertilizerPackKg: 5,
} as const;

export type LawnMethod = 'seed-new' | 'seed-overseed' | 'roll';

export interface LawnInput {
  area: number;
  method: LawnMethod;
  seedPackKg: number;
  fertilizerPackKg: number;
}

export interface LawnOutput {
  /** Tylko dla siewu: ilość nasion [kg] i liczba opakowań. */
  seedKg?: number;
  seedPacks?: number;
  /** Tylko dla rolki: liczba rolek (m²) z zapasem. */
  rolls?: number;
  fertilizerKg: number;
  fertilizerPacks: number;
}

export function calcLawn({ area, method, seedPackKg, fertilizerPackKg }: LawnInput): CalcResult<LawnOutput> {
  const err =
    validatePositive(area, 'powierzchnia', LIMITS.maxArea) ??
    validatePositive(seedPackKg, 'wielkość opakowania nasion', 100) ??
    validatePositive(fertilizerPackKg, 'wielkość opakowania nawozu', 100);
  if (err) return { ok: false, error: err };

  // nawóz [kg] = m² × g/m² / 1000 → opakowania w górę
  const fertilizerKg = (area * LAWN.fertilizerGramsPerM2) / 1000;
  const fertilizerPacks = ceilPieces(fertilizerKg / fertilizerPackKg);

  if (method === 'roll') {
    // rolki = m² × 1,05 / 1 m² → w górę
    const rolls = ceilPieces((area * LAWN.rollWasteFactor) / LAWN.rollAreaM2);
    return { ok: true, value: { rolls, fertilizerKg, fertilizerPacks } };
  }

  const rate = method === 'seed-new' ? LAWN.seedGramsPerM2.new : LAWN.seedGramsPerM2.overseed;
  // nasiona [kg] = m² × g/m² / 1000 → opakowania w górę
  const seedKg = (area * rate) / 1000;
  return {
    ok: true,
    value: { seedKg, seedPacks: ceilPieces(seedKg / seedPackKg), fertilizerKg, fertilizerPacks },
  };
}

/* ════════════════════════ ŻYWOPŁOT ════════════════════════ */

/**
 * Sadzonki = długość / rozstaw (w górę) × liczba rzędów.
 * Rozstaw to odległość między roślinami w rzędzie – typowe wartości poniżej
 * (dla sadzonek ok. 60–100 cm). Gęstszy rozstaw = szybciej zwarty żywopłot.
 * W układzie dwurzędowym (mijankowym) rośliny sadzimy co ten sam rozstaw
 * w każdym rzędzie, rzędy ok. 30–40 cm od siebie.
 */
export const HEDGE = {
  presets: [
    { id: 'smaragd', label: 'Tuja Smaragd', spacingM: 0.5 },
    { id: 'brabant', label: 'Tuja Brabant', spacingM: 0.6 },
    { id: 'grab', label: 'Grab pospolity', spacingM: 0.4 },
    { id: 'ligustr', label: 'Ligustr', spacingM: 0.3 },
    { id: 'bukszpan', label: 'Bukszpan', spacingM: 0.25 },
    { id: 'cis', label: 'Cis', spacingM: 0.4 },
  ] as const,
  defaultPresetId: 'smaragd',
  minSpacingM: 0.1,
  maxSpacingM: 3,
  maxRows: 3,
} as const;

export interface HedgeInput {
  /** długość żywopłotu [m] */
  length: number;
  /** rozstaw roślin w rzędzie [m] */
  spacingM: number;
  /** liczba rzędów (1–3) */
  rows: number;
}

export interface HedgeOutput {
  perRow: number;
  plants: number;
  plantsPerMeter: number;
}

export function calcHedge({ length, spacingM, rows }: HedgeInput): CalcResult<HedgeOutput> {
  const err =
    validatePositive(length, 'długość', LIMITS.maxLength) ??
    (spacingM < HEDGE.minSpacingM || spacingM > HEDGE.maxSpacingM || !Number.isFinite(spacingM)
      ? `Rozstaw podaj w zakresie ${HEDGE.minSpacingM}–${HEDGE.maxSpacingM} m.`
      : null) ??
    (!Number.isInteger(rows) || rows < 1 || rows > HEDGE.maxRows
      ? `Liczba rzędów: od 1 do ${HEDGE.maxRows}.`
      : null);
  if (err) return { ok: false, error: err };

  // sadzonki w rzędzie = długość / rozstaw → w górę (min. 1)
  const perRow = Math.max(1, ceilPieces(length / spacingM));
  return {
    ok: true,
    value: { perRow, plants: perRow * rows, plantsPerMeter: (1 / spacingM) * rows },
  };
}
