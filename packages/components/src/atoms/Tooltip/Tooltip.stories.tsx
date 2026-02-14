import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    delayDuration: {
      control: 'number',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Dies ist ein Tooltip',
    children: <Button>Hover mich</Button>,
  },
};

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 items-center justify-items-center" style={{ minHeight: 200 }}>
      <div />
      <Tooltip content="Oben" side="top" delayDuration={0}>
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <div />
      <Tooltip content="Links" side="left" delayDuration={0}>
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Rechts" side="right" delayDuration={0}>
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <div />
      <Tooltip content="Unten" side="bottom" delayDuration={0}>
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Herzfrequenz-Zone 2</span>
          <span className="opacity-80">120–145 bpm · Grundlagenausdauer</span>
        </div>
      }
      delayDuration={0}
    >
      <Button variant="ghost">Zone 2 Info</Button>
    </Tooltip>
  ),
};

export const CustomDelay: Story = {
  args: {
    content: 'Erscheint nach 800ms',
    delayDuration: 800,
    children: <Button variant="secondary">Langsamer Tooltip</Button>,
  },
};

export const TrainingAnalyzer: Story = {
  name: 'Training Analyzer: Metriken',
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Durchschnittliche Herzfrequenz der letzten 30 Tage" delayDuration={0}>
        <div className="cursor-help text-sm font-medium">Ø HR: 142 bpm</div>
      </Tooltip>
      <Tooltip content="Gesamtdistanz dieser Woche" delayDuration={0}>
        <div className="cursor-help text-sm font-medium">Distanz: 45.2 km</div>
      </Tooltip>
      <Tooltip content="Geschätzte VO₂max basierend auf den letzten 5 Läufen" delayDuration={0}>
        <div className="cursor-help text-sm font-medium">VO₂max: 52.3</div>
      </Tooltip>
    </div>
  ),
};
