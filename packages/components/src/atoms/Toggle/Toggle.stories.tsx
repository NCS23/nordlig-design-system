import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './Toggle';
import { Bold, Italic, Underline } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: <Bold size={16} />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: <Italic size={16} />,
  },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle>
      <Bold size={16} />
      Fett
    </Toggle>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Toggle size="sm">
        <Bold size={14} />
        Klein
      </Toggle>
      <Toggle size="md">
        <Bold size={16} />
        Mittel
      </Toggle>
      <Toggle size="lg">
        <Bold size={18} />
        Groß
      </Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Toggle',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Toggle',
  },
};

export const IconOnly: Story = {
  args: {
    'aria-label': 'Unterstreichen',
    children: <Underline size={16} />,
  },
};
