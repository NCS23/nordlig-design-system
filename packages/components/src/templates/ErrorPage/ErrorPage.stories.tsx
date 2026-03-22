import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ErrorPage } from './ErrorPage';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

const meta: Meta<typeof ErrorPage> = {
  title: 'Templates/ErrorPage',
  component: ErrorPage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

/* ─── Illustration Placeholder ────────────────────────────────────────────── */

const IllustrationPlaceholder = ({ label }: { label: string }) => (
  <div className="flex h-32 w-32 items-center justify-center rounded-[var(--radius-component-lg)] bg-[var(--color-bg-surface)]">
    <Text variant="muted" as="span">
      {label}
    </Text>
  </div>
);

/* ─── Stories ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <ErrorPage
      code="404"
      title="Seite nicht gefunden"
      description="Die angeforderte Seite existiert nicht."
      actions={<Button>Zur Startseite</Button>}
    />
  ),
};

export const NotFound: Story = {
  name: '404',
  render: () => (
    <ErrorPage
      code="404"
      title="Seite nicht gefunden"
      description="Die angeforderte Seite existiert nicht."
      actions={<Button>Zur Startseite</Button>}
    />
  ),
};

export const ServerError: Story = {
  name: '500',
  render: () => (
    <ErrorPage
      code="500"
      title="Serverfehler"
      description="Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es spaeter erneut."
      actions={
        <>
          <Button>Zur Startseite</Button>
          <Button variant="secondary">Erneut versuchen</Button>
        </>
      }
    />
  ),
};

export const Maintenance: Story = {
  name: 'Wartung',
  render: () => (
    <ErrorPage
      title="Wartungsarbeiten"
      description="Wir sind bald zurueck."
      illustration={<IllustrationPlaceholder label="Wartung" />}
    />
  ),
};

export const MitIllustration: Story = {
  name: 'Mit Illustration',
  render: () => (
    <ErrorPage
      code="404"
      title="Seite nicht gefunden"
      description="Die angeforderte Seite existiert nicht."
      illustration={<IllustrationPlaceholder label="404" />}
      actions={<Button>Zur Startseite</Button>}
    />
  ),
};
