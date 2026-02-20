# Gestaltungsprinzipien - Nordlig Design System

**Version:** 1.0
**Status:** Verbindlich fuer alle Komponenten, Templates und Stories

---

## Philosophie

*Nordlig* ist daenisch und bedeutet *noerdlich*. Dieses Design System uebertraegt skandinavische Gestaltungsprinzipien — bekannt aus Moebeldesign, Architektur und Industriedesign — auf Anwendungsoberflaechen.

Skandinavisches Design entstand Anfang des 20. Jahrhunderts als humanistische Antwort auf den industriellen Funktionalismus: Funktion ja, aber im Dienst des Menschen, nicht der Maschine. Alvar Aalto bewies mit organischen Formen aus Birkenholz, dass Funktionalitaet und Schoenheit kein Widerspruch sind. Arne Jacobsen zeigte, dass Massenproduktion nicht seelenlos sein muss. Poul Henningsen entwarf Licht, das Menschen wohltut statt sie zu blenden.

Diese Haltung definiert Nordlig: **Jedes Element dient dem Menschen. Was keinen Zweck erfuellt, gehoert nicht dorthin.**

---

## Die fuenf Saeulen

### 1. Funktionalismus — Form follows Function

> *"Nichts ist zweckfrei. Jedes Element rechtfertigt seine Existenz durch seine Funktion."*

Wie ein Wegner-Stuhl keine dekorative Schnitzerei hat, hat eine Nordlig-Oberflaeche keinen visuellen Ballast. Dekoration ist nicht verboten — aber sie muss einen funktionalen Beitrag leisten (Orientierung, Hierarchie, Feedback).

### 2. Lagom — Genau das richtige Mass

> *"Nicht zu viel, nicht zu wenig. Genau so viel wie noetig."*

Lagom (schwedisch) beschreibt das Prinzip der Ausgewogenheit. Weder ueberladen noch karg. Ein Screen zeigt genau die Information, die der Nutzer in diesem Moment braucht — nicht mehr, nicht weniger. Progressive Disclosure statt Informationsflut.

### 3. Hygge — Behaglichkeit und Waerme

> *"Die Oberflaeche fuehlt sich einladend an. Interaktionen sind nachsichtig, nie bestrafend."*

Hygge (daenisch) steht fuer Geborgenheit. Digital uebersetzt: warme Farbtone statt kaltem Weiss, weiche Formen statt harter Kanten, freundliche Fehlermeldungen statt technischer Vorwuerfe. Der Nutzer soll sich willkommen fuehlen.

### 4. Demokratisk Design — Fuer alle

> *"Gutes Design ist kein Luxus. Jeder Mensch verdient eine Oberflaeche, die funktioniert."*

Barrierefreiheit ist kein Feature, sondern Grundvoraussetzung. WCAG 2.1 AA ist Minimum. Jede Komponente funktioniert mit Tastatur, Screenreader und auf jedem Geraet. Inklusivitaet durch Design, nicht durch Nachbesserung.

### 5. Tidloeshet — Zeitlosigkeit

> *"Wird das in fuenf Jahren noch gut aussehen? Dann ist es richtig."*

Trends kommen und gehen. Glassmorphism, extreme Gradienten, uebertriebene Animationen — alles Moden. Nordlig baut auf zeitlose Muster: klare Typografie, konsistente Raum-Aufteilung, zurueckhaltende Farbgebung. Wie ein Jacobsen-Stuhl von 1955, der heute noch modern wirkt.

---

## Verbindliche Gestaltungskriterien

### A. Weissraum und Luft (Lagom im Layout)

Skandinavisches Design lebt von Luft. Wie in einem skandinavischen Wohnzimmer — wenige, bewusst platzierte Moebel mit viel Raum dazwischen.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| Spacing-System | 8px Grundraster (4, 8, 12, 16, 24, 32, 48, 64) | Konsistente Rhythmik, teilbar ohne Brueche |
| Komponentenabstand | Zusammengehoerendes: 8-16px, Getrenntes: 32-64px | Naehe zeigt Zusammengehoerigkeit (Gestaltgesetz) |
| Container-Padding | Minimum 16px (Mobile), 24-32px (Desktop) | Inhalte beruehren nie den Rand |
| Header-Hoehe | Minimum 56px (Mobile), 64px (Desktop) | Markenzeichen braucht Luft zum Atmen |
| Touch-Targets | Minimum 44x44px, Ziel 48x48px | Nachsichtige Interaktion (Hygge) |
| Weissraum-Anteil | ~30-40% einer Screen-Flaeche | Cramped Layouts verletzen Lagom |
| Innen > Aussen | Padding innerhalb einer Komponente <= Margin ausserhalb | Elemente wirken als zusammenhaengende Einheiten |

**Pruef-Frage:** *Kann ich noch ein Element entfernen, ohne dass die Funktion leidet? Dann tue es.*

### B. Farbe (Natur-inspiriert, zugaenglich)

Farben stammen aus der nordischen Landschaft: Fjordblau, Schiefergrau, Birkenweiss, Moosgrun. Nie greller als die Natur.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| Farbverteilung | 70% neutrale Basis, 20% sekundaer, 10% Akzent | 70-20-10-Regel aus skandinavischem Interior Design |
| Hintergrund | Warmes Weiss (nicht reines #FFFFFF), z.B. Slate-50 (#f8fafc) | Reines Weiss ist grell; warmes Weiss wie nordisches Streulicht |
| Textfarbe | Nie reines Schwarz; Slate-900 (#0f172a) als dunkelster Wert | Weicherer Kontrast, weniger Augenbelastung |
| Kontrastverhaltnis | Body-Text: mind. 4.5:1 (AA), Ziel 7:1 (AAA) | Demokratisk — lesbar fuer alle |
| Akzentfarben | Gedaempft, entsaettigt — nie greller als das Primaerblau | Wie Farben in der nordischen Natur: gedeckt, nie schreiend |
| Farbe allein reicht nicht | Immer mit Icon, Text oder Muster kombinieren | ~8% der Maenner sind farbenblind |
| Maximal-Palette | 5-7 semantische Farben + Neutral-Skala | Lagom — genug um Bedeutung zu vermitteln, nicht mehr |
| Dark Mode | Eigenstaendig gestaltet, gleiche warme Untertone | Hygge bleibt in beiden Modi erhalten |

**Pruef-Frage:** *Wirkt die Farbgebung wie ein skandinavisches Wohnzimmer oder wie ein Spielautomat?*

### C. Typografie (Klarheit und Hierarchie)

Wenige Schnitte, klare Hierarchie. Wie ein gut gesetztes Buch — nicht wie ein Plakat.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| Schriftschnitte | Maximal 3 Gewichte (Regular, Medium, Semibold/Bold) | Zurueckhaltung; Hierarchie durch Groesse + Gewicht, nicht Vielfalt |
| Body-Groesse | 16px Minimum auf Desktop, 14px auf Mobile nur fuer Sekundaertext | Bequemes Lesen (Hygge) |
| Zeilenhoehe Body | 1.5-1.6x Schriftgroesse | Grosszuegiger Durchschuss fuer Lesbarkeit |
| Zeilenhoehe Headings | 1.1-1.3x Schriftgroesse | Enger bei grossen Groessen, trotzdem komfortabel |
| Hierarchie-Stufen | Maximal 4 sichtbare Ebenen | Wenn mehr noetig sind: Informationsarchitektur ueberdenken |
| Schriftfamilien | 1 (bevorzugt) oder maximal 2 | Einheit und Handwerkskunst; jede Schrift muss ihren Platz verdienen |
| Heading-Abstand | Heading → Inhalt: enger als Inhalt → naechste Sektion | Heading gehoert zu seinem Inhalt, nicht zum vorherigen Block |

**Pruef-Frage:** *Kann ich die Hierarchie verstehen, wenn ich die Seite aus 2 Metern Entfernung betrachte?*

### D. Form und Gestalt (Organische Waerme)

Weiche Kanten, sanfte Schatten. Wie gebogenes Sperrholz — organisch, nie hartkantig.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| Border-Radius klein | 4-8px (Buttons, Inputs, Chips) | Weich aber nicht comic-haft — Lagom in der Rundung |
| Border-Radius mittel | 8-16px (Cards, Container) | Sanft, einladend, nicht kindlich |
| Border-Radius gross | 12-24px (Modale, Panels) | Proportional zum Container |
| Pill-Shape | Nur fuer Tags/Badges, nicht fuer primaere Aktionen | Pill-Form reduziert die wahrgenommene Klickflaeche |
| Schatten | Weich, diffus, niedrige Opazitaet (z.B. `0 2px 8px rgba(0,0,0,0.06)`) | Henningsens "menschliches Licht" — sanft, nie hart |
| Schatten-Ebenen | 3 Stufen: flat, raised, floating (max.) | Einfachheit; flach mit subtilen Tiefenhinweisen |
| Borders | 1px, gedaempfte Farbe (`--color-border-muted`) | Ehrliche aber zurueckhaltende Trennung |
| Icons | 1.5-2px Strichstaerke, abgerundete Enden | Konsistent mit organischer Waerme |

**Pruef-Frage:** *Fuehlt sich die Komponente an wie ein handgefertigtes Moebelstueck oder wie ein Industrieprodukt?*

### E. Bewegung und Interaktion (Hygge im Verhalten)

Animationen sind zurueckhaltend. Nie Selbstzweck, immer funktional. Wie eine sanft schliessende Schublade.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| UI-Feedback | 150-200ms | Spuerbar aber nicht traege |
| Layout-Aenderungen | 200-300ms | Natuerlich, der Bewegung folgbar |
| Easing | `ease-out` fuer Einblendungen, `ease-in-out` fuer Zustandswechsel | Organische Verzoegerung wie natuerliche Bewegung |
| Hover-States | Subtil: sanfter Farbwechsel oder leichte Schatten-Anhebung | Nicht dramatisch; zurueckhaltendes Feedback |
| Ladezustaende | Skeleton Screens statt Spinner | Ruhiges Warten (Hygge); weniger Angst |
| Fehlerbehandlung | Freundliche Sprache, klarer Loesungsweg, keine Schuldzuweisung | Fehler sind Systemfehler, nicht Nutzerfehler |
| Max. animierte Properties | 1-2 pro Transition | Zurueckhaltung; jede Animation braucht einen Zweck |
| `prefers-reduced-motion` | Immer respektieren | Demokratisk — keine Animation erzwingen |

**Pruef-Frage:** *Wuerde die Animation auch ohne Bewegung funktionieren? Dann ist sie richtig dezent.*

### F. Informationsdichte (Lagom im Inhalt)

Weniger zeigen, mehr verstehen. Progressive Disclosure statt Informationswand.

| Kriterium | Regel | Begruendung |
|-----------|-------|-------------|
| Cards pro Zeile | Maximal 4 auf Desktop | Jedes Element bekommt Aufmerksamkeit |
| Tabellenzeilen-Hoehe | Minimum 48px, Ziel 56px | Bequemes Scannen; grosszuegiger Vertikalabstand |
| Formularfelder pro View | 5-7 sichtbar ohne Scrollen | Zeige nur was gerade noetig ist |
| Navigation Top-Level | 5-7 Eintraege maximal | Kognitive Last begrenzen |
| Aktions-Buttons pro Kontext | 1 Primaer, 1-2 Sekundaer maximal | Klare Hierarchie; Entscheidungsmuedigkeit vermeiden |
| Empty States | Immer gestaltet, nie leer | Jeder Zustand ist handwerklich durchdacht (Hantverk) |
| Textlaenge Body | 60-80 Zeichen pro Zeile | Optimale Lesezeilenlaenge |

**Pruef-Frage:** *Kann ich ein Viertel der Elemente entfernen und der Nutzer findet trotzdem alles?*

### G. Ehrlichkeit und Transparenz (Ehrliches Design)

Wie ehrliche Materialien im Moebeldesign — Holzmaserung zeigen, nicht hinter Lack verstecken.

| Kriterium | Regel |
|-----------|-------|
| Systemstatus | Immer sichtbar; der Nutzer weiss jederzeit wo er ist und was passiert |
| Destruktive Aktionen | Explizite Bestaetigung; nie in Menues versteckt |
| Disabled States | Visuell erkennbar UND erklaeren warum etwas deaktiviert ist |
| Keine Dark Patterns | Kein Confirmshaming, keine Trick-Fragen, keine Irrefuehrung |
| Fehlermeldungen | Was passiert ist, warum, und wie es behoben wird — in menschlicher Sprache |
| Progressive Disclosure | Komplexes stufenweise zeigen, aber nie dauerhaft verstecken |

---

## Die Nordlig-Heuristik

Bei jeder Gestaltungsentscheidung diese fuenf Fragen stellen:

| # | Frage | Saule |
|---|-------|-------|
| 1 | **Ist es noetig?** — Dient jedes Element einem Zweck? Kann etwas entfernt werden ohne Funktionsverlust? | Funktionalismus |
| 2 | **Ist es ausgewogen?** — Ist es weder ueberladen noch karg? Stimmen die Proportionen? | Lagom |
| 3 | **Ist es einladend?** — Fuehlt es sich warm und zugaenglich an? Sind Interaktionen nachsichtig? Gibt es genug Luft? | Hygge |
| 4 | **Ist es fuer alle?** — Erfuellt es WCAG 2.1 AA? Funktioniert es auf jedem Geraet, mit jeder Eingabemethode? | Demokratisk |
| 5 | **Wird es bestehen?** — Basiert es auf zeitlosen Mustern oder jagt es einem Trend hinterher? | Tidloeshet |

Wenn eine Frage mit *Nein* beantwortet wird, ist die Gestaltung nicht fertig.

---

## Anwendung im Review-Prozess

Dieses Dokument ist die Grundlage fuer Schritt 6 (Design & UX Review) im Komponentenerstellungs-Workflow. Jede neue Komponente, jedes Template und jede Story wird gegen diese Kriterien geprueft.

**Review-Checkliste (Kurzform):**

- [ ] Weissraum: Genug Luft? Kein cramped Layout?
- [ ] Farbe: 70-20-10? Warme Toene? Kontrast >= 4.5:1?
- [ ] Typografie: Max 3 Gewichte? Klare Hierarchie? Body >= 16px?
- [ ] Form: Weiche Radii? Sanfte Schatten? Konsistente Borders?
- [ ] Bewegung: Subtil? Funktional? reduced-motion respektiert?
- [ ] Dichte: Nicht ueberladen? Progressive Disclosure?
- [ ] Ehrlichkeit: Klare Zustande? Menschliche Fehlermeldungen?
- [ ] Accessibility: Tastatur? Screenreader? Touch-Targets >= 44px?
- [ ] Zeitlosigkeit: Kein Trend-Chasing? In 5 Jahren noch gut?

---

*"Das Ziel von Design ist nicht, die Dinge schoen zu machen. Das Ziel ist, sie gut zu machen — und dann werden sie von allein schoen."*
