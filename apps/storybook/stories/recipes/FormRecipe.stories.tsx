import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormField,
  FormFieldController,
  useZodForm,
  z,
  Input,
  Select,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TagInput,
  Separator,
} from '@nordlig/components';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Registrierungsformular
   ═══════════════════════════════════════════════════════════════════════════ */

const schema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
  email: z.string().email('Bitte gueltige E-Mail eingeben'),
  role: z.string().min(1, 'Bitte Rolle waehlen'),
  bio: z.string().optional(),
});

function RegistrationForm() {
  const form = useZodForm(schema, {
    defaultValues: { name: '', email: '', role: '', bio: '' },
  });

  const [tags, setTags] = React.useState<string[]>([]);
  const [submitted, setSubmitted] = React.useState<Record<string, unknown> | null>(null);

  return (
    <div style={{ maxWidth: 480 }}>
      <Card elevation="raised" padding="spacious">
        <CardHeader>
          <h2 className="text-[length:var(--font-dialog-title-size)] [font-weight:var(--font-dialog-title-weight)]">
            Neues Konto erstellen
          </h2>
          <p className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
            Fuelle die Felder aus, um dein Profil anzulegen.
          </p>
        </CardHeader>

        <Separator />

        <CardBody>
          <Form
            form={form}
            onSubmit={(data) => setSubmitted({ ...data, skills: tags })}
            className="flex flex-col gap-4"
          >
            <FormField name="name" label="Vollstaendiger Name">
              <Input placeholder="Max Mustermann" />
            </FormField>

            <FormField name="email" label="E-Mail" description="Wird nicht oeffentlich angezeigt.">
              <Input type="email" placeholder="max@example.com" />
            </FormField>

            <FormFieldController name="role" label="Rolle">
              {(field) => (
                <Select
                  options={[
                    { value: 'dev', label: 'Entwickler' },
                    { value: 'design', label: 'Designer' },
                    { value: 'pm', label: 'Projektmanager' },
                  ]}
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Rolle waehlen..."
                />
              )}
            </FormFieldController>

            <div className="flex flex-col gap-[var(--spacing-form-field-gap)]">
              <label className="text-[length:var(--font-form-label-size)] [font-weight:var(--font-form-label-weight)]">
                Skills
              </label>
              <TagInput
                value={tags}
                onChange={setTags}
                placeholder="Skill eingeben..."
                tagVariant="info"
              />
            </div>

            <Separator />

            <Button type="submit" variant="primary" className="w-full">
              Konto erstellen
            </Button>
          </Form>
        </CardBody>

        {submitted && (
          <CardFooter>
            <pre className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)] w-full overflow-auto">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

const meta: Meta<typeof RegistrationForm> = {
  title: 'Recipes/Formular',
  component: RegistrationForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie Form, FormField, FormFieldController, Input, Select, TagInput und Card zusammenspielen. ' +
          'Validierung via Zod, State-Management via react-hook-form.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {};
