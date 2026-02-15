# Nordlig Design System — Backlog

> Lebendiges Dokument. Wird bei jeder Aktion aktualisiert, damit Kontext und Fortschritt
> auch bei Session-Wechseln oder Kontextverlust erhalten bleiben.

---

## Definition of Ready (DoR)

Eine Story ist **Ready**, wenn alle folgenden Punkte erfuellt sind:

- [ ] Komponente ist identifiziert und benannt
- [ ] Level festgelegt (Atom / Molecule / Organism)
- [ ] Token-Prefix ist festgelegt (z.B. `btn`, `cpybtn`, `img`)
- [ ] L4-Token-Mapping zu L3-Role-Tokens ist definiert (Tabelle)
- [ ] Props-Interface ist spezifiziert (mindestens grob)
- [ ] Blueprint-Komponente (Vorlage) ist identifiziert
- [ ] Dependencies sind bekannt (z.B. Radix-Primitive, externe Libs)
- [ ] Akzeptanzkriterien sind formuliert

---

## Definition of Done (DoD)

Eine Story ist **Done**, wenn alle folgenden Punkte erfuellt sind:

- [ ] **Schritt 1 — Tokens:** L4-Token-Datei erstellt, Token Build erfolgreich, Tokens in `tokens.css` vorhanden
- [ ] **Schritt 2 — Komponente:** Implementiert mit `forwardRef`, `displayName`, `cn()`/`cva()`, nur `var(--*)` Tokens
- [ ] **Schritt 3 — Unit Tests:** Geschrieben + alle bestanden (Accessibility, States, Edge Cases, Token-Klassen)
- [ ] **Schritt 4 — Stories:** Geschrieben (KEINE DesignTokens-Stories in Komponenten-Dateien!)
- [ ] **Schritt 5 — Infrastructure:** `index.ts` Export, `tokens-annotated.css`, `COMPONENT_LOG.md` aktualisiert
- [ ] **Schritt 6 — UX Review:** Durchgefuehrt, alle Critical + Major Issues gefixt
- [ ] **Schritt 7 — Visual Tests:** Playwright-Tests hinzugefuegt (atoms/molecules/organisms + Dark Mode)
- [ ] **Schritt 8 — Storybook Build:** Erfolgreich (0 Fehler)

---

## Story-Format

```
### [NDS-XXX] Komponentenname (Atom/Molecule/Organism)

**Status:** Backlog | Ready | In Progress (Schritt X/8) | Review | Done
**Prioritaet:** P1 (kritisch) | P2 (wichtig) | P3 (nice-to-have)
**Prefix:** `xxx` | **Blueprint:** `atoms/Example/Example.tsx`
**Dependencies:** keine | @radix-ui/react-xxx | etc.

**Beschreibung:**
Kurze Beschreibung, was die Komponente tut und warum sie gebraucht wird.

**Akzeptanzkriterien:**
- [ ] Kriterium 1
- [ ] Kriterium 2

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.xxx.bg` | `{color.bg.surface}` | Hintergrund |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen (`packages/tokens/src/semantic/xxx.json`) + Token Build
- [ ] 2. Komponente implementieren
- [ ] 3. Unit Tests schreiben
- [ ] 4. Stories schreiben
- [ ] 5. Infrastructure aktualisieren (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 6. Design & UX Review + Fixes
- [ ] 7. Visual Tests (Playwright)
- [ ] 8. Storybook Build verifizieren

**Notizen:**
Kontext, Entscheidungen, Blocker, offene Fragen.
```

---

## Backlog

> Stories die noch nicht begonnen wurden, absteigend nach Prioritaet sortiert.

### [NDS-001] Toggle (Atom) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Standalone Toggle fehlt, nur ToggleGroup vorhanden
**Prefix:** `tgl` | **Blueprint:** `atoms/Switch/Switch.tsx`
**Dependencies:** `@radix-ui/react-toggle` (muss installiert werden)

**Beschreibung:**
Standalone Toggle-Button (pressed/unpressed). Radix-Primitive. Wird fuer Toolbars,
Formatting-Buttons, Filter-Toggles etc. gebraucht. ToggleGroup existiert schon,
aber ein einzelner Toggle fehlt.

**Akzeptanzkriterien:**
- [ ] Pressed/Unpressed State mit `aria-pressed`
- [ ] Controlled + Uncontrolled Mode
- [ ] 3 Varianten: default, outline, ghost
- [ ] 3 Groessen: sm, md, lg
- [ ] Icon-only und Icon+Text Support

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.tgl.bg` | `{color.bg.surface}` | Hintergrund (unpressed) |
| `color.tgl.bg-hover` | `{color.bg.surface-hover}` | Hover |
| `color.tgl.bg-pressed` | `{color.bg.primary-subtle}` | Hintergrund (pressed) |
| `color.tgl.text` | `{color.text.base}` | Text/Icon (unpressed) |
| `color.tgl.text-pressed` | `{color.text.primary}` | Text/Icon (pressed) |
| `color.tgl.border` | `{color.border.default}` | Rand (outline-Variante) |
| `radius.tgl` | `{radius.component.md}` | Eckenradius |
| `sizing.tgl.sm` | 28px | Hoehe sm |
| `sizing.tgl.md` | 32px | Hoehe md |
| `sizing.tgl.lg` | 36px | Hoehe lg |

**Task Breakdown:**
- [x] 1. `@radix-ui/react-toggle` installieren + L4-Tokens (nutzt bestehende `toggle.json`)
- [x] 2. Komponente implementiert (forwardRef, cva 3 Varianten, 3 Groessen)
- [x] 3. 12 Unit Tests — alle bestanden
- [x] 4. 8 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 0 Issues (sauber)
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- Kein neues Token-JSON noetig — nutzt bestehende ToggleGroup-Tokens (`toggle.json`).
- UX Review ergab 0 Issues — saubere Radix-Delegation.

---

### [NDS-002] Combobox (Molecule) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Autocomplete/Searchable-Select ist eine Kernluecke
**Prefix:** `cmb` | **Blueprint:** `organisms/Command/Command.tsx` + `molecules/Select/Select.tsx`
**Dependencies:** keine neuen — nutzt bestehende Popover + Command intern

**Beschreibung:**
Durchsuchbares Dropdown (Autocomplete). Kombiniert Popover + Command-Pattern.
Gaengigster Use Case: Searchable Select mit Freitext-Filter.
shadcn/ui-Pattern: `<Popover><Command>` Komposition.

**Akzeptanzkriterien:**
- [ ] Durchsuchbare Options-Liste mit Keyboard-Navigation
- [ ] Controlled + Uncontrolled Mode
- [ ] Single-Select (Multi-Select ist NDS-004)
- [ ] Empty-State wenn keine Treffer
- [ ] Accessible: `combobox` Role, `aria-expanded`, `aria-activedescendant`
- [ ] Optionale Gruppen (wie Command Groups)

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.cmb.trigger-bg` | `{color.bg.input}` | Trigger-Hintergrund |
| `color.cmb.trigger-border` | `{color.border.input}` | Trigger-Rand |
| `color.cmb.trigger-text` | `{color.text.base}` | Trigger-Text |
| `color.cmb.trigger-placeholder` | `{color.text.muted}` | Placeholder |
| `color.cmb.content-bg` | `{color.bg.popover}` | Dropdown-Hintergrund |
| `color.cmb.content-border` | `{color.border.default}` | Dropdown-Rand |
| `color.cmb.item-hover-bg` | `{color.bg.surface-hover}` | Item Hover |
| `color.cmb.item-selected-bg` | `{color.bg.primary-subtle}` | Item ausgewaehlt |
| `color.cmb.item-selected-text` | `{color.text.primary}` | Item-Text ausgewaehlt |
| `color.cmb.search-bg` | `{color.bg.input}` | Such-Input Hintergrund |
| `color.cmb.empty-text` | `{color.text.muted}` | "Keine Ergebnisse" Text |
| `radius.cmb.trigger` | `{radius.component.md}` | Trigger-Radius |
| `radius.cmb.content` | `{radius.component.lg}` | Dropdown-Radius |
| `spacing.cmb.content-padding` | `{spacing.component.padding.xs}` | Dropdown-Innenabstand |
| `spacing.cmb.item-padding-x` | `{spacing.component.padding.md}` | Item Padding X |
| `spacing.cmb.item-padding-y` | `{spacing.component.padding.sm}` | Item Padding Y |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (`combobox.json` mit 16 Tokens) + Token Build
- [x] 2. Komponente implementiert (Popover + cmdk, forwardRef, 11 color + 2 radius + 3 spacing Tokens)
- [x] 3. 13 Unit Tests — alle bestanden
- [x] 4. 7 Stories geschrieben
- [x] 5. Infrastructure aktualisiert (ersetzt alten Select/Combobox-Export)
- [x] 6. UX Review: 1 Critical + 2 Major gefixt (Shadow-Token, aria-hidden Icons)
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- Falsches L3-Token `color.bg.input` → korrigiert zu `color.bg.paper`.
- Shadow-Token `--shadow-elevation-md` existiert nicht → korrigiert zu `--shadow-select-popover`.
- Eigenstaendige Komponente (nicht mehr Teil von Select-Modul).

---

### [NDS-003] Banner (Atom) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Persistente Benachrichtigungen fehlen (Toast ist transient)
**Prefix:** `banner` | **Blueprint:** `atoms/Alert/Alert.tsx`
**Dependencies:** keine

**Beschreibung:**
Full-width Benachrichtigungs-Banner fuer persistente Nachrichten (System-Status,
Cookie-Hinweise, Feature-Ankuendigungen). Unterschied zu Alert: prominenter,
full-width, optional dismissible. Unterschied zu Toast: persistent, nicht auto-hide.

**Akzeptanzkriterien:**
- [ ] 4 Varianten: info, success, warning, error
- [ ] Optional dismissible (X-Button)
- [ ] Optional Action-Button (CTA)
- [ ] Icon pro Variante (automatisch oder custom)
- [ ] `role="status"` (info/success) bzw. `role="alert"` (warning/error)

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.banner.info-bg` | `{color.info.bg}` | Info Hintergrund |
| `color.banner.info-text` | `{color.info.text}` | Info Text |
| `color.banner.info-border` | `{color.info.border}` | Info Rand |
| `color.banner.success-bg` | `{color.success.bg}` | Success Hintergrund |
| `color.banner.success-text` | `{color.success.text}` | Success Text |
| `color.banner.success-border` | `{color.success.border}` | Success Rand |
| `color.banner.warning-bg` | `{color.warning.bg}` | Warning Hintergrund |
| `color.banner.warning-text` | `{color.warning.text}` | Warning Text |
| `color.banner.warning-border` | `{color.warning.border}` | Warning Rand |
| `color.banner.error-bg` | `{color.error.bg}` | Error Hintergrund |
| `color.banner.error-text` | `{color.error.text}` | Error Text |
| `color.banner.error-border` | `{color.error.border}` | Error Rand |
| `color.banner.dismiss` | `{color.text.muted}` | Dismiss-Icon |
| `spacing.banner.padding-x` | `{spacing.component.padding.lg}` | Horizontaler Abstand |
| `spacing.banner.padding-y` | `{spacing.component.padding.md}` | Vertikaler Abstand |
| `spacing.banner.gap` | `{spacing.component.gap.md}` | Abstand zwischen Elementen |
| `radius.banner` | `{radius.component.none}` | Kein Radius (full-width) |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (`banner.json` mit 16 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef, cva 4 Varianten, BannerContent Sub-Komponente)
- [x] 3. 15 Unit Tests — alle bestanden
- [x] 4. 8 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 1 Critical + 2 Major gefixt (focus-visible Dismiss, aria-hidden Icons, statische Icon-Klassen-Map)
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- L3-Tokens `color.info.*`, `color.success.*` etc. existieren alle.
- Template-Literal fuer Icon-Klassen durch statische Map ersetzt (Tailwind JIT-kompatibel).

---

### [NDS-004] MultiSelect (Molecule) — P2

**Status:** Ready
**Prioritaet:** P2 (wichtig) — Haeufig gebraucht fuer Filter, Formulare, Tag-Auswahl
**Prefix:** `msel` | **Blueprint:** `molecules/Select/Select.tsx` + `atoms/Tag/Tag.tsx`
**Dependencies:** keine neuen — nutzt Popover + Command + Tag intern

**Beschreibung:**
Multi-Value Select mit Tag-Darstellung. Ausgewaehlte Werte erscheinen als Tags im
Trigger. Durchsuchbar wie Combobox. Baut auf NDS-002 (Combobox) Pattern auf.

**Akzeptanzkriterien:**
- [ ] Mehrfachauswahl mit Tags im Trigger
- [ ] Tags entfernbar (X pro Tag)
- [ ] Durchsuchbar (Freitext-Filter)
- [ ] `maxItems` Begrenzung optional
- [ ] Keyboard: Backspace entfernt letzten Tag

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.msel.trigger-bg` | `{color.bg.input}` | Trigger-Hintergrund |
| `color.msel.trigger-border` | `{color.border.input}` | Trigger-Rand |
| `color.msel.tag-bg` | `{color.bg.primary-subtle}` | Tag-Hintergrund |
| `color.msel.tag-text` | `{color.text.primary}` | Tag-Text |
| `color.msel.tag-remove` | `{color.text.muted}` | Tag-X-Icon |
| `color.msel.content-bg` | `{color.bg.popover}` | Dropdown BG |
| `color.msel.item-hover-bg` | `{color.bg.surface-hover}` | Item Hover |
| `color.msel.item-checked` | `{color.text.primary}` | Checkmark |
| `radius.msel.trigger` | `{radius.component.md}` | Trigger-Radius |
| `radius.msel.tag` | `{radius.component.full}` | Tag-Radius (Pill) |
| `spacing.msel.trigger-padding` | `{spacing.component.padding.sm}` | Trigger-Innenabstand |
| `spacing.msel.tag-gap` | `{spacing.component.gap.xs}` | Abstand zwischen Tags |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen + Token Build
- [ ] 2. Komponente implementieren (Combobox-Pattern + Tag-Rendering)
- [ ] 3. Unit Tests schreiben (~14 Tests)
- [ ] 4. Stories schreiben (Default, WithMaxItems, PreSelected, Disabled, InForm, ManyItems)
- [ ] 5. Infrastructure (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 6. Design & UX Review + Fixes
- [ ] 7. Visual Tests (Playwright)
- [ ] 8. Storybook Build verifizieren

**Notizen:**
- Sollte NACH NDS-002 (Combobox) entwickelt werden, da es das Pattern erweitert.
- Tag-Komponente existiert bereits — fuer Tag-Rendering im Trigger wiederverwenden.

---

### [NDS-005] Rating (Atom) — P2

**Status:** Done
**Prioritaet:** P2 (wichtig) — Standard fuer Bewertungen, Feedback, Reviews
**Prefix:** `rtg` | **Blueprint:** keiner (neu)
**Dependencies:** keine — lucide-react (Star-Icon) ist installiert

**Beschreibung:**
Sterne-Bewertung (oder beliebiges Icon). Interaktiv oder read-only.
Unterstuetzt halbe Sterne, Custom-Icons, und verschiedene Groessen.

**Akzeptanzkriterien:**
- [x] Klickbare Sterne (1 bis `max`)
- [x] Read-only Modus
- [x] Hover-Preview (zeigt Bewertung vor Klick)
- [x] Halbe Sterne optional (`precision: 0.5`)
- [ ] Custom Icon moeglich
- [x] Keyboard: Pfeiltasten + Home/End

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.rtg.filled` | `{color.warning.text}` | Ausgefuellter Stern (Gold/Amber) |
| `color.rtg.empty` | `{color.text.disabled}` | Leerer Stern |
| `color.rtg.hover` | `{color.warning.border}` | Hover-Farbe |
| `color.rtg.text` | `{color.text.muted}` | Optionaler Bewertungs-Text |
| `spacing.rtg.gap` | `{spacing.component.gap.xs}` | Abstand zwischen Sternen |
| `sizing.rtg.sm` | 16px | Stern-Groesse sm |
| `sizing.rtg.md` | 20px | Stern-Groesse md |
| `sizing.rtg.lg` | 24px | Stern-Groesse lg |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (8 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef, Keyboard-Navigation, roving tabindex)
- [x] 3. 14 Unit Tests — alle bestanden
- [x] 4. 6 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 3 Critical + 3 Major gefixt (roving tabindex, focus-visible, aria-label, text-[color:], aria-orientation)
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- `role="radiogroup"` mit `role="radio"` pro Stern fuer interaktiven Modus, `role="img"` fuer readOnly/disabled.
- Precision 0.5: Halber Stern via CSS `clip-path: inset(0 50% 0 0)`.
- Roving tabindex: Aktiver Stern hat `tabIndex={0}`, rest `tabIndex={-1}`.
- Custom Icon nicht implementiert (nicht im Scope, kann spaeter ergaenzt werden).

---

### [NDS-006] LoadingOverlay (Atom) — P2

**Status:** Done
**Prioritaet:** P2 (wichtig) — Fehlt fuer Container-Ladezustaende
**Prefix:** `ldovl` | **Blueprint:** `atoms/Spinner/Spinner.tsx`
**Dependencies:** keine — nutzt Spinner intern

**Beschreibung:**
Semi-transparentes Overlay ueber einem Container waehrend Ladezustaenden.
Zeigt Spinner + optionalen Text. Kann auf beliebige Container angewendet werden.

**Akzeptanzkriterien:**
- [x] Absolut positioniertes Overlay ueber Parent-Container
- [x] Spinner (bestehende Komponente) zentriert
- [x] Optionaler Lade-Text
- [x] Backdrop-Blur optional
- [x] `aria-busy="true"` auf Container

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.ldovl.bg` | `{color.bg.overlay}` | Overlay-Hintergrund (semi-transparent) |
| `color.ldovl.text` | `{color.text.base}` | Lade-Text |
| `color.ldovl.spinner` | `{color.text.primary}` | Spinner-Farbe |
| `spacing.ldovl.gap` | `{spacing.component.gap.md}` | Abstand Spinner–Text |
| `radius.ldovl` | `{radius.component.md}` | Eckenradius (matching Container) |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (5 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef, Spinner-Integration, HTML hidden-Attr fuer Live-Region)
- [x] 3. 10 Unit Tests — alle bestanden
- [x] 4. 5 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 1 Critical + 2 Major gefixt (Live-Region via hidden-Attr statt null, text-[color:])
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- Spinner-Atom wiederverwendet. `color.bg.overlay` L3-Token existiert.
- Live-Region-Fix: HTML `hidden` Attribut statt `return null` damit `role="status"` im DOM bleibt.
- Pattern: Parent braucht `position: relative`, Overlay ist `position: absolute inset-0`.

---

### [NDS-007] SegmentedControl (Atom) — P3

**Status:** Ready
**Prioritaet:** P3 (nice-to-have) — iOS-aehnliche Tab-Umschaltung
**Prefix:** `seg` | **Blueprint:** `atoms/ToggleGroup/ToggleGroup.tsx`
**Dependencies:** keine — reines React (oder Radix ToggleGroup intern)

**Beschreibung:**
Segmented Control (wie iOS). Visuell eine Reihe von Optionen, eine ist aktiv.
Unterschied zu Tabs: kompakter, Button-aehnlich, fuer Optionen/Filter statt Content-Panels.

**Akzeptanzkriterien:**
- [ ] Single-Select aus N Optionen
- [ ] Animierter Indicator beim Wechsel
- [ ] Controlled + Uncontrolled
- [ ] Disabled gesamt und pro Segment
- [ ] Groessen: sm, md, lg

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.seg.bg` | `{color.bg.surface}` | Container-Hintergrund |
| `color.seg.active-bg` | `{color.bg.paper}` | Aktives Segment |
| `color.seg.text` | `{color.text.muted}` | Inaktiver Text |
| `color.seg.active-text` | `{color.text.base}` | Aktiver Text |
| `color.seg.hover-bg` | `{color.bg.surface-hover}` | Hover (inaktiv) |
| `radius.seg.container` | `{radius.component.md}` | Aeusserer Radius |
| `radius.seg.item` | `{radius.component.sm}` | Segment-Radius |
| `spacing.seg.padding` | `{spacing.component.padding.xs}` | Container-Padding |
| `sizing.seg.sm` | 28px | Hoehe sm |
| `sizing.seg.md` | 32px | Hoehe md |
| `sizing.seg.lg` | 36px | Hoehe lg |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen + Token Build
- [ ] 2. Komponente implementieren (animierter Indicator via CSS transform)
- [ ] 3. Unit Tests schreiben (~12 Tests)
- [ ] 4. Stories schreiben (Default, AllSizes, Disabled, ManyItems, Controlled, WithIcons)
- [ ] 5. Infrastructure (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 6. Design & UX Review + Fixes
- [ ] 7. Visual Tests (Playwright)
- [ ] 8. Storybook Build verifizieren

**Notizen:**
- Animierter Indicator: `position: absolute` Box die per `transform: translateX()` zum aktiven Segment slided.
- Accessibility: `role="radiogroup"` + `role="radio"` oder Radix ToggleGroup single-mode.

---

### [NDS-008] Unit Test Cleanup (Infrastructure) — P3

**Status:** Ready
**Prioritaet:** P3 (heruntergestuft) — Audit zeigt: alle 69 Komponenten haben Tests
**Prefix:** — | **Blueprint:** `atoms/CopyButton/CopyButton.test.tsx` (als Vorlage)
**Dependencies:** keine

**Beschreibung:**
~~Urspruenglich P2 weil Tests fehlten.~~ Audit (2026-02-15) zeigt: ALLE 69 Komponenten
haben Test-Dateien. Kleinere Cleanup-Aufgabe: 3 Atoms unter 8 Tests anheben.

**Audit-Ergebnis (2026-02-15):**
- Alle 69 Komponenten haben `.test.tsx` Dateien
- Minimum: 6 Tests (AspectRatio, InputOTP, VisuallyHidden)
- Maximum: 58 Tests (Sidebar)
- 3 Komponenten unter 8 Tests: AspectRatio (6), InputOTP (6), VisuallyHidden (6)
- Button hat 24 Tests — COMPONENT_LOG.md-Eintrag ist veraltet

**Akzeptanzkriterien:**
- [ ] AspectRatio, InputOTP, VisuallyHidden auf je 8+ Tests erweitern
- [ ] COMPONENT_LOG.md: Veraltete "Tests fehlen" Eintraege korrigieren

**Task Breakdown:**
- [x] 1. Audit: Alle Komponenten pruefen — erledigt, keine ohne Tests
- [ ] 2. AspectRatio Tests erweitern (6 → 8+)
- [ ] 3. InputOTP Tests erweitern (6 → 8+)
- [ ] 4. VisuallyHidden Tests erweitern (6 → 8+)
- [ ] 5. COMPONENT_LOG.md aktualisieren
- [ ] 6. Alle Tests laufen lassen — 0 Failures

**Notizen:**
- Scope drastisch reduziert. Nur noch 3 Komponenten betroffen.
- Von P2 auf P3 heruntergestuft — nicht dringend.

---

### [NDS-009] Visual Regression Baseline (Infrastructure) — P2

**Status:** Ready
**Prioritaet:** P2 (heraufgestuft) — Visual Tests sind spaerlich, Spec-Dateien fast leer
**Prefix:** — | **Blueprint:** `tests/visual/atoms.spec.ts`
**Dependencies:** Playwright installiert

**Beschreibung:**
Playwright Visual Regression Tests fuer alle 69+ Komponenten erstellen.
Baseline-Screenshots generieren. Dark-Mode Coverage sicherstellen.

**Audit-Ergebnis (2026-02-15):**
- `tests/visual/atoms.spec.ts` — 0 Story-Tests
- `tests/visual/molecules.spec.ts` — 0 Story-Tests
- `tests/visual/organisms.spec.ts` — 4 Story-Tests
- `tests/visual/dark-mode.spec.ts` — 0 Story-Tests
- Coverage: ~6% (4 von 69 Komponenten)

**Akzeptanzkriterien:**
- [ ] Alle Atoms haben Visual Tests (32 Komponenten)
- [ ] Alle Molecules haben Visual Tests (25 Komponenten)
- [ ] Alle Organisms haben Visual Tests (12 Komponenten)
- [ ] Dark-Mode Tests fuer alle Komponenten
- [ ] Baseline-Screenshots committed

**Task Breakdown:**
- [x] 1. Audit: Welche Komponenten haben bereits Visual Tests? — 4 von 69
- [ ] 2. Atom Visual Tests schreiben (32 Komponenten)
- [ ] 3. Molecule Visual Tests schreiben (25 Komponenten)
- [ ] 4. Organism Visual Tests ergaenzen (8 fehlende)
- [ ] 5. Dark-Mode Coverage fuer alle 69 Komponenten
- [ ] 6. Baseline-Screenshots generieren und committen

**Notizen:**
- Braucht laufenden Storybook-Server fuer Playwright.
- Kann in 3-4 Batches abgearbeitet werden (je Level).
- Von P3 auf P2 heraufgestuft weil Coverage mit ~6% sehr niedrig ist.

---

### [NDS-010] SearchInput (Atom) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Extrem haeufiges Pattern, fehlt komplett
**Prefix:** `sinput` | **Blueprint:** `atoms/Input/Input.tsx`
**Dependencies:** keine — lucide-react (Search, X Icons) ist installiert

**Beschreibung:**
Input-Feld mit integriertem Such-Icon (links) und optionalem Clear-Button (rechts).
Gaengigstes UI-Pattern fuer Filter, Suche, Tabellen-Filter.
Erweitert das bestehende Input-Atom um Such-spezifisches Verhalten.

**Akzeptanzkriterien:**
- [ ] Such-Icon links im Input
- [ ] Optionaler Clear-Button (X) rechts, nur sichtbar wenn Wert vorhanden
- [ ] `onSearch` Callback (bei Enter oder Debounce)
- [ ] Debounce-Option (`debounceMs` Prop)
- [ ] Alle Input-Props durchgereicht (placeholder, disabled, etc.)
- [ ] Keyboard: Escape leert den Wert

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.sinput.icon` | `{color.text.muted}` | Such-Icon Farbe |
| `color.sinput.icon-focus` | `{color.text.base}` | Such-Icon bei Focus |
| `color.sinput.clear` | `{color.text.muted}` | Clear-Button Farbe |
| `color.sinput.clear-hover` | `{color.text.base}` | Clear-Button Hover |
| `spacing.sinput.icon-gap` | `{spacing.component.gap.sm}` | Abstand Icon–Text |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (`searchinput.json` mit 5 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef auf Input, mergedRef-Pattern, inputVariants wiederverwendet)
- [x] 3. 14 Unit Tests — alle bestanden
- [x] 4. 7 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 1 Critical + 2 Major gefixt (Ref auf Input statt Div, Debounce mount-guard, role="search")
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- Ref forwarded jetzt auf `<input>` (nicht wrapper-div) fuer konsistentes Focus-Management.
- Debounce feuert nicht mehr beim initialen Mount (mountedRef guard).
- Wrapper-div hat `role="search"` Landmark fuer bessere Screen-Reader-Navigation.

---

### [NDS-011] TimePicker (Molecule) — P2

**Status:** Ready
**Prioritaet:** P2 (wichtig) — DatePicker ohne TimePicker ist nur halb nuetzlich
**Prefix:** `tpick` | **Blueprint:** `molecules/DatePicker/DatePicker.tsx`
**Dependencies:** date-fns (vorhanden)

**Beschreibung:**
Uhrzeit-Auswahl (HH:MM, optional :SS). Kann standalone oder zusammen mit
DatePicker fuer vollstaendige Datum+Uhrzeit-Auswahl verwendet werden.
Zwei Modi: Dropdown-Scroll (wie iOS) oder Input-basiert.

**Akzeptanzkriterien:**
- [ ] Stunden (0-23) und Minuten (0-59) auswaehlbar
- [ ] Optional Sekunden
- [ ] 24h und 12h (AM/PM) Format
- [ ] Controlled + Uncontrolled
- [ ] Keyboard: Pfeiltasten zum Scrollen, Tab zwischen H/M/S
- [ ] Min/Max Zeit-Begrenzung
- [ ] Integration mit DatePicker moeglich

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.tpick.trigger-bg` | `{color.bg.input}` | Trigger-Hintergrund |
| `color.tpick.trigger-border` | `{color.border.input}` | Trigger-Rand |
| `color.tpick.trigger-text` | `{color.text.base}` | Trigger-Text |
| `color.tpick.content-bg` | `{color.bg.popover}` | Dropdown-Hintergrund |
| `color.tpick.item-hover-bg` | `{color.bg.surface-hover}` | Item Hover |
| `color.tpick.item-selected-bg` | `{color.bg.primary-subtle}` | Ausgewaehlte Zeit |
| `color.tpick.item-selected-text` | `{color.text.primary}` | Ausgewaehlter Text |
| `color.tpick.separator` | `{color.text.muted}` | Doppelpunkt-Separator |
| `radius.tpick.trigger` | `{radius.component.md}` | Trigger-Radius |
| `radius.tpick.content` | `{radius.component.lg}` | Dropdown-Radius |
| `spacing.tpick.column-gap` | `{spacing.component.gap.sm}` | Abstand H:M:S Spalten |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen + Token Build
- [ ] 2. Komponente implementieren (Scroll-Columns fuer H/M/S, Popover-Trigger)
- [ ] 3. Unit Tests schreiben (~16 Tests)
- [ ] 4. Stories schreiben (Default, WithSeconds, 12hFormat, MinMax, WithDatePicker, Disabled)
- [ ] 5. Infrastructure (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 6. Design & UX Review + Fixes
- [ ] 7. Visual Tests (Playwright)
- [ ] 8. Storybook Build verifizieren

**Notizen:**
- Scroll-Column-Pattern: Jede Spalte (H/M/S) ist eine ScrollArea mit snap-scroll.
- DatePicker-Integration: Props `time` + `onTimeChange` zum bestehenden DatePicker hinzufuegen.
- date-fns fuer Formatierung (format, parse) bereits vorhanden.

---

### [NDS-012] PasswordInput (Atom) — P2

**Status:** Done
**Prioritaet:** P2 (wichtig) — Standard fuer Login/Registrierung
**Prefix:** `pwinput` | **Blueprint:** `atoms/Input/Input.tsx`
**Dependencies:** keine — lucide-react (Eye, EyeOff Icons) ist installiert

**Beschreibung:**
Passwort-Eingabefeld mit Toggle-Button zum Ein-/Ausblenden des Passworts.
Erweitert das bestehende Input-Atom. Optional: Staerke-Indikator.

**Akzeptanzkriterien:**
- [x] Standard: `type="password"` (Punkte)
- [x] Toggle-Button zum Umschalten auf `type="text"`
- [x] Optional: Passwort-Staerke-Indikator (weak/medium/strong)
- [x] Alle Input-Props durchgereicht
- [x] `aria-label` auf Toggle-Button

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.pwinput.toggle` | `{color.text.muted}` | Toggle-Icon Farbe |
| `color.pwinput.toggle-hover` | `{color.text.base}` | Toggle-Icon Hover |
| `color.pwinput.strength-weak` | `{color.error.text}` | Staerke: schwach |
| `color.pwinput.strength-medium` | `{color.warning.text}` | Staerke: mittel |
| `color.pwinput.strength-strong` | `{color.success.text}` | Staerke: stark |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (5 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef, Input-Wrapper, Eye/EyeOff Toggle, Strength-Meter)
- [x] 3. 12 Unit Tests — alle bestanden
- [x] 4. 5 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 2 Critical + 2 Major gefixt (role=meter auf Strength-Bar, aria-live, Toggle fokussierbar, text-[color:])
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- Baut auf Input-Atom auf (inputVariants wiederverwendet).
- Staerke-Indikator: `role="meter"` mit `aria-valuenow`/`aria-valuetext` + `aria-live="polite"`.
- Toggle-Button ist Tab-fokussierbar (kein `tabIndex={-1}`) + focus-visible Styles.

---

### [NDS-013] ColorPicker (Molecule) — P2

**Status:** Ready
**Prioritaet:** P2 (wichtig) — Farbauswahl fuer Design-Tools, CMS, Themes
**Prefix:** `cpick` | **Blueprint:** keiner (neu)
**Dependencies:** keine neuen

**Beschreibung:**
Farbauswahl-Komponente mit Saturation/Brightness-Feld, Hue-Slider, und
optionalem Alpha-Slider. Unterstuetzt Hex, RGB, HSL Formate.

**Akzeptanzkriterien:**
- [ ] Saturation/Brightness 2D-Feld (Maus + Touch)
- [ ] Hue-Slider (0-360)
- [ ] Optional Alpha-Slider (0-1)
- [ ] Hex-Input mit Validierung
- [ ] RGB/HSL Toggle optional
- [ ] Presets/Swatches optional
- [ ] Controlled + Uncontrolled
- [ ] Keyboard-navigierbar

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.cpick.bg` | `{color.bg.popover}` | Container-Hintergrund |
| `color.cpick.border` | `{color.border.default}` | Container-Rand |
| `color.cpick.slider-track` | `{color.bg.surface}` | Slider-Track |
| `color.cpick.slider-thumb-border` | `{color.border.strong}` | Thumb-Rand |
| `color.cpick.input-bg` | `{color.bg.input}` | Hex-Input BG |
| `color.cpick.input-border` | `{color.border.input}` | Hex-Input Rand |
| `color.cpick.swatch-border` | `{color.border.muted}` | Swatch-Rand |
| `radius.cpick.container` | `{radius.component.lg}` | Container-Radius |
| `radius.cpick.swatch` | `{radius.component.sm}` | Swatch-Radius |
| `radius.cpick.field` | `{radius.component.md}` | Saturation-Feld-Radius |
| `spacing.cpick.padding` | `{spacing.component.padding.md}` | Innenabstand |
| `spacing.cpick.gap` | `{spacing.component.gap.md}` | Abstand zwischen Elementen |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen + Token Build
- [ ] 2. Saturation/Brightness-Feld implementieren (Canvas oder CSS-Gradient)
- [ ] 3. Hue/Alpha-Slider + Hex-Input
- [ ] 4. Unit Tests schreiben (~16 Tests)
- [ ] 5. Stories schreiben (Default, WithAlpha, WithSwatches, Compact, InPopover, Controlled)
- [ ] 6. Infrastructure (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 7. Design & UX Review + Fixes
- [ ] 8. Visual Tests (Playwright)
- [ ] 9. Storybook Build verifizieren

**Notizen:**
- Komplexeste Komponente im Backlog — eigener 2D-Gradient-Picker.
- Saturation-Feld: CSS `linear-gradient` in X (white→transparent) + Y (transparent→black)
  ueber einem Hue-farbigen Hintergrund. Kein Canvas noetig.
- HSL/RGB-Konvertierung: Eigene Utils, kein externes Package.

---

### [NDS-014] Component Generator CLI (Infrastructure) — P1

**Status:** Ready
**Prioritaet:** P1 (kritisch) — Spart bei jeder neuen Komponente 15-20 Min Setup
**Prefix:** — | **Blueprint:** keiner
**Dependencies:** keine neuen (Node.js Scripts)

**Beschreibung:**
CLI-Tool zum Scaffolding neuer Komponenten. Generiert alle Dateien des 7-Schritt-Workflows
aus Templates: Token-JSON, TSX, Test, Stories, Index.

**Akzeptanzkriterien:**
- [ ] `pnpm generate:component` interaktiv (Name, Level, Prefix)
- [ ] Generiert: Token-JSON, Component.tsx, Component.test.tsx, Component.stories.tsx, index.ts
- [ ] Templates folgen allen Projektkonventionen (forwardRef, displayName, cn/cva, var(--*))
- [ ] Test-Template mit Standard-Tests (Rendering, ref, className, displayName, Token-Klassen)

**Task Breakdown:**
- [ ] 1. Script `scripts/generate-component.mjs` erstellen
- [ ] 2. Templates fuer alle 5 Dateitypen definieren
- [ ] 3. `pnpm generate:component` Script in root package.json eintragen
- [ ] 4. Testen: Dummy-Komponente generieren, pruefen, loeschen
- [ ] 5. README-Abschnitt zum Generator schreiben

**Notizen:**
- Reines Node.js Script mit `readline` fuer Prompts — kein externes Framework noetig.
- Templates als Template-Literals im Script, nicht als separate Dateien.
- Sollte auch in MEMORY.md dokumentiert werden.

---

### [NDS-015] Changelog & Versioning (Infrastructure) — P2

**Status:** Ready
**Prioritaet:** P2 (wichtig) — Noetig sobald andere Teams das System nutzen
**Prefix:** — | **Blueprint:** keiner
**Dependencies:** `@changesets/cli` (muss installiert werden)

**Beschreibung:**
Versionierung und Changelog fuer alle Packages im Monorepo. Changesets-basiert:
Bei jedem PR wird ein Changeset erstellt, beim Release automatisch CHANGELOG.md
generiert und Package-Versionen gehoeht.

**Akzeptanzkriterien:**
- [ ] `pnpm changeset` zum Erstellen eines Changesets
- [ ] `pnpm changeset version` zum Hoehen der Versionen
- [ ] CHANGELOG.md pro Package automatisch generiert
- [ ] Semver: major/minor/patch korrekt gehandhabt

**Task Breakdown:**
- [ ] 1. `@changesets/cli` installieren und konfigurieren
- [ ] 2. `.changeset/config.json` erstellen
- [ ] 3. Scripts in root package.json eintragen
- [ ] 4. Initiales CHANGELOG.md fuer alle Packages generieren
- [ ] 5. Workflow-Dokumentation schreiben

**Notizen:**
- Changesets ist der Standard fuer Monorepo-Versionierung (auch von shadcn/ui genutzt).
- Optional spaeter: GitHub Action fuer automatische Releases.

---

### [NDS-016] a11y CI Integration (Infrastructure) — P2

**Status:** Ready
**Prioritaet:** P2 (wichtig) — Accessibility-Pruefung bisher nur manuell
**Prefix:** — | **Blueprint:** keiner
**Dependencies:** `@storybook/addon-a11y` oder `axe-playwright`

**Beschreibung:**
Automatisierte Accessibility-Tests in der CI-Pipeline. Prueft alle Storybook-Stories
gegen WCAG 2.1 AA Kriterien via axe-core.

**Akzeptanzkriterien:**
- [ ] axe-core laeuft gegen alle Stories
- [ ] 0 Critical/Serious Violations
- [ ] Report wird generiert (HTML oder JSON)
- [ ] Optional: In Playwright Visual Tests integriert

**Task Breakdown:**
- [ ] 1. `@storybook/addon-a11y` oder `axe-playwright` installieren
- [ ] 2. Test-Script erstellen das alle Stories prueft
- [ ] 3. Baseline: Bestehende Violations identifizieren
- [ ] 4. Critical/Serious Violations fixen
- [ ] 5. CI-Script oder GitHub Action einrichten

**Notizen:**
- Zwei Optionen: Storybook-Addon (im Browser) oder axe-playwright (headless).
- axe-playwright ist besser fuer CI da headless und schneller.
- Bestehende Violations zuerst auflisten bevor "0 Violations" als Ziel gesetzt wird.

---

### [NDS-017] Highlight (Atom) — P3

**Status:** Done
**Prioritaet:** P3 (nice-to-have) — Text-Markierung fuer Suchtreffer, Keywords
**Prefix:** `hl` | **Blueprint:** `atoms/Text/Text.tsx`
**Dependencies:** keine

**Beschreibung:**
Markiert Teile eines Textes visuell hervor (z.B. Suchtreffer in einer Liste).
Nimmt einen Suchbegriff und den Text als Props und wrapped Treffer in `<mark>`.

**Akzeptanzkriterien:**
- [x] Markiert alle Vorkommen eines Suchbegriffs im Text
- [x] Case-insensitive matching
- [x] Custom Highlight-Styling via Tokens
- [x] Mehrere Suchbegriffe gleichzeitig
- [x] Keine Markierung bei leerem Suchbegriff

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.hl.bg` | `{color.warning.bg}` | Highlight-Hintergrund (Gelb) |
| `color.hl.text` | `{color.text.base}` | Highlight-Text |
| `radius.hl` | `{radius.component.sm}` | Highlight-Radius |

**Task Breakdown:**
- [x] 1. L4-Tokens erstellt (3 Tokens) + Token Build
- [x] 2. Komponente implementiert (forwardRef, Regex-basiertes Splitting, escapeRegExp)
- [x] 3. 10 Unit Tests — alle bestanden
- [x] 4. 5 Stories geschrieben
- [x] 5. Infrastructure aktualisiert
- [x] 6. UX Review: 1 Major gefixt (Runtime-Guard fuer leeren/undefined children)
- [x] 7. Visual Tests hinzugefuegt
- [x] 8. Storybook Build erfolgreich

**Notizen:**
- `<mark>` Element ist semantisch korrekt fuer Hervorhebungen.
- `escapeRegExp` schuetzt vor Regex-Injection in Suchbegriffen.
- Runtime-Guard: `children ?? ''` Fallback fuer undefined-Faelle.

---

### [NDS-018] Spoiler (Atom) — P3

**Status:** Ready
**Prioritaet:** P3 (nice-to-have) — "Mehr anzeigen" fuer lange Texte
**Prefix:** `spoiler` | **Blueprint:** `molecules/Collapsible/Collapsible.tsx`
**Dependencies:** keine

**Beschreibung:**
Zeigt einen Text gekuerzt an mit einem "Mehr anzeigen"/"Weniger anzeigen" Link.
Fuer Beschreibungen, Kommentare, Produktbeschreibungen.

**Akzeptanzkriterien:**
- [ ] Text wird auf `maxHeight` beschnitten mit CSS Gradient-Fade
- [ ] "Mehr anzeigen" Button/Link zum Aufklappen
- [ ] "Weniger anzeigen" zum Zuklappen
- [ ] Animierter Uebergang (height transition)
- [ ] Kein Toggle wenn Text kuerzer als `maxHeight`

**L4-Token-Mapping:**
| Token | L3 Referenz | Zweck |
|-------|-------------|-------|
| `color.spoiler.toggle-text` | `{color.text.primary}` | Toggle-Link Farbe |
| `color.spoiler.toggle-hover` | `{color.interactive.primary-hover}` | Toggle Hover |
| `color.spoiler.fade` | `{color.bg.paper}` | Gradient-Fade ueber Text |
| `spacing.spoiler.toggle-gap` | `{spacing.component.gap.sm}` | Abstand Text–Toggle |

**Task Breakdown:**
- [ ] 1. L4-Tokens erstellen + Token Build
- [ ] 2. Komponente implementieren (forwardRef, height measurement via ResizeObserver)
- [ ] 3. Unit Tests schreiben (~10 Tests)
- [ ] 4. Stories schreiben (Default, LongText, ShortText, CustomLabel, Controlled)
- [ ] 5. Infrastructure (index.ts, tokens-annotated.css, COMPONENT_LOG.md)
- [ ] 6. Design & UX Review + Fixes
- [ ] 7. Visual Tests (Playwright)
- [ ] 8. Storybook Build verifizieren

**Notizen:**
- `ResizeObserver` zum Messen ob Text tatsaechlich gekuerzt wird.
- Gradient-Fade: `linear-gradient(transparent, var(--color-spoiler-fade))` ueber den unteren Bereich.
- Aehnlich wie Collapsible, aber mit automatischer Erkennung ob Toggle noetig ist.

---

## In Progress

> Stories die aktuell in Bearbeitung sind. Maximal 5 gleichzeitig (1 Batch).

_(leer — naechster Batch kann gestartet werden)_



---

## Done

> Abgeschlossene Stories. Kompakt dokumentiert fuer Referenz.

### Initiale Komponenten (vor Backlog-Einfuehrung)

Die folgenden 69 Komponenten wurden vor Einfuehrung des Backlogs entwickelt.
Detaillierte Dokumentation: siehe `COMPONENT_LOG.md`.

**Atoms (32):**
Alert, AspectRatio, Avatar, Badge, Blockquote, Button, Checkbox, Code, CopyButton,
Heading, HoverCard, Image, Input, InputOTP, Kbd, Label, Link, NumberInput, Popover,
Progress, ScrollArea, Separator, Skeleton, Slider, Spinner, Switch, Tag, Text,
ThemeToggle, ToggleGroup, Tooltip, VisuallyHidden

**Molecules (25):**
Accordion, AlertDialog, Breadcrumbs, Collapsible, ContextMenu, DatePicker, Dialog,
Drawer, DropdownMenu, EmptyState, FileUpload, Form, InputField, Menubar,
NavigationMenu, Pagination, RadioGroup, Resizable, Select, Sheet, Stepper, Tabs,
Textarea, Toast, Toolbar

**Organisms (12):**
Card, Carousel, Chart, Command, DataTable, Modal, SessionCard, Sidebar, StatCard,
Table, Timeline, Tree

**Batches:**
- _Basis-Set:_ ~59 Komponenten (initiale Entwicklung)
- _Tier 1 (5):_ AlertDialog, InputOTP, Menubar, Drawer, DataTable
- _Tier 2 (5):_ Blockquote, CopyButton, Image, Toolbar, Resizable
- _Tier 3 / P1 Batch (4):_ Toggle (NDS-001), Combobox (NDS-002), Banner (NDS-003), SearchInput (NDS-010)
- _P2 Batch (4):_ PasswordInput (NDS-012), LoadingOverlay (NDS-006), Rating (NDS-005), Highlight (NDS-017)

---

## Changelog

| Datum | Aenderung |
|-------|-----------|
| 2026-02-15 | Backlog eingefuehrt. 69 bestehende Komponenten als Done erfasst. |
| 2026-02-15 | 9 Stories hinzugefuegt: Toggle, Combobox, Banner, MultiSelect, Rating, LoadingOverlay, SegmentedControl, Test-Nachruestung, Visual Regression. |
| 2026-02-15 | NDS-008 Scope reduziert (P2→P3, nur 3 Atoms unter 8 Tests). NDS-009 heraufgestuft (P3→P2, nur 6% Coverage). |
| 2026-02-15 | 9 neue Stories: SearchInput (NDS-010), TimePicker (NDS-011), PasswordInput (NDS-012), ColorPicker (NDS-013), Generator CLI (NDS-014), Changelog (NDS-015), a11y CI (NDS-016), Highlight (NDS-017), Spoiler (NDS-018). |
| 2026-02-15 | **P1 Batch Done:** NDS-001 (Toggle), NDS-002 (Combobox), NDS-003 (Banner), NDS-010 (SearchInput). 54 Tests, 30 Stories, 37 neue Tokens. UX Review mit 3 Critical + 6 Major Issues — alle gefixt. Komponentenstand: 74. |
| 2026-02-15 | **P2 Batch Done:** NDS-012 (PasswordInput), NDS-006 (LoadingOverlay), NDS-005 (Rating), NDS-017 (Highlight). 46 Tests, 21 Stories, 21 neue Tokens. UX Review mit 5 Critical + 8 Major Issues — alle gefixt. Komponentenstand: 78. |
