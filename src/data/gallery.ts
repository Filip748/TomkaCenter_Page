/**
 * Galeria – zdjęcia ze starej strony (tomka.pl/galeria).
 * Kolejność = kolejność na stronie; pierwsze `GALLERY_INITIAL` widać od razu,
 * resztę po kliknięciu „Pokaż więcej”.
 * Pominięto 23.jpg i 25.jpg – to mniejsze duplikaty zdjęcia 22.jpg.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/gallery/*.jpg', { eager: true });
const img = (name: string) => {
  const mod = files[`../assets/images/gallery/${name}.jpg`];
  if (!mod) throw new Error(`Brak zdjęcia galerii: ${name}.jpg`);
  return mod.default;
};

export const GALLERY_INITIAL = 12;

export const gallery: { image: ImageMetadata; alt: string }[] = [
  { image: img('6'), alt: 'Drewniane stoły z sadzonkami przed zielonym budynkiem centrum ogrodniczego' },
  { image: img('dscn0278'), alt: 'Łan kolorowych wrzosów – różowe, zielone i pomarańczowe' },
  { image: img('pel'), alt: 'Różowe pelargonie w pełnym rozkwicie' },
  { image: img('11'), alt: 'Alejka między stołami z kwitnącymi roślinami' },
  { image: img('dscn0264'), alt: 'Pasy pomarańczowych i zielonych wrzosów' },
  { image: img('rozaneczniki'), alt: 'Różowe kwiaty różanecznika' },
  { image: img('12'), alt: 'Zadaszona część ekspozycji z roślinami w ciepłym świetle' },
  { image: img('dscn0590'), alt: 'Tęczowa kompozycja barwionych wrzosów' },
  { image: img('gozdziki'), alt: 'Czerwone goździki w zielonych donicach' },
  { image: img('dscn0553'), alt: 'Wrzosy w wiklinowej skrzynce i glinianej donicy na tle iglaków' },
  { image: img('jezowka'), alt: 'Jeżówki z etykietami „Roślina miododajna”' },
  { image: img('33'), alt: 'Świąteczne stoisko z ozdobami w sklepie TOMKA' },
  { image: img('dscn0551'), alt: 'Stoły z iglakami i roślinami okrywowymi' },
  { image: img('dscn0584'), alt: 'Różowa lilia orientalna' },
  { image: img('dscn0594'), alt: 'Tęczowy pas wrzosów wzdłuż alejki' },
  { image: img('dscn0591'), alt: 'Kolorowe wrzosy i drzewka ozdobne w donicach' },
  { image: img('38'), alt: 'Regały z bombkami i ozdobami choinkowymi' },
  { image: img('dscn0592'), alt: 'Różowe i białe wrzosy na stołach przed budynkiem' },
  { image: img('dscn0262'), alt: 'Wrzosy w wielu kolorach na drewnianym stole' },
  { image: img('dscn0598'), alt: 'Pasy czerwonych, pomarańczowych i żółtych wrzosów' },
  { image: img('22'), alt: 'Dział nawozów, ziemi i środków ochrony roślin' },
  { image: img('dscn0599'), alt: 'Różowe wrzosy na pierwszym planie i tęczowa ekspozycja w tle' },
  { image: img('dscn0597'), alt: 'Kolorowe wrzosy i byliny na stołach' },
  { image: img('39'), alt: 'Sklep w świątecznej odsłonie z dekoracjami' },
  { image: img('dscn0600'), alt: 'Okrągła rabata z kolorowych wrzosów na placu centrum' },
  { image: img('555'), alt: 'Budynek TOMKA Centrum Ogrodnicze z rabatami roślin' },
];
