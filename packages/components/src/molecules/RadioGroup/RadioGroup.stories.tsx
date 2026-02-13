import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

const meta: Meta = {
  title: 'Molecules/RadioGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => {
    const [value, setValue] = React.useState('a');
    return (
      <RadioGroup aria-label="Beispiel" value={value} onValueChange={setValue}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
        <RadioGroupItem value="c" label="Option C" />
      </RadioGroup>
    );
  },
};

// ─── Vertical Layout (Default) ──────────────────────────────────────────────

export const VerticalLayout: Story = {
  name: 'Vertical Layout (Default)',
  render: () => (
    <RadioGroup aria-label="Vertikal" defaultValue="first">
      <RadioGroupItem value="first" label="Erste Option" />
      <RadioGroupItem value="second" label="Zweite Option" />
      <RadioGroupItem value="third" label="Dritte Option" />
    </RadioGroup>
  ),
};

// ─── Horizontal Layout ──────────────────────────────────────────────────────

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout',
  render: () => (
    <RadioGroup aria-label="Horizontal" orientation="horizontal" defaultValue="a">
      <RadioGroupItem value="a" label="Links" />
      <RadioGroupItem value="b" label="Mitte" />
      <RadioGroupItem value="c" label="Rechts" />
    </RadioGroup>
  ),
};

// ─── With Descriptions ──────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  render: () => (
    <RadioGroup aria-label="Plan wählen" defaultValue="basic">
      <RadioGroupItem
        value="basic"
        label="Basic"
        description="Grundfunktionen, max. 3 Trainings pro Woche."
      />
      <RadioGroupItem
        value="pro"
        label="Pro"
        description="Erweiterte Analyse, unbegrenzte Trainings, Herzfrequenz-Zonen."
      />
      <RadioGroupItem
        value="premium"
        label="Premium"
        description="Alles aus Pro + GPS-Tracking, Coach-Feedback, API-Zugang."
      />
    </RadioGroup>
  ),
};

// ─── Disabled Options ───────────────────────────────────────────────────────

export const DisabledOptions: Story = {
  name: 'Disabled Options',
  render: () => (
    <RadioGroup aria-label="Verfügbarkeit" defaultValue="available">
      <RadioGroupItem value="available" label="Verfügbar" />
      <RadioGroupItem value="limited" label="Eingeschränkt" description="Nur mit Pro-Plan." disabled />
      <RadioGroupItem value="unavailable" label="Nicht verfügbar" disabled />
    </RadioGroup>
  ),
};

// ─── Children as Label ──────────────────────────────────────────────────────

export const ChildrenAsLabel: Story = {
  name: 'Children as Label',
  render: () => (
    <RadioGroup aria-label="Farben" defaultValue="blue">
      <RadioGroupItem value="blue">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-sky-500" />
          Blau
        </span>
      </RadioGroupItem>
      <RadioGroupItem value="green">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
          Grün
        </span>
      </RadioGroupItem>
      <RadioGroupItem value="red">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-rose-500" />
          Rot
        </span>
      </RadioGroupItem>
    </RadioGroup>
  ),
};

// ─── Training Analyzer Use Cases ────────────────────────────────────────────

export const TrainingType: Story = {
  name: 'Use Case: Training Type',
  render: () => {
    const [type, setType] = React.useState('longrun');
    return (
      <div className="max-w-sm">
        <h3 className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Trainingstyp wählen
        </h3>
        <RadioGroup aria-label="Trainingstyp" value={type} onValueChange={setType}>
          <RadioGroupItem
            value="longrun"
            label="Longrun"
            description="Langer Dauerlauf, lockeres Tempo, Grundlagenausdauer."
          />
          <RadioGroupItem
            value="interval"
            label="Intervalle"
            description="Wechsel zwischen Belastung und Erholung."
          />
          <RadioGroupItem
            value="tempo"
            label="Tempo"
            description="Gleichmäßig schnelles Tempo über die gesamte Distanz."
          />
          <RadioGroupItem
            value="recovery"
            label="Regeneration"
            description="Sehr lockerer Lauf zur aktiven Erholung."
          />
          <RadioGroupItem
            value="kraft"
            label="Krafttraining"
            description="Stabi, Core und Beinmuskulatur."
          />
        </RadioGroup>
      </div>
    );
  },
};

export const ViewMode: Story = {
  name: 'Use Case: View Mode',
  render: () => {
    const [view, setView] = React.useState('week');
    return (
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Ansicht
        </h3>
        <RadioGroup
          aria-label="Ansicht"
          orientation="horizontal"
          value={view}
          onValueChange={setView}
        >
          <RadioGroupItem value="day" label="Tag" />
          <RadioGroupItem value="week" label="Woche" />
          <RadioGroupItem value="month" label="Monat" />
          <RadioGroupItem value="year" label="Jahr" />
        </RadioGroup>
      </div>
    );
  },
};

export const HRZoneTarget: Story = {
  name: 'Use Case: HR Zone Target',
  render: () => {
    const [zone, setZone] = React.useState('z2');
    return (
      <div className="max-w-sm">
        <h3 className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Ziel-Herzfrequenzzone
        </h3>
        <RadioGroup aria-label="HF-Zone" value={zone} onValueChange={setZone}>
          <RadioGroupItem value="z1" label="Zone 1" description="50–60% HFmax – Regeneration" />
          <RadioGroupItem value="z2" label="Zone 2" description="60–70% HFmax – Grundlagenausdauer" />
          <RadioGroupItem value="z3" label="Zone 3" description="70–80% HFmax – Aerobe Schwelle" />
          <RadioGroupItem value="z4" label="Zone 4" description="80–90% HFmax – Anaerobe Schwelle" />
          <RadioGroupItem value="z5" label="Zone 5" description="90–100% HFmax – Maximale Intensität" />
        </RadioGroup>
      </div>
    );
  },
};
