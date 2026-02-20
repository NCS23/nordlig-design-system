import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Home,
  Activity,
  TrendingUp,
  Settings,
  BarChart3,
  Bell,
  LogOut,
  Calendar,
  Menu,
  Timer,
  Heart,
  Flame,
  Route,
} from 'lucide-react';
import { DashboardLayout, useDashboardLayout } from './DashboardLayout';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Badge } from '../../atoms/Badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../atoms/Avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
} from '../../organisms/Sidebar';
import { StatCard } from '../../organisms/StatCard';
import { Card, CardHeader, CardBody } from '../../organisms/Card';
import { Breadcrumbs, BreadcrumbItem } from '../../molecules/Breadcrumbs';
import { SearchInput } from '../../molecules/SearchInput';
import { Separator } from '../../atoms/Separator';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

/* ─── Reusable Sidebar ─────────────────────────────────────────────────────── */

const AppSidebar = () => {
  const { sidebarCollapsed } = useDashboardLayout();
  return (
    <Sidebar
      collapsible
      collapsed={sidebarCollapsed}
      aria-label="Hauptnavigation"
      className="h-full"
    >
      <SidebarContent>
        <SidebarGroup label="Training">
          <SidebarItem icon={<Icon icon={Home} size={18} />} label="Dashboard" active />
          <SidebarItem icon={<Icon icon={Activity} size={18} />} label="Aktivitaeten" badge="12" />
          <SidebarItem icon={<Icon icon={TrendingUp} size={18} />} label="Trends" />
          <SidebarItem icon={<Icon icon={Calendar} size={18} />} label="Kalender" />
        </SidebarGroup>
        <SidebarGroup label="Analyse">
          <SidebarItem icon={<Icon icon={BarChart3} size={18} />} label="Statistiken" />
          <SidebarItem icon={<Icon icon={Heart} size={18} />} label="HR Zonen" />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem icon={<Icon icon={Settings} size={18} />} label="Einstellungen" />
        {!sidebarCollapsed && <SidebarCollapseButton />}
      </SidebarFooter>
    </Sidebar>
  );
};

/* ─── Reusable Header ──────────────────────────────────────────────────────── */

const AppHeader = ({ withSearch = false }: { withSearch?: boolean }) => {
  const { setSidebarOpen } = useDashboardLayout();
  return (
    <DashboardLayout.Header>
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0 md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Navigation oeffnen"
      >
        <Icon icon={Menu} size="sm" />
      </Button>
      <img src="/bildmarke.svg" alt="" className="h-7 w-auto shrink-0" />
      <Text variant="body" as="span" className="truncate font-semibold">
        Training Analyzer
      </Text>

      {withSearch && (
        <div className="hidden flex-1 md:block max-w-sm">
          <SearchInput placeholder="Training suchen..." inputSize="sm" />
        </div>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-1">
        <div className="relative">
          <Button variant="ghost" size="sm" aria-label="3 Benachrichtigungen">
            <Icon icon={Bell} size="sm" />
          </Button>
          <span className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-bg-error-solid)] text-[10px] font-bold text-[var(--color-text-on-primary)]">
            3
          </span>
        </div>
        <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
        <Avatar size="sm" className="hidden sm:flex">
          <AvatarFallback>NR</AvatarFallback>
        </Avatar>
      </div>
    </DashboardLayout.Header>
  );
};

/* ─── Dashboard Content ────────────────────────────────────────────────────── */

const DashboardContent = () => (
  <>
    <Heading level={2} className="mb-6">
      Dashboard
    </Heading>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatCard
        title="Trainings"
        value={42}
        trend={{ value: 12, direction: 'up', label: 'vs. Vormonat' }}
        icon={<Icon icon={Activity} size="sm" />}
      />
      <StatCard
        title="Distanz"
        value="287"
        unit="km"
        trend={{ value: 8, direction: 'up', label: 'vs. Vormonat' }}
        icon={<Icon icon={Route} size="sm" />}
      />
      <StatCard
        title="Dauer"
        value="32:15"
        unit="Std"
        trend={{ value: 3, direction: 'down', label: 'vs. Vormonat' }}
        icon={<Icon icon={Timer} size="sm" />}
        variant="warning"
      />
      <StatCard
        title="Kalorien"
        value="18.430"
        unit="kcal"
        trend={{ value: 5, direction: 'up', label: 'vs. Vormonat' }}
        icon={<Icon icon={Flame} size="sm" />}
      />
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <Heading level={3}>Letzte Aktivitaeten</Heading>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[
              { name: 'Morgenlauf', type: 'Laufen', dist: '8.2 km', date: 'Heute' },
              { name: 'Intervall-Training', type: 'Laufen', dist: '6.1 km', date: 'Gestern' },
              { name: 'Rennrad Tour', type: 'Radfahren', dist: '42.5 km', date: 'Mo, 17.02.' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border-muted)] p-3"
              >
                <div className="min-w-0">
                  <Text variant="body" as="span" className="font-medium">
                    {item.name}
                  </Text>
                  <Text variant="muted" as="span" className="ml-2 hidden sm:inline">
                    {item.type}
                  </Text>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant="neutral" size="sm">{item.dist}</Badge>
                  <Text variant="muted" as="span" className="hidden sm:inline">{item.date}</Text>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading level={3}>Wochenziel</Heading>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              { label: 'Distanz', current: 28, goal: 40, unit: 'km' },
              { label: 'Trainings', current: 4, goal: 5, unit: '' },
              { label: 'Aktive Minuten', current: 180, goal: 300, unit: 'min' },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex justify-between mb-1">
                  <Text variant="small" as="span">{g.label}</Text>
                  <Text variant="muted" as="span">
                    {g.current}{g.unit ? ` ${g.unit}` : ''} / {g.goal}{g.unit ? ` ${g.unit}` : ''}
                  </Text>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--color-bg-surface-hover)]">
                  <div
                    className="h-2 rounded-full bg-[var(--color-bg-primary)]"
                    style={{ width: `${Math.min((g.current / g.goal) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  </>
);

/* ─── Stories ──────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => {
    const Inner = () => (
      <>
        <AppHeader />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <DashboardContent />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const CollapsedSidebar: Story = {
  render: () => {
    const Inner = () => {
      const { setSidebarCollapsed, sidebarCollapsed } = useDashboardLayout();
      return (
        <>
          <DashboardLayout.Header>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? 'Sidebar aufklappen' : 'Sidebar zuklappen'}
            >
              <Icon icon={Menu} size="sm" />
            </Button>
            <img src="/bildmarke.svg" alt="" className="h-7 w-auto shrink-0" />
            <Text variant="body" as="span" className="truncate font-semibold">
              Training Analyzer
            </Text>
          </DashboardLayout.Header>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>
              <AppSidebar />
            </DashboardLayout.Sidebar>
            <DashboardLayout.Content>
              <DashboardContent />
            </DashboardLayout.Content>
          </DashboardLayout.Body>
        </>
      );
    };
    return (
      <DashboardLayout defaultSidebarCollapsed>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const MobileOverlay: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => {
    const Inner = () => (
      <>
        <AppHeader />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <DashboardContent />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const WithBreadcrumbs: Story = {
  render: () => {
    const Inner = () => (
      <>
        <AppHeader />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <Breadcrumbs className="mb-4">
              <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="#">Analyse</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Wochenbericht</BreadcrumbItem>
            </Breadcrumbs>
            <DashboardContent />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const WithUserMenu: Story = {
  render: () => {
    const Inner = () => {
      const { setSidebarOpen } = useDashboardLayout();
      return (
        <>
          <DashboardLayout.Header>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Navigation oeffnen"
            >
              <Icon icon={Menu} size="sm" />
            </Button>
            <img src="/bildmarke.svg" alt="" className="h-7 w-auto shrink-0" />
            <Text variant="body" as="span" className="truncate font-semibold">
              Training Analyzer
            </Text>
            <div className="ml-auto flex shrink-0 items-center gap-1">
              <Button variant="ghost" size="sm" aria-label="Benachrichtigungen">
                <Icon icon={Bell} size="sm" />
              </Button>
              <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=NR" alt="Nils R." />
                  <AvatarFallback>NR</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <Text variant="small" as="span" className="font-medium">Nils R.</Text>
                </div>
              </div>
              <Button variant="ghost" size="sm" aria-label="Abmelden" className="hidden sm:inline-flex">
                <Icon icon={LogOut} size="sm" />
              </Button>
            </div>
          </DashboardLayout.Header>
          <DashboardLayout.Body>
            <DashboardLayout.Sidebar>
              <AppSidebar />
            </DashboardLayout.Sidebar>
            <DashboardLayout.Content>
              <DashboardContent />
            </DashboardLayout.Content>
          </DashboardLayout.Body>
        </>
      );
    };
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const Inner = () => (
      <>
        <AppHeader withSearch />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <DashboardContent />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const NoFooter: Story = {
  render: () => {
    const Inner = () => (
      <>
        <AppHeader />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <Heading level={2} className="mb-6">
              Minimal Dashboard
            </Heading>
            <Card>
              <CardBody>
                <Text variant="muted">
                  Dashboard-Layout ohne Footer — nur Header, Sidebar und Content.
                </Text>
              </CardBody>
            </Card>
          </DashboardLayout.Content>
        </DashboardLayout.Body>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};

export const FullDashboard: Story = {
  render: () => {
    const Inner = () => (
      <>
        <AppHeader withSearch />
        <DashboardLayout.Body>
          <DashboardLayout.Sidebar>
            <AppSidebar />
          </DashboardLayout.Sidebar>
          <DashboardLayout.Content>
            <Breadcrumbs className="mb-4">
              <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Uebersicht</BreadcrumbItem>
            </Breadcrumbs>
            <DashboardContent />
          </DashboardLayout.Content>
        </DashboardLayout.Body>
        <DashboardLayout.Footer>
          <Text variant="muted" as="span">
            Training Analyzer v1.0
          </Text>
          <Separator orientation="vertical" className="mx-3 h-4" />
          <Text variant="muted" as="span">
            &copy; 2026
          </Text>
        </DashboardLayout.Footer>
      </>
    );
    return (
      <DashboardLayout>
        <Inner />
      </DashboardLayout>
    );
  },
};
