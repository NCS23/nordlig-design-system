import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FileQuestion,
  Search,
  AlertCircle,
  CheckCircle,
  Upload,
} from 'lucide-react';
import { EmptyState } from './EmptyState';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'EmptyState-Komponente für leere Ansichten und Platzhalter. Unterstützt Icon, Titel, Beschreibung und eine optionale Aktion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    icon: <Icon icon={FileQuestion} size={48} strokeWidth={1.5} />,
    title: 'Keine Daten vorhanden',
    description:
      'Es sind noch keine Einträge vorhanden. Beginnen Sie, indem Sie Daten hinzufügen.',
  },
};

// ─── With Action ──────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'With Action',
  render: () => (
    <EmptyState
      icon={<Icon icon={FileQuestion} size={48} strokeWidth={1.5} />}
      title="Keine Einträge"
      description="Erstellen Sie Ihren ersten Eintrag, um loszulegen."
      action={
        <Button variant="primary" size="sm">
          Eintrag erstellen
        </Button>
      }
    />
  ),
};

// ─── No Results ───────────────────────────────────────────────────────────────

export const NoResults: Story = {
  name: 'No Results',
  render: () => (
    <EmptyState
      icon={<Icon icon={Search} size={48} strokeWidth={1.5} />}
      title="Keine Ergebnisse"
      description="Ihre Suche hat keine Treffer ergeben. Versuchen Sie andere Suchbegriffe."
    />
  ),
};

// ─── Error State ──────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'Error State',
  render: () => (
    <EmptyState
      variant="error"
      icon={<Icon icon={AlertCircle} size={48} strokeWidth={1.5} />}
      title="Fehler beim Laden"
      description="Die Daten konnten nicht geladen werden. Bitte versuchen Sie es erneut."
      action={
        <Button variant="secondary" size="sm">
          Erneut versuchen
        </Button>
      }
    />
  ),
};

// ─── Success State ────────────────────────────────────────────────────────────

export const SuccessState: Story = {
  name: 'Success State',
  render: () => (
    <EmptyState
      variant="success"
      icon={<Icon icon={CheckCircle} size={48} strokeWidth={1.5} />}
      title="Alles erledigt!"
      description="Sie haben alle Aufgaben abgeschlossen. Genießen Sie Ihren Erfolg."
    />
  ),
};

// ─── Training Use Cases ───────────────────────────────────────────────────────

export const NoSessions: Story = {
  name: 'Training: Keine Einheiten',
  render: () => (
    <EmptyState
      icon={<Icon icon={Upload} size={48} strokeWidth={1.5} />}
      title="Keine Trainingseinheiten"
      description="Laden Sie eine CSV-Datei hoch, um Ihre Trainingsdaten zu importieren."
      action={
        <Button variant="primary" size="sm">
          CSV hochladen
        </Button>
      }
    />
  ),
};

export const NoSearchResults: Story = {
  name: 'Training: Keine Suchergebnisse',
  render: () => (
    <EmptyState
      icon={<Icon icon={Search} size={48} strokeWidth={1.5} />}
      title="Keine Ergebnisse gefunden"
      description="Für Ihre Filterkriterien wurden keine Trainingseinheiten gefunden."
      action={
        <Button variant="ghost" size="sm">
          Filter zurücksetzen
        </Button>
      }
    />
  ),
};
