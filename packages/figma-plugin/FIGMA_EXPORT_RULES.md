# Figma Export Regelwerk

Verbindliches Regelwerk für die Erzeugung neuer Komponenten-Exports im Figma Plugin.
Jede Regel existiert, weil ein konkreter Fehler in der Praxis aufgetreten ist.

---

## 1. Token-Hierarchie: NUR L4

**Regel:** Jede Property einer Figma-Komponente MUSS an einen L4 (Semantic/Component) Token gebunden sein. L3-Role-Tokens oder niedrigere dürfen NIEMALS direkt referenziert werden.

**Warum:** Figma-Komponenten sollen über L4-Tokens steuerbar sein. Direkte L3-Referenzen brechen die Token-Architektur und machen Overrides unmöglich.

### Checkliste vor Export-Start

- [ ] **L4-Token-Datei existiert**: `packages/tokens/src/semantic/{component}.json`
- [ ] **Alle verwendeten Properties haben L4-Tokens**: Color, Spacing, Sizing, Radius, Typography
- [ ] **L4-Tokens referenzieren L3**: z.B. `"$value": "{color.text.base}"`, nicht `"$value": "#0f172a"`
- [ ] **Tokens gebaut**: `pnpm --filter @nordlig/tokens build` erfolgreich
- [ ] **Tokens in CSS vorhanden**: Prüfen in `packages/styles/dist/tokens.css`

### Token-Kategorien pro Komponente

| Kategorie | Token-Muster | Beispiel |
|-----------|-------------|---------|
| **Color** | `--color-{component}-{role}` | `--color-alert-info-bg`, `--color-btn-primary-text` |
| **Color (State)** | `--color-{component}-{role}-{state}` | `--color-btn-primary-bg-hover` |
| **Spacing** | `--spacing-{component}-{role}` | `--spacing-alert-padding`, `--spacing-alert-gap` |
| **Sizing** | `--sizing-{component}-{role}` | `--sizing-alert-border-width`, `--sizing-btn-sm-height` |
| **Sizing (Size-Variante)** | `--sizing-{component}-{size}-{role}` | `--sizing-btn-sm-padding-x` |
| **Radius** | `--radius-{component}` | `--radius-alert`, `--radius-btn-sm` |
| **Typography** | `--sizing-{component}-font-size` | `--sizing-alert-font-size` |
| **Typography** | `--sizing-{component}-line-height` | `--sizing-alert-line-height` |
| **Typography (Rolle)** | `--sizing-{component}-{role}-weight` | `--sizing-alert-title-weight`, `--sizing-alert-desc-weight` |

---

## 2. Vollständige Variable-Bindings

**Regel:** JEDE numerische und farbliche Property MUSS ein Variable-Binding in Figma erhalten. Es darf KEINE ungebundenen Hardcoded-Werte geben.

### Container-Level Bindings (tokenBindings im Root)

| Property | Figma-Binding | Pflicht |
|----------|--------------|---------|
| `paddingLeft/Right/Top/Bottom` | `setBoundVariable('paddingLeft', var)` | Ja, wenn Padding > 0 |
| `itemSpacing` | `setBoundVariable('itemSpacing', var)` | Ja, wenn Gap > 0 |
| `cornerRadius` | Alle 4 Ecken einzeln binden* | Ja, wenn Radius > 0 |
| `strokeWeight` | Einzel oder Per-Side** | Ja, wenn Stroke > 0 |
| `minHeight` / `width` / `height` | `setBoundVariable(...)` | Ja, wenn vorhanden |
| Fill-Color | `setBoundVariableForPaint('fills', ...)` | Ja, wenn nicht transparent |
| Stroke-Color | `setBoundVariableForPaint('strokes', ...)` | Ja, wenn Stroke vorhanden |

*`cornerRadius` Binding:
```typescript
// IMMER alle 4 Ecken binden, nicht nur cornerRadius!
component.setBoundVariable('topLeftRadius', var);
component.setBoundVariable('topRightRadius', var);
component.setBoundVariable('bottomLeftRadius', var);
component.setBoundVariable('bottomRightRadius', var);
```

**`strokeWeight` Per-Side Binding (z.B. `border-l-4`):
```typescript
// setBoundVariable('strokeWeight', var) überschreibt per-side Werte!
if (strokeSides) {
  if (strokeSides.left > 0) component.setBoundVariable('strokeLeftWeight', var);
  if (strokeSides.right > 0) component.setBoundVariable('strokeRightWeight', var);
  // usw. für top/bottom
} else {
  component.setBoundVariable('strokeWeight', var);
}
```

### Child-Node Bindings (tokenBindings im ChildNode)

| Child-Typ | Bindbare Properties |
|-----------|-------------------|
| **frame** | paddingLeft/Right/Top/Bottom, itemSpacing |
| **text** | fontSize, lineHeight, fontWeight (via TextStyle), fill-Color |
| **icon / iconRef** | fill-Color (nur auf VectorNode-Kinder!) |
| **close-button** | fill-Color |

### Text-Style Variable-Bindings

**Regel:** Text-Styles (Figma TextStyle Objekte) MÜSSEN Variable-Bindings für fontSize, lineHeight und fontWeight erhalten.

```typescript
// IMMER prüfen und binden:
if (tokenBindings.fontSize) textStyle.setBoundVariable('fontSize', var);
if (tokenBindings.lineHeight) textStyle.setBoundVariable('lineHeight', var);
if (tokenBindings.fontWeight) textStyle.setBoundVariable('fontWeight', var);
```

**Zwei Modi:**
- **Size-based** (Button): Ein TextStyle pro Size (`Button/SM`, `Button/MD`, `Button/LG`)
- **Role-based** (Alert): Ein TextStyle pro Text-Rolle (`Alert/Title`, `Alert/Description`)

---

## 3. SVG / Icon-Handling

**Regel:** SVG-Frames erzeugt mit `figma.createNodeFromSvg()` haben einen Wrapper-FrameNode. Dieser MUSS bereinigt werden.

### SVG Frame Cleanup
```typescript
const svgNode = figma.createNodeFromSvg(svgData);
// PFLICHT: Wrapper-Frame bereinigen
svgNode.strokes = [];
svgNode.fills = [];
```

### Stroke-Override nur auf VectorNodes

**Regel:** Stroke-Farben dürfen NUR auf VectorNode-Kinder gesetzt werden, NIEMALS auf FRAME, INSTANCE oder COMPONENT Nodes.

```typescript
function applyStrokeOverride(node, paint) {
  // SKIP: Frame/Instance/Component — sonst sichtbarer Rahmen!
  if (node.type !== 'FRAME' && node.type !== 'INSTANCE' && node.type !== 'COMPONENT') {
    if ('strokes' in node) node.strokes = [paint];
  }
  // Rekursiv in Kinder
  if ('children' in node) {
    for (const child of node.children) applyStrokeOverride(child, paint);
  }
}
```

**Gilt für alle drei Stroke-Funktionen:** `applyStrokeOverride`, `applyCloseStroke`, `applyDefaultStroke`

### Icon als ComponentSet-Referenz (iconRef)

Wenn eine Komponente Icons verwendet, nutze `iconRef` statt direktem SVG:
```json
{
  "type": "icon",
  "iconRef": { "component": "Icon", "variant": { "icon": "Info", "size": "md" } }
}
```
→ Das Plugin erzeugt eine Instance des Icon-ComponentSets statt eines Inline-SVG.

---

## 4. Komponententypen und ihre Extraction-Strategie

### Simple Component (Button-Typ)
- **Struktur:** Container → einzelner Text-Node
- **Text-Daten:** `combo.text` (Root-Level)
- **Children:** nicht vorhanden
- **Text-Styles:** Size-basiert (`Button/SM`, `Button/MD`, `Button/LG`)
- **State-Derivation:** Hover/Active/Disabled werden von Default abgeleitet (nur Farben ändern sich)
- **Story-Navigation:** Eine Story pro Variante, Args für Size/State

### Multi-Node Component (Alert-Typ)
- **Struktur:** Container → Icon + Frame(Title + Description) + optional CloseButton
- **Text-Daten:** `combo.text` ist leer, Texte leben in `combo.children[].text`
- **Children:** Array von `ChildNode`-Objekten
- **Text-Styles:** Role-basiert (`Alert/Title`, `Alert/Description`)
- **Extraction:** AllVariants-Story mit Index-basierter Selektion
- **hasTextContent-Guard:** Bei `text.fontSize === 0` keine Text-Styles erzeugen

### Icon Component (SVG-Typ)
- **Struktur:** Container enthält nur SVG-Daten
- **Text-Daten:** Alles 0/leer
- **Children:** nicht vorhanden
- **SVG-Daten:** `combo.svgData` enthält bereinigtes SVG-Markup
- **Besonderheiten:**
  - `primaryAxisSizingMode = FIXED` + `counterAxisSizingMode = FIXED`
  - `resize(width, height)` für exakte Dimensionen
  - Kein Text-Style, kein Text-Node

---

## 5. Extractor: Token-Matching Regeln

### Color-Tokens (findToken)

Prioritätsreihenfolge:
1. **Disabled-State:** `--color-{component}-disabled-{property}`
2. **Hover/Active-State:** `--color-{component}-{property}-{state}`
3. **Exakter Component-Match:** `--color-{component}-{property}`
4. **Component-Level Match:** Enthält `-{component}-`
5. **L3-Role Fallback:** `^--color-(bg|text|border|interactive)-`
6. **Letzter Fallback:** Erster Token mit passendem Hex-Wert

### Numerische Tokens (findNumericToken)

1. Alle Tokens der Kategorie parsen (spacing, sizing, radius)
2. Nach Abstand sortieren (nächster Match zuerst)
3. Component-spezifische Tokens bevorzugen (enthält `-{component}-`)
4. Nur innerhalb Toleranz (±0.5px default)

### L4-Token Lookup (findL4Token)

Konstruiert erwartete Token-Namen direkt:
- `--sizing-{component}-{size}-{property}` (mit Size-Variante)
- `--sizing-{component}-{property}` (ohne Size)
- `--spacing-{component}-{property}`

Gibt `null` zurück wenn Token nicht existiert (strikt).

### Typography-Token Matching für Child-Nodes

**Regel:** Jeder Text-ChildNode MUSS `tokenBindings` für fontSize, lineHeight und fontWeight haben.

```typescript
// Für JEDEN text-type ChildNode:
const fsToken = tokenList.find(t => t.name === `--sizing-${component}-font-size`);
const lhToken = tokenList.find(t => t.name === `--sizing-${component}-line-height`);
const fwToken = tokenList.find(t => t.name === `--sizing-${component}-{role}-weight`);

child.tokenBindings = {};
if (fsToken) child.tokenBindings.fontSize = fsToken.name;
if (lhToken) child.tokenBindings.lineHeight = lhToken.name;
if (fwToken) child.tokenBindings.fontWeight = fwToken.name;
```

---

## 6. Plugin: Import-Regeln

### Grid-Layout

Varianten werden in einem 2D-Grid angeordnet:
- **Letzte Varianten-Achse** = Spalten (z.B. `state` beim Button, `closeable` bei Alert)
- **Alle anderen Achsen** = Zeilen (Kartesisches Produkt)
- **Gap:** 40px
- **Single-Axis:** Zeilenumbruch nach 8 Spalten

### Auto-Layout Konfiguration

| Komponenten-Typ | primaryAxisSizing | counterAxisSizing | Spezial |
|-----------------|-------------------|-------------------|---------|
| **Icon** | FIXED | FIXED | `resize(w, h)` |
| **Button/Alert** | AUTO | AUTO | `minHeight` setzen |

### Child-Node Erzeugung (createChildNodes)

Reihenfolge für jeden Child-Typ:

**icon (mit iconRef):**
1. `findAndCreateInstance()` — Icon-ComponentSet Instance erzeugen
2. Stroke-Override auf VectorNode-Kinder (NICHT Frame/Instance!)
3. Color Variable binden
4. An Parent appenden

**icon (mit svgData):**
1. `figma.createNodeFromSvg(svgData)`
2. Resize auf iconSize × iconSize
3. `svgNode.strokes = []; svgNode.fills = [];` ← PFLICHT!
4. Stroke-Override auf VectorNode-Kinder
5. Color Variable binden
6. An Parent appenden

**text:**
1. Font laden mit `fontWeightToStyle()`
2. `characters` setzen
3. TextStyle anwenden via `setTextStyleIdAsync()` (wenn vorhanden)
4. ODER: fontSize, lineHeight, letterSpacing direkt setzen (Fallback)
5. Fill-Color mit Variable binden
6. `textAutoResize = 'WIDTH_AND_HEIGHT'`
7. An Parent appenden → `layoutSizingHorizontal = 'FILL'`

**frame (verschachtelt):**
1. Auto-Layout konfigurieren (direction, padding, gap, alignment)
2. Numerische Properties an Variablen binden (padding, itemSpacing)
3. `createChildNodes()` rekursiv aufrufen
4. An Parent appenden → `layoutSizingHorizontal = 'FILL'`

**close-button:**
1. Äußeren Frame erzeugen: (iconSize + 8) × (iconSize + 8), cornerRadius=4
2. Icon-Instance oder SVG einfügen
3. Stroke-Override (nur VectorNodes!)
4. opacity = 0.5

---

## 7. Checkliste: Neue Komponente exportieren

### Phase 1: Token-Vorbereitung

- [ ] Alle visuellen Properties der Komponente identifizieren
- [ ] L4-Token-Datei erstellen/erweitern: `packages/tokens/src/semantic/{component}.json`
- [ ] Für JEDE Property einen L4-Token anlegen (Color, Spacing, Sizing, Radius, Typography)
- [ ] L4-Tokens referenzieren NUR L3-Role-Tokens
- [ ] Fehlende L3-Tokens bei Bedarf ergänzen (z.B. `gap.xs` fehlte)
- [ ] `pnpm --filter @nordlig/tokens build` ausführen
- [ ] Token-Existenz in `packages/styles/dist/tokens.css` verifizieren

### Phase 2: ComponentConfig erstellen

- [ ] `name`, `category`, `selector` definieren
- [ ] Alle Varianten-Achsen mit allen Werten auflisten
- [ ] `defaultVariant` festlegen
- [ ] Alle Kombinationen generieren
- [ ] Extraction-Strategie bestimmen:
  - Single-Story pro Variante → Button-Muster
  - AllVariants auf einer Page → Alert-Muster (Index-basiert)
  - Gallery/Grid → Icon-Muster

### Phase 3: Extraction implementieren

- [ ] Extraction-Funktion schreiben (oder generische nutzen)
- [ ] Container-Properties extrahieren: Layout, Fills, Strokes, Radius
- [ ] Per-Side Strokes erkennen (border-l, border-t, etc.)
- [ ] **Wenn Multi-Node:** Kinder rekursiv extrahieren
  - [ ] Icon-Kinder: SVG-Daten ODER iconRef
  - [ ] Text-Kinder: Alle Font-Properties + Color
  - [ ] Frame-Kinder: Layout + rekursive Kinder
- [ ] **Token-Matching für ALLE Properties:**
  - [ ] Container: Fills, Strokes, Padding, Gap, Radius, StrokeWeight, MinHeight
  - [ ] Text: fontSize, lineHeight, fontWeight
  - [ ] Child-Frames: Padding, Gap
  - [ ] Icons: Color

### Phase 4: Plugin-Import prüfen

- [ ] `hasTextContent`-Guard: Keine Text-Styles wenn `fontSize === 0`
- [ ] Text-Style Modus korrekt: Size-based vs Role-based
- [ ] Text-Style Variable-Bindings: fontSize, lineHeight, fontWeight
- [ ] SVG-Frame Cleanup: `strokes = [], fills = []`
- [ ] Stroke-Override nur auf VectorNodes
- [ ] Per-Side Stroke Binding korrekt (kein uniformes strokeWeight)
- [ ] CornerRadius auf alle 4 Ecken gebunden
- [ ] Grid-Layout für N Achsen

### Phase 5: Verifikation

- [ ] Storybook läuft: `curl -s http://localhost:6006`
- [ ] Extraction ausführen: `pnpm extract:component {name}`
- [ ] Output prüfen: `output/components/{name}.json`
  - [ ] Alle Kombinationen vorhanden
  - [ ] Alle tokenBindings gesetzt (Container + Children)
  - [ ] Keine `null`-Token-Bindings bei Properties die einen Token haben sollten
- [ ] Plugin bauen: `pnpm build:plugin`
- [ ] In Figma importieren und prüfen:
  - [ ] Variables Panel: Alle L4-Tokens sichtbar
  - [ ] Component Set: Korrekte Anzahl Varianten
  - [ ] Grid-Layout: Varianten sind angeordnet (nicht gestapelt)
  - [ ] Variable-Bindings: JEDE Property mit Variable verknüpft
  - [ ] Text-Styles: Erstellt UND angewendet UND mit Variablen verknüpft
  - [ ] SVG/Icons: Keine sichtbaren Rahmen um Vector-Frames
  - [ ] Per-Side Strokes: Nur sichtbar wo erwartet
  - [ ] Light/Dark Mode: Farben ändern sich korrekt

---

## 8. SVG-Farben und Dimensionen

### 8a. SVG-Farben MÜSSEN hex sein

**Regel:** Alle `stroke` und `fill` Attribute in SVG-Daten MÜSSEN hex-Farben verwenden. `rgb()` oder `rgba()` Formate sind VERBOTEN.

**Warum:** Figma's `createNodeFromSvg()` kann `rgb()` Format nicht parsen. Das SVG wird ohne sichtbares Icon importiert.

**Fix:** rgb→hex Konvertierung VOR `setAttribute`:
```typescript
// INNERHALB page.evaluate() — kein function keyword (esbuild __name Bug)!
let strokeHex = iconColor;
const rgbMatch = iconColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
if (rgbMatch) {
  const rr = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
  const gg = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
  const bb = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
  strokeHex = '#' + rr + gg + bb;
}
clone.setAttribute('stroke', strokeHex);
```

### 8b. SVG width/height IMMER entfernen

**Regel:** SVG-Elemente dürfen NUR `viewBox` haben. `width` und `height` Attribute MÜSSEN entfernt werden.

**Warum:** `width="14" height="14"` + `viewBox="0 0 24 24"` erzeugt eine Dimensionsmismatch. Figma skaliert das Icon falsch.

```typescript
clone.removeAttribute('width');
clone.removeAttribute('height');
```

### 8c. page.evaluate() — Keine Funktions-Deklarationen

**Regel:** Innerhalb von `page.evaluate()` NIEMALS `function name(...)` oder Arrow-Funktionen mit `.map()` verwenden. Stattdessen inline Logik nutzen.

**Warum:** `tsx` (esbuild) fügt `__name`-Decorator ein, der im Browser-Kontext nicht existiert → `ReferenceError: __name is not defined`.

---

## 9. Pflicht-Token-Checkliste pro Komponente

Jede Komponente MUSS folgende Token-Kategorien abdecken (wenn die Property existiert):

| Property | Token-Name Muster | Pflicht wenn... |
|----------|------------------|-----------------|
| **border-width** | `--sizing-{comp}-border-width` | Border sichtbar |
| **line-height** | `--sizing-{comp}-{size}-line-height` | Text vorhanden |
| **letter-spacing** | `--font-base-letter-spacing-*` | Immer (0 → `normal`) |
| **padding-y** | `--sizing-{comp}-{size}-padding-y` | Padding > 0 |
| **font-weight** | `--font-{comp}-weight` | Text vorhanden |
| **font-size** | `--sizing-{comp}-{size}-font-size` | Text vorhanden |

### Button als Gold-Standard (12 Bindings)
```
paddingLeft, paddingRight, paddingTop, paddingBottom, itemSpacing,
cornerRadius, minHeight, strokeWeight,
fontSize, lineHeight, letterSpacing, fontWeight
```

Jede neue Komponente MUSS gegen diese Referenz geprüft werden.

---

## 10. Disabled-State Styling

**Regel:** Disabled-States werden über `opacity` gesteuert, NIEMALS über `_disabled` tokenBindings oder andere Hacks.

**Container-Level:**
```typescript
if (isDisabled) {
  combo.styles.opacity = 0.5;
}
```

**Child-Level (z.B. Content-Frame bei CheckboxField):**
```typescript
if (disabled && combo.children) {
  const contentFrame = combo.children.find(c => c.type === 'frame');
  if (contentFrame) {
    if (!contentFrame.styles) contentFrame.styles = {};
    contentFrame.styles.opacity = 0.5;
  }
}
```

**Anti-Pattern:**
```typescript
// VERBOTEN — hat keinen Effekt in Figma!
textChild.tokenBindings._disabled = 'true';
```

---

## 11. TextStyle-Erstellung: Condition-Reihenfolge

**Regel:** Bei der TextStyle-Erstellung MUSS `hasChildren` VOR `hasTextContent` geprüft werden.

**Warum:** Komponenten wie CheckboxField haben leeren Root-Text (`fontSize: 0, content: ""`), aber Text in Children (Label, Description). Wenn `!hasTextContent` zuerst geprüft wird, werden TextStyles für solche Komponenten übersprungen.

**Korrekte Reihenfolge:**
```typescript
if (hasChildren) {
  // Role-based TextStyles (CheckboxField, Alert — Text in Children)
} else if (hasTextContent) {
  // Size-based TextStyles (Button, Badge, Input — Root-Text)
} else {
  // Keine TextStyles (Icon — nur SVG)
}
```

---

## 12. SVG + Corner Radius: `clipsContent`

**Regel:** Wenn eine Komponente SVG-Children hat UND `cornerRadius > 0`, MUSS `component.clipsContent = true` gesetzt werden.

**Warum:** Das SVG-Frame füllt das gesamte Component-Frame (FILL/FILL). Ohne Clipping überdeckt das SVG-Frame visuell die abgerundeten Ecken des Parents. Betrifft Checkbox checked/indeterminate Varianten.

---

## 13. Variable-Hierarchie in Figma (L1/L2/L3/L4)

**Regel:** Jede Figma-Variable MUSS mit einem Level-Prefix benannt werden: `L1 Base/`, `L2 Global/`, `L3 Role/`, `L4 Component/`.

**Warum:** Die Figma-Variable-Organisation muss 1:1 die Token-Hierarchie abbilden, damit Designer die Schichtenarchitektur verstehen.

**Klassifikation:**
| Pattern | Level | Beispiel |
|---------|-------|---------|
| `-base-` im Namen, oder `--font-(size\|weight\|line-height\|family)-` | L1 Base | `--color-base-slate-500`, `--font-size-sm` |
| `-component-` im Namen | L3 Role | `--sizing-component-height-md` |
| Bekannter Komponenten-Name nach Kategorie-Prefix | L4 Component | `--color-btn-primary-bg` |
| Alles andere | L2 Global | `--color-bg-paper`, `--radius-md` |

**Reverse-Lookup:** Beim Component-Import wird der Level-Prefix gestripped: `L4 Component/color/btn/primary/bg` → `--color-btn-primary-bg`

---

## 14. Hover-Varianten für interaktive Komponenten

**Regel:** Interaktive Komponenten (Checkbox, Radio, Switch, etc.) MÜSSEN Hover-Varianten als eigene Figma-Varianten exportieren, wenn Hover-Tokens existieren.

**Pattern:** Analog zu Button `deriveStateVariant()` — default-Kombination klonen, Hover-Token für Stroke/Fill einsetzen, `interaction: 'hover'` Prop hinzufügen.

**Achtung:** Disabled-Varianten haben KEINE Hover-Varianten (disabled + hover entfällt).

---

## 15. Bekannte Fehlerquellen (Anti-Patterns)

(Umbenannt von ## 11)

| Fehler | Symptom | Lösung |
|--------|---------|--------|
| L3-Token direkt in Komponente | Variable zeigt L3-Name in Figma | L4-Token erstellen, L3 nur als Referenz |
| `setBoundVariable('strokeWeight')` bei Per-Side | Alle 4 Seiten bekommen gleiche Breite | Per-Side Properties einzeln binden |
| Stroke auf SVG-Wrapper-Frame | Rechteckiger Rahmen um Icon | `svgNode.strokes = []; svgNode.fills = []` |
| Stroke-Override auf Instance/Frame | Rahmen um Icon-Instance | Type-Check: skip FRAME/INSTANCE/COMPONENT |
| Text-Style erstellt aber nicht angewendet | Font-Properties in Figma leer | `textNode.setTextStyleIdAsync(style.id)` aufrufen |
| Text-Style ohne Variable-Bindings | Properties als Hardcoded-Werte | `textStyle.setBoundVariable(...)` für fontSize/lineHeight/fontWeight |
| `fontSize === 0` → Text-Style Error | "Number must be >= 1" Validation | `hasTextContent`-Guard vor Text-Style-Erstellung UND vor Text-Node-Erstellung |
| Missing L3-Token (gap.xs) | Token-Build schlägt fehl | L3-Role-Token ergänzen bevor L4 darauf referenziert |
| `cornerRadius` nur einmal gebunden | Nur eine Ecke reagiert auf Variable | Alle 4 Corner-Properties einzeln binden |
| Grid nur für 2 Achsen | 3-Achsen-Komponente gestapelt | Letzte Achse = Spalten, Rest = Kartesisches Produkt Zeilen |
| SVG stroke als `rgb()` | Icon fehlt in Figma (unsichtbar) | `rgb()` → hex konvertieren vor `setAttribute('stroke', ...)` |
| SVG `width`/`height` + `viewBox` | Icon verzerrt/falsch skaliert | `removeAttribute('width'); removeAttribute('height')` |
| `lineHeight` Token fehlt | Text-Style ohne line-height Variable | L4 `--sizing-{comp}-{size}-line-height` Token erstellen |
| `border-width` Token fehlt | Border nicht an Variable gebunden | L4 `--sizing-{comp}-border-width` Token erstellen |
| `_disabled` als tokenBinding | Kein sichtbarer Effekt in Figma | `combo.styles.opacity = 0.5` stattdessen |
| `function` in `page.evaluate()` | `__name is not defined` Error | Inline Logik statt Funktions-Deklaration |
| `letterSpacing` Binding fehlt | Spacing in Figma nicht steuerbar | `--font-base-letter-spacing-normal` (0) binden |
| Checkbox unchecked → Text-Node | `fontSize` must be >= 1 Error | Guard: `combo.text.fontSize > 0 && combo.text.content` vor Text-Node-Erstellung |
| `hasTextContent` vor `hasChildren` | TextStyles fehlen bei Composite-Komponenten | `hasChildren` ZUERST prüfen (Regel 11) |
| SVG ohne `clipsContent` | Ecken nicht gerundet bei Checked-Varianten | `component.clipsContent = true` wenn `cornerRadius > 0` (Regel 12) |
| Variablen ohne Level-Prefix | Flache, unsortierte Variablen in Figma | `classifyTokenLevel()` + Prefix `L1 Base/` etc. (Regel 13) |
| Hover-Varianten fehlen | Interaktive Komponenten ohne Hover-State | Hover ableiten analog `deriveStateVariant()` (Regel 14) |
