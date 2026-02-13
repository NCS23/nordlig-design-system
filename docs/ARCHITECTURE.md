# 🏗️ Architecture Deep Dive - Nordlig Design System

**4-Layer Token System Explained**

---

## 🎯 Warum 4 Layer?

### Problem ohne Hierarchie:

```css
/* ❌ CHAOS - Keine Struktur */
.button {
  background: #0ea5e9; /* Was ist das? Warum dieser Wert? */
  padding: 16px;       /* Hardcoded - nicht wiederverwendbar */
}

.card {
  background: #0ea5e9; /* Dopplung! Wenn Primary sich ändert? */
}
```

### Lösung mit 4-Layer System:

```css
/* ✅ STRUKTUR - Klare Hierarchie */
:root {
  /* Level 1: Rohe Werte */
  --color-base-sky-500: #0ea5e9;
  
  /* Level 2: Semantische Zuordnung */
  --color-primary-1-500: var(--color-base-sky-500);
  
  /* Level 3: Funktionale Rolle */
  --color-bg-primary: var(--color-primary-1-500);
  
  /* Level 4: Component-spezifisch */
  --color-btn-primary-bg: var(--color-bg-primary);
}

.button {
  background: var(--color-btn-primary-bg);
}
```

**Vorteile:**
- **Änderung auf Level 1** → Propagiert durch alle Layer
- **Theming auf Level 2** → Andere Palette zuweisen
- **Komponente austauschen** → Nur Level 4 ändern
- **Refactoring** → Jeder Layer isoliert änderbar

---

## 📐 Layer-by-Layer Explained

### Level 1: BASE (Die Wahrheit)

**Zweck:** Rohe Design-Werte, Palette, Primitives

**Regeln:**
- EINZIGER Layer mit konkreten Werten (Hex, px, rem)
- Naming: Neutral, beschreibend (`sky`, `slate`, nicht `primary`, `error`)
- Vollständig: Komplette Paletten (50-950 Shades)
- Unveränderlich: Änderungen selten, gut überlegt

**Beispiel Colors:**
```json
{
  "color": {
    "base": {
      "sky": {
        "50":  { "$type": "color", "$value": "#f0f9ff" },
        "100": { "$type": "color", "$value": "#e0f2fe" },
        "200": { "$type": "color", "$value": "#bae6fd" },
        "500": { "$type": "color", "$value": "#0ea5e9" },
        "900": { "$type": "color", "$value": "#0c4a6e" }
      }
    }
  }
}
```

**Beispiel Spacing:**
```json
{
  "spacing": {
    "base": {
      "0":   { "$type": "dimension", "$value": "0px" },
      "1":   { "$type": "dimension", "$value": "4px" },
      "2":   { "$type": "dimension", "$value": "8px" },
      "4":   { "$type": "dimension", "$value": "16px" },
      "8":   { "$type": "dimension", "$value": "32px" }
    }
  }
}
```

---

### Level 2: GLOBAL (Themes & Branding)

**Zweck:** Semantische Zuweisung, Theming-Layer

**Regeln:**
- Referenziert NUR Level 1
- Naming: Semantisch aber neutral (`primary-1`, `accent-2`, nicht `cta-button`)
- Nummern statt Namen: `primary-1`, `primary-2` (erweiterbar)
- Hier passiert Theming: Light/Dark/Custom

**Beispiel:**
```json
{
  "color": {
    "primary": {
      "1": {
        "500": { "$type": "color", "$value": "{color.base.sky.500}" }
      },
      "2": {
        "500": { "$type": "color", "$value": "{color.base.indigo.500}" }
      }
    },
    "accent": {
      "1": {
        "$description": "Success - Emerald",
        "500": { "$type": "color", "$value": "{color.base.emerald.500}" }
      }
    }
  }
}
```

**Theming Beispiel:**
```json
// light-theme.json (überschreibt Level 2)
{
  "color": {
    "primary": {
      "1": {
        "500": { "$value": "{color.base.sky.500}" }
      }
    }
  }
}

// dark-theme.json
{
  "color": {
    "primary": {
      "1": {
        "500": { "$value": "{color.base.sky.300}" } // Heller für Dark Mode!
      }
    }
  }
}
```

---

### Level 3: ROLES (Funktional)

**Zweck:** Funktionale Kategorien, Use-Case-basiert

**Regeln:**
- Referenziert NUR Level 2
- Naming: Funktion + Variant (`bg-primary`, `text-error`, `border-focus`)
- Kategorien: `bg`, `text`, `border`, `interactive`, semantische Feedbacks
- Wiederverwendbar: Mehrere Components nutzen dieselben Roles

**Beispiel:**
```json
{
  "color": {
    "bg": {
      "base":           { "$value": "{color.neutral.1.50}" },
      "primary":        { "$value": "{color.primary.1.500}" },
      "primary-hover":  { "$value": "{color.primary.1.600}" }
    },
    "text": {
      "base":    { "$value": "{color.neutral.1.900}" },
      "muted":   { "$value": "{color.neutral.1.600}" },
      "primary": { "$value": "{color.primary.1.600}" }
    },
    "border": {
      "default": { "$value": "{color.neutral.1.300}" },
      "focus":   { "$value": "{color.primary.1.500}" }
    }
  }
}
```

**Verwendung:**
```tsx
// Button nutzt bg-primary
<button className="bg-[var(--color-bg-primary)]" />

// Card nutzt AUCH bg-primary
<div className="bg-[var(--color-bg-primary)]" />
```

---

### Level 4: SEMANTIC (Component-spezifisch)

**Zweck:** Component-API, finale Abstraktionsschicht

**Regeln:**
- Referenziert NUR Level 3
- Naming: Component + Property + Variant (`btn-primary-bg`, `input-border-focus`)
- Granular: Jede Component hat eigene Token-Datei
- Flexibel: Components können Level 3 überschreiben

**Beispiel Button:**
```json
{
  "color": {
    "btn": {
      "primary": {
        "bg":        { "$value": "{color.bg.primary}" },
        "bg-hover":  { "$value": "{color.bg.primary-hover}" },
        "text":      { "$value": "{color.text.inverse}" },
        "border":    { "$value": "{color.bg.primary}" }
      },
      "secondary": {
        "bg":     { "$value": "{color.bg.surface}" },
        "text":   { "$value": "{color.text.base}" },
        "border": { "$value": "{color.border.default}" }
      }
    }
  }
}
```

**Verwendung:**
```tsx
// Button Component
const buttonVariants = cva(
  'inline-flex items-center',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-text)]',
        secondary: 'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)]',
      },
    },
  }
);
```

---

## 🔄 Token Flow Example

**User Story:** "Ändere Primary Color von Sky Blue zu Teal"

### Änderung auf Level 2:
```json
// packages/tokens/src/global/colors.json
{
  "color": {
    "primary": {
      "1": {
        // VORHER:
        "500": { "$value": "{color.base.sky.500}" }
        
        // NACHHER:
        "500": { "$value": "{color.base.teal.500}" }
      }
    }
  }
}
```

### Automatische Propagierung:

```
Level 1: color-base-teal-500: #14b8a6 (existiert bereits)
         ↓
Level 2: color-primary-1-500: var(--color-base-teal-500)
         ↓
Level 3: color-bg-primary: var(--color-primary-1-500)
         ↓
Level 4: color-btn-primary-bg: var(--color-bg-primary)
```

**Ergebnis:**
- ✅ Alle Buttons: Sky Blue → Teal
- ✅ Alle Cards mit Primary BG: Sky Blue → Teal
- ✅ Alle Focus Indicators: Sky Blue → Teal
- ✅ KEINE Code-Änderungen nötig!

---

## 🎨 Multi-Theme Architecture

### Base Setup (Light Theme)

```json
// Level 2 Default = Light Theme
{
  "color": {
    "neutral": {
      "1": {
        "50": { "$value": "{color.base.slate.50}" },  // Sehr hell
        "900": { "$value": "{color.base.slate.900}" }  // Sehr dunkel
      }
    }
  }
}
```

```css
/* Generierte CSS */
:root {
  --color-neutral-1-50: var(--color-base-slate-50);   /* #f8fafc */
  --color-neutral-1-900: var(--color-base-slate-900); /* #0f172a */
}
```

### Dark Theme Overlay

```json
// dark-theme.json (überschreibt Level 2)
{
  "color": {
    "neutral": {
      "1": {
        "50": { "$value": "{color.base.slate.900}" },  // Invertiert!
        "900": { "$value": "{color.base.slate.50}" }   // Invertiert!
      }
    }
  }
}
```

```css
/* Generierte CSS */
[data-theme="dark"] {
  --color-neutral-1-50: var(--color-base-slate-900);  /* #0f172a */
  --color-neutral-1-900: var(--color-base-slate-50);  /* #f8fafc */
}
```

**Magie:**
- Level 3 & 4 bleiben identisch!
- `color-bg-base` nutzt `color-neutral-1-50`
- In Light: Hell (#f8fafc)
- In Dark: Dunkel (#0f172a)
- ZERO Component-Änderungen!

---

## 📊 Decision Tree: Welches Level?

```
Brauchst du einen neuen Token?
│
├─ Ist es ein komplett neuer Wert (Hex, px, Font)?
│  └─ YES → Level 1 (Base)
│
├─ Ist es eine neue Brand/Palette-Zuordnung?
│  └─ YES → Level 2 (Global)
│
├─ Ist es eine neue funktionale Kategorie?
│  └─ YES → Level 3 (Roles)
│
└─ Ist es component-spezifisch?
   └─ YES → Level 4 (Semantic)
```

### Häufige Fehler

❌ **Falsch:** Neuer Button braucht Farbe → Level 1 erweitern
✅ **Richtig:** Nutze existierende Level 3 Roles, evtl. Level 4 customizen

❌ **Falsch:** Error-State → Neues Red in Level 1
✅ **Richtig:** Level 2 Accent-3 ist bereits Error-Red, nutze Level 3 Roles

❌ **Falsch:** Card Background → Hardcode `#f1f5f9`
✅ **Richtig:** Level 4 `card-bg` → Level 3 `bg-surface` → Level 2 → Level 1

---

## 🔍 Token Audit Example

**Frage:** "Warum ist mein Button rot?"

```css
/* Inspect Element zeigt: */
.button {
  background: var(--color-btn-primary-bg);
}
```

**Audit durch die Layer:**

```css
/* Level 4: Semantic */
--color-btn-primary-bg: var(--color-bg-primary);

/* Level 3: Roles */
--color-bg-primary: var(--color-primary-1-500);

/* Level 2: Global */
--color-primary-1-500: var(--color-base-red-500);

/* Level 1: Base */
--color-base-red-500: #ef4444;
```

**Antwort:** Primary-1 verweist auf Red statt Sky!

**Fix:** Level 2 anpassen:
```json
{
  "color": {
    "primary": {
      "1": {
        "500": { "$value": "{color.base.sky.500}" } // ← FIX
      }
    }
  }
}
```

---

## 🎓 Weiterführende Konzepte

### Style Dictionary Transforms

```js
// style-dictionary.config.js
{
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: '../styles/dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true, // ← WICHTIG für Hierarchie!
        },
      }],
    },
  },
}
```

**outputReferences: true** bedeutet:
```css
/* MIT outputReferences */
--color-btn-primary-bg: var(--color-bg-primary); /* ✅ Hierarchie erhalten */

/* OHNE outputReferences */
--color-btn-primary-bg: #0ea5e9; /* ❌ Hierarchie verloren */
```

### DTCG Token Format

```json
{
  "color": {
    "btn": {
      "primary": {
        "bg": {
          "$type": "color",                      // W3C DTCG Type
          "$value": "{color.bg.primary}",        // Referenz
          "$description": "Primary button background",
          "$extensions": {
            "com.nordlig.category": "interactive"
          }
        }
      }
    }
  }
}
```

---

**Nächste Schritte:**
- [TOKEN_GUIDELINES.md](TOKEN_GUIDELINES.md) - Wann neue Tokens anlegen
- [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md) - Components mit Tokens verbinden
