import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Home, BarChart3, Settings, Users, Bell, Search, Menu, LogOut, ChevronLeft } from 'lucide-react';
import { DashboardLayout, useDashboardLayout } from './DashboardLayout';
import { Icon } from '../../atoms/Icon';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

const SidebarPlaceholder = ({ collapsed = false }: { collapsed?: boolean }) => (
  <nav className="flex flex-col h-full bg-[var(--color-bg-paper)] border-r border-[var(--color-border-base)]">
    <div className="p-4 font-semibold text-[var(--color-text-base)]">
      {collapsed ? 'N' : 'Nordlig'}
    </div>
    <div className="flex-1 px-2 py-1">
      {[
        { icon: Home, label: 'Dashboard', active: true },
        { icon: BarChart3, label: 'Analytics' },
        { icon: Users, label: 'Team' },
        { icon: Settings, label: 'Settings' },
      ].map(({ icon, label, active }) => (
        <div
          key={label}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1 ${
            active
              ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)]'
              : 'text-[var(--color-text-base)] hover:bg-[var(--color-bg-muted)]'
          }`}
        >
          <Icon icon={icon} size="sm" />
          {!collapsed && <span>{label}</span>}
        </div>
      ))}
    </div>
  </nav>
);

const ContentPlaceholder = ({ title = 'Dashboard' }: { title?: string }) => (
  <div>
    <h1 className="text-2xl font-bold text-[var(--color-text-base)] mb-6">{title}</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['Trainings', 'Distanz', 'Kalorien'].map((label) => (
        <div
          key={label}
          className="rounded-lg border border-[var(--color-border-base)] bg-[var(--color-bg-paper)] p-6"
        >
          <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
          <div className="text-2xl font-bold text-[var(--color-text-base)] mt-1">42</div>
        </div>
      ))}
    </div>
  </div>
);

const HamburgerButton = () => {
  const { setSidebarOpen } = useDashboardLayout();
  return (
    <button
      className="md:hidden p-2 rounded-md hover:bg-[var(--color-bg-muted)]"
      onClick={() => setSidebarOpen(true)}
      aria-label="Open navigation"
    >
      <Icon icon={Menu} size="sm" />
    </button>
  );
};

const CollapseToggle = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboardLayout();
  return (
    <button
      className="p-2 rounded-md hover:bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]"
      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <Icon icon={ChevronLeft} size="sm" />
    </button>
  );
};

/* ─── Stories ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <HamburgerButton />
        <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <ContentPlaceholder />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const CollapsedSidebar: Story = {
  render: () => {
    const CollapsedDemo = () => {
      const { sidebarCollapsed } = useDashboardLayout();
      return (
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <SidebarPlaceholder collapsed={sidebarCollapsed} />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <ContentPlaceholder />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      );
    };

    return (
      <DashboardLayout defaultSidebarCollapsed={true}>
        <DashboardLayout.Header>
          <CollapseToggle />
          <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
        </DashboardLayout.Header>
        <CollapsedDemo />
      </DashboardLayout>
    );
  },
};

export const MobileOverlay: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <HamburgerButton />
        <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <ContentPlaceholder />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <HamburgerButton />
        <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <nav className="text-sm text-[var(--color-text-muted)] mb-4">
            Dashboard / Analytics / Weekly Report
          </nav>
          <ContentPlaceholder title="Weekly Report" />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const WithUserMenu: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <HamburgerButton />
        <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]" aria-label="Notifications">
            <Icon icon={Bell} size="sm" />
          </button>
          <div className="h-8 w-8 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] text-sm font-medium">
            NR
          </div>
        </div>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <ContentPlaceholder />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <HamburgerButton />
        <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
        <div className="ml-4 flex-1 max-w-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--color-border-base)] bg-[var(--color-bg-surface)]">
            <Icon icon={Search} size="sm" className="text-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-muted)]">Suche...</span>
          </div>
        </div>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <ContentPlaceholder />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const NoFooter: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardLayout.Header>
        <span className="font-semibold text-[var(--color-text-base)]">Minimal Layout</span>
      </DashboardLayout.Header>
      <DashboardLayout.Body>
        <DashboardLayout.Sidebar>
          <SidebarPlaceholder />
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <ContentPlaceholder title="Minimal Dashboard" />
        </DashboardLayout.Content>
      </DashboardLayout.Body>
    </DashboardLayout>
  ),
};

export const FullDashboard: Story = {
  render: () => {
    const FullContent = () => {
      const { sidebarCollapsed } = useDashboardLayout();
      return (
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <SidebarPlaceholder collapsed={sidebarCollapsed} />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <nav className="text-sm text-[var(--color-text-muted)] mb-4">
              Dashboard / Uebersicht
            </nav>
            <ContentPlaceholder />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      );
    };

    return (
      <DashboardLayout>
        <DashboardLayout.Header>
          <HamburgerButton />
          <CollapseToggle />
          <span className="ml-2 font-semibold text-[var(--color-text-base)]">Training Analyzer</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]" aria-label="Notifications">
              <Icon icon={Bell} size="sm" />
            </button>
            <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]" aria-label="Logout">
              <Icon icon={LogOut} size="sm" />
            </button>
          </div>
        </DashboardLayout.Header>
        <FullContent />
        <DashboardLayout.Footer>
          <span className="text-sm text-[var(--color-text-muted)]">Nordlig Design System v1.0</span>
        </DashboardLayout.Footer>
      </DashboardLayout>
    );
  },
};
