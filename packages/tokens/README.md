# @nordlig/tokens

Design Tokens fuer das Nordlig Design System — 4-Layer Architektur (Base → Global → Roles → Semantic).

## Installation

```bash
pnpm add @nordlig/tokens
```

## Nutzung

### CSS Custom Properties (empfohlen)

Tokens werden ueber `@nordlig/styles` als CSS Custom Properties bereitgestellt:

```css
/* Direkte Nutzung */
.my-element {
  color: var(--color-text-base);
  padding: var(--spacing-component-padding-md);
}
```

### JavaScript / TypeScript

```ts
import tokens from '@nordlig/tokens';

// Zugriff auf Token-Werte
console.log(tokens.colorPrimary500);
```

### JSON (z.B. fuer Figma, MCP)

```ts
import tokens from '@nordlig/tokens/json';
```

## Token-Architektur

```
Level 4: SEMANTIC    (Komponenten-spezifisch: btn-primary-bg)
Level 3: ROLES       (Funktional: bg-primary, text-base)
Level 2: GLOBAL      (Theme: primary-1-500, accent-3-200)
Level 1: BASE        (Rohwerte: sky-500, slate-100)
```

Jede Ebene referenziert nur die darueber liegende — nie direkte Farbwerte in Komponenten.

## Build

```bash
pnpm build  # Generiert dist/tokens.js, dist/tokens.css, dist/tokens.json
```

## Format

Tokens nutzen das [W3C DTCG](https://design-tokens.github.io/community-group/format/) Format (`$type`, `$value`).

## Lizenz

Privat — Nordlig Design System
