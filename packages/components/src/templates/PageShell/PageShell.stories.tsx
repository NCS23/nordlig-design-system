import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageShell } from './PageShell';

const meta: Meta<typeof PageShell> = {
  title: 'Templates/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

const Placeholder = ({
  label,
  height,
  bg,
}: {
  label: string;
  height?: string;
  bg?: string;
}) => (
  <div
    style={{
      padding: 16,
      background: bg ?? 'var(--color-bg-surface)',
      borderRadius: 8,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-muted)',
      fontSize: 14,
    }}
  >
    {label}
  </div>
);

const SidebarPlaceholder = () => (
  <div
    style={{
      width: 240,
      height: '100%',
      borderRight: '1px solid var(--color-border-muted)',
      background: 'var(--color-bg-paper)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}
  >
    <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--color-text-base)' }}>
      Navigation
    </div>
    {['Dashboard', 'Projekte', 'Einstellungen', 'Hilfe'].map((item) => (
      <div
        key={item}
        style={{
          padding: '8px 12px',
          borderRadius: 6,
          color: 'var(--color-text-base)',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => (
    <PageShell>
      <PageShell.Header>
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name
        </span>
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <SidebarPlaceholder />
        </PageShell.Sidebar>
        <PageShell.Content>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Placeholder label="Hauptinhalt" height="200px" />
            <Placeholder label="Weitere Inhalte" height="300px" />
          </div>
        </PageShell.Content>
      </PageShell.Body>
    </PageShell>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <PageShell>
      <PageShell.Header>
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name
        </span>
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <SidebarPlaceholder />
        </PageShell.Sidebar>
        <PageShell.Content>
          <Placeholder label="Hauptinhalt" height="400px" />
        </PageShell.Content>
      </PageShell.Body>
      <PageShell.Footer>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          © 2026 Nordlig Design System
        </span>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const NoSidebar: Story = {
  name: 'No Sidebar',
  render: () => (
    <PageShell>
      <PageShell.Header>
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name
        </span>
      </PageShell.Header>
      <PageShell.Content>
        <Placeholder label="Full-width Content" height="500px" />
      </PageShell.Content>
      <PageShell.Footer>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          Footer
        </span>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const SidebarRight: Story = {
  name: 'Sidebar Right',
  render: () => (
    <PageShell sidebarPosition="right">
      <PageShell.Header>
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name
        </span>
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <SidebarPlaceholder />
        </PageShell.Sidebar>
        <PageShell.Content>
          <Placeholder label="Content (Sidebar rechts)" height="400px" />
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
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name
        </span>
      </PageShell.Header>
      <PageShell.Content maxWidth="max-w-4xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Placeholder label="Zentrierter Inhalt (max-w-4xl)" height="200px" />
          <Placeholder label="Weiterer Inhalt" height="300px" />
        </div>
      </PageShell.Content>
    </PageShell>
  ),
};

export const NonStickyHeader: Story = {
  name: 'Non-Sticky Header',
  render: () => (
    <PageShell stickyHeader={false}>
      <PageShell.Header>
        <span style={{ fontWeight: 600, color: 'var(--color-text-base)' }}>
          App Name (scrollt mit)
        </span>
      </PageShell.Header>
      <PageShell.Content>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <Placeholder key={i} label={`Block ${i + 1}`} height="80px" />
          ))}
        </div>
      </PageShell.Content>
    </PageShell>
  ),
};
