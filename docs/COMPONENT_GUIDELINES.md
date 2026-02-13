# 🧩 Component Guidelines - Nordlig Design System

**Atomic Design, Testing, Accessibility, Best Practices**

---

## 🎯 Atomic Design Hierarchy

```
ATOMS       → Kleinste Bausteine (Button, Input, Label)
MOLECULES   → Kombinationen von Atoms (InputField = Label + Input + Error)
ORGANISMS   → Komplexe UI-Bereiche (Card, Table, Navigation)
TEMPLATES   → Layout-Strukturen (DashboardLayout)
PAGES       → Konkrete Seiten (in Consumer-Apps, NICHT im Design System!)
```

### Dependency Rules

```
Atoms       → KEINE Dependencies auf andere Components
Molecules   → Atoms + max. 1 andere Molecule
Organisms   → Atoms + Molecules + andere Organisms (sparsam!)
Templates   → Alles erlaubt (Layout-Slots)
```

**Warum diese Regeln?**
- Vermeidet zirkuläre Dependencies
- Macht Components wiederverwendbar
- Hält Bundle Size klein
- Erleichtert Testing

---

## 📁 File Structure

### Neue Component: Button

```
packages/components/src/atoms/Button/
├── Button.tsx              # Main Component
├── Button.test.tsx         # Unit Tests
├── Button.stories.tsx      # Storybook Stories
├── index.ts                # Public API
└── README.md               # Component Docs (optional)
```

### Naming Conventions

**Dateien:**
- `ComponentName.tsx` - PascalCase
- `ComponentName.stories.tsx` - Stories
- `ComponentName.test.tsx` - Tests
- `index.ts` - Barrel export

**Verzeichnisse:**
- `atoms/ComponentName/` - PascalCase
- `molecules/ComponentName/`
- `organisms/ComponentName/`

---

## 🏗️ Component Template

### TypeScript Interface

```tsx
// Button.tsx
import React from 'react';

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  
  /**
   * Size preset
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Loading state (shows spinner)
   */
  isLoading?: boolean;
  
  /**
   * Icon on the left
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon on the right
   */
  rightIcon?: React.ReactNode;
}
```

### CVA (Class Variance Authority)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  // Base classes (immer dabei)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)] border border-[var(--color-btn-primary-border)] hover:bg-[var(--color-btn-primary-bg-hover)]',
        secondary: 'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)] border border-[var(--color-btn-secondary-border)] hover:bg-[var(--color-btn-secondary-bg-hover)]',
        ghost: 'bg-transparent text-[var(--color-btn-ghost-text)] hover:bg-[var(--color-btn-ghost-bg-hover)]',
      },
      size: {
        sm: 'h-9 px-3 text-sm gap-[var(--spacing-btn-gap)]',
        md: 'h-10 px-4 py-2 gap-[var(--spacing-btn-gap)]',
        lg: 'h-11 px-8 gap-[var(--spacing-btn-gap)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### Component Implementation

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    disabled,
    isLoading,
    leftIcon,
    rightIcon,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### Barrel Export (index.ts)

```ts
export { Button, buttonVariants, type ButtonProps } from './Button';
```

---

## 🎨 Token Usage in Components

### ✅ RICHTIG: CSS Custom Properties

```tsx
// Tailwind Arbitrary Values mit CSS Variables
className="bg-[var(--color-btn-primary-bg)]"
className="p-[var(--spacing-btn-padding-x)]"
className="text-[var(--font-btn-size)]"
```

### ❌ FALSCH: Hardcoded Values

```tsx
className="bg-[#0ea5e9]"       // Hardcoded Hex
className="p-4"                 // Hardcoded Spacing (ok für Prototyping, nicht Production!)
className="text-base"           // Tailwind Utility (besser: Token!)
```

### Warum CSS Variables?

1. **Theming:** Dark Mode ohne Code-Änderung
2. **Konsistenz:** Alle Components nutzen gleiche Werte
3. **Maintenance:** Token-Änderung propagiert automatisch
4. **Type Safety:** Style Dictionary generiert TypeScript

---

## ♿ Accessibility Checklist

Jede Component MUSS:

### 1. Keyboard Navigation

```tsx
// Focusable Elements haben tabindex
<button type="button">  // ✅ Natively focusable

// Custom Components brauchen explizite Fokussierbarkeit
<div role="button" tabIndex={0} onKeyDown={handleKeyDown}>  // ✅
```

**Test:**
- `Tab` - Fokus bewegen
- `Shift + Tab` - Fokus zurück
- `Enter` / `Space` - Aktivieren (bei Buttons)
- `Escape` - Schließen (bei Modals, Dropdowns)

### 2. Focus Indicators

```css
/* ✅ IMMER sichtbarer Focus Ring */
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-offset-2
focus-visible:ring-[var(--color-border-focus)]
```

**NIEMALS:**
```css
/* ❌ VERBOTEN ohne Alternative! */
outline: none;
```

### 3. ARIA Labels

```tsx
// Button mit Icon - kein Text
<button aria-label="Delete item">
  <TrashIcon />
</button>

// Input mit Label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Loading State
<button aria-busy={isLoading} aria-label={isLoading ? 'Loading...' : 'Submit'}>
  {isLoading ? <Spinner /> : 'Submit'}
</button>
```

### 4. Color Contrast

**WCAG 2.1 AA Minimum:**
- Text: 4.5:1 contrast ratio
- Large Text (18pt+): 3:1
- UI Components: 3:1

**Test:**
- Chrome DevTools → Accessibility Panel
- Storybook A11y Add-on
- axe DevTools Extension

### 5. Touch Targets

```css
/* Minimum 44×44px für Touch */
.btn-sm {
  min-height: 44px;  /* Auch wenn visuell kleiner! */
  min-width: 44px;
}
```

### 6. Screen Reader

```tsx
// Visuell verborgen, für Screen Reader sichtbar
<span className="sr-only">
  Close modal
</span>

// sr-only CSS:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 🧪 Testing Guidelines

### Unit Tests (Vitest)

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct variant class', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-btn-primary-bg)]');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Coverage Requirements

```bash
# Minimum 80% Coverage
pnpm test -- --coverage

# Coverage Report zeigt:
Statements   : 85%
Branches     : 80%
Functions    : 90%
Lines        : 85%
```

### Accessibility Tests

```tsx
// Button.test.tsx (axe integration)
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 📖 Storybook Stories

### Basic Story

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;
```

### Individual Stories

```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    leftIcon: <Icon name="plus" />,
    children: 'Add Item',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
```

### Playground Story

```tsx
export const Playground: Story = {
  render: (args) => (
    <div className="flex gap-4 flex-wrap">
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="ghost" />
    </div>
  ),
  args: {
    children: 'Button Text',
    size: 'md',
  },
};
```

---

## 🎨 Component Patterns

### Compound Components

```tsx
// Card.tsx
const Card = ({ children, ...props }: CardProps) => (
  <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)]" {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, ...props }: CardHeaderProps) => (
  <div className="p-[var(--spacing-card-padding)] border-b" {...props}>
    {children}
  </div>
);

const CardBody = ({ children, ...props }: CardBodyProps) => (
  <div className="p-[var(--spacing-card-padding)]" {...props}>
    {children}
  </div>
);

// Export as Compound
export { Card, CardHeader, CardBody };

// Usage:
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Polymorphic Components

```tsx
// Button als Link
<Button as="a" href="/home">Go Home</Button>

// Implementation:
type ButtonProps<T extends React.ElementType = 'button'> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

const Button = <T extends React.ElementType = 'button'>({
  as,
  ...props
}: ButtonProps<T>) => {
  const Component = as || 'button';
  return <Component {...props} />;
};
```

---

## 🚀 Performance Best Practices

### 1. Code Splitting

```tsx
// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));

// Usage:
<Suspense fallback={<Spinner />}>
  <HeavyChart />
</Suspense>
```

### 2. Memo für teure Renders

```tsx
const ExpensiveComponent = memo(({ data }: Props) => {
  // Heavy computation
  const processed = useMemo(() => processData(data), [data]);
  
  return <div>{processed}</div>;
});
```

### 3. CSS-in-JS vermeiden

```tsx
// ❌ FALSCH: Runtime CSS
const Button = styled.button`
  background: ${props => props.theme.primary};
`;

// ✅ RICHTIG: CSS Variables (Zero Runtime)
<button className="bg-[var(--color-btn-primary-bg)]" />
```

---

## 📋 Component Checklist

Vor dem Merge:

- [ ] **TypeScript Interface** komplett dokumentiert
- [ ] **CVA Variants** korrekt implementiert
- [ ] **Nur Tokens verwendet** (keine Hardcoded Values)
- [ ] **Accessibility**
  - [ ] Keyboard Navigation funktioniert
  - [ ] Focus Indicators sichtbar
  - [ ] ARIA Labels vorhanden
  - [ ] Color Contrast min. 4.5:1
  - [ ] Touch Targets min. 44×44px
- [ ] **Tests**
  - [ ] Unit Tests >80% Coverage
  - [ ] Accessibility Tests (axe)
  - [ ] Keyboard Tests
- [ ] **Storybook**
  - [ ] Alle Variants als Stories
  - [ ] Controls funktionieren
  - [ ] Docs generiert (autodocs)
  - [ ] A11y Panel zeigt keine Violations
- [ ] **Performance**
  - [ ] Bundle Size akzeptabel
  - [ ] Keine Runtime CSS
  - [ ] Lazy Loading wenn sinnvoll
- [ ] **Documentation**
  - [ ] JSDoc Comments
  - [ ] README.md (wenn komplex)
  - [ ] Usage Examples

---

**Nächste Schritte:**
- [ARCHITECTURE.md](ARCHITECTURE.md) - 4-Layer Token System
- [TOKEN_GUIDELINES.md](TOKEN_GUIDELINES.md) - Token Usage
- [PROJEKT_REGELN.md](../PROJEKT_REGELN.md) - Alle Regeln
