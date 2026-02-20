import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox';
import { Heading } from '../Heading';
import { Separator } from '../Separator';

const meta: Meta<typeof PopoverContent> = {
  title: 'Atoms/Popover',
  component: PopoverContent,
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
    showArrow: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-20">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Popover component for click-triggered floating content. Built on Radix UI Popover with token-based styling. Supports arrows, configurable sides, and rich content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PopoverContent>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Popover öffnen</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Dies ist ein einfacher Popover mit Textinhalt.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Mit Pfeil</Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <p className="text-sm">Popover mit Pfeil-Indikator.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 items-center justify-items-center" style={{ minHeight: 250 }}>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" showArrow>
          <p className="text-sm">Oben platziert</p>
        </PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" showArrow>
          <p className="text-sm">Links platziert</p>
        </PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" showArrow>
          <p className="text-sm">Rechts platziert</p>
        </PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" showArrow>
          <p className="text-sm">Unten platziert</p>
        </PopoverContent>
      </Popover>
      <div />
    </div>
  ),
};

export const RichContent: Story = {
  name: 'Rich Content',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Details anzeigen</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-2">
          <Heading level={4} className="text-sm font-semibold">Trainingsdetails</Heading>
          <Separator />
          <p className="text-sm opacity-80">
            Hier können detaillierte Informationen zu einem Trainingselement angezeigt werden,
            einschließlich Metriken und Notizen.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const HRZoneInfo: Story = {
  name: 'Training: HR Zone Info',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="cursor-pointer p-0">
          <Badge variant="warning">Z3 Tempo</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" showArrow>
        <div className="flex flex-col gap-2">
          <Heading level={4} className="text-sm font-semibold">Zone 3 – Tempo</Heading>
          <Separator />
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Herzfrequenz</span>
              <span className="font-medium">146–165 bpm</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">% HFmax</span>
              <span className="font-medium">80–89%</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Belastung</span>
              <span className="font-medium">Mittel-Hoch</span>
            </div>
          </div>
          <Separator />
          <p className="text-xs opacity-60">
            Tempobereich für Schwellentraining und intensive Dauerläufe.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const MetricExplanation: Story = {
  name: 'Training: Metric Explanation',
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">VO₂max: 52.3</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full border p-0 text-xs opacity-60 hover:opacity-100 cursor-pointer"
            aria-label="Info zu VO₂max"
          >
            ?
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" side="right" showArrow>
          <div className="flex flex-col gap-2">
            <Heading level={4} className="text-sm font-semibold">VO₂max</Heading>
            <p className="text-sm opacity-80">
              Die maximale Sauerstoffaufnahme (ml/kg/min). Gilt als wichtigster
              Indikator für die aerobe Leistungsfähigkeit.
            </p>
            <Separator />
            <div className="flex flex-col gap-1 text-xs opacity-60">
              <span>Gut: 45–55 · Sehr gut: 55–65 · Elite: &gt;65</span>
              <span>Berechnet aus den letzten 5 Läufen.</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const FilterMenu: Story = {
  name: 'Training: Filter Menu',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">Filter</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex flex-col gap-3">
          <Heading level={4} className="text-sm font-semibold">Filter</Heading>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox defaultChecked />
              <span>Laufen</span>
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox defaultChecked />
              <span>Radfahren</span>
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox />
              <span>Schwimmen</span>
            </Label>
            <Label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox />
              <span>Krafttraining</span>
            </Label>
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm">Zurücksetzen</Button>
            <Button size="sm">Anwenden</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
