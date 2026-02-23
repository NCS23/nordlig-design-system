# Internationalisierungs-Strategie (i18n)

## Status Quo

Das Nordlig DS ist derzeit vollstaendig auf Deutsch: ARIA-Labels, Platzhalter, Fehlertexte und sichtbare UI-Texte. Das betrifft **19 Komponenten** mit insgesamt ~50 hartcodierten deutschen Strings.

## Entscheidung

**Ansatz: Labels als Props mit deutschen Defaults** (Option 1)

Jede Komponente behaelt ihre deutschen Defaults, bietet aber Props zum Ueberschreiben. Das ist der pragmatischste Ansatz:
- Keine Breaking Changes fuer bestehende Nutzer
- Keine neue Provider-Dependency
- Konsumenten koennen Strings punktuell ueberschreiben
- Spaetere Migration zu einem i18n-Provider bleibt moeglich

## Betroffene Komponenten

### Prioritaet 1 — Haeufig verwendete Labels

| Komponente | String | Prop | Default |
|-----------|--------|------|---------|
| Dialog | `aria-label="Schliessen"` | `closeLabel` | `"Schliessen"` |
| Sheet | `aria-label="Schliessen"` | `closeLabel` | `"Schliessen"` |
| Modal | `aria-label="Schliessen"` | `closeLabel` | `"Schliessen"` |
| Alert | `aria-label="Schliessen"` | `closeLabel` | `"Schliessen"` |
| Banner | `aria-label="Schliessen"` | `dismissLabel` | `"Schliessen"` |
| Toast | `aria-label="Schliessen"` | `closeLabel` | `"Schliessen"` |
| CopyButton | `"Kopiert" / "In Zwischenablage kopieren"` | `copiedLabel` / `copyLabel` | `"Kopiert"` / `"In Zwischenablage kopieren"` |
| Code | `"Kopiert" / "Code kopieren"` | `copiedLabel` / `copyLabel` | `"Kopiert"` / `"Code kopieren"` |

### Prioritaet 2 — Navigations-Labels

| Komponente | Strings | Props |
|-----------|---------|-------|
| Pagination | `"Seitennavigation"`, `"Vorherige Seite"`, `"Naechste Seite"`, `"Seite X von Y"` | `labels` Objekt |
| Carousel | `"Karussell"`, `"Vorheriger Slide"`, `"Naechster Slide"` | `labels` Objekt |
| Stepper | `"Fortschritt"`, `"Gehe zu Schritt X"` | `labels` Objekt |

### Prioritaet 3 — Komplexe Texte

| Komponente | Strings | Props |
|-----------|---------|-------|
| DatePicker | `"Datum auswaehlen"`, `"Kalender oeffnen"` | `labels` Objekt |
| DateRangePicker | `"Von"`, `"Bis"`, `"Startdatum"`, `"Enddatum"` | `labels` Objekt |
| Calendar | `"Vorheriger Monat"`, `"Naechster Monat"`, Locale | `locale` Prop (bereits vorhanden) |
| FileUpload | Instruktionen, Fehler, Status | `labels` Objekt |
| FileUploadZone | Instruktionen, Fehler, Status | `labels` Objekt |

## API-Design

### Einfache Komponenten — Einzelne Props

```tsx
// Vorher
<Dialog>...</Dialog>  // aria-label="Schliessen" hartcodiert

// Nachher
<Dialog closeLabel="Close">...</Dialog>  // Ueberschreibbar
<Dialog />  // Default: "Schliessen"
```

### Komplexe Komponenten — Labels-Objekt

```tsx
// Pagination Labels
interface PaginationLabels {
  navigation?: string;    // "Seitennavigation"
  previous?: string;      // "Vorherige Seite"
  next?: string;          // "Naechste Seite"
  pageInfo?: (current: number, total: number) => string;
}

<Pagination
  labels={{
    navigation: "Page navigation",
    previous: "Previous page",
    next: "Next page",
    pageInfo: (c, t) => `Page ${c} of ${t}`,
  }}
/>
```

## Roadmap

| Phase | Aufgabe | Aufwand |
|-------|---------|--------|
| Sofort | Dieses Strategie-Dokument | Erledigt |
| Sprint 1 | Prio 1: Close/Copy Labels als Props | ~2h |
| Sprint 2 | Prio 2: Navigation Labels-Objekte | ~3h |
| Sprint 3 | Prio 3: FileUpload + DatePicker Labels | ~4h |
| Optional | i18n-Provider als Alternative | ~6h |

## Bekannte Inkonsistenzen

Bei der Analyse wurden Schreibweisen-Inkonsistenzen gefunden:
- `"Schliessen"` (Dialog, Sheet) vs. `"Schließen"` (Modal, Alert, Toast, Banner) — Umlaut vs. ASCII
- `"Naechste Seite"` vs. `"Nächster Monat"` — gleiches Problem

Diese sollten beim Refactoring vereinheitlicht werden (ASCII-Variante empfohlen fuer Quellcode-Kompatibilitaet).
