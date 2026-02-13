import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Molecules/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    rows: { control: 'number' },
    maxLength: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Textarea component styled like Input with auto-resize, character counter, label, helper text, and error messages. German locale.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Text eingeben…',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Notizen',
    placeholder: 'Wie hat sich das Training angefühlt?',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Beschreibung',
    placeholder: 'Beschreibe die Trainingseinheit…',
    helperText: 'Optional – wird auf der Detailseite angezeigt',
  },
};

export const WithCounter: Story = {
  name: 'Character Counter',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Notizen"
          placeholder="Wie hat sich das Training angefühlt?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
          showCounter
        />
      </div>
    );
  },
};

export const CounterOverLimit: Story = {
  name: 'Counter Over Limit',
  render: () => {
    const [value, setValue] = React.useState(
      'Dies ist ein Beispieltext der die maximale Zeichenanzahl überschreitet und rot markiert wird.'
    );
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Kurze Notiz"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={50}
          showCounter
        />
      </div>
    );
  },
};

export const AutoResize: Story = {
  name: 'Auto Resize',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Notizen"
          placeholder="Tippe und der Bereich wächst automatisch…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoResize
          showCounter
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Pflichtfeld',
    errorMessage: 'Bitte eine Beschreibung eingeben',
    placeholder: 'Beschreibung…',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Gesperrt',
    value: 'Dieser Text kann nicht bearbeitet werden.',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Textarea inputSize="sm" label="Small" placeholder="Small textarea" rows={3} />
      <Textarea inputSize="md" label="Medium" placeholder="Medium textarea (default)" rows={3} />
      <Textarea inputSize="lg" label="Large" placeholder="Large textarea" rows={3} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Textarea label="Default" placeholder="Default State" />
      <Textarea label="Error" errorMessage="Pflichtfeld" placeholder="Error State" />
      <Textarea label="Disabled" disabled value="Disabled State" />
    </div>
  ),
};

// ─── Training Analyzer Use Cases ──────────────────────────────────────────

export const TrainingNotes: Story = {
  name: 'Training - Notizen',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Notizen"
          placeholder="Wie hat sich das Training angefühlt?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
          showCounter
        />
      </div>
    );
  },
};

export const SessionComments: Story = {
  name: 'Training - Kommentar',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Kommentar"
          placeholder="Besonderheiten, Beschwerden, Gefühl..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          helperText="Nur für dich sichtbar"
        />
      </div>
    );
  },
};

export const PlanAdjustment: Story = {
  name: 'Training - Plananpassung',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ maxWidth: '400px' }}>
        <Textarea
          label="Änderung"
          placeholder="Grund für Anpassung..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoResize
        />
      </div>
    );
  },
};
