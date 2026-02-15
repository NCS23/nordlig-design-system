import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../../system/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

function ThemeLabel() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <span className="text-sm text-[var(--color-text-muted)]">
      {theme} (aufgeloest: {resolvedTheme})
    </span>
  );
}

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'ThemeToggle wechselt zwischen Hell, Dunkel und System-Theme. Zeigt Sun, Moon oder Monitor Icons an.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const InNavbar: Story = {
  name: 'In Navigationsleiste',
  render: () => (
    <ThemeProvider>
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border-default)] bg-[var(--color-bg-paper)]">
        <span className="font-semibold text-[var(--color-text-base)]">Nordlig</span>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
            Startseite
          </a>
          <a href="#" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
            Komponenten
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </ThemeProvider>
  ),
};

export const WithLabel: Story = {
  name: 'Mit Beschriftung',
  render: () => (
    <ThemeProvider>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <ThemeLabel />
      </div>
    </ThemeProvider>
  ),
};

// ─── Theme Comparison ─────────────────────────────────────────────────────

function ThemeComparisonCard({ forcedTheme }: { forcedTheme: 'light' | 'dark' }) {
  return (
    <div className={forcedTheme === 'dark' ? 'dark' : ''}>
      <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-paper)] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--color-text-base)]">
            {forcedTheme === 'light' ? 'Hell (Light)' : 'Dunkel (Dark)'}
          </h3>
          <span className="inline-flex items-center rounded-full bg-[var(--color-badge-info-bg)] px-2 py-0.5 text-xs text-[var(--color-badge-info-text)]">
            {forcedTheme}
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Vorschau der Token-Werte im {forcedTheme === 'light' ? 'hellen' : 'dunklen'} Modus.
        </p>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded bg-[var(--color-bg-base)] border border-[var(--color-border-default)]" title="bg-base" />
          <div className="h-8 w-8 rounded bg-[var(--color-bg-muted)] border border-[var(--color-border-default)]" title="bg-muted" />
          <div className="h-8 w-8 rounded bg-[var(--color-bg-paper)] border border-[var(--color-border-default)]" title="bg-paper" />
          <div className="h-8 w-8 rounded bg-[var(--color-toggle-active-bg)]" title="toggle-active-bg" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-[var(--color-text-base)]">Text Base</p>
          <p className="text-sm text-[var(--color-text-muted)]">Text Muted</p>
          <p className="text-sm text-[var(--color-text-disabled)]">Text Disabled</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-[var(--color-toggle-active-bg)] px-3 py-1.5 text-sm text-[var(--color-toggle-active-text)]">
            Primaer
          </button>
          <button className="rounded-md border border-[var(--color-border-default)] px-3 py-1.5 text-sm text-[var(--color-text-base)]">
            Sekundaer
          </button>
        </div>
      </div>
    </div>
  );
}

export const ThemeComparison: Story = {
  name: 'Theme Vergleich (Hell vs Dunkel)',
  render: () => (
    <div className="flex gap-6">
      <div className="flex-1">
        <ThemeComparisonCard forcedTheme="light" />
      </div>
      <div className="flex-1">
        <ThemeComparisonCard forcedTheme="dark" />
      </div>
    </div>
  ),
};
