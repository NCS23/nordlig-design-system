import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { Form, FormField, FormMessage, useZodForm } from './Form';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

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
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="h-4 w-4" />
            <label htmlFor="remember" className="text-sm text-[var(--color-text-muted)]">
              Angemeldet bleiben
            </label>
          </div>
          <Button type="submit" className="w-full">
            Anmelden
          </Button>
        </Form>
      );
    }

    return <Login />;
  },
};
