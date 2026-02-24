import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormWizard,
  Input,
  Select,
  Heading,
  Text,
  Badge,
  z,
} from '@nordlig/components';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Onboarding-Wizard
   ═══════════════════════════════════════════════════════════════════════════ */

const steps = [
  {
    label: 'Persoenliches',
    description: 'Name und Kontakt',
    schema: z.object({
      name: z.string().min(2, 'Mindestens 2 Zeichen'),
      email: z.string().email('Gueltige E-Mail eingeben'),
    }),
    fields: ['name', 'email'],
    content: (form: UseFormReturn<FieldValues>) => (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
          <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
            Name
          </label>
          <Input
            placeholder="Dein vollstaendiger Name"
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <Text variant="small" className="text-[var(--color-text-error)]">
              {form.formState.errors.name.message as string}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
          <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
            E-Mail
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <Text variant="small" className="text-[var(--color-text-error)]">
              {form.formState.errors.email.message as string}
            </Text>
          )}
        </div>
      </div>
    ),
  },
  {
    label: 'Training',
    description: 'Erfahrung und Ziele',
    schema: z.object({
      level: z.string().min(1, 'Bitte Level waehlen'),
      goal: z.string().min(1, 'Bitte Ziel waehlen'),
    }),
    fields: ['level', 'goal'],
    content: (form: UseFormReturn<FieldValues>) => (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
          <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
            Erfahrungslevel
          </label>
          <Select
            options={[
              { value: 'beginner', label: 'Anfaenger (< 1 Jahr)' },
              { value: 'intermediate', label: 'Fortgeschritten (1-3 Jahre)' },
              { value: 'advanced', label: 'Erfahren (3+ Jahre)' },
            ]}
            value={form.watch('level') || ''}
            onChange={(v) => form.setValue('level', v, { shouldValidate: true })}
            placeholder="Level waehlen..."
          />
          {form.formState.errors.level && (
            <Text variant="small" className="text-[var(--color-text-error)]">
              {form.formState.errors.level.message as string}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
          <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
            Trainingsziel
          </label>
          <Select
            options={[
              { value: '5k', label: '5 km Lauf' },
              { value: '10k', label: '10 km Lauf' },
              { value: 'half', label: 'Halbmarathon' },
              { value: 'marathon', label: 'Marathon' },
            ]}
            value={form.watch('goal') || ''}
            onChange={(v) => form.setValue('goal', v, { shouldValidate: true })}
            placeholder="Ziel waehlen..."
          />
          {form.formState.errors.goal && (
            <Text variant="small" className="text-[var(--color-text-error)]">
              {form.formState.errors.goal.message as string}
            </Text>
          )}
        </div>
      </div>
    ),
  },
  {
    label: 'Zeitplan',
    description: 'Wann und wie oft',
    schema: z.object({
      frequency: z.string().min(1, 'Bitte Haeufigkeit waehlen'),
    }),
    fields: ['frequency'],
    content: (form: UseFormReturn<FieldValues>) => (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
          <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
            Trainings pro Woche
          </label>
          <Select
            options={[
              { value: '2', label: '2x pro Woche' },
              { value: '3', label: '3x pro Woche' },
              { value: '4', label: '4x pro Woche' },
              { value: '5', label: '5x pro Woche' },
            ]}
            value={form.watch('frequency') || ''}
            onChange={(v) => form.setValue('frequency', v, { shouldValidate: true })}
            placeholder="Haeufigkeit waehlen..."
          />
          {form.formState.errors.frequency && (
            <Text variant="small" className="text-[var(--color-text-error)]">
              {form.formState.errors.frequency.message as string}
            </Text>
          )}
        </div>
      </div>
    ),
  },
];

function OnboardingWizardPage() {
  const [result, setResult] = React.useState<Record<string, unknown> | null>(null);

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="flex flex-col gap-3 mb-8">
        <Heading level={2}>Trainingsplan einrichten</Heading>
        <Text variant="muted">
          Richte in 3 Schritten deinen persoenlichen Trainingsplan ein.
        </Text>
      </div>

      <FormWizard
        steps={steps}
        onSubmit={(data) => setResult(data)}
        summaryStep={(data) => (
          <div className="flex flex-col gap-8 p-4">
            <Heading level={4}>Zusammenfassung</Heading>

            <div className="flex flex-col gap-6">
              <div className="flex items-baseline justify-between py-3 border-b border-[var(--color-border-muted)]">
                <Text variant="muted">Name</Text>
                <Text className="font-medium">{data.name as string}</Text>
              </div>
              <div className="flex items-baseline justify-between py-3 border-b border-[var(--color-border-muted)]">
                <Text variant="muted">E-Mail</Text>
                <Text className="font-medium">{data.email as string}</Text>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-muted)]">
                <Text variant="muted">Erfahrungslevel</Text>
                <Badge variant="info" size="sm">{data.level as string}</Badge>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-muted)]">
                <Text variant="muted">Trainingsziel</Text>
                <Badge variant="success" size="sm">{data.goal as string}</Badge>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <Text variant="muted">Trainings pro Woche</Text>
                <Text className="font-medium">{data.frequency as string}x</Text>
              </div>
            </div>
          </div>
        )}
      />

      {result && (
        <div className="mt-12 flex flex-col gap-5 p-8 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]">
          <div className="flex items-center gap-4">
            <Badge variant="success">Fertig!</Badge>
            <Text variant="muted">Onboarding abgeschlossen</Text>
          </div>
          <pre className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)] overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof OnboardingWizardPage> = {
  title: 'Recipes/Onboarding',
  component: OnboardingWizardPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie FormWizard, Input, Select und Badge ' +
          'ein mehrstufiges Onboarding mit Validierung pro Schritt aufbauen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof OnboardingWizardPage>;

export const Default: Story = {};
