import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressField } from './ProgressField';

const meta: Meta = {
  title: 'Molecules/ProgressField',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const WithLabel: Story = {
  name: 'ProgressField mit Label',
  render: () => (
    <div style={{ width: '300px' }}>
      <ProgressField label="Fortschritt" value={65} showValue />
    </div>
  ),
};

export const TrainingGoalProgress: Story = {
  name: 'Training: Ziel-Fortschritt',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '360px' }}>
      <ProgressField
        label="Fortschritt zu Sub-2h Ziel"
        value={75}
        showValue
      />
      <ProgressField
        label="Wöchentliches Kilometerziel"
        value={30}
        max={40}
        showValue
        valueFormat={(v, m) => `${v}/${m} km`}
      />
      <ProgressField
        label="Trainingsplan Fortschritt"
        value={8}
        max={12}
        showValue
        valueFormat={(v, m) => `Woche ${v}/${m}`}
      />
      <ProgressField
        label="VO2max Verbesserung"
        value={90}
        showValue
        color="success"
      />
      <ProgressField
        label="Übertraining Risiko"
        value={85}
        showValue
        color="error"
      />
    </div>
  ),
};
