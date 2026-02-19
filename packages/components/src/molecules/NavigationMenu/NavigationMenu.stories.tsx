import type { Meta, StoryObj } from '@storybook/react';
import { BarChart3, Dumbbell, Calendar, TrendingUp, Settings, User, Timer, Activity } from 'lucide-react';
import { Icon } from '../../atoms/Icon';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-start justify-center p-12">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/sessions">Sessions</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── With Dropdown ──────────────────────────────────────────────────────────

export const WithDropdown: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sessions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1">
              <NavigationMenuLink href="/sessions/all">
                Alle Sessions
              </NavigationMenuLink>
              <NavigationMenuLink href="/sessions/recent">
                Letzte Sessions
              </NavigationMenuLink>
              <NavigationMenuLink href="/sessions/favorites">
                Favoriten
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── With Active State ──────────────────────────────────────────────────────

export const WithActiveState: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard" active>
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/sessions">Sessions</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/analytics">Analytics</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── Training Navigation ────────────────────────────────────────────────────

export const TrainingNavigation: Story = {
  name: 'Training: Realistische Navigation',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/dashboard" active>
            <span className="inline-flex items-center gap-2">
              <Icon icon={BarChart3} size="sm" />
              Dashboard
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Icon icon={Activity} size="sm" />
            Training
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 min-w-[240px]">
              <NavigationMenuLink href="/training/sessions">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={Timer} size={14} />
                  Sessions
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/training/plans">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={Calendar} size={14} />
                  Trainingsplaene
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/training/exercises">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={Dumbbell} size={14} />
                  Uebungen
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Icon icon={TrendingUp} size="sm" />
            Analyse
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 min-w-[240px]">
              <NavigationMenuLink href="/analytics/progress">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={TrendingUp} size={14} />
                  Fortschritt
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/analytics/statistics">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={BarChart3} size={14} />
                  Statistiken
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Icon icon={User} size="sm" />
            Profil
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 min-w-[200px]">
              <NavigationMenuLink href="/profile">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={User} size={14} />
                  Mein Profil
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink href="/settings">
                <span className="inline-flex items-center gap-2">
                  <Icon icon={Settings} size={14} />
                  Einstellungen
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── Design Tokens ──────────────────────────────────────────────────────────

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
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
            <td className="py-2 pr-4 font-mono text-xs">--color-text-base</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Textfarbe fuer Links und Trigger</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-bg-muted</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Hover-Hintergrund und aktiver Zustand</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-border-focus</td>
            <td className="py-2 pr-4 font-mono text-xs">#0ea5e9</td>
            <td className="py-2 pr-4">Focus-Ring fuer Tastaturnavigation</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-nav</td>
            <td className="py-2 pr-4 font-mono text-xs">0.375rem</td>
            <td className="py-2 pr-4">Eckenradius fuer Links und Trigger</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Hintergrund des Dropdown-Panels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-dropdown-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Rahmenfarbe des Dropdown-Panels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-dropdown</td>
            <td className="py-2 pr-4 font-mono text-xs">0.5rem</td>
            <td className="py-2 pr-4">Eckenradius des Dropdown-Panels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-dropdown</td>
            <td className="py-2 pr-4 font-mono text-xs">0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)</td>
            <td className="py-2 pr-4">Schatten des Dropdown-Panels</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
