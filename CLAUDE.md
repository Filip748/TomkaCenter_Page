# Tomka Centrum Ogrodnicze – Landing Page

## Cel
Nowoczesna, szybka strona wizytówka dla centrum ogrodniczego "Tomka Centrum Ogrodnicze"
(rośliny, drzewa, choinki, ziemia, trawa, kora i wiele więcej).
Strona MUSI być w języku polskim (UI, treści, meta tagi, komunikaty błędów).

## Źródło treści
- Stara strona: https://www.tomka.pl/ – stamtąd weź logo, zdjęcia, opisy, ofertę i dane kontaktowe.
- Pobierz zdjęcia do repo (nie hotlinkuj), zoptymalizuj je (WebP/AVIF, lazy loading).
- Jeśli brakuje danych (adres, godziny otwarcia, telefon), zapytaj mnie lub wstaw jasno oznaczony placeholder.
- Facebook: https://www.facebook.com/TomkaCentrumOgrodnicze

## Design
- Nowocześnie, czysto, dużo białej przestrzeni.
- Pastelowa paleta z dominacją zieleni (szałwiowa, miętowa, oliwkowa + ciepły krem jako tło).
- Zaokrąglone karty, miękkie cienie, subtelne animacje przy scrollu.
- Mobile first, pełna responsywność.
- Opcjonalnie sezonowy baner (np. choinki w grudniu).

## Stack (propozycja)
Astro lub Next.js + Tailwind CSS, TypeScript. Bez zbędnych bibliotek, wynik Lighthouse > 90.

## Sekcje strony
1. Hero: hasło, CTA ("Zobacz ofertę", "Zadzwoń"), sezonowy baner
2. Oferta: kategorie (rośliny, drzewa, choinki, ziemia, trawa, kora…) z kartami
3. Kalkulatory (zakładka/sekcja)
   - Kora: ile worków na X m² 
   - Trawnik: ile nasion/rolek i nawozu na X m²
   - Żywopłot: ile sadzonek na X metrów
   Wyniki zaokrąglaj w górę do pełnych sztuk; wzory trzymaj w osobnym pliku z komentarzami.
4. Poradnik ogrodnika (zakładka/sekcja)
   - Kalendarz prac miesiąc po miesiącu
   - Porady: trawnik, drzewa, choinki, ziemia i nawozy
5. O nas, galeria, opinie klientów
6. Kontakt: adres, telefon (tel:), godziny z "Otwarte teraz", mapa Google, link do Facebooka
7. Stopka: Facebook, RODO/cookies

## Wymagania jakościowe
- SEO lokalne: meta tagi, Open Graph, schema.org LocalBusiness
- Dostępność: kontrast, teksty alternatywne, nawigacja klawiaturą
- Szybkie ładowanie, brak layout shiftów
- Czysty, skomentowany kod i krótki README z instrukcją uruchomienia i deployu (Vercel/Netlify)

## Sposób pracy
Najpierw przejrzyj starą stronę i zaproponuj plan (struktura + paleta kolorów), potem buduj sekcja po sekcji.