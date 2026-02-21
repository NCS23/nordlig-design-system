import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchFilter } from './SearchFilter';

const meta: Meta<typeof SearchFilter> = {
  title: 'Molecules/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <SearchFilter
        searchValue={value}
        onSearchChange={setValue}
        searchPlaceholder="Suchen..."
      />
    );
  },
};

/* ─── Mit Filtern ────────────────────────────────────────────────────────── */

export const MitFiltern: Story = {
  name: 'Mit Filtern',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <SearchFilter
        searchValue={value}
        onSearchChange={setValue}
        searchPlaceholder="Nutzer suchen..."
      >
        <select className="rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] px-3 py-2 text-[length:var(--font-component-size-sm)]">
          <option>Alle Rollen</option>
          <option>Admin</option>
          <option>Nutzer</option>
        </select>
        <select className="rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] px-3 py-2 text-[length:var(--font-component-size-sm)]">
          <option>Alle Status</option>
          <option>Aktiv</option>
          <option>Inaktiv</option>
        </select>
      </SearchFilter>
    );
  },
};

/* ─── Mit Ergebniszahl ───────────────────────────────────────────────────── */

export const MitErgebniszahl: Story = {
  name: 'Mit Ergebniszahl',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <SearchFilter
        searchValue={value}
        onSearchChange={setValue}
        resultCount={42}
        searchPlaceholder="Projekte durchsuchen..."
      />
    );
  },
};

/* ─── Komplett ───────────────────────────────────────────────────────────── */

export const Komplett: Story = {
  name: 'Komplett (Filter + Ergebniszahl)',
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <SearchFilter
        searchValue={value}
        onSearchChange={setValue}
        resultCount={128}
        resultLabel="Eintraege"
        searchPlaceholder="Eintraege suchen..."
      >
        <select className="rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] px-3 py-2 text-[length:var(--font-component-size-sm)]">
          <option>Kategorie</option>
          <option>A</option>
          <option>B</option>
        </select>
      </SearchFilter>
    );
  },
};
