import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

/**
 * Stern-Bewertungskomponente mit Unterstuetzung fuer halbe Sterne,
 * Tastaturnavigation und verschiedene Groessen.
 */
const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    readOnly: {
      control: 'boolean',
    },
    precision: {
      control: 'select',
      options: [0.5, 1],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Bewertungskomponente mit Sternen. Unterstuetzt interaktiven und Read-only-Modus, halbe Sterne, Tastatursteuerung (Pfeiltasten, Home, End) und anpassbare Maximalwerte.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

/** Standard-Bewertung mit 3 von 5 Sternen */
export const Default: Story = {
  args: {
    value: 3,
  },
};

/** Nur-Lese-Modus — keine Interaktion moeglich */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 4,
  },
};

/** Halbe Sterne mit precision=0.5 */
export const HalfStars: Story = {
  args: {
    precision: 0.5,
    value: 3.5,
  },
};

/** Alle drei Groessen nebeneinander */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Rating value={3} size="sm" readOnly />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>sm</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Rating value={3} size="md" readOnly />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>md</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Rating value={3} size="lg" readOnly />
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#475569' }}>lg</p>
      </div>
    </div>
  ),
};

/** Erweiterter Maximalwert mit 10 Sternen */
export const CustomMax: Story = {
  args: {
    max: 10,
    value: 7,
  },
};

/** Interaktives Beispiel mit useState fuer kontrollierte Wertaenderung */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Rating value={value} onChange={setValue} />
        <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
          Bewertung: {value} von 5
        </p>
      </div>
    );
  },
};
