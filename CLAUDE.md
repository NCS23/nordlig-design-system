# Nordlig Design System — Claude Code Instruktionen

> Einstiegspunkt fuer Claude Code. Detaillierte Regeln in den verlinkten Dokumenten.

---

## !! PFLICHT-WORKFLOW BEI JEDER STORY — KEINE AUSNAHMEN !!

**Bevor du irgendeine Story anfaengst, muessen ALLE diese Schritte beachtet werden.**

### A. VOR Arbeitsbeginn: Gitea-Issue anlegen

1. Remote-URL ermitteln: `git remote -v`
2. Gitea-Issue via API erstellen (`POST /api/v1/repos/{owner}/{repo}/issues`)
3. Issue-Nummer in BACKLOG.md Changelog referenzieren
4. **Gitea ist die Single Source of Truth** — BACKLOG.md ist nur Uebersicht + Changelog

### !! GITEA API-AUTHENTIFIZIERUNG — IMMER SO !!

```bash
# Token liegt im lokalen Git-Config — NIEMALS credential helper oder hardcoded Tokens verwenden!
TOKEN=$(cd /Users/Nils/Projects/nordlig-design-system && git config --local gitea.token)

# API-Calls:
curl -s -H "Authorization: token $TOKEN" "http://192.168.68.52:3001/api/v1/repos/NCSNASadmin/nordlig-design-system/..."

# Push mit Auth (falls osxkeychain abgelaufen):
git push "http://NCSNASadmin:$TOKEN@192.168.68.52:3001/NCSNASadmin/nordlig-design-system.git" main
```

**VERBOTEN:** `git credential fill`, hardcoded Token-Strings, Token aus Umgebungsvariablen raten.

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

- [ ] BACKLOG.md lesen, Story-Status aktualisieren
- [ ] Gitea-Issue anlegen (Section A oben)
- [ ] L4-Tokens erstellen, `pnpm build` in `packages/tokens/`, Ergebnis in `tokens.css` pruefen
- [ ] Komponente implementieren (`forwardRef`, `cn()`, `cva()`, nur `var(--*)`)
- [ ] Unit Tests schreiben + ausfuehren
- [ ] Stories schreiben (Token-Doku nur in `Colors.stories.tsx` etc.)
- [ ] Begleitdateien: `tokens-annotated.css`, `Colors.stories.tsx`, `COMPONENT_LOG.md`, `index.ts`
- [ ] Design & UX Review gegen [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)
- [ ] Visual Tests (Playwright) ergaenzen
- [ ] Commit + Push + CI abwarten (Section B oben)
- [ ] Gitea-Issue kommentieren + schliessen

---

## Storybook-Verifikation

Nach **jeder** Aenderung an Komponenten oder Stories: `pnpm --filter @nordlig/storybook build`.
Erst bei 0 Fehlern ist die Arbeit abgeschlossen.

---

## Verbotene Patterns

- Hardcoded Hex-Farben in Komponenten
- Tailwind Farb-/Shadow-/Radius-Klassen (`bg-sky-500`, `shadow-md`, `rounded-lg`)
- Hardcoded Heights (`h-8`, `h-10`) wenn Sizing-Tokens existieren
- DesignTokens-Stories in Komponentendateien
- Atoms in Organisms reimplementieren (Skeleton statt animate-pulse, etc.)
- L4-Tokens die L1/L2 direkt referenzieren
- `shadow-[var(...)]` bei Komma-Werten (stattdessen `[box-shadow:var(...)]`)
- `text-[var(...)]` ohne `length:`-Prefix fuer font-size

---

## Sprache

- Code, Variablennamen, Props, CSS: **Englisch**
- Kommentare, Docs, Storybook-Beschreibungen, Commits: **Deutsch**
