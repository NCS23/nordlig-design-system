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

## 🎓 Weiterführende Docs

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - 4-Layer System Deep Dive
- [TOKEN_GUIDELINES.md](docs/TOKEN_GUIDELINES.md) - Wann welche Tokens
- [COMPONENT_GUIDELINES.md](docs/COMPONENT_GUIDELINES.md) - Atomic Design Details
- [CONTRIBUTING.md](CONTRIBUTING.md) - Für externe Contributors

---

**Letzte Änderung:** 13.02.2026  
**Nächstes Review:** Bei v1.0.0 Release
