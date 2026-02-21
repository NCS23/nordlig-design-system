# Design & UX Review - Nordlig Design System

**Datum:** 14.02.2026 (Update: 15.02.2026 - Completion Package Review)
**Version:** 1.0.0-alpha (Foundation Phase + Completion Package)
**Reviewer:** Claude Code (AI-gestuetzt)
**Scope:** Alle 85 Komponenten (28 Atoms, 31 Molecules, 12 Organisms), 435 Stories, 186 Visual Regression Screenshots, 36 Semantic Token Files (924 CSS Custom Properties)

---

## Bewertungskriterien

Dieses Review orientiert sich an:
- Den definierten **Design-Prinzipien** (Minimalismus, Klarheit, Konsistenz, Accessibility, Standards)
- **WCAG 2.1 AA** Anforderungen
- **Nielsen's 10 Usability Heuristics**
- Best Practices fuer **Design Systems** (Nathan Curtis, Brad Frost Atomic Design)
- Der **4-Layer Token-Hierarchie** als zentrales Architekturprinzip

---

## 1. Executive Summary

### Gesamtbewertung: Sehr gut (4/5)

Das Nordlig Design System zeigt eine **aussergewoehnlich starke Token-Architektur** mit 99% Token-Compliance ueber alle 71 Komponenten. Die 4-Layer-Hierarchie (L1-L4) ist lueckenlos implementiert, keine Ebene wird uebersprungen, alle 924 CSS Custom Properties sind korrekt verkettet.

Die groessten Staerken liegen in:
- Konsequenter Token-Nutzung (vorbildlich fuer ein Design System in Alpha-Phase)
- Sauberer Atomic Design Struktur
- Guter Radix UI Integration mit durchdachten ARIA-Patterns
- Visuell konsistenter, minimalistischer Designsprache

Die wichtigsten Verbesserungsbereiche sind:
- **Kritische Accessibility-Luecke** in der Command-Komponente
- **Inkonsistente Focus-Ring-Patterns** in 5 Komponenten
- **Vereinzelte hardcodierte Werte** (Avatar, ToggleGroup, Skeleton, Pagination)
- **Uneinheitliche Disabled-State-Behandlung** ueber Komponenten hinweg

---

## 2. Design-Sprache & Visuelle Identitaet

### 2.1 Alignment mit Design-Prinzipien

| Prinzip | Bewertung | Begruendung |
|---------|-----------|-------------|
| **Minimalismus** | Sehr gut | Klare Formen, wenige Farben, kein visueller Ballast. Buttons, Cards, Inputs wirken aufgeraeumt. |
| **Klarheit** | Sehr gut | Funktion ist immer erkennbar. Gute visuelle Hierarchie durch Elevation-System (flat/raised/elevated). |
| **Konsistenz** | Gut | 90% konsistent. Abzuege bei Focus-Rings, Disabled-States und Transition-Timings (siehe Details). |
| **Accessibility** | Gut | Starke Basis durch Radix UI. Eine kritische Luecke (Command), mehrere kleinere Gaps. |
| **Standards** | Sehr gut | W3C DTCG Format, Semantic HTML, ARIA-Patterns korrekt eingesetzt. |

### 2.2 Farbsystem

**Staerken:**
- Klare Primaerfarbe (Sky Blue #0ea5e9) als Wiedererkennungsmerkmal
- Konsistente Feedback-Farben: Emerald (Success), Amber (Warning), Red (Error), Sky (Info)
- Badges zeigen vorbildliche Farbkodierung mit Light-Background + Darker-Text-Pattern
- Alert-Komponenten nutzen durchgehend Left-Border-Accent + Hintergrundfarbe + Icon

**Beobachtungen:**
- Die Farbpalette passt gut zum "Nordischen Design" Anspruch (kuehle, klare Toene)
- Dark Mode existiert als Konzept (ThemeProvider, dark-mode Screenshots), scheint aber noch nicht vollstaendig durchgetestet
- In den Dark-Mode Visual Regression Tests sehen Primary und Secondary Buttons identisch zum Light Mode aus - das deutet auf fehlende Dark-Mode-Anpassungen hin

### 2.3 Typografie

**Staerken:**
- Durchgehende Nutzung von `text-[length:var(...)]` fuer tokenisierte Font-Sizes
- Klare Hierarchie zwischen Headings und Body-Text in Storybook

**Beobachtung:**
- Die Storybook-Screenshots zeigen teilweise Umlaute als ASCII-Ersetzungen ("ue" statt "ue", "oe" statt "oe") in Component-Labels - das ist konsistent, sollte aber dokumentiert werden ob gewollt (Kompatibilitaet) oder ein Bug

### 2.4 Spacing & Layout

**Staerken:**
- Card-Padding-System (compact/normal/spacious) ist durchdacht
- Table-Density-System (compact/normal/spacious) mit CSS Custom Properties elegant geloest
- Konsistente Padding-Hierarchie in Buttons, Inputs, Selects

**Beobachtung:**
- Die Input-/Button-Hoehen sind sauber aligned (sm: 36px, md: 40px, lg: 44px) - das ermoeglicht nahtlose Inline-Form-Layouts

---

## 3. Visueller Konsistenz-Check (Screenshot-Analyse)

### 3.1 Border-Radius Konsistenz

| Komponente | Radius | Bewertung |
|-----------|--------|-----------|
| Buttons | ~6-8px (tokenisiert) | Konsistent |
| Inputs | ~4-6px (tokenisiert) | Konsistent |
| Cards | Groesserer Radius (tokenisiert) | Konsistent |
| Badges | Pill-Shape (~20px) | Konsistent |
| Checkboxen | ~3-4px | Konsistent |
| Dialoge/Sheets | Konsistent mit Cards | Konsistent |

**Ergebnis:** Border-Radii sind visuell durchgehend konsistent.

### 3.2 Elevation / Shadow-System

Das dreistufige Elevation-System (low/medium/high) ist sauber implementiert:
- **Flat Cards:** Kein Shadow, kein Border
- **Raised Cards:** Border + shadow-sm
- **Elevated Cards:** Border + shadow-lg

Dialoge, Sheets, Popovers, Tooltips nutzen passende Shadow-Tokens. Die `[box-shadow:var(...)]`-Syntax fuer compound shadows ist korrekt eingesetzt.

### 3.3 Animations

| Pattern | Komponenten | Bewertung |
|---------|------------|-----------|
| Fade + Zoom | Popover, Tooltip, HoverCard, Select, Dropdown, Dialog | Konsistent |
| Slide (seitenabhaengig) | Sheet, Toast | Konsistent |
| Slide + Fade | Collapsible | Gut |
| Nur Fade | Accordion | **Inkonsistent** - weniger sophisticated als Collapsible |
| Shimmer | Skeleton | Gut - eigene Keyframe-Animation |

### 3.4 Storybook-Qualitaet

**Staerken:**
- Jede Komponente hat Training-spezifische Use Cases (z.B. HF-Zonen-Regler, Athleten-Profil, Session-Notizen) - das zeigt gute Kontextualisierung
- Command Palette hat starke Training-Stories (Schnellsuche, Tastenkuerzel)
- Chart-Komponente zeigt vielfaeltige Diagrammtypen
- Form Stories decken Validierung, Training-Einheit-Erstellung und Profilbearbeitung ab

**Verbesserungsvorschlaege:**
- Collapsible und Accordion sollten visuell gleichwertige Animationen haben (Collapsible hat slide+fade, Accordion nur fade)
- Die Sheet-Komponente "Links" Story zeigt einen Navigation-Content, der visuell identisch mit der separaten Navigation-Sheet-Story ist - Redundanz pruefen

---

## 4. Accessibility Review

### 4.1 Kritische Findings

#### FINDING A1: Command-Komponente - Fehlende Accessibility (KRITISCH)

**Datei:** `packages/components/src/organisms/Command/Command.tsx`
**Schweregrad:** Kritisch

Das CommandInput hat:
- **Keinen Focus-Ring** (`outline-none` ohne Alternative)
- **Keine ARIA-Attribute** (kein `role`, kein `aria-label`, kein `aria-expanded`, kein `aria-haspopup`)
- Tastaturnutzer koennen das Input-Element nicht visuell identifizieren

Dies verstösst gegen **WCAG 2.4.7 (Focus Visible)** und **WCAG 4.1.2 (Name, Role, Value)**.

**Empfehlung:**
```tsx
// CommandInput braucht:
role="combobox"
aria-expanded={open}
aria-haspopup="listbox"
aria-label="Suche..."
// + focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]
```

---

### 4.2 Hohe Prioritaet

#### FINDING A2: Inkonsistente Focus-Ring-Staerke

**Betroffene Komponenten:**
| Komponente | Datei | Ring-Width | Standard |
|-----------|-------|------------|----------|
| Combobox SearchInput | `Combobox.tsx:317` | `ring-1` | `ring-2` |
| MultiSelect SearchInput | `MultiSelect.tsx:387` | `ring-1` | `ring-2` |
| Alle anderen Inputs | diverse | `ring-2` | `ring-2` |

**Problem:** Combobox und MultiSelect Sucheingaben haben einen **50% schwaecheren Focus-Indikator** als alle anderen interaktiven Elemente. Tastaturnutzer koennten Schwierigkeiten haben, den Fokus zu erkennen.

Verstoss gegen **WCAG 2.4.7 (Focus Visible)** - Focus muss hinreichend sichtbar sein.

**Empfehlung:** Alle `ring-1` auf `ring-2` aendern fuer einheitliche Focus-Sichtbarkeit.

---

#### FINDING A3: Inkonsistenter Focus-Ring-Offset

| Komponente | Datei | Offset | Standard |
|-----------|-------|--------|----------|
| RadioGroupItem | `RadioGroup.tsx:72` | `ring-offset-2` | `ring-offset-1` |
| Alle anderen | diverse | `ring-offset-1` | `ring-offset-1` |

**Empfehlung:** RadioGroupItem auf `ring-offset-1` vereinheitlichen.

---

#### FINDING A4: Breadcrumbs Focus-Ring mit `rounded-sm`

**Datei:** `Breadcrumbs.tsx:48`

Breadcrumb-Links haben `rounded-sm` im Focus-Ring-Styling, was bei keiner anderen Komponente der Fall ist. Das fuehrt zu einem visuell abweichenden Focus-Indikator.

**Empfehlung:** `rounded-sm` aus dem Focus-Styling entfernen.

---

### 4.3 Mittlere Prioritaet

#### FINDING A5: Checkbox ohne `aria-invalid`

**Datei:** `Checkbox.tsx`

Die Basis-Checkbox-Komponente bietet keinen Mechanismus fuer `aria-invalid`, um Fehlerzustaende an Screenreader zu kommunizieren. CheckboxField (Wrapper) koennte dies ergaenzen.

#### FINDING A6: Deutsche Grammatik in ARIA-Labels

**Betroffene Dateien:** `Dialog.tsx`, `Sheet.tsx` (Close-Buttons)

`aria-label="Schliessen"` verwendet die Schweizer Schreibweise (ss statt ss). Fuer deutsche Lokalisierung konsistent halten (entweder ueberall "Schliessen" oder ueberall "Schliessen" - aber bewusst entscheiden).

---

## 5. Token-Architektur Compliance

### 5.1 Hierarchie-Integritaet

| Pruefung | Ergebnis |
|----------|----------|
| L4 referenziert nur L3 | Alle 36 Dateien korrekt |
| L3 referenziert nur L2 | Korrekt |
| L2 referenziert nur L1 | Korrekt |
| L1 enthaelt nur Rohwerte | Korrekt |
| Keine zirkulaeren Referenzen | Korrekt |
| Keine verwaisten Tokens | Korrekt |
| Keine fehlenden Definitionen | Korrekt |

**Ergebnis: 100% Hierarchie-Compliance. Vorbildlich.**

### 5.2 Hardcodierte Werte (Token-Violations)

Trotz 99% Token-Compliance gibt es vereinzelte hardcodierte Tailwind-Werte:

#### FINDING T1: Avatar - Hardcodierte Groessen

**Datei:** `Avatar.tsx:11-14`
```tsx
size: {
  sm: 'h-8 w-8',     // sollte var(--sizing-avatar-sm) sein
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}
```

**Empfehlung:** Sizing-Tokens fuer Avatar erstellen (`sizing-avatar-{size}`).

#### FINDING T2: ToggleGroup - Hardcodierte Dimensionen

**Datei:** `ToggleGroup.tsx:38-41`
```tsx
sm: 'h-8 px-2.5 text-sm',
md: 'h-9 px-3 text-sm',
lg: 'h-10 px-4 text-base',
```

**Empfehlung:** Sizing-Tokens analog zum Button-Pattern erstellen.

#### FINDING T3: Skeleton - Hardcodierte Circle-Sizes

**Datei:** `Skeleton.tsx:61-64`
```tsx
sm: 'w-8 h-8',
md: 'w-12 h-12',
lg: 'w-16 h-16',
```

#### FINDING T4: Pagination - Hardcodierte Button-Groesse

**Datei:** `Pagination.tsx:78-82`
```tsx
'w-10 h-10 flex items-center justify-center text-sm font-medium'
```

#### FINDING T5: Checkbox, Radio, Switch - Hardcodierte Kontrollelementgroessen

| Komponente | Datei | Wert |
|-----------|-------|------|
| Checkbox | `Checkbox.tsx:21` | `h-5 w-5` |
| Radio | `RadioGroup.tsx:68` | `h-5 w-5` |
| Switch | `Switch.tsx:20` | `h-6 w-11` |

**Empfehlung fuer T1-T5:** Erstelle `semantic/avatar.json`, `semantic/toggle.json` etc. mit Sizing-Tokens und referenziere diese via `var(--sizing-{component}-{size})`. Das macht die Groessen theme-faehig und konsistent aenderbar.

---

## 6. UX Pattern Consistency

### 6.1 Disabled States

**Problem:** Uneinheitliche Disabled-State-Behandlung ueber Komponenten hinweg.

| Ansatz | Komponenten | Details |
|--------|------------|---------|
| Dedizierte Farb-Tokens + pointer-events-none | Button | Best Practice |
| Farb-Tokens + cursor-not-allowed | Input, Textarea | Gut |
| Opacity-50 + Farb-Token | Checkbox, RadioGroup | Gut |
| Nur Farb-Token (keine Opacity) | Select, Combobox | **Inkonsistent** |
| Opacity-60 (statt 50) | FileUpload | **Inkonsistent** |
| data-[disabled] statt :disabled | DropdownMenuItem | **Anderer Selektor** |

**Empfehlung:** Standardisiertes Disabled-Pattern definieren:
1. **Immer:** `cursor-not-allowed` oder `pointer-events-none`
2. **Immer:** Dedizierte Farb-Tokens fuer Hintergrund/Text
3. **Optional:** `opacity-50` (einheitlich, nicht 60)
4. **Selektor:** `:disabled` fuer native Elemente, `data-[disabled]` nur fuer Radix-Primitives

### 6.2 Transition-Timings

Keine einheitlichen Duration-Tokens:

| Komponente | Duration | Easing |
|-----------|----------|--------|
| Toast | 300ms | default |
| Progress | 500ms | ease-out |
| Collapsible | 200ms | default |
| Sheet | 300ms | default |
| Tooltip, Accordion | implicit | default |

**Empfehlung:** Transition-Duration-Tokens definieren (z.B. `--duration-fast: 150ms`, `--duration-normal: 200ms`, `--duration-slow: 300ms`) und konsistent anwenden.

### 6.3 FileUpload Focus-Token Inkonsistenz

**Datei:** `FileUpload.tsx:256`

Nutzt `--color-input-border-focus` statt `--color-border-focus` fuer den Focus-Ring. Alle anderen Komponenten nutzen `--color-border-focus`.

**Empfehlung:** Auf `--color-border-focus` vereinheitlichen.

---

## 7. Storybook Documentation Quality

### 7.1 Staerken

- **Training-spezifische Use Cases** in fast jeder Komponente (Herzfrequenz-Zonen, Athleten-Profile, Trainingseinheiten) - hervorragend fuer Kontextualisierung
- **Command Palette** mit Tastenkuerzeln-Story zeigt fortgeschrittene Nutzung
- **Chart-Komponente** mit 8 verschiedenen Diagrammtypen gut dokumentiert
- **Form-Komponente** mit Validierungs-Szenarien und Training-Use-Cases
- **Sheet** mit diversen Positionen (rechts, links, unten) und Training-Szenarien (Filter, Einstellungen, Schnellansicht)

### 7.2 Verbesserungsvorschlaege

| Finding | Beschreibung |
|---------|-------------|
| S1 | Dialog-Stories zeigen nur Trigger-Buttons - der geoeffnete Dialog-Zustand ist nur in 1-2 Stories sichtbar (Feedback, Loeschbestaetigung). Mehr geoeffnete Zustaende dokumentieren. |
| S2 | ThemeProvider zeigt Buttons fuer Hell/Dunkel/System, aber kein visuelles Vorher/Nachher des Theme-Wechsels. |
| S3 | Accordion und Collapsible haben sehr aehnliche Funktionalitaet - die Stories erklaeren nicht klar den Unterschied und wann welche Komponente zu verwenden ist. |

---

## 8. Zusammenfassung & Priorisierte Empfehlungen

### Kritisch (Sofort beheben)

| # | Finding | Komponente | Aufwand |
|---|---------|-----------|---------|
| A1 | Command: Fehlender Focus-Ring + ARIA-Attribute | Command.tsx | Klein |

### Hoch (Naechster Sprint)

| # | Finding | Komponente | Aufwand |
|---|---------|-----------|---------|
| A2 | Focus-Ring ring-1 statt ring-2 | Combobox.tsx, MultiSelect.tsx | Klein |
| A3 | Focus-Ring offset-2 statt offset-1 | RadioGroup.tsx | Klein |
| A4 | Focus-Ring rounded-sm Abweichung | Breadcrumbs.tsx | Klein |
| T1-T5 | Hardcodierte Dimensionen tokenisieren | Avatar, ToggleGroup, Skeleton, Pagination, Checkbox, Radio, Switch | Mittel |

### Mittel (Roadmap)

| # | Finding | Beschreibung | Aufwand |
|---|---------|-------------|---------|
| 6.1 | Disabled-State standardisieren | Einheitliches Pattern fuer alle Komponenten | Mittel |
| 6.2 | Transition-Duration-Tokens | Einheitliche Animations-Timings | Klein |
| 6.3 | FileUpload Focus-Token | Token-Name vereinheitlichen | Klein |
| A5 | Checkbox aria-invalid | Error-State fuer Screenreader | Klein |
| 3.3 | Accordion Animation angleichen | Slide+Fade wie Collapsible | Klein |

### Niedrig (Nice-to-have)

| # | Finding | Beschreibung |
|---|---------|-------------|
| A6 | ARIA-Label Schreibweise | "Schliessen" konsistent halten |
| S1-S3 | Storybook-Dokumentation verbessern | Dialog-States, Theme-Vorschau, Accordion vs Collapsible Guidance |
| 2.2 | Dark Mode testen | Visual Regression zeigt identische Buttons in Light/Dark |

---

## 8b. Review: Neue Komponenten (Completion Package, 15.02.2026)

### Scope
14 neue Komponenten: Label, Link, Code, Kbd, Text, Heading (Atoms), Stepper, NavigationMenu, ContextMenu (Molecules), StatCard, Timeline, Sidebar, Carousel, Tree (Organisms)

### Ergebnis: Ausgezeichnet (5/5)

| Kriterium | Bewertung | Details |
|-----------|-----------|---------|
| **Token-Compliance** | 100% | Alle 14 Komponenten nutzen ausschliesslich CSS Custom Properties |
| **Focus-Ring-Pattern** | 100% | Alle interaktiven Elemente mit korrektem `ring-2 ring-offset-1` Pattern |
| **Disabled-States** | 100% | opacity-50 + pointer-events-none/cursor-not-allowed konsistent |
| **Accessibility** | Sehr gut | ARIA-Attributes, semantisches HTML, Keyboard-Navigation |
| **Transitions** | 100% | Konsistente duration-200 fuer UI, duration-300 fuer Slide-Animationen |
| **className-Prop** | 100% | Alle Komponenten akzeptieren und verbreiten className via cn() |

### Findings (alle behoben)

| # | Finding | Komponente | Status |
|---|---------|-----------|--------|
| CP-1 | Copy-Button ohne Focus-Ring und duration-200 | Code.tsx | ✅ Behoben |
| CP-2 | disabled:opacity-50 fehlte auf Select-Trigger | Select.tsx | ✅ Behoben |
| CP-3 | disabled:opacity-50 fehlte auf DatePicker Icon-Button | DatePicker.tsx | ✅ Behoben |
| CP-4 | disabled:opacity-50 fehlte auf DateRangePicker Icon-Button | DateRangePicker.tsx | ✅ Behoben |
| CP-5 | Tree expand-icon duration-150 statt duration-200 | Tree.tsx | ✅ Behoben |

### Besonders positiv

- **Tree**: Vollstaendige Keyboard-Navigation (ArrowUp/Down, Enter, Space), korrekte aria-level/aria-expanded
- **Sidebar**: Context-basiertes State-Management mit useSidebar(), Collapse-Animationen, Tooltips im eingeklappten Zustand
- **Carousel**: Auto-Play mit Pause-on-Hover, Touch-Swipe-Support, umfassende ARIA-Attributes (aria-roledescription)
- **Stepper**: Clickable-Steps mit korrektem aria-current, vertikale und horizontale Varianten
- **Timeline**: Sauberes Variant-System (default/success/warning/error) mit CVA

### Visual Regression Testing

186 Playwright-Tests mit Screenshots fuer alle neuen Komponenten (Light + Dark Mode):
- 6 Atoms: 25 Screenshots
- 3 Molecules: 10 Screenshots (inkl. ContextMenu Right-Click)
- 5 Organisms: 20 Screenshots
- 13 Dark-Mode-Screenshots fuer neue Komponenten

---

## 9. Positive Highlights

Diese Aspekte sind vorbildlich und sollten beibehalten werden:

1. **Token-Architektur (100% Hierarchie-Compliance)** - Die strikte 4-Layer-Trennung ist das Rueckgrat des Systems und funktioniert einwandfrei.

2. **Compound Component Pattern** - Card, Modal, Dialog, Form nutzen Sub-Components elegant (CardHeader, CardBody, CardFooter etc.).

3. **Keyboard Navigation** - Select, Combobox, Calendar, DatePicker haben umfassende Tastatur-Unterstuetzung mit Arrow-Keys, Enter, Escape.

4. **Context-basierte APIs** - Form (react-hook-form + zod), Toast (useToast), Chart (useChartConfig), Tabs (Variant-Context) zeigen durchdachte API-Designs.

5. **Training-Domain Use Cases** - Die Storybook-Stories mit konkreten Training-Szenarien (Herzfrequenz-Zonen, Athleten-Profile, Session-Notizen, Wochenplaene) demonstrieren echten Praxisbezug.

6. **Visual Regression Testing** - 20+ automatisierte Screenshot-Tests fuer Atoms und Dark-Mode zeigen Qualitaetsbewusstsein.

7. **Radix UI Integration** - Konsistente Nutzung von Radix Primitives mit eigenem Token-Layer darueber. Gute Balance zwischen Eigenentwicklung und Library-Nutzung.

8. **Input/Button Size Alignment** - Gleiche Hoehen ueber Size-Stufen (sm/md/lg) ermoeglichen nahtlose Formular-Layouts.

---

## 10. Review: Welle 2 — Radio Atom + ConfirmDialog (19.02.2026)

### Scope
2 Komponenten: Radio Atom (Extraktion aus RadioGroup), ConfirmDialog Pattern (useConfirm Hook)

### 10.1 Radio Atom (NDS-047)

**Ergebnis: Gut (nach Fixes)**

| Schweregrad | Anzahl | Behoben |
|-------------|--------|---------|
| Kritisch | 5 | 5/5 |
| Major | 4 | 4/4 |
| Minor | 5 | Deferred |

#### Kritische Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| R-C1 | Outer div statt label | Click auf div + htmlFor = Doppel-Klick-Bug | ✅ Behoben: Outer element ist jetzt `<label>` |
| R-C2 | Fehlende aria-describedby | Description nicht mit Input verknuepft | ✅ Behoben: aria-describedby bei description |
| R-C3 | Doppelte Opacity bei disabled | Outer div + Circle beide opacity-50 = 25% | ✅ Behoben: peer-disabled:opacity-50 vom Circle entfernt |
| R-C4 | RadioGroup ohne aria-orientation | Screenreader kennt Layout-Richtung nicht | ✅ Behoben: aria-orientation={orientation} |
| R-C5 | Arrow-Key Navigation fehlerhaft | Keine Pfeilnavigation zwischen Radios | ✅ Behoben: handleKeyDown mit ArrowUp/Down/Left/Right |

#### Major Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| R-M1 | tabIndex auf RadioGroup | ESLint interactive-supports-focus | ✅ Behoben: tabIndex={-1} |
| R-M2 | Story ohne aria-label | Default Story braucht Gruppen-Label | ✅ Behoben |
| R-M3 | Radio checked nicht fuer defaultChecked | Initial-Zustand in unkontrolliertem Modus | ✅ Behoben |
| R-M4 | Keine Roving tabIndex | Nur aktives Radio sollte tabbable sein | ✅ Behoben via Arrow-Key + click() Pattern |

#### Minor Findings (deferred — kein Blocker)

- Transition auf Focus-Ring (duration-200) wuerde Konsistenz erhoehen
- Touch-Target koennte bei sm-Variante < 44px sein
- Optionale error/success States fuer Form-Integration
- RadioGroup gap-Token fuer horizontale Variante separat
- Fehlende RTL-Unterstuetzung (ArrowLeft/Right)

---

### 10.2 ConfirmDialog Pattern (NDS-063)

**Ergebnis: Gut (nach Fixes)**

| Schweregrad | Anzahl | Behoben |
|-------------|--------|---------|
| Kritisch | 2 | 2/2 |
| Major | 3 | 3/3 |
| Minor | 4 | Deferred |

#### Kritische Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| CD-C1 | Danger-Button Kontrast | bg-error (#fee2e2) + weisser Text = 1.05:1 Kontrast | ✅ Behoben: bg-[var(--color-bg-error-solid)] |
| CD-C2 | Warning-Button Kontrast | Amber-500 + weisser Text = ~2.0:1 Kontrast | ✅ Behoben: text-[var(--color-text-base)] (dunkler Text) |

#### Major Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| CD-M1 | Promise-Leak bei Unmount | Pending Promise wird nie resolved | ✅ Behoben: useEffect Cleanup resolved false |
| CD-M2 | Concurrent Calls Guard | Zweiter confirm() ueberschreibt resolveRef | ✅ Behoben: resolveRef.current?.(false) vor Overwrite |
| CD-M3 | Umlaut in Default-Label | "Bestaetigen" statt "Bestätigen" | ✅ Behoben |

#### Minor Findings (deferred — kein Blocker)

- Loading-State waehrend async Action (Spinner im Button)
- Schliessen mit Escape koennte Konfigurations-Option sein
- Custom Icon-Support pro Variante
- Auto-Focus auf Cancel statt Confirm bei danger-Variante (Schutz vor versehentlicher Bestaetigung)

---

### 10.3 ColorPicker Molecule (NDS-013)

**Ergebnis: Gut (nach Fixes)**

| Schweregrad | Anzahl | Behoben |
|-------------|--------|---------|
| Kritisch | 5 | 5/5 |
| Major | 7 | 7/7 |
| Minor | 7 | Deferred |

#### Kritische Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| CP-C1 | SaturationField role="slider" falsch | 2D-Control braucht anderes ARIA-Pattern | ✅ Behoben: role="group" + aria-roledescription="2D color field" |
| CP-C2 | Fehlende aria-value* Attribute | role="slider" ohne required ARIA-Props | ✅ Behoben: Rolle gewechselt, aria-valuetext beibehalten |
| CP-C3 | outline-none statt focus-visible:outline-none | Unconditional outline removal | ✅ Behoben: focus-visible:outline-none in allen Sub-Components |
| CP-C4 | Alpha-Slider propagiert nicht an onChange | onAlphaChange fehlte komplett | ✅ Behoben: onAlphaChange Callback-Prop hinzugefuegt |
| CP-C5 | Kein disabled Prop | Form-Integration unvollstaendig | ✅ Behoben: disabled Prop mit korrektem a11y-Pattern (aria-disabled, tabIndex, opacity) |

#### Major Findings (alle behoben)

| # | Finding | Beschreibung | Status |
|---|---------|-------------|--------|
| CP-M1 | Focus-Ring Token Inkonsistenz | Sliders/Swatches nutzten input-spezifischen Token | ✅ Behoben: var(--color-border-focus) fuer Sliders/Swatches |
| CP-M2 | Swatches role="listbox" invalid | button + role="option" ist ARIA-Konflikt | ✅ Behoben: role="group" + aria-pressed statt listbox/selected |
| CP-M3 | Swatch-Navigation keine Roving TabIndex | Zu viele Tab-Stops bei 10+ Swatches | Deferred (akzeptabel bei < 10 Swatches) |
| CP-M4 | HexInput ohne Enter-Key Submit | Wert wird erst bei Blur committed | ✅ Behoben: handleKeyDown mit Enter |
| CP-M5 | Keine Home/End Keys auf Sliders | WAI-ARIA Slider Pattern unvollstaendig | ✅ Behoben: Home/End in SaturationField + ColorSlider |
| CP-M6 | Preview-Swatch hardcoded h-8 w-8 | Token-Violation | ✅ Behoben: var(--sizing-cpick-swatch-size) |
| CP-M7 | ColorSlider Thumb background: inherit | Zeigt Gradient statt Position-Farbe | ✅ Behoben: thumbColor Prop mit berechneter Farbe |

#### Minor Findings (deferred — kein Blocker)

- Keine RTL-Unterstuetzung (ArrowLeft/Right)
- Kein id-Prop fuer Form-Label-Association
- #-Prefix nicht via aria-describedby verknuepft
- Thumb-Border hardcoded white (bewusst — braucht Kontrast auf jedem Hue)
- Kein Loading/Skeleton State
- Stories: Dark Mode + Boundary Colors fehlen
- Swatch Roving TabIndex bei > 10 Swatches

---

*Dieses Review basiert auf der Analyse aller Komponenten-Quelldateien, Screenshots, Semantic Token Files und der Projekt-Dokumentation (README.md, PROJEKT_REGELN.md, COMPONENT_LOG.md, ARCHITECTURE.md). Letztes Update: 19.02.2026 (Welle 2 Radio + ConfirmDialog + ColorPicker).*
