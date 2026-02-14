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
