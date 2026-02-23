# Barrierefreiheit (Accessibility)

Das Nordlig Design System zielt auf **WCAG 2.1 AA** Konformitaet als Baseline und erfasst **AAA**-Konformitaet pro Komponente.

## WCAG-Levels

| Level | Beschreibung | Ziel |
|-------|-------------|------|
| **A** | Minimum — grundlegende Barrierefreiheit | Pflicht fuer alle Komponenten |
| **AA** | Standard — breite Nutzbarkeit | Pflicht fuer alle Komponenten |
| **AAA** | Erweitert — hoechste Barrierefreiheit | Angestrebt wo moeglich |

## Komponenten-Compliance Matrix

Die folgende Tabelle zeigt den Compliance-Status jeder Komponente.

**Legende:**
- Ja = Kriterium erfuellt
- Teilweise = Teilweise erfuellt (Details in Anmerkungen)
- — = Nicht zutreffend fuer diese Komponente

### Atoms

| Komponente | AA | AAA | Kontrastverhaeltnis | Fokus-Indikator | aria-* Labels | Anmerkungen |
|------------|:--:|:---:|:-------------------:|:---------------:|:-------------:|-------------|
| Button | Ja | Ja | 7:1+ | Ja | Ja | Alle Varianten AAA-konform |
| Input | Ja | Ja | 7:1+ | Ja | Ja | aria-invalid, aria-describedby |
| Badge | Ja | Teilweise | 4.5:1+ | — | — | Info-Variant knapp unter AAA |
| Avatar | Ja | Ja | — | — | alt-Text via AvatarImage | Fallback-Text kontraststark |
| Checkbox | Ja | Ja | 7:1+ | Ja | Ja | aria-checked |
| Switch | Ja | Ja | 7:1+ | Ja | Ja | role="switch" |
| Radio | Ja | Ja | 7:1+ | Ja | Ja | aria-checked |
| Slider | Ja | Ja | — | Ja | Ja | aria-valuemin/max/now |
| Tooltip | Ja | Ja | — | — | Ja | role="tooltip", Escape schliesst |
| Separator | Ja | Ja | — | — | Ja | role="separator" oder decorative |
| Label | Ja | Ja | 7:1+ | — | Ja | htmlFor-Verknuepfung |
| Kbd | Ja | Ja | 7:1+ | — | — | Semantisch korrekte <kbd> |
| Alert | Ja | Ja | 7:1+ | — | Ja | role="alert", aria-live |
| Progress | Ja | Ja | — | — | Ja | role="progressbar", aria-value* |
| Spinner | Ja | Ja | — | — | Ja | role="status", aria-label |
| Skeleton | Ja | Ja | — | — | Ja | aria-hidden="true" |
| Link | Ja | Ja | 7:1+ | Ja | — | Unterstrichen fuer Erkennbarkeit |
| Toggle | Ja | Ja | 7:1+ | Ja | Ja | aria-pressed |
| Tag | Ja | Teilweise | 4.5:1+ | — | — | Entfernen-Button hat aria-label |
| Rating | Ja | Ja | — | Ja | Ja | aria-label pro Stern |
| NumberInput | Ja | Ja | 7:1+ | Ja | Ja | aria-valuemin/max/now |
| Heading | Ja | Ja | 7:1+ | — | — | Semantische h1-h6 |
| Text | Ja | Ja | 7:1+ | — | — | Semantische Elemente |
| Code | Ja | Ja | 7:1+ | — | — | Semantische pre/code |
| Blockquote | Ja | Ja | 7:1+ | — | — | Semantische blockquote |
| Image | Ja | Ja | — | — | Ja | alt-Attribut erforderlich |
| VisuallyHidden | Ja | Ja | — | — | — | SR-only Pattern |

### Molecules

| Komponente | AA | AAA | Fokus-Management | Keyboard-Nav | Anmerkungen |
|------------|:--:|:---:|:----------------:|:------------:|-------------|
| Card | Ja | Ja | — | — | Semantisch via role bei hoverable |
| Dialog | Ja | Ja | Ja | Ja | Focus-Trap, Escape, aria-modal |
| AlertDialog | Ja | Ja | Ja | Ja | Fokus auf Cancel-Button |
| Sheet | Ja | Ja | Ja | Ja | Focus-Trap, Escape |
| Tabs | Ja | Ja | Ja | Ja | Arrow-Keys, Home/End |
| Accordion | Ja | Ja | Ja | Ja | Enter/Space toggle |
| Select | Ja | Ja | Ja | Ja | Typeahead, Arrow-Keys |
| Combobox | Ja | Ja | Ja | Ja | aria-expanded, aria-activedescendant |
| DropdownMenu | Ja | Ja | Ja | Ja | Arrow-Keys, Typeahead |
| ContextMenu | Ja | Ja | Ja | Ja | Rechtsklick + Shift+F10 |
| Breadcrumbs | Ja | Ja | — | — | nav + aria-label |
| Pagination | Ja | Ja | — | Ja | aria-current="page" |
| Toast | Ja | Ja | Ja | — | aria-live="polite", role="status" |
| Form | Ja | Ja | — | — | aria-invalid, aria-describedby |
| RadioGroup | Ja | Ja | Ja | Ja | Arrow-Keys innerhalb Gruppe |
| TagInput | Ja | Ja | Ja | Ja | aria-live fuer Screenreader |
| DatePicker | Ja | Teilweise | Ja | Ja | Calendar-Grid komplex |
| Drawer | Ja | Ja | Ja | Ja | Focus-Trap, Escape |
| NavigationMenu | Ja | Ja | Ja | Ja | Arrow-Keys, Enter |
| Menubar | Ja | Ja | Ja | Ja | Vollstaendige Menu-Semantik |

### Organisms

| Komponente | AA | AAA | Fokus-Management | Keyboard-Nav | Anmerkungen |
|------------|:--:|:---:|:----------------:|:------------:|-------------|
| DataTable | Ja | Teilweise | — | Teilweise | Sortierung via Button |
| Modal | Ja | Ja | Ja | Ja | Focus-Trap, Escape |
| Sidebar | Ja | Ja | — | Ja | Collapse via Keyboard |
| RichTextEditor | Ja | Teilweise | Ja | Ja | Toolbar-Buttons mit Tooltips |
| Command | Ja | Ja | Ja | Ja | aria-expanded, Typeahead |
| Chart | Ja | Teilweise | — | — | Visuelle Daten ohne Textalternative |

### Patterns

| Komponente | AA | AAA | Anmerkungen |
|------------|:--:|:---:|-------------|
| Spotlight | Ja | Ja | Globaler Shortcut, Focus-Management |
| AnalyticsDashboard | Ja | Teilweise | Charts brauchen Textalternativen |
| NotificationCenter | Ja | Ja | aria-live Region |
| FormWizard | Ja | Ja | Schritt-Anzeige via aria |

## Pruefverfahren

1. **Automatisch (CI)**: `@storybook/addon-a11y` via axe-core prueft Kontrast, ARIA-Attribute und DOM-Struktur
2. **Manuell**: Keyboard-only Navigation, Screenreader-Tests (VoiceOver)
3. **Token-basiert**: Farbkontraste werden auf Token-Ebene sichergestellt (L1 Palette → L4 Komponente)

## AAA-Verbesserungsbereiche

Diese Komponenten erreichen derzeit nur AA und koennten auf AAA angehoben werden:

1. **Badge (info)**: Kontrast der `info`-Variante auf 7:1 erhoehen
2. **Tag**: Kleine Variante hat knappen Kontrast
3. **DataTable**: Zeilen-Hover und Sortier-Indikator kontrastreicher gestalten
4. **Chart**: Textalternativen fuer Diagramme bereitstellen (`aria-label` oder Datentabelle)
5. **DatePicker**: Touch-Target-Groesse der Kalendertage optimieren
6. **RichTextEditor**: Toolbar-Buttons bei hover/active kontrastreicher
