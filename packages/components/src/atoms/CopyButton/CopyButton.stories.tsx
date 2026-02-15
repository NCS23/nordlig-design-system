import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './CopyButton';

const meta: Meta<typeof CopyButton> = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    timeout: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Standard-CopyButton mit Beispieltext */
export const Default: Story = {
  args: {
    value: 'Hello World',
  },
};

/** Alle drei Groessen nebeneinander */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CopyButton value="small" size="sm" />
      <CopyButton value="medium" size="md" />
      <CopyButton value="large" size="lg" />
    </div>
  ),
};

/** Mit onCopy-Callback (siehe Actions-Panel) */
export const WithCallback: Story = {
  args: {
    value: 'Kopiert mit Callback',
    onCopy: () => console.log('Kopiert!'),
  },
};

/** Deaktivierter Zustand */
export const Disabled: Story = {
  args: {
    value: 'Nicht kopierbar',
    disabled: true,
  },
};

/** CopyButton im Kontext eines Code-Snippets */
export const InContext: Story = {
  render: () => (
    <div className="relative inline-block rounded-md bg-gray-900 px-4 py-3 pr-12 font-mono text-sm text-gray-100">
      <code>npm install @nordlig/components</code>
      <CopyButton
        value="npm install @nordlig/components"
        size="sm"
        className="absolute top-2 right-2"
      />
    </div>
  ),
};
