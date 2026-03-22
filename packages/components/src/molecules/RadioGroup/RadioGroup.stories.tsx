import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../../atoms/Radio';
import { Heading } from '../../atoms/Heading';

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
      <RadioGroup aria-label="Beispiel" name="basic" value={value} onValueChange={setValue}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
};

// ─── Vertical Layout (Default) ──────────────────────────────────────────────

export const VerticalLayout: Story = {
  name: 'Vertical Layout (Default)',
  render: () => (
    <RadioGroup aria-label="Vertikal" name="vertical" defaultValue="first">
      <Radio value="first" label="Erste Option" />
      <Radio value="second" label="Zweite Option" />
      <Radio value="third" label="Dritte Option" />
    </RadioGroup>
  ),
};

// ─── Horizontal Layout ──────────────────────────────────────────────────────

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout',
  render: () => (
    <RadioGroup aria-label="Horizontal" name="horizontal" orientation="horizontal" defaultValue="a">
      <Radio value="a" label="Links" />
      <Radio value="b" label="Mitte" />
      <Radio value="c" label="Rechts" />
    </RadioGroup>
  ),
};

// ─── With Descriptions ──────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  render: () => (
    <RadioGroup aria-label="Plan wählen" name="plans" defaultValue="basic">
      <Radio
        value="basic"
        label="Basic"
        description="Grundfunktionen, max. 3 Trainings pro Woche."
      />
      <Radio
        value="pro"
        label="Pro"
        description="Erweiterte Analyse, unbegrenzte Trainings, Herzfrequenz-Zonen."
      />
      <Radio
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
    <RadioGroup aria-label="Verfügbarkeit" name="availability" defaultValue="available">
      <Radio value="available" label="Verfügbar" />
      <Radio value="limited" label="Eingeschränkt" description="Nur mit Pro-Plan." disabled />
      <Radio value="unavailable" label="Nicht verfügbar" disabled />
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
        <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Trainingstyp wählen
        </Heading>
        <RadioGroup aria-label="Trainingstyp" name="training-type" value={type} onValueChange={setType}>
          <Radio
            value="longrun"
            label="Longrun"
            description="Langer Dauerlauf, lockeres Tempo, Grundlagenausdauer."
          />
          <Radio
            value="interval"
            label="Intervalle"
            description="Wechsel zwischen Belastung und Erholung."
          />
          <Radio
            value="tempo"
            label="Tempo"
            description="Gleichmäßig schnelles Tempo über die gesamte Distanz."
          />
          <Radio
            value="recovery"
            label="Regeneration"
            description="Sehr lockerer Lauf zur aktiven Erholung."
          />
          <Radio
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
        <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Ansicht
        </Heading>
        <RadioGroup
          aria-label="Ansicht"
          name="view-mode"
          orientation="horizontal"
          value={view}
          onValueChange={setView}
        >
          <Radio value="day" label="Tag" />
          <Radio value="week" label="Woche" />
          <Radio value="month" label="Monat" />
          <Radio value="year" label="Jahr" />
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
        <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Ziel-Herzfrequenzzone
        </Heading>
        <RadioGroup aria-label="HF-Zone" name="hr-zone" value={zone} onValueChange={setZone}>
          <Radio value="z1" label="Zone 1" description="50–60% HFmax – Regeneration" />
          <Radio value="z2" label="Zone 2" description="60–70% HFmax – Grundlagenausdauer" />
          <Radio value="z3" label="Zone 3" description="70–80% HFmax – Aerobe Schwelle" />
          <Radio value="z4" label="Zone 4" description="80–90% HFmax – Anaerobe Schwelle" />
          <Radio value="z5" label="Zone 5" description="90–100% HFmax – Maximale Intensität" />
        </RadioGroup>
      </div>
    );
  },
};
