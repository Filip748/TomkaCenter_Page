import { describe, expect, it } from 'vitest';
import { openStatus } from './hours';
import { seasonFor } from './seasons';

// Daty w UTC; listopad = czas zimowy (Warszawa = UTC+1), lipiec = letni (UTC+2).
describe('openStatus (Europe/Warsaw)', () => {
  it('środa 12:00 → otwarte do 17:00', () => {
    expect(openStatus(new Date('2026-11-11T11:00:00Z'))).toEqual({ open: true, label: 'Otwarte teraz · do 17:00' });
  });
  it('środa 8:30 → otwieramy dziś o 9:00', () => {
    expect(openStatus(new Date('2026-11-11T07:30:00Z')).label).toBe('Zamknięte · otwieramy dziś o 9:00');
  });
  it('środa 17:00 → zamknięte, jutro o 9:00', () => {
    expect(openStatus(new Date('2026-11-11T16:00:00Z')).label).toBe('Zamknięte · otwieramy jutro o 9:00');
  });
  it('sobota 15:30 → w poniedziałek', () => {
    expect(openStatus(new Date('2026-11-14T14:30:00Z')).label).toBe('Zamknięte · otwieramy w poniedziałek o 9:00');
  });
  it('niedziela → jutro (poniedziałek)', () => {
    expect(openStatus(new Date('2026-11-15T10:00:00Z')).label).toBe('Zamknięte · otwieramy jutro o 9:00');
  });
  it('uwzględnia czas letni: lipiec, sobota 14:30 lokalnie → otwarte', () => {
    expect(openStatus(new Date('2026-07-11T12:30:00Z')).open).toBe(true);
  });
});

describe('seasonFor', () => {
  it('grudzień przed świętami → choinki', () => {
    expect(seasonFor(new Date('2026-12-10T12:00:00Z')).id).toBe('choinki');
  });
  it('od 15 listopada → choinki, wcześniej → zabezpieczanie', () => {
    expect(seasonFor(new Date('2026-11-16T12:00:00Z')).id).toBe('choinki');
    expect(seasonFor(new Date('2026-11-11T12:00:00Z')).id).toBe('jesien-zabezpieczanie');
  });
  it('kwiecień → wiosna, lipiec → lato, styczeń → zima', () => {
    expect(seasonFor(new Date('2026-04-10T12:00:00Z')).id).toBe('wiosna');
    expect(seasonFor(new Date('2026-07-10T12:00:00Z')).id).toBe('lato');
    expect(seasonFor(new Date('2027-01-10T12:00:00Z')).id).toBe('zima');
  });
});
