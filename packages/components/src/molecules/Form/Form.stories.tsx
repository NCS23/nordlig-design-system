import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form, FormField, FormMessage, useZodForm } from './Form';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';
import { Label } from '../../atoms/Label';
import { CheckboxField } from '../CheckboxField';

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
  tags: ['autodocs'],
};

export default meta;

// ---------------------------------------------------------------------------
// 1. Default - Einfaches Formular mit Name + E-Mail
// ---------------------------------------------------------------------------

export const Default: StoryObj = {
  name: 'Standard',
  render: () => {
    const schema = z.object({
      name: z.string().min(1, 'Name ist erforderlich'),
      email: z.string().email('Ungueltige E-Mail-Adresse'),
    });

    function DefaultForm() {
      const form = useZodForm(schema, {
        defaultValues: { name: '', email: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
          className="flex flex-col gap-4 max-w-md"
        >
          <FormField name="name" label="Name">
            <Input placeholder="Max Mustermann" />
          </FormField>
          <FormField name="email" label="E-Mail">
            <Input type="email" placeholder="max@example.com" />
          </FormField>
          <Button type="submit">Absenden</Button>
        </Form>
      );
    }

    return <DefaultForm />;
  },
};

// ---------------------------------------------------------------------------
// 2. WithValidation - Formular mit Validierungsfehlern
// ---------------------------------------------------------------------------

export const WithValidation: StoryObj = {
  name: 'Mit Validierung',
  render: () => {
    const schema = z.object({
      name: z.string().min(1, 'Name ist erforderlich'),
      email: z.string().email('Ungueltige E-Mail-Adresse'),
    });

    function ValidationForm() {
      const form = useZodForm(schema, {
        defaultValues: { name: '', email: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
          className="flex flex-col gap-4 max-w-md"
        >
          <FormField name="name" label="Name">
            <Input placeholder="Pflichtfeld" />
          </FormField>
          <FormField name="email" label="E-Mail">
            <Input type="email" placeholder="muss gueltig sein" />
          </FormField>
          <FormMessage message="Bitte korrigieren Sie die markierten Felder." />
          <Button type="submit">Absenden (leer absenden fuer Fehler)</Button>
        </Form>
      );
    }

    return <ValidationForm />;
  },
};

// ---------------------------------------------------------------------------
// 3. WithDescription - Felder mit Hilfetexten
// ---------------------------------------------------------------------------

export const WithDescription: StoryObj = {
  name: 'Mit Beschreibung',
  render: () => {
    const schema = z.object({
      username: z.string().min(3, 'Mindestens 3 Zeichen'),
      bio: z.string().max(200, 'Maximal 200 Zeichen'),
    });

    function DescriptionForm() {
      const form = useZodForm(schema, {
        defaultValues: { username: '', bio: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
          className="flex flex-col gap-4 max-w-md"
        >
          <FormField
            name="username"
            label="Benutzername"
            description="Mindestens 3 Zeichen, nur Buchstaben und Zahlen"
          >
            <Input placeholder="nordlig_user" />
          </FormField>
          <FormField
            name="bio"
            label="Biografie"
            description="Kurze Beschreibung ueber Sie (max. 200 Zeichen)"
          >
            <Input placeholder="Erzaehlen Sie etwas ueber sich..." />
          </FormField>
          <Button type="submit">Speichern</Button>
        </Form>
      );
    }

    return <DescriptionForm />;
  },
};

// ---------------------------------------------------------------------------
// 4. Training:CreateSession - Trainingseinheit erstellen
// ---------------------------------------------------------------------------

export const TrainingCreateSession: StoryObj = {
  name: 'Training: Einheit erstellen',
  render: () => {
    const sessionSchema = z.object({
      datum: z.string().min(1, 'Datum ist erforderlich'),
      typ: z.string().min(1, 'Bitte waehlen Sie einen Typ'),
      distanz: z.string().min(1, 'Distanz ist erforderlich'),
      dauer: z.string().min(1, 'Dauer ist erforderlich'),
      notizen: z.string().optional(),
    });

    function CreateSessionForm() {
      const form = useZodForm(sessionSchema, {
        defaultValues: { datum: '', typ: '', distanz: '', dauer: '', notizen: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
          className="flex flex-col gap-4 max-w-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField name="datum" label="Datum">
              <Input type="date" />
            </FormField>
            <FormField name="typ" label="Typ" description="Sportart waehlen">
              <Input placeholder="Laufen / Radfahren / Schwimmen" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField name="distanz" label="Distanz (km)">
              <Input type="number" placeholder="0.0" />
            </FormField>
            <FormField name="dauer" label="Dauer (min)">
              <Input type="number" placeholder="0" />
            </FormField>
          </div>
          <FormField name="notizen" label="Notizen" description="Optionale Anmerkungen zur Einheit">
            <Input placeholder="Wie hat sich das Training angefuehlt?" />
          </FormField>
          <Button type="submit">Einheit speichern</Button>
        </Form>
      );
    }

    return <CreateSessionForm />;
  },
};

// ---------------------------------------------------------------------------
// 5. Training:EditProfile - Athletenprofil bearbeiten
// ---------------------------------------------------------------------------

export const TrainingEditProfile: StoryObj = {
  name: 'Training: Profil bearbeiten',
  render: () => {
    const profileSchema = z.object({
      name: z.string().min(1, 'Name ist erforderlich'),
      alter: z.string().min(1, 'Alter ist erforderlich'),
      gewicht: z.string().min(1, 'Gewicht ist erforderlich'),
      ruhepuls: z.string().min(1, 'Ruhepuls ist erforderlich'),
      maximalpuls: z.string().min(1, 'Maximalpuls ist erforderlich'),
    });

    function EditProfileForm() {
      const form = useZodForm(profileSchema, {
        defaultValues: {
          name: 'Max Mustermann',
          alter: '28',
          gewicht: '75',
          ruhepuls: '55',
          maximalpuls: '190',
        },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
          className="flex flex-col gap-4 max-w-lg"
        >
          <FormField name="name" label="Name">
            <Input />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField name="alter" label="Alter" description="In Jahren">
              <Input type="number" />
            </FormField>
            <FormField name="gewicht" label="Gewicht" description="In Kilogramm">
              <Input type="number" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField name="ruhepuls" label="Ruhepuls" description="Schlaege/min in Ruhe">
              <Input type="number" />
            </FormField>
            <FormField name="maximalpuls" label="Maximalpuls" description="Maximale Schlaege/min">
              <Input type="number" />
            </FormField>
          </div>
          <Button type="submit">Profil speichern</Button>
        </Form>
      );
    }

    return <EditProfileForm />;
  },
};

// ---------------------------------------------------------------------------
// 6. ComplexValidation - Benutzerdefinierte Zod-Verfeinerungen
// ---------------------------------------------------------------------------

export const ComplexValidation: StoryObj = {
  name: 'Komplexe Validierung',
  render: () => {
    const passwordSchema = z
      .object({
        passwort: z
          .string()
          .min(8, 'Mindestens 8 Zeichen')
          .regex(/[A-Z]/, 'Mindestens ein Grossbuchstabe')
          .regex(/[0-9]/, 'Mindestens eine Zahl'),
        passwortBestaetigung: z.string().min(1, 'Bitte Passwort bestaetigen'),
      })
      .refine((data) => data.passwort === data.passwortBestaetigung, {
        message: 'Passwoerter stimmen nicht ueberein',
        path: ['passwortBestaetigung'],
      });

    function ComplexForm() {
      const form = useZodForm(passwordSchema, {
        defaultValues: { passwort: '', passwortBestaetigung: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert('Passwort erfolgreich gesetzt!')}
          className="flex flex-col gap-4 max-w-md"
        >
          <FormField
            name="passwort"
            label="Neues Passwort"
            description="Mind. 8 Zeichen, ein Grossbuchstabe, eine Zahl"
          >
            <Input type="password" />
          </FormField>
          <FormField name="passwortBestaetigung" label="Passwort bestaetigen">
            <Input type="password" />
          </FormField>
          <Button type="submit">Passwort setzen</Button>
        </Form>
      );
    }

    return <ComplexForm />;
  },
};

// ---------------------------------------------------------------------------
// 7. LoginForm - Anmeldeformular
// ---------------------------------------------------------------------------

export const LoginForm: StoryObj = {
  name: 'Anmeldeformular',
  render: () => {
    const loginSchema = z.object({
      email: z.string().email('Bitte geben Sie eine gueltige E-Mail ein'),
      passwort: z.string().min(1, 'Passwort ist erforderlich'),
    });

    function Login() {
      const form = useZodForm(loginSchema, {
        defaultValues: { email: '', passwort: '' },
      });

      return (
        <Form
          form={form}
          onSubmit={(data) => alert(`Anmeldung als ${data.email}`)}
          className="flex flex-col gap-4 max-w-sm"
        >
          <FormField name="email" label="E-Mail">
            <Input type="email" placeholder="ihre@email.de" />
          </FormField>
          <FormField name="passwort" label="Passwort">
            <Input type="password" placeholder="Ihr Passwort" />
          </FormField>
          <CheckboxField
            label="Angemeldet bleiben"
          />
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </Form>
      );
    }

    return <Login />;
  },
};

// ---------------------------------------------------------------------------
// 8. DesignTokens - Verwendete Design-Tokens
// ---------------------------------------------------------------------------

export const DesignTokens: StoryObj = {
  name: 'DesignTokens',
  render: () => {
    const tokens = [
      {
        token: '--color-input-text',
        resolved: '#0f172a (Slate 900)',
        usage: 'Label-Textfarbe',
      },
      {
        token: '--color-text-error',
        resolved: '#dc2626 (Red 600)',
        usage: 'Fehlermeldung-Textfarbe (FormField + FormMessage)',
      },
      {
        token: '--color-text-muted',
        resolved: '#64748b (Slate 500)',
        usage: 'Beschreibungstext-Farbe (FormField description)',
      },
    ];

    return (
      <div style={{ maxWidth: 700 }}>
        <Heading level={3} style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
          Form Design Tokens
        </Heading>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Token</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Wert</th>
              <th style={{ textAlign: 'left', padding: '8px 12px' }}>Verwendung</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.token} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13 }}>
                  {t.token}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      backgroundColor: t.resolved.split(' ')[0],
                      border: '1px solid #e2e8f0',
                      verticalAlign: 'middle',
                      marginRight: 8,
                    }}
                  />
                  {t.resolved}
                </td>
                <td style={{ padding: '8px 12px' }}>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 16, fontSize: 13, color: '#64748b' }}>
          Form nutzt primaer die Tokens der eingebetteten Atom-Komponenten (Input, Button, Label).
          Die hier gelisteten Tokens betreffen die Form-spezifischen Elemente: Labels, Fehlermeldungen
          und Beschreibungstexte.
        </p>
      </div>
    );
  },
};
