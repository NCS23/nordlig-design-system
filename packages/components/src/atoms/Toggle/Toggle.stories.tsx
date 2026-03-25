import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Toggle } from './Toggle';
import { Bold, Italic, Underline } from 'lucide-react';
import { Icon } from '../Icon';

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
    'aria-label': 'Fett',
    children: <Icon icon={Bold} size="sm" />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    'aria-label': 'Kursiv',
    children: <Icon icon={Italic} size="sm" />,
  },
};

export const WithIcon: Story = {
  render: () => (
    <Toggle>
      <Icon icon={Bold} size="sm" />
      Fett
    </Toggle>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Toggle size="sm">
        <Icon icon={Bold} size={14} />
        Klein
      </Toggle>
      <Toggle size="md">
        <Icon icon={Bold} size="sm" />
        Mittel
      </Toggle>
      <Toggle size="lg">
        <Icon icon={Bold} size={18} />
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
    children: <Icon icon={Underline} size="sm" />,
  },
};
