/**
 * Jedno źródło prawdy dla danych firmy.
 * Zmieniasz telefon/godziny? Edytuj TYLKO ten plik – stopka, kontakt,
 * przyciski „Zadzwoń”, „Otwarte teraz” i schema.org pobierają dane stąd.
 *
 * Dane pochodzą ze starej strony https://www.tomka.pl/kontakt/ (stan: 11.2026).
 */

export interface Phone {
  /** Numer do wyświetlenia, np. „518 598 101”. */
  display: string;
  /** Numer w formacie E.164 do linków tel: i schema.org. */
  e164: string;
}

/** Godziny jednego dnia; `null` = nieczynne. Format „HH:MM”. */
export type DayHours = { open: string; close: string } | null;

export const business = {
  name: 'TOMKA Centrum Ogrodnicze',
  shortName: 'Tomka',
  slogan: 'Zaufaj specjalistom!',
  foundedYear: 1992,
  description:
    'Centrum ogrodnicze w Sosnowcu od 1992 roku. Rośliny ozdobne, drzewa i krzewy, ' +
    'choinki, ziemia, trawa, kora i wszystko do ogrodu. Fachowa obsługa i rodzinny klimat.',

  address: {
    street: 'ul. Długosza 86',
    postalCode: '41-219',
    city: 'Sosnowiec',
    region: 'śląskie',
    country: 'PL',
  },

  /** Główny numer (przycisk „Zadzwoń”) – wybrany przez właściciela. */
  phone: { display: '518 598 101', e164: '+48518598101' } satisfies Phone,
  /** Dodatkowe numery. */
  phonesExtra: [{ display: '797 292 888', e164: '+48797292888' }] satisfies Phone[],
  email: 'info@tomka.pl',

  facebook: 'https://www.facebook.com/TomkaCentrumOgrodnicze',

  /**
   * Link do opinii w Google.
   * [UZUPEŁNIJ] – najlepiej link z Profilu Firmy w Google („Poproś o opinie”).
   * Do tego czasu używamy wyszukiwania w Mapach Google.
   */
  googleReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=TOMKA+Centrum+Ogrodnicze+D%C5%82ugosza+86+Sosnowiec',

  /** Zapytanie do osadzonej mapy Google (bez klucza API). */
  mapQuery: 'TOMKA Centrum Ogrodnicze, Długosza 86, 41-219 Sosnowiec',

  /**
   * Współrzędne do schema.org (opcjonalne – bez nich pole jest pomijane).
   * [UZUPEŁNIJ] – skopiuj z Map Google (PPM na pinezce → współrzędne),
   * np. { lat: 50.xxxx, lng: 19.xxxx }.
   */
  geo: null as { lat: number; lng: number } | null,

  /**
   * Godziny otwarcia. Indeks 0 = niedziela … 6 = sobota (jak Date.getDay()).
   * [UZUPEŁNIJ] godziny sezonowe (np. wiosna/grudzień), jeśli się różnią.
   */
  hours: [
    null, // niedziela
    { open: '09:00', close: '17:00' }, // poniedziałek
    { open: '09:00', close: '17:00' }, // wtorek
    { open: '09:00', close: '17:00' }, // środa
    { open: '09:00', close: '17:00' }, // czwartek
    { open: '09:00', close: '17:00' }, // piątek
    { open: '09:00', close: '15:00' }, // sobota
  ] as DayHours[],

  timeZone: 'Europe/Warsaw',
} as const;

/** Polskie nazwy dni, indeks zgodny z `business.hours`. */
export const dayNames = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
] as const;

/** Pełny adres w jednej linii. */
export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;
