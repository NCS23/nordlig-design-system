# Komponenten-Review Report

**Datum:** 2026-02-15
**Scope:** Alle 59 Komponenten (17 Atoms, 9 Molecules, 10 Organisms + Unterkomponenten)
**Methode:** Automatisierte Bulk-Checks + manuelle Tiefenanalyse

---

## Zusammenfassung

| Kategorie | Anzahl |
|-----------|--------|
| CRITICAL (Produktion betroffen) | 4 |
| ERROR (Regelverstoss) | 17 |
| WARNING (Verbesserungsbedarf) | 5 |
| PASS (konform) | ~50 |

---

## CRITICAL — Produktion betroffen

### C1: Code, Kbd, Link — Fehlende semantische Token-Dateien

**Problem:** Diese 3 Komponenten referenzieren L4-Tokens (`--color-code-*`, `--color-kbd-*`, `--color-link-*`), aber die zugehoerigen semantischen JSON-Dateien fehlen in `packages/tokens/src/semantic/`. Die Tokens existieren nur in `tokens-annotated.css` (manuell gepflegt fuer Storybook), NICHT in `tokens.css` (auto-generiert fuer Produktion).

**Auswirkung:** In Storybook sehen die Komponenten korrekt aus (weil `preview.ts` beide CSS-Dateien importiert). In Produktion fallen alle Farben auf Browser-Defaults zurueck — Komponenten sind visuell kaputt.

**Betroffene Tokens:**

| Komponente | Fehlende Tokens |
|------------|----------------|
| Code (7) | `--color-code-bg`, `--color-code-text`, `--color-code-border`, `--color-code-block-bg`, `--color-code-block-text`, `--color-code-block-border`, `--color-code-line-number` |
| Kbd (5) | `--color-kbd-bg`, `--color-kbd-text`, `--color-kbd-border`, `--color-kbd-shadow`, `--color-kbd-border-bottom` |
| Link (2) | `--color-link-default`, `--color-link-hover` |

**Fix:** Semantische Token-Dateien erstellen:
- `packages/tokens/src/semantic/code.json`
- `packages/tokens/src/semantic/kbd.json`
- `packages/tokens/src/semantic/link.json`

Danach `cd packages/tokens && pnpm build` ausfuehren.

---

### C2: NavigationMenu — Token-Namenskonflikte

**Problem:** Die Komponente referenziert Tokens mit abgekuerzten Namen, die in `tokens.css` nicht existieren:

| Verwendet in Komponente | Existiert in tokens.css als |
|------------------------|-----------------------------|
| `--radius-nav` | `--radius-navigation-menu` |
| `--shadow-dropdown` | `--shadow-dropdown-menu` |
| `--radius-dropdown` | `--radius-dropdown-menu` |

**Auswirkung:** Border-Radius und Shadow werden nicht angewendet. Komponente rendert ohne abgerundete Ecken und ohne Schatten.

**Fix:** Token-Referenzen in `NavigationMenu.tsx` korrigieren ODER Aliase in `navigation-menu.json` hinzufuegen.

---

### C3: Fehlende L3-Tokens in tokens.css

**Problem:** 3 L3-Role-Tokens werden von Komponenten referenziert, existieren aber nicht in `tokens.css`:

| Token | Verwendet von |
|-------|---------------|
| `--color-bg-muted` | Code, Kbd |
| `--color-border-base` | Kbd |
| `--font-component-size-xs` | NumberInput |

**Fix:** Pruefen ob diese in den Role-Token-Dateien (`packages/tokens/src/roles/`) definiert sind. Falls nicht, hinzufuegen.

---

### C4: SessionCard — Undefinierte Token-Referenzen

**Problem:** SessionCard referenziert `--color-border-focus` (L3-Token) direkt statt ueber einen eigenen L4-Token. Dieser L3-Token existiert moeglicherweise nicht.

**Fix:** L4-Token `--color-session-card-border-focus` in `session-card.json` hinzufuegen, der auf den korrekten L3-Token verweist.

---

## ERROR — Regelverstösse

### E1: Hardcoded Border-Radius (4 Verstösse)

PROJEKT_REGELN.md verbietet hardcoded `rounded-*` Klassen — alle muessen ueber `--radius-*` Tokens laufen.

| Komponente | Datei | Klasse |
|------------|-------|--------|
| Dialog | `Dialog.tsx` | `rounded-lg` |
| Sheet | `Sheet.tsx` | `rounded-t-lg`, `rounded-l-lg` |
| ThemeToggle | `ThemeToggle.tsx` | `rounded-full` |
| Command | `Command.tsx` | `rounded-lg` |

**Fix:** Durch `[border-radius:var(--radius-*)]` ersetzen oder eigene L4-Tokens verwenden.

---

### E2: Hardcoded Heights (13 Verstösse in 10 Komponenten)

PROJEKT_REGELN.md verbietet hardcoded `h-*` Klassen — alle muessen ueber `--size-*` Tokens laufen.

| Komponente | Klassen |
|------------|---------|
| Input | `h-9`, `h-10`, `h-12` |
| Slider | `h-5`, `h-2` |
| Switch | `h-5`, `h-6` |
| Progress | `h-2`, `h-3`, `h-4` |
| Separator | `h-px` |
| NumberInput | `h-9`, `h-10`, `h-12` |
| Checkbox | `h-4`, `h-5`, `h-6` |
| Pagination | `h-9`, `h-10` |
| Command | `h-9` |
| Tabs | `h-9`, `h-10` |

**Fix:** Tailwind-Klassen durch `[height:var(--size-component-*)]` ersetzen. Erfordert ggf. neue Size-Tokens.

**Hinweis:** Dies ist ein systematisches Problem. Es betrifft alle Komponenten mit Groessen-Varianten (sm/md/lg). Ein Batch-Fix wird empfohlen, nachdem Size-Token-Skala definiert ist.

---

## WARNING — Verbesserungsbedarf

### W1: Button — Keine Unit-Tests

`packages/components/src/atoms/Button/Button.test.tsx` existiert nicht. Button ist die am meisten genutzte Komponente.

**Fix:** Testdatei erstellen mit Tests fuer: Rendering, Varianten, Sizes, Disabled-State, onClick-Handler, Loading-State, asChild.

---

### W2: Tooltip — Fehlendes forwardRef

`Tooltip.tsx` nutzt kein `React.forwardRef`. Alle anderen Komponenten im Design System tun dies korrekt.

**Fix:** Tooltip-Komponente mit `forwardRef` wrappen.

---

### W3: SessionCard — Fehlender Focus-Ring bei interaktiver Variante

Wenn `onClick` gesetzt ist, wird die Karte klickbar, hat aber keinen sichtbaren Focus-Indikator fuer Keyboard-Navigation.

**Fix:** `focus-visible:ring-2 focus-visible:ring-[var(--color-session-card-border-focus)]` hinzufuegen.

---

### W4: Command — Fehlende ARIA-Rolle auf CommandInput

`CommandInput` hat keine explizite `role="searchbox"` oder `role="combobox"`.

**Fix:** ARIA-Attribute ergaenzen gemaess WAI-ARIA Combobox Pattern.

---

### W5: StatCard — Trend-Icons nicht lokalisiert

Screen Reader lesen die Trend-Pfeile nicht vor. `aria-label` fehlt auf Trend-Icons.

**Fix:** `aria-label="Trend steigend"` / `"Trend fallend"` zu den SVG-Icons hinzufuegen.

---

## PASS — Konform

Die folgenden Pruefungen wurden fuer ALLE Komponenten bestanden:

| Pruefung | Ergebnis |
|----------|----------|
| `displayName` gesetzt | 62/62 Dateien ✅ |
| Story-Datei vorhanden | 59/59 Komponenten ✅ |
| In `tokens-annotated.css` dokumentiert | Alle L4-Komponenten ✅ |
| In `Colors.stories.tsx` dokumentiert | Alle relevanten ✅ |
| In Visual Tests enthalten | Alle relevanten ✅ |
| In `COMPONENT_LOG.md` eingetragen | Alle ✅ |
| Keine hardcoded Hex-Farben | 0 Funde ✅ |
| Keine Tailwind-Farbklassen (`bg-red-*` etc.) | 0 Funde ✅ |
| Keine hardcoded Box-Shadows | 0 Funde ✅ |
| StatCard L4-Token-Compliance | Vollstaendig ✅ |

---

## Empfohlene Reihenfolge der Fixes

### Prioritaet 1 — CRITICAL (Produktionsfehler)
1. **C1:** Semantische Token-Dateien fuer Code, Kbd, Link erstellen + Token-Build
2. **C2:** NavigationMenu Token-Namen korrigieren
3. **C3:** Fehlende L3-Tokens in Role-Dateien pruefen/ergaenzen
4. **C4:** SessionCard Focus-Token hinzufuegen

### Prioritaet 2 — ERROR (Regelkonformitaet)
5. **E1:** 4x hardcoded `rounded-*` durch Token-Referenzen ersetzen
6. **E2:** Size-Token-Skala definieren, dann 13x hardcoded `h-*` ersetzen (Batch)

### Prioritaet 3 — WARNING (Qualitaet)
7. **W1:** Button Unit-Tests schreiben
8. **W2:** Tooltip forwardRef
9. **W3–W5:** SessionCard Focus-Ring, Command ARIA, StatCard Trend-Labels

---

## Methodik

### Phase 1: Automatisierte Bulk-Checks
- Regex-Scan aller `.tsx`-Dateien auf verbotene Patterns (Hex-Farben, Tailwind-Klassen, hardcoded Werte)
- Dateiexistenz-Pruefung: Tests, Stories, Token-Annotationen, Visual Tests, COMPONENT_LOG
- `forwardRef`- und `displayName`-Pruefung ueber alle Komponentendateien
- Token-Definitionsluecken: `var(--*)` Referenzen vs. `tokens.css` Definitionen (544 vs. 1007)

### Phase 2: Tiefenanalyse
- Manuelle Review aller 11 Komponenten mit bekannten Violations
- Spezial-Review fuer StatCard + SessionCard (neueste Komponenten, Agent-generiert)
- Token-Architektur-Pruefung: L4 → L3 → L2 → L1 Kette verifiziert

### Phase 3: Report
- Kategorisierung nach Schweregrad (CRITICAL/ERROR/WARNING/PASS)
- Priorisierte Fix-Reihenfolge
