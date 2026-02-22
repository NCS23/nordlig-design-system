import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { FormWizard, type FormWizardStep } from './FormWizard';
import { FormField, FormFieldController } from '../../molecules/Form/Form';
import { Input } from '../../atoms/Input';
import { Heading } from '../../atoms/Heading';
import { RadioGroup } from '../../molecules/RadioGroup/RadioGroup';
import { Radio } from '../../atoms/Radio/Radio';
import { Slider } from '../../atoms/Slider/Slider';
import { FileUpload } from '../../molecules/FileUpload/FileUpload';
import { Text } from '../../atoms/Text';

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
            <Heading level={3}>
              Bitte pruefen Sie Ihre Angaben
            </Heading>
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

// ---------------------------------------------------------------------------
// 5. ErweiterteFeldtypen — RadioGroup, Slider, FileUpload
// ---------------------------------------------------------------------------

const profilSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  erfahrung: z.string().min(1, 'Erfahrungslevel ist erforderlich'),
});

const trainingsSchema = z.object({
  intensitaet: z.number().min(1, 'Intensitaet muss mindestens 1 sein').max(100),
  dauer: z.number().min(15, 'Mindestens 15 Minuten').max(180),
});

const uploadSchema = z.object({
  notizen: z.string().optional(),
});

function createTrainingSteps(): FormWizardStep[] {
  return [
    {
      label: 'Profil',
      description: 'Grunddaten',
      schema: profilSchema,
      fields: ['name', 'erfahrung'],
      content: () => (
        <div className="flex flex-col gap-4">
          <FormField name="name" label="Name">
            <Input placeholder="Trainingsname" />
          </FormField>
          <FormFieldController
            name="erfahrung"
            label="Erfahrungslevel"
            description="Waehlen Sie Ihr aktuelles Level"
          >
            {(field) => (
              <RadioGroup
                value={field.value as string}
                onValueChange={field.onChange}
                aria-label="Erfahrungslevel"
              >
                <Radio value="anfaenger" label="Anfaenger" description="Erste Schritte" />
                <Radio value="fortgeschritten" label="Fortgeschritten" description="Regelmaessiges Training" />
                <Radio value="profi" label="Profi" description="Wettkampfniveau" />
              </RadioGroup>
            )}
          </FormFieldController>
        </div>
      ),
    },
    {
      label: 'Training',
      description: 'Parameter',
      schema: trainingsSchema,
      fields: ['intensitaet', 'dauer'],
      content: () => (
        <div className="flex flex-col gap-4">
          <FormFieldController
            name="intensitaet"
            label="Intensitaet (%)"
            description="Wie anstrengend soll das Training sein?"
          >
            {(field) => (
              <Slider
                value={[field.value as number]}
                onValueChange={(val) => field.onChange(val[0])}
                min={0}
                max={100}
                step={5}
                showValue
              />
            )}
          </FormFieldController>
          <FormFieldController
            name="dauer"
            label="Dauer (Minuten)"
            description="15 bis 180 Minuten"
          >
            {(field) => (
              <Slider
                value={[field.value as number]}
                onValueChange={(val) => field.onChange(val[0])}
                min={0}
                max={180}
                step={15}
                showValue
              />
            )}
          </FormFieldController>
        </div>
      ),
    },
    {
      label: 'Upload',
      description: 'Dokumente',
      schema: uploadSchema,
      fields: ['notizen'],
      content: () => (
        <div className="flex flex-col gap-4">
          <FormFieldController name="notizen" label="Trainingsplan hochladen">
            {(field) => (
              <FileUpload
                accept=".csv,.pdf,.fit"
                multiple
                onUpload={(files) => {
                  field.onChange(files.map((f) => f.name).join(', '));
                }}
                instructionText="Trainingsdateien hierher ziehen"
                subText="CSV, PDF, FIT"
                aria-label="Trainingsplan hochladen"
              />
            )}
          </FormFieldController>
          <FormField name="notizen" label="Notizen">
            <Input placeholder="Optionale Anmerkungen" />
          </FormField>
        </div>
      ),
    },
  ];
}

export const ErweiterteFeldtypen: StoryObj<typeof FormWizard> = {
  name: 'Erweiterte Feldtypen (RadioGroup, Slider, FileUpload)',
  render: () => (
    <div className="max-w-2xl">
      <Text className="mb-4" variant="muted">
        Demonstriert RadioGroup, Slider und FileUpload als FormWizard-Felder
        via FormFieldController.
      </Text>
      <FormWizard
        steps={createTrainingSteps()}
        onSubmit={(data) => {
          alert(`Training konfiguriert!\n\n${JSON.stringify(data, null, 2)}`);
        }}
        summaryStep={(data) => (
          <div className="flex flex-col gap-4">
            <Heading level={3}>Zusammenfassung</Heading>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Name
                </span>
                <p>{String(data.name || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Erfahrung
                </span>
                <p>{String(data.erfahrung || '—')}</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Intensitaet
                </span>
                <p>{String(data.intensitaet || 0)}%</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Dauer
                </span>
                <p>{String(data.dauer || 0)} Min.</p>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] text-[length:var(--font-component-size-sm)]">
                  Dateien
                </span>
                <p>{String(data.notizen || 'Keine')}</p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  ),
};
