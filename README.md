# TOMKA Centrum Ogrodnicze – strona internetowa

Szybka, statyczna strona-wizytówka centrum ogrodniczego TOMKA w Sosnowcu.
Zbudowana w **Astro 7 + Tailwind CSS 4 + TypeScript**, bez frameworków JS po stronie klienta.

Lighthouse (mobile): **Performance 98–99 · Accessibility 100 · Best Practices 100 · SEO 100**, CLS 0.

## Uruchomienie

Wymagany **Node.js ≥ 22.23** (w repo jest `.nvmrc` z wersją 24).

```bash
nvm use            # przełącza na Node z .nvmrc
npm install
npm run dev        # http://localhost:4321 – podgląd na żywo
```

| Polecenie | Działanie |
| --- | --- |
| `npm run dev` | serwer deweloperski |
| `npm run build` | build produkcyjny do `dist/` |
| `npm run preview` | podgląd zbudowanej strony |
| `npm run check` | sprawdzenie typów (astro check) |
| `npm test` | testy wzorów kalkulatorów, godzin otwarcia i sezonów (Vitest) |
| `npm run fetch-images` | jednorazowe pobranie zdjęć ze starej strony tomka.pl |
| `npm run generate-icons` | ikony i obrazek Open Graph (`public/`) |

## Gdzie edytować treści

| Co | Plik |
| --- | --- |
| Adres, telefony, e-mail, godziny, Facebook, link do opinii Google | `src/lib/business.ts` |
| Kategorie oferty | `src/data/offer.ts` |
| Wzory kalkulatorów (kora, trawnik, żywopłot) | `src/lib/formulas.ts` |
| Kalendarz prac miesiąc po miesiącu | `src/data/calendar.ts` |
| Porady ogrodnika (Markdown) | `src/content/tips/*.md` |
| Zdjęcia galerii i opisy (alt) | `src/data/gallery.ts` + `src/assets/images/gallery/` |
| Sezonowy baner (choinki itp.) | `src/lib/seasons.ts` |
| Polityka prywatności | `src/pages/polityka-prywatnosci.astro` |
| Kolory i style | `src/styles/global.css` (tokeny w `@theme`) |

Zdjęcia wrzucaj w oryginale do `src/assets/images/`. Astro samo generuje AVIF/WebP w odpowiednich rozmiarach.

### Do uzupełnienia przed publikacją

W kodzie oznaczone jako `[UZUPEŁNIJ]`:

- **Polityka prywatności:** pełna nazwa firmy, NIP i REGON administratora oraz nazwa hostingu.
- **`business.ts`:** link do opinii z Profilu Firmy w Google, współrzędne GPS do schema.org i godziny sezonowe (jeśli są).
- **`seasons.ts`:** faktyczna data startu sprzedaży choinek.

## Struktura

```
src/
  components/          Header, Footer, Logo, OpenNow, SeasonalBanner
  components/sections/ Hero, Offer, Calculators, Guide, About, Gallery, Reviews, Contact
  content/tips/        porady w Markdown
  data/                oferta, kalendarz, galeria
  lib/                 dane firmy, wzory, godziny, sezony, schema.org (+ testy)
  scripts/             skrypty przeglądarki: zakładki, kalkulatory, animacje, zgoda na mapę
  pages/               index, polityka-prywatnosci, 404
scripts/               narzędzia: pobieranie zdjęć, generowanie ikon
```

## Prywatność i cookies

Strona **nie używa własnych cookies ani analityki**. Fonty i zdjęcia są hostowane lokalnie.
Mapa Google ładuje się dopiero po kliknięciu „Pokaż mapę Google”, a zgodę można wycofać
przyciskiem „Ustawienia cookies” w stopce. Dzięki temu baner cookies nie jest potrzebny.

## Deploy

Strona jest w pełni statyczna (`dist/`), więc działa na każdym hostingu.

### Vercel

1. Wypchnij repo na GitHub.
2. Na [vercel.com](https://vercel.com) wybierz **Add New → Project** i zaimportuj repozytorium.
3. Framework zostanie wykryty jako **Astro** (Build: `npm run build`, Output: `dist`).
4. W **Settings → Domains** dodaj `tomka.pl` i `www.tomka.pl`, a potem ustaw rekordy DNS według instrukcji.

### Netlify

1. Na [netlify.com](https://netlify.com) wybierz **Add new site → Import an existing project**.
2. Build command: `npm run build`, publish directory: `dist`.
3. W **Site configuration → Environment variables** dodaj `NODE_VERSION = 24`.
4. W **Domain management** podepnij domenę `tomka.pl`.

> Po zmianie domeny zaktualizuj `site` w `astro.config.mjs` oraz `public/robots.txt`.
