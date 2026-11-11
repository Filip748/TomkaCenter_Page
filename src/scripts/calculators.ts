/**
 * Obsługa kalkulatorów: zakładki ARIA + przeliczanie na żywo.
 * Wzory są w src/lib/formulas.ts – tutaj tylko odczyt pól i wyświetlanie.
 */
import { calcBark, calcHedge, calcLawn, type LawnMethod } from '../lib/formulas';
import { plural } from '../lib/plural';

/* ─────────── Zakładki (strzałki, Home/End – wzorzec WAI-ARIA) ─────────── */
const tablist = document.querySelector<HTMLElement>('#kalkulatory [role="tablist"]');
const tabs = tablist ? [...tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')] : [];

function selectTab(tab: HTMLButtonElement, focus = true) {
  for (const t of tabs) {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !selected;
  }
  if (focus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const map: Record<string, number> = {
      ArrowRight: (i + 1) % tabs.length,
      ArrowLeft: (i - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      selectTab(tabs[map[e.key]]);
    }
  });
});

/* ─────────── Pomocnicze ─────────── */
const nf = (max = 2) => new Intl.NumberFormat('pl-PL', { maximumFractionDigits: max });

/** Czyta liczbę z pola – akceptuje też przecinek („2,5”). */
function num(form: HTMLFormElement, name: string): number {
  const raw = String(new FormData(form).get(name) ?? '').replace(',', '.').trim();
  return raw === '' ? NaN : Number(raw);
}

function out(form: HTMLFormElement, key: string, text: string) {
  form.querySelectorAll(`[data-out="${key}"]`).forEach((el) => (el.textContent = text));
}

function showError(form: HTMLFormElement, error: string | null) {
  form.querySelector('[data-error]')!.textContent = error ?? '';
  form.querySelectorAll('input[type="number"]').forEach((i) => i.setAttribute('aria-invalid', String(!!error)));
}

/* ─────────── Kalkulatory ─────────── */
const handlers: Record<string, (f: HTMLFormElement) => void> = {
  bark(form) {
    const r = calcBark({ area: num(form, 'area'), depthCm: num(form, 'depthCm'), bagLiters: num(form, 'bagLiters') });
    if (!r.ok) return showError(form, r.error);
    showError(form, null);
    out(form, 'bags', nf().format(r.value.bags));
    out(form, 'bagsWord', plural(r.value.bags, 'worek', 'worki', 'worków'));
    out(form, 'liters', `${nf(0).format(r.value.liters)} l`);
    out(form, 'm3', `${nf(2).format(r.value.cubicMeters)} m³`);
  },

  lawn(form) {
    const method = (new FormData(form).get('method') ?? 'seed-new') as LawnMethod;
    const isRoll = method === 'roll';
    form.querySelectorAll<HTMLElement>('[data-seed-only]').forEach((el) => (el.hidden = isRoll));
    form.querySelectorAll<HTMLElement>('[data-roll-only]').forEach((el) => (el.hidden = !isRoll));

    const r = calcLawn({
      area: num(form, 'area'),
      method,
      seedPackKg: num(form, 'seedPackKg'),
      fertilizerPackKg: num(form, 'fertilizerPackKg'),
    });
    if (!r.ok) return showError(form, r.error);
    showError(form, null);
    const v = r.value;
    if (v.seedPacks !== undefined && v.seedKg !== undefined) {
      out(form, 'seedPacks', nf().format(v.seedPacks));
      out(form, 'seedPacksWord', plural(v.seedPacks, 'opakowanie', 'opakowania', 'opakowań'));
      out(form, 'seedKg', `${nf(2).format(v.seedKg)} kg`);
    }
    if (v.rolls !== undefined) {
      out(form, 'rolls', nf().format(v.rolls));
      out(form, 'rollsWord', plural(v.rolls, 'rolka', 'rolki', 'rolek'));
    }
    out(form, 'fertPacks', nf().format(v.fertilizerPacks));
    out(form, 'fertPacksWord', plural(v.fertilizerPacks, 'opakowanie', 'opakowania', 'opakowań'));
    out(form, 'fertKg', `${nf(2).format(v.fertilizerKg)} kg`);
  },

  hedge(form) {
    const r = calcHedge({
      length: num(form, 'length'),
      spacingM: num(form, 'spacingCm') / 100,
      rows: num(form, 'rows'),
    });
    if (!r.ok) return showError(form, r.error);
    showError(form, null);
    out(form, 'plants', nf().format(r.value.plants));
    out(form, 'plantsWord', plural(r.value.plants, 'sadzonka', 'sadzonki', 'sadzonek'));
    out(form, 'perMeter', nf(1).format(r.value.plantsPerMeter));
  },
};

document.querySelectorAll<HTMLFormElement>('form[data-calc]').forEach((form) => {
  const run = () => handlers[form.dataset.calc!]?.(form);

  // Żywopłot: wybór rośliny ustawia rozstaw; ręczna zmiana rozstawu → „Inna”
  if (form.dataset.calc === 'hedge') {
    const preset = form.querySelector<HTMLSelectElement>('[name="preset"]')!;
    const spacing = form.querySelector<HTMLInputElement>('[name="spacingCm"]')!;
    preset.addEventListener('change', () => {
      if (preset.value !== 'custom') spacing.value = String(Math.round(Number(preset.value) * 100));
      else spacing.focus();
    });
    spacing.addEventListener('input', () => {
      const match = [...preset.options].find((o) => Math.round(Number(o.value) * 100) === Number(spacing.value));
      preset.value = match ? match.value : 'custom';
    });
  }

  form.addEventListener('input', run);
  form.addEventListener('change', run);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
  });
  run();
});
