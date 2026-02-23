import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Spotlight,
  type SpotlightGroup,
  Button,
  Card,
  CardBody,
  Kbd,
  Badge,
} from '@nordlig/components';
import {
  Search,
  FileText,
  Settings,
  User,
  BarChart3,
  LogOut,
  Plus,
  Moon,
  HelpCircle,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: App mit Command Palette
   ═══════════════════════════════════════════════════════════════════════════ */

function AppWithSpotlight() {
  const [open, setOpen] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  const handleSelect = (id: string) => {
    setLastAction(id);
    setOpen(false);
  };

  const groups: SpotlightGroup[] = [
    {
      label: 'Schnellaktionen',
      items: [
        { id: 'new-doc', label: 'Neues Dokument', icon: <Plus size={16} />, description: 'Leeres Dokument erstellen', shortcut: 'N', onSelect: () => handleSelect('new-doc') },
        { id: 'search', label: 'Volltextsuche', icon: <Search size={16} />, description: 'In allen Dokumenten suchen', shortcut: 'F', onSelect: () => handleSelect('search') },
      ],
    },
    {
      label: 'Navigation',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} />, onSelect: () => handleSelect('dashboard') },
        { id: 'docs', label: 'Dokumente', icon: <FileText size={16} />, onSelect: () => handleSelect('docs') },
        { id: 'profile', label: 'Profil', icon: <User size={16} />, onSelect: () => handleSelect('profile') },
        { id: 'settings', label: 'Einstellungen', icon: <Settings size={16} />, shortcut: ',', onSelect: () => handleSelect('settings') },
      ],
    },
    {
      label: 'System',
      items: [
        { id: 'theme', label: 'Dark Mode umschalten', icon: <Moon size={16} />, onSelect: () => handleSelect('theme') },
        { id: 'help', label: 'Hilfe & Feedback', icon: <HelpCircle size={16} />, onSelect: () => handleSelect('help') },
        { id: 'logout', label: 'Abmelden', icon: <LogOut size={16} />, onSelect: () => handleSelect('logout') },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <Card elevation="raised" padding="spacious">
        <CardBody className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-lg font-semibold">Command Palette Demo</h2>
          <p className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
            Druecke <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> oder klicke den Button.
          </p>

          <Button variant="secondary" onClick={() => setOpen(true)}>
            <Search size={16} className="mr-2" />
            Suchen...
            <span className="ml-4 flex items-center gap-1">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </span>
          </Button>

          {lastAction && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[length:var(--font-text-small-size)] text-[var(--color-text-muted)]">
                Letzte Aktion:
              </span>
              <Badge variant="info" size="sm">{lastAction}</Badge>
            </div>
          )}
        </CardBody>
      </Card>

      <Spotlight
        groups={groups}
        open={open}
        onOpenChange={setOpen}
        placeholder="Aktion suchen..."
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Recipes/Command Palette',
  parameters: {
    docs: {
      description: {
        component:
          'Zeigt wie Spotlight (Command Palette) in eine App integriert wird. ' +
          'Kombiniert Spotlight, Button, Kbd, Badge und Card. ' +
          'Der globale Keyboard-Shortcut Cmd+K oeffnet die Palette automatisch.',
      },
    },
  },
};
export default meta;

export const MitSpotlight: StoryObj = {
  render: () => <AppWithSpotlight />,
};
