# Nordlig Design System — Claude Code Instruktionen

> Einstiegspunkt fuer Claude Code. Detaillierte Regeln in den verlinkten Dokumenten.

---

## !! PFLICHT-WORKFLOW BEI JEDER STORY — KEINE AUSNAHMEN !!

**Bevor du irgendeine Story anfaengst, muessen ALLE diese Schritte beachtet werden.**

### PHASE 0: PFLICHTLEKTUERE — VOR JEDER ZEILE CODE

> **STOPP! Du darfst KEINE Komponente implementieren, bevor du diese Phase abgeschlossen hast.**
> **Das Ueberspringen dieser Phase hat wiederholt zu 4+ Critical Issues pro Komponente gefuehrt.**

1. **DESIGN_PRINCIPLES.md LESEN** — 5 Saeulen + 7 Gestaltungskriterien + Nordlig-Heuristik
2. **PROJEKT_REGELN.md LESEN** — Focus-Ring-Standard, Disabled-Standard, Animation-Standard, Accessibility-Checkliste
3. **Kurzform-Checkliste verinnerlichen** (aus DESIGN_PRINCIPLES.md Section "UX-Review Kurzform")

Konkret bedeutet das, dass JEDE Komponente von Anfang an haben MUSS:
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1` auf JEDEM interaktiven Element
- `motion-reduce:transition-none` auf JEDER Animation/Transition
- `!disabled &&` Guard vor JEDEM hover-Style
- `min-h-[44px] min-w-[44px]` (oder Token) auf JEDEM Button/interaktiven Element
- NUR `var(--*)` Tokens — KEINE hardcodierten Werte (h-10, ml-2, rounded, size={14}, etc.)
- `duration-200` fuer UI-Feedback, `duration-500` fuer Progress/Data
- `aria-live="polite"` auf dynamisch aktualisierten Bereichen
- `aria-busy` bei laufenden Operationen

**FEHLER AUS NDS-064 (FileUploadZone): Alle 4 Critical Issues (Focus-Ring, motion-reduce, hardcodierte Groessen, hardcodierter Spacing) waeren vermeidbar gewesen, wenn Phase 0 eingehalten worden waere.**

### A. VOR Arbeitsbeginn: GitHub-Issue anlegen

1. Issue via `gh` CLI erstellen: `gh issue create -R NCS23/nordlig-design-system --title "..." --body "..."`
2. Issue-Nummer in BACKLOG.md Changelog referenzieren
3. **GitHub ist die Single Source of Truth** — BACKLOG.md ist nur Uebersicht + Changelog

```bash
# Issues auflisten
gh issue list -R NCS23/nordlig-design-system --state open

# Issue erstellen (mit Template)
gh issue create -R NCS23/nordlig-design-system --template component.yml
```

### B. NACH Abschluss jeder Story: Commit + Push + CI

1. Alle Tests lokal gruen: `pnpm --filter @nordlig/components test -- --run`
2. Storybook baut: `pnpm --filter @nordlig/storybook build`
3. Commit erstellen (mit Story-Nummer im Message)
4. Pushen: `git push`
5. **CI abwarten** — Status pollen bis `completed`
6. Bei CI-Fehler: sofort fixen, neu pushen, erneut warten
7. GitHub-Issue kommentieren + schliessen

### C. VOR dem Commit: UX/Design Review SELBSTSTAENDIG durchfuehren

> **STOPP! Du darfst NICHT committen, bevor das Review abgeschlossen ist.**
> **Das Review wird NICHT auf Nachfrage gemacht — es ist PFLICHT vor jedem Commit.**

1. Review-Agent starten: Pruefe die Komponente gegen DESIGN_PRINCIPLES.md + PROJEKT_REGELN.md
2. Alle Critical + Major Issues MUESSEN gefixt werden bevor committed wird
3. Review-Ergebnis als Kommentar im Commit dokumentieren (Anzahl gefundener/gefixter Issues)

### D. Reihenfolge ist VERPFLICHTEND

```
Phase 0 (Docs lesen) → GitHub-Issue → Arbeit → UX/Design Review → Fix Issues → Tests → Storybook → Commit → Push → CI gruen → Issue schliessen
```

**FEHLER AUS WELLE 5 (NDS-120 bis NDS-124): Stories wurden OHNE GitHub-Issues und OHNE Commit/Push bearbeitet. Das darf NIE WIEDER passieren.**
**FEHLER AUS NDS-064 (FileUploadZone): UX/Design Review wurde NICHT selbststaendig durchgefuehrt. 4 Critical + 8 Major Issues mussten nachtraeglich gefixt werden. Das darf NIE WIEDER passieren.**

---

## Wo steht was

| Thema | Dokument |
|-------|----------|
| Token-Hierarchie (4-Layer), Naming, Enforcement | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Komponentenerstellung (7-Schritt-Workflow) | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Tailwind v3 Gotchas, Erlaubte Ausnahmen | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Focus-Ring, Disabled-State, Animation-Standards | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Accessibility-Checkliste, Testing Requirements | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Token-Dokumentation (Centralized Architecture) | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Sizing-Token Pflicht | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| Design & UX Review Pflicht | [PROJEKT_REGELN.md](PROJEKT_REGELN.md) |
| 5 Saeulen (Funktionalismus, Lagom, Hygge, ...) | [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) |
| 7 Gestaltungskriterien (A-G) | [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) |
| Nordlig-Heuristik (5 Pruef-Fragen) | [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) |
| UX-Review Kurzform-Checkliste | [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) |
| Komponentenverzeichnis + Statistiken | [COMPONENT_LOG.md](COMPONENT_LOG.md) |
| Sprint-Status, Changelog | [BACKLOG.md](BACKLOG.md) |
| Architektur Deep Dive (4-Layer) | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Bisherige Reviews | [docs/reviews/](docs/reviews/) |

---

## Checkliste pro Story

Kompakte Uebersicht — Details in [PROJEKT_REGELN.md](PROJEKT_REGELN.md):

### Phase 0 — Pflichtlektuere (VOR dem Coden)
- [ ] [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) gelesen (5 Saeulen + 7 Kriterien + Nordlig-Heuristik)
- [ ] [PROJEKT_REGELN.md](PROJEKT_REGELN.md) gelesen (Focus-Ring, Disabled, Animation, Accessibility)
- [ ] BACKLOG.md lesen

### Phase 1 — Setup
- [ ] GitHub-Issue anlegen (Section A oben)
- [ ] L4-Tokens erstellen, `pnpm build` in `packages/tokens/`, Ergebnis in `tokens.css` pruefen

### Phase 2 — Implementierung (mit Design Principles im Kopf!)
- [ ] Komponente implementieren (`forwardRef`, `cn()`, `cva()`, nur `var(--*)`)
- [ ] Dabei pruefen: Focus-Ring? motion-reduce? Touch-Target? Disabled-hover-reset? Keine hardcodierten Werte?
- [ ] Unit Tests schreiben + ausfuehren
- [ ] Stories schreiben

### Phase 3 — Review (VOR dem Commit!)
- [ ] **UX/Design Review SELBST durchfuehren** gegen [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)
- [ ] Alle Critical + Major Issues fixen
- [ ] Begleitdateien: `COMPONENT_LOG.md`, `index.ts`

### Phase 4 — Abschluss
- [ ] Commit + Push + CI abwarten (Section B oben)
- [ ] GitHub-Issue kommentieren + schliessen

---

## Storybook-Verifikation

Nach **jeder** Aenderung an Komponenten oder Stories: `pnpm --filter @nordlig/storybook build`.
Erst bei 0 Fehlern ist die Arbeit abgeschlossen.

---

## Verbotene Patterns

- Hardcoded Hex-Farben in Komponenten
- Tailwind Farb-/Shadow-/Radius-Klassen (`bg-sky-500`, `shadow-md`, `rounded-lg`)
- Hardcoded Heights/Widths/Spacing (`h-8`, `h-10`, `w-10`, `ml-2`, `rounded`) wenn Sizing-/Spacing-/Radius-Tokens existieren
- Hardcoded Icon-Sizes (`size={14}`, `size={48}`) — IMMER Token oder benannte Groesse (`size="sm"`)
- DesignTokens-Stories in Komponentendateien
- Atoms in Organisms reimplementieren (Skeleton statt animate-pulse, etc.)
- L4-Tokens die L1/L2 direkt referenzieren
- `shadow-[var(...)]` bei Komma-Werten (stattdessen `[box-shadow:var(...)]`)
- `text-[var(...)]` ohne `length:`-Prefix fuer font-size
- `animate-bounce` oder andere endlose/dramatische Animationen (Nordlig = zurueckhaltend)
- Interaktive Elemente OHNE `focus-visible:ring-*`
- Transitions/Animationen OHNE `motion-reduce:transition-none`
- Hover-Styles OHNE `!disabled &&` Guard
- Buttons/interaktive Elemente mit Touch-Target < 44×44px
- UX/Design Review UEBERSPRINGEN oder erst auf Nachfrage durchfuehren

---

## Sprache

- Code, Variablennamen, Props, CSS: **Englisch**
- Kommentare, Docs, Storybook-Beschreibungen, Commits: **Deutsch**
