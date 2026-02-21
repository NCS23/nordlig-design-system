import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListPage } from './ListPage';
import { SearchFilter } from '../../molecules/SearchFilter';

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

const ActionButton = ({
  children,
  variant = 'secondary',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) => (
  <button
    className={`rounded-[var(--radius-component-md)] px-4 py-2 text-[length:var(--font-component-size-sm)] ${
      variant === 'primary'
        ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)]'
        : 'border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] text-[var(--color-text-base)]'
    }`}
  >
    {children}
  </button>
);

const PlaceholderTable = () => (
  <div className="overflow-hidden rounded-[var(--radius-component-lg)] border border-[var(--color-border-muted)]">
    {/* Header */}
    <div className="flex border-b border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] px-4 py-3">
      <span className="flex-1 text-[length:var(--font-component-size-sm)] [font-weight:var(--font-component-weight-medium)] text-[var(--color-text-muted)]">Name</span>
      <span className="flex-1 text-[length:var(--font-component-size-sm)] [font-weight:var(--font-component-weight-medium)] text-[var(--color-text-muted)]">Status</span>
      <span className="flex-1 text-[length:var(--font-component-size-sm)] [font-weight:var(--font-component-weight-medium)] text-[var(--color-text-muted)]">Datum</span>
    </div>
    {/* Rows */}
    {['Max Mustermann', 'Anna Schmidt', 'Jan Becker', 'Lisa Weber'].map((name) => (
      <div key={name} className="flex border-b border-[var(--color-border-muted)] px-4 py-3 last:border-b-0">
        <span className="flex-1 text-[length:var(--font-component-size-sm)] text-[var(--color-text-base)]">{name}</span>
        <span className="flex-1 text-[length:var(--font-component-size-sm)] text-[var(--color-text-success)]">Aktiv</span>
        <span className="flex-1 text-[length:var(--font-component-size-sm)] text-[var(--color-text-muted)]">21.02.2026</span>
      </div>
    ))}
  </div>
);

const PaginationPlaceholder = () => (
  <div className="flex items-center gap-1">
    {[1, 2, 3].map((n) => (
      <button
        key={n}
        className={`h-8 w-8 rounded-[var(--radius-component-md)] text-[length:var(--font-component-size-sm)] ${
          n === 1
            ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-on-primary)]'
            : 'text-[var(--color-text-base)] hover:bg-[var(--color-bg-surface)]'
        }`}
      >
        {n}
      </button>
    ))}
  </div>
);

/* ─── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <ListPage>
      <ListPage.Header>
        <h2 className="text-[length:var(--font-listpage-title-size)] [font-weight:var(--font-listpage-title-weight)] text-[var(--color-text-base)]">
          Nutzer
        </h2>
        <ActionButton variant="primary">Neuer Nutzer</ActionButton>
      </ListPage.Header>
      <ListPage.Body>
        <PlaceholderTable />
      </ListPage.Body>
      <ListPage.Footer>
        <span className="text-[length:var(--font-listpage-result-count-size)] text-[var(--color-listpage-result-count)]">
          4 Ergebnisse
        </span>
        <PaginationPlaceholder />
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
          <h2 className="text-[length:var(--font-listpage-title-size)] [font-weight:var(--font-listpage-title-weight)] text-[var(--color-text-base)]">
            Projekte
          </h2>
          <ActionButton variant="primary">Neues Projekt</ActionButton>
        </ListPage.Header>
        <ListPage.Toolbar>
          <SearchFilter
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Projekte suchen..."
            resultCount={42}
          >
            <select className="rounded-[var(--radius-component-md)] border border-[var(--color-border-muted)] bg-[var(--color-bg-paper)] px-3 py-2 text-[length:var(--font-component-size-sm)]">
              <option>Alle Status</option>
              <option>Aktiv</option>
              <option>Archiviert</option>
            </select>
          </SearchFilter>
        </ListPage.Toolbar>
        <ListPage.Body>
          <PlaceholderTable />
        </ListPage.Body>
        <ListPage.Footer>
          <span className="text-[length:var(--font-listpage-result-count-size)] text-[var(--color-listpage-result-count)]">
            42 Ergebnisse
          </span>
          <PaginationPlaceholder />
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
        <h2 className="text-[length:var(--font-listpage-title-size)] [font-weight:var(--font-listpage-title-weight)] text-[var(--color-text-base)]">
          Projekte
        </h2>
      </ListPage.Header>
      <ListPage.Body>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-4xl">📋</div>
          <h3 className="text-[length:var(--font-component-size-lg)] [font-weight:var(--font-component-weight-medium)] text-[var(--color-text-base)]">
            Keine Projekte vorhanden
          </h3>
          <p className="mt-1 text-[length:var(--font-component-size-sm)] text-[var(--color-text-muted)]">
            Erstelle dein erstes Projekt um loszulegen.
          </p>
          <div className="mt-4">
            <ActionButton variant="primary">Projekt erstellen</ActionButton>
          </div>
        </div>
      </ListPage.Body>
    </ListPage>
  ),
};
