import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Activity,
  TrendingUp,
  Settings,
  BarChart3,
  Calendar,
  Heart,
  Bell,
  Timer,
  Flame,
  Route,
} from 'lucide-react';
import { PageShell } from './PageShell';
import { Icon } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { Separator } from '../../atoms/Separator';
import { Avatar, AvatarFallback } from '../../atoms/Avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
} from '../../organisms/Sidebar';
import { StatCard } from '../../organisms/StatCard';
import { Card, CardHeader, CardBody } from '../../organisms/Card';

const meta: Meta<typeof PageShell> = {
  title: 'Templates/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

/* ─── Reusable Sidebar ──────────────────────────────────────────────────────── */

const AppSidebar = () => (
  <Sidebar aria-label="Hauptnavigation" className="h-full">
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
    </SidebarFooter>
  </Sidebar>
);

/* ─── Reusable Header Content ───────────────────────────────────────────────── */

const HeaderContent = () => (
  <>
    <img src="/bildmarke.svg" alt="" className="h-7 w-auto shrink-0" />
    <Text variant="body" as="span" className="truncate font-semibold">
      Training Analyzer
    </Text>
    <div className="ml-auto flex shrink-0 items-center gap-1">
      <Button variant="ghost" size="sm" aria-label="Benachrichtigungen">
        <Icon icon={Bell} size="sm" />
      </Button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Avatar size="sm">
        <AvatarFallback>NR</AvatarFallback>
      </Avatar>
    </div>
  </>
);

/* ─── Dashboard Content ─────────────────────────────────────────────────────── */

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

/* ─── Stories ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <AppSidebar />
        </PageShell.Sidebar>
        <PageShell.Content>
          <DashboardContent />
        </PageShell.Content>
      </PageShell.Body>
    </PageShell>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <AppSidebar />
        </PageShell.Sidebar>
        <PageShell.Content>
          <DashboardContent />
        </PageShell.Content>
      </PageShell.Body>
      <PageShell.Footer>
        <Text variant="muted" as="span">
          Training Analyzer v1.0
        </Text>
        <Separator orientation="vertical" className="mx-3 h-4" />
        <Text variant="muted" as="span">
          &copy; 2026 Nordlig Design System
        </Text>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const NoSidebar: Story = {
  name: 'No Sidebar',
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Content maxWidth="max-w-4xl">
        <Heading level={2} className="mb-6">
          Einstellungen
        </Heading>
        <Card>
          <CardHeader>
            <Heading level={3}>Profil</Heading>
          </CardHeader>
          <CardBody>
            <Text variant="muted">
              Zentrierter Inhalt ohne Sidebar — ideal fuer Einstellungen, Formulare oder
              fokussierte Workflows.
            </Text>
          </CardBody>
        </Card>
      </PageShell.Content>
      <PageShell.Footer>
        <Text variant="muted" as="span">
          &copy; 2026 Nordlig Design System
        </Text>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const SidebarRight: Story = {
  name: 'Sidebar Right',
  render: () => (
    <PageShell sidebarPosition="right">
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <AppSidebar />
        </PageShell.Sidebar>
        <PageShell.Content>
          <Heading level={2} className="mb-6">
            Content (Sidebar rechts)
          </Heading>
          <Card>
            <CardBody>
              <Text variant="muted">
                PageShell mit rechtsseitiger Sidebar — z.B. fuer Detail-Panels oder Filter.
              </Text>
            </CardBody>
          </Card>
        </PageShell.Content>
      </PageShell.Body>
    </PageShell>
  ),
};

export const ContentMaxWidth: Story = {
  name: 'Content Max Width',
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Content maxWidth="max-w-4xl">
        <DashboardContent />
      </PageShell.Content>
    </PageShell>
  ),
};

export const NonStickyHeader: Story = {
  name: 'Non-Sticky Header',
  render: () => (
    <PageShell stickyHeader={false}>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Content>
        <Heading level={2} className="mb-6">
          Scrollbarer Header
        </Heading>
        <div className="space-y-4">
          {Array.from({ length: 15 }, (_, i) => (
            <Card key={i}>
              <CardBody>
                <Text variant="body">
                  Block {i + 1} — Der Header scrollt mit dem Inhalt.
                </Text>
              </CardBody>
            </Card>
          ))}
        </div>
      </PageShell.Content>
    </PageShell>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <PageShell>
      <PageShell.Header>
        <img src="/bildmarke.svg" alt="" className="h-6 w-auto shrink-0" />
        <Text variant="body" as="span" className="truncate font-semibold">
          Training Analyzer
        </Text>
        <div className="ml-auto">
          <Avatar size="sm">
            <AvatarFallback>NR</AvatarFallback>
          </Avatar>
        </div>
      </PageShell.Header>
      <PageShell.Content>
        <Heading level={2} className="mb-4">
          Dashboard
        </Heading>
        <div className="space-y-4">
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
          <Card>
            <CardHeader>
              <Heading level={3}>Letzte Aktivitaeten</Heading>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[
                  { name: 'Morgenlauf', dist: '8.2 km' },
                  { name: 'Intervall', dist: '6.1 km' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-[var(--color-border-muted)] p-3"
                  >
                    <Text variant="body" as="span" className="font-medium">{item.name}</Text>
                    <Badge variant="neutral" size="sm">{item.dist}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </PageShell.Content>
    </PageShell>
  ),
};
