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

/* ─── Platzhalter-Bloecke ─────────────────────────────────────────────────── */

const PlaceholderBlock = ({ label, className = '' }: { label: string; className?: string }) => (
  <div
    className={`rounded-[var(--radius-component-lg,8px)] border border-dashed border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] p-6 text-center text-sm text-[var(--color-text-muted)] ${className}`}
  >
    {label}
  </div>
);

/* ─── Header ──────────────────────────────────────────────────────────────── */

const HeaderContent = () => (
  <>
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-[var(--radius-component-md,6px)] bg-[var(--color-bg-primary)]" />
      <span className="text-sm font-semibold text-[var(--color-text-base)]">App Name</span>
    </div>
    <div className="ml-auto flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-[var(--color-bg-surface)]" />
    </div>
  </>
);

/* ─── Sidebar ─────────────────────────────────────────────────────────────── */

const SidebarContent = () => (
  <nav className="flex flex-col gap-1 p-2">
    {['Dashboard', 'Projekte', 'Einstellungen', 'Hilfe'].map((item) => (
      <div
        key={item}
        className="rounded-[var(--radius-component-md,6px)] px-3 py-2 text-sm text-[var(--color-text-muted)]"
      >
        {item}
      </div>
    ))}
  </nav>
);

/* ─── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Content>
          <div className="flex flex-col gap-4">
            <PlaceholderBlock label="Hauptinhalt" className="min-h-[200px]" />
            <div className="grid gap-4 sm:grid-cols-2">
              <PlaceholderBlock label="Bereich A" />
              <PlaceholderBlock label="Bereich B" />
            </div>
          </div>
        </PageShell.Content>
      </PageShell.Body>
      <PageShell.Footer>
        <span className="text-xs text-[var(--color-text-muted)]">Footer-Inhalt</span>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const MitSidebar: Story = {
  name: 'Mit Sidebar',
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Sidebar>
          <SidebarContent />
        </PageShell.Sidebar>
        <PageShell.Content>
          <div className="flex flex-col gap-4">
            <PlaceholderBlock label="Hauptinhalt" className="min-h-[300px]" />
            <PlaceholderBlock label="Weitere Inhalte" />
          </div>
        </PageShell.Content>
      </PageShell.Body>
      <PageShell.Footer>
        <span className="text-xs text-[var(--color-text-muted)]">Footer-Inhalt</span>
      </PageShell.Footer>
    </PageShell>
  ),
};

export const OhneFooter: Story = {
  name: 'Ohne Footer',
  render: () => (
    <PageShell>
      <PageShell.Header>
        <HeaderContent />
      </PageShell.Header>
      <PageShell.Body>
        <PageShell.Content>
          <PlaceholderBlock label="Vollbreiter Inhalt" className="min-h-[400px]" />
        </PageShell.Content>
      </PageShell.Body>
    </PageShell>
  ),
};
