# @nordlig/components

React-Komponentenbibliothek des Nordlig Design Systems — 110+ Komponenten nach Atomic Design.

## Installation

```bash
pnpm add @nordlig/components @nordlig/styles
```

## Setup

```tsx
// 1. CSS importieren
import '@nordlig/styles';
import '@nordlig/styles/dark'; // Optional: Dark Mode

// 2. ThemeProvider einbinden
import { ThemeProvider } from '@nordlig/components';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Nutzung

```tsx
import { Button, Input, Card } from '@nordlig/components';

function MyForm() {
  return (
    <Card>
      <Input placeholder="Name" />
      <Button variant="primary" size="md">Absenden</Button>
    </Card>
  );
}
```

## Komponenten-Uebersicht

| Ebene | Anzahl | Beispiele |
|-------|--------|-----------|
| **Atoms** | 46 | Button, Input, Badge, Checkbox, Switch, Tooltip |
| **Molecules** | 34 | Dialog, Tabs, Select, DatePicker, Form, TagInput |
| **Organisms** | 13 | DataTable, Chart, RichTextEditor, Sidebar, Modal |
| **Patterns** | 7 | Spotlight, AnalyticsDashboard, FormWizard |
| **Templates** | 8 | DashboardLayout, AuthLayout, ListPage |

## Features

- Vollstaendig Token-basiert (CSS Custom Properties)
- WCAG 2.1 AA konform, AAA angestrebt
- Dark Mode via ThemeProvider
- Tree-Shakeable (ESM + `sideEffects: false`)
- Form-Integration via `react-hook-form` + `zod`
- Radix UI als Accessibility-Primitiv

## Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

## Lizenz

Privat — Nordlig Design System
