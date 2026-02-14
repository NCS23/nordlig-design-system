import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressField } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>sm (4px)</p>
        <Progress value={60} size="sm" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>md (8px, Standard)</p>
        <Progress value={60} size="md" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>lg (12px)</p>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>default (Sky Blue)</p>
        <Progress value={75} color="default" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>success (Grün)</p>
        <Progress value={75} color="success" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>warning (Amber)</p>
        <Progress value={75} color="warning" />
      </div>
      <div>
        <p style={{ fontSize: '12px', marginBottom: '4px', color: '#475569' }}>error (Rot)</p>
        <Progress value={75} color="error" />
      </div>
    </div>
  ),
};

export const ProgressSteps: Story = {
  name: 'Progress Steps (0–100%)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', width: '36px', color: '#475569' }}>{v}%</span>
          <Progress value={v} style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

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

