import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta = {
  title: 'Atoms/Checkbox',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => <Checkbox aria-label="Option auswählen" />,
};

export const Checked: Story = {
  render: () => <Checkbox aria-label="Option auswählen" defaultChecked />,
};

export const Unchecked: Story = {
  render: () => <Checkbox aria-label="Option auswählen" />,
};

export const Indeterminate: Story = {
  render: () => <Checkbox checked="indeterminate" />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox aria-label="Deaktivierte Option" disabled />
      <Checkbox aria-label="Deaktivierte Option (ausgewählt)" disabled defaultChecked />
    </div>
  ),
};

// ─── All States ─────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Checkbox />
        <span className="text-sm text-[var(--color-text-muted)]">Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked />
        <span className="text-sm text-[var(--color-text-muted)]">Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox checked="indeterminate" />
        <span className="text-sm text-[var(--color-text-muted)]">Indeterminate</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled />
        <span className="text-sm text-[var(--color-text-muted)]">Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled defaultChecked />
        <span className="text-sm text-[var(--color-text-muted)]">Disabled Checked</span>
      </div>
    </div>
  ),
};
