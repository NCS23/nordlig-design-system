import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem, DescriptionList, DescriptionTerm, DescriptionDetails } from './List';
import { Icon } from '../Icon';
import { Check, Clock, AlertCircle, Activity, Bike, Waves, FileText, ChevronRight } from 'lucide-react';

const meta: Meta<typeof List> = {
  title: 'Atoms/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['none', 'unordered', 'ordered'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
    },
    indent: {
      control: 'boolean',
    },
    as: {
      control: 'select',
      options: ['ul', 'ol'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Semantische Listen-Komponente (ul/ol/dl). `ListItem` unterstuetzt Icon, Action und Description Slots. `DescriptionList` fuer Key-Value-Paare.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <List className="w-full max-w-sm">
      <ListItem>Erstes Element</ListItem>
      <ListItem>Zweites Element</ListItem>
      <ListItem>Drittes Element</ListItem>
    </List>
  ),
};

export const WithIcons: Story = {
  name: 'Mit Icons',
  render: () => (
    <List className="w-full max-w-sm">
      <ListItem icon={<Icon icon={Check} size="sm" className="text-[var(--color-success)]" />}>
        Aufgabe erledigt
      </ListItem>
      <ListItem icon={<Icon icon={Clock} size="sm" className="text-[var(--color-warning)]" />}>
        In Bearbeitung
      </ListItem>
      <ListItem icon={<Icon icon={AlertCircle} size="sm" className="text-[var(--color-error)]" />}>
        Fehler aufgetreten
      </ListItem>
    </List>
  ),
};

export const WithDescriptions: Story = {
  name: 'Mit Beschreibungen',
  render: () => (
    <List gap="md" className="w-full max-w-md">
      <ListItem
        icon={<Icon icon={Activity} size="sm" />}
        description="42.5 km in 4h 15min"
      >
        Lauf-Training
      </ListItem>
      <ListItem
        icon={<Icon icon={Bike} size="sm" />}
        description="85 km in 3h 30min"
      >
        Rad-Training
      </ListItem>
      <ListItem
        icon={<Icon icon={Waves} size="sm" />}
        description="3.2 km in 1h 10min"
      >
        Schwimm-Training
      </ListItem>
    </List>
  ),
};

export const WithActions: Story = {
  name: 'Mit Aktionen',
  render: () => (
    <List className="w-full max-w-md">
      <ListItem
        icon={<Icon icon={FileText} size="sm" />}
        action={<Icon icon={ChevronRight} size="sm" className="text-[var(--color-text-muted)]" />}
        interactive
      >
        Trainingsplan.pdf
      </ListItem>
      <ListItem
        icon={<Icon icon={FileText} size="sm" />}
        action={<Icon icon={ChevronRight} size="sm" className="text-[var(--color-text-muted)]" />}
        interactive
      >
        Ernaehrungsplan.pdf
      </ListItem>
      <ListItem
        icon={<Icon icon={FileText} size="sm" />}
        action={<Icon icon={ChevronRight} size="sm" className="text-[var(--color-text-muted)]" />}
        interactive
      >
        Wettkampfkalender.pdf
      </ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  name: 'Geordnete Liste',
  render: () => (
    <List variant="ordered" indent className="w-full max-w-sm">
      <ListItem>Aufwaermen (10 min)</ListItem>
      <ListItem>Hauptteil (45 min)</ListItem>
      <ListItem>Cool-Down (10 min)</ListItem>
      <ListItem>Dehnen (5 min)</ListItem>
    </List>
  ),
};

export const Unordered: Story = {
  name: 'Ungeordnete Liste',
  render: () => (
    <List variant="unordered" indent className="w-full max-w-sm">
      <ListItem>Laufschuhe</ListItem>
      <ListItem>Trinkflasche</ListItem>
      <ListItem>GPS-Uhr</ListItem>
      <ListItem>Stirnlampe</ListItem>
    </List>
  ),
};

export const DescriptionListStory: Story = {
  name: 'Description List',
  render: () => (
    <DescriptionList gap="md" className="w-full max-w-sm">
      <div>
        <DescriptionTerm>Distanz</DescriptionTerm>
        <DescriptionDetails>42.195 km</DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Zeit</DescriptionTerm>
        <DescriptionDetails>3:45:22</DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Pace</DescriptionTerm>
        <DescriptionDetails>5:20 min/km</DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Herzfrequenz</DescriptionTerm>
        <DescriptionDetails>155 bpm (Durchschnitt)</DescriptionDetails>
      </div>
    </DescriptionList>
  ),
};
