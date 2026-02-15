# 📐 Nordlig Design System - Projekt-Regeln

**Version:** 1.0.0-alpha  
**Status:** Foundation Phase  
**Zuletzt aktualisiert:** 13.02.2026

---

## 🧠 Verbindliche Instruktionen für AI-Assistenten

Diese Datei ist die **führende Quelle** für alle Entwicklungsentscheidungen im Nordlig Design System. Alle AI-Assistenten (Claude, ChatGPT, etc.) müssen diese Regeln befolgen.

### Grundprinzipien

1. **Diese Datei ist die Wahrheit** - Bei Widersprüchen zwischen Code und Dokumentation: Die Dokumentation gilt.
2. **Keine Breaking Changes ohne Diskussion** - Token-Änderungen propagieren zu allen Consumer-Apps.
3. **4-Layer Hierarchie ist sakrosankt** - NIEMALS Ebenen überspringen.
4. **Storybook ist Pflicht** - Jede Änderung muss dokumentiert werden.
5. **Accessibility ist nicht optional** - WCAG 2.1 AA Minimum.
6. **Development Log Pflicht** - Jede Component wird in COMPONENT_LOG.md dokumentiert.

### Prioritätenhierarchie

```
1. Accessibility & Standards (WCAG, W3C DTCG)
2. Token-Hierarchie Integrität (4-Layer System)
3. Consumer-App Kompatibilität (Breaking Changes vermeiden)
4. Developer Experience (klare APIs, gute Docs)
5. Performance (Bundle Size, CSS Complexity)
```

---

## 🏗️ 4-Layer Token-Hierarchie (STRICT!)

### Das Gesetz der Hierarchie

```
Level 4: SEMANTIC    → referenziert NUR Level 3
Level 3: ROLES       → referenziert NUR Level 2  
Level 2: GLOBAL      → referenziert NUR Level 1
Level 1: BASE        → enthält NUR rohe Werte (Hex, px, etc.)
```

**VERBOTEN:**
- ❌ Level 4 → Level 1 (Ebenen überspringen)
- ❌ Level 3 → Level 1 (Ebenen überspringen)
- ❌ Level 2 mit Hex-Werten (gehört in Level 1)
- ❌ Semantische Namen in Level 1 ("error-red" → "red")

### Wann neue Tokens anlegen?

#### Level 1 (Base) - Selten!
**Nur wenn:**
- Neue Farbpalette benötigt wird (z.B. "purple" für neue Brand)
- Neue Spacing-Stufe fehlt (z.B. "9" zwischen "8" und "10")
- Neue Font-Family hinzukommt

**Prozess:**
1. Prüfen ob existierende Palette ausreicht (meist JA!)
2. Mit Team diskutieren (Breaking Change Potential)
3. In `packages/tokens/src/base/*.json` hinzufügen
4. Vollständige Palette anlegen (50-950 Shades für Farben)

#### Level 2 (Global) - Manchmal
**Nur wenn:**
- Neues Theme benötigt wird (Dark Mode, Forest Theme)
- Neue semantische Kategorie (z.B. "tertiary" Button)

**Prozess:**
1. Prüfen ob Level 3 ausreicht (meist JA!)
2. Konsistent mit existierenden Patterns
3. In `packages/tokens/src/global/*.json` hinzufügen

#### Level 3 (Roles) - Öfter
**Nur wenn:**
- Neue funktionale Rolle benötigt wird (z.B. "overlay", "tooltip")
- Neue semantische Feedback-Kategorie

**Prozess:**
1. Prüfen ob existierende Roles ausreichen
2. Logische Gruppierung beibehalten
3. In `packages/tokens/src/roles/*.json` hinzufügen

#### Level 4 (Semantic) - Häufig
**Immer wenn:**
- Neue Komponente erstellt wird
- Bestehende Komponente neue Varianten bekommt

**Prozess:**
1. Neue Datei `packages/tokens/src/semantic/{component}.json`
2. Referenziert AUSSCHLIESSLICH Level 3
3. Gruppiert nach Komponenten-Properties

---

## 🎨 Atomic Design Prinzipien

### Component Hierarchie

```
Atoms       → Button, Input, Label, Badge, Icon
Molecules   → InputField (Label + Input + Error), Select
Organisms   → Card, Table, Modal, Navigation
Templates   → DashboardLayout, DetailPageLayout
Pages       → (in Consumer-Apps, nicht im Design System)
```

### Regeln

1. **Atoms** haben keine Dependencies auf andere Components
2. **Molecules** bestehen aus Atoms + max. 1 andere Molecule
3. **Organisms** können alles nutzen, aber simpel halten
4. **Templates** definieren Layout, nicht Content

### Neue Komponente anlegen - Checkliste

- [ ] **1. Token-Check:** Prüfe ob alle Tokens existieren
  - [ ] Level 4 Semantic Token-Datei erstellt
  - [ ] Fehlende Level 3 Roles ergänzt
  - [ ] `pnpm build:tokens` läuft fehlerfrei
  
- [ ] **2. Component Implementation:**
  - [ ] TypeScript Interface definiert
  - [ ] CVA Variants konfiguriert
  - [ ] Radix UI Primitives genutzt (wenn applicable)
  - [ ] Nur CSS Custom Properties verwendet (keine Hardcoded Values!)
  
- [ ] **3. Accessibility:**
  - [ ] ARIA Labels vorhanden
  - [ ] Keyboard Navigation funktioniert
  - [ ] Focus Indicators sichtbar
  - [ ] Screen Reader tested
  
- [ ] **4. Tests:**
  - [ ] Unit Tests (Vitest) geschrieben
  - [ ] Visual Regression (Chromatic) konfiguriert
  - [ ] Accessibility Tests (Axe) bestanden
  
- [ ] **5. Storybook:**
  - [ ] Stories für alle Variants
  - [ ] Controls für Properties
  - [ ] Docs mit Usage Examples
  - [ ] A11y Add-on aktiviert

- [ ] **6. Design & UX Review:**
  - [ ] Visuelle Konsistenz mit bestehenden Komponenten geprueft
  - [ ] Alle States (Hover, Focus, Active, Disabled) geprueft
  - [ ] Dark Mode geprueft
  - [ ] Keyboard-Navigation getestet
  - [ ] Screenshot in `/Screenshots/` abgelegt

---

## 📝 Token Naming Conventions

### Farben

```
Level 1: color-base-{palette}-{shade}
         color-base-sky-500

Level 2: color-{type}-{index}-{shade}
         color-primary-1-500
         color-accent-3-700

Level 3: color-{function}-{variant}
         color-bg-primary
         color-text-error
         color-border-focus

Level 4: color-{component}-{property}-{variant}
         color-btn-primary-bg
         color-input-border-error
         color-card-shadow
```

### Spacing

```
Level 1: spacing-base-{number}
         spacing-base-4

Level 2: spacing-{size}
         spacing-md

Level 3: spacing-{context}-{property}-{size}
         spacing-component-padding-md
         spacing-layout-gutter

Level 4: spacing-{component}-{property}
         spacing-btn-padding-x
         spacing-card-gap
```

### Typografie

```
Level 1: font-base-{category}-{variant}
         font-base-family-sans
         font-base-size-lg
         font-base-weight-bold

Level 2: font-{style}-{property}
         font-heading-family
         font-body-size

Level 3: font-{function}-{property}
         font-label-size
         font-caption-weight

Level 4: font-{component}-{property}
         font-btn-size
         font-input-family
```

---

## 🔒 Token Hierarchy Enforcement - CRITICAL & MANDATORY

### ⚠️ Prompt-Werte sind BEISPIELE — KEINE Implementierungswerte!

Wenn ein Prompt, eine Anweisung oder ein Design-Mockup konkrete Werte wie `bg-white`, `text-gray-700`, `rounded-md`, `shadow-lg`, `px-4` enthält, sind das **BEISPIELE zur Kommunikation der Absicht**. Sie dürfen **NIEMALS** direkt als Tailwind-Klassen in den Code übernommen werden.

**Jeder Wert MUSS durch die 4-Layer Token-Hierarchie übersetzt werden:**

```
Prompt sagt: "bg-white"
  → L1: color.base.white (#ffffff)
  → L2: color.neutral.white ({color.base.white})
  → L3: color.bg.paper ({color.neutral.white})
  → L4: color.{component}.bg ({color.bg.paper})
  → Code: bg-[var(--color-{component}-bg)]
```

### Absolute Regeln

#### 1. KEINE hardcoded Tailwind-Klassen für themeable Werte

```tsx
// ❌ VERBOTEN — hardcoded Farbe
<div className="bg-white text-gray-700 border-gray-200">

// ✅ RICHTIG — Token-basiert
<div className="bg-[var(--color-card-bg)] text-[var(--color-text-base)] border-[var(--color-card-border)]">
```

#### 2. KEINE hardcoded Spacing für component-spezifische Werte

```tsx
// ❌ VERBOTEN — hardcoded Spacing
<input className="px-4 py-2 pr-10" />

// ✅ RICHTIG — Token-basiert
<input className="px-[var(--spacing-input-padding-x)] py-[var(--spacing-input-padding-y)] pr-[var(--spacing-input-icon-inset)]" />
```

#### 3. KEINE hardcoded Shadows

```tsx
// ❌ VERBOTEN
<div className="shadow-sm hover:shadow-lg">

// ✅ RICHTIG — Arbitrary Property Syntax für compound shadows
<div className="[box-shadow:var(--shadow-card-raised)] hover:[box-shadow:var(--shadow-card-hover)]">
```

#### 4. KEINE hardcoded Radii für Components

```tsx
// ❌ VERBOTEN
<div className="rounded-md">

// ✅ RICHTIG
<div className="rounded-[var(--radius-card)]">
```

#### 5. KEINE Hex-Werte in Level 4 Token-Dateien

```json
// ❌ VERBOTEN — Hex in L4 semantic token
{ "$value": "#ffffff" }

// ✅ RICHTIG — Referenz auf L3 Role
{ "$value": "{color.bg.paper}" }
```

#### 6. KEINE Ebenen überspringen

```json
// ❌ VERBOTEN — L4 referenziert L1 direkt
{ "$value": "{color.base.sky.500}" }

// ✅ RICHTIG — L4 referenziert L3
{ "$value": "{color.interactive.primary}" }
```

### Häufige Violations & Fixes

| Violation | Tailwind-Klasse | Token-Fix | Beispiel |
|-----------|----------------|-----------|----------|
| White Background | `bg-white` | `bg-[var(--color-{comp}-bg)]` | L4 → `{color.bg.paper}` |
| White Text | `text-white` | `text-[var(--color-{comp}-text)]` | L4 → `{color.text.on-primary}` |
| Gray Background | `bg-gray-50` | `bg-[var(--color-{comp}-bg)]` | L4 → `{color.bg.surface}` |
| Border Color | `border-gray-200` | `border-[var(--color-{comp}-border)]` | L4 → `{color.border.default}` |
| Text Color | `text-gray-700` | `text-[var(--color-{comp}-text)]` | L4 → `{color.text.base}` |
| Shadow | `shadow-sm` | `[box-shadow:var(--shadow-{comp}-*)]` | L4 → `{shadow.elevation.low}` |
| Radius | `rounded-md` | `rounded-[var(--radius-{comp})]` | L4 → `{radius.component.md}` |
| Spacing | `px-4`, `py-2` | `px-[var(--spacing-{comp}-*)]` | L4 → `{spacing.component.padding.md}` |
| Icon Spacing | `pr-10` | `pr-[var(--spacing-{comp}-icon-inset)]` | L4 → `{sizing.component.height.md}` |
| Hex in JSON | `"#ffffff"` | `"{color.bg.paper}"` | L3 Role-Referenz |

### Prompt-Interpretation: Übersetzungsbeispiele

Wenn ein Prompt sagt:

| Prompt-Anweisung | Bedeutung | Korrekte Implementierung |
|-----------------|-----------|-------------------------|
| "Verwende `bg-white`" | Hintergrund soll weiß sein | L4 Token → `{color.bg.paper}` → `bg-[var(--color-{comp}-bg)]` |
| "Icon soll sky-blue sein" | Icon braucht Primary-Farbe | L4 Token → `{color.interactive.primary}` → `text-[var(--color-{comp}-icon)]` |
| "Schatten wie `shadow-lg`" | Elevation soll hoch sein | L4 Token → `{shadow.elevation.high}` → `[box-shadow:var(--shadow-{comp}-*)]` |
| "Padding `px-4 py-2`" | Standard Component Padding | L4 Token → `{spacing.component.padding.md}` → `px-[var(--spacing-{comp}-padding-x)]` |
| "Abgerundete Ecken `rounded-lg`" | Größerer Radius | L4 Token → `{radius.component.lg}` → `rounded-[var(--radius-{comp})]` |
| "Grauer Hintergrund" | Surface/Muted Background | L4 Token → `{color.bg.surface}` → `bg-[var(--color-{comp}-bg)]` |

### Token-Erstellung: Wenn Tokens fehlen

Wenn ein benötigter Token nicht existiert, **erstelle ihn auf der richtigen Ebene**:

```
1. Prüfe: Existiert ein passender L3 Role Token?
   → JA: Erstelle L4 Token der L3 referenziert
   → NEIN: Weiter zu Schritt 2

2. Prüfe: Existiert ein passender L2 Global Token?
   → JA: Erstelle L3 Role Token, dann L4
   → NEIN: Weiter zu Schritt 3

3. Prüfe: Existiert ein passender L1 Base Token?
   → JA: Erstelle L2 → L3 → L4 Kette
   → NEIN: Erstelle L1 → L2 → L3 → L4 Kette
```

**Beispiel: `color.bg.paper` fehlte für weiße Hintergründe:**

```
L1: color.base.white = #ffffff           (base/colors.json)
L2: color.neutral.white = {color.base.white}    (global/colors.json)
L3: color.bg.paper = {color.neutral.white}       (roles/colors.json)
L4: color.card.bg = {color.bg.paper}             (semantic/card.json)
```

### Verification: Audit-Befehle

Nach jeder Component-Entwicklung MÜSSEN diese Checks durchgeführt werden:

```bash
# 1. Suche nach hardcoded Farben in TSX-Dateien
grep -rn "bg-white\|bg-gray\|bg-slate\|text-white\|text-gray\|border-gray" \
  packages/components/src/**/*.tsx

# 2. Suche nach hardcoded Spacing
grep -rn "px-[0-9]\|py-[0-9]\|pr-[0-9]\|pl-[0-9]\|pt-[0-9]\|pb-[0-9]\|p-[0-9]" \
  packages/components/src/**/*.tsx

# 3. Suche nach hardcoded Shadows
grep -rn "shadow-sm\|shadow-md\|shadow-lg\|shadow-xl" \
  packages/components/src/**/*.tsx

# 4. Suche nach hardcoded Radii
grep -rn "rounded-sm\|rounded-md\|rounded-lg\|rounded-xl\|rounded-full" \
  packages/components/src/**/*.tsx

# 5. Suche nach Hex-Werten in L4 Token-Dateien
grep -rn "#[0-9a-fA-F]" packages/tokens/src/semantic/*.json

# 6. Suche nach L1-Referenzen in L4 (Ebenen überspringen)
grep -rn "color\.base\.\|spacing\.base\.\|font\.base\." \
  packages/tokens/src/semantic/*.json

# 7. Token Build verifizieren
pnpm --filter @nordlig/tokens build

# 8. Tests laufen lassen
pnpm --filter @nordlig/components test
```

**ZERO TOLERANCE:** Wenn einer dieser Checks Violations findet, müssen diese **sofort** behoben werden bevor weitergearbeitet wird.

### Erlaubte Ausnahmen

Folgende Tailwind-Klassen sind **KEINE Violations**, da sie strukturelle Layout-Klassen sind (nicht themeable):

- **Layout:** `flex`, `grid`, `block`, `inline-flex`, `relative`, `absolute`
- **Flex/Grid:** `items-center`, `justify-between`, `flex-col`, `gap-1.5` (micro-layout)
- **Sizing:** `w-full`, `h-full`, `min-w-0`, `max-w-xs`
- **Overflow:** `overflow-hidden`, `overflow-auto`, `truncate`
- **Cursor:** `cursor-pointer`, `cursor-not-allowed`
- **Transitions:** `transition-all`, `duration-200`, `ease-in-out`
- **States:** `disabled:opacity-50`, `hover:scale-110`
- **Micro-Spacing in Layouts:** `gap-1`, `gap-1.5`, `gap-2` (interne Layout-Abstände)

**ABER:** Wenn ein Spacing-Wert das visuelle Erscheinungsbild einer Component definiert (Padding, Margin des Containers), **muss** er tokenisiert werden.

---

## 📋 Token Documentation - MANDATORY

### **Centralized Token Documentation Architecture**

**IMPORTANT:** Nordlig uses a **centralized token documentation approach**, NOT per-component token stories.

**Token Documentation Location:**
```
/apps/storybook/stories/
├── Colors.stories.tsx           (ALL color tokens, L1→L2→L3→L4)
├── Spacing.stories.tsx          (ALL spacing tokens)
├── Sizing.stories.tsx           (ALL sizing tokens)
├── ShadowsAndRadii.stories.tsx  (Shadows + Border Radius)
├── Typography.stories.tsx       (Font tokens)
├── Transitions.stories.tsx      (Durations, Easings, Transitions)
└── ZIndex.stories.tsx           (Z-Index layers)
```

### Rules:

1. **NEVER** create `DesignTokens` stories inside component story files
2. **ALWAYS** add new L4 tokens to the appropriate centralized story file
3. Component stories (`*.stories.tsx` in component folders) contain **only** usage demos — no token documentation
4. Each centralized story file documents the **full 4-layer chain** (L1 → L2 → L3 → L4)
5. When adding a new component with new L4 tokens:
   - Add color tokens → `Colors.stories.tsx`
   - Add sizing tokens → `Sizing.stories.tsx`
   - Add spacing tokens → `Spacing.stories.tsx`
   - Add radius/shadow tokens → `ShadowsAndRadii.stories.tsx`
   - Add transition tokens → `Transitions.stories.tsx`
   - Add z-index tokens → `ZIndex.stories.tsx`

---

## 🖥️ Tech Stack Documentation - MANDATORY

Die Tech-Stack-Übersicht in `apps/storybook/stories/TechStack.stories.tsx` (`Overview/Tech Stack`) muss bei jeder Änderung am Tech Stack aktualisiert werden:

- **Neue Dependency hinzugefügt** → Eintrag in passender Kategorie ergänzen (Name, Version, Beschreibung, Logo)
- **Dependency entfernt** → Eintrag löschen
- **Major-Version-Upgrade** → Versionsnummer aktualisieren
- **Neues Radix UI Package** → Beschreibung im Radix-UI-Eintrag + Package-Zähler im Summary-Banner anpassen

---

## 🔄 Development Workflow

### 1. Neue Feature Branch

```bash
git checkout -b feat/component-name
# oder
git checkout -b fix/token-issue
# oder
git checkout -b docs/improve-storybook
```

### 2. Token-Änderungen

```bash
# Tokens editieren
nano packages/tokens/src/semantic/button.json

# Bauen
pnpm build:tokens

# Storybook starten
pnpm storybook

# Visuell prüfen
open http://localhost:6006
```

### 3. Component Development

```bash
# Neue Component
mkdir packages/components/src/atoms/NewComponent

# Files anlegen
touch packages/components/src/atoms/NewComponent/NewComponent.tsx
touch packages/components/src/atoms/NewComponent/NewComponent.stories.tsx
touch packages/components/src/atoms/NewComponent/index.ts

# Export in index
echo "export { NewComponent } from './atoms/NewComponent';" >> packages/components/src/index.ts
```

### 4. Testing

```bash
# Unit Tests
pnpm test

# Accessibility Check in Storybook
# → A11y Panel prüfen

# Visual Regression (wenn Chromatic konfiguriert)
pnpm chromatic
```

### 5. Commit & Push

```bash
git add -A
git commit -m "feat(button): add danger variant with error tokens"
git push origin feat/component-name
```

---

## 🚨 Breaking Changes

### Was ist ein Breaking Change?

**Im Design System ist ein Breaking Change:**

1. **Token umbenennen** - Consumer-Apps brechen
2. **Token löschen** - Consumer-Apps brechen
3. **Token-Wert drastisch ändern** - Visuelles Breaking
4. **Component API ändern** - Props umbenennen/entfernen
5. **Semantic-HTML ändern** - Accessibility/SEO Breaking

### Prozess für Breaking Changes

1. **Diskussion erforderlich** - Nicht einfach machen!
2. **Deprecation Period** - Alte Tokens behalten, neue anlegen
3. **Migration Guide** - Dokumentieren wie upgraden
4. **Major Version Bump** - 1.0.0 → 2.0.0
5. **Consumer-Apps informieren** - Vor Release!

### Beispiel: Token umbenennen

```json
// FALSCH - sofort löschen
{
  "color": {
    "btn": {
      "bg": "..." // gelöscht
    }
  }
}

// RICHTIG - Deprecation
{
  "color": {
    "btn": {
      "bg": { 
        "$value": "{color.button.background}",
        "$deprecated": "Use color-button-background instead. Will be removed in v2.0.0"
      },
      "button": {
        "background": "..."
      }
    }
  }
}
```

---

## 📚 Storybook Dokumentationspflicht

### Jede Component braucht:

1. **Stories für alle Variants**
   ```tsx
   export const Primary: Story = { args: { variant: 'primary' } };
   export const Secondary: Story = { args: { variant: 'secondary' } };
   export const Disabled: Story = { args: { disabled: true } };
   ```

2. **Interactive Controls**
   ```tsx
   argTypes: {
     variant: { control: 'select', options: ['primary', 'secondary'] },
     size: { control: 'select', options: ['sm', 'md', 'lg'] },
   }
   ```

3. **Docs with Examples**
   ```tsx
   export default {
     title: 'Atoms/Button',
     component: Button,
     tags: ['autodocs'],
   };
   ```

4. **Accessibility Notes**
   ```tsx
   parameters: {
     docs: {
       description: {
         component: 'Use `aria-label` when button has no text content.',
       },
     },
   },
   ```

### Token Stories

Für jede Token-Kategorie eine Story die **alle 4 Level** zeigt:

```tsx
// packages/components/src/tokens/ColorTokens.stories.tsx

export const ColorHierarchy: Story = {
  render: () => (
    <div>
      <h3>Level 1: Base</h3>
      <ColorSwatch color="var(--color-base-sky-500)" />
      
      <h3>Level 2: Global</h3>
      <ColorSwatch color="var(--color-primary-1-500)" />
      
      <h3>Level 3: Roles</h3>
      <ColorSwatch color="var(--color-bg-primary)" />
      
      <h3>Level 4: Semantic</h3>
      <ColorSwatch color="var(--color-btn-primary-bg)" />
    </div>
  ),
};
```

---

## ✅ Testing Requirements

### Minimum Requirements

| Test Type | Tool | Coverage |
|-----------|------|----------|
| Unit Tests | Vitest | >80% |
| Visual Regression | Chromatic (planned) | All Components |
| Accessibility | Storybook Axe Add-on | WCAG 2.1 AA |
| Type Safety | TypeScript | Strict Mode |

### Test Template

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-btn-primary-bg)]');
  });

  it('is keyboard accessible', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(document.activeElement).toBe(button);
  });
});
```

---

## 🎯 Accessibility Checklist

Jede Component muss:

- [ ] **Keyboard Navigation** - Tab, Enter, Escape funktionieren
- [ ] **Focus Indicators** - Sichtbarer Focus Ring (nie `outline: none` ohne Alternative!)
- [ ] **ARIA Labels** - Beschreibende Labels für Screen Reader
- [ ] **Color Contrast** - Min. 4.5:1 für Text, 3:1 für UI Components
- [ ] **Touch Targets** - Min. 44×44px für interaktive Elemente
- [ ] **Screen Reader Test** - Mit VoiceOver/NVDA getestet
- [ ] **No Motion Preference** - Respektiert `prefers-reduced-motion`

### Tools

```bash
# Storybook A11y Add-on automatisch aktiv
# → Violations im A11y Panel sichtbar

# Manual Testing
# Mac: VoiceOver (Cmd + F5)
# Windows: NVDA (kostenlos)
```

---

## 📦 Release & Versioning

### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH
  |     |     |
  |     |     └─ Bug Fixes
  |     └─────── New Features (backward compatible)
  └───────────── Breaking Changes
```

### Release Checklist

- [ ] **Tests bestehen** - `pnpm test` grün
- [ ] **Tokens gebaut** - `pnpm build:tokens` fehlerfrei
- [ ] **Components gebaut** - `pnpm build` fehlerfrei
- [ ] **Storybook deployed** - Visual Review möglich
- [ ] **CHANGELOG.md** - Alle Änderungen dokumentiert
- [ ] **Version Bump** - `pnpm version [major|minor|patch]`
- [ ] **Git Tag** - `git tag v1.0.0`
- [ ] **Consumer-Apps testen** - Training Analyzer etc.
- [ ] **Publish** - `pnpm publish` (wenn npm Registry)

---

## 🔧 Troubleshooting

### Problem: "No utility classes detected"

```bash
# Tailwind findet Components nicht
# Fix: Content Path in tailwind.config.js prüfen

# Richtig:
content: ['../../packages/components/src/**/*.{ts,tsx}']

# Falsch:
content: ['../../../packages/components/src/**/*.{ts,tsx}']
```

### Problem: "Token collision detected"

```bash
# Style Dictionary warnt bei doppelten Tokens
# Meist harmlos (z.B. neutral-1 und secondary-1 → beide slate)

# Ignorieren wenn gewollt, sonst:
# → Level 2 Global Tokens anpassen
```

### Problem: CSS Variables nicht geladen

```bash
# Storybook zeigt unstyled Components
# Fix: preview.ts prüfen

import '../../../packages/styles/dist/tokens.css';
```

---

## 📋 Development Log

### COMPONENT_LOG.md - Pflicht!

Jede Component-Entwicklung MUSS dokumentiert werden:

```markdown
## [ComponentName] - YYYY-MM-DD

**Status:** ✅ Complete | 🚧 In Progress | 📏 Planned
**Developer:** Name
**Level:** Atom | Molecule | Organism

### Tokens Created
- Level 4: Liste aller neuen Tokens

### Files
- packages/components/src/.../Component.tsx
- packages/components/src/.../Component.stories.tsx
- packages/components/src/.../Component.test.tsx

### Variants
- variant: primary, secondary
- size: sm, md, lg

### Test Coverage
- XX% (Ziel: >80%)

### Accessibility
- ✅ Keyboard Navigation
- ✅ Focus Indicators
- ✅ ARIA Labels
- ✅ Color Contrast

### Storybook
- URL: http://localhost:6006/?path=/story/...
- Stories: Liste

### Notes
- Wichtige Design-Entscheidungen
- Use Cases
- Learnings

### Breaking Changes
- Keine | Liste

### Issues / Todos
- [ ] Offene Punkte
```

### Workflow

**1. Vor dem Start:**
```bash
# COMPONENT_LOG.md öffnen
# Neuen Eintrag mit Status "🚧 In Progress" anlegen
```

**2. Während Entwicklung:**
- Tokens dokumentieren sobald erstellt
- Files listen sobald angelegt
- Notes zu Design-Entscheidungen

**3. Nach Completion:**
```bash
# Status auf "✅ Complete" ändern
# Test Coverage eintragen
# A11y Checkliste ausfüllen
# Storybook URL hinzufügen
```

**4. Commit & Push:**
```bash
git add COMPONENT_LOG.md
git commit -m "docs: update component log for [ComponentName]"
```

### Warum?

1. **Nachvollziehbarkeit** - Wer hat wann was warum gemacht?
2. **Onboarding** - Neue Devs sehen Component-Historie
3. **Audits** - Coverage/A11y/Tokens auf einen Blick
4. **Learnings** - Was haben wir gelernt?
5. **Breaking Changes** - Klar dokumentiert

---

## 📞 Hilfe & Support

### Bei Fragen

1. **Docs lesen** - `docs/` Verzeichnis
2. **Storybook checken** - Beispiele ansehen
3. **Git History** - Wie wurde ähnliches gelöst?
4. **Mit Team diskutieren** - Besonders bei Breaking Changes

### Bei Bugs

1. **Issue erstellen** (wenn GitHub/Gitea Issue Tracker)
2. **Reproduktion beschreiben**
3. **Screenshots/Videos** anhängen
4. **Relevante Token/Component** benennen

---

## 🎯 Focus-Ring Standard (MANDATORY)

Jede interaktive Komponente MUSS einen einheitlichen Focus-Ring haben. Dieses Pattern ist verbindlich:

```tsx
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
```

### Absolute Regeln

1. **Immer `ring-2`** — niemals `ring-1` (zu schwach fuer WCAG 2.4.7)
2. **Immer `ring-offset-1`** — niemals `ring-offset-2` (einheitlicher Abstand)
3. **Immer `focus-visible:`** — niemals `focus:` (nur Tastatur-Fokus, nicht Maus-Klick)
4. **Immer `var(--color-border-focus)`** als Ring-Farbe (ausser bei Komponenten mit eigenem Focus-Token wie `--color-checkbox-focus-ring`)
5. **Niemals `outline-none` ohne Alternative** — `focus-visible:outline-none` NUR zusammen mit `focus-visible:ring-*`
6. **Kein `rounded-sm` oder andere Form-Klassen im Focus-Ring** — der Ring folgt der Komponenten-Form automatisch

### Haeufige Fehler

```tsx
// ❌ VERBOTEN — zu schwacher Ring
'focus-visible:ring-1 focus-visible:ring-[var(--color-select-trigger-border-focus)]'

// ❌ VERBOTEN — inkonsistenter Offset
'focus-visible:ring-offset-2'

// ❌ VERBOTEN — outline-none ohne Ring
'outline-none'

// ✅ RICHTIG — Standard-Pattern
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1'
```

---

## 🚫 Disabled-State Standard (MANDATORY)

Jede deaktivierbare Komponente MUSS einen einheitlichen Disabled-State haben:

### Standard-Pattern

```tsx
// Fuer native HTML-Elemente (<button>, <input>)
'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-{component}-disabled-bg)]'

// Fuer Radix-Primitives (data-Attribute)
'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:text-[var(--color-{component}-disabled-text)]'
```

### Regeln

1. **Opacity immer `50`** — niemals `60` oder andere Werte
2. **Dedizierte Farb-Tokens** fuer Disabled-Background/Text wenn moeglich
3. **cursor-not-allowed** fuer Elemente die noch sichtbar bleiben, **pointer-events-none** fuer Elemente die komplett deaktiviert werden
4. **disabled hover state** zuruecksetzen: `disabled:hover:border-[var(--color-{comp}-border)]` wenn hover-Effekte existieren

---

## 🎬 Animation & Transition Standard

### Animations-Dauer

Verwende konsistente Durations:

| Kontext | Duration | Beispiel |
|---------|----------|----------|
| Micro-Interaction | `duration-150` | Farbaenderung, Opacity |
| Standard-Transition | `duration-200` | Accordion, Collapsible, Hover |
| Overlay-Animation | `duration-300` | Sheet, Toast, Modal |
| Progress/Data | `duration-500` | Progress Bar Fill |

### Popup/Overlay-Animation

Popovers, Tooltips, Dropdowns, Selects:
```tsx
'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
```

### Collapsible/Accordion-Animation

```tsx
'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1'
'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1'
'transition-all duration-200'
```

---

## 📏 Sizing-Token Pflicht (MANDATORY)

### Alle visuellen Dimensionen MUESSEN tokenisiert werden

Hardcodierte Tailwind-Klassen fuer Component-Groessen sind **VERBOTEN**:

```tsx
// ❌ VERBOTEN — hardcoded Groessen
size: { sm: 'h-8 w-8', md: 'h-10 w-10' }

// ✅ RICHTIG — Token-basiert
size: { sm: 'h-[var(--sizing-avatar-sm)] w-[var(--sizing-avatar-sm)]' }
```

### Was tokenisiert werden MUSS

- **Component-Hoehen** (Button, Input, Toggle, Avatar, etc.)
- **Component-Breiten** (Avatar, Checkbox, Switch, etc.)
- **Icon-Groessen** innerhalb von Components
- **Font-Sizes** innerhalb von CVA-Varianten → `text-[length:var(--sizing-{comp}-{size}-font-size)]`

### Erlaubte Ausnahmen

- `h-full`, `w-full`, `min-w-0`, `max-w-xs` (Layout-Constraints)
- `h-px` (Separator/Divider — 1px ist universell)
- Lucide Icon `size={16}` Props (nicht CSS-basiert)

---

## 🔍 Design & UX Review Pflicht (MANDATORY)

Bei **jeder neuen Komponente** und bei **jeder aenderungsrelevanten Modifikation** bestehender Komponenten MUSS ein Design & UX Review durchgefuehrt werden.

### Wann ist ein Review Pflicht?

| Aenderung | Review noetig? |
|-----------|---------------|
| Neue Komponente erstellt | ✅ Ja — vollstaendiges Review |
| Variante hinzugefuegt (z.B. neuer size/variant) | ✅ Ja — Review der neuen Variante |
| Token-Werte geaendert (Farben, Spacing, Sizing) | ✅ Ja — visuelles Review |
| Layout/Struktur einer Komponente geaendert | ✅ Ja — UX Review |
| Bugfix ohne visuelle Aenderung | ❌ Nein |
| Reine Code-Refactors (kein visueller Impact) | ❌ Nein |
| Dokumentation / Stories aktualisiert | ❌ Nein |

### Review-Kriterien

Das Review prueft folgende Aspekte (orientiert an DESIGN_UX_REVIEW.md):

1. **Design-Sprache Konformitaet**
   - Passt die Komponente zur nordischen Aesthetik (Minimalismus, Klarheit, Weissraum)?
   - Sind die visuellen Proportionen harmonisch?

2. **Visuelle Konsistenz**
   - Einheitliche Spacing-, Sizing- und Radius-Werte (Token-basiert)?
   - Konsistente Farbverwendung ueber alle Varianten?
   - Hover/Focus/Active/Disabled States vollstaendig und einheitlich?

3. **Accessibility (WCAG 2.1 AA)**
   - Focus-Ring Standard eingehalten (ring-2, offset-1, focus-visible)?
   - Farbkontrast >= 4.5:1 (Text) / >= 3:1 (UI-Elemente)?
   - Touch-Target >= 44x44px fuer interaktive Elemente?
   - ARIA-Labels und Keyboard-Navigation vorhanden?

4. **Token-Architektur**
   - Alle visuellen Werte tokenisiert (keine hardcoded Tailwind-Klassen)?
   - L4 Tokens referenzieren nur L3 (keine Ebenen uebersprungen)?
   - Token-Naming konsistent mit bestehenden Patterns?

5. **UX Pattern-Konsistenz**
   - Interaktionsmuster konsistent mit aehnlichen Komponenten?
   - Animation/Transition Standards eingehalten?
   - Disabled-State Standard eingehalten?

### Review-Prozess

```
1. Storybook starten → Komponente visuell pruefen
2. Alle Varianten und States durchklicken
3. Dark Mode pruefen (falls unterstuetzt)
4. Keyboard-Navigation testen (Tab, Enter, Escape)
5. Storybook A11y Panel pruefen (keine Violations)
6. Screenshot fuer /Screenshots/ Ordner erstellen
7. Findings dokumentieren und beheben
```

### In der Checkliste

Das Review ist Teil der bestehenden "Neue Komponente anlegen - Checkliste" und wird als **letzter Schritt vor dem Commit** durchgefuehrt.

---

## 🎓 Weiterführende Docs

- [COMPONENT_LOG.md](COMPONENT_LOG.md) - Component Development History
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - 4-Layer System Deep Dive
- [TOKEN_GUIDELINES.md](docs/TOKEN_GUIDELINES.md) - Wann welche Tokens
- [COMPONENT_GUIDELINES.md](docs/COMPONENT_GUIDELINES.md) - Atomic Design Details
- [CONTRIBUTING.md](CONTRIBUTING.md) - Für externe Contributors
- [DESIGN_UX_REVIEW.md](DESIGN_UX_REVIEW.md) - Design & UX Review (14.02.2026)

---

**Letzte Änderung:** 14.02.2026
**Nächstes Review:** Bei v1.0.0 Release
