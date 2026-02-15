import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const SingleDefault: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Was ist Nordlig?</AccordionTrigger>
        <AccordionContent>
          Nordlig ist ein skalierbares Design System mit einer 4-Layer Token-Architektur,
          optimiert für React-Anwendungen.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Wie funktionieren Tokens?</AccordionTrigger>
        <AccordionContent>
          Tokens werden in 4 Ebenen organisiert: Base → Global → Roles → Semantic.
          Jede Ebene referenziert nur die darüber liegende.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Welche Components gibt es?</AccordionTrigger>
        <AccordionContent>
          Atoms (Button, Input, Badge), Molecules (Select, Tabs, Accordion) und
          Organisms (Card, Table, Modal).
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Abschnitt 1</AccordionTrigger>
        <AccordionContent>
          Mehrere Abschnitte können gleichzeitig geöffnet sein.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Abschnitt 2</AccordionTrigger>
        <AccordionContent>
          Dieser Abschnitt ist ebenfalls standardmäßig geöffnet.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Abschnitt 3</AccordionTrigger>
        <AccordionContent>
          Klicken um diesen Abschnitt zu öffnen.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Aktiver Abschnitt</AccordionTrigger>
        <AccordionContent>Dieser Inhalt ist zugänglich.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger disabled>Deaktivierter Abschnitt</AccordionTrigger>
        <AccordionContent>Dieser Inhalt ist nicht zugänglich.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const TrainingFAQ: Story = {
  name: 'Training Analyzer: FAQ',
  render: () => (
    <Accordion type="single" collapsible className="max-w-lg">
      <AccordionItem value="zones">
        <AccordionTrigger>Was sind Herzfrequenz-Zonen?</AccordionTrigger>
        <AccordionContent>
          Herzfrequenz-Zonen teilen deine Trainingsintensität in 5 Bereiche ein,
          basierend auf deiner maximalen Herzfrequenz. Zone 1 (50-60%) ist leichtes
          Training, Zone 5 (90-100%) maximale Belastung.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="vo2max">
        <AccordionTrigger>Wie wird VO₂max berechnet?</AccordionTrigger>
        <AccordionContent>
          Die VO₂max wird aus der Beziehung zwischen Laufgeschwindigkeit und
          Herzfrequenz geschätzt. Je schneller du bei niedrigerer HR laufen
          kannst, desto höher deine VO₂max.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="recovery">
        <AccordionTrigger>Was bedeutet Recovery Score?</AccordionTrigger>
        <AccordionContent>
          Der Recovery Score (0-100) zeigt, wie gut du erholt bist. Er basiert
          auf Ruhe-HR, HRV und Schlafqualität. Ab 70 bist du bereit für
          intensives Training.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// ─── Accordion vs Collapsible Guidance ──────────────────────────────────────

export const AccordionVsCollapsible: Story = {
  name: 'Leitfaden: Accordion vs Collapsible',
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-md border p-4 space-y-2">
        <h3 className="text-sm font-semibold">Wann Accordion verwenden?</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Mehrere verwandte Abschnitte, die als Gruppe zusammengehoeren</li>
          <li>Nur ein Abschnitt gleichzeitig soll geoeffnet sein (<code>type="single"</code>)</li>
          <li>FAQ-Bereiche, Einstellungskategorien, Formular-Sektionen</li>
          <li>Konsistente Darstellung mit Trennlinien und Chevron-Icons</li>
        </ul>
      </div>
      <div className="rounded-md border p-4 space-y-2">
        <h3 className="text-sm font-semibold">Wann Collapsible verwenden?</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Einzelner ein-/ausklappbarer Bereich (kein Gruppen-Kontext)</li>
          <li>Eigener Trigger-Button mit individuellem Design</li>
          <li>Erweiterte Filter, optionale Details, Zusatzinfos</li>
          <li>Kontrolliert von aussen via <code>open</code>/<code>onOpenChange</code></li>
        </ul>
      </div>
      <div className="rounded-md border border-dashed p-4 space-y-3">
        <h3 className="text-sm font-semibold">Vergleich</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-1.5 pr-4 font-medium">Eigenschaft</th>
              <th className="py-1.5 pr-4 font-medium">Accordion</th>
              <th className="py-1.5 font-medium">Collapsible</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-1.5 pr-4">Anzahl Bereiche</td>
              <td className="py-1.5 pr-4">Mehrere</td>
              <td className="py-1.5">Einzelner</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-4">Exklusiv-Modus</td>
              <td className="py-1.5 pr-4">Ja (<code>type="single"</code>)</td>
              <td className="py-1.5">Nein</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-4">Custom Trigger</td>
              <td className="py-1.5 pr-4">Eingeschraenkt</td>
              <td className="py-1.5">Volle Freiheit (<code>asChild</code>)</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-4">Animationen</td>
              <td className="py-1.5 pr-4">Eingebaut</td>
              <td className="py-1.5">Eingebaut</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-4">Kontrollierbar</td>
              <td className="py-1.5 pr-4"><code>defaultValue</code></td>
              <td className="py-1.5"><code>open</code> + <code>onOpenChange</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};

// ─── Training: Session Details ─────────────────────────────────────────────

export const TrainingSessionDetails: Story = {
  name: 'Training Analyzer: Session Details',
  render: () => (
    <Accordion type="multiple" className="max-w-lg">
      <AccordionItem value="summary">
        <AccordionTrigger>Zusammenfassung</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1 text-sm">
            <p>Lauf · 10.2 km · 52:30 min</p>
            <p>Ø Pace: 5:09 /km · Ø HR: 155 bpm</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="laps">
        <AccordionTrigger>Runden (10)</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1 text-sm">
            <p>Km 1: 5:15 · 148 bpm</p>
            <p>Km 2: 5:08 · 152 bpm</p>
            <p>Km 3: 5:02 · 155 bpm</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="zones">
        <AccordionTrigger>HR-Zonen Verteilung</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1 text-sm">
            <p>Zone 2: 18:30 (35%)</p>
            <p>Zone 3: 24:00 (46%)</p>
            <p>Zone 4: 10:00 (19%)</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
