/**
 * Logika „Otwarte teraz” – czyste funkcje (łatwe do testowania).
 * Zawsze liczymy w strefie Europe/Warsaw, niezależnie od strefy odwiedzającego.
 */
import { business, type DayHours } from './business';

/** Zamienia „HH:MM” na minuty od północy. */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** Dzień tygodnia (0 = niedziela) i minuty od północy w podanej strefie czasowej. */
export function zonedParts(date: Date, timeZone: string = business.timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const dayAccusative = ['w niedzielę', 'w poniedziałek', 'we wtorek', 'w środę', 'w czwartek', 'w piątek', 'w sobotę'];

export interface OpenStatus {
  open: boolean;
  /** Krótki opis, np. „Otwarte teraz · do 17:00” albo „Zamknięte · otwieramy jutro o 9:00”. */
  label: string;
}

/** Usuwa wiodące zero: „09:00” → „9:00”. */
const pretty = (hhmm: string) => hhmm.replace(/^0/, '');

/**
 * Status otwarcia dla podanej chwili.
 * @param date  moment w czasie (domyślnie teraz)
 * @param hours tydzień godzin (domyślnie z business.ts) – parametr ułatwia testy
 */
export function openStatus(date: Date = new Date(), hours: readonly DayHours[] = business.hours): OpenStatus {
  const { day, minutes } = zonedParts(date);
  const today = hours[day];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Otwarte teraz · do ${pretty(today.close)}` };
  }

  // Jeszcze przed otwarciem dzisiaj
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Zamknięte · otwieramy dziś o ${pretty(today.open)}` };
  }

  // Szukamy najbliższego dnia otwarcia (max tydzień do przodu)
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hours[d];
    if (h) {
      const when = i === 1 ? 'jutro' : dayAccusative[d];
      return { open: false, label: `Zamknięte · otwieramy ${when} o ${pretty(h.open)}` };
    }
  }
  return { open: false, label: 'Zamknięte' };
}
