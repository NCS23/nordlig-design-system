# Nordlig Design System

Nordisches Design fur moderne Apps.

**Version:** 1.0.0-alpha | **Status:** Foundation Phase

---

## Architektur

Token-basiertes Design System mit **4-Layer Architektur**:

```
Level 4: SEMANTIC    (Component-specific: btn-primary-bg)
Level 3: ROLES       (Functional: bg-primary, text-base)
Level 2: GLOBAL      (Theme: primary-1-500, accent-3-200)
Level 1: BASE        (Raw values: sky-500, slate-100)
```

## Tech Stack

| Layer      | Technologie                          |
|------------|--------------------------------------|
| Tokens     | Style Dictionary, DTCG Format        |
| Components | React + TypeScript + CVA + Radix UI  |
| Styling    | Tailwind CSS + CSS Custom Properties |
| Docs       | Storybook                            |
| Monorepo   | pnpm + Turborepo                     |

## Packages

| Package              | Beschreibung                    |
|----------------------|---------------------------------|
| `@nordlig/tokens`    | Design Tokens (DTCG JSON)       |
| `@nordlig/components`| React Components (Atomic Design)|
| `@nordlig/styles`    | Generated CSS & Tailwind Config |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build tokens
pnpm build:tokens

# Start Storybook
pnpm storybook

# Build all
pnpm build
```

## Design-Prinzipien

- **Minimalismus** - Weniger ist mehr
- **Klarheit** - Funktion vor Form
- **Konsistenz** - Wiederverwendbar
- **Accessibility** - WCAG 2.1 AA minimum
- **Standards** - W3C compliant, MCP ready
