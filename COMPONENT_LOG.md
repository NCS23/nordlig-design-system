# 🧩 Component Development Log

**Chronologische Dokumentation aller Component-Entwicklungen**

---

## Legende

- ✅ Complete - Production ready
- 🚧 In Progress - Currently being developed
- 📝 Planned - On roadmap
- ⚠️ Deprecated - Will be removed
- 🔄 Refactoring - Being improved

---

## [Button] - 2026-02-12

**Status:** ✅ Complete
**Developer:** Claude Code (Initial Setup)
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-btn-primary-bg`, `color-btn-primary-bg-hover`, `color-btn-primary-bg-active`
  - `color-btn-primary-text`, `color-btn-primary-border`
  - `color-btn-secondary-bg`, `color-btn-secondary-bg-hover`, `color-btn-secondary-bg-active`
  - `color-btn-secondary-text`, `color-btn-secondary-border`
  - `color-btn-ghost-text`, `color-btn-ghost-bg-hover`, `color-btn-ghost-bg-active`
  - `color-btn-disabled-bg`, `color-btn-disabled-text`
- **Level 4 (Semantic) – Sizing (pro Size sm/md/lg):**
  - `sizing-btn-{size}-height` → L3 `sizing.component.height.{size}`
  - `sizing-btn-{size}-padding-x` → L3 `sizing.component.padding-x.{size}`
  - `sizing-btn-{size}-padding-y` → L3 `sizing.component.padding-y.{size}`
  - `sizing-btn-{size}-gap` → L3 `sizing.component.gap.{size}`
  - `sizing-btn-{size}-font-size` → L3 `font.component.size.{size}`
  - `sizing-btn-{size}-radius` → L3 `radius.component.{size}`
  - **18 Sizing-Tokens insgesamt** (6 pro Size × 3 Sizes)

### Files
- `packages/components/src/atoms/Button/Button.tsx`
- `packages/components/src/atoms/Button/Button.stories.tsx`
- `packages/components/src/atoms/Button/index.ts`
- `packages/tokens/src/semantic/button.json`

### Variants
- **variant:** primary, secondary, ghost
- **size:** sm, md, lg
- **disabled:** boolean (native HTML attribute)

### Test Coverage
- ⚠️ **Tests noch nicht geschrieben** – Vitest-Infrastruktur ist jetzt vorhanden
- Test-Setup: `vitest.config.ts`, `test-setup.ts`, Testing Library installiert

### Accessibility
- ✅ Keyboard Navigation (Tab, Enter, Space)
- ✅ Focus Indicators (ring-2 + ring-offset-2 on focus-visible)
- ✅ ARIA support (native `<button>` Semantik)
- ✅ Disabled State (pointer-events-none + visuelles Feedback)
- ⚠️ Missing: Automatisierte a11y-Tests

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-button
- **Stories:** Primary, Secondary, Ghost, AllSizes
- **Controls:** variant, size, disabled
- **Docs:** Auto-generated via autodocs tag

### Notes
- Initial component as proof of concept
- Demonstrates 4-layer token hierarchy working
- CVA for variant management
- Tailwind CSS v3 + PostCSS configured
- Alle Sizing-Tokens nutzen `text-[length:var(...)]` Syntax für font-size (Tailwind braucht den `length:` Prefix)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add unit tests (Infrastruktur steht bereit)
- [ ] Add loading state with spinner
- [ ] Add icon support (leftIcon, rightIcon)
- [ ] Add accessibility tests with axe

---

## [Card] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Organism

### Tokens Used
- **Level 4 (Semantic) – Spacing:**
  - `spacing-card-padding-compact` → L3 `spacing.component.padding.sm`
  - `spacing-card-padding-normal` → L3 `spacing.component.padding.md`
  - `spacing-card-padding-spacious` → L3 `spacing.component.padding.lg`
  - `spacing-card-gap` → L3 `spacing.component.gap.md`
- **Level 4 (Semantic) – Radius:**
  - `radius-card` → L3 `radius.component.lg`
- **Level 4 (Semantic) – Color:**
  - `color-card-border` → L3 `color.border.muted` (nur bei raised/elevated)
- **Tailwind Utilities (kein Token):**
  - `bg-white` (Background)
  - `shadow-sm` (raised), `shadow-lg` (elevated), `hover:shadow-xl` (hoverable)

### Files
- `packages/components/src/organisms/Card/Card.tsx` (Compound: Card, CardHeader, CardBody, CardFooter)
- `packages/components/src/organisms/Card/Card.test.tsx` (24 Tests)
- `packages/components/src/organisms/Card/Card.stories.tsx` (11 Stories)
- `packages/components/src/organisms/Card/index.ts`
- `packages/tokens/src/semantic/card.json`

### Variants (CVA)
- **elevation:** flat (default, kein Border/Shadow), raised (border + shadow-sm), elevated (border + shadow-lg)
- **padding:** compact, normal (default), spacious
- **hoverable:** boolean (cursor-pointer + hover:shadow-xl)

### Test Coverage
- ✅ **24 Tests – alle bestanden**
- ✅ **100% Coverage** (Statements, Branches, Functions, Lines)
- Test-Gruppen: Card (12), CardHeader (3), CardBody (3), CardFooter (3), Card Compound (3)
- Getestet: Variants, Hoverable, Ref-Forwarding, className-Merging, HTML-Attributes, CSS Custom Properties, Accessibility

### Accessibility
- ✅ HTML-Attribute Forwarding (role, aria-label, aria-labelledby)
- ✅ Semantische Struktur (flex-col Layout mit Header/Body/Footer)
- ✅ Ref-Forwarding auf alle Sub-Components
- ✅ Getestet mit role="article" + aria-labelledby Pattern

### Storybook
- **URL:** http://localhost:6006/?path=/story/organisms-card
- **Stories:** Flat, Raised, Elevated, AllElevations, AllPaddings, WithFooter, InteractiveCard, CombinedVariants
- **Training Analyzer Stories:** WorkoutSessionCard, WeeklySummaryCard, MetricDisplayCard
- **Controls:** elevation, padding, hoverable
- **Docs:** Auto-generated via autodocs tag + Accessibility-Hinweise

### Notes
- Compound Component Pattern: Alle 4 Komponenten in einer Datei (Card.tsx)
- Alle Sub-Components nutzen `React.forwardRef` mit `displayName`
- CardBody hat `flex-1` für flexible Höhe
- CardFooter hat `flex items-center` für Action-Layout
- `transition-shadow` auf Card für smooth Elevation-Wechsel und Hover-Effekt
- Flat = kein Border, kein Shadow (clean surface)
- Raised/Elevated = Border + Shadow-Hierarchie (sm → lg)
- Shadows nutzen Tailwind Utilities statt CSS Custom Properties (Komma-Problem bei compound shadows)

### Breaking Changes
- **v2:** Border nur noch bei raised/elevated (flat hat keinen Border mehr)
- **v2:** Background jetzt `bg-white` statt `bg-[var(--color-card-bg)]`
- **v2:** Shadows nutzen Tailwind Utilities statt Token-basierte CSS Custom Properties

### Issues / Todos
- [x] ~~Add hoverable variant für klickbare Cards~~
- [ ] Add `as` prop für polymorphe Nutzung (z.B. als `<a>`)
- [ ] Add CardDivider Sub-Component

---

## [Badge] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color (pro Variant success/warning/error/info/neutral):**
  - `color-badge-{variant}-bg` → L3 `color.{variant}.bg` (neutral: `color.neutral.1.100`)
  - `color-badge-{variant}-text` → L3 `color.{variant}.text` (neutral: `color.text.muted`)
  - `color-badge-{variant}-border` → L3 `color.{variant}.border` (neutral: `color.border.muted`)
  - **15 Color-Tokens insgesamt** (3 pro Variant × 5 Variants)
- **Level 4 (Semantic) – Sizing (pro Size sm/md/lg):**
  - `sizing-badge-{size}-padding-x` → L3 `sizing.component.padding-x.*`
  - `sizing-badge-{size}-padding-y` → L3 `sizing.component.padding-y.*`
  - `sizing-badge-{size}-font-size` → L3 `font.component.size.*`
  - **9 Sizing-Tokens insgesamt** (3 pro Size × 3 Sizes)
- **Level 4 (Semantic) – Radius:**
  - `radius-badge` → L3 `radius.component.full` (Pill Shape)
- **25 Tokens insgesamt** – alle referenzieren ausschließlich L3

### Files
- `packages/components/src/atoms/Badge/Badge.tsx`
- `packages/components/src/atoms/Badge/Badge.test.tsx` (15 Tests)
- `packages/components/src/atoms/Badge/Badge.stories.tsx` (12 Stories)
- `packages/components/src/atoms/Badge/index.ts`
- `packages/tokens/src/semantic/badge.json`

### Variants (CVA)
- **variant:** success, warning, error, info, neutral (default)
- **size:** sm, md (default), lg

### Design Decisions
- **Pill Shape:** `rounded-full` via `radius.component.full` (9999px) für weiche Form
- **Inline-fähig:** `inline-flex` + `leading-none` für Fließtext-Kompatibilität
- **Subtiler Border:** Alle Variants haben border für klare Abgrenzung
- **Nicht interaktiv:** Kein hover/focus/click – rein dekorativ/informativ
- **`<span>` statt `<div>`:** Semantisch korrekt für Inline-Elemente

### Test Coverage
- ✅ **15 Tests – alle bestanden**
- ✅ **100% Coverage** (Statements, Branches, Functions, Lines)
- Getestet: Alle 5 Variants, alle 3 Sizes, Ref-Forwarding, className-Merging, HTML-Attributes, Inline-Display, Border

### Accessibility
- ✅ HTML-Attribute Forwarding (role, aria-label)
- ✅ `role="status"` empfohlen für dynamische Updates
- ✅ Semantisches `<span>` Element
- ✅ Min. 4.5:1 Kontrast durch L3 Color Tokens (text auf bg)

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-badge
- **Stories:** Success, Warning, Error, Info, Neutral, AllVariants, AllSizes, InlineUsage
- **Training Analyzer Stories:** TrainingStatus, HeartRateZones, WorkoutTypes, InlineMetrics
- **Controls:** variant, size
- **Docs:** Auto-generated via autodocs tag

### Notes
- Nordisches Design: Subtile Backgrounds, gedämpfte Farben, klare Typografie
- Color Tokens nutzen L3 status colors (`color.success/warning/error/info.*`)
- Neutral nutzt `color.neutral.1.100` / `color.text.muted` / `color.border.muted`
- `text-[length:var(...)]` Syntax für font-size (Tailwind length-Prefix)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add icon support (leftIcon)
- [ ] Add dismissible variant (mit X-Button)
- [ ] Add dot indicator variant (ohne Text)

---

## [Table] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Organism

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-table-header-bg` → L3 `color.bg.surface`
  - `color-table-header-text` → L3 `color.text.base`
  - `color-table-border` → L3 `color.border.muted`
  - `color-table-row-stripe` → L3 `color.neutral.1.50`
  - `color-table-row-hover` → L3 `color.neutral.1.100`
- **Level 4 (Semantic) – Spacing (pro Density compact/normal/spacious):**
  - `spacing-table-cell-x-{density}` → L3 `sizing.component.padding-x.*`
  - `spacing-table-cell-y-{density}` → L3 `sizing.component.padding-y.*`
  - **6 Spacing-Tokens insgesamt** (2 pro Density × 3)
- **11 Tokens insgesamt** – alle referenzieren ausschließlich L3

### Architecture
- **Density via CSS Custom Properties:** Table setzt `--_table-px` und `--_table-py` per `style`, Kinder referenzieren diese
- **Striped via data-attribute:** `data-striped` auf `<table>`, Rows nutzen `[[data-striped]_&:nth-child(even)]`
- **Semantic HTML:** `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`

### Files
- `packages/components/src/organisms/Table/Table.tsx` (6 Compound Components)
- `packages/components/src/organisms/Table/Table.test.tsx` (34 Tests)
- `packages/components/src/organisms/Table/Table.stories.tsx` (7 Stories)
- `packages/components/src/organisms/Table/index.ts`
- `packages/tokens/src/semantic/table.json`

### Components
- **Table** – Wrapper: `overflow-x-auto` div + `<table>`, Props: density, striped
- **TableHeader** – `<thead>`: sticky top-0, header background
- **TableBody** – `<tbody>`: last-row border removal
- **TableRow** – `<tr>`: border-b, hover state, striped support
- **TableHead** – `<th>`: font-semibold, align (left/center/right)
- **TableCell** – `<td>`: align, numeric (right-align + tabular-nums)

### Props
- **Table:** density (compact/normal/spacious), striped (boolean)
- **TableRow:** hoverable (boolean, default true)
- **TableHead:** align (left/center/right)
- **TableCell:** align (left/center/right), numeric (boolean → right-align + tabular-nums)

### Test Coverage
- ✅ **34 Tests – alle bestanden**
- ✅ **100% Coverage** (Statements, Branches, Functions, Lines)
- Test-Gruppen: Table (9), TableHeader (4), TableBody (2), TableRow (4), TableHead (7), TableCell (6), Compound (2)
- Getestet: Density CSS Props, Striped, Hover, Alignment, Numeric, Semantic HTML, Ref-Forwarding, Accessibility

### Accessibility
- ✅ Semantic HTML: proper `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- ✅ `scope="col"` Support auf TableHead
- ✅ `aria-label` auf Table
- ✅ Hoverable rows mit `transition-colors`

### Storybook
- **URL:** http://localhost:6006/?path=/story/organisms-table
- **Stories:** Basic, Striped, AllDensities
- **Training Analyzer Stories:** LapAnalysis, WeeklyLog (mit Badges), HeartRateZones (mit Badges), Interactive
- **Controls:** density, striped
- **Docs:** Auto-generated via autodocs tag

### Notes
- Density wird per CSS Custom Properties (`--_table-px`, `--_table-py`) auf dem Table-Element gesetzt
- Kinder (TableHead, TableCell) referenzieren `var(--_table-px/py)` – kein Context nötig
- Striped nutzt `data-striped` Attribut + Tailwind arbitrary variant `[[data-striped]_&:nth-child(even)]`
- `numeric` Prop auf TableCell: automatisch `text-right` + `tabular-nums` (monospace Ziffern)
- Badge Component in Stories integriert (WorkoutTypes, HR Zones, Trends)
- Conditional Styling via className (z.B. HF Max > 180 → error-text)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add sortable columns (click to sort)
- [ ] Add TableCaption sub-component
- [ ] Add row selection (checkbox column)
- [ ] Add empty state (no data message)

---

## Planned Components

### High Priority (Training Analyzer Essentials)

#### [Input / InputField] - Planned
**Level:** Atom / Molecule  
**Priority:** ⭐ MEDIUM  
**Use Case:** Forms for training plan adjustments

### Medium Priority (Design System Completion)

#### [Icon] - Planned
**Level:** Atom  
**Use Case:** Visual indicators throughout UI

#### [Spinner] - Planned
**Level:** Atom  
**Use Case:** Loading states

#### [Tooltip] - Planned
**Level:** Atom  
**Use Case:** Contextual help

#### [Select] - Planned
**Level:** Molecule  
**Use Case:** Dropdowns for filters/options

#### [Modal] - Planned
**Level:** Organism  
**Use Case:** Dialogs, confirmations

---

## Development Statistics

**Total Components:** 4 (4 complete)
**Atoms:** 2 (Button, Badge)
**Molecules:** 0
**Organisms:** 2 (Card, Table)
**Templates:** 0

**Test Infrastructure:** ✅ Vitest + Testing Library + jsdom + Coverage
**Test Coverage:** Table 100% | Badge 100% | Card 100% | Button: Tests ausstehend
**A11y Compliance:** Table + Badge + Card getestet | Button: nur manuell geprüft
**Storybook Stories:** 34 Stories (Button: 4, Card: 11, Badge: 12, Table: 7)
**Design Tokens:** 65+ L4-Tokens (Button: 18 Sizing + Color | Card: 6 + TW | Badge: 25 | Table: 11)

---

## Notes & Learnings

### 2026-02-12 - Initial Setup
- Tailwind v4 doesn't work well with Storybook → Switched to v3 + PostCSS
- Content path in tailwind.config.js needs to be relative from storybook package
- CSS Variables must be imported in preview.ts for Storybook

### 2026-02-13 - Documentation
- Added comprehensive project rules (PROJEKT_REGELN.md)
- Created deep-dive docs (ARCHITECTURE.md, TOKEN_GUIDELINES.md, COMPONENT_GUIDELINES.md)
- Established development log workflow similar to training plan

### 2026-02-13 - Card Component & Test-Infrastruktur
- Card als erstes Organism-Component gebaut (Compound Pattern)
- Vitest + Testing Library Infrastruktur aufgesetzt (`vitest.config.ts`, `test-setup.ts`)
- 21 Tests mit 100% Coverage auf Card.tsx
- **Learnings:**
  - `ref` ist ein reserviertes React-Prop – nicht in Daten-Objekte packen und spreaden
  - `@vitest/coverage-v8` Major-Version muss zu `vitest` passen (v1 ↔ v1, nicht v4)
  - Tailwind `text-[length:var(...)]` Syntax nötig für font-size mit CSS Custom Properties
  - Token-Collisions bei `$description` Metadaten sind harmlos (gleiche Namespace-Beschreibungen)

### 2026-02-13 - Card Styling Verbesserung
- Border nur bei raised/elevated – flat ist borderless für clean surface
- Shadow-Hierarchie: flat (none) → raised (shadow-sm) → elevated (shadow-lg)
- Hoverable Variant: `cursor-pointer hover:shadow-xl` für klickbare Cards
- **Learnings:**
  - Tailwind `shadow-[var(...)]` funktioniert NICHT mit compound shadows (Kommas) → Tailwind Utilities nutzen
  - `bg-white` statt Token für besseren Kontrast auf farbigen Hintergründen

### 2026-02-13 - Table Component
- Table als zweites Organism (6 Compound Components)
- Density-System via CSS Custom Properties statt React Context
- Striped Rows via `data-striped` Attribut + Tailwind arbitrary variant
- Badge-Integration in Stories (WorkoutTypes, HR Zones)
- **Learnings:**
  - CSS Custom Properties auf Parent-Element setzen, Kinder referenzieren → kein Context nötig
  - `[[data-striped]_&:nth-child(even)]` Tailwind arbitrary variant für conditional child styling
  - `tabular-nums` für monospace-Ziffern in numerischen Spalten
  - `sticky top-0 z-10` für fixierten Table-Header beim Scrollen

---

**Last Updated:** 2026-02-13
**Next Component:** Input / Select (siehe Planned Components)
