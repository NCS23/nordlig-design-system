import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard';
import { Button } from '../Button';
import { Heading } from '../Heading';

const meta: Meta<typeof HoverCardContent> = {
  title: 'Atoms/HoverCard',
  component: HoverCardContent,
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
          'HoverCard-Komponente fuer Hover-basierte Informationsanzeige. Zeigt zusaetzliche Inhalte beim Hovern ueber ein Trigger-Element. Basiert auf Radix UI HoverCard.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCardContent>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="cursor-pointer underline text-sm font-medium">
          Hover fuer Details
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">Dies ist ein einfacher HoverCard mit Textinhalt.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  name: 'Mit Pfeil',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="cursor-pointer underline text-sm font-medium">
          Mit Pfeil hovern
        </Button>
      </HoverCardTrigger>
      <HoverCardContent showArrow>
        <p className="text-sm">HoverCard mit Pfeil-Indikator.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const AllSides: Story = {
  name: 'Alle Seiten',
  render: () => (
    <div className="grid grid-cols-3 gap-8 items-center justify-items-center" style={{ minHeight: 250 }}>
      <div />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="cursor-pointer underline text-sm">Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" showArrow>
          <p className="text-sm">Oben platziert</p>
        </HoverCardContent>
      </HoverCard>
      <div />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="cursor-pointer underline text-sm">Left</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left" showArrow>
          <p className="text-sm">Links platziert</p>
        </HoverCardContent>
      </HoverCard>
      <div />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="cursor-pointer underline text-sm">Right</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right" showArrow>
          <p className="text-sm">Rechts platziert</p>
        </HoverCardContent>
      </HoverCard>
      <div />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="cursor-pointer underline text-sm">Bottom</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" showArrow>
          <p className="text-sm">Unten platziert</p>
        </HoverCardContent>
      </HoverCard>
      <div />
    </div>
  ),
};

export const AthleteProfile: Story = {
  name: 'Training: Athleten-Profil',
  render: () => (
    <p className="text-sm">
      Letzte Einheit von{' '}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="cursor-pointer underline font-medium">
            Max Mueller
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-64" showArrow>
          <div className="flex flex-col gap-2">
            <Heading level={4}>Max Mueller</Heading>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Sportart</span>
                <span className="font-medium">Laufen / Triathlon</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">VO2max</span>
                <span className="font-medium">52.3 ml/kg/min</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Einheiten/Woche</span>
                <span className="font-medium">5.2</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Letzter Lauf</span>
                <span className="font-medium">Heute, 8:30</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      {' '}war ein Tempolauf ueber 10 km.
    </p>
  ),
};

export const MetricInfo: Story = {
  name: 'Training: Metrik-Info',
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <span className="opacity-70">Pace:</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" className="cursor-pointer font-medium underline">
              4:32/km
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-56" showArrow>
            <div className="flex flex-col gap-1 text-sm">
              <Heading level={4}>Pace-Details</Heading>
              <div className="flex justify-between">
                <span className="opacity-70">Durchschnitt</span>
                <span className="font-medium">4:32/km</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Schnellste</span>
                <span className="font-medium">4:05/km</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Langsamste</span>
                <span className="font-medium">5:12/km</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex items-center gap-1">
        <span className="opacity-70">HF:</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" className="cursor-pointer font-medium underline">
              158 bpm
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-56" showArrow>
            <div className="flex flex-col gap-1 text-sm">
              <Heading level={4}>Herzfrequenz-Details</Heading>
              <div className="flex justify-between">
                <span className="opacity-70">Durchschnitt</span>
                <span className="font-medium">158 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Maximum</span>
                <span className="font-medium">178 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Zone</span>
                <span className="font-medium">Z3 Tempo</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  ),
};
