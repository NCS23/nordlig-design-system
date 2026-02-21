import type { Meta, StoryObj } from '@storybook/react';
import { FormPage } from './FormPage';
import { Heading } from '../../atoms/Heading';
import { Button } from '../../atoms/Button';
import { Label } from '../../atoms/Label';
import { Text } from '../../atoms/Text';

const meta: Meta<typeof FormPage> = {
  title: 'Templates/FormPage',
  component: FormPage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FormPage>;

/* ─── Platzhalter ────────────────────────────────────────────────────────── */

const InputPlaceholder = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-1">
    <Label>{label}</Label>
    <div className="h-10 rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)]" />
  </div>
);

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <FormPage>
      <FormPage.Header>
        <Heading level={2}>Neues Projekt erstellen</Heading>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Projektname" />
        <InputPlaceholder label="Beschreibung" />
        <InputPlaceholder label="Kategorie" />
        <InputPlaceholder label="Deadline" />
      </FormPage.Body>
      <FormPage.Actions>
        <Button variant="secondary">Abbrechen</Button>
        <Button variant="primary">Erstellen</Button>
      </FormPage.Actions>
    </FormPage>
  ),
};

/* ─── Mit Breadcrumbs ────────────────────────────────────────────────────── */

export const MitBreadcrumbs: Story = {
  name: 'Mit Breadcrumbs',
  render: () => (
    <FormPage>
      <FormPage.Header>
        <Text variant="muted">
          Projekte / Neues Projekt
        </Text>
        <Heading level={2}>Neues Projekt erstellen</Heading>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Projektname" />
        <InputPlaceholder label="Beschreibung" />
      </FormPage.Body>
      <FormPage.Actions>
        <Button variant="secondary">Abbrechen</Button>
        <Button variant="primary">Speichern</Button>
      </FormPage.Actions>
    </FormPage>
  ),
};

/* ─── MaxWidth-Varianten ─────────────────────────────────────────────────── */

export const MaxWidthVarianten: Story = {
  name: 'MaxWidth-Varianten',
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <Text variant="muted" className="mb-2">
            maxWidth=&quot;{size}&quot;
          </Text>
          <div className="border border-dashed border-[var(--color-border-muted)] p-4">
            <FormPage maxWidth={size}>
              <FormPage.Header>
                <Heading level={2}>Formular ({size})</Heading>
              </FormPage.Header>
              <FormPage.Body>
                <InputPlaceholder label="Feld 1" />
                <InputPlaceholder label="Feld 2" />
              </FormPage.Body>
              <FormPage.Actions>
                <Button variant="primary">Speichern</Button>
              </FormPage.Actions>
            </FormPage>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ─── Bearbeiten ─────────────────────────────────────────────────────────── */

export const Bearbeiten: Story = {
  name: 'Bearbeiten (Edit-Modus)',
  render: () => (
    <FormPage>
      <FormPage.Header>
        <Text variant="muted">
          Einstellungen / Profil
        </Text>
        <Heading level={2}>Profil bearbeiten</Heading>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Vorname" />
        <InputPlaceholder label="Nachname" />
        <InputPlaceholder label="E-Mail" />
        <InputPlaceholder label="Abteilung" />
      </FormPage.Body>
      <FormPage.Actions>
        <Button variant="secondary">Abbrechen</Button>
        <Button variant="primary">Aenderungen speichern</Button>
      </FormPage.Actions>
    </FormPage>
  ),
};
