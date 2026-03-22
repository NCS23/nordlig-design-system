import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';

const meta: Meta<typeof Command> = {
  title: 'Organisms/Command',
  component: Command,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Command-Palette-Komponente fuer schnelle Suche und Navigation. Basiert auf cmdk mit token-basiertem Styling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Suche..." />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
        <CommandItem>Kalender</CommandItem>
        <CommandItem>Einstellungen</CommandItem>
        <CommandItem>Profil</CommandItem>
      </CommandList>
    </Command>
  ),
};

export const WithGroups: Story = {
  name: 'Mit Gruppen',
  render: () => (
    <Command>
      <CommandInput placeholder="Befehl suchen..." />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse.</CommandEmpty>
        <CommandGroup heading="Vorschlaege">
          <CommandItem>Kalender</CommandItem>
          <CommandItem>Emoji suchen</CommandItem>
          <CommandItem>Rechner</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Einstellungen">
          <CommandItem>Profil</CommandItem>
          <CommandItem>Abrechnung</CommandItem>
          <CommandItem>Tastenkuerzel</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Empty: Story = {
  name: 'Leerer Zustand',
  render: () => (
    <Command>
      <CommandInput placeholder="Suche..." value="xyz123" />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
        <CommandItem value="kalender">Kalender</CommandItem>
        <CommandItem value="einstellungen">Einstellungen</CommandItem>
      </CommandList>
    </Command>
  ),
};

export const TrainingCommandPalette: Story = {
  name: 'Training: Command Palette',
  render: () => (
    <Command>
      <CommandInput placeholder="Suche nach Trainingseinheiten..." />
      <CommandList>
        <CommandEmpty>Keine Trainingseinheiten gefunden.</CommandEmpty>
        <CommandGroup heading="Letzte Einheiten">
          <CommandItem>Morgenlauf 10.2 km</CommandItem>
          <CommandItem>Intervalltraining 8x400m</CommandItem>
          <CommandItem>Radfahrt 45 km</CommandItem>
          <CommandItem>Regenerationslauf 5 km</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Aktionen">
          <CommandItem>Neue Einheit erstellen</CommandItem>
          <CommandItem>Training importieren</CommandItem>
          <CommandItem>Wochenplan anzeigen</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Trainingskalender</CommandItem>
          <CommandItem>Statistiken</CommandItem>
          <CommandItem>Einstellungen</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const TrainingQuickSearch: Story = {
  name: 'Training: Schnellsuche',
  render: () => (
    <Command>
      <CommandInput placeholder="Schnellsuche..." />
      <CommandList>
        <CommandEmpty>Nichts gefunden.</CommandEmpty>
        <CommandGroup heading="Sportarten">
          <CommandItem>Laufen</CommandItem>
          <CommandItem>Radfahren</CommandItem>
          <CommandItem>Schwimmen</CommandItem>
          <CommandItem>Krafttraining</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Metriken">
          <CommandItem>VO2max Verlauf</CommandItem>
          <CommandItem>Pace-Entwicklung</CommandItem>
          <CommandItem>HR-Zonen Verteilung</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithShortcuts: Story = {
  name: 'Mit Tastenkuerzeln',
  render: () => (
    <Command>
      <CommandInput placeholder="Befehl eingeben..." />
      <CommandList>
        <CommandEmpty>Kein Befehl gefunden.</CommandEmpty>
        <CommandGroup heading="Aktionen">
          <CommandItem>
            Neues Training
            <CommandShortcut>Ctrl+N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Speichern
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Suche oeffnen
            <CommandShortcut>Ctrl+K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem>
            Dashboard
            <CommandShortcut>Ctrl+D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Einstellungen
            <CommandShortcut>Ctrl+,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
