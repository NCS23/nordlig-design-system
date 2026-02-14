import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: Meta = {
  title: 'Atoms/ToggleGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Default (Single) ───────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard (Einzelauswahl)',
  render: () => {
    const [value, setValue] = React.useState('a');
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        <ToggleGroupItem value="c">Option C</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// ─── Multiple ───────────────────────────────────────────────────────────────

export const Multiple: Story = {
  name: 'Mehrfachauswahl',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['a']);
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="a">Fett</ToggleGroupItem>
        <ToggleGroupItem value="b">Kursiv</ToggleGroupItem>
        <ToggleGroupItem value="c">Unterstrichen</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Groessen',
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Klein (sm)</p>
        <ToggleGroup type="single" size="sm" defaultValue="a">
          <ToggleGroupItem value="a">Klein A</ToggleGroupItem>
          <ToggleGroupItem value="b">Klein B</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Mittel (md)</p>
        <ToggleGroup type="single" size="md" defaultValue="a">
          <ToggleGroupItem value="a">Mittel A</ToggleGroupItem>
          <ToggleGroupItem value="b">Mittel B</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Gross (lg)</p>
        <ToggleGroup type="single" size="lg" defaultValue="a">
          <ToggleGroupItem value="a">Gross A</ToggleGroupItem>
          <ToggleGroupItem value="b">Gross B</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ─── Outline ────────────────────────────────────────────────────────────────

export const Outline: Story = {
  name: 'Outline-Variante',
  render: () => {
    const [value, setValue] = React.useState('a');
    return (
      <ToggleGroup type="single" variant="outline" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="a">Option A</ToggleGroupItem>
        <ToggleGroupItem value="b">Option B</ToggleGroupItem>
        <ToggleGroupItem value="c">Option C</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// ─── Training: View Toggle ──────────────────────────────────────────────────

export const TrainingViewToggle: Story = {
  name: 'Use Case: Trainingsansicht',
  render: () => {
    const [view, setView] = React.useState('tabelle');
    return (
      <div>
        <p className="text-sm font-medium text-[var(--color-text-base)] mb-3">
          Ansicht wechseln
        </p>
        <ToggleGroup type="single" variant="outline" value={view} onValueChange={setView}>
          <ToggleGroupItem value="tabelle">Tabelle</ToggleGroupItem>
          <ToggleGroupItem value="karte">Karte</ToggleGroupItem>
          <ToggleGroupItem value="liste">Liste</ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  },
};
