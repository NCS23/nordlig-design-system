import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxField } from './Checkbox';

const meta: Meta = {
  title: 'Atoms/Checkbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => <Checkbox />,
};

export const Checked: Story = {
  render: () => <Checkbox defaultChecked />,
};

export const Unchecked: Story = {
  render: () => <Checkbox />,
};

export const Indeterminate: Story = {
  render: () => <Checkbox checked="indeterminate" />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
    </div>
  ),
};

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

// ─── All States ─────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Checkbox />
        <span className="text-sm text-[var(--color-text-muted)]">Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked />
        <span className="text-sm text-[var(--color-text-muted)]">Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox checked="indeterminate" />
        <span className="text-sm text-[var(--color-text-muted)]">Indeterminate</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled />
        <span className="text-sm text-[var(--color-text-muted)]">Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled defaultChecked />
        <span className="text-sm text-[var(--color-text-muted)]">Disabled Checked</span>
      </div>
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
      <h3 className="text-sm font-medium text-[var(--color-text-base)]">
        Benachrichtigungen
      </h3>
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
      <h3 className="text-sm font-medium text-[var(--color-text-base)]">
        Daten exportieren
      </h3>
      <CheckboxField label="Trainingseinheiten" defaultChecked />
      <CheckboxField label="Herzfrequenzdaten" defaultChecked />
      <CheckboxField label="Pace-Daten" defaultChecked />
      <CheckboxField label="GPS-Tracks" />
      <CheckboxField label="Kommentare & Notizen" />
    </div>
  ),
};
