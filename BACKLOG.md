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

## Definition of Ready — Figma Export (DoR-FE)

Eine Figma-Export-Story ist **Ready**, wenn alle folgenden Punkte erfuellt sind:

- [ ] Komponente ist in Storybook implementiert und hat Stories
- [ ] L4-Token-Datei vollstaendig: **Color, Spacing, Sizing, Radius, Typography inkl. line-height, border-width**
- [ ] ComponentConfig in `extract-component.ts` definiert (name, selector, variants, combinations)
- [ ] Extraction-Funktion geschrieben (oder generische `extractElementData` passend)
- [ ] `FIGMA_EXPORT_RULES.md` gelesen und verstanden

---

## Definition of Done — Figma Export (DoD-FE)

Eine Figma-Export-Story ist **Done**, wenn alle folgenden Punkte erfuellt sind:

- [ ] **Alle Kombinationen extrahiert** (count pruefen, 0 FAILED)
- [ ] **ALLE tokenBindings vorhanden** (gegen Button-Referenz pruefen: 12 Binding-Typen)
- [ ] **Pflicht-Bindings gecheckt:** paddingL/R/T/B, cornerRadius, strokeWeight, fontSize, lineHeight, letterSpacing, fontWeight, minHeight/width/height
- [ ] **SVG-Icons (falls vorhanden):** hex-Farben (kein rgb()), kein width/height (nur viewBox)
- [ ] **Color-Tokens:** L4-spezifisch (kein L1/L2/L3 Fallback)
- [ ] **Disabled-States:** `combo.styles.opacity` statt `_disabled` Hack
- [ ] **Plugin baut fehlerfrei:** `pnpm build:plugin`
- [ ] **Figma-Import getestet:** Component Set korrekt, Variables Panel vollstaendig

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

## Epic-Uebersicht

> 8 Epics strukturieren die gesamte Roadmap. Gitea-Labels: `epic/0` bis `epic/7`.
> Gitea-Issues: #26-#33 (Epic-Overviews), #34-#70 (Stories).

| Epic | Titel | Stories | Gitea |
|------|-------|---------|-------|
| **0** | Architektur-Bereinigung | NDS-019, NDS-020, NDS-026, NDS-030–NDS-033 | `epic/0-architecture` |
| **1** | Fehlende Kern-Komponenten | NDS-004, NDS-007, NDS-011, NDS-013, NDS-018, NDS-040–NDS-047 | `epic/1-components` |
| **2** | Templates & Page Layouts | NDS-050–NDS-057 | `epic/2-templates` |
| **3** | Patterns & Recipes | NDS-060–NDS-065 | `epic/3-patterns` |
| **4** | Figma Pipeline & Form Builder | NDS-070–NDS-074 | `epic/4-figma` |
| **5** | Testing & QA | NDS-008, NDS-009, NDS-016, NDS-080 | `epic/5-testing` |
| **6** | DX & Infrastruktur | NDS-014, NDS-015, NDS-090–NDS-092 | `epic/6-dx-infra` |
| **7** | Dokumentation & Onboarding | NDS-100–NDS-103 | `epic/7-docs` |

### Atomaritaets-Violations (Epic 0 Scope)

Folgende Komponenten sind falsch klassifiziert und muessen verschoben werden:

| Komponente | Aktuell | Korrekt | Grund |
|------------|---------|---------|-------|
| LoadingOverlay | atom | molecule | Importiert Spinner (Atom) |
| SearchInput | atom | molecule | Importiert Input + Icon (Atoms) |
| PasswordInput | atom | molecule | Importiert Input + Button (Atoms) |
| CheckboxField | atom | molecule | Importiert Checkbox + Label (Atoms) |
| SwitchField | atom | molecule | Importiert Switch + Label (Atoms) |
| ProgressField | atom | molecule | Importiert Progress + Label (Atoms) |

### Fehlende Layer (Epic 2 + 3)

| Layer | Beschreibung | Beispiele |
|-------|-------------|-----------|
| **Template** | Page-Level Layouts, definieren Slot-Positionen | PageShell, AuthLayout, DashboardLayout |
| **Pattern** | Wiederverwendbare Interaktionsmuster aus mehreren Komponenten | SearchFilter, DataTable, FormWizard |

---

## Backlog

> Stories die noch nicht begonnen wurden, gegliedert nach Epics.

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

**Status:** Done
**Prioritaet:** P1 (kritisch) — Spart bei jeder neuen Komponente 15-20 Min Setup
**Prefix:** — | **Blueprint:** keiner
**Dependencies:** keine neuen (Node.js Scripts)

**Beschreibung:**
CLI-Tool zum Scaffolding neuer Komponenten. Generiert alle Dateien des 7-Schritt-Workflows
aus Templates: Token-JSON, TSX, Test, Stories, Index.

**Akzeptanzkriterien:**
- [x] `pnpm generate:component` interaktiv (Name, Level, Prefix)
- [x] Generiert: Token-JSON, Component.tsx, Component.test.tsx, Component.stories.tsx, index.ts
- [x] Templates folgen allen Projektkonventionen (forwardRef, displayName, cn/cva, var(--*))
- [x] Test-Template mit Standard-Tests (Rendering, ref, className, displayName, Token-Klassen)

**Task Breakdown:**
- [x] 1. Script `scripts/generate-component.mjs` erstellen
- [x] 2. Templates fuer alle 5 Dateitypen definieren
- [x] 3. `pnpm generate:component` Script in root package.json eintragen
- [x] 4. Testen: Dummy-Komponente generieren, pruefen, loeschen
- [ ] 5. README-Abschnitt zum Generator schreiben (uebersprungen — kein separates README noetig)

**Notizen:**
- Reines Node.js Script mit `readline` fuer Prompts + CLI-Argumente (`--name=X --level=Y`).
- Templates als Template-Literals im Script, nicht als separate Dateien.
- Unterstuetzt 9 HTML-Elemente: div, span, button, section, nav, aside, article, ul, ol.
- Validierung: PascalCase (Name), kebab-case (Prefix), Level, Element-Typ, Duplikat-Erkennung.

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

### [NDS-019] Token-Refactoring: Hardcoded Werte durch Tokens ersetzen (Infrastructure) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Hardcoded Tailwind-Utilities statt Tokens in ~70 Komponenten
**Prefix:** — | **Blueprint:** `atoms/Button/Button.tsx` (Referenz-Implementierung)
**Dependencies:** keine

**Beschreibung:**
Audit (2026-02-16) hat massive Nutzung von hardcoded Tailwind-Utilities anstelle von
Design-Tokens in fast allen Komponenten aufgedeckt. Das widerspricht dem Token-First-Prinzip
des Design Systems. Alle hardcoded Werte muessen durch `var(--*)` CSS Custom Properties
ersetzt werden. Button.tsx wurde bereits als Referenz refactored (border-width).

**Audit-Ergebnis (2026-02-16):**
| Kategorie | Hardcoded Pattern | Betroffene Dateien |
|-----------|-------------------|--------------------|
| Font Weight | `font-medium`, `font-bold`, `font-semibold` | ~50 |
| Font Size | `text-xs`, `text-sm`, `text-base`, `text-lg` | ~59 |
| Border Radius | `rounded-md`, `rounded-lg`, `rounded-full`, `rounded-sm` | ~12 |
| Border Width | `border` (1px hardcoded) | ~13 |
| Padding | `px-*`, `py-*`, `p-*` | ~66 |
| Gap | `gap-*` | ~36 |
| Ring Width | `ring-*` | ~42 |

**Akzeptanzkriterien:**
- [ ] Alle `font-medium`/`font-bold`/`font-semibold` → `[font-weight:var(--font-*)]`
- [ ] Alle `text-xs`/`text-sm`/`text-base`/`text-lg` → `text-[length:var(--font-*)]` oder `[font-size:var(--*)]`
- [ ] Alle `rounded-*` → `[border-radius:var(--radius-*)]`
- [ ] Alle `border` (1px) → `[border-width:var(--sizing-*-border-width)]`
- [ ] Alle `px-*`/`py-*`/`p-*` → `[padding:var(--sizing-*-padding-*)]` oder `[padding-left:var(...)]`
- [ ] Alle `gap-*` → `[gap:var(--sizing-*-gap)]`
- [ ] Alle `ring-*` → `[--tw-ring-offset-width:var(--*)]` oder Equivalent
- [ ] L4-Token-Dateien fuer jede Komponente um fehlende Tokens ergaenzt
- [ ] Token Build erfolgreich nach jeder Batch-Aenderung
- [ ] Alle Unit Tests bestehen weiterhin
- [ ] Storybook Build erfolgreich (0 Fehler)
- [ ] Kein visueller Unterschied (Visual Regression Tests)

**Referenz-Pattern (Button.tsx):**
- Vorher: `border border-[var(--color-btn-primary-border)]`
- Nachher: `[border-width:var(--sizing-btn-border-width)] border-[var(--color-btn-primary-border)]`
- Token-Kette: L1 `spacing.base.px` → L2 `sizing.border-width.default` → L3 `sizing.component.border-width.default` → L4 `sizing.btn.border-width`

**Task Breakdown (in Batches zu je ~15 Komponenten):**
- [ ] 1. **Batch 1 — Atoms A-I** (~15): Alert, AspectRatio, Avatar, Badge, Blockquote, Button(done), Checkbox, Code, CopyButton, Heading, HoverCard, Image, Input, InputOTP
- [ ] 2. **Batch 2 — Atoms K-Z** (~18): Kbd, Label, Link, NumberInput, Popover, Progress, ScrollArea, Separator, Skeleton, Slider, Spinner, Switch, Tag, Text, ThemeToggle, Toggle, ToggleGroup, Tooltip, VisuallyHidden
- [ ] 3. **Batch 3 — Molecules A-F** (~12): Accordion, AlertDialog, Banner, Breadcrumbs, Collapsible, Combobox, ContextMenu, DatePicker, Dialog, Drawer, DropdownMenu, EmptyState
- [ ] 4. **Batch 4 — Molecules F-T** (~13): FileUpload, Form, InputField, Menubar, NavigationMenu, Pagination, PasswordInput, RadioGroup, Resizable, SearchInput, Select, Sheet, Stepper
- [ ] 5. **Batch 5 — Molecules + Organisms** (~20): Tabs, Textarea, Toast, Toolbar, Card, Carousel, Chart, Command, DataTable, LoadingOverlay, Modal, Rating, SessionCard, Sidebar, StatCard, Table, Timeline, Tree, Highlight
- [ ] 6. **Verifikation:** Alle Unit Tests laufen, Storybook Build, Visual Regression Baseline-Vergleich
- [ ] 7. **Doku:** COMPONENT_LOG.md und tokens-annotated.css aktualisieren

**Notizen:**
- GROSS-Scope Story. Kann ueber mehrere Sessions verteilt werden.
- Pro Komponente: (a) fehlende L4-Tokens in semantic/*.json ergaenzen, (b) Component TSX refactoren, (c) Token Build, (d) Tests laufen lassen.
- Tailwind v3 Gotchas beachten: `text-[length:var(...)]` statt `text-[var(...)]`, `[border-width:var(...)]` statt `border-[var(...)]` fuer Breiten.
- Underscore-Konvention: Keine Underscores nach `--` in Tailwind Arbitrary Values (→ Space-Konvertierung).
- `ring-*` ist komplex: Tailwind ring nutzt `--tw-ring-offset-width` intern. Moeglicherweise eigenes Utility-Pattern noetig.
- Referenz: Button.tsx ist das Muster fuer alle anderen Komponenten.
- **Batch 1 Done (2026-02-19):** Phase 0 (5 neue L3-Tokens: font-weight x4, font-size xs x1, plus 2 heading-size L3-Tokens). 9 Atoms refactored (Alert, Badge, Blockquote, Code, Checkbox, Heading, Label, Kbd, Tag), 1 skipped (Link — nichts im Scope). 7 L4-Token-Dateien aktualisiert/erstellt, 8 TSX-Dateien, 5 Test-Dateien (16 Assertions). 1466/1466 Tests, Storybook Build OK.

---

### [NDS-020] Icon-Migration: Alle Komponenten auf Icon-Atom umstellen (Infrastructure) — P2

**Status:** Done
**Prioritaet:** P2 (wichtig) — Konsistentes Icon-API, Voraussetzung fuer Figma-Import
**Prefix:** — | **Blueprint:** `atoms/Icon/Icon.tsx`
**Dependencies:** Icon-Atom (bereits erstellt)

**Beschreibung:**
51+ Dateien im Design System verwenden lucide-react Icons direkt (z.B. `<Info size={20} />`).
Diese muessen auf das neue Icon-Atom umgestellt werden (`<Icon icon={Info} size="md" />`),
damit token-basierte Groessen und einheitliche Accessibility-Defaults greifen.
Dies ist auch Voraussetzung fuer korrekte Figma-Komponentenstruktur (Icon-Instanzen).

**Akzeptanzkriterien:**
- [x] Alle Komponenten nutzen `<Icon>` statt direkter lucide-react Aufrufe
- [x] Sizing nutzt benannte Groessen (sm/md/lg/xl) statt Pixel-Werte
- [x] Accessibility-Defaults (aria-hidden fuer dekorative Icons) konsistent
- [x] Alle Unit Tests bestehen weiterhin (1466/1466)
- [x] Storybook Build erfolgreich (0 Fehler)

**Betroffene Komponenten (Auswahl):**
- Alert (Info, CheckCircle, AlertTriangle, XCircle, X)
- Banner (Info, CheckCircle, AlertTriangle, XCircle, X)
- CopyButton (Copy, Check)
- SearchInput (Search, X)
- PasswordInput (Eye, EyeOff)
- Combobox (Search, Check, ChevronDown)
- DatePicker, FileUpload, Pagination, NavigationMenu, etc.

**Task Breakdown:**
- [x] 1. Batch 1 — Atoms (8): Alert, Banner, CopyButton, Code, Tag, ThemeToggle, SearchInput, Link
- [x] 2. Batch 2 — Restliche Atoms (4): PasswordInput, NumberInput, Image, Input
- [x] 3. Batch 3 — Molecules (18): Accordion, Dialog, Sheet, Stepper, NavigationMenu, Combobox, DatePicker, Calendar, Toast, Pagination, FileUpload, Menubar, Resizable, Select, MultiSelect
- [x] 4. Batch 4 — Organisms (7): StatCard, Sidebar, Carousel, Tree, Command, Modal, DataTable
- [x] 5. Batch 5 — Stories (12): Toggle, Toolbar, StatCard, Tree, Timeline, Sidebar, Stepper, NavigationMenu, ContextMenu, Breadcrumbs, EmptyState, DropdownMenu
- [x] 6. Alle Unit Tests laufen lassen — 1466/1466 passed
- [x] 7. Storybook Build verifizieren — 0 Errors

**Notizen:**
- Icon-Atom ist fertig: 16 Tests, 6 Stories, token-basierte Groessen.
- Groessen-Mapping: `size={20}` → `size="md"` (20px), `size={16}` → `size="sm"` (16px), `size={24}` → `size="lg"` (24px).
- Nur `size`-Prop und `icon`-Prop aendern, Farben bleiben via className.
- Erlaubte Ausnahmen (keine Migration): Checkbox (interne Check/Minus-Indikatoren), Rating (dynamisches fill/stroke fuer halbe Sterne), Menubar Circle (8px Radio-Indikator).
- 48 Komponenten-/Story-Dateien migriert. Naming-Konflikte in Toast.tsx (IconAtom), FileUpload.tsx (IconAtom), ThemeToggle.tsx (ThemeIcon) geloest.

---

### [NDS-021] Figma Icon Component Set + Alert-Instanzen (Figma Plugin) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Figma-Komponentenhierarchie muss DS-Struktur widerspiegeln
**Prefix:** — | **Blueprint:** Figma Plugin Extractor + Plugin
**Dependencies:** Icon-Atom (erstellt), Alert-Extraction (funktioniert)

**Beschreibung:**
Die Icon-Komponente soll als eigenstaendiges Figma Component Set importiert werden,
damit Alert (und spaeter alle Komponenten) Icon-Instanzen statt eingebetteter SVGs nutzen.
Dies ist kritisch fuer MCP-basierte Design-to-Code Workflows, bei denen ein LLM die
Komponentenstruktur aus dem Figma-Design lesen und korrekt als React-Code generieren muss.

**Akzeptanzkriterien:**
- [x] Icon Component Set in Figma mit Varianten pro Icon-Name × Groesse (72 Kombinationen)
- [x] SVG-Vektoren als echte Figma-Vektoren (nicht Placeholder)
- [x] Groessen gebunden an L4-Tokens --sizing-icon-{sm|md|lg|xl} Variables
- [x] Alert nutzt Icon-Instanzen statt eingebetteter SVGs (via iconRef)
- [x] Close-Button in Alert nutzt Icon-Instanz (X, size=sm)
- [ ] Light/Dark Mode: Farben aendern sich korrekt bei Mode-Wechsel (muss in Figma getestet werden)

**Task Breakdown:**
- [x] 1. Icon Extraction: Config + Funktion fuer Icon-Extraktion aus Storybook Gallery
- [x] 2. Alert Extraction: `iconRef` statt `svgData` in ChildNode
- [x] 3. Figma Plugin: Icon ComponentSet erstellen + Alert nutzt Instanzen

**Notizen:**
- Icon Gallery Story hat 18 Icons: Info, CheckCircle, AlertTriangle, XCircle, X, Search, Star, Copy, Check, Eye, EyeOff, Sun, Moon, ChevronLeft, ChevronRight, UploadCloud, File, Heart.
- Groessen: sm=16px, md=20px, lg=24px, xl=32px (aus --sizing-icon-* Tokens).
- Alert Icons: Info (info), CheckCircle (success), AlertTriangle (warning), XCircle (error) bei size=md, X (close) bei size=sm.
- Stroke-Farbe im Icon-Component: --color-text-base als Default, wird per Instance-Override in Alert ueberschrieben.

---

### [NDS-022] Badge Figma Export Fix (Figma Plugin) — P3

**Status:** Done
**Prioritaet:** P3 (nice-to-have) — Fehlendes lineHeight Binding
**Prefix:** `badge` | **DoR/DoD:** DoR-FE / DoD-FE
**Dependencies:** Badge-Atom (vorhanden), Figma Plugin (vorhanden)

**Beschreibung:**
Badge-Export hatte 10/12 Bindings — lineHeight fehlte. L4-Tokens fuer line-height
pro Size-Variante erstellt und Extraction verifiziert.

**Task Breakdown:**
- [x] 1. L4-Tokens: `sizing.badge.{sm|md|lg}.line-height` → `{font.component.line-height.sm|md}` erstellt
- [x] 2. Token Build + Verifikation in tokens.css
- [x] 3. Re-Extraction: 15/15 OK, 11 Bindings (paddingL/R/T/B, itemSpacing, cornerRadius, strokeWeight, fontSize, lineHeight, letterSpacing, fontWeight)

---

### [NDS-023] Input Figma Export Fix (Figma Plugin) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — 3 Bindings fehlten (lineHeight, letterSpacing, strokeWeight)
**Prefix:** `input` | **DoR/DoD:** DoR-FE / DoD-FE
**Dependencies:** Input-Atom (vorhanden), Figma Plugin (vorhanden)

**Beschreibung:**
Input-Export hatte 6/9 Bindings. Fehlende L4-Tokens (border-width, line-height per Size)
erstellt und Extractor um lineHeight + letterSpacing Binding-Logik erweitert.

**Task Breakdown:**
- [x] 1. L4-Tokens: `sizing.input.border-width` (1px) + `sizing.input.{sm|md|lg}.line-height` erstellt
- [x] 2. Extractor: lineHeight via `findL4Token()` + letterSpacing (0 → `--font-base-letter-spacing-normal`) hinzugefuegt
- [x] 3. Token Build + Verifikation
- [x] 4. Re-Extraction: 12/12 OK, 9 Bindings (minHeight, paddingL/R, cornerRadius, strokeWeight, fontSize, fontWeight, lineHeight, letterSpacing)

---

### [NDS-024] Checkbox Figma Export Fix (Figma Plugin) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — SVG-Import brach ab, border-width fehlte
**Prefix:** `checkbox` | **DoR/DoD:** DoR-FE / DoD-FE
**Dependencies:** Checkbox-Atom (vorhanden), Figma Plugin (vorhanden)

**Beschreibung:**
Checkbox-Export war komplett kaputt: SVG stroke-Farbe als rgb() (Figma kann kein rgb()),
SVG width/height konfligierten mit viewBox, border-width Token fehlte.
Alle drei Issues gefixt.

**Task Breakdown:**
- [x] 1. L4-Token: `sizing.checkbox.border-width` (2px, thick) erstellt
- [x] 2. Extractor: rgb()→hex Konvertierung inline (kein `function` in page.evaluate — esbuild __name Bug)
- [x] 3. Extractor: `clone.removeAttribute('width'); clone.removeAttribute('height')` hinzugefuegt
- [x] 4. Token Build + Verifikation
- [x] 5. Re-Extraction: 6/6 OK, 4 Bindings (width, height, cornerRadius, strokeWeight), SVG hex + viewBox-only
- [x] 6. Hover-Varianten: `interaction: 'default' | 'hover'` Achse, 9 Kombinationen (3 states × 2 disabled + 3 hover)
- [x] 7. Corner Radius Fix: `clipsContent=true` fuer SVG-Varianten, Token Description korrigiert (4px→2px)
- [x] 8. Plugin: fontSize-Guard (`combo.text.fontSize > 0 && combo.text.content`)

**Learnings:**
- `function` oder Arrow-Funktionen mit `.map()` in `page.evaluate()` → esbuild fuegt `__name` ein → `ReferenceError` im Browser
- Inline Logik statt Funktions-Deklaration innerhalb von `page.evaluate()`
- SVG-Nodes fuellen das Component-Frame: ohne `clipsContent` ueberdecken sie die Eckenrundung
- Hover-Varianten ableiten analog `deriveStateVariant()`: Disabled hat KEIN Hover

---

### [NDS-025] CheckboxField Figma Export Fix (Figma Plugin) — P1

**Status:** Done
**Prioritaet:** P1 (kritisch) — Gap-Bindings, lineHeight, _disabled Hack
**Prefix:** `checkbox` | **DoR/DoD:** DoR-FE / DoD-FE
**Dependencies:** CheckboxField (vorhanden), Checkbox-Export (NDS-024)

**Beschreibung:**
CheckboxField-Export hatte keine Container/Content-Gap Bindings, keine lineHeight
Bindings fuer Label/Description, und nutzte einen `_disabled` Hack der in Figma
keinen Effekt hat. Neue L4-Tokens fuer spacing und lineHeight erstellt,
Extractor erweitert, `_disabled` Hack durch `opacity: 0.5` ersetzt.

**Task Breakdown:**
- [x] 1. L3-Tokens: `spacing.component.gap.2xs` (2px) + `font.component.line-height.xs` (18px) erstellt
- [x] 2. L2-Token: `spacing.3xs` (2px) erstellt
- [x] 3. L4-Tokens: `spacing.checkbox.field-gap` (8px), `spacing.checkbox.content-gap` (2px), `font.checkbox.label-line-height`, `font.checkbox.desc-line-height` erstellt
- [x] 4. Extractor: Container tokenBindings mit field-gap, Content frame tokenBindings mit content-gap
- [x] 5. Extractor: Label/Description tokenBindings um lineHeight erweitert
- [x] 6. Extractor: `_disabled` Hack → `contentFrame.styles.opacity = 0.5` ersetzt
- [x] 7. Token Build + Verifikation (12 neue CSS Custom Properties)
- [x] 8. Re-Extraction: 12/12 OK, Container: 1 Binding (itemSpacing), Content: 1 (itemSpacing), Label: 3 (fontSize, fontWeight, lineHeight), Desc: 3 (fontSize, fontWeight, lineHeight)
- [x] 9. TextStyle-Fix: `hasChildren` vor `hasTextContent` pruefen (Label + Description TextStyles werden jetzt korrekt erstellt)

---

### [NDS-026] Hardcoded gap-* durch Token-basierte Gaps ersetzen (Infrastructure) — P2

**Status:** Backlog
**Prioritaet:** P2 (wichtig) — ~15 Komponenten verletzen Token-First-Prinzip bei Gap
**Prefix:** — | **Blueprint:** `molecules/Toast/Toast.tsx` (korrekte Referenz)
**Dependencies:** keine
**Gitea:** #71

**Beschreibung:**
~15 Komponenten verwenden hardcoded Tailwind `gap-*` Utilities statt `gap-[var(--*)]` Token-Referenzen. Einige Dateien haben sogar gemischte Nutzung (manche Gaps mit Token, andere hardcoded). Fehlende L4-Tokens muessen ergaenzt und alle `gap-*` durch Token ersetzt werden.

**Betroffene Komponenten:**
InputField, Form, Textarea, FileUpload, AlertDialog, Dialog, Sheet, Drawer, RadioGroup, Toast (Viewport), Menubar, Pagination, Stepper, NavigationMenu, Toolbar

**Akzeptanzkriterien:**
- [ ] Alle `gap-*` in Komponenten-TSX durch `gap-[var(--*)]` ersetzt
- [ ] Fehlende L4-Tokens in `packages/tokens/src/semantic/*.json` ergaenzt
- [ ] Token Build erfolgreich
- [ ] Alle Unit Tests bestehen
- [ ] Storybook Build erfolgreich (0 Fehler)

**Task Breakdown:**
- [ ] 1. Fehlende L4-Tokens fuer jede Komponente erstellen + Token Build
- [ ] 2. Batch 1 — Field-Wrapper: InputField, Form, Textarea, FileUpload
- [ ] 3. Batch 2 — Dialoge: AlertDialog, Dialog, Sheet, Drawer
- [ ] 4. Batch 3 — Restliche: RadioGroup, Toast, Menubar, Pagination, Stepper, NavigationMenu, Toolbar
- [ ] 5. Verifikation: Unit Tests + Storybook Build

**Notizen:**
- Sub-Story von NDS-019 / NDS-032 (fokussiert nur auf Gap).
- Figma-Export-JSONs fuer Field-Komponenten bereits korrigiert (`tokenBindings: { "itemSpacing": "--sizing-component-gap-sm" }`).
- Viele Komponenten haben bereits teilweise Token-Gaps — nur Sub-Elemente (Header, Footer) fehlen.

---

### Epic 0 — Architektur-Bereinigung (neue Stories)

#### [NDS-030] Atomaritaets-Refactoring — Atoms zu Molecules verschieben (#34)

**Status:** Backlog | **Size:** M | **Epic:** 0
LoadingOverlay, SearchInput, PasswordInput von `atoms/` nach `molecules/` verschieben.
Alle Imports, Barrel-Exports, Tests und Stories anpassen.

#### [NDS-031] Field-Komponenten als Molecules klassifizieren (#35)

**Status:** Backlog | **Size:** M | **Epic:** 0
CheckboxField, SwitchField, ProgressField von `atoms/` nach `molecules/` verschieben.

#### [NDS-032] Token-Audit — hardcoded Werte durch Tokens ersetzen (#36)

**Status:** Backlog | **Size:** L | **Epic:** 0
Ergaenzt NDS-019. Alle verbleibenden hardcoded Farben/Abstande/Schriftgroessen durch `var(--*)` ersetzen.

#### [NDS-033] L3 Token-Konsolidierung — Doppelstrukturen bereinigen (#73)

**Status:** Done | **Size:** L | **Epic:** 0
Phase 1 (Color-Konsolidierung) abgeschlossen: (1) 4 Status-Gruppen entfernt, 12 neue bg-Varianten (subtle/default/solid), border.warning + border.info ergaenzt. (4) secondary→neutral konsolidiert. (5) Border-Symmetrie hergestellt. 16 L4-Dateien migriert (~86 Referenzen). 5 Komponenten-Dateien mit direkten L3-Refs gefixt. 16 vorbestehende Test-Mismatches behoben. 1466/1466 Tests bestanden, Storybook Build erfolgreich.
**Offen (separate Story):** Probleme 2+3 (Spacing/Sizing-Konsolidierung) → eigene Story erforderlich.

---

### Epic 1 — Fehlende Kern-Komponenten (neue Stories)

#### [NDS-040] Accordion (Atom) (#37)

**Status:** Backlog | **Size:** M | **Epic:** 1
Aufklappbare Inhaltsabschnitte. Single-/Multi-Expand, Keyboard-Navigation, ARIA.

#### [NDS-041] Tabs (Molecule) (#38)

**Status:** Backlog | **Size:** M | **Epic:** 1
Tab-Panels. Horizontal/Vertical, Keyboard-Navigation, Varianten: line/enclosed/soft-rounded.

#### [NDS-042] Stepper/Wizard (Molecule) (#39)

**Status:** Backlog | **Size:** M | **Epic:** 1
Mehrstufige Prozesse. States: completed/active/upcoming/error, Connector-Linien.

#### [NDS-043] Toast/Snackbar (Atom) (#40)

**Status:** Backlog | **Size:** L | **Epic:** 1
Temporaere Benachrichtigungen. Auto-dismiss, Stacking, `useToast()` Hook.

#### [NDS-044] Popover (Atom) (#41)

**Status:** Backlog | **Size:** M | **Epic:** 1
Kontextuelle schwebende Panels. Click/Hover Trigger, Focus-Trap, Placement.

#### [NDS-045] Drawer/Sheet (Molecule) (#42)

**Status:** Backlog | **Size:** M | **Epic:** 1
Seitliche Panels. Positionen: left/right/top/bottom, Groessen: sm/md/lg/full.

#### [NDS-046] DropdownMenu (Molecule) (#43)

**Status:** Backlog | **Size:** M | **Epic:** 1
Kontextuelle Aktionsmenues. Sub-Menus, Icons, Shortcuts, Keyboard-Navigation.

#### [NDS-047] Radio Atom extrahieren (#72)

**Status:** Backlog | **Size:** M | **Epic:** 1
Eigenstaendiges `Radio` Atom (`atoms/Radio/`) analog zu Checkbox und Switch. Basiert auf nativem `<input type="radio">` statt Radix-Context, damit standalone-faehig. RadioGroup wird refactored um Radio-Atoms zu compositen. Figma-Komponente fuer Radio einzeln. Breaking Change: `RadioGroupItem` → `Radio`.

---

### Epic 2 — Templates & Page Layouts

#### [NDS-050] PageShell Template (#44)

**Status:** Backlog | **Size:** L | **Epic:** 2
Header + Sidebar + Content + Footer. Responsive, Sticky Header, konfigurierbare Sidebar-Breite.

#### [NDS-051] AuthLayout Template (#45)

**Status:** Backlog | **Size:** M | **Epic:** 2
Zentriertes Login/Register. Logo-Slot, Form-Bereich, Footer-Links.

#### [NDS-052] DashboardLayout Template (#46)

**Status:** Backlog | **Size:** L | **Epic:** 2
Sidebar-Navigation + Content. Collapsible Sidebar, Active-State, Breadcrumb.

#### [NDS-053] FormPage Template (#47)

**Status:** Backlog | **Size:** M | **Epic:** 2
Formular-Seite mit Titel, Stepper, Action-Bar. Sticky Actions, Unsaved-Changes-Warning.

#### [NDS-054] DetailPage Template (#48)

**Status:** Backlog | **Size:** M | **Epic:** 2
Header + Content + Sidebar. Badges, Action-Buttons, Breadcrumb.

#### [NDS-055] ListPage Template (#49)

**Status:** Backlog | **Size:** M | **Epic:** 2
Filter + Tabelle + Pagination. Empty-State, Bulk-Actions.

#### [NDS-056] ErrorPage Template (#50)

**Status:** Backlog | **Size:** S | **Epic:** 2
404, 500, Maintenance. Illustration + Fehlercode + CTA.

#### [NDS-057] EmptyState Template (#51)

**Status:** Backlog | **Size:** S | **Epic:** 2
Illustration + Text + CTA. Varianten: no-data, no-results, error, first-use.

---

### Epic 3 — Patterns & Recipes

#### [NDS-060] SearchFilter Pattern (#52)

**Status:** Backlog | **Size:** M | **Epic:** 3
SearchInput + Filter-Chips + Reset. Active-Filter-Count Badge.

#### [NDS-061] DataTable Pattern (#53)

**Status:** Backlog | **Size:** L | **Epic:** 3
Table + Sort + Pagination + BulkActions. Loading-State, Empty-State.

#### [NDS-062] FormWizard Pattern (#54)

**Status:** Backlog | **Size:** L | **Epic:** 3
Stepper + Forms + Validation + Submit. Step-Validierung, Summary-Step.

#### [NDS-063] ConfirmDialog Pattern (#55)

**Status:** Backlog | **Size:** S | **Epic:** 3
Modal + Warnung + Actions. `useConfirm()` Hook, Varianten: warning/danger/info.

#### [NDS-064] FileUploadZone Pattern (#56)

**Status:** Backlog | **Size:** M | **Epic:** 3
Drag&Drop + Preview + Progress. Datei-Validierung, Remove/Delete.

#### [NDS-065] NotificationCenter Pattern (#57)

**Status:** Backlog | **Size:** L | **Epic:** 3
Toast-Stack + History. Read/Unread States, Badge Counter.

---

### Epic 4 — Figma Pipeline & Form Builder

#### [NDS-070] Figma Export — alle neuen Komponenten (#58)

**Status:** Backlog | **Size:** L | **Epic:** 4
Alle neuen Komponenten als JSON-Exports fuer Figma DS Import Plugin.

#### [NDS-071] Form Builder — RadioGroup/FileUpload/Slider (#59)

**Status:** Backlog | **Size:** M | **Epic:** 4
Fehlende Feldtypen im Form Builder ergaenzen.

#### [NDS-072] Form Builder — Conditional Fields (#60)

**Status:** Backlog | **Size:** M | **Epic:** 4
Show/Hide-Logik fuer bedingte Felder.

#### [NDS-073] Form Builder — Multi-Step Forms (#61)

**Status:** Backlog | **Size:** L | **Epic:** 4
Wizard-Flows mit Stepper, Step-Frames, Weiter/Zurueck.

#### [NDS-074] Figma Plugin — Auto-Update bei Token-Aenderungen (#62)

**Status:** Backlog | **Size:** XL | **Epic:** 4
Token-Diff-Erkennung, Batch-Update, Preview, Rollback.

---

### Epic 5 — Testing & QA

#### [NDS-080] Visual Regression Tests fuer alle Komponenten (#63)

**Status:** Backlog | **Size:** XL | **Epic:** 5
Playwright-Tests fuer alle Stories inkl. Dark-Mode. CI-Integration.

---

### Epic 6 — DX & Infrastruktur

#### [NDS-090] Monorepo Build-Optimierung (#64)

**Status:** Backlog | **Size:** L | **Epic:** 6
Turborepo/Nx evaluieren, Caching, inkrementelle Builds.

#### [NDS-091] Changeset-basiertes Versioning (#65)

**Status:** Backlog | **Size:** M | **Epic:** 6
@changesets/cli, automatische CHANGELOG.md, Semver.

#### [NDS-092] CI/CD Pipeline (#66)

**Status:** Backlog | **Size:** L | **Epic:** 6
Gitea Actions: Lint + Test + Build + Publish. Storybook PR-Preview.

---

### Epic 7 — Dokumentation & Onboarding

#### [NDS-100] Storybook Docs — Usage Guidelines (#67)

**Status:** Backlog | **Size:** XL | **Epic:** 7
MDX-Docs pro Komponente: Wann verwenden, Do/Don't, Code-Beispiele, a11y-Hinweise.

#### [NDS-101] Contribution Guide (#68)

**Status:** Backlog | **Size:** M | **Epic:** 7
CONTRIBUTING.md: Setup, 7-Schritt-Workflow, Code-Style, PR-Prozess.

#### [NDS-102] Token-Dokumentation (#69)

**Status:** Backlog | **Size:** M | **Epic:** 7
4-Layer-Architektur, Naming-Konventionen, Mapping-Tabelle, Dark-Mode-Strategie.

#### [NDS-103] Migration Guide v0 → v1 (#70)

**Status:** Backlog | **Size:** M | **Epic:** 7
Breaking Changes, Schritt-fuer-Schritt-Anleitung, Codemods.

---

## In Progress

> Stories die aktuell in Bearbeitung sind. Maximal 5 gleichzeitig (1 Batch).

### [NDS-021] Figma Icon Component Set + Alert-Instanzen — Done



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
| 2026-02-16 | **NDS-019 erstellt:** Token-Refactoring fuer ~70 Komponenten. Audit: ~50 font-weight, ~59 font-size, ~66 padding, ~36 gap, ~42 ring, ~13 border, ~12 radius hardcoded. Button.tsx als Referenz refactored (border-width Token durch alle 4 Layer). Figma-Plugin Extractor + Plugin aktualisiert (strokeWeight, letterSpacing, fontWeight, Text Styles). |
| 2026-02-16 | **Icon-Atom erstellt:** Icon.tsx Komponente (#79) mit token-basierten Groessen (sm/md/lg/xl), forwardRef, Accessibility-Defaults. 16 Tests, 6 Stories. L4-Tokens in icon.json. Figma Plugin: SVG-Vektor-Import fuer Alert-Icons. |
| 2026-02-16 | **NDS-020 erstellt:** Icon-Migration fuer 51+ Dateien (P2). **NDS-021 erstellt + gestartet:** Figma Icon Component Set + Alert-Instanzen (P1) — Komponentenhierarchie muss DS-Struktur widerspiegeln fuer MCP-Workflows. |
| 2026-02-16 | **Figma Export DoR/DoD eingefuehrt.** Neuer Story-Typ fuer Figma-Export-Aufgaben mit spezialisierter Checkliste (Token-Vollstaendigkeit, Binding-Verifikation gegen Button-Referenz, SVG-Regeln). |
| 2026-02-16 | **Figma Export Batch Done:** NDS-022 (Badge lineHeight), NDS-023 (Input border-width + lineHeight + letterSpacing), NDS-024 (Checkbox SVG hex + width/height + border-width), NDS-025 (CheckboxField gaps + lineHeights + disabled fix). 12 neue L4-Tokens, 3 neue L3/L2-Tokens, 6 Extractor-Fixes. FIGMA_EXPORT_RULES.md um 4 neue Regeln + 7 Anti-Patterns erweitert. |
| 2026-02-16 | **Figma Post-Import Fixes:** (1) CheckboxField TextStyles: `hasChildren` vor `hasTextContent` Bedingung gefixt → Label/Description TextStyles werden jetzt erstellt. (2) Checkbox: Hover-Varianten (`interaction: default\|hover`) hinzugefuegt → 9 Kombinationen statt 6. Corner Radius: `clipsContent=true` fuer SVG-Varianten. (3) Variable-Hierarchie: `classifyTokenLevel()` in extract-tokens.ts, Level-Prefix (L1 Base/L2 Global/L3 Role/L4 Component) auf allen Figma-Variablen. Reverse-Lookup in code.ts angepasst. FIGMA_EXPORT_RULES.md um 4 neue Regeln + 4 Anti-Patterns erweitert. |
| 2026-02-18 | **NDS-026 erstellt:** Hardcoded gap-* durch Token-basierte Gaps ersetzen (#71). ~15 Komponenten betroffen. Figma-Export-JSONs fuer Field-Komponenten bereits korrigiert (tokenBindings fuer itemSpacing). |
| 2026-02-17 | **Epic-Struktur eingefuehrt:** 8 Epics (0-7) mit 37 neuen Stories (NDS-030 bis NDS-103). Neue Layer: Templates (Epic 2, 8 Stories) und Patterns (Epic 3, 6 Stories). Atomaritaets-Audit: 6 Violations identifiziert (NDS-030, NDS-031). Gitea: 15 neue Labels (epic/*, layer/template, layer/pattern, size/*), 8 Epic-Overview-Issues (#26-#33), 37 Story-Issues (#34-#70), alle bestehenden Issues mit Epic-Labels getaggt. |
| 2026-02-19 | **NDS-047 erstellt:** Radio Atom extrahieren (Epic 1). Gitea #72. |
| 2026-02-19 | **NDS-033 erstellt:** L3 Token-Konsolidierung (Epic 0). Audit aller L3-Tokens: 5 Probleme gefunden — Semantic Status Doppelstruktur (bg.success vs success.bg mit widersprüchlichen Werten), spacing/sizing Dopplung, Layer-Verletzungen, secondary.1==neutral.1 Duplikation, fehlende border-Symmetrie. ~15 L4-Dateien betroffen. Gitea #73. |
| 2026-02-19 | **NDS-033 Done:** Phase 1 (Color-Konsolidierung) abgeschlossen. L3 `roles/colors.json` umstrukturiert: 4 Status-Gruppen entfernt, 12 bg-Varianten (subtle/default/solid) + border.warning/info ergaenzt, secondary→neutral konsolidiert. 16 L4-Dateien migriert (~86 Refs). 5 Komponenten mit direkten L3-Refs gefixt. tokens-annotated.css + Colors.stories.tsx aktualisiert. 16 vorbestehende Test-Mismatches behoben. 1466/1466 Tests, Storybook Build OK. Offen: Spacing/Sizing (Probleme 2+3) → separate Story. |
| 2026-02-19 | **NDS-019 Batch 1 Done:** Phase 0: 5 neue L3-Tokens (font-weight x4, font-size xs) + 2 heading-size L3-Tokens. 9 Atoms refactored (Alert, Badge, Blockquote, Code, Checkbox, Heading, Label, Kbd, Tag), Link skipped (nichts im Scope). 7 L4-Token-Dateien, 8 TSX, 5 Test-Dateien (16 Assertions). Scope: font-weight, font-size, border-width (NICHT padding/gap/ring). 1466/1466 Tests, Storybook OK. |
| 2026-02-19 | **NDS-019 Batch 2 Done:** 12 weitere Atoms refactored (Avatar, Banner, Text, Spinner, NumberInput, Switch, Progress, Toggle, Slider, ToggleGroup, InputOTP, Button). 12 L4-Token-Dateien aktualisiert/erstellt (text.json neu), 12 TSX, 2 Test-Dateien (4+5 Assertions). Alle Atoms jetzt 100% tokenisiert (font-weight, font-size, border-width, border-radius). 1466/1466 Tests, Storybook OK. |
| 2026-02-19 | **NDS-019 Done:** Scan von Molecules + Organisms ergab 0 verbleibende hardcoded Werte im Scope (font-weight, font-size, border-width, border-radius). Gesamtbilanz: 7 neue L3-Tokens, 21 Atoms refactored, 19 L4-Token-Dateien aktualisiert/erstellt (heading.json + text.json neu), 20 TSX-Dateien, 7 Test-Dateien (20 Assertions). Token-Collisions: 91. |
| 2026-02-19 | **NDS-014 Done:** Component Generator CLI (`scripts/generate-component.mjs`). Interaktiv (readline) + CLI-Argumente (`--name=X --level=Y --prefix=Z --element=W`). Generiert 5 Dateien: Token-JSON, TSX, Test, Stories, index.ts. 9 HTML-Elemente, Validierung (PascalCase, kebab-case, Duplikat-Erkennung). `pnpm generate:component`. |
| 2026-02-19 | **NDS-020 Done:** Icon-Migration abgeschlossen. 48 Dateien migriert (36 Komponenten + 12 Stories) auf Icon-Atom. Groessen-Mapping: 16→sm, 20→md, 24→lg, 32→xl. 3 erlaubte Ausnahmen (Checkbox, Rating, Menubar Circle). Naming-Konflikte in 3 Dateien geloest. 1466/1466 Tests, Storybook Build OK. |
