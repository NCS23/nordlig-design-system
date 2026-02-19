import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta = {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => <Switch />,
};

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
};

export const Unchecked: Story = {
  render: () => <Switch />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
};
