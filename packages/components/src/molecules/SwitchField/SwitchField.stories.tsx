import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitchField } from './SwitchField';
import { Heading } from '../../atoms/Heading';

const meta: Meta = {
  title: 'Molecules/SwitchField',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── SwitchField ────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With Label (SwitchField)',
  render: () => (
    <SwitchField label="Dunkel-Modus aktivieren" />
  ),
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => (
    <SwitchField
      label="Auto-Sync"
      description="Trainingseinheiten automatisch mit der Cloud synchronisieren."
    />
  ),
};

export const CheckedField: Story = {
  name: 'Checked Field',
  render: () => (
    <SwitchField
      label="Benachrichtigungen"
      description="Push-Benachrichtigungen für Trainingserinnerungen."
      defaultChecked
    />
  ),
};

export const DisabledField: Story = {
  name: 'Disabled Field',
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <SwitchField
        label="Deaktivierte Option"
        description="Diese Option ist nicht verfügbar."
        disabled
      />
      <SwitchField
        label="Deaktiviert & Aktiv"
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
    <div className="flex flex-col gap-4 max-w-sm">
      <SwitchField label="Aus" />
      <SwitchField label="An" defaultChecked />
      <SwitchField label="Deaktiviert (Aus)" disabled />
      <SwitchField label="Deaktiviert (An)" disabled defaultChecked />
    </div>
  ),
};

// ─── Training Analyzer Use Cases ────────────────────────────────────────────

export const SettingsSwitches: Story = {
  name: 'Use Case: Settings',
  render: () => (
    <div className="flex flex-col gap-5 max-w-md">
      <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)]">
        Einstellungen
      </Heading>
      <SwitchField
        label="Auto-Sync"
        description="Trainings automatisch synchronisieren."
        defaultChecked
      />
      <SwitchField
        label="GPS-Tracking"
        description="Route und Distanz per GPS aufzeichnen."
        defaultChecked
      />
      <SwitchField
        label="Herzfrequenz-Warnung"
        description="Benachrichtigung bei Überschreitung der Zielzone."
      />
      <SwitchField
        label="Dunkelmodus"
        description="Dunkles Farbschema für die gesamte App."
      />
      <SwitchField
        label="Wochenberichte"
        description="Jeden Montag eine Zusammenfassung per E-Mail."
        defaultChecked
      />
    </div>
  ),
};

export const TrainingPrivacy: Story = {
  name: 'Use Case: Training Privacy',
  render: () => (
    <div className="flex flex-col gap-5 max-w-md">
      <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)]">
        Privatsphäre
      </Heading>
      <SwitchField
        label="Profil öffentlich"
        description="Andere Nutzer können dein Profil und deine Statistiken sehen."
      />
      <SwitchField
        label="Trainings teilen"
        description="Trainingseinheiten können von Freunden eingesehen werden."
        defaultChecked
      />
      <SwitchField
        label="Standort anzeigen"
        description="GPS-Koordinaten in geteilten Trainings sichtbar machen."
      />
    </div>
  ),
};

export const NotificationToggles: Story = {
  name: 'Use Case: Notifications',
  render: () => {
    const [push, setPush] = React.useState(true);
    const [email, setEmail] = React.useState(true);
    const [sms, setSms] = React.useState(false);
    return (
      <div className="flex flex-col gap-5 max-w-md">
        <Heading level={3} className="text-sm font-medium text-[var(--color-text-base)]">
          Benachrichtigungskanäle
        </Heading>
        <SwitchField
          label="Push-Benachrichtigungen"
          description="Direkt auf dem Gerät."
          checked={push}
          onCheckedChange={setPush}
        />
        <SwitchField
          label="E-Mail"
          description="Zusammenfassungen und Updates per E-Mail."
          checked={email}
          onCheckedChange={setEmail}
        />
        <SwitchField
          label="SMS"
          description="Wichtige Erinnerungen per SMS."
          checked={sms}
          onCheckedChange={setSms}
        />
      </div>
    );
  },
};
