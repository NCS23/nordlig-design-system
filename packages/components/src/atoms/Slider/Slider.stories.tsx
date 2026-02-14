import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Slider-Komponente fuer Werteauswahl. Unterstuetzt Einzelwert und Bereichsauswahl mit Schritten. Basiert auf Radix UI Slider.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} />,
};

export const WithValue: Story = {
  name: 'Mit Wertanzeige',
  render: () => <Slider defaultValue={[50]} showValue />,
};

export const Range: Story = {
  name: 'Bereich (zwei Regler)',
  render: () => <Slider defaultValue={[25, 75]} showValue />,
};

export const Steps: Story = {
  name: 'Mit Schritten (10er)',
  render: () => <Slider defaultValue={[50]} step={10} showValue />,
};

export const Disabled: Story = {
  name: 'Deaktiviert',
  render: () => <Slider defaultValue={[50]} disabled />,
};

export const HRZoneSlider: Story = {
  name: 'Training: HF-Zonen-Regler',
  render: () => {
    const zones = [
      { label: 'Z1 Regeneration', range: '< 120 bpm', color: '#93c5fd' },
      { label: 'Z2 Grundlage', range: '120-140 bpm', color: '#86efac' },
      { label: 'Z3 Tempo', range: '140-160 bpm', color: '#fcd34d' },
      { label: 'Z4 Schwelle', range: '160-175 bpm', color: '#fca5a5' },
      { label: 'Z5 Maximum', range: '> 175 bpm', color: '#f87171' },
    ];

    const [hrRange, setHrRange] = React.useState([140, 160]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600 }}>
            Herzfrequenz-Bereich
          </p>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
            {hrRange[0]} – {hrRange[1]} bpm
          </p>
        </div>
        <Slider
          value={hrRange}
          onValueChange={setHrRange}
          min={80}
          max={200}
          step={5}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {zones.map((zone) => (
            <span
              key={zone.label}
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: zone.color,
                color: '#1a1a1a',
              }}
            >
              {zone.label}: {zone.range}
            </span>
          ))}
        </div>
      </div>
    );
  },
};
