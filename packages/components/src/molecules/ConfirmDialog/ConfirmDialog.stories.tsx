import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useConfirm } from './useConfirm';
import { Button } from '../../atoms/Button';

const meta: Meta = {
  title: 'Molecules/ConfirmDialog',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic (Info) ───────────────────────────────────────────────────────────

export const Basic: Story = {
  name: 'Info (Standard)',
  render: () => {
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [result, setResult] = React.useState<string>('');

    const handleClick = async () => {
      const confirmed = await confirm({
        title: 'Daten exportieren?',
        message:
          'Alle Trainingsdaten der letzten 12 Monate werden als CSV-Datei exportiert.',
        variant: 'info',
      });
      setResult(confirmed ? 'Bestaetigt' : 'Abgebrochen');
    };

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={handleClick}>Export starten</Button>
        {result && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Ergebnis: {result}
          </p>
        )}
        <ConfirmDialogComponent />
      </div>
    );
  },
};

// ─── Danger ─────────────────────────────────────────────────────────────────

export const Danger: Story = {
  name: 'Destruktiv (Loeschen)',
  render: () => {
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [result, setResult] = React.useState<string>('');

    const handleClick = async () => {
      const confirmed = await confirm({
        title: 'Training loeschen?',
        message:
          'Moechten Sie das Training vom 13.02.2026 (Longrun, 11.07 km) wirklich loeschen? Diese Aktion kann nicht rueckgaengig gemacht werden.',
        variant: 'danger',
        confirmLabel: 'Endgueltig loeschen',
      });
      setResult(confirmed ? 'Geloescht' : 'Abgebrochen');
    };

    return (
      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={handleClick}>
          Training loeschen
        </Button>
        {result && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Ergebnis: {result}
          </p>
        )}
        <ConfirmDialogComponent />
      </div>
    );
  },
};

// ─── Warning ────────────────────────────────────────────────────────────────

export const Warning: Story = {
  name: 'Warnung',
  render: () => {
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [result, setResult] = React.useState<string>('');

    const handleClick = async () => {
      const confirmed = await confirm({
        title: 'Trainingsziel anpassen?',
        message:
          'Das aktuelle Wochenziel wird ueberschrieben. Bereits protokollierte Einheiten bleiben erhalten.',
        variant: 'warning',
        confirmLabel: 'Ziel anpassen',
      });
      setResult(confirmed ? 'Angepasst' : 'Abgebrochen');
    };

    return (
      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={handleClick}>
          Ziel aendern
        </Button>
        {result && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Ergebnis: {result}
          </p>
        )}
        <ConfirmDialogComponent />
      </div>
    );
  },
};

// ─── Custom Labels ──────────────────────────────────────────────────────────

export const CustomLabels: Story = {
  name: 'Benutzerdefinierte Labels',
  render: () => {
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [result, setResult] = React.useState<string>('');

    const handleClick = async () => {
      const confirmed = await confirm({
        title: 'Aenderungen verwerfen?',
        message:
          'Es gibt ungespeicherte Aenderungen. Moechten Sie diese wirklich verwerfen?',
        variant: 'warning',
        confirmLabel: 'Ja, verwerfen',
        cancelLabel: 'Nein, behalten',
      });
      setResult(confirmed ? 'Verworfen' : 'Behalten');
    };

    return (
      <div className="flex flex-col gap-4">
        <Button variant="ghost" onClick={handleClick}>
          Zurueck (ungespeichert)
        </Button>
        {result && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Ergebnis: {result}
          </p>
        )}
        <ConfirmDialogComponent />
      </div>
    );
  },
};

// ─── Async Action ───────────────────────────────────────────────────────────

export const AsyncAction: Story = {
  name: 'Mit asynchroner Aktion',
  render: () => {
    const { confirm, ConfirmDialogComponent } = useConfirm();
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<string>('');

    const handleClick = async () => {
      const confirmed = await confirm({
        title: 'Account deaktivieren?',
        message:
          'Ihr Account wird deaktiviert. Sie koennen ihn innerhalb von 30 Tagen reaktivieren.',
        variant: 'danger',
        confirmLabel: 'Account deaktivieren',
      });

      if (confirmed) {
        setLoading(true);
        setResult('');
        // Simulierte asynchrone Aktion
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        setResult('Account wurde deaktiviert.');
      } else {
        setResult('Abgebrochen');
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={handleClick} disabled={loading}>
          {loading ? 'Wird deaktiviert...' : 'Account deaktivieren'}
        </Button>
        {result && (
          <p className="text-sm text-[var(--color-text-muted)]">
            Ergebnis: {result}
          </p>
        )}
        <ConfirmDialogComponent />
      </div>
    );
  },
};
