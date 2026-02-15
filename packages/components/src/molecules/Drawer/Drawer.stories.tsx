import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './Drawer';

const meta: Meta = {
  title: 'Molecules/Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Drawer-Komponente fuer mobile-freundliche Bottom-Sheets. Basiert auf vaul und bietet eine native Swipe-Geste zum Schliessen.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
          Drawer oeffnen
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Trainingsdetails</DrawerTitle>
          <DrawerDescription>
            Zusammenfassung der letzten Trainingseinheit.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-4 text-sm">
          <p>Hier werden die wichtigsten Kennzahlen Ihres Trainings angezeigt.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="px-3 py-1.5 text-sm rounded border">
              Schliessen
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── With Form ───────────────────────────────────────────────────────────────

export const WithForm: Story = {
  name: 'Mit Formular',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Filter oeffnen
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Trainingsfilter</DrawerTitle>
          <DrawerDescription>
            Filtern Sie Ihre Trainingseinheiten nach verschiedenen Kriterien.
          </DrawerDescription>
        </DrawerHeader>
        <form className="flex flex-col gap-4 px-6 pb-4 text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Trainingstyp</label>
            <select className="border rounded px-2 py-1.5">
              <option>Alle</option>
              <option>Longrun</option>
              <option>Intervalle</option>
              <option>Tempo</option>
              <option>Regeneration</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Zeitraum</label>
            <select className="border rounded px-2 py-1.5">
              <option>Letzte 7 Tage</option>
              <option>Letzte 30 Tage</option>
              <option>Letztes Quartal</option>
              <option>Gesamter Zeitraum</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Mindestdistanz (km)</label>
            <input
              type="number"
              className="border rounded px-2 py-1.5"
              placeholder="0"
            />
          </div>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="px-3 py-1.5 text-sm rounded border">
              Abbrechen
            </button>
          </DrawerClose>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Anwenden
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── Long Content ────────────────────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Langer Inhalt',
  render: () => {
    const trainings = [
      { date: '15.02.2026', type: 'Longrun', distance: '18.3 km', duration: '1:32:15' },
      { date: '13.02.2026', type: 'Intervalle', distance: '12.1 km', duration: '55:42' },
      { date: '11.02.2026', type: 'Regeneration', distance: '6.5 km', duration: '35:10' },
      { date: '09.02.2026', type: 'Tempo', distance: '10.0 km', duration: '45:30' },
      { date: '07.02.2026', type: 'Longrun', distance: '21.1 km', duration: '1:48:55' },
      { date: '05.02.2026', type: 'Intervalle', distance: '8.4 km', duration: '40:12' },
      { date: '03.02.2026', type: 'Regeneration', distance: '5.0 km', duration: '28:45' },
      { date: '01.02.2026', type: 'Longrun', distance: '16.7 km', duration: '1:25:30' },
      { date: '30.01.2026', type: 'Tempo', distance: '10.0 km', duration: '44:20' },
      { date: '28.01.2026', type: 'Intervalle', distance: '9.2 km', duration: '42:15' },
      { date: '26.01.2026', type: 'Regeneration', distance: '7.0 km', duration: '38:00' },
      { date: '24.01.2026', type: 'Longrun', distance: '19.5 km', duration: '1:38:10' },
    ];

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className="px-4 py-2 text-sm font-medium rounded border">
            Trainingshistorie
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Trainingshistorie</DrawerTitle>
            <DrawerDescription>
              Ihre letzten 12 Trainingseinheiten im Ueberblick.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-6 pb-4">
            <div className="flex flex-col gap-2 text-sm">
              {trainings.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{t.type}</span>
                    <span className="text-xs opacity-60">{t.date}</span>
                  </div>
                  <div className="flex gap-4 text-right">
                    <span>{t.distance}</span>
                    <span className="opacity-60">{t.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="px-3 py-1.5 text-sm rounded border">
                Schliessen
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

// ─── Without Handle ──────────────────────────────────────────────────────────

export const WithoutHandle: Story = {
  name: 'Ohne Griff',
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Drawer ohne Griff
        </button>
      </DrawerTrigger>
      <DrawerContent showHandle={false}>
        <DrawerHeader>
          <DrawerTitle>Benachrichtigung</DrawerTitle>
          <DrawerDescription>
            Dieser Drawer hat keinen sichtbaren Drag-Handle.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-4 text-sm">
          <p>
            Der Drawer kann trotzdem durch Wischen nach unten geschlossen werden,
            aber der visuelle Griff wird nicht angezeigt.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
              Verstanden
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Verwendete Design Tokens</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">Wert</th>
            <th className="text-left py-2 pr-4 font-medium">Verwendung</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-overlay</td>
            <td className="py-2 pr-4 font-mono text-xs">rgba(0,0,0,0.5)</td>
            <td className="py-2 pr-4">Hintergrund-Overlay (Backdrop)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Hintergrundfarbe des Inhaltsbereichs</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-title</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Textfarbe des Titels</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-description</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Textfarbe der Beschreibung</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Obere Rahmenlinie</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-drawer-handle</td>
            <td className="py-2 pr-4 font-mono text-xs">#94a3b8</td>
            <td className="py-2 pr-4">Farbe des Drag-Handle</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-drawer</td>
            <td className="py-2 pr-4 font-mono text-xs">0 20px 25px rgba(0,0,0,0.1)...</td>
            <td className="py-2 pr-4">Schatteneffekt des Drawer</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-drawer</td>
            <td className="py-2 pr-4 font-mono text-xs">0.5rem</td>
            <td className="py-2 pr-4">Eckenradius oben links/rechts</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-drawer-padding</td>
            <td className="py-2 pr-4 font-mono text-xs">24px</td>
            <td className="py-2 pr-4">Innenabstand (Header, Footer)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-drawer-gap</td>
            <td className="py-2 pr-4 font-mono text-xs">12px</td>
            <td className="py-2 pr-4">Abstand zwischen Elementen</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
