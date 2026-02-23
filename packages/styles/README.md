# @nordlig/styles

Generierte CSS-Dateien und Tailwind-Konfiguration fuer das Nordlig Design System.

## Installation

```bash
pnpm add @nordlig/styles
```

## Nutzung

### CSS importieren

```ts
// Light Theme (Standard)
import '@nordlig/styles';

// Dark Theme
import '@nordlig/styles/dark';
```

### Tailwind-Konfiguration

```js
// tailwind.config.js
const tokens = require('@nordlig/styles/tailwind');

module.exports = {
  theme: {
    extend: tokens,
  },
};
```

### Dark Mode

Das System nutzt die CSS-Klasse `.dark` auf `<html>`. Die Dark-Tokens invertieren die L2-Palette — alle L3/L4-Tokens passen sich automatisch an.

```html
<html class="dark">
  <!-- Alle Komponenten nutzen automatisch den Dark Mode -->
</html>
```

## Inhalt

| Datei | Beschreibung |
|-------|-------------|
| `dist/tokens.css` | Alle CSS Custom Properties (Light Theme) |
| `dist/dark-tokens.css` | Dark Mode Overrides |
| `dist/tailwind-tokens.js` | Tailwind-Theme-Extension |

## Lizenz

Privat — Nordlig Design System
