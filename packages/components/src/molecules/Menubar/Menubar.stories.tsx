import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
} from './Menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Molecules/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menubar>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Datei</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Neues Dokument</MenubarItem>
          <MenubarItem>Oeffnen</MenubarItem>
          <MenubarItem>Speichern</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exportieren</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Drucken</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Bearbeiten</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Rueckgaengig</MenubarItem>
          <MenubarItem>Wiederholen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Ausschneiden</MenubarItem>
          <MenubarItem>Kopieren</MenubarItem>
          <MenubarItem>Einfuegen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Ansicht</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Vergroessern</MenubarItem>
          <MenubarItem>Verkleinern</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Vollbild</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// ─── WithShortcuts ──────────────────────────────────────────────────────────

export const WithShortcuts: Story = {
  name: 'Mit Tastenkuerzeln',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Datei</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Neues Dokument
            <MenubarShortcut>Cmd+N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Oeffnen
            <MenubarShortcut>Cmd+O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Speichern
            <MenubarShortcut>Cmd+S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Exportieren
            <MenubarShortcut>Cmd+Shift+E</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Drucken
            <MenubarShortcut>Cmd+P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Bearbeiten</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Rueckgaengig
            <MenubarShortcut>Cmd+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Wiederholen
            <MenubarShortcut>Cmd+Shift+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Ausschneiden
            <MenubarShortcut>Cmd+X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Kopieren
            <MenubarShortcut>Cmd+C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Einfuegen
            <MenubarShortcut>Cmd+V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

// ─── WithCheckboxItems ──────────────────────────────────────────────────────

export const WithCheckboxItems: Story = {
  name: 'Mit Checkbox-Eintraegen',
  render: () => {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const [showStatusBar, setShowStatusBar] = React.useState(false);
    const [showLineNumbers, setShowLineNumbers] = React.useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Ansicht</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Sichtbarkeit</MenubarLabel>
            <MenubarCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
            >
              Seitenleiste anzeigen
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Statusleiste anzeigen
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showLineNumbers}
              onCheckedChange={setShowLineNumbers}
            >
              Zeilennummern anzeigen
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Vergroessern
              <MenubarShortcut>Cmd++</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Verkleinern
              <MenubarShortcut>Cmd+-</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Datei</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Neues Dokument</MenubarItem>
            <MenubarItem>Oeffnen</MenubarItem>
            <MenubarItem>Speichern</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
