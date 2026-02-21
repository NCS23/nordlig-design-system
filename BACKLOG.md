# Nordlig Design System — Backlog

> **Single Source of Truth: [Gitea Issues](http://192.168.68.52:3001/NCSNASadmin/nordlig-design-system/issues)**
>
> Alle Story-Details (Beschreibung, Akzeptanzkriterien, Token-Mapping, Task Breakdown, DoR/DoD)
> leben ausschliesslich in den Gitea-Issues. Dieses Dokument enthaelt nur die Uebersicht und das Changelog.

---

## Definition of Ready (DoR) — Komponenten

Eine Story ist **Ready**, wenn alle folgenden Punkte erfuellt sind:

- [ ] Komponente ist identifiziert und benannt
- [ ] Level festgelegt (Atom / Molecule / Organism)
- [ ] Token-Prefix ist festgelegt (z.B. `btn`, `cpybtn`, `img`)
- [ ] L4-Token-Mapping zu L3-Role-Tokens ist definiert (Tabelle)
- [ ] Props-Interface ist spezifiziert (mindestens grob)
- [ ] Blueprint-Komponente (Vorlage) ist identifiziert
- [ ] Dependencies sind bekannt (z.B. Radix-Primitive, externe Libs)
- [ ] Akzeptanzkriterien sind formuliert

## Definition of Done (DoD) — Komponenten

Eine Story ist **Done**, wenn alle folgenden Punkte erfuellt sind:

- [ ] **Schritt 1 — Tokens:** L4-Token-Datei erstellt, Token Build erfolgreich, Tokens in `tokens.css` vorhanden
- [ ] **Schritt 2 — Komponente:** Implementiert mit `forwardRef`, `displayName`, `cn()`/`cva()`, nur `var(--*)` Tokens
- [ ] **Schritt 3 — Unit Tests:** Geschrieben + alle bestanden (Accessibility, States, Edge Cases, Token-Klassen)
- [ ] **Schritt 4 — Stories:** Geschrieben (KEINE DesignTokens-Stories in Komponenten-Dateien!)
- [ ] **Schritt 5 — Infrastructure:** `index.ts` Export, `tokens-annotated.css`, `COMPONENT_LOG.md` aktualisiert
- [ ] **Schritt 6 — UX Review:** Durchgefuehrt, alle Critical + Major Issues gefixt
- [ ] **Schritt 7 — Visual Tests:** Playwright-Tests hinzugefuegt (atoms/molecules/organisms + Dark Mode)
- [ ] **Schritt 8 — Storybook Build:** Erfolgreich (0 Fehler)

## Definition of Ready — Figma Export (DoR-FE)

- [ ] Komponente ist in Storybook implementiert und hat Stories
- [ ] L4-Token-Datei vollstaendig: Color, Spacing, Sizing, Radius, Typography inkl. line-height, border-width
- [ ] ComponentConfig in `extract-component.ts` definiert
- [ ] `FIGMA_EXPORT_RULES.md` gelesen und verstanden

## Definition of Done — Figma Export (DoD-FE)

- [ ] Alle Kombinationen extrahiert (count pruefen, 0 FAILED)
- [ ] ALLE tokenBindings vorhanden (gegen Button-Referenz pruefen: 12 Binding-Typen)
- [ ] SVG-Icons: hex-Farben (kein rgb()), kein width/height (nur viewBox)
- [ ] Plugin baut fehlerfrei: `pnpm build:plugin`
- [ ] Figma-Import getestet: Component Set korrekt, Variables Panel vollstaendig

---

## Epic-Uebersicht

> 8 Epics strukturieren die gesamte Roadmap. Gitea-Labels: `epic/0` bis `epic/7`.
> Gitea Epic-Overview-Issues: #26–#33. Story-Issues: #1–#72.

| Epic | Titel | Stories | Gitea Label |
|------|-------|---------|-------------|
| **0** | Architektur-Bereinigung | NDS-019, NDS-020, NDS-026, NDS-030–NDS-033 | `epic/0-architecture` |
| **1** | Fehlende Kern-Komponenten | NDS-004, NDS-007, NDS-011, NDS-013, NDS-018, NDS-040–NDS-047 | `epic/1-components` |
| **2** | Templates & Page Layouts | NDS-050–NDS-057 | `epic/2-templates` |
| **3** | Patterns & Recipes | NDS-060–NDS-065 | `epic/3-patterns` |
| **4** | Figma Pipeline & Form Builder | NDS-070–NDS-074 | `epic/4-figma` |
| **5** | Testing & QA | NDS-008, NDS-009, NDS-016, NDS-080 | `epic/5-testing` |
| **6** | DX & Infrastruktur | NDS-014, NDS-015, NDS-090–NDS-092 | `epic/6-dx-infra` |
| **7** | Dokumentation & Onboarding | NDS-100–NDS-103 | `epic/7-docs` |

### Atomaritaets-Violations (Epic 0 Scope)

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

## Initiale Komponenten (vor Backlog-Einfuehrung)

Die folgenden 69 Komponenten wurden vor Einfuehrung des Backlogs entwickelt.
Detaillierte Dokumentation: siehe `COMPONENT_LOG.md`.

**Atoms (32):**
Alert, AspectRatio, Avatar, Badge, Blockquote, Button, Checkbox, Code, CopyButton,
Heading, HoverCard, Image, Input, InputOTP, Kbd, Label, Link, NumberInput, Popover,
Progress, ScrollArea, Separator, Skeleton, Slider, Spinner, Switch, Tag, Text,
ThemeToggle, ToggleGroup, Tooltip, VisuallyHidden

**Molecules (26):**
Accordion, AlertDialog, Breadcrumbs, Collapsible, ContextMenu, DatePicker, Dialog,
Drawer, DropdownMenu, EmptyState, FileUpload, Form, InputField, Menubar,
NavigationMenu, Pagination, RadioGroup, Resizable, Select, Sheet, Stepper, Tabs,
Textarea, TimePicker, Toast, Toolbar

**Organisms (12):**
Card, Carousel, Chart, Command, DataTable, Modal, SessionCard, Sidebar, StatCard,
Table, Timeline, Tree

**Molecules (27):**
Accordion, AlertDialog, Breadcrumbs, Collapsible, ContextMenu, DatePicker, Dialog,
Drawer, DropdownMenu, EmptyState, FileUpload, Form, InputField, Menubar,
NavigationMenu, Pagination, RadioGroup, Resizable, SearchFilter, Select, Sheet,
Stepper, Tabs, Textarea, TimePicker, Toast, Toolbar

**Templates (8):**
PageShell, DashboardLayout, AuthLayout, FormPage, ListPage, DetailPage, ErrorPage, EmptyStatePage

---

## Changelog

| Datum | Aenderung |
|-------|-----------|
| 2026-02-15 | Backlog eingefuehrt. 69 bestehende Komponenten als Done erfasst. |
| 2026-02-15 | 9 Stories hinzugefuegt: Toggle, Combobox, Banner, MultiSelect, Rating, LoadingOverlay, SegmentedControl, Test-Nachruestung, Visual Regression. |
| 2026-02-15 | NDS-008 Scope reduziert (P2→P3, nur 3 Atoms unter 8 Tests). NDS-009 heraufgestuft (P3→P2, nur 6% Coverage). |
| 2026-02-15 | 9 neue Stories: SearchInput (NDS-010), TimePicker (NDS-011), PasswordInput (NDS-012), ColorPicker (NDS-013), Generator CLI (NDS-014), Changelog (NDS-015), a11y CI (NDS-016), Highlight (NDS-017), Spoiler (NDS-018). |
| 2026-02-15 | **P1 Batch Done:** NDS-001 (Toggle), NDS-002 (Combobox), NDS-003 (Banner), NDS-010 (SearchInput). 54 Tests, 30 Stories, 37 neue Tokens. |
| 2026-02-15 | **P2 Batch Done:** NDS-012 (PasswordInput), NDS-006 (LoadingOverlay), NDS-005 (Rating), NDS-017 (Highlight). 46 Tests, 21 Stories, 21 neue Tokens. |
| 2026-02-16 | **NDS-019 erstellt:** Token-Refactoring fuer ~70 Komponenten. |
| 2026-02-16 | **Icon-Atom erstellt:** Icon.tsx Komponente (#79) mit token-basierten Groessen. |
| 2026-02-16 | **NDS-020 erstellt, NDS-021 erstellt + gestartet.** |
| 2026-02-16 | **Figma Export DoR/DoD eingefuehrt.** |
| 2026-02-16 | **Figma Export Batch Done:** NDS-022, NDS-023, NDS-024, NDS-025. |
| 2026-02-16 | **Figma Post-Import Fixes:** CheckboxField TextStyles, Checkbox Hover-Varianten, Variable-Hierarchie. |
| 2026-02-18 | **NDS-026 erstellt:** Hardcoded gap-* durch Token-basierte Gaps ersetzen (#71). |
| 2026-02-17 | **Epic-Struktur eingefuehrt:** 8 Epics (0-7) mit 37 neuen Stories (NDS-030 bis NDS-103). |
| 2026-02-19 | **NDS-047 erstellt:** Radio Atom extrahieren (Epic 1). Gitea #72. |
| 2026-02-19 | **NDS-033 Done:** L3 Token-Konsolidierung Phase 1. 16 L4-Dateien migriert, 5 Komponenten gefixt. |
| 2026-02-19 | **NDS-019 Done:** 21 Atoms refactored, 19 L4-Token-Dateien, 7 neue L3-Tokens. |
| 2026-02-19 | **NDS-014 Done:** Component Generator CLI (`pnpm generate:component`). |
| 2026-02-19 | **NDS-020 Done:** Icon-Migration — 48 Dateien migriert auf Icon-Atom. |
| 2026-02-19 | **Backlog-Migration:** Story-Details von BACKLOG.md nach Gitea-Issues migriert. 47 Issues aktualisiert mit vollem Template (Akzeptanzkriterien, Token-Mapping, Task Breakdown, DoR/DoD). BACKLOG.md auf Uebersicht + Changelog reduziert. Gitea ist jetzt Single Source of Truth. |
| 2026-02-20 | **Welle 3 gestartet und abgeschlossen:** |
| 2026-02-20 | **NDS-004 Done:** MultiSelect Enhancement — `maxItems` Prop + Backspace-Handler. 7 neue Tests (38 gesamt), 1 neue Story. |
| 2026-02-20 | **NDS-011 Done:** TimePicker Molecule — Scroll-Column-Pattern, 19 L4-Tokens (`tpick`), 28 Tests, 10 Stories. |
| 2026-02-20 | **NDS-050 Done:** PageShell Template — Erstes Template-Level-Component, Compound-Pattern, 13 L4-Tokens (`shell`), 22 Tests, 6 Stories. Neues `templates/` Verzeichnis. |
| 2026-02-20 | **NDS-032 Teilweise Done:** Token-Audit Script erweitert mit `--strict` Flag fuer Typography/Spacing. Baseline: 344 Violations (124 font-size, 56 font-weight, 164 spacing). Datei-Migration in kuenftigen Sessions. |
| 2026-02-20 | **Welle 4 gestartet und abgeschlossen:** |
| 2026-02-20 | **NDS-052 Done:** DashboardLayout Template — Compound-Component mit Context, Mobile Overlay, 10 L4-Tokens (`dashboard`), 23 Tests, 8 Stories. |
| 2026-02-20 | **NDS-051 Done:** AuthLayout Template — Slot-Komponente mit Logo/Footer/Background, 11 L4-Tokens (`auth`), 18 Tests, 6 Stories. |
| 2026-02-20 | **NDS-032 P1 Done:** Token-Audit P1 Batch — SessionCard, Sidebar, MultiSelect, FileUpload tokenisiert. 344 → 269 Strict Violations (22% Reduktion). |
| 2026-02-20 | **NDS-009 Done:** Visual Regression Baseline — +6 Atoms, +10 Molecules, +2 Organisms, +3 Templates, +16 Dark Mode. Neues `templates.spec.ts`. |
| 2026-02-20 | **Welle 5 gestartet und abgeschlossen: Design-Prinzipien Compliance** |
| 2026-02-20 | **NDS-120 Done:** Token-Foundation Fixes — `prefers-reduced-motion` global CSS, `--color-bg-paper` warm (neutral.1.50), Font-Weights auf 3 reduziert (400/500/600), Heading Line-Heights enger, `radius.component.xl` fuer Modale/Panels. |
| 2026-02-20 | **NDS-121 Done:** Hardcoded Colors + Radio Fix — Neuer L3-Token `interactive.hover-overlay`, 5 Komponenten entfaerbt (Carousel, Stepper, Timeline, Alert, Tag), Radio Typografie tokenisiert. L4-Tokens: `carousel.json` erweitert. |
| 2026-02-20 | **NDS-122 Done:** Touch-Target Audit — 11 Komponenten auf min. 44px Touch-Targets gefixt (Toast, Carousel, Command, Tree, ThemeToggle, CopyButton, Stepper, AlertDialog, Sidebar). Invisible Hit-Areas + direkte Groessenanpassungen. |
| 2026-02-20 | **NDS-123 Done:** PageShell Stories Rewrite — Placeholder-Divs durch echte DS-Komponenten ersetzt (Card, StatCard, Heading, Text, Badge, Button, Avatar, Sidebar). Training-Analyzer-Inhalte, Mobile-Story, responsive Header. |
| 2026-02-20 | **NDS-124 Done:** Hardcoded Spacing Batch — 8 Komponenten tokenisiert (EmptyState, StatCard, Timeline, Command, NavigationMenu, PasswordInput, Combobox, Menubar). 3 neue Token-Dateien (statcard.json, timeline.json, navmenu.json), ~35 neue Spacing/Sizing-Tokens. |
| 2026-02-20 | **Welle 6 gestartet und abgeschlossen: Visuelle Ueberarbeitung** |
| 2026-02-20 | **NDS-125 Done:** Stepper Visual Hierarchy — Completed als Outline (subtle bg + border), nur Current solid (Fokus). Indicator 40px→32px, Linien 2px→1px. 12 Color + 4 Sizing + 3 Spacing L4-Tokens. Gitea #81. |
| 2026-02-20 | **NDS-126 Done:** Timeline Variant Colors — Solid-Dots zu subtle (Alert-Pattern: bg-success-subtle + text-success). Alle Farben auf L4-Tokens, Linie 2px→1px. 14 Color-Tokens. Gitea #82. |
| 2026-02-20 | **NDS-127 Done:** StatCard TrendIndicator horizontal statt vertikal, Labels mobile-hidden. PageShell Stories vereinfacht (2-Spalten-Grid, keine Trends). Gitea #83. |
| 2026-02-20 | **Welle 7 gestartet und abgeschlossen: Token-Audit + Design-Harmonisierung** |
| 2026-02-20 | **NDS-128 Done:** Token-Datei Konsolidierung — `statcard.json`+`stat-card.json` gemergt, `navmenu.json`+`navigation-menu.json` gemergt. Hardcoded px in 12 L4-Dateien durch L3-Referenzen ersetzt. Neuer L3: `sizing.layout.header-height` (56px). Gitea #84. |
| 2026-02-20 | **NDS-129 Done:** PageShell abstrakt — Stories komplett auf Platzhalter zurueckgesetzt (keine Domain-Inhalte). Neuer Token `spacing.shell.header-logo-gap`. Gitea #85. |
| 2026-02-20 | **NDS-130 Done:** Card-Familie Harmonisierung — Shadow + Font + Spacing Tokens fuer StatCard (10 neue Font-Tokens), SessionCard L4-Shadow-Tokens. Alle drei Cards nutzen gleiche L3-Foundations. Gitea #86. |
| 2026-02-20 | **NDS-131 Done:** Typografie-Tokenisierung Batch 1 — 20 Komponenten (Menubar, Command, AlertDialog, Calendar, Form, Combobox, Select, Timeline, Stepper, Toolbar, Textarea, Modal, ContextMenu, DropdownMenu, Sheet, Dialog, Toast, Accordion, NavigationMenu, Drawer). 76 neue Font-Tokens, 81 Tailwind-Ersetzungen. Gitea #87. |
| 2026-02-20 | **NDS-132 Done:** Typografie-Tokenisierung Batch 2 — 14 Komponenten (DataTable, Tree, Chart, Breadcrumbs, EmptyState, LoadingOverlay, PasswordInput, ColorPicker, Pagination, Tabs, InputField, HoverCard, Popover, Tooltip). 21 neue Font-Tokens, 23 Ersetzungen. Neue `inputfield.json`. Gitea #88. |
| 2026-02-21 | **Welle 10 gestartet und abgeschlossen: Templates (FormPage + ListPage) + SearchFilter** |
| 2026-02-21 | **NDS-060 Done:** SearchFilter Molecule — Such+Filter-Leiste, 6 L4-Tokens (`searchfilter`), 13 Tests, 4 Stories. Gitea #52. |
| 2026-02-21 | **NDS-053 Done:** FormPage Template — Formular-Seiten-Layout (Header/Body/Actions), maxWidth sm/md/lg, 10 L4-Tokens (`formpage`), 15 Tests, 4 Stories. Gitea #47. |
| 2026-02-21 | **NDS-055 Done:** ListPage Template — Listen/Tabellen-Layout (Header/Toolbar/Body/Footer), 8 L4-Tokens (`listpage`), 15 Tests, 3 Stories. Gitea #49. |
| 2026-02-21 | **Content-Padding erhoehen:** PageShell + DashboardLayout content-p von 24px (lg) auf 32px (xl). Design-Philosophie: "so luftig wie noetig und moeglich". |
| 2026-02-21 | **Welle 11 gestartet und abgeschlossen: Templates abrunden + SegmentedControl + Token-Audit** |
| 2026-02-21 | **NDS-007 Done:** SegmentedControl Atom — Animierter Indicator, radiogroup ARIA, 18 L4-Tokens (`seg`), 19 Tests, 6 Stories. Gitea #2. |
| 2026-02-21 | **NDS-054 Done:** DetailPage Template — Header/Body/Content/Sidebar, responsive Sidebar, 7 L4-Tokens (`detailpage`), 17 Tests, 4 Stories. Gitea #48. |
| 2026-02-21 | **NDS-056 Done:** ErrorPage Template — 404/500/Wartung, zentriert, 10 L4-Tokens (`errorpage`), 22 Tests, 4 Stories. Gitea #50. |
| 2026-02-21 | **NDS-057 Done:** EmptyStatePage Template — Page-Level Empty State, 10 L4-Tokens (`emptypage`), 13 Tests, 4 Stories. Gitea #51. |
| 2026-02-21 | **NDS-032 P2 Done:** Token-Audit L2-Violations — alle 16 L2→L3 Referenzen gefixt (8 Dateien). 0 L2-Violations verbleibend. |
