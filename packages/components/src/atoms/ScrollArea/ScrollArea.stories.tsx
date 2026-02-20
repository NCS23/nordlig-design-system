import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';
import { Heading } from '../Heading';

const meta: Meta<typeof ScrollArea> = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'ScrollArea-Komponente fuer scrollbare Bereiche mit gestylten Scrollbalken. Unterstuetzt vertikales, horizontales und kombiniertes Scrollen. Basiert auf Radix UI ScrollArea.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  name: 'Standard (Langer Text)',
  render: () => (
    <ScrollArea className="h-48 w-72 rounded border p-4">
      <div className="text-sm">
        <Heading level={4}>Trainingsprotokoll</Heading>
        <p className="mb-2">
          Die heutige Einheit bestand aus einem 10-km-Tempolauf mit negativem Split.
          Die erste Haelfte wurde bewusst langsamer gelaufen, um Energie fuer die zweite
          Haelfte zu sparen.
        </p>
        <p className="mb-2">
          Durchschnittliche Herzfrequenz lag bei 162 bpm, was dem oberen Bereich von
          Zone 3 entspricht. Die Pace konnte in den letzten 3 km auf unter 4:20/km
          gesteigert werden.
        </p>
        <p className="mb-2">
          Wadenmuskulatur fuehlt sich nach dem Training etwas muede an. Recovery Shake
          direkt nach dem Training eingenommen. Naechste Einheit: Regenerationslauf
          morgen fruh.
        </p>
        <p className="mb-2">
          Gesamtdistanz diese Woche: 42 km. Ziel: 55 km bis Sonntag. Geplante
          Intervall-Einheit am Donnerstag: 6x1000m bei Z4-Tempo.
        </p>
        <p>
          Wetterverhaeltnisse: 12 Grad Celsius, leichter Wind aus Nordwest.
          Ideale Bedingungen fuer einen Tempolauf.
        </p>
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  name: 'Horizontales Scrollen',
  render: () => (
    <ScrollArea orientation="horizontal" className="w-72 rounded border p-4">
      <div className="flex gap-4" style={{ width: '800px' }}>
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
          <div
            key={day}
            className="flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded border text-sm"
          >
            <span className="font-semibold">{day}</span>
            <span className="opacity-60">10 km</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Both: Story = {
  name: '2D Scrollen',
  render: () => (
    <ScrollArea orientation="both" className="h-48 w-72 rounded border p-4">
      <div style={{ width: '600px' }}>
        <table className="text-sm">
          <thead>
            <tr>
              <th className="px-3 py-1 text-left font-semibold">Datum</th>
              <th className="px-3 py-1 text-left font-semibold">Typ</th>
              <th className="px-3 py-1 text-left font-semibold">Distanz</th>
              <th className="px-3 py-1 text-left font-semibold">Pace</th>
              <th className="px-3 py-1 text-left font-semibold">HF</th>
              <th className="px-3 py-1 text-left font-semibold">Kalorien</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }, (_, i) => (
              <tr key={i}>
                <td className="px-3 py-1">{`${14 - i}.02.2026`}</td>
                <td className="px-3 py-1">Laufen</td>
                <td className="px-3 py-1">{(8 + Math.random() * 10).toFixed(1)} km</td>
                <td className="px-3 py-1">{`${4 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}/km`}</td>
                <td className="px-3 py-1">{Math.floor(140 + Math.random() * 30)} bpm</td>
                <td className="px-3 py-1">{Math.floor(400 + Math.random() * 400)} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  ),
};

export const SessionList: Story = {
  name: 'Training: Einheitenliste',
  render: () => {
    const sessions = [
      { date: '14.02.', type: 'Tempolauf', distance: '10.2 km', duration: '46:12' },
      { date: '13.02.', type: 'Regeneration', distance: '5.0 km', duration: '28:45' },
      { date: '12.02.', type: 'Intervalle', distance: '8.5 km', duration: '38:20' },
      { date: '11.02.', type: 'Krafttraining', distance: '-', duration: '55:00' },
      { date: '10.02.', type: 'Longrun', distance: '21.1 km', duration: '1:38:05' },
      { date: '09.02.', type: 'Ruhetag', distance: '-', duration: '-' },
      { date: '08.02.', type: 'Tempolauf', distance: '8.0 km', duration: '35:44' },
      { date: '07.02.', type: 'Regeneration', distance: '6.0 km', duration: '34:12' },
      { date: '06.02.', type: 'Intervalle', distance: '9.2 km', duration: '42:30' },
      { date: '05.02.', type: 'Krafttraining', distance: '-', duration: '50:00' },
    ];

    return (
      <ScrollArea className="h-52 w-80 rounded border">
        <div className="p-3">
          <Heading level={4}>Letzte Einheiten</Heading>
          <div className="flex flex-col gap-2">
            {sessions.map((session, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border px-3 py-2 text-sm"
              >
                <div>
                  <span className="font-medium">{session.type}</span>
                  <span className="ml-2 opacity-50">{session.date}</span>
                </div>
                <div className="text-right opacity-70">
                  <span>{session.distance}</span>
                  <span className="ml-2">{session.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  },
};

export const LargeContent: Story = {
  name: 'Grosser Inhalt',
  render: () => (
    <ScrollArea className="h-64 w-96 rounded border p-4">
      <div className="flex flex-col gap-3 text-sm">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="rounded border p-3">
            <div className="flex justify-between">
              <span className="font-medium">Eintrag {i + 1}</span>
              <span className="opacity-50">vor {i + 1}h</span>
            </div>
            <p className="mt-1 opacity-70">
              Beispielinhalt fuer einen scrollbaren Bereich mit vielen Eintraegen.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
