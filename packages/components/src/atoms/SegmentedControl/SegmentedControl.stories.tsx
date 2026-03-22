import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { SegmentedControl } from './SegmentedControl';
import { Text } from '../Text';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Atoms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/** Standard SegmentedControl mit drei Segmenten */
export const Default: Story = {
  args: {
    items: [
      { value: 'alle', label: 'Alle' },
      { value: 'aktiv', label: 'Aktiv' },
      { value: 'archiviert', label: 'Archiviert' },
    ],
  },
};

/** Alle drei Groessen im Vergleich */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text variant="muted">sm</Text>
        <SegmentedControl
          size="sm"
          items={[
            { value: 'tag', label: 'Tag' },
            { value: 'woche', label: 'Woche' },
            { value: 'monat', label: 'Monat' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Text variant="muted">md</Text>
        <SegmentedControl
          size="md"
          items={[
            { value: 'tag', label: 'Tag' },
            { value: 'woche', label: 'Woche' },
            { value: 'monat', label: 'Monat' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Text variant="muted">lg</Text>
        <SegmentedControl
          size="lg"
          items={[
            { value: 'tag', label: 'Tag' },
            { value: 'woche', label: 'Woche' },
            { value: 'monat', label: 'Monat' },
          ]}
        />
      </div>
    </div>
  ),
};

/** Gesamtes Control deaktiviert */
export const Disabled: Story = {
  args: {
    disabled: true,
    items: [
      { value: 'alle', label: 'Alle' },
      { value: 'aktiv', label: 'Aktiv' },
      { value: 'archiviert', label: 'Archiviert' },
    ],
    defaultValue: 'aktiv',
  },
};

/** Einzelne Items deaktiviert */
export const DisabledItems: Story = {
  args: {
    items: [
      { value: 'alle', label: 'Alle' },
      { value: 'aktiv', label: 'Aktiv', disabled: true },
      { value: 'archiviert', label: 'Archiviert' },
      { value: 'entwurf', label: 'Entwurf', disabled: true },
    ],
  },
};

/** Kontrollierter Modus mit useState */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('woche');

    return (
      <div className="flex flex-col gap-4">
        <SegmentedControl
          value={value}
          onChange={setValue}
          items={[
            { value: 'tag', label: 'Tag' },
            { value: 'woche', label: 'Woche' },
            { value: 'monat', label: 'Monat' },
            { value: 'jahr', label: 'Jahr' },
          ]}
        />
        <Text variant="muted">
          Ausgewaehlter Wert: {value}
        </Text>
      </div>
    );
  },
};

/** Viele Items */
export const ManyItems: Story = {
  args: {
    items: [
      { value: 'mo', label: 'Mo' },
      { value: 'di', label: 'Di' },
      { value: 'mi', label: 'Mi' },
      { value: 'do', label: 'Do' },
      { value: 'fr', label: 'Fr' },
      { value: 'sa', label: 'Sa' },
      { value: 'so', label: 'So' },
    ],
    defaultValue: 'mo',
  },
};
