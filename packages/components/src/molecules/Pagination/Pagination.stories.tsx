import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { Heading } from '../../atoms/Heading';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── Many Pages ─────────────────────────────────────────────────────────────

export const ManyPages: Story = {
  args: {
    currentPage: 25,
    totalPages: 50,
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── First Page ─────────────────────────────────────────────────────────────

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── Last Page ──────────────────────────────────────────────────────────────

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── Compact Variant ────────────────────────────────────────────────────────

export const CompactVariant: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'compact',
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── Few Pages ──────────────────────────────────────────────────────────────

export const FewPages: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Seite:', page),
  },
};

// ─── Training: Session History ──────────────────────────────────────────────

export const SessionHistory: Story = {
  name: 'Training: SessionHistory',
  render: () => {
    const [page, setPage] = React.useState(1);
    const totalPages = 12;

    const sessions = [
      { date: '10.02.2026', type: 'Longrun', distance: '18.5 km', duration: '1:42:30' },
      { date: '08.02.2026', type: 'Intervalle', distance: '8.2 km', duration: '0:45:12' },
      { date: '06.02.2026', type: 'Tempo', distance: '12.0 km', duration: '1:01:45' },
    ];

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Heading level={3} className="text-sm font-semibold text-[var(--color-text-base)]">
          Trainingshistorie
        </Heading>
        <div className="flex flex-col gap-2">
          {sessions.map((session) => (
            <div
              key={session.date}
              className="flex justify-between items-center text-sm border border-[var(--color-pagination-item-border)] rounded-lg px-3 py-2"
            >
              <div>
                <span className="font-medium">{session.date}</span>
                <span className="text-[var(--color-pagination-item-text)] ml-2">
                  {session.type}
                </span>
              </div>
              <div className="text-[var(--color-pagination-item-text)]">
                {session.distance} &middot; {session.duration}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <p className="text-xs text-[var(--color-pagination-item-text)]">
          Seite {page} von {totalPages} &middot; 36 Trainingseinheiten
        </p>
      </div>
    );
  },
};
