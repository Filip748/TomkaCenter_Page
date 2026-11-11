/**
 * Kalendarz prac ogrodniczych – miesiąc po miesiącu.
 * Terminy dla klimatu południowej Polski (Śląsk/Zagłębie); w chłodniejsze
 * lata przesuwają się o 1–2 tygodnie. Edytuj swobodnie – sekcja „Poradnik”
 * renderuje się z tej tablicy.
 */
/** Pora roku – steruje motywem graficznym sekcji (tło, kolory, dekoracje). */
export type SeasonId = 'winter' | 'spring' | 'summer' | 'autumn';

export const seasonInfo: Record<SeasonId, { label: string }> = {
  winter: { label: 'Zima' },
  spring: { label: 'Wiosna' },
  summer: { label: 'Lato' },
  autumn: { label: 'Jesień' },
};

/** Miesiąc (0 = styczeń) → pora roku: XII–II zima, III–V wiosna, VI–VIII lato, IX–XI jesień. */
export function seasonOfMonth(month: number): SeasonId {
  if (month === 11 || month <= 1) return 'winter';
  if (month <= 4) return 'spring';
  if (month <= 7) return 'summer';
  return 'autumn';
}

/** Ikona miesiąca – klucze zdefiniowane w src/components/MonthIcon.astro. */
export type MonthIconId =
  | 'snowman' | 'shears' | 'sprout' | 'tulip' | 'blossom' | 'strawberry'
  | 'sun' | 'watering-can' | 'apple' | 'leaf' | 'rake' | 'tree';

export interface MonthPlan {
  name: string;
  icon: MonthIconId;
  /** Jedno zdanie – „motto” miesiąca. */
  intro: string;
  tasks: string[];
}

export const calendar: MonthPlan[] = [
  {
    name: 'Styczeń',
    icon: 'snowman',
    intro: 'Czas odpoczynku ogrodu – i planowania nowego sezonu.',
    tasks: [
      'Strząsaj mokry śnieg z iglaków i żywopłotów, żeby nie łamał gałęzi.',
      'Sprawdzaj osłony zimowe (agrowłóknina, kopczyki przy różach) po wichurach.',
      'Zaplanuj nasadzenia i przejrzyj zapas nasion.',
      'Rośliny doniczkowe podlewaj oszczędnie i ustaw bliżej światła.',
      'Dokarmiaj ptaki – odwdzięczą się, zjadając szkodniki wiosną.',
    ],
  },
  {
    name: 'Luty',
    icon: 'shears',
    intro: 'Dni są dłuższe – pora na pierwsze cięcia i rozsady.',
    tasks: [
      'W bezmroźne dni tnij jabłonie i grusze (cięcie zimowe).',
      'Pod koniec miesiąca wysiewaj rozsady papryki, pomidorów i selera w ziemi do wysiewu.',
      'Naostrz i zakonserwuj sekatory, nożyce i kosiarkę.',
      'Uzupełnij bielenie pni drzew owocowych, jeśli nie zrobiłeś go jesienią.',
      'Nadal strząsaj śnieg z iglaków.',
    ],
  },
  {
    name: 'Marzec',
    icon: 'sprout',
    intro: 'Ogród się budzi – zaczynamy porządki.',
    tasks: [
      'Stopniowo zdejmuj osłony zimowe – najlepiej w pochmurny dzień.',
      'Wygrab trawnik z liści i filcu, pod koniec miesiąca zrób wertykulację.',
      'Przytnij róże, gdy zakwitnie forsycja.',
      'Zasil trawnik i krzewy pierwszą dawką nawozu wiosennego.',
      'Przed pękaniem pąków wykonaj oprysk drzew owocowych preparatem miedziowym.',
      'Sadź drzewa i krzewy z gołym korzeniem, gdy gleba rozmarznie.',
    ],
  },
  {
    name: 'Kwiecień',
    icon: 'tulip',
    intro: 'Najlepszy moment na sadzenie i zakładanie trawnika.',
    tasks: [
      'Zakładaj trawnik z siewu, gdy gleba ogrzeje się do ok. 8–10°C.',
      'Sadź drzewa, krzewy i żywopłoty – skorzystaj z naszego kalkulatora.',
      'Wyściółkuj rabaty korą (warstwa 5–8 cm) – mniej chwastów i podlewania.',
      'Dziel i przesadzaj byliny kwitnące latem i jesienią.',
      'Wysiewaj do gruntu marchew, groch, rzodkiewkę i sałatę.',
      'Przytnij forsycję zaraz po kwitnieniu.',
    ],
  },
  {
    name: 'Maj',
    icon: 'blossom',
    intro: 'Po „zimnych ogrodnikach” ogród rusza pełną parą.',
    tasks: [
      'Po 15 maja sadź rośliny balkonowe i rozsady pomidorów, ogórków, cukinii.',
      'Pierwsze koszenie trawnika, gdy trawa ma 8–10 cm; potem regularnie co tydzień.',
      'Zasil trawnik nawozem wieloskładnikowym.',
      'Obserwuj bukszpany – to czas żerowania ćmy bukszpanowej.',
      'Regularnie podlewaj nowe nasadzenia.',
      'Usuń przekwitłe kwiatostany tulipanów i narcyzów (liście zostaw do zaschnięcia).',
    ],
  },
  {
    name: 'Czerwiec',
    icon: 'strawberry',
    intro: 'Pielęgnacja, podlewanie i pierwsze zbiory.',
    tasks: [
      'Pod koniec miesiąca (po św. Janie) przytnij żywopłoty.',
      'Podlewaj rano lub wieczorem – rzadziej, ale obficie.',
      'Chroń rośliny przed mszycami i ślimakami – najlepiej metodami naturalnymi.',
      'Zasilaj rośliny balkonowe co 1–2 tygodnie nawozem płynnym.',
      'Przytnij lilaki (bzy) i różaneczniki po kwitnieniu.',
      'Zbieraj truskawki i pierwsze warzywa.',
    ],
  },
  {
    name: 'Lipiec',
    icon: 'sun',
    intro: 'Upały – pamiętaj o wodzie i ściółce.',
    tasks: [
      'W upały koś trawnik wyżej (5–6 cm) i nie nawoź w pełnym słońcu.',
      'Podlewaj obficie, ściółkuj glebę wokół roślin.',
      'Zbieraj borówki i porzeczki; po zbiorze przytnij wiśnie.',
      'Kontroluj agrest i porzeczki pod kątem mączniaka.',
      'Pod koniec lipca zakończ nawożenie azotem drzew i krzewów.',
    ],
  },
  {
    name: 'Sierpień',
    icon: 'watering-can',
    intro: 'Drugi najlepszy termin na trawnik i iglaki.',
    tasks: [
      'Druga połowa sierpnia to świetny czas na założenie trawnika z siewu.',
      'Sadź iglaki i truskawki.',
      'Dziel irysy i piwonie.',
      'Ostatni raz w sezonie przytnij żywopłoty liściaste.',
      'Przejdź na nawozy jesienne (bogate w potas i fosfor, z małą ilością azotu).',
    ],
  },
  {
    name: 'Wrzesień',
    icon: 'apple',
    intro: 'Jesienne sadzenie – rośliny przyjmą się najlepiej.',
    tasks: [
      'Sadź cebule kwiatów wiosennych: tulipany, narcyzy, krokusy, hiacynty.',
      'Sadź drzewa, krzewy i żywopłoty z doniczek.',
      'Zrób jesienną wertykulację i dosiej trawę w przerzedzonych miejscach.',
      'Zasil trawnik nawozem jesiennym.',
      'Posadź wrzosy w donicach i na rabatach.',
    ],
  },
  {
    name: 'Październik',
    icon: 'leaf',
    intro: 'Przygotowujemy ogród do zimy.',
    tasks: [
      'Sadź drzewa owocowe i krzewy z gołym korzeniem.',
      'Regularnie grab liście z trawnika; ostatnie koszenie na wysokość ok. 5 cm.',
      'Obficie podlej iglaki i różaneczniki przed zimą – zimą też odparowują wodę.',
      'Wykop bulwy dalii i mieczyków, przechowuj w chłodnym miejscu.',
      'Wyściółkuj rabaty korą – ochroni korzenie przed mrozem.',
      'Chryzantemy i wrzosy na Wszystkich Świętych – zapraszamy!',
    ],
  },
  {
    name: 'Listopad',
    icon: 'rake',
    intro: 'Zabezpieczamy rośliny i robimy porządki.',
    tasks: [
      'Usyp kopczyki przy różach, wrażliwe rośliny okryj agrowłókniną.',
      'Pobiel pnie drzew owocowych – chroni korę przed pękaniem.',
      'Spuść wodę z węży i instalacji, zabezpiecz kran ogrodowy.',
      'Liście (bez chorób) przeznacz na kompost.',
      'Załóż osłonki na pnie młodych drzewek przed zającami.',
      'Pod koniec miesiąca – pierwsze choinki w naszym centrum.',
    ],
  },
  {
    name: 'Grudzień',
    icon: 'tree',
    intro: 'Choinka, ozdoby i odpoczynek.',
    tasks: [
      'Wybierz żywą choinkę – w doniczce posadzisz ją wiosną w ogrodzie.',
      'Choinkę w doniczce trzymaj w domu krótko (do 7–10 dni), z dala od kaloryfera, i podlewaj.',
      'Gałązkami iglaków okryj byliny i rabaty.',
      'Strząsaj śnieg z iglaków, kontroluj osłony.',
      'Zaplanuj zmiany w ogrodzie na przyszły rok.',
    ],
  },
];
