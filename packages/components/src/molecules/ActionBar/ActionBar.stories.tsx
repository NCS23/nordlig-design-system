import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';
import { Button } from '../../atoms/Button';

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
          <Button variant="ghost" size="sm">Abbrechen</Button>
          <Button variant="primary" size="sm">Speichern</Button>
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
        <Button variant="ghost" size="sm">Fertig</Button>
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
        <Button variant="ghost" size="sm">Action</Button>
      </ActionBar>
    </div>
  ),
};
