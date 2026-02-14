import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Separator> = {
  title: 'Atoms/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Separator component for visually dividing content sections. Renders as an `<hr>` for horizontal orientation and a `<div>` for vertical. Supports decorative (aria-hidden) and semantic (role=separator) modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <p className="text-sm">Oberer Inhalt</p>
      <Separator className="my-4" />
      <p className="text-sm">Unterer Inhalt</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm font-medium">Laufen</span>
      <Separator orientation="vertical" className="h-full" />
      <span className="text-sm font-medium">Radfahren</span>
      <Separator orientation="vertical" className="h-full" />
      <span className="text-sm font-medium">Schwimmen</span>
    </div>
  ),
};

export const InCard: Story = {
  name: 'In Card',
  render: () => (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">Trainingsübersicht</span>
        <span className="text-xs opacity-70">Woche 14 · 2025</span>
      </div>
      <Separator className="my-3" />
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span>Gesamtdistanz</span>
          <span className="font-medium">42.5 km</span>
        </div>
        <div className="flex justify-between">
          <span>Trainingszeit</span>
          <span className="font-medium">4h 15min</span>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="text-xs opacity-60">Letzte Aktualisierung: heute</div>
    </div>
  ),
};

export const InToolbar: Story = {
  name: 'In Toolbar',
  render: () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">Bearbeiten</Button>
      <Button variant="ghost" size="sm">Kopieren</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="ghost" size="sm">Rückgängig</Button>
      <Button variant="ghost" size="sm">Wiederholen</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="ghost" size="sm">Löschen</Button>
    </div>
  ),
};

export const CustomSpacing: Story = {
  name: 'Custom Spacing',
  render: () => (
    <div className="w-full max-w-md">
      <p className="text-sm">Abschnitt mit großem Abstand</p>
      <Separator className="my-8" />
      <p className="text-sm">Nächster Abschnitt</p>
    </div>
  ),
};
