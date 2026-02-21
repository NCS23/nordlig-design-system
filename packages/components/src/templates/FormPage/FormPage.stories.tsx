import type { Meta, StoryObj } from '@storybook/react';
import { FormPage } from './FormPage';

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
    <label className="text-[length:var(--font-component-size-sm)] text-[var(--color-text-base)]">
      {label}
    </label>
    <div className="h-10 rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)]" />
  </div>
);

const ActionButton = ({
  children,
  variant = 'secondary',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) => (
  <button
    className={`rounded-[var(--radius-component-md)] px-4 py-2 text-[length:var(--font-component-size-sm)] ${
      variant === 'primary'
        ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)]'
        : 'border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] text-[var(--color-text-base)]'
    }`}
  >
    {children}
  </button>
);

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <FormPage>
      <FormPage.Header>
        <h2 className="text-[length:var(--font-formpage-title-size)] [font-weight:var(--font-formpage-title-weight)] text-[var(--color-text-base)]">
          Neues Projekt erstellen
        </h2>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Projektname" />
        <InputPlaceholder label="Beschreibung" />
        <InputPlaceholder label="Kategorie" />
        <InputPlaceholder label="Deadline" />
      </FormPage.Body>
      <FormPage.Actions>
        <ActionButton>Abbrechen</ActionButton>
        <ActionButton variant="primary">Erstellen</ActionButton>
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
        <nav className="text-[length:var(--font-component-size-sm)] text-[var(--color-text-muted)]">
          Projekte / Neues Projekt
        </nav>
        <h2 className="text-[length:var(--font-formpage-title-size)] [font-weight:var(--font-formpage-title-weight)] text-[var(--color-text-base)]">
          Neues Projekt erstellen
        </h2>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Projektname" />
        <InputPlaceholder label="Beschreibung" />
      </FormPage.Body>
      <FormPage.Actions>
        <ActionButton>Abbrechen</ActionButton>
        <ActionButton variant="primary">Speichern</ActionButton>
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
          <p className="mb-2 text-[length:var(--font-component-size-sm)] text-[var(--color-text-muted)]">
            maxWidth=&quot;{size}&quot;
          </p>
          <div className="border border-dashed border-[var(--color-border-muted)] p-4">
            <FormPage maxWidth={size}>
              <FormPage.Header>
                <h2 className="text-[length:var(--font-formpage-title-size)] [font-weight:var(--font-formpage-title-weight)] text-[var(--color-text-base)]">
                  Formular ({size})
                </h2>
              </FormPage.Header>
              <FormPage.Body>
                <InputPlaceholder label="Feld 1" />
                <InputPlaceholder label="Feld 2" />
              </FormPage.Body>
              <FormPage.Actions>
                <ActionButton variant="primary">Speichern</ActionButton>
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
        <nav className="text-[length:var(--font-component-size-sm)] text-[var(--color-text-muted)]">
          Einstellungen / Profil
        </nav>
        <h2 className="text-[length:var(--font-formpage-title-size)] [font-weight:var(--font-formpage-title-weight)] text-[var(--color-text-base)]">
          Profil bearbeiten
        </h2>
      </FormPage.Header>
      <FormPage.Body>
        <InputPlaceholder label="Vorname" />
        <InputPlaceholder label="Nachname" />
        <InputPlaceholder label="E-Mail" />
        <InputPlaceholder label="Abteilung" />
      </FormPage.Body>
      <FormPage.Actions>
        <ActionButton>Abbrechen</ActionButton>
        <ActionButton variant="primary">Aenderungen speichern</ActionButton>
      </FormPage.Actions>
    </FormPage>
  ),
};
