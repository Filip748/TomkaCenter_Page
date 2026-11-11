/**
 * Kategorie oferty (sekcja „Oferta”). Opisy na podstawie starej strony
 * i zakresu działalności. Zdjęcia: src/assets/images.
 * Aby dodać kategorię – dopisz obiekt i (opcjonalnie) zdjęcie.
 */
import type { ImageMetadata } from 'astro';
import pelargonie from '../assets/images/gallery/pel.jpg';
import alejka from '../assets/images/gallery/11.jpg';
import borowka from '../assets/images/guide/borowka.jpg';
import swierki from '../assets/images/guide/swierki.jpg';
import chemia from '../assets/images/gallery/22.jpg';
import trawnik from '../assets/images/guide/trawnik.jpg';
import lilia from '../assets/images/gallery/dscn0584.jpg';
import wrzosy from '../assets/images/gallery/dscn0590.jpg';
import swieta from '../assets/images/gallery/33.jpg';

export interface OfferCategory {
  id: string;
  title: string;
  description: string;
  image: ImageMetadata;
  alt: string;
  /** Krótkie tagi z przykładowymi produktami. */
  tags: string[];
}

export const offer: OfferCategory[] = [
  {
    id: 'rosliny',
    title: 'Rośliny ozdobne',
    description: 'Zdrowe, świeże rośliny od czołowych polskich producentów – na rabaty, balkony i tarasy.',
    image: pelargonie,
    alt: 'Różowe pelargonie w pełnym rozkwicie',
    tags: ['byliny', 'kwiaty balkonowe', 'rośliny doniczkowe'],
  },
  {
    id: 'drzewa',
    title: 'Drzewa i krzewy',
    description: 'Kwalifikowany materiał szkółkarski: drzewa i krzewy ozdobne, iglaki oraz rośliny na żywopłoty.',
    image: alejka,
    alt: 'Alejka centrum ogrodniczego pełna krzewów i drzewek w donicach',
    tags: ['iglaki', 'tuje', 'krzewy liściaste'],
  },
  {
    id: 'owocowe',
    title: 'Krzewy owocowe',
    description: 'Sadzonki borówki, porzeczki, agrestu i innych krzewów owocowych – sprawdzonych odmian.',
    image: borowka,
    alt: 'Dojrzałe owoce borówki amerykańskiej na krzewie',
    tags: ['borówka', 'porzeczka', 'agrest'],
  },
  {
    id: 'choinki',
    title: 'Choinki',
    description: 'Żywe choinki w doniczkach i cięte – świerki, jodły i sosny. Pomożemy wybrać idealną.',
    image: swierki,
    alt: 'Rząd świerków w doniczkach przygotowanych na święta',
    tags: ['świerk', 'jodła', 'w doniczce'],
  },
  {
    id: 'ziemia',
    title: 'Ziemia, podłoża i nawozy',
    description: 'Ziemia uniwersalna i specjalistyczna, nawozy oraz środki ochrony roślin renomowanych marek.',
    image: chemia,
    alt: 'Regały z nawozami i ziemią ogrodową w sklepie',
    tags: ['ziemia do iglaków', 'nawozy', 'ochrona roślin'],
  },
  {
    id: 'trawa',
    title: 'Trawa i trawniki',
    description: 'Mieszanki nasion traw, nawozy do trawnika i wszystko, czego potrzebujesz do założenia murawy.',
    image: trawnik,
    alt: 'Gęsty, równo przystrzyżony zielony trawnik',
    tags: ['nasiona traw', 'nawóz do trawnika', 'trawa z rolki'],
  },
  {
    id: 'kora',
    title: 'Kora i ściółka',
    description: 'Kora sosnowa w różnych frakcjach i ściółki dekoracyjne – mniej chwastów, więcej wilgoci w glebie.',
    image: lilia,
    alt: 'Różowa lilia na tle rabaty wyściółkowanej korą',
    tags: ['kora sosnowa', 'zrębki', 'agrowłóknina'],
  },
  {
    id: 'wrzosy',
    title: 'Wrzosy i rośliny sezonowe',
    description: 'Kolorowe wrzosy, chryzantemy i rośliny na każdą porę roku – prosto z naszych stołów.',
    image: wrzosy,
    alt: 'Kolorowe wrzosy ułożone tęczowo na drewnianym stole',
    tags: ['wrzosy', 'chryzantemy', 'kompozycje'],
  },
  {
    id: 'dekoracje',
    title: 'Dekoracje i święta',
    description: 'Ozdoby świąteczne, doniczki, osłonki i dodatki, które nadadzą charakter domowi i ogrodowi.',
    image: swieta,
    alt: 'Stoisko z ozdobami świątecznymi w sklepie TOMKA',
    tags: ['ozdoby choinkowe', 'doniczki', 'stroiki'],
  },
];
