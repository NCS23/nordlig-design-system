import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Molecules/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible-Komponente zum Ein- und Ausblenden von Inhalten. Basiert auf Radix UI Collapsible mit Animationen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="max-w-sm">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
          Mehr anzeigen
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-md border p-4 text-sm">
          Dieser Inhalt kann ein- und ausgeklappt werden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  name: 'Standard geoeffnet',
  render: () => (
    <Collapsible defaultOpen className="max-w-sm">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
          Details
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-md border p-4 text-sm">
          Dieser Bereich ist standardmaessig geoeffnet und kann zugeklappt werden.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  name: 'Kontrolliert',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="max-w-sm space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Oeffnen
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Schliessen
          </button>
        </div>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Kontrollierter Bereich
              <span className="text-xs opacity-60">{open ? 'Offen' : 'Geschlossen'}</span>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 rounded-md border p-4 text-sm">
              Dieser Bereich wird extern kontrolliert.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const TrainingAdvancedFilters: Story = {
  name: 'Training: Erweiterte Filter',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="max-w-md space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Trainingseinheiten suchen..."
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
            Suchen
          </button>
        </div>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Erweiterte Filter {open ? 'ausblenden' : 'anzeigen'}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-md border p-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Sportart</label>
                <select className="rounded-md border px-2 py-1 text-sm">
                  <option>Alle</option>
                  <option>Laufen</option>
                  <option>Radfahren</option>
                  <option>Schwimmen</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Zeitraum</label>
                <select className="rounded-md border px-2 py-1 text-sm">
                  <option>Letzte 7 Tage</option>
                  <option>Letzte 30 Tage</option>
                  <option>Letzte 90 Tage</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Min. Distanz (km)</label>
                <input type="number" placeholder="0" className="rounded-md border px-2 py-1 text-sm" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Max. HR (bpm)</label>
                <input type="number" placeholder="200" className="rounded-md border px-2 py-1 text-sm" />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const TrainingSessionNotes: Story = {
  name: 'Training: Session-Notizen',
  render: () => (
    <div className="max-w-md rounded-md border p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Morgenlauf</h3>
          <span className="text-xs text-slate-500">14.02.2026</span>
        </div>
        <div className="flex gap-4 text-sm">
          <span>10.2 km</span>
          <span>52:30 min</span>
          <span>155 bpm</span>
        </div>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <button className="mt-1 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Notizen anzeigen
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-900">
              <p>Gutes Gefuehl heute, trotz leichtem Regen. Die letzten 2 km bewusst schneller gelaufen. Beine fuehlen sich frisch an, kann morgen Intervalle machen.</p>
              <p className="mt-2 text-xs text-slate-400">RPE: 6/10 | Schlaf: 7.5h | Gewicht: 73.2 kg</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  ),
};
