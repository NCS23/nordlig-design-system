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

## [DatePicker] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-datepicker-popover-bg` → `#ffffff` (White popover)
  - `color-datepicker-popover-border` → L3 `color.border.muted`
  - `color-datepicker-header-text` → L3 `color.text.base`
  - `color-datepicker-weekday-text` → L3 `color.text.muted`
  - `color-datepicker-day-text` → L3 `color.text.base`
  - `color-datepicker-day-hover-bg` → L3 `color.neutral.1.100`
  - `color-datepicker-day-selected-bg` → L3 `color.bg.primary` (Sky Blue!)
  - `color-datepicker-day-selected-text` → L3 `color.text.inverse`
  - `color-datepicker-day-today-border` → L3 `color.border.focus` (Sky Blue Ring)
  - `color-datepicker-day-disabled-text` → L3 `color.text.disabled`
  - `color-datepicker-nav-hover-bg` → L3 `color.neutral.1.100`
- **Level 4 (Semantic) – Shadow:**
  - `shadow-datepicker-popover` → L3 `shadow.elevation.medium`
- **Level 4 (Semantic) – Radius:**
  - `radius-datepicker-popover` → L3 `radius.component.lg` (8px)
  - `radius-datepicker-day` → L3 `radius.component.md` (6px)
- **Level 4 (Semantic) – Sizing:**
  - `sizing-datepicker-day-size` → 36px (day cell width/height)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-datepicker-popover-padding` → L3 `spacing.component.padding.md` (16px)
  - `spacing-datepicker-grid-gap` → L3 `spacing.component.gap.sm` (8px)
- **17 Tokens insgesamt** (11 Color + 1 Shadow + 2 Radius + 1 Sizing + 2 Spacing)

### Architecture
- **Radix UI Popover** für Overlay-Verhalten (Portal, Positioning, Focus Management)
- **Custom Calendar Grid** statt externes Lib – volle Design-Kontrolle
- **date-fns** für Datumslogik (startOfMonth, eachDayOfInterval, format, parse)
- **German Locale** (de) – Monatsnamen deutsch, Wochenstart Montag
- **Dual Input:** Textfeld (DD.MM.YYYY) + Kalender-Popover
- **Popover.Anchor** statt Popover.Trigger – Input bleibt beschreibbar bei offenem Popover
- **onOpenAutoFocus prevented** – Fokus bleibt auf Input, nicht auf Kalender

### Components
- **Calendar** – Standalone grid: Month navigation, weekday headers, day cells
- **DatePicker** – Composite: Input + Calendar Icon Button + Popover + Calendar

### Files
- `packages/components/src/molecules/DatePicker/Calendar.tsx`
- `packages/components/src/molecules/DatePicker/DatePicker.tsx`
- `packages/components/src/molecules/DatePicker/DatePicker.test.tsx` (39 Tests)
- `packages/components/src/molecules/DatePicker/DatePicker.stories.tsx` (10 Stories)
- `packages/components/src/molecules/DatePicker/index.ts`
- `packages/tokens/src/semantic/datepicker.json`

### Props – DatePicker
- **value:** Date | undefined – Selected date
- **onChange:** (date: Date | undefined) => void
- **placeholder:** string (default: 'TT.MM.JJJJ')
- **inputSize:** sm | md | lg – Same as Input/Button
- **error:** boolean
- **disabled:** boolean
- **minDate / maxDate:** Date constraints
- **name / id / aria-label:** Form integration

### Props – Calendar
- **selected:** Date | undefined
- **month:** Date (currently displayed month)
- **onSelect / onMonthChange:** Callbacks
- **minDate / maxDate:** Date constraints

### Test Coverage
- ✅ **39 Tests – alle bestanden**
- ✅ **100% Coverage**
- **Calendar Tests (20):** Grid rendering, German month names, weekday headers (Mo-So), month navigation, day selection, aria-selected, disabled outside-month days, min/max date constraints, today highlighting, selected styling, day-size token, popover-padding token, className, ref forwarding
- **DatePicker Tests (19):** Placeholder, calendar icon button, formatted display, error/disabled states, aria-label/haspopup/expanded, onChange on typing, onChange on clear, popover open/close, day selection from popover, month navigation in popover, ref forwarding, id passthrough, custom className, disabled popover prevention

### Accessibility
- ✅ `role="grid"` auf Calendar mit `aria-label` (Monatsname)
- ✅ `role="columnheader"` auf Wochentag-Labels
- ✅ `role="gridcell"` auf Day-Buttons
- ✅ `aria-selected` auf ausgewähltem Tag
- ✅ `aria-disabled` auf deaktivierten Tagen
- ✅ `aria-haspopup="dialog"` auf Input
- ✅ `aria-expanded` auf Input (popover state)
- ✅ `aria-label="Datum auswählen"` (default) auf Input
- ✅ `aria-label="Kalender öffnen"` auf Icon Button
- ✅ `aria-label="Vorheriger/Nächster Monat"` auf Nav Buttons
- ✅ `aria-live="polite"` auf Monat/Jahr Anzeige
- ✅ Keyboard Navigation: Arrow keys für Tagesauswahl

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-datepicker
- **DatePicker Stories:** Default, WithValue, Error, Disabled, MinMaxDates, AllSizes, States, TrainingAnalyzer
- **Calendar Stories:** CalendarDefault, CalendarWithSelection, CalendarWithConstraints
- **Controls:** inputSize, error, disabled

### Notes
- **German Format:** DD.MM.YYYY (nicht ISO 8601) – `date-fns` parse/format
- **Dual Entry:** Tippen (DD.MM.YYYY) ODER Kalender-Click
- **Input bleibt fokussiert** bei offenem Popover (onOpenAutoFocus prevented)
- **Calendar Icon als Button** (nicht span) – klickbar, mit aria-label
- **Dependencies:** `@radix-ui/react-popover`, `date-fns`, `lucide-react`
- **Popover.Anchor** statt Popover.Trigger vermeidet Focus-Stealing beim Tippen
- **Hidden Input** für Form-Submission (ISO format: yyyy-MM-dd)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [x] ~~Add date range picker variant (von-bis)~~ → DateRangePicker
- [ ] Add time picker option (Datum + Uhrzeit)
- [ ] Add keyboard shortcut "T" für heute
- [ ] Add "Heute" Button im Kalender-Footer

---

## [DateRangePicker] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Architecture
- Extended Calendar with `mode="range"` prop, `selectedRange`, `onRangeSelect`
- Two inputs (Von/Bis) + shared Calendar popover
- Popover closes after range is complete (both from and to selected)
- Range visual highlighting: start/end = sky-500, in-between = sky-100

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-datepicker-day-range-bg` → L3 `color.primary.1.100` (sky-100 for range middle days)

### Files
- `packages/components/src/molecules/DatePicker/DateRangePicker.tsx`
- `packages/components/src/molecules/DatePicker/DateRangePicker.test.tsx` (29 Tests)
- `packages/components/src/molecules/DatePicker/DatePicker.stories.tsx` (updated with range stories)
- `packages/components/src/molecules/DatePicker/Calendar.tsx` (extended with range mode)

### Test Coverage
- ✅ **29 Tests – alle bestanden**
- Calendar Range (12): first click, second click, swap when reversed, new range, highlighting, aria-selected, same-day
- DateRangePicker (17): inputs, placeholders, calendar icon, formatted display, error/disabled, popover, typing

### Accessibility
- ✅ `aria-label="Startdatum"` / `aria-label="Enddatum"` on inputs
- ✅ `aria-selected` on range days
- ✅ Range highlighting with distinct colors (start/end vs middle)

---

## [Select / Combobox / MultiSelect] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (22 tokens):**
  - `color-select-trigger-bg` → `#ffffff` (white, matches Input)
  - `color-select-trigger-text` → L3 `color.text.base`
  - `color-select-trigger-placeholder` → L3 `color.text.muted`
  - `color-select-trigger-border` → L3 `color.border.default`
  - `color-select-trigger-border-hover` → L3 `color.border.strong`
  - `color-select-trigger-border-focus` → L3 `color.border.focus`
  - `color-select-trigger-border-error` → L3 `color.border.error`
  - `color-select-trigger-disabled-bg` → L3 `color.neutral.1.100`
  - `color-select-icon` → L3 `color.text.muted`
  - `color-select-icon-hover` → L3 `color.text.base`
  - `color-select-popover-bg` → `#ffffff`
  - `color-select-popover-border` → L3 `color.border.muted`
  - `color-select-item-text` → L3 `color.text.base`
  - `color-select-item-hover-bg` → L3 `color.neutral.1.100`
  - `color-select-item-selected-bg` → L3 `color.primary.1.50` (sky-50)
  - `color-select-item-selected-text` → L3 `color.text.primary` (sky-600)
  - `color-select-item-disabled-text` → L3 `color.text.disabled`
  - `color-select-check-icon` → L3 `color.bg.primary` (sky-500)
  - `color-select-group-label` → L3 `color.text.muted`
  - `color-select-separator` → L3 `color.border.muted`
  - `color-select-search-bg` → L3 `color.neutral.1.50`
  - `color-select-empty-text` → L3 `color.text.muted`
- **Level 4 (Semantic) – Shadow:**
  - `shadow-select-popover` → L3 `shadow.elevation.medium`
- **Level 4 (Semantic) – Radius:**
  - `radius-select-popover` → L3 `radius.component.lg` (8px)
  - `radius-select-item` → L3 `radius.component.md` (6px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-select-popover-padding` → L3 `spacing.component.padding.xs` (8px)
  - `spacing-select-item-padding-x` → L3 `spacing.component.padding.sm` (12px)
  - `spacing-select-item-padding-y` → L3 `spacing.component.padding.xs` (8px)
  - `spacing-select-item-gap` → L3 `spacing.component.gap.sm`
- **28 Tokens insgesamt** (22 Color + 1 Shadow + 2 Radius + 4 Spacing)

### Architecture
- **Radix UI Popover** for all three (consistent with DatePicker pattern)
- **Input CVA reuse** – trigger styled via `inputVariants` for consistent sizing/borders
- **Custom listbox** with keyboard navigation (ArrowUp/Down, Enter, Escape, Home, End)
- **Badge integration** in MultiSelect trigger for selected items
- **Radix Checkbox** in MultiSelect option items

### Components
- **Select** – Single selection dropdown with flat/grouped options
- **Combobox** – Searchable Select with filter input, case-insensitive matching
- **MultiSelect** – Checkbox items, Badge display, "Alle auswählen"/"Alle abwählen", search

### Files
- `packages/components/src/molecules/Select/Select.tsx`
- `packages/components/src/molecules/Select/Combobox.tsx`
- `packages/components/src/molecules/Select/MultiSelect.tsx`
- `packages/components/src/molecules/Select/Select.test.tsx` (28 Tests)
- `packages/components/src/molecules/Select/Combobox.test.tsx` (22 Tests)
- `packages/components/src/molecules/Select/MultiSelect.test.tsx` (31 Tests)
- `packages/components/src/molecules/Select/Select.stories.tsx` (22 Stories)
- `packages/components/src/molecules/Select/index.ts`
- `packages/tokens/src/semantic/select.json`

### Props – Select
- **options:** SelectOption[] | SelectGroup[] – flat or grouped
- **value:** string | undefined
- **onChange:** (value: string | undefined) => void
- **placeholder:** string (default: 'Auswählen…')
- **inputSize:** sm | md | lg
- **error / disabled:** boolean
- **aria-label:** string

### Props – Combobox
- All Select props plus:
- **searchPlaceholder:** string (default: 'Suchen…')
- **emptyText:** string (default: 'Keine Ergebnisse')

### Props – MultiSelect
- **options / inputSize / error / disabled / aria-label:** same as Select
- **value:** string[] (multiple values)
- **onChange:** (values: string[]) => void
- **showSelectAll:** boolean (default: true)
- **selectAllLabel / deselectAllLabel:** string
- **maxBadges:** number (default: 3, overflow shows "+N")
- **searchPlaceholder / emptyText:** string

### Test Coverage
- ✅ **81 Tests – alle bestanden**
- **Select (28):** Trigger, placeholder, selected display, aria attributes, open/close, option click, disabled options, grouped options, empty state, error/disabled states, keyboard navigation (Enter/Space/ArrowDown/Escape), chevron rotation, ref forwarding, className
- **Combobox (22):** Trigger, search input, filter by typing, case-insensitive, empty text, option click, popover close, check icon, search reset on reopen, grouped options, error/disabled, keyboard navigation, ref forwarding
- **MultiSelect (31):** Badges, maxBadges overflow, badge remove X, toggle on/off, popover stays open, search filter, "Alle auswählen"/"Alle abwählen", selection count, disabled options skip in selectAll, checkboxes, aria-multiselectable, keyboard, ref forwarding

### Accessibility
- ✅ `role="combobox"` on trigger with `aria-expanded` + `aria-haspopup="listbox"`
- ✅ `role="listbox"` on option container, `role="option"` on items
- ✅ `aria-selected` on selected options
- ✅ `aria-disabled` on disabled options
- ✅ `aria-multiselectable` on MultiSelect listbox
- ✅ `aria-label` on search input ("Optionen durchsuchen")
- ✅ Keyboard: ArrowUp/Down navigate, Enter/Space select, Escape close, Home/End jump
- ✅ Focus management: focus returns to trigger after selection/close

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-select
- **Select Stories:** Default, WithValue, Grouped, DisabledOptions, ErrorState, Disabled, AllSizes, States
- **Combobox Stories:** ComboboxDefault, ComboboxGrouped, ComboboxWithValue, ComboboxLongList
- **MultiSelect Stories:** MultiSelectDefault, MultiSelectWithValues, MultiSelectGrouped, MultiSelectManySelected, MultiSelectError, MultiSelectDisabled
- **Training Analyzer Stories:** TrainingSportart, TrainingHRZone, TrainingSportFilter, TrainingZoneFilter

### Notes
- Trigger reuses `inputVariants` from Input atom → consistent sizing (36/40/44px) and border styling
- Popover uses `--radix-popover-trigger-width` to match trigger width
- `onOpenAutoFocus` prevented to keep focus management manual
- MultiSelect stays open after selection (unlike Select which closes)
- Badge overflow: shows first N badges + "+remaining" counter badge
- Badge X button has `tabIndex={-1}` to avoid interfering with trigger focus
- Search filter is case-insensitive
- Grouped options render with separator lines and uppercase group labels

### Dependencies
- `@radix-ui/react-popover` (already installed)
- `@radix-ui/react-checkbox` (new)
- `lucide-react` (ChevronDown, Check, Search, X)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add clearable option (X button on trigger to reset value)
- [ ] Add async/loading state for remote option fetching
- [ ] Add virtualization for very large option lists (>500)
- [ ] Add creatable option ("Neuen Eintrag erstellen")

---

## [Textarea] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-textarea-counter-text` → L3 `color.text.muted`
  - `color-textarea-counter-text-over` → L3 `color.text.error`
- **Level 4 (Semantic) – Sizing:**
  - `sizing-textarea-min-height` → 100px
  - `sizing-textarea-max-height` → 400px
- **4 Tokens insgesamt** + reuses all Input tokens (color, sizing, spacing)

### Architecture
- CVA variants matching Input atom (same border, focus, error styling)
- `bg-white` + `border-[var(--color-input-border)]` = visually identical to Input
- Auto-resize via `scrollHeight` measurement + `overflow-hidden`
- Character counter with over-limit detection and red styling
- Label + helper text + error message pattern from InputField

### Files
- `packages/components/src/molecules/Textarea/Textarea.tsx`
- `packages/components/src/molecules/Textarea/Textarea.test.tsx` (36 Tests)
- `packages/components/src/molecules/Textarea/Textarea.stories.tsx` (13 Stories)
- `packages/components/src/molecules/Textarea/index.ts`
- `packages/tokens/src/semantic/textarea.json`

### Props
- **label / helperText / errorMessage:** Same pattern as InputField
- **inputSize:** sm | md | lg (reuses Input sizing tokens)
- **error / disabled:** boolean
- **maxLength:** number – character limit
- **showCounter:** boolean – shows "250/500" counter
- **autoResize:** boolean – grows with content, max 400px
- **rows:** number (default: 4)

### Test Coverage
- ✅ **36 Tests – alle bestanden**
- Rendering: textarea element, placeholder, label/htmlFor, custom id, rows
- Size Variants: sm, md, lg font sizes and padding
- States: error border, errorMessage auto-error, helper text, disabled, aria-invalid
- Counter: show counter, maxLength format, update on typing, over-limit red, aria-live
- Auto Resize: resize-y default, resize-none with autoResize
- User Interaction: onChange, controlled value, counter from value/defaultValue
- Ref/className: forwarding, w-full

### Accessibility
- ✅ `<label htmlFor>` verknüpft mit textarea
- ✅ `aria-invalid` bei Error
- ✅ `aria-describedby` für helper, error, und counter
- ✅ `aria-live="polite"` auf Counter (Screen Reader Announcement)
- ✅ `role="alert"` auf Error Message
- ✅ Keyboard: native textarea verhalten + resize handle

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-textarea
- **Stories:** Default, WithLabel, WithHelper, WithCounter, CounterOverLimit, AutoResize, ErrorState, Disabled, AllSizes, States
- **Training Analyzer Stories:** TrainingNotes, SessionComments, PlanAdjustment

### Notes
- Styled exactly like Input atom – CVA with same tokens for visual consistency
- Counter positioned below textarea (right-aligned), not inside
- `maxLength` prop does NOT restrict typing (HTML maxLength removed) – only shows visual warning
- Auto-resize caps at 400px (--sizing-textarea-max-height) to prevent infinite growth
- `leading-relaxed` for comfortable multi-line reading

---

## [FileUpload] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (20 tokens):**
  - Zone: `color-fileupload-zone-bg` (gray-50), `zone-border` (gray-300), `zone-text` (base), `zone-text-sub` (muted), `zone-icon` (sky-500!)
  - Hover: `color-fileupload-hover-bg` (sky-50), `hover-border` (sky-500 solid)
  - Drag: `color-fileupload-drag-bg`, `drag-border`, `drag-icon`, `drag-text`
  - File: `color-fileupload-file-text`, `file-size`, `file-icon`, `file-remove`, `file-remove-hover`
  - Progress: `color-fileupload-progress-bg`, `progress-fill`
  - Error: `color-fileupload-error-text`, `error-border`
- **Level 4 (Semantic) – Radius:**
  - `radius-fileupload-zone` → L3 `radius.component.lg` (8px)
  - `radius-fileupload-progress` → L3 `radius.component.full` (pill)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-fileupload-zone-padding` → L3 `spacing.component.padding.lg` (32px)
  - `spacing-fileupload-file-gap` → L3 `spacing.component.gap.sm`
- **24 Tokens insgesamt** (20 Color + 2 Radius + 2 Spacing)

### Architecture
- Hidden `<input type="file">` triggered by click on zone
- Drag & Drop via native `onDragOver`/`onDrop` handlers
- File validation: size (maxSize MB) + type (accept extensions)
- File list with icon, name, size, and remove button
- Optional image preview via `URL.createObjectURL`
- Optional progress bar (0-100%)
- Single mode replaces files; Multiple mode appends

### Files
- `packages/components/src/molecules/FileUpload/FileUpload.tsx`
- `packages/components/src/molecules/FileUpload/FileUpload.test.tsx` (50 Tests)
- `packages/components/src/molecules/FileUpload/FileUpload.stories.tsx` (12 Stories)
- `packages/components/src/molecules/FileUpload/index.ts`
- `packages/tokens/src/semantic/fileupload.json`

### Props
- **label:** string
- **accept:** string (e.g. ".csv,.fit,.png")
- **multiple:** boolean
- **onUpload:** (files: File[]) => void
- **onRemove:** (file: File, index: number) => void
- **maxSize:** number (MB)
- **preview:** boolean – show image thumbnails
- **progress:** number (0-100) – upload progress bar
- **error / errorMessage:** error state
- **disabled:** boolean
- **instructionText / subText:** custom zone text

### Test Coverage
- ✅ **50 Tests – alle bestanden**
- Rendering: zone, label, instruction text, sub-text, icon, dashed border, aria-label
- File Selection: click opens dialog, Enter/Space keys, accept, multiple props, onUpload callback
- File Display: file name, file size, remove button, file removal, onRemove callback
- Multiple Files: multi-upload, add more hint, single-mode replacement
- Drag & Drop: dragOver state, "loslassen" text, dragLeave reset, drop adds file
- Validation: file too large, invalid type, no add on error, valid file accepted
- Progress: progressbar, percentage text, correct width, aria-label
- Disabled: styling, aria-disabled, no click, no drop
- File Size Format: bytes, KB, MB
- Focus: tabindex, disabled tabindex, focus-visible ring

### Accessibility
- ✅ `role="button"` on drop zone with `tabIndex={0}`
- ✅ Keyboard: Enter/Space opens file dialog
- ✅ `aria-label` on zone (from label or custom)
- ✅ `aria-disabled` when disabled
- ✅ `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- ✅ `aria-label="Upload-Fortschritt"` on progress bar
- ✅ `role="alert"` on error messages
- ✅ Remove buttons with `aria-label="{filename} entfernen"`
- ✅ `focus-visible:ring-2` on zone for keyboard focus indicator
- ✅ Hidden file input with `sr-only` class

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-fileupload
- **Stories:** Default, CSVUpload, Multiple, WithProgress, ErrorFileTooLarge, ErrorInvalidType, Disabled, ImagePreview, CustomText
- **Training Analyzer Stories:** TrainingCSV, TrainingMultiple, TrainingScreenshots

### Notes
- Drop zone has four visual states: default (dashed gray-300), hover (solid sky-500), drag-over (solid sky-500 + animated icon), error (dashed red)
- **Design v2:** Icon is always Sky Blue (brand color), 48px size, with `group-hover:scale-110`
- **Design v2:** Hover state: solid sky border, sky-50 bg, smooth 200ms transitions
- **Design v2:** Drag-over icon bounces (`animate-bounce`), text changes to "Dateien loslassen…"
- **Design v2:** Border upgraded from `border.muted` (gray-200) → `border.default` (gray-300) for visibility
- **Design v2:** Zone text now `font-medium text-base` (was `text-sm text-muted`)
- File list shows after upload with solid border (not dashed)
- Smart file icons: Image icon for images, FileText for CSV, File for others (Lucide React)
- Auto-generates sub-text from `accept` + `maxSize` props (e.g. "CSV, FIT (max 10MB)")
- Preview images cleaned up via `URL.revokeObjectURL` on remove and unmount
- Progress bar uses sky-500 fill with pill shape (radius-full)

### Dependencies
- `lucide-react` (UploadCloud, File, FileText, Image, X)

### Breaking Changes
- None (initial release)

### Issues / Todos
- [ ] Add drag & drop file reordering
- [ ] Add retry on upload failure
- [ ] Add file type-specific previews (CSV table preview)

---

## [Modal/Dialog] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Organism

### Tokens Created
- **Level 4 (Semantic) – Color (7 tokens):**
  - `color-modal-overlay` → L3 `color.bg.overlay` (rgba(0,0,0,0.5) backdrop)
  - `color-modal-bg` → L3 `color.bg.paper` (white content)
  - `color-modal-title` → L3 `color.text.base`
  - `color-modal-description` → L3 `color.text.muted`
  - `color-modal-divider` → L3 `color.border.muted` (header/footer borders)
  - `color-modal-close-hover-bg` → L3 `color.bg.surface`
  - `color-modal-close-hover-text` → L3 `color.interactive.primary` (sky blue)
- **Level 4 (Semantic) – Shadow:**
  - `shadow-modal-content` → L3 `shadow.elevation.overlay` (xl shadow)
- **Level 4 (Semantic) – Radius:**
  - `radius-modal` → L3 `radius.component.lg` (8px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-modal-padding-x` → L3 `spacing.component.padding.lg` (24px)
  - `spacing-modal-padding-y` → L3 `spacing.component.padding.md` (16px)
  - `spacing-modal-gap` → L3 `spacing.component.gap.md` (8px)
- **12 Tokens insgesamt** (7 Color + 1 Shadow + 1 Radius + 3 Spacing)
- **New L3 infrastructure:** `color.bg.overlay`, `shadow.elevation.overlay`
- **New L2 infrastructure:** `color.neutral.overlay`
- **New L1 infrastructure:** `color.base.overlay` (rgba(0,0,0,0.5))

### Architecture
- **Radix UI Dialog** for focus trap, ESC close, portal rendering, ARIA
- **CVA size variants:** sm (max-w-sm), md (max-w-md), lg (max-w-lg), xl (max-w-2xl)
- **Compound Pattern:** Modal → ModalTrigger → ModalContent → ModalHeader/Body/Footer
- **tailwindcss-animate** for enter/exit animations
- **Animations:** Overlay fade-in, Content fade+zoom (0.2s duration)

### Components
- **Modal** – Root wrapper (Dialog.Root)
- **ModalTrigger** – Opens dialog (asChild for custom trigger)
- **ModalContent** – Portal + Overlay + Content panel (CVA sizes)
- **ModalHeader** – Title area with border-b divider
- **ModalTitle** – Dialog.Title (aria-labelledby)
- **ModalDescription** – Dialog.Description (aria-describedby)
- **ModalBody** – Scrollable content area (overflow-auto)
- **ModalFooter** – Actions area with border-t divider (justify-end)

### Files
- `packages/components/src/organisms/Modal/Modal.tsx`
- `packages/components/src/organisms/Modal/Modal.test.tsx` (24 Tests)
- `packages/components/src/organisms/Modal/Modal.stories.tsx` (8 Stories)
- `packages/components/src/organisms/Modal/index.ts`
- `packages/tokens/src/semantic/modal.json`

### Props – ModalContent
- **size:** sm | md | lg | xl (default: md)
- **showClose:** boolean (default: true) – X button in top-right
- Plus all Radix Dialog.Content props

### Test Coverage
- ✅ **24 Tests – alle bestanden**
- Rendering: trigger, closed state, open on click, title, description, body, footer
- Close: close button, ESC key, showClose=false, onOpenChange callback
- ARIA: dialog role
- Sizes: sm, md (default), lg, xl
- Tokens: bg, shadow, radius, title color, description color, header divider, footer divider
- Sub-components: header border-b, footer border-t, body overflow-auto, footer justify-end

### Accessibility
- ✅ `role="dialog"` on content (Radix built-in)
- ✅ Focus trap – Tab stays within modal
- ✅ ESC to close
- ✅ `aria-labelledby` (title) + `aria-describedby` (description) via Radix
- ✅ Focus returns to trigger on close
- ✅ Close button `aria-label="Schließen"`
- ✅ `focus-visible:ring-2` on close button

### Storybook
- **URL:** http://localhost:6006/?path=/story/organisms-modal
- **Stories:** Basic, WithDescription, SizeSmall, SizeLarge, SizeXL, DeleteConfirmation, SettingsDialog, WithoutCloseButton, LongContent
- **Training Analyzer Use Cases:** Delete Confirmation, Settings Dialog, Training Plan Overview, Extended Analysis

### Notes
- Overlay uses `color.bg.overlay` (rgba(0,0,0,0.5)) – not too dark, Nordic subtle
- Close button hovers to sky blue (`interactive.primary`) for consistent brand accent
- Header/Footer separated by `border-muted` dividers (clean sections)
- `showClose={false}` for mandatory confirmations
- Long content scrollable in ModalBody with `max-h-[60vh]` via className prop

### Dependencies
- `@radix-ui/react-dialog` (new)
- `tailwindcss-animate` (new – for data-[state] animations)
- `lucide-react` (X icon)

### Breaking Changes
- None (initial release)

---

## [Toast/Notification] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (13 tokens):**
  - `color-toast-bg` → L3 `color.bg.paper` (white background)
  - `color-toast-border` → L3 `color.border.muted`
  - `color-toast-title` → L3 `color.text.base`
  - `color-toast-description` → L3 `color.text.muted`
  - `color-toast-close-hover-bg` → L3 `color.bg.surface`
  - `color-toast-success-border` → L3 `color.success.border` (green-500)
  - `color-toast-success-icon` → L3 `color.success.text` (green-700)
  - `color-toast-error-border` → L3 `color.error.border` (red-500)
  - `color-toast-error-icon` → L3 `color.error.text` (red-700)
  - `color-toast-warning-border` → L3 `color.warning.border` (amber-500)
  - `color-toast-warning-icon` → L3 `color.warning.text` (amber-700)
  - `color-toast-info-border` → L3 `color.info.border` (sky-500)
  - `color-toast-info-icon` → L3 `color.info.text` (sky-700)
- **Level 4 (Semantic) – Shadow:**
  - `shadow-toast` → L3 `shadow.elevation.medium`
- **Level 4 (Semantic) – Radius:**
  - `radius-toast` → L3 `radius.component.lg` (8px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-toast-padding` → L3 `spacing.component.padding.md` (16px)
  - `spacing-toast-gap` → L3 `spacing.component.gap.md` (8px)
  - `spacing-toast-viewport-padding` → L3 `spacing.component.padding.md` (16px)
- **18 Tokens insgesamt** (13 Color + 1 Shadow + 1 Radius + 3 Spacing)

### Architecture
- **Radix UI Toast** for auto-dismiss, swipe-to-dismiss, pause-on-hover
- **ToastProvider** wraps app, renders viewport + manages toast state
- **useToast() hook** for imperative toast creation from anywhere
- **CVA variant classes** for 4 variants: success, error, warning, info
- **Border-left accent** design (not full background) – elegant, not overwhelming
- **Auto-dismiss durations:** success=3s, info=4s, warning=5s, error=7s

### Components
- **ToastProvider** – Context provider + Radix Toast.Provider + Viewport
- **Toast** – Single notification with icon, title, description, close button
- **useToast()** – Hook returning `{ toast, dismiss }` functions

### Files
- `packages/components/src/molecules/Toast/Toast.tsx`
- `packages/components/src/molecules/Toast/Toast.test.tsx` (22 Tests)
- `packages/components/src/molecules/Toast/Toast.stories.tsx` (12 Stories)
- `packages/components/src/molecules/Toast/index.ts`
- `packages/tokens/src/semantic/toast.json`

### Props – toast() function
- **title:** string (required)
- **description:** string (optional)
- **variant:** success | error | warning | info (default: info)
- **duration:** number (ms, overrides default per variant)

### Props – ToastProvider
- **position:** top-right | top-left | bottom-right | bottom-left (default: bottom-right)

### Test Coverage
- ✅ **22 Tests – alle bestanden**
- Direct rendering: title, description, close button, no description when omitted
- Variants: success/error/warning/info border classes
- Tokens: bg, border, shadow, radius, title color, description color
- Icons: success/error/warning/info icon color classes on SVG
- Provider: toast via hook, toast with description, multiple toasts
- Error: throws when useToast used outside ToastProvider

### Accessibility
- ✅ Swipe-to-dismiss (mobile, Radix built-in)
- ✅ Pause on hover (Radix built-in)
- ✅ Keyboard dismissible
- ✅ Close button `aria-label="Schließen"`
- ✅ Focus management via Radix

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-toast
- **Stories:** Success, Error, Warning, Info, WithoutDescription, LongDescription, Interactive, AllVariants
- **Training Analyzer Use Cases:** UploadSuccess, SaveSuccess, UploadError, ValidationWarning, PlanUpdated

### Notes
- **Border-left accent design:** 4px colored left border per variant, neutral white background
- **Icon per variant:** CheckCircle (success), XCircle (error), AlertTriangle (warning), Info (info)
- **Viewport z-[100]:** Above Modal (z-50) for toast-over-modal scenarios
- **Position configurable:** via ToastProvider prop (default: bottom-right)
- **Smart durations:** Errors stay longer (7s) so user can read, success quick (3s)
- **Swipe direction:** right (slide out to right)

### Dependencies
- `@radix-ui/react-toast` (new)
- `tailwindcss-animate` (shared with Modal)
- `lucide-react` (CheckCircle, XCircle, AlertTriangle, Info, X)

### Breaking Changes
- None (initial release)

---

## [Checkbox] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color (10 tokens):**
  - `color-checkbox-bg` → L3 `color.bg.paper`
  - `color-checkbox-border` → L3 `color.border.default`
  - `color-checkbox-border-hover` → L3 `color.border.strong`
  - `color-checkbox-checked-bg` → L3 `color.interactive.primary` (Sky Blue!)
  - `color-checkbox-checked-border` → L3 `color.interactive.primary`
  - `color-checkbox-checked-icon` → L3 `color.text.on-primary` (white check)
  - `color-checkbox-focus-ring` → L3 `color.border.focus`
  - `color-checkbox-disabled-bg` → L3 `color.neutral.1.100`
  - `color-checkbox-label` → L3 `color.text.base`
  - `color-checkbox-description` → L3 `color.text.muted`
- **Level 4 (Semantic) – Radius:**
  - `radius-checkbox` → L3 `radius.component.sm` (4px)
- **11 Tokens insgesamt** (10 Color + 1 Radius)

### Architecture
- **Radix UI Checkbox** for accessible toggle, indeterminate support, ARIA
- **Checkbox** – Standalone atom: 20×20px, border-2, rounded, Check/Minus icons (Lucide)
- **CheckboxField** – Wrapper: Checkbox + label + optional description
- `data-[state=checked]` + `data-[state=indeterminate]` for Sky Blue background
- Smooth 200ms transition on all states

### Files
- `packages/components/src/atoms/Checkbox/Checkbox.tsx`
- `packages/components/src/atoms/Checkbox/Checkbox.test.tsx` (21 Tests)
- `packages/components/src/atoms/Checkbox/Checkbox.stories.tsx` (13 Stories)
- `packages/components/src/atoms/Checkbox/index.ts`
- `packages/tokens/src/semantic/checkbox.json`

### Components
- **Checkbox** – Core toggle: 20×20px, rounded-sm, border-2, Check/Minus icons
- **CheckboxField** – Checkbox + label (htmlFor linked) + optional description

### Test Coverage
- ✅ **21 Tests – alle bestanden**
- **Checkbox (11):** Rendering, unchecked default, checked state, indeterminate icon, disabled, focus ring, token classes (border, bg, checked-bg, checked-border, checked-icon)
- **CheckboxField (10):** Label rendering, label linked via htmlFor, description, no description when omitted, disabled label styling, checkbox inside field, custom className, token classes (label, description)

### Accessibility
- ✅ Native checkbox semantics via Radix UI
- ✅ `data-state` attributes (checked/unchecked/indeterminate)
- ✅ `<label htmlFor>` auto-linked in CheckboxField
- ✅ Focus ring: `ring-2 ring-offset-2` on focus-visible
- ✅ Disabled state: `cursor-not-allowed opacity-50`
- ✅ Keyboard: Space to toggle (Radix built-in)

### Storybook
- **Stories:** Basic, Checked, Unchecked, Indeterminate, Disabled, WithLabel, WithDescription, CheckedField, DisabledField, AllStates
- **Training Analyzer Stories:** TrainingCompleted, SettingsCheckboxes, DataExportSelection

### Dependencies
- `@radix-ui/react-checkbox` (already installed for MultiSelect)
- `lucide-react` (Check, Minus icons)

---

## [RadioGroup] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (10 tokens):**
  - `color-radio-bg` → L3 `color.bg.paper`
  - `color-radio-border` → L3 `color.border.default`
  - `color-radio-border-hover` → L3 `color.border.strong`
  - `color-radio-selected-border` → L3 `color.interactive.primary` (Sky Blue!)
  - `color-radio-selected-dot` → L3 `color.interactive.primary` (Sky Blue dot)
  - `color-radio-focus-ring` → L3 `color.border.focus`
  - `color-radio-disabled-bg` → L3 `color.neutral.1.100`
  - `color-radio-label` → L3 `color.text.base`
  - `color-radio-description` → L3 `color.text.muted`
  - `color-radio-item-hover-bg` → L3 `color.bg.surface`
- **Level 4 (Semantic) – Radius:**
  - `radius-radio-item` → L3 `radius.component.md` (6px row rounding)
- **12 Tokens insgesamt** (10 Color + 1 Radius + radio circle is rounded-full natively)

### Architecture
- **Radix UI RadioGroup** for single-selection, roving focus, ARIA
- **RadioGroup** – Root container with vertical/horizontal orientation
- **RadioGroupItem** – Clickable row: radio circle + label + optional description
- Inner dot indicator: 2.5×2.5 rounded-full in Sky Blue on checked
- Row click delegates to radio input for larger click target

### Files
- `packages/components/src/molecules/RadioGroup/RadioGroup.tsx`
- `packages/components/src/molecules/RadioGroup/RadioGroup.test.tsx` (20 Tests)
- `packages/components/src/molecules/RadioGroup/RadioGroup.stories.tsx` (9 Stories)
- `packages/components/src/molecules/RadioGroup/index.ts`
- `packages/tokens/src/semantic/radio.json`

### Components
- **RadioGroup** – Root: flex container, vertical/horizontal, aria-label
- **RadioGroupItem** – Row: radio circle (20×20px, rounded-full) + label + description

### Test Coverage
- ✅ **20 Tests – alle bestanden**
- **RadioGroup (17):** Radiogroup role, all items rendered, labels, aria-label, selection on click, checked/unchecked state, keyboard focus, disabled items, disabled click prevention, orientation (vertical/horizontal default), token classes (border, bg, checked-border, label, item rounding)
- **RadioGroupItem (3):** Description rendering, description token class, children as label

### Accessibility
- ✅ `role="radiogroup"` on container with `aria-label`
- ✅ `role="radio"` on each item (Radix built-in)
- ✅ `data-state` (checked/unchecked) for visual states
- ✅ Roving focus: Arrow keys navigate between options (Radix built-in)
- ✅ `<label htmlFor>` linked to radio input
- ✅ Focus ring: `ring-2 ring-offset-2` on focus-visible

### Storybook
- **Stories:** Basic, VerticalLayout, HorizontalLayout, WithDescriptions, DisabledOptions, ChildrenAsLabel
- **Training Analyzer Stories:** TrainingType, ViewMode, HRZoneTarget

### Dependencies
- `@radix-ui/react-radio-group` (new)

---

## [Switch] - 2026-02-13

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color (7 tokens):**
  - `color-switch-track-bg` → L3 `color.border.default` (gray track when off)
  - `color-switch-track-bg-checked` → L3 `color.interactive.primary` (Sky Blue when on!)
  - `color-switch-thumb-bg` → L3 `color.bg.paper` (white thumb)
  - `color-switch-focus-ring` → L3 `color.border.focus`
  - `color-switch-disabled-track-bg` → L3 `color.neutral.1.100`
  - `color-switch-label` → L3 `color.text.base`
  - `color-switch-description` → L3 `color.text.muted`
- **Level 4 (Semantic) – Shadow:**
  - `shadow-switch-thumb` → L3 `shadow.elevation.low` (subtle thumb shadow)
- **8 Tokens insgesamt** (7 Color + 1 Shadow)

### Architecture
- **Radix UI Switch** for toggle semantics, ARIA, keyboard support
- **Switch** – Track (44×24px, rounded-full) with sliding thumb (20×20px)
- **SwitchField** – Wrapper: label + description on left, Switch on right (justify-between)
- Thumb slides: `translate-x-0.5` (off) → `translate-x-[22px]` (on)
- Smooth 200ms transition on both track color and thumb position

### Files
- `packages/components/src/atoms/Switch/Switch.tsx`
- `packages/components/src/atoms/Switch/Switch.test.tsx` (22 Tests)
- `packages/components/src/atoms/Switch/Switch.stories.tsx` (12 Stories)
- `packages/components/src/atoms/Switch/index.ts`
- `packages/tokens/src/semantic/switch.json`

### Components
- **Switch** – Core toggle: track (w-11 h-6) + thumb (h-5 w-5), rounded-full
- **SwitchField** – Switch + label + description, justify-between layout

### Test Coverage
- ✅ **22 Tests – alle bestanden**
- **Switch (12):** Rendering, role=switch, unchecked default, checked state, toggle interaction, disabled, focus ring, token classes (track-bg, track-bg-checked, thumb-bg, thumb-shadow, disabled-track-bg)
- **SwitchField (10):** Label rendering, label linked via htmlFor, description, no description when omitted, switch inside field, justify-between layout, disabled label styling, custom className, token classes (label, description)

### Accessibility
- ✅ `role="switch"` (Radix built-in)
- ✅ `aria-checked` state (Radix built-in)
- ✅ `<label htmlFor>` auto-linked in SwitchField
- ✅ Focus ring: `ring-2 ring-offset-2` on focus-visible
- ✅ Disabled state: `cursor-not-allowed opacity-50`
- ✅ Keyboard: Space to toggle (Radix built-in)

### Storybook
- **Stories:** Basic, Checked, Unchecked, Disabled, WithLabel, WithDescription, CheckedField, DisabledField, AllStates
- **Training Analyzer Stories:** SettingsSwitches, TrainingPrivacy, NotificationToggles

### Dependencies
- `@radix-ui/react-switch` (new)

---

## [Tooltip] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color (3 tokens):**
  - `color-tooltip-bg` → L3 `color.neutral.1.900` (dark background)
  - `color-tooltip-text` → L3 `color.text.inverse` (light text)
  - `color-tooltip-arrow` → L3 `color.neutral.1.900` (matches bg)
- **Level 4 (Semantic) – Shadow:**
  - `shadow-tooltip` → L3 `shadow.elevation.medium`
- **Level 4 (Semantic) – Radius:**
  - `radius-tooltip` → L3 `radius.component.md` (6px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-tooltip-padding-x` → L3 `spacing.component.padding.sm` (12px)
  - `spacing-tooltip-padding-y` → L3 `spacing.component.padding.xs` (8px)
- **7 Tokens insgesamt**

### Architecture
- **Radix UI Tooltip** with Provider, Root, Trigger, Portal, Content, Arrow
- Dark background with light text (inverted from main theme)
- Auto-positioning with `side` and `align` props
- Slide-in animations per side via `tailwindcss-animate`

### Files
- `packages/components/src/atoms/Tooltip/Tooltip.tsx`
- `packages/components/src/atoms/Tooltip/Tooltip.test.tsx` (8 Tests)
- `packages/components/src/atoms/Tooltip/Tooltip.stories.tsx` (5 Stories)
- `packages/components/src/atoms/Tooltip/index.ts`
- `packages/tokens/src/semantic/tooltip.json`

### Props
- **content:** ReactNode (tooltip text or rich content)
- **side:** top | right | bottom | left (default: top)
- **align:** start | center | end (default: center)
- **delayDuration:** number (ms, default: 300)

### Test Coverage
- ✅ **8 Tests – alle bestanden**
- Rendering: trigger, no tooltip initially
- Interaction: shows on hover, shows on focus
- Content: rich content rendering
- Tokens: bg, text, radius classes
- Side: data-side attribute

### Accessibility
- ✅ `role="tooltip"` (Radix built-in)
- ✅ Keyboard: shows on focus, hides on blur
- ✅ Auto-dismiss on Escape
- ✅ Arrow for visual connection to trigger

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-tooltip
- **Stories:** Default, AllSides, WithRichContent, CustomDelay, TrainingAnalyzer

### Dependencies
- `@radix-ui/react-tooltip` (new)

---

## [Tabs] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (9 tokens):**
  - `color-tabs-list-bg` → L3 `color.bg.surface` (pills list bg)
  - `color-tabs-trigger-text` → L3 `color.text.muted` (inactive)
  - `color-tabs-trigger-text-active` → L3 `color.interactive.primary` (sky)
  - `color-tabs-trigger-text-hover` → L3 `color.text.base`
  - `color-tabs-trigger-bg-active` → L3 `color.bg.paper` (pills active)
  - `color-tabs-trigger-hover-bg` → L3 `color.bg.surface`
  - `color-tabs-underline` → L3 `color.interactive.primary` (sky)
  - `color-tabs-border` → L3 `color.border.muted`
  - `color-tabs-content-text` → L3 `color.text.base`
- **Level 4 (Semantic) – Shadow:**
  - `shadow-tabs-trigger-active` → L3 `shadow.elevation.low`
- **Level 4 (Semantic) – Radius:**
  - `radius-tabs-list` → L3 `radius.component.lg` (8px pills container)
  - `radius-tabs-trigger` → L3 `radius.component.md` (6px pills trigger)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-tabs-list-padding` → L3 `spacing.component.padding.xs` (4px)
  - `spacing-tabs-trigger-padding-x` → L3 `spacing.component.padding.md` (16px)
  - `spacing-tabs-trigger-padding-y` → L3 `spacing.component.padding.sm` (12px)
  - `spacing-tabs-content-padding` → L3 `spacing.component.padding.md` (16px)
  - `spacing-tabs-list-gap` → L3 `spacing.component.gap.sm` (4px)
- **17 Tokens insgesamt**

### Architecture
- **Radix UI Tabs** compound pattern: Tabs → TabsList → TabsTrigger + TabsContent
- **CVA variants** on TabsList + TabsTrigger (underline / pills)
- **React Context** to pass variant from TabsList to TabsTrigger
- Underline: border-b indicator, pills: bg + shadow active state

### Files
- `packages/components/src/molecules/Tabs/Tabs.tsx`
- `packages/components/src/molecules/Tabs/Tabs.test.tsx` (16 Tests)
- `packages/components/src/molecules/Tabs/Tabs.stories.tsx` (5 Stories)
- `packages/components/src/molecules/Tabs/index.ts`
- `packages/tokens/src/semantic/tabs.json`

### Variants
- **variant (TabsList):** underline, pills (default: underline)

### Test Coverage
- ✅ **16 Tests – alle bestanden**
- Rendering: tablist, triggers, active content, inactive hidden
- Interaction: click switches tab, disabled tab stays
- Keyboard: ArrowRight, ArrowLeft navigation
- ARIA: aria-selected, tabpanel, disabled attribute
- Variants: underline border-b, pills bg + rounded
- Tokens: padding, content, list styles

### Accessibility
- ✅ `role="tablist"`, `role="tab"`, `role="tabpanel"` (Radix built-in)
- ✅ `aria-selected` on active tab
- ✅ Arrow key navigation (Radix built-in)
- ✅ Home/End key support (Radix built-in)
- ✅ Disabled tab support
- ✅ Focus ring on focus-visible

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-tabs
- **Stories:** UnderlineDefault, PillsDefault, Disabled, AllVariants, TrainingAnalyzer

### Dependencies
- `@radix-ui/react-tabs` (new)

---

## [Accordion] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (6 tokens):**
  - `color-accordion-bg` → L3 `color.bg.paper`
  - `color-accordion-border` → L3 `color.border.muted`
  - `color-accordion-trigger-text` → L3 `color.text.base`
  - `color-accordion-trigger-hover-bg` → L3 `color.bg.surface`
  - `color-accordion-content-text` → L3 `color.text.base`
  - `color-accordion-icon` → L3 `color.text.muted`
- **Level 4 (Semantic) – Radius:**
  - `radius-accordion` → L3 `radius.component.lg` (8px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-accordion-trigger-padding-x` → L3 `spacing.component.padding.md` (16px)
  - `spacing-accordion-trigger-padding-y` → L3 `spacing.component.padding.sm` (12px)
  - `spacing-accordion-content-padding-x` → L3 `spacing.component.padding.md` (16px)
  - `spacing-accordion-content-padding-y` → L3 `spacing.component.padding.sm` (12px)
- **11 Tokens insgesamt**

### Architecture
- **Radix UI Accordion** compound pattern: Accordion → AccordionItem → AccordionTrigger + AccordionContent
- **Single mode** (one at a time, collapsible) + **Multiple mode** (many open)
- ChevronDown icon rotates 180° on open via `[&[data-state=open]>svg]:rotate-180`
- Content wrapped in inner div for padding (Radix content handles animation)

### Files
- `packages/components/src/molecules/Accordion/Accordion.tsx`
- `packages/components/src/molecules/Accordion/Accordion.test.tsx` (16 Tests)
- `packages/components/src/molecules/Accordion/Accordion.stories.tsx` (5 Stories)
- `packages/components/src/molecules/Accordion/index.ts`
- `packages/tokens/src/semantic/accordion.json`

### Props
- **type:** single | multiple (Radix built-in)
- **collapsible:** boolean (single mode only)
- **defaultValue:** string | string[]

### Test Coverage
- ✅ **16 Tests – alle bestanden**
- Rendering: items, triggers, collapsed state
- Single Mode: open, close, switch items
- Multiple Mode: multiple open simultaneously
- Keyboard: Enter, Space to toggle
- Disabled: no open on click, disabled attribute
- ARIA: aria-expanded, aria-controls
- Tokens: border, padding, icon classes

### Accessibility
- ✅ `aria-expanded` on triggers (Radix built-in)
- ✅ `aria-controls` linking trigger to content
- ✅ Keyboard: Enter/Space to toggle, ArrowUp/Down to navigate
- ✅ Disabled state support
- ✅ Focus ring on focus-visible

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-accordion
- **Stories:** SingleDefault, MultipleOpen, WithDisabled, TrainingFAQ, TrainingSessionDetails

### Dependencies
- `@radix-ui/react-accordion` (new)
- `lucide-react` (ChevronDown)

---

## [DropdownMenu] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code + Nils
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color (10 tokens):**
  - `color-dropdown-bg` → L3 `color.bg.paper`
  - `color-dropdown-border` → L3 `color.border.muted`
  - `color-dropdown-item-text` → L3 `color.text.base`
  - `color-dropdown-item-hover-bg` → L3 `color.bg.surface`
  - `color-dropdown-item-disabled-text` → L3 `color.text.disabled`
  - `color-dropdown-item-icon` → L3 `color.text.muted`
  - `color-dropdown-destructive-text` → L3 `color.error.text` (red)
  - `color-dropdown-destructive-hover-bg` → L3 `color.error.bg-subtle`
  - `color-dropdown-separator` → L3 `color.border.muted`
  - `color-dropdown-label-text` → L3 `color.text.muted`
- **Level 4 (Semantic) – Shadow:**
  - `shadow-dropdown-menu` → L3 `shadow.elevation.medium`
- **Level 4 (Semantic) – Radius:**
  - `radius-dropdown-menu` → L3 `radius.component.lg` (8px)
  - `radius-dropdown-item` → L3 `radius.component.md` (6px)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-dropdown-padding` → L3 `spacing.component.padding.xs` (4px)
  - `spacing-dropdown-item-padding-x` → L3 `spacing.component.padding.sm` (12px)
  - `spacing-dropdown-item-padding-y` → L3 `spacing.component.padding.xs` (8px)
  - `spacing-dropdown-item-gap` → L3 `spacing.component.gap.sm` (8px)
- **17 Tokens insgesamt**

### Architecture
- **Radix UI DropdownMenu** compound pattern: DropdownMenu → Trigger → Content → Item/Separator/Label
- **Destructive items:** red text + red-subtle hover bg
- **Icon support:** optional `icon` prop on DropdownMenuItem
- **asChild** on trigger for custom trigger elements
- Portal rendering with slide-in animations per side

### Files
- `packages/components/src/molecules/DropdownMenu/DropdownMenu.tsx`
- `packages/components/src/molecules/DropdownMenu/DropdownMenu.test.tsx` (16 Tests)
- `packages/components/src/molecules/DropdownMenu/DropdownMenu.stories.tsx` (6 Stories)
- `packages/components/src/molecules/DropdownMenu/index.ts`
- `packages/tokens/src/semantic/dropdown.json`

### Props – DropdownMenuItem
- **destructive:** boolean (danger styling)
- **icon:** ReactNode (optional icon before text)
- **disabled:** boolean
- Plus all Radix DropdownMenu.Item props

### Test Coverage
- ✅ **16 Tests – alle bestanden**
- Rendering: trigger, closed state
- Open/Close: click open, Escape close
- Items: click fires onSelect, close after click
- Keyboard: ArrowDown navigation
- Sub-Components: label, separator, icon
- Destructive: text color class
- Disabled: data-disabled attribute
- Tokens: bg, border, radius, padding classes

### Accessibility
- ✅ `role="menu"`, `role="menuitem"` (Radix built-in)
- ✅ Keyboard: ArrowUp/Down, Enter, Escape
- ✅ Focus management (Radix built-in)
- ✅ Disabled items non-interactive
- ✅ Auto-close on item selection

### Storybook
- **URL:** http://localhost:6006/?path=/story/molecules-dropdownmenu
- **Stories:** Default, WithIcons, WithSeparatorAndLabel, DestructiveItem, DisabledItems, TrainingActions

### Dependencies
- `@radix-ui/react-dropdown-menu` (new)
- `lucide-react` (Edit, Copy, Trash2, Share, Settings, Download, MoreVertical in stories)

---

## [Progress] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-progress-track` → L3 `color.bg.surface`
  - `color-progress-fill` → L3 `color.interactive.primary` (Sky Blue)
  - `color-progress-fill-success` → L3 `color.bg.success`
  - `color-progress-fill-warning` → L3 `color.bg.warning`
  - `color-progress-fill-error` → L3 `color.bg.error`
  - `color-progress-label` → L3 `color.text.base`
  - `color-progress-value` → L3 `color.text.muted`
- **Level 4 (Semantic) – Sizing:**
  - `sizing-progress-sm-height` (4px), `sizing-progress-md-height` (8px), `sizing-progress-lg-height` (12px)
- **Level 4 (Semantic) – Radius:**
  - `radius-progress` → L3 `radius.component.full` (fully rounded)
- **Level 4 (Semantic) – Spacing:**
  - `spacing-progress-label-gap` → L3 `spacing.component.gap.lg`
- **12 Tokens insgesamt**

### Files
- `packages/components/src/atoms/Progress/Progress.tsx`
- `packages/components/src/atoms/Progress/Progress.test.tsx`
- `packages/components/src/atoms/Progress/Progress.stories.tsx`
- `packages/components/src/atoms/Progress/index.ts`
- `packages/tokens/src/semantic/progress.json`

### Variants
- **size:** sm (4px), md (8px, default), lg (12px)
- **color:** default (Sky Blue), success, warning, error

### Sub-Components
- **Progress** – Radix `@radix-ui/react-progress` wrapper with size + color CVA variants
- **ProgressField** – Progress with label + value display, custom valueFormat function

### Test Coverage (20 Tests)
- role="progressbar", aria-valuenow, aria-valuemax
- Size variants (sm/md/lg), Color variants (default/success/warning/error)
- Indeterminate mode (no aria-valuenow, animation class)
- Token classes (track, fill, radius)
- ProgressField: label, value display, custom valueFormat
- Ref forwarding, custom className

### Accessibility
- ✅ `role="progressbar"` (Radix built-in)
- ✅ `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- ✅ Indeterminate mode: no `aria-valuenow`
- ✅ ProgressField: visible label + value text

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-progress
- **Stories:** Default, AllSizes, AllColors, ProgressSteps, Indeterminate, WithLabel, TrainingGoalProgress

### Dependencies
- `@radix-ui/react-progress` (new)

---

## [Spinner] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-spinner-primary` → L3 `color.interactive.primary` (Sky Blue arc)
  - `color-spinner-track` → L3 `color.border.muted` (muted track)
  - `color-spinner-label` → L3 `color.text.muted`
- **Level 4 (Semantic) – Sizing:**
  - `sizing-spinner-sm` (16px), `sizing-spinner-md` (24px), `sizing-spinner-lg` (32px), `sizing-spinner-xl` (48px)
- **7 Tokens insgesamt**

### Files
- `packages/components/src/atoms/Spinner/Spinner.tsx`
- `packages/components/src/atoms/Spinner/Spinner.test.tsx`
- `packages/components/src/atoms/Spinner/Spinner.stories.tsx`
- `packages/components/src/atoms/Spinner/index.ts`
- `packages/tokens/src/semantic/spinner.json`

### Variants
- **size:** sm (16px), md (24px, default), lg (32px), xl (48px)

### Sub-Components
- **Spinner** – SVG circle spinner with `animate-spin`, optional `label` prop wraps in labeled span

### Implementation Details
- Pure SVG: two overlapping circles (track + arc) with `strokeDasharray`
- Stroke colors via CSS custom properties in `stroke` attribute
- Token-based sizing via `w-[var(--sizing-spinner-*)]` / `h-[var(--sizing-spinner-*)]`
- Label: `text-sm text-[var(--color-spinner-label)]` beside spinner

### Test Coverage (15 Tests)
- SVG element render, role="status", aria-label
- Size variants (sm/md/lg/xl), animate-spin class
- Token stroke colors on circles
- Label rendering and wrapping behavior
- Ref forwarding, custom className

### Accessibility
- ✅ `role="status"` on SVG element
- ✅ `aria-label="Laden"` (default) or custom label
- ✅ Label text visible when provided

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-spinner
- **Stories:** Default, AllSizes, WithLabel, InButton, CenteredInContainer, TrainingPageLoading

---

## [Skeleton] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:**
  - `color-skeleton-base` → L3 `color.bg.surface` (light gray)
  - `color-skeleton-shimmer` → L3 `color.bg.base` (lighter shimmer highlight)
- **Level 4 (Semantic) – Radius:**
  - `radius-skeleton` → L3 `radius.component.md` (6px)
  - `radius-skeleton-circle` → L3 `radius.component.full` (9999px)
- **4 Tokens insgesamt**

### Files
- `packages/components/src/atoms/Skeleton/Skeleton.tsx`
- `packages/components/src/atoms/Skeleton/Skeleton.test.tsx`
- `packages/components/src/atoms/Skeleton/Skeleton.stories.tsx`
- `packages/components/src/atoms/Skeleton/index.ts`
- `packages/tokens/src/semantic/skeleton.json`

### Sub-Components
- **Skeleton** – Base shimmer block, flexible via className (h-4, w-full, etc.)
- **SkeletonText** – Multiple shimmer lines with `lines` prop, last line shorter (w-2/3)
- **SkeletonCircle** – Circular shimmer placeholder, sizes: sm (32px), md (48px), lg (64px)
- **SkeletonKeyframes** – Injects `@keyframes skeleton-shimmer` CSS (include once in app/stories)

### Implementation Details
- Shimmer animation via inline style: `linear-gradient(90deg, base → shimmer → base)` with `background-size: 200%`
- `@keyframes skeleton-shimmer` injected via `<style>` tag (SkeletonKeyframes component)
- All elements have `aria-hidden="true"` (decorative placeholders)
- No Radix UI dependency – pure CSS/HTML

### Test Coverage (13 Tests)
- Base: div render, aria-hidden, radius token, shimmer animation style, gradient background
- SkeletonText: default 3 lines, custom line count, last line shorter, full-width non-last lines
- SkeletonCircle: rounded-full token, sm/md/lg sizes
- Custom className, ref forwarding

### Accessibility
- ✅ `aria-hidden="true"` on all skeleton elements (decorative)
- ✅ Container should use `aria-busy="true"` while loading (app-level)

### Storybook
- **URL:** http://localhost:6006/?path=/story/atoms-skeleton
- **Stories:** Basic, TextLines, CircleSizes, CardLoading, TableLoading, TrainingSessionCard, DashboardStatsLoading

---

## [Separator] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:** `color-separator`

### Files
- `packages/components/src/atoms/Separator/Separator.tsx`
- `packages/components/src/atoms/Separator/Separator.test.tsx`
- `packages/components/src/atoms/Separator/Separator.stories.tsx`
- `packages/components/src/atoms/Separator/index.ts`
- `packages/tokens/src/semantic/separator.json`

### Props
- **orientation:** horizontal (default), vertical
- **decorative:** boolean (default true) – controls aria-hidden

### Test Coverage
- ✅ 14 Tests – alle bestanden
- Tests: Rendering, orientation, aria-hidden, role=separator, custom className, token classes

### Storybook
- **Stories:** Horizontal, Vertical, InCard, InToolbar, CustomSpacing

---

## [Popover] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:** `color-popover-bg`, `color-popover-border`
- **Level 4 (Semantic) – Shadow:** `shadow-popover`
- **Level 4 (Semantic) – Radius:** `radius-popover`
- **Level 4 (Semantic) – Spacing:** `spacing-popover-padding`

### Files
- `packages/components/src/atoms/Popover/Popover.tsx`
- `packages/components/src/atoms/Popover/Popover.test.tsx`
- `packages/components/src/atoms/Popover/Popover.stories.tsx`
- `packages/components/src/atoms/Popover/index.ts`
- `packages/tokens/src/semantic/popover.json`

### Architecture
- Compound components: Popover, PopoverTrigger, PopoverContent, PopoverArrow
- Radix UI (@radix-ui/react-popover) based
- Click-triggered (vs hover for Tooltip)
- Animations: fade-in + zoom-in + directional slide-in

### Test Coverage
- ✅ 9 Tests – alle bestanden
- Tests: Trigger rendering, closed initially, opens on click, Escape closes, token classes, custom className, side prop, arrow rendering

### Storybook
- **Stories:** Default, WithArrow, AllSides, RichContent, Training:HRZoneInfo, Training:MetricInfo, Training:FilterMenu

---

## [Alert] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Atom

### Tokens Created
- **Level 4 (Semantic) – Color:** `color-alert-title`, `color-alert-description`, `color-alert-{info|success|warning|error}-{bg|border|icon}` (14 total)
- **Level 4 (Semantic) – Radius:** `radius-alert`

### Files
- `packages/components/src/atoms/Alert/Alert.tsx`
- `packages/components/src/atoms/Alert/Alert.test.tsx`
- `packages/components/src/atoms/Alert/Alert.stories.tsx`
- `packages/components/src/atoms/Alert/index.ts`
- `packages/tokens/src/semantic/alert.json`

### Architecture
- Compound: Alert, AlertTitle, AlertDescription, AlertClose
- CVA variants: info, success, warning, error
- Auto-icon per variant (lucide-react: Info, CheckCircle, AlertTriangle, XCircle)
- `closeable` prop with `onClose` callback
- Left border accent (`border-l-4`)

### Test Coverage
- ✅ 21 Tests – alle bestanden
- Tests: role="alert", title/description, all 4 variant bg/border/icon classes, close button behavior, onClose callback, custom className, sub-component text classes

### Storybook
- **Stories:** AllVariants, WithCloseButton, WithListDescription, OvertrainingWarning, ImportError, GoalAchieved, FeatureAnnouncement

---

## [EmptyState] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color:** `color-emptystate-icon`, `color-emptystate-icon-error`, `color-emptystate-icon-success`, `color-emptystate-title`, `color-emptystate-description`

### Files
- `packages/components/src/molecules/EmptyState/EmptyState.tsx`
- `packages/components/src/molecules/EmptyState/EmptyState.test.tsx`
- `packages/components/src/molecules/EmptyState/EmptyState.stories.tsx`
- `packages/components/src/molecules/EmptyState/index.ts`
- `packages/tokens/src/semantic/emptystate.json`

### Props
- **icon:** ReactNode (optional)
- **title:** string (required)
- **description:** string (optional)
- **action:** ReactNode (optional)
- **variant:** default | error | success

### Test Coverage
- ✅ 13 Tests – alle bestanden
- Tests: Title/description/icon/action rendering, omission when not provided, all 3 variant icon color classes, custom className, token text classes

### Storybook
- **Stories:** Default, WithAction, NoResults, ErrorState, SuccessState, NoSessions, NoSearchResults

---

## [Pagination] - 2026-02-14

**Status:** ✅ Complete
**Developer:** Claude Code
**Level:** Molecule

### Tokens Created
- **Level 4 (Semantic) – Color:** `color-pagination-item-{bg|border|text|hover-bg|active-bg|active-text|active-border}` (7 total)
- **Level 4 (Semantic) – Radius:** `radius-pagination-item`

### Files
- `packages/components/src/molecules/Pagination/Pagination.tsx`
- `packages/components/src/molecules/Pagination/Pagination.test.tsx`
- `packages/components/src/molecules/Pagination/Pagination.stories.tsx`
- `packages/components/src/molecules/Pagination/index.ts`
- `packages/tokens/src/semantic/pagination.json`

### Props
- **currentPage:** number (1-basiert)
- **totalPages:** number
- **onPageChange:** (page: number) => void
- **siblingCount:** number (default 1)
- **variant:** default | compact

### Architecture
- Smart ellipsis algorithm: always show first + last page, siblingCount pages on each side
- Compact variant: "Seite X von Y" with prev/next only
- Disabled prev on page 1, disabled next on last page

### Test Coverage
- ✅ 18 Tests – alle bestanden
- Tests: Page buttons, active highlight, prev/next buttons, disabled states, onPageChange, ellipsis, siblingCount, compact variant, custom className, token classes

### Storybook
- **Stories:** Default, ManyPages, FirstPage, LastPage, CompactVariant, FewPages, Training:SessionHistory

---

## [ToggleGroup] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom
**Radix:** @radix-ui/react-toggle-group
**L4 Tokens:** 8 (7 color + 1 radius)
**Tests:** 12 | **Stories:** 5

---

## [Sheet] - 2026-02-14

**Status:** ✅ Complete
**Level:** Molecule
**Radix:** @radix-ui/react-dialog (reused)
**Sub-Components:** Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter
**L4 Tokens:** 7 (5 color + 1 shadow + 1 spacing)
**Tests:** 10 | **Stories:** 6

---

## [Dialog] - 2026-02-14

**Status:** ✅ Complete
**Level:** Molecule
**Radix:** @radix-ui/react-dialog
**Sub-Components:** Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
**L4 Tokens:** 9 (5 color + 1 shadow + 1 radius + 2 spacing)
**Tests:** 10 | **Stories:** 6

---

## [Breadcrumbs] - 2026-02-14

**Status:** ✅ Complete
**Level:** Molecule
**Sub-Components:** Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator
**L4 Tokens:** 4 (4 color)
**Tests:** 10 | **Stories:** 5

---

## [Avatar] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom
**Radix:** @radix-ui/react-avatar
**Sub-Components:** Avatar, AvatarImage, AvatarFallback
**L4 Tokens:** 4 (3 color + 1 radius)
**Tests:** 11 | **Stories:** 5

---

## [Slider] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom
**Radix:** @radix-ui/react-slider
**L4 Tokens:** 7 (5 color + 2 radius)
**Tests:** 10 | **Stories:** 6

---

## [Command] - 2026-02-14

**Status:** ✅ Complete
**Level:** Organism
**Library:** cmdk
**Sub-Components:** Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut
**L4 Tokens:** 12 (9 color + 1 shadow + 1 radius + 1 spacing)
**Tests:** 12 | **Stories:** 6

---

## [HoverCard] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom
**Radix:** @radix-ui/react-hover-card
**Sub-Components:** HoverCard, HoverCardTrigger, HoverCardContent
**L4 Tokens:** 5 (2 color + 1 shadow + 1 radius + 1 spacing)
**Tests:** 8 | **Stories:** 5

---

## [Collapsible] - 2026-02-14

**Status:** ✅ Complete
**Level:** Molecule
**Radix:** @radix-ui/react-collapsible
**Sub-Components:** Collapsible, CollapsibleTrigger, CollapsibleContent
**L4 Tokens:** 0 (keine eigenen Tokens)
**Tests:** 8 | **Stories:** 5

---

## [AspectRatio] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom (Utility)
**Radix:** @radix-ui/react-aspect-ratio
**L4 Tokens:** 0 (keine eigenen Tokens)
**Tests:** 6 | **Stories:** 4

---

## [ScrollArea] - 2026-02-14

**Status:** ✅ Complete
**Level:** Atom
**Radix:** @radix-ui/react-scroll-area
**Sub-Components:** ScrollArea, ScrollBar
**L4 Tokens:** 4 (3 color + 1 radius)
**Tests:** 8 | **Stories:** 5

---

## [ThemeProvider + ThemeToggle] - 2026-02-14

**Status:** ✅ Complete
**Level:** System + Atom
**Description:** Dark Mode System mit CSS class strategy (.dark auf html), React Context, localStorage Persistenz
**Sub-Components:** ThemeProvider, ThemeToggle, useTheme Hook
**Dark Token CSS:** packages/styles/dist/dark-tokens.css
**Tests:** 21 (13 ThemeProvider + 8 ThemeToggle) | **Stories:** 6

---

## [Chart] - 2026-02-14

**Status:** ✅ Complete
**Level:** Organism
**Library:** Recharts
**Sub-Components:** ChartContainer, ChartTooltipContent, ChartLegendContent + Recharts Re-exports
**L4 Tokens:** 12 (10 color + 1 shadow + 1 radius)
**Tests:** 15 | **Stories:** 7

---

## [Form] - 2026-02-14

**Status:** ✅ Complete
**Level:** Molecule
**Libraries:** react-hook-form, zod, @hookform/resolvers
**Sub-Components:** Form, FormField, FormMessage + useZodForm, useFormContext Hooks
**L4 Tokens:** 0 (nutzt existierende Input/Error Tokens)
**Tests:** 16 | **Stories:** 7

---

## Development Statistics

**Total Components:** 47 (47 complete)
**System:** 1 (ThemeProvider + useTheme)
**Atoms:** 19 (Button, Badge, Input, Checkbox + CheckboxField, Switch + SwitchField, Tooltip, Progress + ProgressField, Spinner, Skeleton, Separator, Popover, Alert, ToggleGroup, Avatar, Slider, HoverCard, ScrollArea, AspectRatio, ThemeToggle)
**Molecules:** 20 (InputField, DatePicker + Calendar + DateRangePicker, Select + Combobox + MultiSelect, Textarea, FileUpload, Toast, RadioGroup, Tabs, Accordion, DropdownMenu, EmptyState, Pagination, Sheet, Dialog, Breadcrumbs, Collapsible, Form)
**Organisms:** 5 (Card, Table, Modal, Chart, Command)
**Templates:** 0

**Test Infrastructure:** ✅ Vitest + Testing Library + jsdom + Coverage + ResizeObserver Polyfill
**Test Coverage:** Alle 47 Components 100% getestet (exkl. Button: nur manuell geprüft)
**Storybook Stories:** 325 Stories
**Design Tokens:** 428 L4-Tokens (356 bestehend + 72 neu: ToggleGroup: 8, Sheet: 7, Dialog: 9, Breadcrumbs: 4, Avatar: 4, Slider: 7, Command: 12, HoverCard: 5, ScrollArea: 4, Chart: 12) + 7 L3 Tokens + 3 L2 + 3 L1
**Total Tests:** 812
**Dark Mode:** ✅ CSS class strategy (.dark) mit 70+ Token-Overrides
**Charts:** ✅ Recharts Integration (Line, Bar, Area, Pie)
**Forms:** ✅ React Hook Form + Zod Integration

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

### 2026-02-13 - DatePicker Component
- Custom Calendar statt externe Lib – volle Design-Kontrolle + Token-Integration
- Radix UI Popover für Overlay (Portal, Positioning, Dismiss on Outside Click)
- date-fns für Datumslogik (leichtgewichtig, tree-shakeable)
- **Learnings:**
  - `Popover.Trigger` klaut Focus beim Tippen → `Popover.Anchor` + manuelle Open-Steuerung
  - `onOpenAutoFocus={(e) => e.preventDefault()}` verhindert Focus-Jump in Popover
  - German locale: `{ locale: de }` in date-fns format/parse für "Januar", "Februar" etc.
  - `weekStartsOn: 1` für Montag-Start (Standard in DE/Europa)
  - Calendar als eigenständige exportierte Component → wiederverwendbar ohne DatePicker
  - Hidden `<input type="hidden">` für Form-Submission im ISO-Format (yyyy-MM-dd)

### 2026-02-13 - Select / Combobox / MultiSelect Components
- Three new Molecules: Select (single), Combobox (searchable), MultiSelect (checkboxes + badges)
- Radix UI Popover (same pattern as DatePicker) + Radix Checkbox for MultiSelect
- Input CVA reused for trigger styling → consistent heights/borders with Input/Button
- 28 L4 tokens (22 Color + 1 Shadow + 2 Radius + 4 Spacing)
- 81 tests, 22 stories, all passing
- **Learnings:**
  - `scrollIntoView` not available in jsdom → mock in test-setup.ts
  - SVG `className` in jsdom is `SVGAnimatedString` → use `getAttribute('class')` in tests
  - Popover.Anchor + manual open state = full control over focus (same as DatePicker)
  - `inputVariants` from Input atom reusable for trigger styling → DRY token usage
  - `--radix-popover-trigger-width` CSS var matches popover to trigger width automatically
  - MultiSelect stays open after selection; Select closes → different UX patterns
  - Badge overflow pattern: show N badges + "+remaining" counter

### 2026-02-13 - Textarea + FileUpload Components
- Textarea reuses all Input tokens (only 4 new: counter-text, counter-text-over, min/max-height)
- FileUpload with full drag & drop, file validation, image preview, progress bar (21 new tokens)
- 86 new tests (36 Textarea + 50 FileUpload), 25 new stories
- **Learnings:**
  - `Object.defineProperty(input, 'files', ...)` needs `configurable: true` in tests for re-assignment
  - Textarea `maxLength` deliberately does NOT use HTML attribute → lets users type beyond limit, shows visual warning
  - `URL.createObjectURL`/`revokeObjectURL` for image preview with cleanup on unmount to prevent memory leaks
  - Auto-resize: measure `scrollHeight` after reset to `auto` height, cap at max-height token value
  - File input `e.target.value = ''` after change event so same file can be re-selected

### 2026-02-13 - FileUpload Design v2 ("Sichtbar aber nicht laut")
- Zone border von `border.muted` (gray-200) → `border.default` (gray-300) für Sichtbarkeit
- Icon von grau (`text.disabled`) → Sky Blue (`interactive.primary` = sky-500) als Brand Color
- Icon von 32px → 48px, prominenter
- Hover State hinzugefügt: solid sky border, sky-50 bg, icon scale 110%
- Drag-Over Icon: `animate-bounce` statt nur color change
- Zone text: `font-medium` für bessere Lesbarkeit
- 3 neue Tokens: `zone-text-sub`, `hover-bg`, `hover-border` (21 → 24 total)
- **Learnings:**
  - `border.muted` (200) ist zu hell für interaktive Elemente → `border.default` (300) minimum
  - Upload-Icons IMMER in Brand Color – grau wirkt disabled/inaktiv
  - Hover State ist Pflicht für clickable areas – ohne wirkt es nicht interaktiv
  - `group` + `group-hover:scale-110` für Parent-gesteuerte Icon-Animation
  - Nordisch = "sichtbar aber nicht laut" – gray-50 bg + gray-300 border + sky-500 accent

### 2026-02-13 - Token Hierarchy Audit (Full Compliance)
- **14 component files audited**, violations found in 6 components
- **Violations fixed:**
  - `bg-white` → `bg-[var(--color-card-bg)]` / `bg-[var(--color-input-bg)]` (Card, Input, Textarea, MultiSelect)
  - `text-white` → `text-[var(--color-select-checkbox-text)]` (MultiSelect checkbox)
  - `shadow-sm/lg` → `[box-shadow:var(--shadow-card-raised/elevated)]` (Card)
  - `hover:shadow-xl` → `hover:[box-shadow:var(--shadow-card-hover)]` (Card)
  - `pr-10` / `px-3` → token-based icon spacing (Input, DatePicker, DateRangePicker)
  - `py-2/2.5/3` → `py-[var(--spacing-textarea-padding-y-sm/md/lg)]` (Textarea)
  - `rounded-md` → `rounded-[var(--radius-fileupload-item)]` (FileUpload)
  - `#ffffff` in token JSONs → `{color.bg.paper}` (Select, DatePicker)
- **New infrastructure tokens:**
  - L1: `color.base.white`, `color.base.black`
  - L2: `color.neutral.white`, `color.neutral.black`, `sizing.padding-y.xl`
  - L3: `color.bg.paper`, `color.text.on-primary`, `sizing.component.padding-y.xl`
  - L4: 9 new tokens across Card, Input, Select, Textarea, FileUpload
- **Learnings:**
  - `bg-white` ist die häufigste Violation → `color.bg.paper` als L3 Role für "Papier-Optik"
  - Tailwind `shadow-[var()]` funktioniert, aber `[box-shadow:var()]` ist sicherer für compound shadows
  - L4 Token `#ffffff` ist genauso eine Violation wie `bg-white` im TSX!
  - `sizing.component.height.md` (40px) wiederverwendbar als icon-inset spacing
  - Micro-Spacing (`gap-1.5`, `p-2`, `py-1`) bleibt als strukturelle Konstante akzeptabel

### 2026-02-13 - Modal + Toast Components
- Two new Radix UI-based components: Dialog (Organism) + Toast (Molecule)
- New token infrastructure: `color.base.overlay` (rgba) → L2 → L3 `color.bg.overlay` + `shadow.elevation.overlay`
- `tailwindcss-animate` added for Radix data-[state] animations (fade, zoom, slide)
- Toast uses border-left accent pattern (not full-colored background) – elegant, not loud
- **Learnings:**
  - Overlay color `rgba(0,0,0,0.5)` is a valid L1 base color – still needs full 4-layer chain
  - Lucide icons use `LucideIcon` type, not `React.FC<{size?, className?}>` (TS strict mode)
  - `tailwindcss-animate` must be in Tailwind config plugins AND installed in components package
  - Toast z-[100] > Modal z-50 – toasts must render above dialogs
  - Auto-dismiss durations should match severity: errors=7s, warnings=5s, info=4s, success=3s
  - Radix Dialog doesn't set `aria-modal` in jsdom – test with `role="dialog"` instead

### 2026-02-13 - Checkbox + RadioGroup + Switch Components
- Three new Radix UI-based form components: Checkbox (Atom), RadioGroup (Molecule), Switch (Atom)
- CheckboxField + SwitchField wrappers for label + description pattern
- 31 new L4 tokens (Checkbox: 11, RadioGroup: 12, Switch: 8) – all reference L3 only
- 63 new tests (21 + 20 + 22), 34 new stories (13 + 9 + 12)
- **Learnings:**
  - Radix roving focus (arrow keys in RadioGroup) doesn't trigger `onValueChange` in jsdom – test focus instead
  - `document.getElementById(id)?.click()` delegates row clicks to radio input for larger click targets
  - Switch thumb translation: `translate-x-0.5` (off) + `translate-x-[22px]` (on) for edge-to-edge travel
  - `[box-shadow:var(--shadow-switch-thumb)]` for consistent thumb shadow via token
  - CheckboxField/SwitchField share the same label + description pattern – consistent UX across form controls
  - RadioGroup orientation prop: `flex-col gap-3` (vertical) vs `flex-row gap-4` (horizontal)

### 2026-02-14 - Navigation & Layout Components (Tooltip, Tabs, Accordion, DropdownMenu)
- Four new Radix UI-based components: Tooltip (Atom), Tabs (Molecule), Accordion (Molecule), DropdownMenu (Molecule)
- 51 new L4 tokens (Tooltip: 7, Tabs: 17, Accordion: 11, DropdownMenu: 17)
- 56 new tests (Tooltip: 8, Tabs: 16, Accordion: 16, DropdownMenu: 16), 23 new stories
- ResizeObserver polyfill added to `test-setup.ts` for Radix components in jsdom
- **Learnings:**
  - Radix Tooltip renders content in portal – use `getByRole('tooltip')` instead of `getByText()` to avoid duplicate matches
  - Radix Accordion removes content from DOM when closed → test with `aria-expanded` instead of `toBeVisible()`
  - SVG `.className` is `SVGAnimatedString` in jsdom – use `getAttribute('class')` for assertions
  - CVA `VariantProps` includes `null` – use null-coalesce (`??`) when passing to React context
  - Tabs variant context pattern: TabsList provides variant via React context, TabsTrigger consumes it

### 2026-02-14 - Final 5 Components (Separator, Popover, Alert, EmptyState, Pagination)
- Five final components completing the design system: Separator (Atom), Popover (Atom), Alert (Atom), EmptyState (Molecule), Pagination (Molecule)
- 34 new L4 tokens (Separator: 1, Popover: 5, Alert: 15, EmptyState: 5, Pagination: 8)
- 75 new tests (Separator: 14, Popover: 9, Alert: 21, EmptyState: 13, Pagination: 18), 33 new stories
- **Learnings:**
  - Separator: Simple `<hr>` for horizontal, `<div>` for vertical — `aria-hidden` for decorative, `role="separator"` for non-decorative
  - Popover: Same Radix pattern as Tooltip but click-triggered — `showArrow` prop cleaner than separate Arrow export
  - Alert: CVA variant classes + auto-icon map per variant — `border-l-4` accent more visually distinct than full border
  - EmptyState: Pure presentational molecule — variant controls icon color only, simple variantIconClassMap approach
  - Pagination: Smart ellipsis algorithm (getPageRange) — always show first+last, siblingCount-based window, compact variant for mobile

### 2026-02-14 - Loading & Feedback Components (Progress, Spinner, Skeleton)
- Three new Atom components: Progress (Radix), Spinner (SVG), Skeleton (CSS)
- 23 new L4 tokens (Progress: 12, Spinner: 7, Skeleton: 4)
- 48 new tests (Progress: 20, Spinner: 15, Skeleton: 13), 20 new stories
- ProgressField molecule (label + value display) included in Progress atom file
- Skeleton shimmer via inline `linear-gradient` style + injected `@keyframes`
- **Learnings:**
  - CVA `VariantProps` and HTML native `color` attribute conflict — Omit `color` from Radix root props when defining custom color variant
  - Spinner sizes (16/24/32/48px) map to L1 spacing base tokens (`spacing.base.4/6/8/12`), not L3 component heights
  - Skeleton shimmer works best with inline `style` for gradient + `@keyframes` injected via `<style>` tag — no Tailwind plugin needed
  - `aria-hidden="true"` for Skeleton elements (decorative), `role="status"` for Spinner, `role="progressbar"` for Progress
  - Radix Progress doesn't set `aria-valuenow` when value is undefined — correct for indeterminate state

**Last Updated:** 2026-02-14
**Design System Status:** ✅ Complete (32 Components, alle Essential Components fertig)
