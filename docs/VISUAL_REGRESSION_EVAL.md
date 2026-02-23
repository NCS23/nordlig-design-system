# Visual Regression Testing — Evaluierung

## Ausgangslage

Das DS nutzt bereits Playwright fuer Visual Regression Tests in CI (`pr-checks.yml`). Screenshots werden bei Fehlern als Artifacts hochgeladen.

## Evaluierte Optionen

### 1. Chromatic (chromatic.com)

| Aspekt | Bewertung |
|--------|-----------|
| Storybook-Integration | Exzellent — direkt aus Stories |
| PR-Kommentare | Ja, mit Visual Diffs |
| Self-hosted | Nein — nur Cloud |
| Gitea-Kompatibilitaet | Schlecht — primaer GitHub/GitLab |
| Kosten | Free bis 5000 Snapshots/Monat |
| **Fazit** | Nicht kompatibel mit Gitea-Setup |

### 2. Percy (percy.io)

| Aspekt | Bewertung |
|--------|-----------|
| Framework-Support | Breit — Storybook, Playwright, Cypress |
| PR-Kommentare | Ja, via GitHub-Integration |
| Self-hosted | Nein — nur Cloud |
| Gitea-Kompatibilitaet | Mittel — CLI nutzbar, aber keine PR-Integration |
| Kosten | Free bis 5000 Snapshots/Monat |
| **Fazit** | CLI nutzbar, aber keine Gitea-PR-Integration |

### 3. Lost Pixel (lost-pixel.com)

| Aspekt | Bewertung |
|--------|-----------|
| Open Source | Ja — MIT Lizenz |
| Storybook-Integration | Ja — automatische Story-Erkennung |
| Self-hosted | Ja — Docker-basiert |
| Gitea-Kompatibilitaet | Gut — CI-agnostisch |
| Kosten | Kostenlos (self-hosted) |
| **Fazit** | Gute Option fuer spaeter |

### 4. Bestehende Playwright-Loesung (empfohlen)

| Aspekt | Bewertung |
|--------|-----------|
| Bereits integriert | Ja — `pr-checks.yml` |
| Self-hosted | Ja — laeuft in Gitea Actions |
| Gitea-Kompatibilitaet | Perfekt |
| Diff-Reports | Playwright HTML Report als Artifact |
| Kosten | Keine zusaetzlichen |
| **Fazit** | Bereits vorhanden, ausbaubar |

## Entscheidung

**Bestehende Playwright-Loesung beibehalten und verbessern.**

Gruende:
1. Laeuft bereits in CI ohne zusaetzliche Abhaengigkeiten
2. Voll kompatibel mit Gitea Actions
3. Keine Cloud-Abhaengigkeit oder Kosten
4. HTML-Report mit Visual Diffs wird als Artifact gespeichert

### Verbesserungen (umgesetzt)

1. **Playwright HTML-Report** bei Visual-Test-Fehlern als Artifact hochladen
2. **Separate Visual-Diff Artifacts** mit Actual/Expected/Diff-Bildern
3. **Bundle-Analyse** in PR-Checks integriert

### Zukuenftige Optionen

Falls eine Cloud-Loesung gewuenscht wird:
- **Lost Pixel** ist die beste self-hosted Alternative
- **Percy CLI** koennte ohne PR-Integration genutzt werden
