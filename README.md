# Nordlig Design System

Nordisches Design fur moderne Apps.

**Version:** 1.0.0-alpha | **Status:** Foundation Phase

**[Storybook](http://192.168.68.52:6006)** | **[CONTRIBUTING](CONTRIBUTING.md)** | **[Architektur](docs/ARCHITECTURE.md)** | **[Token Guidelines](docs/TOKEN_GUIDELINES.md)**

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

## Neue Komponente erstellen

Beim Anlegen einer neuen Komponente muessen ggf. neue Tokens auf allen 4 Leveln erstellt und in Storybook dokumentiert werden.

### 1. Tokens pruefen & anlegen

Jedes Level referenziert **ausschliesslich** das Level darunter — niemals ueberspringen.

```
packages/tokens/src/
├── base/          Level 1 — Rohe Werte (existieren meist schon)
├── global/        Level 2 — Semantische Zuordnung (existieren meist schon)
├── roles/         Level 3 — Funktionale Rollen (ggf. erweitern)
└── semantic/      Level 4 — Komponenten-Tokens (NEU erstellen)
```

**Beispiel:** Neue `Dialog`-Komponente

| Level | Datei | Aktion |
|-------|-------|--------|
| 1 | `base/spacing.json` | Pruefen ob benoetigte Werte existieren |
| 2 | `global/spacing.json`, `global/shadows.json` | Pruefen ob semantische Zuordnung existiert |
| 3 | `roles/spacing.json`, `roles/shadows.json` | Ggf. neue Rollen hinzufuegen (z.B. `overlay.padding`) |
| 4 | `semantic/dialog.json` | **Neu erstellen** — referenziert nur Level 3 |

### 2. Tokens bauen

```bash
pnpm build:tokens
```

Erzeugt CSS, Tailwind, TypeScript und JSON in `packages/styles/dist/`.

### 3. Storybook-Story aktualisieren

Jede Token-Story unter `apps/storybook/stories/` muss alle 4 Level zeigen:

- **Neue Token-Kategorie?** → Neue Story erstellen (nach Muster der bestehenden)
- **Bestehende Kategorie erweitert?** → Entsprechende Story aktualisieren (z.B. neue Role-Tokens in `Spacing.stories.tsx`)
- **Neue Komponente?** → Level-4-Abschnitt in relevanten Stories ergaenzen

Farbkodierung in den Stories:
- Grau (`#94a3b8`) — Level 1 Base
- Blau (`#0ea5e9`) — Level 2 Global
- Indigo (`#6366f1`) — Level 3 Roles
- Gruen (`#10b981`) — Level 4 Semantic

### 4. Komponente implementieren

```
packages/components/src/atoms/Dialog/Dialog.tsx
```

Komponente verwendet die Level-4-CSS-Variablen via Tailwind Arbitrary Values:

```tsx
className="h-[var(--sizing-dialog-height)] p-[var(--spacing-dialog-padding)]"
```

### Checkliste

- [ ] Level-4-Token-Datei in `semantic/` erstellt (referenziert nur Level 3)
- [ ] Falls noetig: Level-2/3-Tokens erweitert
- [ ] `pnpm build:tokens` laeuft fehlerfrei
- [ ] Storybook-Stories zeigen alle neuen Tokens mit korrekter Referenzkette
- [ ] Komponente verwendet ausschliesslich CSS Custom Properties

## Design-Prinzipien

- **Minimalismus** - Weniger ist mehr
- **Klarheit** - Funktion vor Form
- **Konsistenz** - Wiederverwendbar
- **Accessibility** - WCAG 2.1 AA minimum
- **Standards** - W3C compliant, MCP ready
