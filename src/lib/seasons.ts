/**
 * Sezonowy baner w Hero – treść zależy od daty.
 * Wyliczany przy buildzie ORAZ korygowany w przeglądarce (strona statyczna
 * może być zbudowana tygodnie wcześniej).
 *
 * Edytuj teksty swobodnie – kolejność ma znaczenie: wygrywa pierwszy pasujący.
 */
export interface Season {
  id: string;
  /** Pogrubiony początek komunikatu. */
  title: string;
  text: string;
  /** Link „Sprawdź” – kotwica na stronie. */
  href: string;
  icon: 'tree' | 'sprout' | 'sun' | 'leaf' | 'snow';
}

/** month: 1–12, day: 1–31 */
type Matcher = (month: number, day: number) => boolean;

const seasons: Array<Season & { match: Matcher }> = [
  {
    id: 'choinki',
    // Od połowy listopada do Wigilii. [UZUPEŁNIJ] – dopasuj do faktycznego startu sprzedaży.
    match: (m, d) => (m === 11 && d >= 15) || (m === 12 && d <= 24),
    title: 'Sezon choinkowy!',
    text: 'Żywe choinki w doniczkach i cięte, stroiki oraz ozdoby świąteczne.',
    href: '#oferta',
    icon: 'tree',
  },
  {
    id: 'jesien-zabezpieczanie',
    match: (m) => m === 11,
    title: 'Przygotuj ogród do zimy',
    text: 'Kora, agrowłóknina i osłony – zabezpiecz rośliny przed mrozem.',
    href: '#poradnik',
    icon: 'leaf',
  },
  {
    id: 'zima',
    match: (m) => m === 12 || m <= 2,
    title: 'Zimowe planowanie',
    text: 'Nasiona, ziemia do rozsad i doniczki – zacznij sezon wcześniej.',
    href: '#poradnik',
    icon: 'snow',
  },
  {
    id: 'wiosna',
    match: (m) => m >= 3 && m <= 5,
    title: 'Sezon nasadzeń ruszył!',
    text: 'Świeże rośliny od polskich producentów, ziemia, nawozy i nasiona traw.',
    href: '#oferta',
    icon: 'sprout',
  },
  {
    id: 'lato',
    match: (m) => m >= 6 && m <= 8,
    title: 'Lato w ogrodzie',
    text: 'Kwiaty balkonowe, ochrona roślin i wszystko do pielęgnacji trawnika.',
    href: '#oferta',
    icon: 'sun',
  },
  {
    id: 'jesien',
    match: (m) => m >= 9 && m <= 10,
    title: 'Jesień to najlepszy czas na sadzenie',
    text: 'Drzewa, krzewy i żywopłoty przyjmą się teraz najlepiej. Wrzosy już są!',
    href: '#kalkulatory',
    icon: 'leaf',
  },
];

/** Zwraca sezon dla daty (w strefie Europe/Warsaw). */
export function seasonFor(date: Date = new Date()): Season {
  const [month, day] = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw',
    month: 'numeric',
    day: 'numeric',
  })
    .formatToParts(date)
    .filter((p) => p.type === 'month' || p.type === 'day')
    .sort((a) => (a.type === 'month' ? -1 : 1))
    .map((p) => Number(p.value));
  const found = seasons.find((s) => s.match(month, day)) ?? seasons[seasons.length - 1];
  const { match: _match, ...season } = found;
  return season;
}
