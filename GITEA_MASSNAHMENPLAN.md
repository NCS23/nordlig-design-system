# Massnahmenplan: Gitea-Funktionen fuer Nordlig DS

> Ziel: Die manuelle Projektverwaltung (BACKLOG.md, COMPONENT_LOG.md) durch Gitea-native Tools ersetzen und die CI/CD-Pipeline ausbauen.

---

## Uebersicht der Phasen

| Phase | Was | Aufwand | Prioritaet |
|-------|-----|---------|------------|
| 1 | Labels + Issue-Templates einrichten | 1-2h | P1 |
| 2 | Bestehendes Backlog in Issues migrieren | 2-3h | P1 |
| 3 | Kanban Board (Project) erstellen | 30min | P1 |
| 4 | Milestones fuer Release-Planung | 30min | P2 |
| 5 | CI/CD-Pipelines ausbauen | 2-3h | P2 |
| 6 | Branch Protection Rules | 15min | P2 |
| 7 | npm Package Registry | 1-2h | P3 |
| 8 | Wiki fuer stabile Dokumentation | 1-2h | P3 |

---

## Phase 1: Labels + Issue-Templates einrichten

### 1.1 Scoped Labels anlegen

Labels mit `/` Separator sind in Gitea gegenseitig exklusiv pro Gruppe.

**Prioritaet:**
| Label | Farbe | Beschreibung |
|-------|-------|-------------|
| `priority/P1-critical` | `#dc2626` (rot) | Muss sofort gemacht werden |
| `priority/P2-important` | `#f59e0b` (amber) | Sollte bald gemacht werden |
| `priority/P3-nice-to-have` | `#22c55e` (gruen) | Wenn Zeit da ist |

**Typ:**
| Label | Farbe | Beschreibung |
|-------|-------|-------------|
| `type/component` | `#0ea5e9` (primary) | Neue Komponente |
| `type/token` | `#8b5cf6` (violet) | Token-Arbeit |
| `type/bugfix` | `#ef4444` (rot) | Fehlerbehebung |
| `type/refactoring` | `#64748b` (slate) | Code-Verbesserung |
| `type/infrastructure` | `#0d9488` (teal) | Build, CI/CD, Tooling |
| `type/docs` | `#6366f1` (indigo) | Dokumentation |
| `type/figma` | `#ec4899` (pink) | Figma Plugin/Export |

**Ebene:**
| Label | Farbe | Beschreibung |
|-------|-------|-------------|
| `layer/atom` | `#bae6fd` (sky-200) | Atom-Komponente |
| `layer/molecule` | `#7dd3fc` (sky-300) | Molecule-Komponente |
| `layer/organism` | `#38bdf8` (sky-400) | Organism-Komponente |

**Fortschritt (DoD-Schritte):**
| Label | Farbe | Beschreibung |
|-------|-------|-------------|
| `step/1-tokens` | `#e0f2fe` | Schritt 1: L4-Tokens erstellt |
| `step/2-component` | `#bae6fd` | Schritt 2: Komponente implementiert |
| `step/3-tests` | `#7dd3fc` | Schritt 3: Unit Tests geschrieben |
| `step/4-stories` | `#38bdf8` | Schritt 4: Stories geschrieben |
| `step/5-infrastructure` | `#0ea5e9` | Schritt 5: Exports, Log, Index |
| `step/6-review` | `#0284c7` | Schritt 6: UX Review bestanden |
| `step/7-visual-tests` | `#0369a1` | Schritt 7: Visual Tests |

> Hinweis: step/-Labels sind NICHT scoped (kein `/` zwischen step und Nummer),
> damit mehrere gleichzeitig gesetzt werden koennen (Multi-Label pro Issue).

### 1.2 Issue-Templates erstellen

Datei: `.gitea/ISSUE_TEMPLATE/neue-komponente.yaml`

```yaml
name: Neue Komponente
about: Erstelle eine neue Design-System-Komponente
title: "[Component] "
labels:
  - "type/component"
body:
  - type: input
    id: name
    attributes:
      label: Komponentenname
      placeholder: z.B. Toggle, Rating, Combobox
    validations:
      required: true

  - type: dropdown
    id: layer
    attributes:
      label: Ebene
      options:
        - Atom
        - Molecule
        - Organism
    validations:
      required: true

  - type: dropdown
    id: priority
    attributes:
      label: Prioritaet
      options:
        - P1 (Critical)
        - P2 (Important)
        - P3 (Nice-to-have)
    validations:
      required: true

  - type: textarea
    id: blueprint
    attributes:
      label: Blueprint (Varianten, Props, States)
      description: Welche Varianten, Groessen und States braucht die Komponente?
      placeholder: |
        Varianten: default, primary, destructive
        Groessen: sm, md, lg
        States: default, hover, focus, disabled, active

  - type: textarea
    id: tokens
    attributes:
      label: L4-Token-Mapping
      description: Welche L4-Tokens werden benoetigt? (Referenzieren NUR L3-Role-Tokens)
      placeholder: |
        | L4 Token | Referenziert L3 |
        |----------|----------------|
        | --color-toggle-bg | {color.bg.paper} |
        | --color-toggle-thumb | {color.bg.base} |

  - type: textarea
    id: dependencies
    attributes:
      label: Abhaengigkeiten
      description: Welche bestehenden Komponenten/Tokens werden benoetigt?
      placeholder: z.B. Radix UI Toggle, bestehende Sizing-Tokens

  - type: checkboxes
    id: dod
    attributes:
      label: Definition of Done (DoD)
      description: Alle Schritte muessen erledigt sein
      options:
        - label: "Schritt 1: L4-Tokens erstellt + pnpm build + verifiziert in tokens.css"
        - label: "Schritt 2: Komponente (forwardRef, displayName, cn(), nur var(--*))"
        - label: "Schritt 3: Unit Tests (vitest, a11y, states, edge cases)"
        - label: "Schritt 4: Stories (alle Varianten, Controls, Dark Mode)"
        - label: "Schritt 5: Infrastructure (index.ts, COMPONENT_LOG, tokens-annotated)"
        - label: "Schritt 6: UX Review bestanden (WCAG 2.1 AA)"
        - label: "Schritt 7: Visual Tests (Playwright Snapshots)"
        - label: "Storybook baut fehlerfrei"
```

Datei: `.gitea/ISSUE_TEMPLATE/bugfix.yaml`

```yaml
name: Bug Report
about: Einen Fehler im Design System melden
title: "[Bug] "
labels:
  - "type/bugfix"
body:
  - type: textarea
    id: description
    attributes:
      label: Beschreibung
      description: Was passiert und was sollte stattdessen passieren?
    validations:
      required: true

  - type: input
    id: component
    attributes:
      label: Betroffene Komponente
      placeholder: z.B. Button, Checkbox, Table

  - type: textarea
    id: reproduce
    attributes:
      label: Reproduktion
      description: Schritte um den Fehler zu reproduzieren

  - type: dropdown
    id: priority
    attributes:
      label: Prioritaet
      options:
        - P1 (Critical)
        - P2 (Important)
        - P3 (Nice-to-have)
```

Datei: `.gitea/ISSUE_TEMPLATE/infrastructure.yaml`

```yaml
name: Infrastructure / Tooling
about: CI/CD, Build, Refactoring, Token-Arbeit
title: "[Infra] "
labels:
  - "type/infrastructure"
body:
  - type: textarea
    id: description
    attributes:
      label: Beschreibung
      description: Was soll verbessert/geaendert werden?
    validations:
      required: true

  - type: textarea
    id: acceptance
    attributes:
      label: Akzeptanzkriterien
      description: Wann ist die Aufgabe erledigt?

  - type: dropdown
    id: priority
    attributes:
      label: Prioritaet
      options:
        - P1 (Critical)
        - P2 (Important)
        - P3 (Nice-to-have)
```

---

## Phase 2: Bestehendes Backlog in Issues migrieren

### Migrationsstrategie

Das aktuelle BACKLOG.md enthaelt 25+ Stories. Diese werden 1:1 in Gitea Issues ueberfuehrt:

**Mapping BACKLOG.md → Gitea Issue:**

| BACKLOG-Feld | Gitea-Feld |
|-------------|-----------|
| Story-Titel | Issue Title (mit Prefix `[Component]`, `[Infra]` etc.) |
| Status | Kanban-Spalte + step/-Labels |
| Prioritaet | `priority/*` Label |
| Typ | `type/*` Label |
| Ebene | `layer/*` Label |
| Blueprint | Issue Body (aus Template) |
| L4-Token-Mapping | Issue Body (Tabelle) |
| Dependencies | Issue Body + verlinkte Issues |
| DoD-Checkliste | Checkboxen im Issue Body |
| Notizen | Issue-Kommentare |

**Reihenfolge:**
1. Zuerst alle "Done" Stories als geschlossene Issues anlegen (Historie)
2. Dann "Ready" und "In Progress" Stories als offene Issues
3. Labels und Milestone zuweisen
4. Kanban-Board zuweisen

**Nach der Migration:**
- `BACKLOG.md` wird auf einen Verweis zum Gitea Project Board reduziert
- Keine doppelte Pflege mehr

---

## Phase 3: Kanban Board (Project) erstellen

### Board-Konfiguration

**Name:** `Nordlig DS — Komponentenentwicklung`
**Template:** Basic Kanban

**Spalten:**

| Spalte | Beschreibung | WIP-Limit |
|--------|-------------|-----------|
| Backlog | Neue Stories, noch nicht priorisiert | - |
| Ready | DoR erfuellt, kann gestartet werden | - |
| In Progress | Aktuell in Arbeit (max 5) | 5 |
| Review | UX Review + Visual Tests | 3 |
| Done | Alle DoD-Schritte erledigt | - |

### Workflow-Regeln

1. **Backlog → Ready:** DoR-Checkliste ist komplett (Token-Mapping, Blueprint, Dependencies geklaert)
2. **Ready → In Progress:** Entwickler assigned sich, max 5 Stories gleichzeitig "In Progress"
3. **In Progress → Review:** Schritte 1-5 erledigt, step/-Labels gesetzt
4. **Review → Done:** Schritte 6-7 erledigt, Storybook baut fehlerfrei
5. **Done:** Issue wird geschlossen

---

## Phase 4: Milestones fuer Release-Planung

### Vorgeschlagene Milestones

| Milestone | Beschreibung | Ziel-Datum |
|-----------|-------------|------------|
| `v1.0.0-alpha` | Foundation Phase — Kern-Komponenten | (aktuell) |
| `v1.0.0-beta` | Alle P1-Komponenten fertig, Figma-Export stabil | TBD |
| `v1.0.0-rc` | Alle P1+P2 fertig, Docs komplett, CI/CD gruen | TBD |
| `v1.0.0` | Erster stabiler Release | TBD |

**Nutzung:**
- Jedes Issue wird einem Milestone zugewiesen
- Milestone-Seite zeigt Fortschrittsbalken (X/Y Issues geschlossen)
- Hilft bei der Release-Planung und Kommunikation

---

## Phase 5: CI/CD-Pipelines ausbauen

### Bestehende Pipeline

Aktuell existiert `.gitea/workflows/visual-tests.yml` mit:
- Token Build Validation
- Token Schema Validation
- CSS Analysis
- Playwright Visual Tests

### Neue Pipelines

#### 5.1 Lint + Unit Tests (bei jedem Push)

Datei: `.gitea/workflows/test.yml`

```yaml
name: Tests
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm build:tokens
      - run: pnpm test
```

#### 5.2 Storybook Build Verification (bei PRs)

Datei: `.gitea/workflows/storybook.yml`

```yaml
name: Storybook Build
on:
  pull_request:

jobs:
  storybook:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm build:tokens
      - run: pnpm --filter @nordlig/storybook build
```

#### 5.3 Bundle Size Check (bei PRs)

Datei: `.gitea/workflows/bundle-size.yml`

```yaml
name: Bundle Size
on:
  pull_request:

jobs:
  size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Check component bundle size
        run: |
          SIZE=$(du -sk packages/components/dist/ 2>/dev/null | cut -f1)
          echo "Components bundle: ${SIZE}KB"
          if [ "$SIZE" -gt 512 ]; then
            echo "::error::Component bundle exceeds 512KB limit (${SIZE}KB)"
            exit 1
          fi

      - name: Check Figma plugin bundle size
        run: |
          SIZE=$(wc -c < packages/figma-plugin/plugin/dist/code.js)
          SIZE_KB=$((SIZE / 1024))
          echo "Figma plugin: ${SIZE_KB}KB"
          if [ "$SIZE_KB" -gt 120 ]; then
            echo "::error::Figma plugin exceeds 120KB limit (${SIZE_KB}KB)"
            exit 1
          fi
```

#### 5.4 Full QA Pipeline (vor Merge in main)

Datei: `.gitea/workflows/qa.yml`

```yaml
name: Full QA
on:
  pull_request:
    branches: [main]

jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      # Token Pipeline
      - run: pnpm build:tokens
      - run: pnpm validate:tokens
      - run: pnpm analyze:css

      # Unit Tests
      - run: pnpm test

      # Storybook
      - run: pnpm --filter @nordlig/storybook build

      # Visual Tests
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:visual
```

> Hinweis: Die bestehende `visual-tests.yml` kann in die `qa.yml` integriert
> oder als spezialisierte Pipeline beibehalten werden.

---

## Phase 6: Branch Protection Rules

### Konfiguration (Gitea → Repository → Settings → Branches)

**Protected Branch: `main`**

| Regel | Einstellung |
|-------|------------|
| Push erlaubt | Nur ueber PR |
| Direkter Push | Deaktiviert |
| PR Approvals erforderlich | 1 (oder 0 bei Solo-Entwicklung) |
| Status Checks muessen bestehen | `qa` Job muss gruen sein |
| Dismiss stale approvals | Ja |
| Force Push | Deaktiviert |

**Workflow:**
1. Feature-Branch erstellen: `feature/toggle-component`
2. Entwickeln, committen, pushen
3. PR erstellen → CI/CD laeuft automatisch
4. Alle Checks gruen → Merge erlaubt

---

## Phase 7: npm Package Registry

### Konfiguration

Gitea bietet eine eingebaute npm Registry unter:
```
https://<gitea-host>/api/packages/<owner>/npm/
```

### Setup in jedem Package

Datei: `packages/components/.npmrc`
```
@nordlig:registry=https://<gitea-host>/api/packages/<owner>/npm/
```

### Publish-Workflow

Datei: `.gitea/workflows/publish.yml`

```yaml
name: Publish Packages
on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Configure Registry
        run: |
          echo "@nordlig:registry=https://<gitea-host>/api/packages/<owner>/npm/" > .npmrc
          echo "//gitea-host/api/packages/<owner>/npm/:_authToken=${{ secrets.GITEA_TOKEN }}" >> .npmrc

      - name: Publish
        run: |
          pnpm --filter @nordlig/tokens publish --no-git-checks
          pnpm --filter @nordlig/styles publish --no-git-checks
          pnpm --filter @nordlig/components publish --no-git-checks
```

### Pakete

| Paket | Beschreibung |
|-------|-------------|
| `@nordlig/tokens` | Token JSON + Build-Scripts |
| `@nordlig/styles` | Generiertes CSS (tokens.css, dark-tokens.css) |
| `@nordlig/components` | React-Komponenten |

---

## Phase 8: Wiki fuer stabile Dokumentation

### Vorgeschlagene Wiki-Seiten

| Seite | Inhalt | Quelle |
|-------|--------|--------|
| Home | Uebersicht + Quickstart | Neu |
| Token-Architektur | 4-Layer Erklaerung mit Beispielen | Aus PROJEKT_REGELN.md extrahieren |
| Komponenten-Workflow | 7-Schritt-Anleitung | Aus PROJEKT_REGELN.md extrahieren |
| Naming Conventions | Token-Benennung, Dateistruktur | Aus PROJEKT_REGELN.md extrahieren |
| Figma Integration | Plugin-Nutzung, Export-Workflow | Neu |
| Onboarding | Setup-Anleitung fuer neue Entwickler | Neu |
| ADR (Decisions) | Architektur-Entscheidungen | Neu |

**Vorteil gegenueber Markdown im Repo:**
- Separate Versionierung (stoert nicht die Code-Historie)
- Einfacher zu bearbeiten (Web-Editor)
- Suchbar ueber Gitea-Suche

---

## Umsetzungsreihenfolge (Empfehlung)

```
Woche 1:
  Mo: Phase 1 (Labels + Templates)           [1-2h]
  Mo: Phase 3 (Kanban Board erstellen)        [30min]
  Di: Phase 2 (Backlog migrieren)             [2-3h]
  Mi: Phase 4 (Milestones)                    [30min]

Woche 2:
  Mo: Phase 6 (Branch Protection)             [15min]
  Di: Phase 5 (CI/CD Pipelines)               [2-3h]

Spaeter (wenn benoetigt):
  Phase 7 (Package Registry)                  [1-2h]
  Phase 8 (Wiki)                              [1-2h]
```

---

## Was wird ersetzt?

| Vorher (manuell) | Nachher (Gitea) | Status |
|-------------------|-----------------|--------|
| BACKLOG.md (1200 Zeilen) | Issues + Kanban Board | Ersetzt |
| COMPONENT_LOG.md Status-Tracking | Issue Labels + DoD-Checkboxen | Teilweise ersetzt* |
| Manuelles `pnpm build` zur Pruefung | Automatische CI/CD Pipeline | Ersetzt |
| Direkte Pushes auf main | Branch Protection + PR Reviews | Ersetzt |
| Lokale npm-Links | Gitea Package Registry | Ersetzt |
| PROJEKT_REGELN.md als Nachschlagewerk | Wiki (besser durchsuchbar) | Optional |

*COMPONENT_LOG.md bleibt als technische Referenz bestehen (Token-Mappings, Dateipfade etc.),
aber der Status-Tracking-Teil wandert in die Issues.

---

## Nicht aendern

Diese Dateien bleiben wie sie sind:
- **PROJEKT_REGELN.md** — Weiterhin Source of Truth fuer Regeln (ggf. zusaetzlich ins Wiki spiegeln)
- **COMPONENT_LOG.md** — Technische Referenz pro Komponente (Token-Mapping, Dateien, Varianten)
- **CLAUDE.md** — KI-Instruktionen
