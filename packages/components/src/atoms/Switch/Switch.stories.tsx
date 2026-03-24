import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta = {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => <Switch aria-label="Option aktivieren" />,
};

export const Checked: Story = {
  render: () => <Switch aria-label="Option aktivieren" defaultChecked />,
};

export const Unchecked: Story = {
  render: () => <Switch aria-label="Option aktivieren" />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch aria-label="Deaktivierte Option" disabled />
      <Switch aria-label="Deaktivierte Option (aktiv)" disabled defaultChecked />
    </div>
  ),
};
