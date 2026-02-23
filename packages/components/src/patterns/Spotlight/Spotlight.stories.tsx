import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  FileText,
  Settings,
  User,
  Home,
  Search,
  Plus,
  LogOut,
} from 'lucide-react';
import { Spotlight, useSpotlight } from './Spotlight';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

const meta = {
  title: 'Patterns/Spotlight',
  component: Spotlight,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spotlight>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample Data ─────────────────────────────────────────────────────────────

const sampleGroups = [
  {
    label: 'Aktionen',
    items: [
      {
        id: 'new-project',
        label: 'Neues Projekt',
        icon: <Icon icon={Plus} size="sm" />,
        shortcut: 'Ctrl+N',
        onSelect: () => console.log('Neues Projekt'),
      },
      {
        id: 'search',
        label: 'Suche',
        icon: <Icon icon={Search} size="sm" />,
        shortcut: 'Ctrl+F',
        onSelect: () => console.log('Suche'),
      },
      {
        id: 'settings',
        label: 'Einstellungen',
        icon: <Icon icon={Settings} size="sm" />,
        shortcut: 'Ctrl+,',
        onSelect: () => console.log('Einstellungen'),
      },
      {
        id: 'logout',
        label: 'Abmelden',
        icon: <Icon icon={LogOut} size="sm" />,
        onSelect: () => console.log('Abmelden'),
      },
    ],
  },
  {
    label: 'Navigation',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Uebersicht aller Projekte',
        icon: <Icon icon={Home} size="sm" />,
        keywords: ['home', 'start', 'uebersicht'],
        onSelect: () => console.log('Dashboard'),
      },
      {
        id: 'profile',
        label: 'Profil',
        description: 'Benutzereinstellungen',
        icon: <Icon icon={User} size="sm" />,
        keywords: ['account', 'benutzer'],
        onSelect: () => console.log('Profil'),
      },
      {
        id: 'docs',
        label: 'Dokumentation',
        icon: <Icon icon={FileText} size="sm" />,
        onSelect: () => console.log('Docs'),
      },
    ],
  },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const { open, setOpen } = useSpotlight();
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ marginBottom: 16, color: 'var(--color-text-muted)' }}>
          Druecke Cmd+K oder klicke den Button
        </p>
        <Button onClick={() => setOpen(true)}>
          <Icon icon={Search} size="sm" />
          Suche oeffnen
        </Button>
        <Spotlight
          groups={sampleGroups}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
  args: {
    groups: sampleGroups,
  },
};

export const AlwaysOpen: Story = {
  args: {
    groups: sampleGroups,
    open: true,
    placeholder: 'Aktion oder Seite suchen…',
  },
};

export const EmptyGroups: Story = {
  args: {
    groups: [{ label: 'Leer', items: [] }],
    open: true,
    emptyMessage: 'Keine Aktionen verfuegbar',
  },
};

export const WithDisabledItems: Story = {
  args: {
    groups: [
      {
        label: 'Aktionen',
        items: [
          { id: '1', label: 'Aktiv', onSelect: () => {} },
          { id: '2', label: 'Deaktiviert', disabled: true, onSelect: () => {} },
          { id: '3', label: 'Auch aktiv', onSelect: () => {} },
        ],
      },
    ],
    open: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    groups: sampleGroups,
    open: true,
    placeholder: 'Was moechtest du tun?',
  },
};
