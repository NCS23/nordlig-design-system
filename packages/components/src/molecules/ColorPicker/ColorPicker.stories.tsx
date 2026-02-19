import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'color' },
    defaultValue: { control: 'color' },
    showAlpha: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    defaultValue: '#0ea5e9',
  },
};

export const WithAlpha: Story = {
  args: {
    defaultValue: '#0ea5e9',
    showAlpha: true,
  },
};

export const WithSwatches: Story = {
  args: {
    defaultValue: '#0ea5e9',
    swatches: [
      '#ef4444',
      '#f97316',
      '#eab308',
      '#22c55e',
      '#0ea5e9',
      '#6366f1',
      '#a855f7',
      '#ec4899',
      '#000000',
      '#ffffff',
    ],
  },
};

export const FullFeatured: Story = {
  args: {
    defaultValue: '#6366f1',
    showAlpha: true,
    swatches: [
      '#ef4444',
      '#f97316',
      '#eab308',
      '#22c55e',
      '#0ea5e9',
      '#6366f1',
      '#a855f7',
      '#ec4899',
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [color, setColor] = React.useState('#22c55e');
    return (
      <div className="flex flex-col gap-4">
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded border"
            style={{ background: color }}
          />
          <span className="font-mono text-sm">{color}</span>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '#0ea5e9',
    disabled: true,
    swatches: ['#ef4444', '#22c55e', '#0ea5e9'],
  },
};

export const TrainingZoneColors: Story = {
  args: {
    defaultValue: '#22c55e',
    swatches: [
      '#94a3b8', // Zone 1: Recovery (Slate)
      '#3b82f6', // Zone 2: Endurance (Blue)
      '#22c55e', // Zone 3: Tempo (Green)
      '#eab308', // Zone 4: Threshold (Yellow)
      '#ef4444', // Zone 5: VO2max (Red)
    ],
    'aria-label': 'Training zone color',
  },
};
