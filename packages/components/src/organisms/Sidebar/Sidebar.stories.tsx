import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Activity,
  TrendingUp,
  Settings,
  User,
  BarChart3,
  Target,
  Upload,
  Bell,
  HelpCircle,
  LogOut,
  Search,
  Calendar,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
} from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsible: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
    width: { control: 'text' },
    collapsedWidth: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Sidebar navigation component with compound pattern (Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarCollapseButton). Supports collapsible mode with controlled or uncontrolled state.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', display: 'flex' }}>
        <Story />
        <div
          style={{
            flex: 1,
            padding: '24px',
            backgroundColor: 'var(--color-bg-base)',
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            Main content area
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: (args) => (
    <Sidebar {...args} collapsible aria-label="Main navigation">
      <SidebarHeader>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'var(--color-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-on-primary)',
            fontWeight: 700,
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          N
        </div>
        <span style={{ fontWeight: 600, fontSize: '16px' }}>Nordlig</span>
        <div style={{ marginLeft: 'auto' }}>
          <SidebarCollapseButton />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Main">
          <SidebarItem icon={<Home size={18} />} label="Home" active />
          <SidebarItem icon={<Activity size={18} />} label="Activity" />
          <SidebarItem icon={<TrendingUp size={18} />} label="Trends" />
        </SidebarGroup>
        <SidebarGroup label="Account">
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
          <SidebarItem icon={<User size={18} />} label="Profile" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem icon={<HelpCircle size={18} />} label="Help" />
      </SidebarFooter>
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  name: 'Collapsed',
  render: () => (
    <Sidebar collapsible defaultCollapsed aria-label="Main navigation">
      <SidebarHeader>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'var(--color-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-on-primary)',
            fontWeight: 700,
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          N
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<Home size={18} />} label="Home" active />
          <SidebarItem icon={<Activity size={18} />} label="Activity" />
          <SidebarItem icon={<TrendingUp size={18} />} label="Trends" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
          <SidebarItem icon={<User size={18} />} label="Profile" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  ),
};

export const WithBadges: Story = {
  name: 'With Badges',
  render: () => (
    <Sidebar collapsible aria-label="Main navigation">
      <SidebarHeader>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'var(--color-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-on-primary)',
            fontWeight: 700,
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          N
        </div>
        <span style={{ fontWeight: 600, fontSize: '16px' }}>Nordlig</span>
        <div style={{ marginLeft: 'auto' }}>
          <SidebarCollapseButton />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Navigation">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
          <SidebarItem
            icon={<Bell size={18} />}
            label="Notifications"
            badge={12}
          />
          <SidebarItem
            icon={<Activity size={18} />}
            label="Activity"
            badge="new"
          />
          <SidebarItem icon={<TrendingUp size={18} />} label="Analytics" />
        </SidebarGroup>
        <SidebarGroup label="Account">
          <SidebarItem icon={<Settings size={18} />} label="Settings" badge={2} />
          <SidebarItem icon={<User size={18} />} label="Profile" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem icon={<LogOut size={18} />} label="Logout" />
      </SidebarFooter>
    </Sidebar>
  ),
};

export const TrainingAppSidebar: Story = {
  name: 'Training: App Sidebar',
  render: () => (
    <Sidebar collapsible aria-label="Training App Navigation">
      <SidebarHeader>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          TA
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '15px', lineHeight: 1.2 }}>
            Training Analyzer
          </div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.2,
            }}
          >
            Saison 2025/26
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <SidebarCollapseButton />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Uebersicht">
          <SidebarItem
            icon={<Home size={18} />}
            label="Dashboard"
            href="/dashboard"
            active
          />
          <SidebarItem
            icon={<Calendar size={18} />}
            label="Sessions"
            href="/sessions"
            badge={3}
          />
          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Analytics"
            href="/analytics"
          />
        </SidebarGroup>
        <SidebarGroup label="Planung">
          <SidebarItem
            icon={<Target size={18} />}
            label="Goals"
            href="/goals"
          />
          <SidebarItem
            icon={<TrendingUp size={18} />}
            label="Trends"
            href="/trends"
          />
          <SidebarItem
            icon={<Search size={18} />}
            label="Suche"
            href="/search"
          />
        </SidebarGroup>
        <SidebarGroup label="Verwaltung">
          <SidebarItem
            icon={<Upload size={18} />}
            label="Import"
            href="/import"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            href="/settings"
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem
          icon={<User size={18} />}
          label="Nils Bergmann"
          href="/profile"
        />
      </SidebarFooter>
    </Sidebar>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  decorators: [
    (Story) => (
      <div style={{ padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
      <h3
        style={{
          fontFamily: 'sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '12px',
        }}
      >
        Sidebar - Verwendete Design Tokens
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr
            style={{
              borderBottom: '2px solid var(--color-card-border)',
              textAlign: 'left',
            }}
          >
            <th style={{ padding: '8px 12px' }}>Token</th>
            <th style={{ padding: '8px 12px' }}>Mapped to</th>
            <th style={{ padding: '8px 12px' }}>Verwendung</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              '--color-bg-paper',
              'L3 Role',
              'Sidebar-Hintergrundfarbe',
            ],
            [
              '--color-border-base',
              'L3 Role',
              'Rechter Rand und Footer-Trennlinie',
            ],
            [
              '--color-text-base',
              'L3 Role',
              'Standard-Textfarbe der SidebarItems',
            ],
            [
              '--color-text-muted',
              'L3 Role',
              'Gruppen-Labels, Collapse-Button',
            ],
            [
              '--color-bg-muted',
              'L3 Role',
              'Hover-Hintergrund der SidebarItems',
            ],
            [
              '--color-bg-primary',
              'L3 Role',
              'Aktiver Item-Hintergrund',
            ],
            [
              '--color-text-on-primary',
              'L3 Role',
              'Aktiver Item-Text (auf Primary-Hintergrund)',
            ],
            [
              '--color-border-focus',
              'L3 Role',
              'Focus-Ring fuer Keyboard-Navigation',
            ],
            [
              '--radius-md',
              'L3 Role',
              'Border-Radius der SidebarItems und Collapse-Button',
            ],
            [
              '--color-badge-error-bg',
              'L4 Badge',
              'Badge-Hintergrund bei SidebarItems',
            ],
            [
              '--color-badge-error-text',
              'L4 Badge',
              'Badge-Textfarbe bei SidebarItems',
            ],
          ].map(([token, layer, usage]) => (
            <tr
              key={token}
              style={{
                borderBottom: '1px solid var(--color-card-border)',
              }}
            >
              <td
                style={{
                  padding: '8px 12px',
                  color: 'var(--color-text-success)',
                }}
              >
                {token}
              </td>
              <td
                style={{
                  padding: '8px 12px',
                  color: 'var(--color-text-muted)',
                }}
              >
                {layer}
              </td>
              <td style={{ padding: '8px 12px' }}>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        style={{
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          fontFamily: 'sans-serif',
        }}
      >
        Sidebar nutzt ausschliesslich L3 Role-Tokens direkt (kein eigenes L4
        Mapping). Badge-Tokens werden von der Badge-Component wiederverwendet.
      </p>
    </div>
  ),
};
