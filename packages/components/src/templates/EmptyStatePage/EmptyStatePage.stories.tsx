import type { Meta, StoryObj } from '@storybook/react';
import { EmptyStatePage } from './EmptyStatePage';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

const meta: Meta<typeof EmptyStatePage> = {
  title: 'Templates/EmptyStatePage',
  component: EmptyStatePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyStatePage>;

/* ─── Platzhalter-Illustration ────────────────────────────────────────────── */

const IllustrationPlaceholder = () => (
  <div className="flex h-24 w-24 items-center justify-center rounded-[var(--radius-component-lg)] bg-[var(--color-bg-surface)]">
    <Text className="text-[var(--color-text-muted)]">Illustration</Text>
  </div>
);

/* ─── Keine Daten ─────────────────────────────────────────────────────────── */

export const KeineDaten: Story = {
  name: 'Keine Daten',
  render: () => (
    <EmptyStatePage
      title="Keine Daten vorhanden"
      description="Es sind noch keine Eintraege vorhanden."
      actions={<Button>Erstellen</Button>}
    />
  ),
};

/* ─── Keine Ergebnisse ────────────────────────────────────────────────────── */

export const KeineErgebnisse: Story = {
  name: 'Keine Ergebnisse',
  render: () => (
    <EmptyStatePage
      title="Keine Ergebnisse"
      description="Deine Suche ergab keine Treffer. Versuche andere Suchbegriffe."
      actions={<Button variant="secondary">Filter zuruecksetzen</Button>}
    />
  ),
};

/* ─── Erste Nutzung ───────────────────────────────────────────────────────── */

export const ErsteNutzung: Story = {
  name: 'Erste Nutzung',
  render: () => (
    <EmptyStatePage
      title="Willkommen!"
      description="Erstelle dein erstes Projekt um loszulegen."
      illustration={<IllustrationPlaceholder />}
      actions={<Button variant="primary">Projekt erstellen</Button>}
    />
  ),
};

/* ─── Mit Illustration ────────────────────────────────────────────────────── */

export const MitIllustration: Story = {
  name: 'Mit Illustration',
  render: () => (
    <EmptyStatePage
      title="Keine Eintraege"
      description="Hier werden deine Eintraege angezeigt, sobald welche vorhanden sind."
      illustration={<IllustrationPlaceholder />}
    />
  ),
};
