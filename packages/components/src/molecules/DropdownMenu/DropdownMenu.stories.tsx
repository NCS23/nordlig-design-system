import type { Meta, StoryObj } from '@storybook/react';
import { Edit, Copy, Trash2, Share, Settings, Download, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './DropdownMenu';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
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
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Aktionen</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem>Duplizieren</DropdownMenuItem>
        <DropdownMenuItem>Teilen</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Aktionen</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Edit />}>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>Duplizieren</DropdownMenuItem>
        <DropdownMenuItem icon={<Share />}>Teilen</DropdownMenuItem>
        <DropdownMenuItem icon={<Download />}>Exportieren</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSeparatorAndLabel: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Menü</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
        <DropdownMenuItem icon={<Edit />}>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>Duplizieren</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Gefahrenzone</DropdownMenuLabel>
        <DropdownMenuItem destructive icon={<Trash2 />}>
          Löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const DestructiveItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Optionen</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Edit />}>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem icon={<Share />}>Teilen</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive icon={<Trash2 />}>
          Endgültig löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">Aktionen</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem disabled>Duplizieren (nicht verfügbar)</DropdownMenuItem>
        <DropdownMenuItem disabled>Teilen (gesperrt)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Löschen</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TrainingActions: Story = {
  name: 'Training Analyzer: Session-Aktionen',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Training: Lauf 10.2 km</DropdownMenuLabel>
        <DropdownMenuItem icon={<Edit />}>Notizen bearbeiten</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>Training duplizieren</DropdownMenuItem>
        <DropdownMenuItem icon={<Share />}>Als GPX exportieren</DropdownMenuItem>
        <DropdownMenuItem icon={<Download />}>CSV herunterladen</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Settings />}>Einstellungen</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive icon={<Trash2 />}>
          Training löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
