# 🤝 Contributing to Nordlig Design System

Vielen Dank für dein Interesse am Nordlig Design System! Diese Guidelines helfen dir, effektiv beizutragen.

---

## 🎯 Wie kann ich beitragen?

### 1. **Bug Reports** 🐛
- Suche erst nach existierenden Issues
- Verwende das Bug Report Template
- Gib klare Reproduktionsschritte an
- Screenshots/Videos wenn möglich

### 2. **Feature Requests** ✨
- Beschreibe das Problem, das du lösen willst
- Erkläre warum das Feature wichtig ist
- Gib Beispiele aus anderen Design Systems
- Diskutiere erst im Issue, bevor du Code schreibst

### 3. **Code Contributions** 💻
- Fork das Repository
- Erstelle einen Feature Branch
- Folge den Coding Standards
- Schreibe Tests
- Öffne einen Pull Request

### 4. **Documentation** 📚
- Typos fixen
- Beispiele hinzufügen
- Guides verbessern
- Übersetzungen (aktuell nur Deutsch)

---

## 🚀 Quick Start für Contributors

### Repository Setup

```bash
# Fork und Clone
git clone https://github.com/DEIN-USERNAME/nordlig-design-system.git
cd nordlig-design-system

# Dependencies installieren
pnpm install

# Tokens bauen
pnpm build:tokens

# Storybook starten
pnpm storybook

# Tests laufen lassen
pnpm test
```

### Branch Naming

```bash
git checkout -b feat/neue-component     # Neue Feature
git checkout -b fix/button-hover-bug    # Bug Fix
git checkout -b docs/improve-readme     # Documentation
git checkout -b refactor/token-structure # Refactoring
```

### Commit Messages

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add danger variant
fix(input): correct focus ring color
docs(readme): add installation instructions
refactor(tokens): reorganize spacing scale
test(button): add keyboard navigation tests
chore(deps): update tailwindcss to v3.4
```

**Types:**
- `feat` - Neue Feature
- `fix` - Bug Fix
- `docs` - Documentation
- `refactor` - Code Refactoring
- `test` - Tests
- `chore` - Maintenance
- `style` - Code Formatting

**Scope:**
- Component Name: `button`, `input`, `card`
- Package: `tokens`, `components`, `styles`
- Tool: `storybook`, `vitest`

---

## 📐 Development Workflow

### 1. Neue Component erstellen

**Checke zuerst PROJEKT_REGELN.md!**

```bash
# 1. Branch erstellen
git checkout -b feat/badge-component

# 2. Tokens prüfen/erstellen
# packages/tokens/src/semantic/badge.json

# 3. Component implementieren
# packages/components/src/atoms/Badge/Badge.tsx
# packages/components/src/atoms/Badge/Badge.test.tsx
# packages/components/src/atoms/Badge/Badge.stories.tsx

# 4. Export hinzufügen
# packages/components/src/index.ts

# 5. Tokens bauen
pnpm build:tokens

# 6. Tests schreiben & ausführen
pnpm test

# 7. Storybook Story erstellen
pnpm storybook

# 8. Commit & Push
git add -A
git commit -m "feat(badge): add badge component with success/warning/error variants"
git push origin feat/badge-component
```

### 2. Bug Fix

```bash
# 1. Branch erstellen
git checkout -b fix/button-hover-state

# 2. Bug reproduzieren (Test schreiben!)
# packages/components/src/atoms/Button/Button.test.tsx

# 3. Fix implementieren

# 4. Tests grün machen
pnpm test

# 5. Visual Check in Storybook
pnpm storybook

# 6. Commit & Push
git commit -m "fix(button): correct hover state for ghost variant"
git push origin fix/button-hover-state
```

---

## ✅ Pull Request Checklist

Vor dem Öffnen eines PR:

### Code Quality
- [ ] Code folgt Coding Standards (siehe unten)
- [ ] TypeScript Errors: KEINE (`pnpm type-check`)
- [ ] ESLint Warnings: KEINE (`pnpm lint`)
- [ ] Tests geschrieben und bestanden (`pnpm test`)
- [ ] Storybook Story erstellt/aktualisiert

### Token Hierarchie
- [ ] Neue Tokens in korrektem Level erstellt
- [ ] Keine Ebenen übersprungen (4-Layer System!)
- [ ] Naming Conventions befolgt
- [ ] `pnpm build:tokens` läuft fehlerfrei

### Accessibility
- [ ] Keyboard Navigation getestet
- [ ] Focus Indicators vorhanden
- [ ] ARIA Labels korrekt
- [ ] Storybook A11y Panel: Keine Violations
- [ ] Color Contrast min. 4.5:1

### Documentation
- [ ] JSDoc Comments geschrieben
- [ ] README.md aktualisiert (wenn nötig)
- [ ] CHANGELOG.md Eintrag (siehe unten)
- [ ] Storybook Docs generiert

### Breaking Changes?
- [ ] Breaking Change? → In PR beschreiben!
- [ ] Migration Guide geschrieben
- [ ] Mit Team diskutiert

---

## 📝 Coding Standards

### TypeScript

```tsx
// ✅ RICHTIG: Explizite Types
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

// ❌ FALSCH: Any/Unknown
const handleClick = (e: any) => { ... }
```

### React

```tsx
// ✅ RICHTIG: Functional Components mit forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={cn(...)} {...props} />;
  }
);
Button.displayName = 'Button';

// ❌ FALSCH: Class Components
class Button extends React.Component { ... }
```

### Styling

```tsx
// ✅ RICHTIG: CSS Variables
className="bg-[var(--color-btn-primary-bg)]"

// ❌ FALSCH: Hardcoded Values
className="bg-[#0ea5e9]"
className="p-4"  // OK für Prototyping, nicht Production
```

### Imports

```tsx
// ✅ RICHTIG: Gruppiert & Sortiert
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './types';

// ❌ FALSCH: Ungeordnet
import { cn } from '../../utils/cn';
import React from 'react';
import type { ButtonProps } from './types';
```

---

## 🧪 Testing Requirements

### Minimum Coverage: 80%

```bash
# Tests laufen lassen mit Coverage
pnpm test -- --coverage

# Einzelne Datei testen
pnpm test Button.test.tsx
```

### Test-Struktur

```tsx
describe('Button', () => {
  describe('Rendering', () => {
    it('renders with correct variant class', () => { ... });
    it('renders children correctly', () => { ... });
  });

  describe('Interactions', () => {
    it('handles click events', () => { ... });
    it('prevents click when disabled', () => { ... });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', () => { ... });
    it('has no a11y violations', () => { ... });
  });
});
```

---

## 📚 Documentation Standards

### JSDoc Comments

```tsx
/**
 * Primary UI button component.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  
  /**
   * Size preset for the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
```

### Storybook Docs

```tsx
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],  // ← Auto-generiert Docs!
  parameters: {
    docs: {
      description: {
        component: 'Primary button component with multiple variants and sizes. Supports loading states and icons.',
      },
    },
  },
};
```

---

## 📋 CHANGELOG.md Format

```markdown
## [Unreleased]

### Added
- Badge component with success/warning/error variants (#42)
- Dark theme support for all color tokens (#38)

### Changed
- Button hover state now uses primary-600 instead of primary-700 (#45)

### Fixed
- Input focus ring now visible on all backgrounds (#43)

### Breaking Changes
- Renamed `color-btn-bg` to `color-btn-primary-bg` (#40)
  - Migration: Find & Replace in your codebase
```

**Kategorien:**
- `Added` - Neue Features
- `Changed` - Änderungen an existierender Funktionalität
- `Deprecated` - Features die bald entfernt werden
- `Removed` - Entfernte Features
- `Fixed` - Bug Fixes
- `Security` - Security Fixes
- `Breaking Changes` - Breaking Changes (wichtig!)

---

## 🎨 Design Token Contributions

### Neue Tokens anlegen

**WICHTIG: Lies erst [TOKEN_GUIDELINES.md](docs/TOKEN_GUIDELINES.md)!**

**Fragen vor dem Anlegen:**
1. Existiert der Token schon?
2. Welches Level ist richtig?
3. Folge ich der Naming Convention?
4. Referenziere ich nur das Level darunter?

### Token PR Checklist

- [ ] Decision Tree durchgegangen
- [ ] Alle 4 Level geprüft
- [ ] Naming Convention befolgt
- [ ] Nur richtiges Level referenziert
- [ ] `pnpm build:tokens` fehlerfrei
- [ ] Storybook Token Story aktualisiert
- [ ] Keine Breaking Changes (oder dokumentiert)

---

## 🔍 Review Process

### Was wird geprüft?

1. **Code Quality**
   - TypeScript Errors
   - ESLint Warnings
   - Test Coverage
   - Performance

2. **Token Hierarchie**
   - Korrektes Level
   - Keine Ebenensprünge
   - Naming Conventions
   - Vollständigkeit

3. **Accessibility**
   - Keyboard Navigation
   - Focus States
   - ARIA Labels
   - Color Contrast
   - Storybook A11y Panel

4. **Documentation**
   - JSDoc Comments
   - Storybook Stories
   - README Updates
   - CHANGELOG Entry

### Typische Feedback-Punkte

```tsx
// ❌ Reviewer Comment: "Hardcoded color, use token"
<div className="bg-[#0ea5e9]">

// ✅ Fix:
<div className="bg-[var(--color-bg-primary)]">
```

```tsx
// ❌ Reviewer Comment: "Missing ARIA label"
<button><TrashIcon /></button>

// ✅ Fix:
<button aria-label="Delete item"><TrashIcon /></button>
```

```tsx
// ❌ Reviewer Comment: "Token skips levels (4 → 1)"
{
  "color": {
    "btn": {
      "bg": { "$value": "{color.base.sky.500}" }  // Level 4 → Level 1!
    }
  }
}

// ✅ Fix:
{
  "color": {
    "btn": {
      "bg": { "$value": "{color.bg.primary}" }  // Level 4 → Level 3 ✓
    }
  }
}
```

---

## 🚨 Breaking Changes

### Was ist ein Breaking Change?

- Token umbenennen/löschen
- Component API ändern (Props entfernen/umbenennen)
- CSS Class Names ändern
- Semantic HTML ändern

### Breaking Change Prozess

1. **Issue erstellen** - Diskussion mit Team
2. **Migration Path** - Wie upgraden Consumer?
3. **Deprecation Notice** - Alte API bleibt 1 Version
4. **Major Version Bump** - 1.x.x → 2.0.0
5. **Release Notes** - Detaillierte Migration Guide

### Breaking Change PR Template

```markdown
## 🚨 BREAKING CHANGE

### What breaks?
Renamed `color-btn-bg` to `color-btn-primary-bg`

### Why?
Consistency with other component tokens that specify variant in name.

### Migration Path
```bash
# Find & Replace in your codebase
color-btn-bg → color-btn-primary-bg
```

### Deprecation Notice
`color-btn-bg` will remain available with deprecation warning until v2.0.0
```

---

## 💡 Getting Help

### Wo kann ich Fragen stellen?

1. **Documentation** - Lies erst die Docs:
   - [PROJEKT_REGELN.md](PROJEKT_REGELN.md) - Alle Regeln
   - [ARCHITECTURE.md](docs/ARCHITECTURE.md) - 4-Layer System
   - [TOKEN_GUIDELINES.md](docs/TOKEN_GUIDELINES.md) - Token Usage
   - [COMPONENT_GUIDELINES.md](docs/COMPONENT_GUIDELINES.md) - Component Best Practices

2. **Issues** - Existierende Issues durchsuchen

3. **Discussions** - Öffne eine Discussion (wenn aktiviert)

4. **Team kontaktieren** - Direkter Kontakt bei komplexen Fragen

---

## 🎓 Learning Resources

### Design Systems
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Material Design System](https://m3.material.io/)
- [Tailwind CSS](https://tailwindcss.com/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Tools
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [CVA (Class Variance Authority)](https://cva.style/)
- [Radix UI](https://www.radix-ui.com/)
- [Storybook](https://storybook.js.org/)

---

## 📜 License

Durch Beitragen stimmst du zu, dass deine Contributions unter der gleichen Lizenz wie das Projekt veröffentlicht werden.

---

## 🙏 Danke!

Jeder Beitrag hilft, Nordlig besser zu machen - egal ob Bug Report, Feature Request oder Code Contribution. Vielen Dank für deine Zeit und Mühe!

**Happy Contributing! 🎨**
