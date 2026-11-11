/**
 * Uniwersalne zakładki zgodne z WAI-ARIA (role=tablist/tab/tabpanel).
 * Klawiatura: ←/→ (oraz ↑/↓), Home, End. Użycie: initTabs(elementTablist).
 */
export function initTabs(tablist: HTMLElement, onChange?: (tab: HTMLButtonElement) => void) {
  const tabs = [...tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')];

  function select(tab: HTMLButtonElement, focus = true) {
    for (const t of tabs) {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !selected;
    }
    if (focus) tab.focus();
    onChange?.(tab);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const next = (i + 1) % tabs.length;
      const prev = (i - 1 + tabs.length) % tabs.length;
      const map: Record<string, number> = {
        ArrowRight: next,
        ArrowDown: next,
        ArrowLeft: prev,
        ArrowUp: prev,
        Home: 0,
        End: tabs.length - 1,
      };
      if (e.key in map) {
        e.preventDefault();
        select(tabs[map[e.key]]);
      }
    });
  });

  return { select, tabs };
}
