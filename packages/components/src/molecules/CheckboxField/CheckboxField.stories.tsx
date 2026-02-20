import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxField } from './CheckboxField';
import { Heading } from '../../atoms/Heading';

const meta: Meta = {
  title: 'Molecules/CheckboxField',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── CheckboxField ──────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With Label (CheckboxField)',
  render: () => (
    <CheckboxField label="Ich stimme den Nutzungsbedingungen zu" />
  ),
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => (
    <CheckboxField
      label="E-Mail-Benachrichtigungen"
      description="Erhalte Updates zu deinen Trainingsfortschritten per E-Mail."
    />
  ),
};

export const CheckedField: Story = {
  name: 'Checked Field',
  render: () => (
    <CheckboxField
      label="Wöchentliche Zusammenfassung"
      description="Erhalte jeden Montag eine Zusammenfassung deiner Trainingswoche."
      defaultChecked
    />
  ),
};

export const DisabledField: Story = {
  name: 'Disabled Field',
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckboxField
        label="Deaktivierte Option"
        description="Diese Option ist nicht verfügbar."
        disabled
      />
      <CheckboxField
        label="Deaktiviert & Ausgewählt"
        disabled
        defaultChecked
      />
    </div>
  ),
};

// ─── Training Analyzer Use Cases ────────────────────────────────────────────

export const TrainingCompleted: Story = {
  name: 'Use Case: Training Completed',
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <CheckboxField
        label="Training als abgeschlossen markieren"
        description="Longrun – 11.07 km – 13.02.2026"
        checked={checked}
        onCheckedChange={(val) => setChecked(val === true)}
      />
    );
  },
};

export const SettingsCheckboxes: Story = {
  name: 'Use Case: Settings',
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)]">
        Benachrichtigungen
      </Heading>
      <CheckboxField
        label="Trainingserinnerungen"
        description="Push-Benachrichtigung vor geplanten Trainings."
        defaultChecked
      />
      <CheckboxField
        label="Wochenzusammenfassung"
        description="Jeden Montag eine Übersicht deiner Trainingswoche."
        defaultChecked
      />
      <CheckboxField
        label="Zielerreichung"
        description="Benachrichtigung bei Erreichen von Trainingszielen."
      />
      <CheckboxField
        label="Neue Features"
        description="Updates zu neuen Funktionen der App."
      />
    </div>
  ),
};

export const DataExportSelection: Story = {
  name: 'Use Case: Data Export',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)]">
        Daten exportieren
      </Heading>
      <CheckboxField label="Trainingseinheiten" defaultChecked />
      <CheckboxField label="Herzfrequenzdaten" defaultChecked />
      <CheckboxField label="Pace-Daten" defaultChecked />
      <CheckboxField label="GPS-Tracks" />
      <CheckboxField label="Kommentare & Notizen" />
    </div>
  ),
};
