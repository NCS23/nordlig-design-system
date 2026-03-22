import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Combobox } from './Combobox';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'next', label: 'Next.js' },
];

const groupedOptions = [
  {
    label: 'Frontend',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    label: 'Meta-Frameworks',
    options: [
      { value: 'next', label: 'Next.js' },
      { value: 'nuxt', label: 'Nuxt' },
      { value: 'remix', label: 'Remix' },
    ],
  },
];

const meta: Meta<typeof Combobox> = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Framework auswählen…',
  },
};

export const WithGroups: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Framework auswählen…',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('react');

    return (
      <div className="flex flex-col gap-4 max-w-sm">
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Framework auswählen…"
        />
        <p className="text-sm text-[var(--color-text-muted)]">
          Ausgewählt: <strong>{value ?? 'Keine Auswahl'}</strong>
        </p>
      </div>
    );
  },
};

export const EmptyMessage: Story = {
  args: {
    options: frameworks,
    emptyMessage: 'Kein Framework gefunden',
    placeholder: 'Framework auswählen…',
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    disabled: true,
    placeholder: 'Deaktiviert',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Combobox
        options={frameworks}
        inputSize="sm"
        placeholder="Klein"
      />
      <Combobox
        options={frameworks}
        inputSize="md"
        placeholder="Mittel"
      />
      <Combobox
        options={frameworks}
        inputSize="lg"
        placeholder="Groß"
      />
    </div>
  ),
};

export const Error: Story = {
  args: {
    options: frameworks,
    error: true,
    placeholder: 'Fehlerhaft',
  },
};
