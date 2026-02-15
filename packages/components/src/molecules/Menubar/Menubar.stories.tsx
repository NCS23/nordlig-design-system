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

// ─── DesignTokens ───────────────────────────────────────────────────────────

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Menubar-spezifische Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Wert</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-menubar-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Hintergrundfarbe der Menuleiste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-menubar-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Rahmenfarbe der Menuleiste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-menubar-trigger-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Textfarbe der Trigger-Buttons</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-menubar-trigger-hover-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Hover-Hintergrund der Trigger</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-menubar-trigger-active-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Hintergrund bei geoeffnetem Menue</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-menubar-bar</td>
            <td className="py-2 pr-4 font-mono text-xs">6px</td>
            <td className="py-2 pr-4">Eckenradius der Menuleiste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-menubar-item</td>
            <td className="py-2 pr-4 font-mono text-xs">4px</td>
            <td className="py-2 pr-4">Eckenradius der Trigger-Buttons</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-menubar-padding</td>
            <td className="py-2 pr-4 font-mono text-xs">4px</td>
            <td className="py-2 pr-4">Innenabstand der Menuleiste</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-menubar-trigger-padding-x</td>
            <td className="py-2 pr-4 font-mono text-xs">12px</td>
            <td className="py-2 pr-4">Horizontaler Innenabstand der Trigger</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-menubar-trigger-padding-y</td>
            <td className="py-2 pr-4 font-mono text-xs">4px</td>
            <td className="py-2 pr-4">Vertikaler Innenabstand der Trigger</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-[var(--color-dropdown-label-text)]">
        Menubar verwendet zusaetzlich alle L4-Tokens von DropdownMenu fuer die
        Dropdown-Inhalte (Content, Item, Separator, Label, Shadow, Radius, Spacing).
        Siehe DropdownMenu DesignTokens fuer die vollstaendige Liste.
      </p>
    </div>
  ),
};
