import type { Meta, StoryObj } from '@storybook/react';
import { Spoiler } from './Spoiler';
import React from 'react';

const meta: Meta<typeof Spoiler> = {
  title: 'Atoms/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spoiler>;

export const Default: Story = {
  args: {
    children: 'Der Mörder war der Butler.',
  },
};

export const MitLabel: Story = {
  args: {
    children: 'Die Antwort ist 42.',
    label: 'Antwort anzeigen',
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="self-start rounded bg-[var(--color-bg-primary)] px-3 py-1.5 text-[color:var(--color-text-on-primary)] text-sm"
        >
          {open ? 'Verbergen' : 'Aufdecken'}
        </button>
        <p className="text-[color:var(--color-text-base)]">
          Das Ergebnis der Pruefung war{' '}
          <Spoiler open={open} onOpenChange={setOpen} label="[Ergebnis]">
            bestanden mit Auszeichnung
          </Spoiler>
          .
        </p>
      </div>
    );
  },
};

export const InlineText: Story = {
  render: () => (
    <p className="text-[color:var(--color-text-base)] leading-relaxed max-w-prose">
      In der Geschichte geht es um einen Detektiv, der herausfindet, dass{' '}
      <Spoiler>der Nachbar der Taeter war</Spoiler>. Am Ende stellt sich
      heraus, dass{' '}
      <Spoiler label="Ende aufdecken">alles nur ein Traum war</Spoiler>.
    </p>
  ),
};
