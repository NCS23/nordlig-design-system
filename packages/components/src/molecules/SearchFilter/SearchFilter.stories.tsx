import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchFilter } from './SearchFilter';
import { Select } from '../Select';

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
        <Select
          options={[
            { value: 'all', label: 'Alle Rollen' },
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'Nutzer' },
          ]}
          placeholder="Rolle"
          inputSize="sm"
        />
        <Select
          options={[
            { value: 'all', label: 'Alle Status' },
            { value: 'active', label: 'Aktiv' },
            { value: 'inactive', label: 'Inaktiv' },
          ]}
          placeholder="Status"
          inputSize="sm"
        />
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
        <Select
          options={[
            { value: 'all', label: 'Kategorie' },
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ]}
          placeholder="Kategorie"
          inputSize="sm"
        />
      </SearchFilter>
    );
  },
};
