# 🎨 Token Guidelines - Nordlig Design System

**Wann welche Tokens? Naming? Best Practices?**

---

## 🤔 "Brauche ich einen neuen Token?"

### Workflow-Diagramm

```
NEUER TOKEN BENÖTIGT?
│
├─ 1. EXISTIERT ER SCHON?
│  │
│  ├─ Prüfe Level 1 Base
│  │  └─ Palette vorhanden? → Nutze existierende!
│  │
│  ├─ Prüfe Level 2 Global
│  │  └─ Semantische Zuordnung OK? → Nutze existierende!
│  │
│  ├─ Prüfe Level 3 Roles
│  │  └─ Funktionale Rolle passt? → Nutze existierende!
│  │
│  └─ Prüfe Level 4 Semantic
│     └─ Component hat Token? → Nutze existierende!
│
└─ 2. WIRKLICH NEU?
   │
   ├─ Komplett neue Farbe/Font/Size?
   │  └─ YES → Level 1 erweitern
   │
   ├─ Neue Brand-Kategorie?
   │  └─ YES → Level 2 erweitern
   │
   ├─ Neue funktionale Rolle?
   │  └─ YES → Level 3 erweitern
   │
   └─ Component-spezifisch?
      └─ YES → Level 4 erstellen
```

---

## 📏 Level 1: BASE - Wann erweitern?

### ✅ ERWEITERN wenn:

1. **Komplett neue Farbpalette** benötigt
   - Beispiel: Brand bekommt "Purple" als neue Akzentfarbe
   - Aktion: `color-base-purple` mit 50-950 Shades hinzufügen

2. **Neue Spacing-Stufe** fehlt
   - Beispiel: Zwischen 6 (24px) und 8 (32px) fehlt 7 (28px)
   - Aktion: `spacing-base-7: 28px` hinzufügen

3. **Neue Font-Family** 
   - Beispiel: Monospace-Code-Font hinzufügen
   - Aktion: `font-base-family-code` hinzufügen

### ❌ NICHT erweitern wenn:

1. **Existierende Palette ausreicht**
   - Falsch: "Ich brauche #0ea5e9" → Neu anlegen
   - Richtig: `sky-500` ist genau #0ea5e9 → Nutzen!

2. **Es geht um Semantik**
   - Falsch: `color-base-error-red` anlegen
   - Richtig: Level 2 `accent-3` → `red` zuweisen

3. **Component-spezifisch**
   - Falsch: `spacing-base-button-padding` anlegen
   - Richtig: Level 4 nutzen!

### Naming-Regeln Level 1

```
Farben:     color-base-{palette}-{shade}
            color-base-sky-500
            color-base-slate-100

Spacing:    spacing-base-{number}
            spacing-base-4
            spacing-base-12

Typography: font-base-{category}-{variant}
            font-base-family-sans
            font-base-size-lg
            font-base-weight-semibold

Schatten:   shadow-base-{size}
            shadow-base-sm
            shadow-base-lg

Radii:      radius-base-{size}
            radius-base-md
            radius-base-full
```

**Prinzip:** Neutral, beschreibend, KEINE Semantik!

---

## 🌍 Level 2: GLOBAL - Wann erweitern?

### ✅ ERWEITERN wenn:

1. **Neue Primary/Secondary Palette**
   - Beispiel: 3. Primary-Farbe für Submarke
   - Aktion: `color-primary-3` hinzufügen

2. **Neuer Accent**
   - Beispiel: Custom Feedback-Farbe (neben success/warning/error/info)
   - Aktion: `color-accent-5` erweitern

3. **Dark Theme / Alternative Themes**
   - Aktion: Neue Theme-Datei mit Level 2 Overrides

### ❌ NICHT erweitern wenn:

1. **Component-spezifische Anpassung**
   - Falsch: `color-cta-button` anlegen
   - Richtig: Level 4 nutzen!

2. **Funktionale Kategorien**
   - Falsch: `color-overlay` in Level 2
   - Richtig: Level 3 Roles!

### Naming-Regeln Level 2

```
Farben:     color-{type}-{index}-{shade}
            color-primary-1-500
            color-accent-2-700
            color-neutral-1-100

Spacing:    spacing-{size}
            spacing-xs
            spacing-md
            spacing-2xl

Typography: font-{style}-{property}
            font-heading-family
            font-body-size
```

**Prinzip:** Semantisch aber erweiterbar (Nummern!), KEIN Use-Case!

### Warum Nummern statt Namen?

```
❌ SCHLECHT:
color-primary-sky
color-primary-indigo
→ Was wenn 3. Primary kommt? "primary-teal"?

✅ GUT:
color-primary-1  (→ sky)
color-primary-2  (→ indigo)
color-primary-3  (→ teal) ← Einfach hinzufügen!
```

---

## 🎯 Level 3: ROLES - Wann erweitern?

### ✅ ERWEITERN wenn:

1. **Neue funktionale Kategorie**
   - Beispiel: Overlay-Backgrounds für Modals
   - Aktion: `color-overlay-{variant}` hinzufügen

2. **Neue UI-Pattern**
   - Beispiel: Skeleton Loading States
   - Aktion: `color-skeleton-{variant}` hinzufügen

3. **Neue Spacing-Kontext**
   - Beispiel: Safe Areas für Mobile
   - Aktion: `spacing-safe-area-{side}` hinzufügen

### ❌ NICHT erweitern wenn:

1. **Nur eine Component nutzt es**
   - Falsch: `color-dropdown-divider` in Level 3
   - Richtig: Level 4 Semantic!

2. **Existierende Role passt**
   - Falsch: Neues `border-subtle` wenn `border-muted` existiert
   - Richtig: Nutze `border-muted`!

### Naming-Regeln Level 3

```
Farben:     color-{function}-{variant}
            color-bg-primary
            color-text-muted
            color-border-focus
            color-interactive-disabled

Spacing:    spacing-{context}-{property}-{size}
            spacing-component-padding-md
            spacing-layout-gutter
            spacing-safe-area-top

Typography: font-{function}-{property}
            font-label-size
            font-caption-weight
```

**Prinzip:** Funktion + Variant, wiederverwendbar!

### Kategorien in Level 3

**Farben:**
- `bg-*` - Hintergründe (base, surface, elevated, primary, ...)
- `text-*` - Texte (base, muted, disabled, inverse, ...)
- `border-*` - Ränder (default, muted, strong, focus, ...)
- `interactive-*` - Interaktive States (primary-hover, disabled, ...)
- Feedback: `success-*`, `warning-*`, `error-*`, `info-*`

**Spacing:**
- `component-*` - Component-interne Abstände
- `layout-*` - Layout-Strukturen (Gutter, Margins)
- `safe-area-*` - Mobile Safe Areas

---

## 🧩 Level 4: SEMANTIC - Wann erstellen?

### ✅ ERSTELLEN wenn:

1. **Neue Component**
   - IMMER! Jede Component = Eigene Token-Datei
   - Datei: `packages/tokens/src/semantic/{component}.json`

2. **Component-spezifische Anpassung**
   - Beispiel: Button soll andere Border-Color als default
   - Aktion: `color-btn-border` überschreibt `color-border-default`

### Naming-Regeln Level 4

```
Farben:     color-{component}-{property}-{variant}
            color-btn-primary-bg
            color-input-border-focus
            color-card-shadow
            color-badge-success-text

Spacing:    spacing-{component}-{property}
            spacing-btn-padding-x
            spacing-card-gap
            spacing-modal-margin
```

**Prinzip:** Component + Property + Variant!

### Template für neue Component

```json
{
  "color": {
    "{component}": {
      "{variant}": {
        "bg":        { "$type": "color", "$value": "{color.bg.primary}" },
        "bg-hover":  { "$type": "color", "$value": "{color.bg.primary-hover}" },
        "text":      { "$type": "color", "$value": "{color.text.inverse}" },
        "border":    { "$type": "color", "$value": "{color.border.default}" }
      }
    }
  },
  "spacing": {
    "{component}": {
      "padding-x": { "$type": "dimension", "$value": "{spacing.component.padding.md}" },
      "padding-y": { "$type": "dimension", "$value": "{spacing.component.padding.sm}" },
      "gap":       { "$type": "dimension", "$value": "{spacing.component.gap.sm}" }
    }
  }
}
```

---

## 🎨 Color Token Guidelines

### Vollständige Paletten (Level 1)

**IMMER alle Shades anlegen:**

```json
{
  "palette": {
    "50":  "#...",  // Sehr hell
    "100": "#...",
    "200": "#...",
    "300": "#...",
    "400": "#...",
    "500": "#...",  // Base (Middle)
    "600": "#...",
    "700": "#...",
    "800": "#...",
    "900": "#...",
    "950": "#..."   // Sehr dunkel
  }
}
```

**Warum?**
- Konsistenz über alle Paletten
- Light/Dark Theme braucht volle Range
- Hover States (-100 oder +100 Shades)

### Semantische Zuordnung (Level 2)

```json
{
  "color": {
    "primary": {
      "1": {
        "50":  { "$value": "{color.base.sky.50}" },
        // ... alle Shades durchreichen
        "500": { "$value": "{color.base.sky.500}" },
        "950": { "$value": "{color.base.sky.950}" }
      }
    }
  }
}
```

**NICHT nur 500 zuweisen!** Hover-States brauchen 400/600!

### Funktionale Rollen (Level 3)

```json
{
  "color": {
    "bg": {
      "primary":        { "$value": "{color.primary.1.500}" },
      "primary-hover":  { "$value": "{color.primary.1.600}" },  // +100
      "primary-active": { "$value": "{color.primary.1.700}" }   // +200
    }
  }
}
```

**Pattern:** Base → Hover (+100) → Active (+200)

---

## 📏 Spacing Token Guidelines

### 4px Grid System

```
0   = 0px
1   = 4px   (0.25rem)
2   = 8px   (0.5rem)
3   = 12px  (0.75rem)
4   = 16px  (1rem)
6   = 24px  (1.5rem)
8   = 32px  (2rem)
12  = 48px  (3rem)
16  = 64px  (4rem)
```

**Warum 4px?** 
- Divisible by 2 (responsive scaling)
- Visually harmonisch
- Industry standard (Tailwind, Material, etc.)

### Semantic Sizes (Level 2)

```json
{
  "spacing": {
    "xs":  { "$value": "{spacing.base.2}" },   // 8px
    "sm":  { "$value": "{spacing.base.3}" },   // 12px
    "md":  { "$value": "{spacing.base.4}" },   // 16px
    "lg":  { "$value": "{spacing.base.6}" },   // 24px
    "xl":  { "$value": "{spacing.base.8}" },   // 32px
    "2xl": { "$value": "{spacing.base.12}" },  // 48px
    "3xl": { "$value": "{spacing.base.16}" }   // 64px
  }
}
```

### Component Spacing (Level 4)

```json
{
  "spacing": {
    "btn": {
      "padding-x": {
        "sm": { "$value": "{spacing.sm}" },
        "md": { "$value": "{spacing.md}" },
        "lg": { "$value": "{spacing.lg}" }
      },
      "padding-y": {
        "sm": { "$value": "{spacing.xs}" },
        "md": { "$value": "{spacing.sm}" },
        "lg": { "$value": "{spacing.md}" }
      }
    }
  }
}
```

---

## 🔤 Typography Token Guidelines

### Font Families (Level 1)

```json
{
  "font": {
    "base": {
      "family": {
        "sans":  { "$value": "'Inter', system-ui, sans-serif" },
        "serif": { "$value": "'Merriweather', Georgia, serif" },
        "mono":  { "$value": "'JetBrains Mono', 'Courier New', monospace" }
      }
    }
  }
}
```

**Immer mit Fallbacks!**

### Type Scale (Level 1)

```json
{
  "font": {
    "base": {
      "size": {
        "xs":   { "$value": "0.75rem" },   // 12px
        "sm":   { "$value": "0.875rem" },  // 14px
        "base": { "$value": "1rem" },      // 16px
        "lg":   { "$value": "1.125rem" },  // 18px
        "xl":   { "$value": "1.25rem" },   // 20px
        "2xl":  { "$value": "1.5rem" },    // 24px
        "3xl":  { "$value": "1.875rem" },  // 30px
        "4xl":  { "$value": "2.25rem" },   // 36px
        "5xl":  { "$value": "3rem" }       // 48px
      }
    }
  }
}
```

### Text Styles (Level 2)

```json
{
  "font": {
    "heading": {
      "family": { "$value": "{font.base.family.sans}" },
      "weight": { "$value": "{font.base.weight.bold}" }
    },
    "body": {
      "family": { "$value": "{font.base.family.sans}" },
      "size":   { "$value": "{font.base.size.base}" },
      "weight": { "$value": "{font.base.weight.normal}" }
    }
  }
}
```

---

## 🎭 Theming Best Practices

### Light Theme (Default)

```json
// global/colors.json
{
  "color": {
    "neutral": {
      "1": {
        "50":  { "$value": "{color.base.slate.50}" },   // Hell
        "900": { "$value": "{color.base.slate.900}" }   // Dunkel
      }
    }
  }
}
```

### Dark Theme (Override)

```json
// themes/dark.json
{
  "color": {
    "neutral": {
      "1": {
        "50":  { "$value": "{color.base.slate.900}" },  // Dunkel!
        "900": { "$value": "{color.base.slate.50}" }    // Hell!
      }
    },
    "primary": {
      "1": {
        "500": { "$value": "{color.base.sky.400}" }  // Heller für Kontrast
      }
    }
  }
}
```

**Generierte CSS:**
```css
:root {
  --color-neutral-1-50: #f8fafc;
  --color-neutral-1-900: #0f172a;
}

[data-theme="dark"] {
  --color-neutral-1-50: #0f172a;  /* Invertiert! */
  --color-neutral-1-900: #f8fafc;
}
```

---

## ⚠️ Häufige Fehler

### ❌ Falsch: Ebenen überspringen

```json
{
  "color": {
    "btn": {
      "primary": {
        "bg": { "$value": "{color.base.sky.500}" }  // Level 4 → Level 1!
      }
    }
  }
}
```

✅ **Richtig:**
```json
{
  "color": {
    "btn": {
      "primary": {
        "bg": { "$value": "{color.bg.primary}" }  // Level 4 → Level 3 ✓
      }
    }
  }
}
```

### ❌ Falsch: Hardcoded Values in Components

```tsx
// Button.tsx
<button className="bg-[#0ea5e9]">  // Hardcoded Hex!
```

✅ **Richtig:**
```tsx
<button className="bg-[var(--color-btn-primary-bg)]">  // Token!
```

### ❌ Falsch: Semantik in Level 1

```json
{
  "color": {
    "base": {
      "error-red": { ... }  // Semantik gehört NICHT in Level 1!
    }
  }
}
```

✅ **Richtig:**
```json
{
  "color": {
    "base": {
      "red": { ... }  // Neutral!
    }
  }
}
```

---

## 📋 Checkliste: Neuer Token

- [ ] Existiert bereits? (Alle 4 Level geprüft)
- [ ] Richtiges Level gewählt? (Decision Tree)
- [ ] Naming Convention befolgt?
- [ ] Nur richtiges Level referenziert? (Keine Ebenensprünge)
- [ ] Vollständig? (Alle Shades/Variants)
- [ ] `pnpm build:tokens` läuft fehlerfrei?
- [ ] Storybook Story aktualisiert/erstellt?
- [ ] Dokumentation ergänzt?

---

## 🗂️ Token-Inventar (Stand: v1.0.0)

### Uebersicht

| Layer | Dateien | Tokens | Beschreibung |
|-------|---------|--------|--------------|
| L1 Base | 5 | ~150 | Rohe Hex/px-Werte |
| L2 Global | 5 | ~200 | Theme-Zuordnung |
| L3 Roles | 5 | ~120 | Funktionale Rollen |
| L4 Semantic | 89 | ~775 | Component-spezifisch |
| **Gesamt** | **104** | **~1245** | |

### L3 Role-Token Kategorien

| Kategorie | Prefix | Beispiele |
|-----------|--------|-----------|
| Hintergrund | `color.bg.*` | `paper`, `base`, `surface`, `primary`, `primary-hover`, `success-subtle`, `overlay`, `inverse` |
| Text | `color.text.*` | `base`, `heading`, `muted`, `disabled`, `inverse`, `primary`, `success`, `error` |
| Rand | `color.border.*` | `default`, `muted`, `strong`, `focus`, `success`, `error` |
| Interaktiv | `color.interactive.*` | `primary`, `primary-hover`, `primary-active`, `primary-disabled`, `hover-overlay` |
| Spacing | `spacing.component.*` | `padding.{xs-xl}`, `gap.{xs-xl}` |
| Sizing | `sizing.component.*` | `height.{sm-lg}`, `padding-x.{sm-lg}`, `border-width.*` |
| Layout | `sizing.layout.*` | `header-height`, `gutter`, `section` |
| Schatten | `shadow.elevation.*` | `raised`, `floating`, `overlay` |
| Radius | `radius.component.*` | `sm`, `md`, `lg`, `xl`, `full` |
| Typografie | `font.component.*` | `size.{xs-lg}`, `weight.{normal-semibold}` |

### L4 Semantic-Token Dateien (89 Stueck)

Jede Component hat eine eigene JSON-Datei in `packages/tokens/src/semantic/`:

**Atoms:** alert, avatar, badge, banner, blockquote, button, card, checkbox, code, copybutton, heading, highlight, icon, image, input, inputotp, kbd, label, link, numberinput, popover, progress, radio, rating, scrollarea, segmentedcontrol, separator, skeleton, slider, spinner, spoiler, switch, tag, text, themetoggle, toggle, togglegroup, tooltip, visuallyhidden

**Molecules:** accordion, alertdialog, breadcrumbs, calendar, checkboxfield, collapsible, colorpicker, combobox, contextmenu, datepicker, dialog, drawer, dropdownmenu, emptystate, fileupload, form, inputfield, loadingoverlay, menubar, multiselect, navigationmenu, pagination, passwordinput, progressfield, radiogroup, resizable, searchfilter, searchinput, select, sheet, stepper, switchfield, tabs, textarea, timepicker, toast, toolbar

**Organisms:** appfooter, appheader, carousel, chart, command, datatable, modal, sessioncard, sidebar, statcard, table, timeline, tree

**Templates:** authlayout, dashboardlayout, detailpage, emptystatepage, errorpage, formpage, listpage, pageshell

**Patterns:** datatablepattern, formwizard

---

## 🌙 Dark-Mode-Strategie (Detail)

### Prinzip: L2-Override, L3+L4 folgen automatisch

```
Light Mode:    L1(hex) → L2(theme) → L3(role) → L4(component) → CSS var
Dark Mode:     L1(hex) → L2(DARK)  → L3(role) → L4(component) → CSS var
                              ↑
                         Nur hier aendern!
```

### Technische Umsetzung

1. **Light Mode** (Standard): `:root { ... }` in `tokens.css`
2. **Dark Mode**: `.dark { ... }` Override in derselben CSS-Datei
3. **Aktivierung**: `<html class="dark">` oder `prefers-color-scheme: dark`

### Dark-Mode-Regeln

| Light (L2) | Dark (L2) | Effekt |
|------------|-----------|--------|
| `neutral.1.50` (slate-50) | slate-800 | Helle Flaechen werden dunkel |
| `neutral.1.900` (slate-900) | slate-50 | Dunkler Text wird hell |
| `primary.1.500` (sky-500) | sky-400 | Primary wird heller fuer Kontrast |
| `neutral.1.400` (Midpoint) | Unveraendert | Bleibt Uebergangspunkt |

### Was NICHT im Dark-Mode aendern

- L4-Tokens (Component-spezifisch) — folgen automatisch
- L3-Tokens (Rollen) — folgen automatisch
- Spacing, Sizing, Radius, Typography — themeunabhaengig

---

## 🎭 Role Completeness Rule

### Prinzip

**Eine L3-Rolle ist vollständig, wenn sie alle relevanten Properties ihrer Domäne besitzt — nicht nur eine einzelne.**

### Beispiel Typography

Eine Typography-Rolle wie `display/lg` braucht:
- `family` (z.B. Fraunces)
- `weight` (z.B. SemiBold)
- `size` (z.B. 34)
- `line-height` (z.B. 42)
- `letter-spacing` (z.B. -0.5)

❌ **Falsch:** Nur `display/lg/size = 34` anlegen → Konsumenten müssen Line-Height, Family etc. anderswo her picken → Inkonsistenz.

✅ **Richtig:** Alle 5 Properties pro Rolle anlegen → Konsumenten binden 5 Variables gegen dieselbe Rolle → automatisch konsistent.

### Welche Properties pro Domäne

| Domäne | Pflicht-Properties pro Rolle |
|---|---|
| **Color** | (eine Farbe) |
| **Typography** | family, weight, size, line-height, letter-spacing |
| **Spacing** | (ein Wert) |
| **Sizing** | (ein Wert) |
| **Radius** | (ein Wert) |
| **Shadow** | (ein Shadow-Objekt oder Shadow-Farbe + Offsets) |

### Konsequenz

Wenn du eine neue Rolle anlegst (z.B. `overline`), musst du **gleich das volle Property-Set** anlegen, auch wenn du anfangs nur `size` brauchst. Sonst häuft sich Debt und spätere Komponenten picken sich Properties aus unterschiedlichen Rollen zusammen.

### Ausnahme

Wenn eine Rolle definitionsgemäß eine Property nicht benötigt (z.B. `overline` hat immer uppercase → `letter-spacing` ist Teil der Rolle, aber `weight` könnte in jedem Produkt identisch sein), kann diese Property auf L4-Ebene fallback-gelöst werden. Aber: dokumentiere die Entscheidung explizit.

---

## 🌙 Dark-Mode-Best-Practice

### Prinzip: Mode-Switching auf L2-Ebene

Mode-spezifische Werte gehören **an L2-Ebene**, nicht an L3 oder L4. Die höheren Layer (L3, L4) sollen **denselben L2-Alias in beiden Modi** verwenden — die L2-Variable löst sich je nach Mode zu unterschiedlichen L1-Primitives auf.

### Beispiel

```
✅ RICHTIG:
L3 · text/base
  Light-Mode:  → L2 · neutral-1/900
  Dark-Mode:   → L2 · neutral-1/900   (SAME ALIAS!)

L2 · neutral-1/900
  Light-Mode:  → L1 · slate/900
  Dark-Mode:   → L1 · slate/50       (INVERSION HIER)

❌ FALSCH:
L3 · text/base
  Light-Mode:  → L2 · neutral-1/900
  Dark-Mode:   → #ffffff              (RAW!)
  OR
  Dark-Mode:   → L2 · neutral-1/100  (alias zur anderen Skala-Position)
```

### Warum?

- **Single source of truth:** Mode-Logik existiert nur einmal (in L2), nicht verteilt über L3+L4
- **Konsistenz:** Zwei L3-Rollen, die denselben L2 nutzen, wechseln gemeinsam im Dark-Mode
- **Wartbarkeit:** Änderung der Mode-Inversion erfordert nur L2-Update

### Ausnahme

Falls eine L3-Rolle im Dark-Mode einen **anderen L2-Alias** braucht (z.B. `interactive/primary/hover` im Light brand-1/800 aber im Dark brand-1/300, weil Hover-Semantik sich umkehrt), ist das OK — aber **immer Alias, nie Raw**.

### Dark-Mode-Audit

Alle L3-Color-Tokens sollten im Dark-Mode entweder:
- Denselben L2-Alias haben wie Light (Standard-Fall), ODER
- Einen anderen, aber gültigen L2-Alias haben (Ausnahmefall).

**Niemals Raw-Werte in Dark-Mode.**

---

## 🌍 Multi-Product-Strategie

### Prinzip: Eine Collection pro Domäne

Seit 2026-04-22 gilt: **5 Collections** in Figma, eine pro Domäne:

```
Color
Typography
Spacing
Sizing
Radius
```

**Keine Core/Product-Trennung auf Collection-Ebene** — die Unterscheidung passiert durch die **Schichten (L1/L2/L3/L4)** innerhalb einer Collection.

### Warum nicht Core/Product-Suffixe?

Die frühere Trennung (`Color · Core` + `Color · Minsaga`) war konzeptionell unklar:
- Welche Farbe ist "generisch"? Alle Farb-Auswahlen sind schon Identität.
- Es gab keinen echten "product-agnostischen" Core — die L1-Palette in Core war faktisch Minsaga's Palette.
- Cross-Collection-Aliases wurden zur Regel statt Ausnahme.

Die Layer selbst tragen die Semantik:
- **L1** = Primitives (Rohwerte: `#0ea5e9`, `16px`, `600`)
- **L2** = Global Scale (Abstraktionen: `brand-1/500`, `space/md`)
- **L3** = Semantic Role (Zweck: `bg/primary`, `body/size`)
- **L4** = Component (Ort: `button/primary/bg`)

### Wenn ein zweites Produkt hinzukommt

Zwei Wege:

1. **Sehr ähnlich** (gleiche Design-DNA, andere Farben) → **Modes** in bestehenden Collections erweitern. Die `Color`-Collection bekommt zusätzliche Modes (`ProductX-Light`, `ProductX-Dark`). Skaliert bis ~3-5 Produkte.

2. **Signifikant anders** (andere Fonts, andere Look-and-Feel-Philosophie) → Figma-File **forken**. Eigenes Produkt-DS mit eigenen Collection-Sets, ohne Kopplung.

### Komponenten-Propagation

Bei Änderungen an Komponenten:
- **Code:** NPM-Package `@nordlig/components` propagiert automatisch (Source of Truth)
- **Figma:** Änderungen im DS-File müssen ggf. manuell ins Produkt-File portiert werden, wenn Produkt-File eigenständig gepflegt wird (Fork-Modell)

---

**Naechste Schritte:**
- [ARCHITECTURE.md](ARCHITECTURE.md) - 4-Layer System verstehen
- [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md) - Tokens in Components nutzen
