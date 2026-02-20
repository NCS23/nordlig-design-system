import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { Select } from '../Select';
import { SearchInput } from '../SearchInput';
import { ChevronDown, Settings, MessageSquare } from 'lucide-react';

const meta: Meta<typeof Collapsible> = {
  title: 'Molecules/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible-Komponente zum Ein- und Ausblenden von Inhalten. Basiert auf Radix UI Collapsible mit Animationen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="max-w-sm">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="flex w-full items-center justify-between">
          Mehr anzeigen
          <Icon icon={ChevronDown} size={16} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-md border p-4 text-sm">
          Dieser Inhalt kann ein- und ausgeklappt werden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  name: 'Standard geoeffnet',
  render: () => (
    <Collapsible defaultOpen className="max-w-sm">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="flex w-full items-center justify-between">
          Details
          <Icon icon={ChevronDown} size={16} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-md border p-4 text-sm">
          Dieser Bereich ist standardmaessig geoeffnet und kann zugeklappt werden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  name: 'Kontrolliert',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="max-w-sm space-y-2">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen(true)}
          >
            Oeffnen
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Schliessen
          </Button>
        </div>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="flex w-full items-center justify-between">
              Kontrollierter Bereich
              <span className="text-xs opacity-60">{open ? 'Offen' : 'Geschlossen'}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 rounded-md border p-4 text-sm">
              Dieser Bereich wird extern kontrolliert.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const TrainingAdvancedFilters: Story = {
  name: 'Training: Erweiterte Filter',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="max-w-md space-y-3">
        <div className="flex items-center gap-2">
          <SearchInput
            placeholder="Trainingseinheiten suchen..."
            className="flex-1"
          />
          <Button variant="secondary">
            Suchen
          </Button>
        </div>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Icon icon={Settings} size={14} />
              Erweiterte Filter {open ? 'ausblenden' : 'anzeigen'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-md border p-3">
              <div className="flex flex-col gap-1">
                <Label>Sportart</Label>
                <Select
                  options={[
                    { value: 'alle', label: 'Alle' },
                    { value: 'laufen', label: 'Laufen' },
                    { value: 'radfahren', label: 'Radfahren' },
                    { value: 'schwimmen', label: 'Schwimmen' },
                  ]}
                  placeholder="Alle"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Zeitraum</Label>
                <Select
                  options={[
                    { value: '7', label: 'Letzte 7 Tage' },
                    { value: '30', label: 'Letzte 30 Tage' },
                    { value: '90', label: 'Letzte 90 Tage' },
                  ]}
                  placeholder="Letzte 7 Tage"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Min. Distanz (km)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Max. HR (bpm)</Label>
                <Input type="number" placeholder="200" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const TrainingSessionNotes: Story = {
  name: 'Training: Session-Notizen',
  render: () => (
    <div className="max-w-md rounded-md border p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Heading level={3}>Morgenlauf</Heading>
          <span className="text-xs text-slate-500">14.02.2026</span>
        </div>
        <div className="flex gap-4 text-sm">
          <span>10.2 km</span>
          <span>52:30 min</span>
          <span>155 bpm</span>
        </div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-1 flex items-center gap-1">
              <Icon icon={MessageSquare} size={12} />
              Notizen anzeigen
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-900">
              <p>Gutes Gefuehl heute, trotz leichtem Regen. Die letzten 2 km bewusst schneller gelaufen. Beine fuehlen sich frisch an, kann morgen Intervalle machen.</p>
              <p className="mt-2 text-xs text-slate-400">RPE: 6/10 | Schlaf: 7.5h | Gewicht: 73.2 kg</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  ),
};
