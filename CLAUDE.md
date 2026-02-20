# Nordlig Design System — Claude Code Instruktionen

> Diese Datei wird automatisch von Claude Code geladen und definiert den verbindlichen Workflow.
> Detaillierte Regeln: [PROJEKT_REGELN.md](PROJEKT_REGELN.md)

---

## !! PFLICHT-WORKFLOW BEI JEDER STORY — KEINE AUSNAHMEN !!

**Bevor du irgendeine Story anfaengst, muessen ALLE diese Schritte beachtet werden. Wenn du einen Schritt uebergehst, ist das ein schwerwiegender Fehler.**

### A. VOR Arbeitsbeginn: Gitea-Issue anlegen

1. Remote-URL ermitteln: `git remote -v`
2. Gitea-Issue via API erstellen (`POST /api/v1/repos/{owner}/{repo}/issues`)
3. Issue-Nummer in BACKLOG.md Changelog referenzieren
4. **Gitea ist die Single Source of Truth** — BACKLOG.md ist nur Uebersicht + Changelog

### B. NACH Abschluss jeder Story: Commit + Push + CI

1. Alle Tests lokal gruen: `pnpm --filter @nordlig/components test -- --run`
2. Storybook baut: `pnpm --filter @nordlig/storybook build`
3. Commit erstellen (mit Story-Nummer im Message)
4. Pushen: `git push`
5. **CI abwarten** — Status pollen bis `completed`
6. Bei CI-Fehler: sofort fixen, neu pushen, erneut warten
7. Gitea-Issue kommentieren + schliessen

### C. Reihenfolge ist VERPFLICHTEND

```
Gitea-Issue → Arbeit → Tests → Storybook → Commit → Push → CI gruen → Issue schliessen
```

**FEHLER AUS WELLE 5 (NDS-120 bis NDS-124): Stories wurden OHNE Gitea-Issues und OHNE Commit/Push bearbeitet. Das darf NIE WIEDER passieren.**

---

## Sprache

- Code, Variablennamen, Props, CSS: **Englisch**
- Kommentare, Docs, Storybook-Beschreibungen, Commits: **Deutsch**

## Projekt-Struktur

```
packages/tokens/src/semantic/{component}.json   — L4-Token-Definitionen
packages/styles/dist/tokens.css                 — Generiertes CSS (pnpm build in tokens/)
packages/styles/dist/tokens-annotated.css       — Manuell gepflegt, resolved Hex-Werte
packages/components/src/{atoms|molecules|organisms}/{Name}/
apps/storybook/stories/Colors.stories.tsx       — Zentralisierte Token-Doku
tests/visual/                                   — Playwright Visual Regression Tests
COMPONENT_LOG.md                                — Komponentenverzeichnis + Statistiken
```

## 7-Schritt-Workflow: Neue Komponente

Jeder Schritt ist Pflicht. Keine Abkuerzungen.

### 1. L4-Tokens erstellen

- Datei: `packages/tokens/src/semantic/{name}.json`
- L4 referenziert **NUR** L3 Role-Tokens (`{color.bg.paper}`, `{color.text.base}`, etc.)
- Niemals L1/L2 direkt referenzieren, niemals Hex-Werte in L4
- Build: `cd packages/tokens && pnpm build`
- Verifizieren: `grep '{name}' packages/styles/dist/tokens.css`

### 2. Komponente implementieren

- **Immer:** `React.forwardRef` + `displayName`
- **Immer:** `cn()` fuer className-Merging, `cva()` fuer Varianten
- **Immer:** `var(--*)` Tokens — keine hardcoded Farben, Shadows, Radii
- **Sizing:** Shared Tokens wiederverwenden (`--sizing-input-{sm|md|lg}-height`)
- **Shadows:** `[box-shadow:var(--shadow-*)]` (nicht `shadow-[var(...)]`)
- **Font-Size:** `text-[length:var(--sizing-*-font-size)]` (length-Prefix!)
- **Unterstriche:** Keine Underscores nach `--` in Tailwind-Arbitrary-Values

### 3. Unit Tests

- vitest + @testing-library/react + jsdom
- Datei: `{ComponentDir}/{Name}.test.tsx`
- Abdeckung: Accessibility, States, Edge Cases, Token-Klassen
- Ausfuehren: `pnpm --filter @nordlig/components test -- --run src/{level}/{Name}/`

### 4. Stories

- Datei: `{ComponentDir}/{Name}.stories.tsx`
- Stories fuer alle Varianten, Sizes, States
- **NIEMALS** DesignTokens-Stories in Komponentendateien!
- Token-Dokumentation gehoert **ausschliesslich** in `apps/storybook/stories/Colors.stories.tsx`

### 5. Begleitende Dateien aktualisieren

| Datei | Was |
|-------|-----|
| `packages/styles/dist/tokens-annotated.css` | Resolved Hex-Werte + `@tokens`/`@presenter`/`@end` Annotations |
| `apps/storybook/stories/Colors.stories.tsx` | Neues Token-Array + Section in der Story |
| `COMPONENT_LOG.md` | Neuer Eintrag + Statistik-Update (Gesamtzahlen) |
| `packages/components/src/index.ts` | Export hinzufuegen |

### 6. Design & UX Review (NEVER SKIP!)

- Via Task-Agent ausfuehren (UX-Review-Prompt)
- **Gegen [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) pruefen** — die fuenf Saeulen: Funktionalismus, Lagom, Hygge, Demokratisk, Tidloeshet
- Nordlig-Heuristik anwenden: Ist es noetig? Ausgewogen? Einladend? Fuer alle? Zeitlos?
- Kurzform-Checkliste: Weissraum, Farbe (70-20-10), Typografie (max 3 Gewichte), Form (weiche Radii), Dichte, Ehrlichkeit, Accessibility
- **Alle Critical + Major Issues sofort fixen**
- Erst nach Review + Fixes gilt die Komponente als fertig
- Review-Empfehlungen gegen PROJEKT_REGELN.md validieren — Agenten koennen falsche Empfehlungen geben

### 7. Visual Tests (Playwright)

- Atom-Tests: `tests/visual/atoms.spec.ts` → zum `atomStories`-Array hinzufuegen
- Molecule-Tests: `tests/visual/molecules.spec.ts`
- Organism-Tests: `tests/visual/organisms.spec.ts`
- Dark-Mode: `tests/visual/dark-mode.spec.ts` → repraesentative Story ergaenzen
- Helpers: `gotoStory()`, `screenshotStory()`, `enableDarkMode()`, `screenshotFullPage()`

## Storybook-Verifikation

**Nach JEDER Aenderung an Komponenten oder Stories:**

```bash
pnpm --filter @nordlig/storybook build
```

Erst bei 0 Fehlern ist die Arbeit abgeschlossen.

## MCP Agents (nur Validierung)

Die Agents generieren **keinen Code**. Sie validieren nur.

| Agent | Tools | Zweck |
|-------|-------|-------|
| design-system | `validate_component`, `list_components` | Token-/Design-Validierung via API |
| testing | `validate_tokens`, `run_tests` | Regex-basierte Token-Pruefung + Test-Runner |
| ux-review | `review_component`, `review_accessibility`, `suggest_improvements`, `list_patterns` | UX-/A11y-Review via API |

## Tailwind v3 Gotchas

| Problem | Loesung |
|---------|---------|
| `shadow-[var(...)]` bricht bei Komma-Werten | `[box-shadow:var(...)]` verwenden |
| `text-[var(...)]` wird als Farbe interpretiert | `text-[length:var(...)]` verwenden |
| Unterstriche in `[var(--_name)]` werden zu Leerzeichen | Keine Underscores nach `--` |
| `ref` in Spread-Objekten | `ref` ist reservierter React-Prop, nicht in Daten-Objekte packen |

## Verbotene Patterns

- Hardcoded Hex-Farben in Komponenten
- Tailwind Farb-/Shadow-/Radius-Klassen (`bg-sky-500`, `shadow-md`, `rounded-lg`)
- Hardcoded Heights (`h-8`, `h-10`) wenn Sizing-Tokens existieren
- Emoji-Icons in Komponenten
- DesignTokens-Stories in Komponentendateien
- Atoms in Organisms reimplementieren (Skeleton statt animate-pulse, etc.)
- L4-Tokens die L1/L2 direkt referenzieren
