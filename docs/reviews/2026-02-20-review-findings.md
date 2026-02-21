# Design Principles Review — Konsolidierte Ergebnisse

**Datum:** 2026-02-20
**Referenz:** [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)
**Scope:** Alle Tokens + 87 Komponenten (38 Atoms, 35 Molecules, 12 Organisms, 3 Templates)

---

## Zusammenfassung

| Kategorie | FAIL | WARN/HIGH | WARN/MEDIUM | WARN/LOW | PASS |
|-----------|------|-----------|-------------|----------|------|
| Tokens | 1 | 2 | 2 | — | 8 |
| Atoms (38) | 1 + 1 system | 3 | 6 | 15 | 12 |
| Molecules (35) | — | 4 | 5 | ~30 | 11 |
| Organisms (12) | — | 4 | — | 14 | 3 |
| Templates (3) | 1 | — | 3 | 3 | — |

---

## P0 — Systemweit (betrifft alle Komponenten)

### S-01: `prefers-reduced-motion` wird nirgends respektiert
- **Prinzip:** Demokratisk — "prefers-reduced-motion: Immer respektieren"
- **Betroffen:** ~22 Atoms + Molecules/Organisms mit `transition-*`, `animate-*`, `duration-*`
- **Fix:** Globale CSS-Regel in `packages/styles/`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### S-02: `--color-bg-paper` ist reines `#ffffff`
- **Prinzip:** Hygge — "Warmes Weiss (nicht reines #FFFFFF), z.B. Slate-50 (#f8fafc)"
- **Betroffen:** Groesste Farbflaeche im System — Cards, Dialoge, Inputs, Modals, Header, Footer, alle 3 Templates
- **Fix:** `color.bg.paper` von `{color.neutral.1.0}` (= `#ffffff`) auf `{color.neutral.1.50}` (`#f8fafc`) aendern, oder eigenen warm-white Wert einfuehren (z.B. `#fafbfd`)
- **Impact:** Kaskadiert automatisch durch alle L4-Tokens

---

## P1 — Critical / FAIL

### T-01: 4 Font-Weights statt max. 3 auf L3-Ebene
- **Prinzip:** Typografie — "Maximal 3 Gewichte (Regular, Medium, Semibold/Bold)"
- **Ist:** L3 exponiert `normal` (400), `medium` (500), `semibold` (600), `bold` (700)
- **Soll:** 3 Gewichte: `normal` (400), `medium` (500), `semibold` (600)
- **Fix:** `bold` (700) aus L3 `font.component.weight` entfernen, alle L4-Referenzen auf `semibold` umstellen
- **Dateien:** `packages/tokens/src/roles/`, alle L4-Token-Dateien mit `font-weight-bold`

### A-01: Radio — Hardcoded Typografie
- **Datei:** `packages/components/src/atoms/Radio/Radio.tsx`
- **Issues:** `text-sm`, `text-xs` (12px < 14px Minimum), `font-medium`, `border-2` hardcoded
- **Fix:** L4-Tokens fuer Radio-Label-Typografie erstellen, `border-2` durch Token ersetzen

### T-02: PageShell Stories unter Qualitaetsstandard
- **Datei:** `packages/components/src/templates/PageShell/PageShell.stories.tsx`
- **Issues:** Nur Platzhalter-Boxen statt echte Komponenten, `fontSize: 14` (< 16px Minimum), kein Logo, keine Mobile-Story
- **Fix:** Komplette Ueberarbeitung nach Vorbild DashboardLayout (echte Komponenten, realistischer Content, Mobile-Story)

---

## P2 — High / Muss behoben werden

### Touch-Targets < 44px (Demokratisk)

| # | Komponente | Element | Ist | Soll | Datei |
|---|-----------|---------|-----|------|-------|
| TT-01 | Carousel | Pfeil-Buttons | 32px | >= 44px | `organisms/Carousel/Carousel.tsx` |
| TT-02 | Carousel | Dot-Buttons | 8px | >= 44px Hit-Area | `organisms/Carousel/Carousel.tsx` |
| TT-03 | Toast | Close-Button | 20px | >= 44px | `molecules/Toast/Toast.tsx` |
| TT-04 | DatePicker | Nav-Buttons | 28px | >= 44px | `molecules/DatePicker/Calendar.tsx` |
| TT-05 | AlertDialog | Action/Cancel | ~32px | >= 44px | `molecules/AlertDialog/AlertDialog.tsx` |
| TT-06 | Sidebar | Items | ~36px | >= 44px | `organisms/Sidebar/Sidebar.tsx` |
| TT-07 | Alert | Close-Button | ~24px | >= 44px | `atoms/Alert/Alert.tsx` |
| TT-08 | Banner | Dismiss-Button | ~24px | >= 44px | `atoms/Banner/Banner.tsx` |
| TT-09 | CopyButton | Alle Sizes | 28/32/36px | >= 44px | `atoms/CopyButton/CopyButton.tsx` |
| TT-10 | Checkbox | Box | 20px | >= 44px Hit-Area | `atoms/Checkbox/Checkbox.tsx` |
| TT-11 | Slider | Thumb | 20px | >= 44px Hit-Area | `atoms/Slider/Slider.tsx` |
| TT-12 | ThemeToggle | Button | 36px | >= 44px | `atoms/ThemeToggle/ThemeToggle.tsx` |
| TT-13 | Rating (sm) | Stars | 16px | >= 44px Hit-Area | `atoms/Rating/Rating.tsx` |
| TT-14 | Button (sm) | Button | 36px | >= 44px | `atoms/Button/Button.tsx` |
| TT-15 | Stepper | Step-Indicator | 32px | >= 44px | `molecules/Stepper/Stepper.tsx` |
| TT-16 | Command | Items | ~26px | >= 44px | `organisms/Command/Command.tsx` |
| TT-17 | Tree | Items | ~28px | >= 44px | `organisms/Tree/Tree.tsx` |

### Hardcoded Farben (Tidloeshet, Hygge)

| # | Komponente | Issue | Datei |
|---|-----------|-------|-------|
| HC-01 | Carousel | `bg-black/30`, `bg-white`, `bg-white/50`, `bg-white/70` | `organisms/Carousel/Carousel.tsx` |
| HC-02 | Stepper | `text-white` | `molecules/Stepper/Stepper.tsx` |
| HC-03 | Timeline | `text-white`, `bg-white` | `organisms/Timeline/Timeline.tsx` |
| HC-04 | Alert | `hover:bg-black/5` | `atoms/Alert/Alert.tsx` |
| HC-05 | Tag | `hover:bg-black/10` | `atoms/Tag/Tag.tsx` |

**Fix fuer HC-01 bis HC-03:** `text-white` → `text-[var(--color-text-inverse)]`, `bg-white` → Token
**Fix fuer HC-04, HC-05:** `bg-black/5` → Token-basierte Hover-Farbe (z.B. `--color-interaction-hover`)

### Border-Radii: Modale/Panels bei 8px statt 12-24px
- **Prinzip:** Form — "Border-Radius gross: 12-24px (Modale, Panels)"
- **Ist:** Dialog, Modal, Drawer, Sheet, Popover nutzen `radius.component.lg` = 8px
- **Fix:** Neuen L3-Token `radius.component.xl` = 12px einfuehren, fuer grosse Container verwenden
- **L1-Werte existieren bereits:** `radius.xl` (12px), `radius.2xl` (16px), `radius.3xl` (24px)

### Heading Line-Heights zu locker
- **Prinzip:** Typografie — "Zeilenhoehe Headings: 1.1-1.3x"
- **Ist:** Alle Groessen nutzen einheitlich 1.5x
- **Fix:** Eigene Heading-Line-Height-Tokens: 2xl→1.25x, 3xl→1.2x, 4xl→1.17x, 5xl→1.17x

---

## P3 — Medium / Sollte behoben werden

### Hardcoded Tailwind Spacing (groessere Verstoesse)

| # | Komponente | Hardcoded Values | Datei |
|---|-----------|-----------------|-------|
| HS-01 | EmptyState | `py-12 px-4 mb-4 mb-2 mb-6` — **kein einziger Token** | `molecules/EmptyState/EmptyState.tsx` |
| HS-02 | StatCard | `p-6 mt-2 ml-1 mt-1` | `organisms/StatCard/StatCard.tsx` |
| HS-03 | NavigationMenu | `px-3 py-2 p-4 mt-1` (mehrfach) | `molecules/NavigationMenu/NavigationMenu.tsx` |
| HS-04 | PasswordInput | `pr-10 right-3 mt-1.5 mt-0.5` | `molecules/PasswordInput/PasswordInput.tsx` |
| HS-05 | Combobox | `p-1 py-1.5 px-3 mr-2 py-6 h-10` (6 Stellen) | `molecules/Combobox/Combobox.tsx` |
| HS-06 | Timeline | `pb-8 ml-4 mt-0.5 mt-2` — **kein einziger Token** | `organisms/Timeline/Timeline.tsx` |
| HS-07 | Command | 8 Stellen hardcoded (`px-3 p-1 px-2 py-1.5` etc.) | `organisms/Command/Command.tsx` |
| HS-08 | Menubar | `h-10 pl-8 left-2 my-1` | `molecules/Menubar/Menubar.tsx` |

### Weitere Token-Issues

| # | Issue | Datei |
|---|-------|-------|
| TI-01 | Primary-Akzent sky-500 ~90% Saettigung (Prinzip: "gedaempft, entsaettigt") | Token-Level |
| TI-02 | 5 Shadow-Elevations statt max. 3 (key, low, medium, high, overlay) | Token-Level |
| TI-03 | DatePicker `shadow-[var(...)]` statt `[box-shadow:var(...)]` (Tailwind v3 Gotcha) | `molecules/DatePicker/Calendar.tsx` |
| TI-04 | PageShell Header-Hoehe nicht responsive (fix 56px, soll 56/64px) | `templates/PageShell/PageShell.tsx` |
| TI-05 | DashboardLayout Footer reused Header-Tokens statt eigene | `templates/DashboardLayout/DashboardLayout.tsx` |
| TI-06 | AuthLayout `logo` Prop existiert aber keine Story nutzt ihn | `templates/AuthLayout/` |
| TI-07 | AuthLayout Footer-Gap nur 12px (Prinzip: 32-64px fuer getrennte Bloecke) | Token `--spacing-auth-footer-gap` |

---

## P4 — Low / Kann behoben werden

### Hardcoded Tailwind Spacing (kleine Verstoesse)

Betrifft ~30 Stellen in: Accordion, AlertDialog, Breadcrumbs, Chart, Code, ColorPicker, ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Kbd, NumberInput, Popover, ScrollArea, SearchInput, Select, Sheet, Skeleton, Switch, Tag, TimePicker, Toast, Toolbar, Tooltip, Tree

Typische Muster: `my-1`, `px-2`, `mt-1`, `mb-2`, `py-0.5`, `right-4 top-4` etc.

### Hardcoded Typografie (kleine Verstoesse)

| Komponente | Issue |
|-----------|-------|
| HoverCard | `text-sm` statt Token |
| Popover | `text-sm` statt Token |
| Tooltip | `text-sm leading-snug` statt Token |

### Sonstige

| Issue | Komponente |
|-------|-----------|
| Progress Transition 500ms (Prinzip: 200-300ms) | `atoms/Progress/Progress.tsx` |
| Switch hardcoded `translate-x-[22px]` | `atoms/Switch/Switch.tsx` |
| ScrollArea hardcoded Scrollbar-Dimensionen | `atoms/ScrollArea/ScrollArea.tsx` |
| Skeleton hardcoded Dimensionen in SkeletonText | `atoms/Skeleton/Skeleton.tsx` |
| StatCard kein Empty-State-Design | `organisms/StatCard/StatCard.tsx` |
| Modal kein eingebautes Destructive-Confirmation-Pattern | `organisms/Modal/Modal.tsx` |

---

## Komponenten ohne Verstoesse (vorbildlich)

### Atoms (12)
AspectRatio, Avatar, Badge, Blockquote, Heading, Icon, Image, InputOTP, Label, Link, Separator, Text, VisuallyHidden

### Molecules (11)
CheckboxField, Collapsible, FileUpload, Form, InputField, LoadingOverlay, ProgressField, RadioGroup, SwitchField, Tabs, Textarea

### Organisms (3)
Card, Table, SessionCard

---

## Empfohlene Reihenfolge

1. **S-01** prefers-reduced-motion global — 1 CSS-Regel, groesster Impact
2. **S-02** `--color-bg-paper` warm machen — 1 Token-Aenderung, kaskadiert ueberall
3. **T-01** Font-Weights auf 3 reduzieren — Token-Aenderung + L4-Audit
4. **Heading Line-Heights** enger machen — Neue L3-Tokens
5. **Border-Radii** fuer Modale/Panels auf 12px+ — Neuer L3-Token + L4-Anpassungen
6. **Touch-Targets** batch-weise fixen (TT-01 bis TT-17)
7. **Hardcoded Farben** ersetzen (HC-01 bis HC-05)
8. **A-01** Radio tokenisieren
9. **T-02** PageShell Stories ueberarbeiten
10. **P3** Hardcoded Spacing in grossen Batch-Runden tokenisieren

---

*Erstellt am 2026-02-20 durch automatisiertes Design-Prinzipien-Review gegen DESIGN_PRINCIPLES.md*
