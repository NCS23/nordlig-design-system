import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'Molecules/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    sticky: false,
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {
  render: (args) => (
    <div className="p-8">
      <ActionBar {...args}>
        <span className="text-xs text-[var(--color-actionbar-text)]">
          Ungespeicherte Änderungen
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)]">
            Speichern
          </button>
        </div>
      </ActionBar>
    </div>
  ),
};

export const EditMode: Story = {
  render: (args) => (
    <div className="p-8">
      <ActionBar {...args}>
        <span className="text-xs text-[var(--color-actionbar-text)] flex items-center gap-1.5">
          Bearbeitungsmodus
        </span>
        <button className="px-3 py-1.5 text-sm rounded">Fertig</button>
      </ActionBar>
    </div>
  ),
};

export const NonSticky: Story = {
  args: {
    sticky: false,
  },
  render: (args) => (
    <div className="p-8">
      <ActionBar {...args}>
        <span className="text-xs text-[var(--color-actionbar-text)]">
          Inline action bar
        </span>
        <button className="px-3 py-1.5 text-sm rounded">Action</button>
      </ActionBar>
    </div>
  ),
};
