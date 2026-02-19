import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    'aria-label': 'Default radio',
  },
};

// ─── With Label ─────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: 'Option A',
  },
};

// ─── With Description ───────────────────────────────────────────────────────

export const WithDescription: Story = {
  args: {
    label: 'Pro Plan',
    description: 'Erweiterte Analyse, unbegrenzte Trainings, Herzfrequenz-Zonen.',
  },
};

// ─── Checked ────────────────────────────────────────────────────────────────

export const Checked: Story = {
  args: {
    label: 'Ausgewählt',
    checked: true,
    readOnly: true,
  },
};

// ─── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: 'Nicht verfügbar',
    disabled: true,
  },
};

// ─── Disabled Checked ───────────────────────────────────────────────────────

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    label: 'Gesperrt (ausgewählt)',
    disabled: true,
    checked: true,
    readOnly: true,
  },
};

// ─── Group (multiple radios with same name) ─────────────────────────────────

export const Group: Story = {
  name: 'Group (same name)',
  render: () => {
    const [selected, setSelected] = React.useState('a');
    return (
      <div className="flex flex-col">
        <Radio
          name="demo-group"
          value="a"
          label="Option A"
          checked={selected === 'a'}
          onChange={() => setSelected('a')}
        />
        <Radio
          name="demo-group"
          value="b"
          label="Option B"
          checked={selected === 'b'}
          onChange={() => setSelected('b')}
        />
        <Radio
          name="demo-group"
          value="c"
          label="Option C"
          description="Mit zusätzlicher Beschreibung."
          checked={selected === 'c'}
          onChange={() => setSelected('c')}
        />
        <Radio
          name="demo-group"
          value="d"
          label="Option D (deaktiviert)"
          disabled
        />
      </div>
    );
  },
};
