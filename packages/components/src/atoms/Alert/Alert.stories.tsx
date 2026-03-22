import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    closeable: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Alert-Komponente für kontextbezogene Hinweise und Nachrichten. Unterstützt vier Varianten (info, success, warning, error) mit automatischen Icons und optionalem Schließen-Button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert variant="info">
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Dies ist ein informativer Hinweis für den Benutzer.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Erfolg</AlertTitle>
        <AlertDescription>
          Die Aktion wurde erfolgreich abgeschlossen.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warnung</AlertTitle>
        <AlertDescription>
          Bitte überprüfen Sie die Eingabe vor dem Fortfahren.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Fehler</AlertTitle>
        <AlertDescription>
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// ─── With Close Button ────────────────────────────────────────────────────────

export const WithCloseButton: Story = {
  name: 'With Close Button',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="info" closeable onClose={() => {}}>
        <AlertTitle>Hinweis</AlertTitle>
        <AlertDescription>
          Diese Nachricht kann geschlossen werden.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// ─── With List Description ──────────────────────────────────────────────────

export const WithListDescription: Story = {
  name: 'With List in Description',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="warning">
        <AlertTitle>Validierungsfehler</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Name ist erforderlich</li>
            <li>E-Mail-Adresse ist ungültig</li>
            <li>Passwort muss mindestens 8 Zeichen lang sein</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// ─── Training Use Cases ───────────────────────────────────────────────────────

export const OvertrainingWarning: Story = {
  name: 'Training: Übertraining Warnung',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="warning">
        <AlertTitle>Übertraining erkannt</AlertTitle>
        <AlertDescription>
          Ihre Belastung der letzten 7 Tage übersteigt den empfohlenen Wert um
          35%. Erwägen Sie einen Regenerationstag.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const ImportError: Story = {
  name: 'Training: Import Fehler',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="error">
        <AlertTitle>Import fehlgeschlagen</AlertTitle>
        <AlertDescription>
          Die CSV-Datei konnte nicht verarbeitet werden. Zeile 14 enthält ein
          ungültiges Datumsformat. Erwartet: DD.MM.YYYY
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const GoalAchieved: Story = {
  name: 'Training: Ziel erreicht',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="success">
        <AlertTitle>Wochenziel erreicht!</AlertTitle>
        <AlertDescription>
          Sie haben Ihr Laufziel von 40 km für diese Woche erfolgreich
          abgeschlossen. Weiter so!
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const FeatureAnnouncement: Story = {
  name: 'Training: Feature Ankündigung',
  render: () => (
    <div className="max-w-lg">
      <Alert variant="info" closeable onClose={() => {}}>
        <AlertTitle>Neues Feature: Herzfrequenz-Zonen</AlertTitle>
        <AlertDescription>
          Ab sofort können Sie Ihre Herzfrequenz-Zonen automatisch aus
          importierten Garmin-Daten berechnen lassen.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
