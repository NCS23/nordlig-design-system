# Nordlig Design System — Migration Guide (v0 → v1)

> Dieses Dokument beschreibt alle Breaking Changes und den Migrationspfad von der Entwicklungsphase (v0) zur ersten stabilen Version (v1.0.0).

---

## 1. Import-Pfad-Aenderungen (Atomaritaets-Fixes)

Die folgenden Komponenten wurden in die architektonisch korrekte Ebene verschoben.

**Hinweis:** Alle Komponenten werden weiterhin ueber den Root-Export `@nordlig/components` re-exportiert. Nur direkte Pfad-Imports (z.B. `from '../atoms/Card'`) muessen aktualisiert werden.

### Card: atoms → molecules

**Grund:** Kompositions-Container mit 4 Sub-Parts (Header/Body/Footer/Root)

```diff
- import { Card } from '@nordlig/components/atoms/Card';
+ import { Card } from '@nordlig/components/molecules/Card';
```

### SearchFilter: molecules → patterns

**Grund:** Kombiniert SearchInput + Filter-Layout — ist ein Pattern, kein Molecule

```diff
- import { SearchFilter } from '@nordlig/components/molecules/SearchFilter';
+ import { SearchFilter } from '@nordlig/components/patterns/SearchFilter';
```

### SessionCard: organisms → examples

**Grund:** Domain-spezifische Fitness-Komponente, kein generischer DS-Baustein

```diff
- import { SessionCard } from '@nordlig/components/organisms/SessionCard';
+ import { SessionCard } from '@nordlig/components/examples/SessionCard';
```

### Weitere Verschiebungen (atoms → molecules)

| Komponente | Grund |
|------------|-------|
| LoadingOverlay | Importiert Spinner (Atom) |
| SearchInput | Importiert Input + Icon (Atoms) |
| PasswordInput | Importiert Input + Button (Atoms) |
| CheckboxField | Importiert Checkbox + Label (Atoms) |
| SwitchField | Importiert Switch + Label (Atoms) |
| ProgressField | Importiert Progress + Label (Atoms) |

```diff
- import { SearchInput } from '../atoms/SearchInput';
+ import { SearchInput } from '../molecules/SearchInput';
```

---

## 2. API-Aenderungen

### Icon: `name` String → `icon` LucideIcon

Die Icon-Komponente akzeptiert keine String-Namen mehr. Stattdessen wird ein Lucide-Icon-Component uebergeben.

```diff
- import { Icon } from '@nordlig/components';
+ import { Icon } from '@nordlig/components';
+ import { Check, AlertCircle } from 'lucide-react';

- <Icon name="Check" size="sm" />
+ <Icon icon={Check} size="sm" />

- <Icon name="AlertCircle" />
+ <Icon icon={AlertCircle} />
```

**Automatische Migration:**

```bash
# 1. Alle name= Verwendungen finden
grep -rn 'name="' --include="*.tsx" | grep '<Icon'

# 2. Fehlende lucide-react Imports hinzufuegen
# 3. name="X" durch icon={X} ersetzen
```

### Separator: Neue optionale Props (abwaertskompatibel)

Die Separator-Komponente wurde um `label`, `icon` und `labelPosition` erweitert. Bestehende Verwendungen ohne diese Props funktionieren unveraendert.

```tsx
// Neu verfuegbar:
<Separator label="ODER" />
<Separator label="Erweitert" labelPosition="left" />
<Separator icon={<Icon icon={Settings} size="sm" />} label="Einstellungen" />
```

---

## 3. Token-Umbenennungen

### Table-Spacing-Tokens

Aufgrund eines Tailwind v3 Bugs (Unterstriche werden zu Leerzeichen konvertiert) wurden interne Table-Tokens umbenannt:

| Alt | Neu |
|-----|-----|
| `--_table-px` | `--tbl-px` |
| `--_table-py` | `--tbl-py` |
| `--_table-head-py` | `--tbl-head-py` |

**Betroffen:** Nur bei direkter Referenzierung dieser CSS Custom Properties in eigenem CSS.

---

## 4. Neue Ebenen

### Templates (8 Komponenten)

Neue Seitenvorlagen fuer gaengige Layouts:

| Komponente | Zweck |
|------------|-------|
| PageShell | App-Shell mit Header, Sidebar, Content, Footer |
| DashboardLayout | Dashboard mit ein-/ausklappbarer Sidebar |
| AuthLayout | Login/Register mit zentrierter Card |
| FormPage | Formular-Seiten mit Header, Body, Actions |
| ListPage | Datenlisten mit Toolbar und Pagination |
| DetailPage | Detail-Ansichten mit optionaler Sidebar |
| ErrorPage | 404/500/Maintenance Fehlerseiten |
| EmptyStatePage | Leerzustand-Seiten |

### Patterns (5 Komponenten)

Wiederverwendbare Interaktionsmuster:

| Komponente | Zweck |
|------------|-------|
| SearchFilter | Such- und Filter-Toolbar (verschoben aus molecules) |
| DataTablePattern | DataTable + SearchFilter + BulkActions + Pagination |
| FormWizard | Mehrstufiges Formular mit Stepper + Validierung |
| FileUploadZone | Drag-and-Drop Upload mit Fortschrittsanzeige |
| NotificationCenter | Benachrichtigungspanel mit Ungelesen-Zaehler |

### Layout-Primitives (Neue Atoms)

| Komponente | Zweck |
|------------|-------|
| Stack / VStack / HStack | Flex-Container mit token-basiertem Gap |
| Container | Max-Width Container mit Zentrierung |
| Grid / GridItem | CSS-Grid Wrapper mit 1-12 Spalten |
| Spacer | Flexibles Leerraum-Element |
| List / ListItem | Semantische Listen mit Icon/Action Slots |

---

## 5. Migrations-Checkliste

- [ ] Card-Imports von `atoms/` nach `molecules/` aktualisieren
- [ ] SearchFilter-Imports von `molecules/` nach `patterns/` aktualisieren
- [ ] SessionCard-Imports nach `examples/` aktualisieren (oder entfernen)
- [ ] LoadingOverlay/SearchInput/PasswordInput-Imports nach `molecules/` aktualisieren
- [ ] Alle `<Icon name="X" />` durch `<Icon icon={X} />` ersetzen
- [ ] Lucide-Icons direkt aus `lucide-react` importieren
- [ ] Falls verwendet: Table-Token-Referenzen `--_table-*` → `--tbl-*` aendern
- [ ] TypeScript/ESLint-Fehler pruefen und beheben
- [ ] Build verifizieren: `pnpm build`

---

## 6. Abwaertskompatible Verbesserungen

Die folgenden Aenderungen erfordern **keine** Migration:

- Neue Layout-Primitives (Stack, Container, Grid, Spacer, List) koennen schrittweise uebernommen werden
- Neue Templates und Patterns sind opt-in
- Separator `label`/`icon` Props sind optional
- Internes Token-Refactoring (hardcodierte Werte → CSS-Tokens) betrifft keine oeffentliche API
- Token-Audit (verwaiste Tokens entfernt) betrifft keine Komponenten-APIs
