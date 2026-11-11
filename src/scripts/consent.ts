/**
 * Zgoda na treści zewnętrzne (mapa Google).
 * Strona sama nie używa cookies ani analityki. Jedynym źródłem cookies
 * podmiotów trzecich jest osadzona mapa Google, dlatego ładujemy ją dopiero
 * po kliknięciu (fasada) i zapamiętujemy wybór w localStorage.
 */
const KEY = 'tomka-consent-maps';

export function hasMapsConsent(): boolean {
  try {
    return localStorage.getItem(KEY) === 'yes';
  } catch {
    return false; // tryb prywatny / zablokowany storage
  }
}

export function setMapsConsent(value: boolean) {
  try {
    if (value) localStorage.setItem(KEY, 'yes');
    else localStorage.removeItem(KEY);
  } catch {
    /* brak dostępu do storage – zgoda tylko na tę wizytę */
  }
  document.dispatchEvent(new CustomEvent('consent-change', { detail: { maps: value } }));
}
