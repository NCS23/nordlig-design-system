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
  - `color-table-header-bg` → L3 `color.bg.base`
  - `color-table-header-text` → L3 `color.text.base`
  - `color-table-border` → L3 `color.border.muted`
  - `color-table-row-stripe` → L3 `color.neutral.1.50`
  - `color-table-row-hover` → L3 `color.neutral.1.100`
- **Level 4 (Semantic) – Spacing (pro Density compact/normal/spacious):**
  - `spacing-table-cell-x-{density}` → L3 `spacing.component.padding.*` (16/24/32px)
  - `spacing-table-cell-y-{density}` → L3 `spacing.component.padding.*` (12/16/24px)
  - `spacing-table-head-y-{density}` → L3 `spacing.component.padding.*` (8/8/12px – kompakter als Body!)
  - **9 Spacing-Tokens insgesamt** (3 pro Density × 3 Properties)
- **Neue L3 Tokens:** `spacing.component.padding.xs` (8px), `spacing.component.padding.xl` (32px)
- **14 Tokens insgesamt** (5 Color + 9 Spacing) – alle referenzieren ausschließlich L3

### Architecture
- **Density via CSS Custom Properties:** Table setzt `--tbl-px`, `--tbl-py`, `--tbl-head-py` per `style`, Kinder referenzieren diese
- **Compact Header:** TableHead nutzt separates `--tbl-head-py` – WENIGER Padding als Body für flachen, eleganten Header
- **Striped via data-attribute:** `data-striped` auf `<table>`, Rows nutzen `[[data-striped]_&:nth-child(even)]`
- **Semantic HTML:** `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`

### Files
- `packages/components/src/organisms/Table/Table.tsx` (6 Compound Components)
- `packages/components/src/organisms/Table/Table.test.tsx` (35 Tests)
- `packages/components/src/organisms/Table/Table.stories.tsx` (7 Stories)
- `packages/components/src/organisms/Table/index.ts`
- `packages/tokens/src/semantic/table.json`

### Components
- **Table** – Wrapper: `overflow-x-auto` div + `<table>`, Props: density, striped, `leading-relaxed`
- **TableHeader** – `<thead>`: sticky top-0, header background
- **TableBody** – `<tbody>`: last-row border removal
- **TableRow** – `<tr>`: border-b, hover state, striped support
- **TableHead** – `<th>`: font-medium, uppercase, tracking-wider, text-xs, align (left/center/right)
- **TableCell** – `<td>`: align, numeric (right-align + tabular-nums)

### Props
- **Table:** density (compact/normal/spacious), striped (boolean)
- **TableRow:** hoverable (boolean, default true)
- **TableHead:** align (left/center/right)
- **TableCell:** align (left/center/right), numeric (boolean → right-align + tabular-nums)

### Test Coverage
- ✅ **35 Tests – alle bestanden**
- ✅ **100% Coverage** (Statements, Branches, Functions, Lines)
- Test-Gruppen: Table (11), TableHeader (4), TableBody (2), TableRow (4), TableHead (7), TableCell (6), Compound (2)
- Getestet: Density CSS Props (inkl. head-py), leading-relaxed, Striped, Hover, Alignment, Numeric, Semantic HTML, Ref-Forwarding, Accessibility

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
- **Scandinavian Spacing Redesign:** Von tight Button-Spacing auf großzügiges `spacing.component.padding.*` (12/16/24px) gewechselt
- **Compact Header:** Header-Padding (8/8/12px) ist KLEINER als Body (12/16/24px) – Zeitungsstil
- **Header Typography:** font-medium + uppercase + tracking-wider + text-xs – subtil aber klar strukturiert
- **Header Background:** `color.bg.base` (slate-50, fast unsichtbar) statt `color.bg.surface` (slate-100)
- Density wird per CSS Custom Properties (`--tbl-px`, `--tbl-py`, `--tbl-head-py`) auf dem Table-Element gesetzt
- Kinder referenzieren: TableHead → `--tbl-head-py`, TableCell → `--tbl-py` (shared: `--tbl-px`)
- Striped nutzt `data-striped` Attribut + Tailwind arbitrary variant `[[data-striped]_&:nth-child(even)]`
- `numeric` Prop auf TableCell: automatisch `text-right` + `tabular-nums` (monospace Ziffern)
- Badge Component in Stories integriert (WorkoutTypes, HR Zones, Trends)
- Conditional Styling via className (z.B. HF Max > 180 → error-text)

### Breaking Changes
- **v2:** Spacing-Tokens referenzieren jetzt `spacing.component.padding.*` statt `sizing.component.padding-*.*`
- **v2:** 3 neue `head-y` Tokens für separates Header-Padding
- **v2:** Neue L3 Tokens: `spacing.component.padding.xs` (8px) + `spacing.component.padding.xl` (32px)
- **v2:** `leading-relaxed` auf Table für bessere Lesbarkeit
- **v3:** CSS Custom Properties umbenannt: `--_table-*` → `--tbl-*` (Tailwind Underscore-Bug)
- **v3:** Header-Background von `color.bg.surface` auf `color.bg.base` (subtiler)
- **v3:** Header-Padding invertiert: jetzt KLEINER als Body (8/8/12px statt 16/24/32px)
- **v3:** TableHead Typography: `font-semibold` → `font-medium` + `uppercase` + `tracking-wider` + `text-xs`

### Issues / Todos
- [ ] Add sortable columns (click to sort)
- [ ] Add TableCaption sub-component
- [ ] Add row selection (checkbox column)
- [ ] Add empty state (no data message)

---

## [Input] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color (bereits vorhanden):**
  - `color-input-bg` → L3 `color.bg.base`
  - `color-input-bg-disabled` → L3 `color.neutral.1.100`
  - `color-input-text` → L3 `color.text.base`
  - `color-input-text-placeholder` → L3 `color.text.muted`
  - `color-input-border` → L3 `color.border.default`
  - `color-input-border-hover` → L3 `color.border.strong`
  - `color-input-border-focus` → L3 `color.border.focus`
  - `color-input-border-error` → L3 `color.border.error`
- **Level 4 (Semantic) – Sizing (neu, pro Size sm/md/lg):**
  - `sizing-input-{size}-height` → L3 `sizing.component.height.{size}` (36/40/44px – matches Button!)
  - `sizing-input-{size}-font-size` → L3 `font.component.size.{size}`
  - `sizing-input-{size}-radius` → L3 `radius.component.md` (6px)
  - **9 Sizing-Tokens insgesamt** (3 pro Size × 3 Properties)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-input-padding-x` → L3 `spacing.component.padding.md` (16px)
  - `spacing-input-padding-y` → L3 `spacing.component.padding.sm` (12px)
- **19 Tokens insgesamt** (8 Color + 9 Sizing + 2 Spacing) – alle referenzieren ausschließlich L3

### Files
- `packages/components/src/atoms/Input/Input.tsx`
- `packages/components/src/atoms/Input/Input.test.tsx` (31 Tests)
- `packages/components/src/atoms/Input/Input.stories.tsx` (8 Stories)
- `packages/components/src/atoms/Input/index.ts`
- `packages/tokens/src/semantic/input.json`

### Variants (CVA)
- **inputSize:** sm, md (default), lg – Heights match Button sizes!
- **error:** boolean (red border + red focus ring)
- **disabled:** native HTML attribute (gray bg, no-cursor)
- **type=password:** Automatischer Eye/EyeOff Toggle Button (Lucide React)

### Test Coverage
- ✅ **31 Tests – alle bestanden**
- ✅ **100% Coverage**
- Getestet: Alle 3 Sizes, Error State, Disabled, ARIA attributes, Focus Ring, Hover, Placeholder, Type, Ref-Forwarding, User Input, Password Toggle (10 Tests)

### Accessibility
- ✅ `aria-invalid` automatisch bei error=true
- ✅ Focus Ring (ring-2 + ring-offset-1 + sky blue)
- ✅ Disabled State (cursor-not-allowed + visuelles Feedback)
- ✅ Placeholder Color Token (muted, nicht zu dunkel)
- ✅ Password Toggle: `aria-label="Show/Hide password"`

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-input
- **Stories:** Default, WithValue, Error, Disabled, AllSizes, InputTypes, States, Password Toggle
- **Controls:** inputSize, error, disabled, type

### Notes
- `inputSize` statt `size` als Prop-Name (Konflikt mit HTML `size` Attribut)
- Heights exakt gleich wie Button (36/40/44px) für Inline-Formulare
- Error-State: subtiles Rot – Border + Focus Ring werden rot, nicht der Background
- Disabled: grauer Background, kein Hover-Effekt
- **Background: `bg-white`** statt Token für klare Papier-Optik auf farbigem Page BG (wie Card)
- **Password Toggle:** Automatisch bei `type="password"` – Eye/EyeOff Icons (Lucide React), `tabIndex={-1}` auf Button
- **Dependency:** `lucide-react` für Eye/EyeOff Icons

### Breaking Changes
- **v2:** Background von `bg-[var(--color-input-bg)]` auf `bg-white` geändert (Papier-Look)

### Issues / Todos
- [ ] Add suffix/prefix support (z.B. "min/km", "bpm")
- [ ] Add textarea variant für mehrzeiligen Text

---

## [InputField] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Composition
- **Label** → `<label>` mit `htmlFor` Verknüpfung
- **Input** → Atom `<Input>` Component
- **Helper Text** → `<p>` mit muted Color
- **Error Message** → `<p>` mit error Color + `role="alert"`

### Files
- `packages/components/src/molecules/InputField/InputField.tsx`
- `packages/components/src/molecules/InputField/InputField.test.tsx` (18 Tests)
- `packages/components/src/molecules/InputField/InputField.stories.tsx` (11 Stories)
- `packages/components/src/molecules/InputField/index.ts`

### Props
- **label:** string – Erzeugt `<label>` mit `htmlFor`
- **helperText:** string – Subtiler Hilfetext unter dem Input
- **errorMessage:** string – Rot, ersetzt helperText, setzt error=true
- **error:** boolean – Error-State ohne Message
- Plus alle Input-Props (inputSize, type, placeholder, etc.)

### Test Coverage
- ✅ **18 Tests – alle bestanden**
- ✅ **100% Coverage**
- Getestet: Label-Linking, Helper Text, Error Message, ARIA describedby, Error Priority über Helper, Size Passthrough, Ref-Forwarding, Custom ID, className auf Wrapper

### Accessibility
- ✅ `<label htmlFor>` automatisch verknüpft
- ✅ `aria-describedby` zeigt auf Helper oder Error
- ✅ `aria-invalid` bei Error
- ✅ `role="alert"` auf Error Message (Screen Reader Announcement)
- ✅ Error Message ersetzt Helper (nicht beides gleichzeitig)
- ✅ Auto-generierte IDs via `React.useId()` wenn keine `id` Prop

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-inputfield
- **Stories:** Default, WithHelper, WithError, AllSizes, DisabledField
- **Training Analyzer Stories:** GoalPace, MaxHR, MaxHRError, DateFilter, InlineWithButton
- **Controls:** inputSize, error, disabled

### Notes
- Erste Molecule-Component im Design System
- Error Message hat Vorrang über Helper Text (nur eins wird angezeigt)
- `React.useId()` für automatische ID-Generierung wenn keine `id` Prop
- InlineWithButton Story zeigt Input + Button nebeneinander (gleiche Höhe!)
- Label nutzt `font-medium` + `text-sm` für klare Lesbarkeit

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add required indicator (*) auf Label
- [ ] Add character count für Textareas

---

## Planned Components

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

**Total Components:** 6 (6 complete)
**Atoms:** 3 (Button, Badge, Input)
**Molecules:** 1 (InputField)
**Organisms:** 2 (Card, Table)
**Templates:** 0

**Test Infrastructure:** ✅ Vitest + Testing Library + jsdom + Coverage
**Test Coverage:** Input 100% | InputField 100% | Table 100% | Badge 100% | Card 100% | Button: Tests ausstehend
**A11y Compliance:** Input + InputField + Table + Badge + Card getestet | Button: nur manuell geprüft
**Storybook Stories:** 53 Stories (Button: 4, Card: 11, Badge: 12, Table: 7, Input: 8, InputField: 11)
**Design Tokens:** 87+ L4-Tokens (Button: 18 Sizing + Color | Card: 6 + TW | Badge: 25 | Table: 14 | Input: 19) + 2 L3 Tokens
**Total Tests:** 123

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
  - CSS Custom Properties auf Parent-Element setzen (`--tbl-*`), Kinder referenzieren → kein Context nötig
  - `[[data-striped]_&:nth-child(even)]` Tailwind arbitrary variant für conditional child styling
  - `tabular-nums` für monospace-Ziffern in numerischen Spalten
  - `sticky top-0 z-10` für fixierten Table-Header beim Scrollen

### 2026-02-13 - Table Spacing Redesign ("Scandinavian Whitespace")
- Von tight Button-Spacing auf großzügiges Component-Padding gewechselt
- Separates Header-Padding für visuellen Hierarchie-Unterschied
- L3 Token `spacing.component.padding.xl` (32px) für spacious Density erstellt
- `leading-relaxed` für besseren vertikalen Rhythm
- **Learnings:**
  - `sizing.component.padding-y.*` (6/8/10px) ist für Buttons, nicht für Tabellen!
  - `spacing.component.padding.*` (12/16/24px) ist besser für Inhalts-Components
  - Header braucht eigene vertikale Padding-Tokens für klare Hierarchie
  - "Scandinavian Design" = Minimum 2× mehr vertikaler Raum als man denkt

### 2026-02-13 - Tailwind v3 Underscore-Bug Fix
- **KRITISCH:** Tailwind v3 konvertiert `_` zu Leerzeichen in Arbitrary Values `[...]`
- `px-[var(--_table-px)]` generiert `padding-left: var(-- table-px)` → BROKEN!
- Das bedeutet: Table-Padding hat seit Erstellung NIE funktioniert
- Fix: Alle `--_table-*` → `--tbl-*` umbenannt (keine Underscores nach `--`)
- **Learnings:**
  - Niemals Underscores in CSS Custom Property Namen verwenden, die in Tailwind Arbitrary Values stehen
  - Debug-Methode: Tailwind Output direkt bauen und CSS inspizieren (`npx tailwindcss -o /tmp/debug.css`)
  - Kurze Prefixe nutzen: `--tbl-*`, `--btn-*`, `--crd-*` statt `--_table-*`, `--_button-*`

### 2026-02-13 - Table Header Redesign ("Newspaper-Style")
- Header war zu dominant: zu viel Padding + zu dunkler Background = dicker Balken
- Komplett invertiert: Header jetzt KOMPAKTER als Body (8px vs 16px bei normal)
- Background: `color.bg.base` (slate-50, fast unsichtbar) statt `color.bg.surface` (slate-100)
- Typography: `font-medium` + `uppercase` + `tracking-wider` + `text-xs`
- Neuer L3 Token: `spacing.component.padding.xs` (8px) für kompakte Header
- **Learnings:**
  - Header-Dominanz kommt durch Padding + Background Kombination – beides reduzieren!
  - Zeitungsstil: Struktur durch Typografie (uppercase, tracking) nicht durch Hintergrundfarbe
  - Header KLEINER als Body = elegantere Hierarchie (invertiertes Padding-Verhältnis)
  - "Weniger ist mehr" gilt besonders für Table Headers im nordischen Design

### 2026-02-13 - Input Improvements (White BG + Password Toggle)
- Background von Token (`color.bg.base` = slate-50) auf `bg-white` geändert – klare Papier-Optik
- Password Toggle: Eye/EyeOff Icons bei `type="password"` automatisch
- `lucide-react` als Dependency hinzugefügt
- 10 neue Tests für Password Toggle
- **Learnings:**
  - Gleiche bg-white Strategie wie Card – Token-BG (slate-50) ist auf slate-50 Page unsichtbar
  - `tabIndex={-1}` auf Toggle Button – Focus soll auf dem Input bleiben
  - Password Toggle als Teil des Input (nicht InputField) – funktioniert auch ohne Label

### 2026-02-13 - Input + InputField Components
- Input als dritter Atom (CVA, 3 Sizes matching Button)
- InputField als erste Molecule (Label + Input + Helper + Error)
- 19 L4 Tokens (8 Color bereits vorhanden, 9 Sizing + 2 Spacing neu)
- 39 Tests (21 Input + 18 InputField), alle bestanden
- **Learnings:**
  - `inputSize` statt `size` als Prop-Name (HTML `size` Attribut Konflikt!)
  - `React.useId()` für automatische ID-Generierung in Molecules
  - Error Message hat Vorrang über Helper Text – nur eins anzeigen
  - `role="alert"` auf Error Messages für Screen Reader Announcements
  - Input + Button gleiche Heights ermöglicht saubere Inline-Formulare

---

**Last Updated:** 2026-02-13
**Next Component:** Select / Icon (siehe Planned Components)
