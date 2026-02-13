import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compound form field: Label + Input + Helper/Error. Handles ARIA attributes automatically. Use `errorMessage` for validation feedback, `helperText` for guidance.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name...',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'invalid-email',
    errorMessage: 'Please enter a valid email address.',
    type: 'email',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
      <InputField inputSize="sm" label="Small" placeholder="Small input" helperText="36px height" />
      <InputField inputSize="md" label="Medium" placeholder="Medium input" helperText="40px height – default" />
      <InputField inputSize="lg" label="Large" placeholder="Large input" helperText="44px height" />
    </div>
  ),
};

export const DisabledField: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 'Cannot edit',
    disabled: true,
    helperText: 'This field is not editable.',
  },
};

export const GoalPace: Story = {
  name: 'Training: Ziel-Pace',
  render: () => (
    <div style={{ maxWidth: '240px' }}>
      <InputField
        label="Ziel-Pace"
        defaultValue="5:41"
        helperText="Für Sub-2h Halbmarathon"
      />
    </div>
  ),
};

export const MaxHR: Story = {
  name: 'Training: Max Herzfrequenz',
  render: () => (
    <div style={{ maxWidth: '240px' }}>
      <InputField
        label="Maximale Herzfrequenz"
        type="number"
        defaultValue="185"
        helperText="Wird für Zonen-Berechnung verwendet"
      />
    </div>
  ),
};

export const MaxHRError: Story = {
  name: 'Training: Max HR Error',
  render: () => (
    <div style={{ maxWidth: '240px' }}>
      <InputField
        label="Maximale Herzfrequenz"
        type="number"
        defaultValue="250"
        errorMessage="Wert muss zwischen 120–220 liegen"
      />
    </div>
  ),
};

export const DateFilter: Story = {
  name: 'Training: Datum Filter',
  render: () => (
    <div style={{ maxWidth: '240px' }}>
      <InputField
        label="Von Datum"
        type="date"
      />
    </div>
  ),
};

export const PasswordField: Story = {
  name: 'Password mit Toggle',
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <InputField
        label="Passwort"
        type="password"
        placeholder="Passwort eingeben..."
        helperText="Mindestens 8 Zeichen"
      />
    </div>
  ),
};

export const InlineWithButton: Story = {
  name: 'Inline mit Button',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', maxWidth: '400px' }}>
      <InputField
        label="Suche"
        placeholder="Trainingseinheit suchen..."
        className="flex-1"
      />
      <Button>Suchen</Button>
    </div>
  ),
};
