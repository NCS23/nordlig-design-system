import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListPage } from './ListPage';
import { SearchFilter } from '../../patterns/SearchFilter';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Select } from '../../molecules/Select';
import { Pagination } from '../../molecules/Pagination';

const meta: Meta<typeof ListPage> = {
  title: 'Templates/ListPage',
  component: ListPage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ListPage>;

/* ─── Platzhalter ────────────────────────────────────────────────────────── */

const PlaceholderTable = () => (
  <div className="overflow-hidden rounded-[var(--radius-component-lg)] border border-[var(--color-border-muted)]">
    {/* Header */}
    <div className="flex border-b border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] px-4 py-3">
      <Text variant="muted" as="span" className="flex-1 [font-weight:var(--font-component-weight-medium)]">Name</Text>
      <Text variant="muted" as="span" className="flex-1 [font-weight:var(--font-component-weight-medium)]">Status</Text>
      <Text variant="muted" as="span" className="flex-1 [font-weight:var(--font-component-weight-medium)]">Datum</Text>
    </div>
    {/* Rows */}
    {['Max Mustermann', 'Anna Schmidt', 'Jan Becker', 'Lisa Weber'].map((name) => (
      <div key={name} className="flex border-b border-[var(--color-border-muted)] px-4 py-3 last:border-b-0">
        <Text as="span" className="flex-1">{name}</Text>
        <div className="flex-1">
          <Badge variant="success" size="xs">Aktiv</Badge>
        </div>
        <Text variant="muted" as="span" className="flex-1">21.02.2026</Text>
      </div>
    ))}
  </div>
);

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <ListPage>
      <ListPage.Header>
        <Heading level={2}>Nutzer</Heading>
        <Button variant="primary">Neuer Nutzer</Button>
      </ListPage.Header>
      <ListPage.Body>
        <PlaceholderTable />
      </ListPage.Body>
      <ListPage.Footer>
        <Text variant="muted" as="span">
          4 Ergebnisse
        </Text>
        <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
      </ListPage.Footer>
    </ListPage>
  ),
};

/* ─── Mit Suchfilter ─────────────────────────────────────────────────────── */

export const MitSuchfilter: Story = {
  name: 'Mit Suchfilter',
  render: () => {
    const [search, setSearch] = React.useState('');
    return (
      <ListPage>
        <ListPage.Header>
          <Heading level={2}>Projekte</Heading>
          <Button variant="primary">Neues Projekt</Button>
        </ListPage.Header>
        <ListPage.Toolbar>
          <SearchFilter
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Projekte suchen..."
            resultCount={42}
          >
            <Select
              options={[
                { value: 'all', label: 'Alle Status' },
                { value: 'active', label: 'Aktiv' },
                { value: 'archived', label: 'Archiviert' },
              ]}
              placeholder="Status"
              inputSize="sm"
            />
          </SearchFilter>
        </ListPage.Toolbar>
        <ListPage.Body>
          <PlaceholderTable />
        </ListPage.Body>
        <ListPage.Footer>
          <Text variant="muted" as="span">
            42 Ergebnisse
          </Text>
          <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
        </ListPage.Footer>
      </ListPage>
    );
  },
};

/* ─── Leer-Zustand ───────────────────────────────────────────────────────── */

export const LeerZustand: Story = {
  name: 'Leer-Zustand',
  render: () => (
    <ListPage>
      <ListPage.Header>
        <Heading level={2}>Projekte</Heading>
      </ListPage.Header>
      <ListPage.Body>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heading level={4}>Keine Projekte vorhanden</Heading>
          <Text variant="muted" className="mt-1">
            Erstelle dein erstes Projekt um loszulegen.
          </Text>
          <div className="mt-4">
            <Button variant="primary">Projekt erstellen</Button>
          </div>
        </div>
      </ListPage.Body>
    </ListPage>
  ),
};
