import type { Meta, StoryObj } from '@storybook/react';
import { Edit, Copy, Clipboard, Trash2, Share, Download, RefreshCw } from 'lucide-react';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
} from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Molecules/ContextMenu',
  component: ContextMenu,
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
type Story = StoryObj<typeof ContextMenu>;

const TriggerArea = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center justify-center w-80 h-40 rounded-lg border-2 border-dashed border-[var(--color-dropdown-border)] bg-[var(--color-dropdown-bg)] text-sm text-[var(--color-dropdown-label-text)] select-none">
    {children ?? 'Rechtsklick fuer Kontextmenue'}
  </div>
);

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Bearbeiten</ContextMenuItem>
        <ContextMenuItem>Kopieren</ContextMenuItem>
        <ContextMenuItem>Einfuegen</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Rechtsklick fuer Menue mit Icons</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Icon icon={Edit} />}>Bearbeiten</ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Copy} />}>Kopieren</ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Clipboard} />}>Einfuegen</ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Download} />}>Herunterladen</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSeparatorAndLabel: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Rechtsklick fuer gruppiertes Menue</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Bearbeitung</ContextMenuLabel>
        <ContextMenuItem icon={<Icon icon={Edit} />}>
          Bearbeiten
          <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Copy} />}>
          Kopieren
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Clipboard} />}>
          Einfuegen
          <ContextMenuShortcut>Ctrl+V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Gefahrenzone</ContextMenuLabel>
        <ContextMenuItem destructive icon={<Icon icon={Trash2} />}>
          Loeschen
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DestructiveItem: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Rechtsklick fuer Loeschoption</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Icon icon={Edit} />}>Bearbeiten</ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Share} />}>Teilen</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive icon={<Icon icon={Trash2} />}>
          Endgueltig loeschen
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>Rechtsklick fuer deaktivierte Eintraege</TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Bearbeiten</ContextMenuItem>
        <ContextMenuItem disabled>Kopieren (nicht verfuegbar)</ContextMenuItem>
        <ContextMenuItem disabled>Einfuegen (gesperrt)</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive>Loeschen</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const TrainingActions: Story = {
  name: 'Training Analyzer: Session-Kontextmenue',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerArea>
          <div className="text-center">
            <div className="font-medium text-[var(--color-dropdown-item-text)]">Lauf 10.2 km</div>
            <div className="text-xs mt-1">Rechtsklick fuer Aktionen</div>
          </div>
        </TriggerArea>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Training: Lauf 10.2 km</ContextMenuLabel>
        <ContextMenuItem icon={<Icon icon={Edit} />}>
          Notizen bearbeiten
          <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={RefreshCw} />}>
          Training duplizieren
          <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Share} />}>Als GPX exportieren</ContextMenuItem>
        <ContextMenuItem icon={<Icon icon={Download} />}>CSV herunterladen</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive icon={<Icon icon={Trash2} />}>
          Training loeschen
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={3} className="text-sm font-semibold">Verwendete Design Tokens (shared with DropdownMenu)</Heading>
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
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Hintergrundfarbe des Menues</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Rahmenfarbe des Menues</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-item-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Textfarbe der Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-item-hover-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Hover-Hintergrund der Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-item-disabled-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#94a3b8</td>
            <td className="py-2 pr-4">Textfarbe deaktivierter Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-item-icon</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Farbe der Icons in Menuepunkten</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-destructive-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#b91c1c</td>
            <td className="py-2 pr-4">Textfarbe destruktiver Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-destructive-hover-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#fef2f2</td>
            <td className="py-2 pr-4">Hover-Hintergrund destruktiver Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-separator</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Trennlinie zwischen Gruppen</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-label-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Textfarbe der Abschnitts-Labels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-dropdown-menu</td>
            <td className="py-2 pr-4 font-mono text-xs">0 4px 6px rgba(0,0,0,0.07), ...</td>
            <td className="py-2 pr-4">Schatteneffekt des Menues</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-dropdown-menu</td>
            <td className="py-2 pr-4 font-mono text-xs">0.5rem</td>
            <td className="py-2 pr-4">Eckenradius des Menues</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-dropdown-item</td>
            <td className="py-2 pr-4 font-mono text-xs">0.375rem</td>
            <td className="py-2 pr-4">Eckenradius der Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-dropdown-padding</td>
            <td className="py-2 pr-4 font-mono text-xs">4px</td>
            <td className="py-2 pr-4">Innenabstand des Menue-Containers</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-dropdown-item-padding-x</td>
            <td className="py-2 pr-4 font-mono text-xs">12px</td>
            <td className="py-2 pr-4">Horizontaler Innenabstand der Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-dropdown-item-padding-y</td>
            <td className="py-2 pr-4 font-mono text-xs">8px</td>
            <td className="py-2 pr-4">Vertikaler Innenabstand der Menuepunkte</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-dropdown-item-gap</td>
            <td className="py-2 pr-4 font-mono text-xs">8px</td>
            <td className="py-2 pr-4">Abstand zwischen Icon und Text</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-[var(--color-dropdown-label-text)]">
        ContextMenu teilt alle L4-Tokens mit DropdownMenu -- identisches visuelles Erscheinungsbild.
      </p>
    </div>
  ),
};
