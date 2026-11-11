/**
 * Dane strukturalne schema.org (JSON-LD) dla lokalnego SEO.
 * Typ GardenStore jest podtypem LocalBusiness – Google rozumie go jako sklep ogrodniczy.
 */
import { business, fullAddress } from './business';

const dayCodes = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/** Grupuje dni o tych samych godzinach w jedną specyfikację. */
function openingHoursSpecification() {
  const groups = new Map<string, string[]>();
  business.hours.forEach((h, i) => {
    if (!h) return;
    const key = `${h.open}-${h.close}`;
    groups.set(key, [...(groups.get(key) ?? []), `https://schema.org/${dayCodes[i]}`]);
  });
  return [...groups].map(([key, days]) => {
    const [opens, closes] = key.split('-');
    return { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes };
  });
}

export function localBusinessJsonLd(siteUrl: string, imageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GardenStore',
    '@id': `${siteUrl}#business`,
    name: business.name,
    slogan: business.slogan,
    description: business.description,
    url: siteUrl,
    image: imageUrl,
    logo: imageUrl,
    telephone: business.phone.e164,
    email: business.email,
    foundingDate: String(business.foundedYear),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street.replace(/^ul\.\s*/, ''),
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    ...(business.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    }),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: [business.facebook],
    areaServed: ['Sosnowiec', 'Katowice', 'Dąbrowa Górnicza', 'Będzin', 'Czeladź', 'Mysłowice'],
  };
}
