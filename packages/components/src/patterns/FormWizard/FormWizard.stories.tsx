import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { FormWizard, type FormWizardStep } from './FormWizard';
import { FormField } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof FormWizard> = {
  title: 'Patterns/FormWizard',
  component: FormWizard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Shared Schemas
// ---------------------------------------------------------------------------

const persoenlichSchema = z.object({
  vorname: z.string().min(1, 'Vorname ist erforderlich'),
  nachname: z.string().min(1, 'Nachname ist erforderlich'),
});

const adresseSchema = z.object({
  strasse: z.string().min(1, 'Strasse ist erforderlich'),
  plz: z.string().min(5, 'PLZ muss mindestens 5 Zeichen haben'),
  stadt: z.string().min(1, 'Stadt ist erforderlich'),
});

const accountSchema = z.object({
  email: z.string().email('Ungueltige E-Mail-Adresse'),
  passwort: z
    .string()
    .min(8, 'Mindestens 8 Zeichen')
    .regex(/[A-Z]/, 'Mindestens ein Grossbuchstabe')
    .regex(/[0-9]/, 'Mindestens eine Zahl'),
});

function createRegistrationSteps(): FormWizardStep[] {
  return [
    {
      label: 'Persoenlich',
      description: 'Name eingeben',
      schema: persoenlichSchema,
      fields: ['vorname', 'nachname'],
      content: (form) => (
        <div className="flex flex-col gap-4">
          <FormField name="vorname" label="Vorname">
            <Input placeholder="Max" />
          </FormField>
          <FormField name="nachname" label="Nachname">
            <Input placeholder="Mustermann" />
          </FormField>
        </div>
      ),
    },
    {
      label: 'Adresse',
      description: 'Wohnadresse',
      schema: adresseSchema,
      fields: ['strasse', 'plz', 'stadt'],
      content: (form) => (
        <div className="flex flex-col gap-4">
          <FormField name="strasse" label="Strasse">
            <Input placeholder="Hauptstrasse 1" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField name="plz" label="PLZ">
              <Input placeholder="10115" />
            </FormField>
            <FormField name="stadt" label="Stadt">
              <Input placeholder="Berlin" />
            </FormField>
          </div>
        </div>
      ),
    },
    {
      label: 'Account',
      description: 'Zugangsdaten',
      schema: accountSchema,
      fields: ['email', 'passwort'],
      content: (form) => (
        <div className="flex flex-col gap-4">
          <FormField name="email" label="E-Mail">
            <Input type="email" placeholder="max@example.com" />
          </FormField>
          <FormField
            name="passwort"
            label="Passwort"
            description="Mind. 8 Zeichen, ein Grossbuchstabe, eine Zahl"
          >
            <Input type="password" placeholder="Sicheres Passwort" />
          </FormField>
        </div>
      ),
    },
  ];
}

// ---------------------------------------------------------------------------
// 1. Default — 3-Schritt Registrierung
// ---------------------------------------------------------------------------

export const Default: StoryObj<typeof FormWizard> = {
  name: 'Standard (3 Schritte)',
  render: () => (
    <div className="max-w-2xl">
      <FormWizard
        steps={createRegistrationSteps()}
        onSubmit={(data) => {
          alert(`Registrierung abgeschlossen!\n\n${JSON.stringify(data, null, 2)}`);
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 2. WithSummary — Mit Zusammenfassungsschritt
// ---------------------------------------------------------------------------

export const WithSummary: StoryObj<typeof FormWizard> = {
  name: 'Mit Zusammenfassung',
  render: () => (
    <div className="max-w-2xl">
      <FormWizard
        steps={createRegistrationSteps()}
        onSubmit={(data) => {
          alert(`Registrierung abgeschlossen!\n\n${JSON.stringify(data, null, 2)}`);
        }}
        summaryStep={(data) => (
          <div className="flex flex-col gap-4">
            <h3 className="text-[length:var(--font-component-size-lg)] [font-weight:var(--font-component-weight-semibold)]">
              Bitte pruefen Sie Ihre Angaben
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Vorname
                </span>
                <p>{String(data.vorname || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Nachname
                </span>
                <p>{String(data.nachname || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Strasse
                </span>
                <p>{String(data.strasse || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  PLZ / Stadt
                </span>
                <p>
                  {String(data.plz || '—')} {String(data.stadt || '—')}
                </p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  E-Mail
                </span>
                <p>{String(data.email || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Passwort
                </span>
                <p>{'*'.repeat(String(data.passwort || '').length || 8)}</p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 3. ValidationDemo — Validierungsfehler anzeigen
// ---------------------------------------------------------------------------

export const ValidationDemo: StoryObj<typeof FormWizard> = {
  name: 'Validierung (leer absenden)',
  render: () => (
    <div className="max-w-2xl">
      <p className="mb-4 text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
        Klicken Sie auf &quot;Weiter&quot; ohne Felder auszufuellen, um die Validierungsfehler zu sehen.
      </p>
      <FormWizard
        steps={createRegistrationSteps()}
        onSubmit={(data) => {
          alert(`Formular abgesendet!\n\n${JSON.stringify(data, null, 2)}`);
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// 4. VerticalLayout — Vertikale Ausrichtung
// ---------------------------------------------------------------------------

export const VerticalLayout: StoryObj<typeof FormWizard> = {
  name: 'Vertikal',
  render: () => (
    <div className="max-w-2xl">
      <FormWizard
        steps={createRegistrationSteps()}
        orientation="vertical"
        onSubmit={(data) => {
          alert(`Registrierung abgeschlossen!\n\n${JSON.stringify(data, null, 2)}`);
        }}
      />
    </div>
  ),
};
