import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
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
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Numerisches Eingabefeld mit +/- Stepper-Buttons. Unterstuetzt min/max, step, Keyboard (ArrowUp/Down) und Mouse-Wheel. Praezise Dezimalberechnung ohne Floating-Point-Fehler.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};

export const WithMinMax: Story = {
  name: 'Min / Max',
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
  },
};

export const WithStep: Story = {
  name: 'Custom Step (5)',
  args: {
    defaultValue: 0,
    step: 5,
    min: 0,
    max: 100,
  },
};

export const DecimalStep: Story = {
  name: 'Dezimal-Step (0.1)',
  args: {
    defaultValue: 0,
    step: 0.1,
    min: 0,
    max: 1,
  },
};

export const Error: Story = {
  args: {
    defaultValue: -1,
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 42,
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '200px' }}>
      <NumberInput inputSize="sm" defaultValue={0} />
      <NumberInput inputSize="md" defaultValue={0} />
      <NumberInput inputSize="lg" defaultValue={0} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(10);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '200px' }}>
        <NumberInput value={value} onChange={setValue} min={0} max={20} />
        <p style={{ fontSize: '14px', color: '#666' }}>Wert: {value}</p>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '200px' }}>
      <NumberInput defaultValue={5} />
      <NumberInput defaultValue={5} error />
      <NumberInput defaultValue={5} disabled />
      <NumberInput defaultValue={0} min={0} max={10} />
    </div>
  ),
};
