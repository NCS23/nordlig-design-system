import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral', 'primary', 'primary-bold', 'accent', 'accent-bold'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Badge component for status indicators and labels. Pill-shaped, inline-friendly, and non-interactive. Use `role="status"` for dynamic status updates.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: { variant: 'success', children: 'Erfolg' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warnung' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Fehler' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Standard' },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primär' },
};

export const PrimaryBold: Story = {
  args: { variant: 'primary-bold', children: 'Primär Kräftig' },
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'Akzent' },
};

export const AccentBold: Story = {
  args: { variant: 'accent-bold', children: 'Akzent Kräftig' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="primary-bold">Primary Bold</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="accent-bold">Accent Bold</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant="info" size="sm">Small</Badge>
      <Badge variant="info" size="md">Medium</Badge>
      <Badge variant="info" size="lg">Large</Badge>
    </div>
  ),
};

export const InlineUsage: Story = {
  name: 'Inline Text',
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Das Training wurde <Badge variant="success" size="sm">erfolgreich</Badge> abgeschlossen
      mit einer Dauer von <Badge variant="info" size="sm">52 min</Badge> und
      einem Puls von <Badge variant="warning" size="sm">165 bpm</Badge>.
    </p>
  ),
};

export const TrainingStatus: Story = {
  name: 'Use Case: Training Status',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '140px', fontSize: '14px' }}>Krafttraining</span>
        <Badge variant="success">Abgeschlossen</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '140px', fontSize: '14px' }}>Intervalle</span>
        <Badge variant="warning">Teilweise</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '140px', fontSize: '14px' }}>Longrun</span>
        <Badge variant="error">Abgebrochen</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '140px', fontSize: '14px' }}>Regeneration</span>
        <Badge variant="info">Geplant</Badge>
      </div>
    </div>
  ),
};

export const HeartRateZones: Story = {
  name: 'Use Case: Heart Rate Zones',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="info" size="sm">Z1 Regeneration</Badge>
      <Badge variant="success" size="sm">Z2 Grundlage</Badge>
      <Badge variant="warning" size="sm">Z3 Tempo</Badge>
      <Badge variant="error" size="sm">Z4 Schwelle</Badge>
      <Badge variant="error" size="sm">Z5 Maximum</Badge>
    </div>
  ),
};

export const WorkoutTypes: Story = {
  name: 'Use Case: Workout Types',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Krafttraining</Badge>
      <Badge variant="accent">Intervalle</Badge>
      <Badge variant="primary">Longrun</Badge>
      <Badge variant="primary">Tempo</Badge>
      <Badge variant="neutral">Mobility</Badge>
    </div>
  ),
};

export const InlineMetrics: Story = {
  name: 'Use Case: Inline Metrics',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
      <p style={{ margin: 0 }}>
        Intervalltraining: <Badge variant="info" size="sm">5×3min</Badge> bei <Badge variant="warning" size="sm">165bpm</Badge>
      </p>
      <p style={{ margin: 0 }}>
        Bankdrücken: <Badge variant="neutral" size="sm">4×8</Badge> mit <Badge variant="success" size="sm">80kg</Badge>
      </p>
      <p style={{ margin: 0 }}>
        Pace: <Badge variant="info" size="sm">4:32/km</Badge> über <Badge variant="neutral" size="sm">21.1km</Badge>
      </p>
    </div>
  ),
};
