# Visual Quality Assurance - Nordlig Design System

## Uebersicht

Das Visual-QA-System stellt die visuelle Konsistenz aller Komponenten sicher. Es besteht aus drei Saeulen:

1. **Visual Regression Tests** — Playwright-basierte Screenshot-Vergleiche
2. **Token Validator** — Prueft die 4-Schichten-Architektur (L1→L2→L3→L4)
3. **CSS Analysis** — Erkennt hartcodierte Werte ausserhalb des Token-Systems

---

## Schnellstart

```bash
# Alle QA-Checks ausfuehren
pnpm qa

# Einzelne Checks
pnpm validate:tokens        # Token-Schicht-Validierung
pnpm analyze:css             # CSS-Analyse
pnpm test:visual             # Playwright Visual Tests
pnpm test:visual:update      # Baseline-Screenshots aktualisieren
```

---

## Visual Regression Tests

### Wie es funktioniert

1. Storybook wird automatisch auf Port 6006 gestartet
2. Playwright navigiert zu jeder Story im Iframe-Modus
3. Ein Screenshot wird erstellt und mit dem Baseline-Bild verglichen
4. Abweichungen > 1% (Pixel-Verhaeltnis) werden als Fehler gemeldet

### Test-Struktur

```
tests/visual/
  helpers.ts          # Gemeinsame Hilfsfunktionen
  atoms.spec.ts       # 19 Atom-Komponenten
  molecules.spec.ts   # 17 Molecule-Komponenten
  organisms.spec.ts   # 5 Organism-Komponenten
  dark-mode.spec.ts   # Dark-Mode-Varianten
  __screenshots__/    # Baseline-Bilder (Git-verfolgt)
```

### Baselines aktualisieren

Nach bewussten visuellen Aenderungen:

```bash
pnpm test:visual:update
```

Die aktualisierten Screenshots in `tests/visual/__screenshots__/` muessen committet werden.

### Neue Komponente hinzufuegen

1. Story-ID ermitteln: `{layer}-{component}--{story}` (z.B. `atoms-button--primary`)
2. Eintrag im passenden Spec-File hinzufuegen:

```typescript
// In atoms.spec.ts:
{ component: 'NeueKomponente', stories: ['default', 'variant'] },
```

3. Fuer interaktive Komponenten (Popover, Tooltip, etc.) einen eigenen `test.describe`-Block verwenden.

### Spezialfaelle

- **Portal-Komponenten** (Dialog, Sheet, Modal): Nutzen `screenshotFullPage()` statt `screenshotStory()`
- **Charts**: Hoehere Toleranz (`maxDiffPixelRatio: 0.02`) wegen SVG-Rendering
- **Interaktive Komponenten**: Benoetigen `hover()`/`click()` vor dem Screenshot

---

## Token Validator

### Was geprueft wird

1. **Schicht-Referenzen**: L4-Tokens duerfen NUR L3-Tokens referenzieren
2. **Namenskonventionen**: Token-Pfade muessen Kleinbuchstaben verwenden
3. **Verwaiste Tokens**: In JSON definiert aber in keiner Komponente verwendet

### Ausgabe interpretieren

```
FEHLER (Schicht-Verletzungen): 17
  button.json: color.btn.secondary.bg-hover referenziert L2-Token {color.neutral.1.200}

VERWAISTE TOKENS: 3
  color.input.label (--color-input-label)
```

- **L2-Verletzungen**: Token referenziert direkt die globale Schicht statt die Rollen-Schicht
- **Verwaiste Tokens**: Definiert aber nicht in `var(--*)` in Komponenten genutzt

### Strict-Modus

```bash
# Warnt nur (Exit-Code 0)
pnpm validate:tokens

# Fehler fuehren zu Exit-Code 1 (fuer CI)
node scripts/validate-tokens.js --strict
```

---

## CSS Analysis

### Was erkannt wird

1. **Hartcodierte Hex-Farben**: `#0ea5e9`, `bg-[#fff]` etc.
2. **Hartcodierte RGB/HSL**: `rgba(0,0,0,0.5)` etc.
3. **Direkte Tailwind-Farben**: `bg-slate-500`, `text-gray-400` (umgehen Token-System)
4. **Hartcodierte Pixel-Spacing**: `p-[16px]`, `gap-[24px]` etc.

### Ausnahmen

- Story-Dateien (`*.stories.tsx`) werden nicht analysiert
- Test-Dateien (`*.test.tsx`) werden nicht analysiert
- Kommentare werden uebersprungen
- Farben innerhalb von `var()` sind erlaubt

### Compliance-Score

Das Script berechnet einen Compliance-Prozentsatz:

```
Token-Referenzen / (Token-Referenzen + Hartcodierte Werte) × 100
```

Ziel: 100% Compliance in allen Komponenten-Quelldateien.

---

## CI/CD Integration

### Gitea Actions Workflow

Der Workflow (`.gitea/workflows/visual-tests.yml`) fuehrt bei jedem PR und Push auf `main` aus:

1. Dependencies installieren + Build
2. Token-Validierung (schnellster Check zuerst)
3. CSS-Analyse
4. Playwright Visual Tests

### Bei Fehlern

- Test-Ergebnisse und Screenshots werden als Artefakte hochgeladen
- Artefakte sind 14 Tage verfuegbar
- Vergleiche `expected` vs `actual` Screenshots im Playwright-Report

---

## Fehlerbehebung

### Flaky Tests

- Erhoehe `waitForTimeout()` in `helpers.ts` (aktuell 300ms)
- Pruefe ob Animationen korrekt deaktiviert sind (`animations: 'disabled'` in config)
- Charts und SVG-Komponenten brauchen laengere Wartezeiten

### Screenshot-Unterschiede zwischen lokal und CI

- Font-Rendering unterscheidet sich zwischen macOS und Linux
- Erhoehe `maxDiffPixelRatio` auf `0.02` falls noetig
- Alternative: Baselines auf Linux generieren (Docker)

### Storybook startet nicht

```bash
# Manuell starten und pruefen
pnpm --filter @nordlig/storybook storybook

# Playwright nutzt reuseExistingServer lokal
# Bei Problemen: Port 6006 freigeben
lsof -i :6006
```

### Token-Validator findet viele L2-Referenzen

Das ist aktuell ein bekanntes Problem. Einige L4-Tokens referenzieren L2 direkt (z.B. `{color.neutral.1.200}`). Diese sollten schrittweise auf L3-Referenzen migriert werden.

---

## Verzeichnisstruktur

```
nordlig-design-system/
  playwright.config.ts          # Playwright-Konfiguration
  tests/visual/
    helpers.ts                  # Test-Hilfsfunktionen
    atoms.spec.ts               # Atom Visual Tests
    molecules.spec.ts           # Molecule Visual Tests
    organisms.spec.ts           # Organism Visual Tests
    dark-mode.spec.ts           # Dark Mode Tests
    __screenshots__/            # Baseline-Screenshots (committet)
  scripts/
    validate-tokens.js          # Token-Schicht-Validator
    analyze-css.js              # CSS-Analyse
  .gitea/workflows/
    visual-tests.yml            # CI/CD Workflow
```
