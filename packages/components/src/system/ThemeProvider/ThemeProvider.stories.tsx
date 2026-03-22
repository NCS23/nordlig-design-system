import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider, useTheme, type Theme } from './ThemeProvider';
import { Button } from '../../atoms/Button';
import { Heading } from '../../atoms/Heading';

function ThemeDemo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const options: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Hell' },
    { value: 'dark', label: 'Dunkel' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div className="p-6 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-paper)]">
      <Heading level={3} className="text-lg font-semibold text-[var(--color-text-base)] mb-4">
        Theme-Steuerung
      </Heading>
      <p className="text-[var(--color-text-muted)] mb-4">
        Aktuelles Theme: <strong>{theme}</strong> (aufgeloest: <strong>{resolvedTheme}</strong>)
      </p>
      <div className="flex gap-2">
        {options.map(({ value, label }) => (
          <Button
            key={value}
            variant={theme === value ? 'primary' : 'secondary'}
            size="md"
            onClick={() => setTheme(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ThemeProvider> = {
  title: 'System/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ThemeProvider verwaltet das Light/Dark/System-Theme fuer die gesamte Anwendung.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const SystemMode: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system">
      <ThemeDemo />
    </ThemeProvider>
  ),
};
