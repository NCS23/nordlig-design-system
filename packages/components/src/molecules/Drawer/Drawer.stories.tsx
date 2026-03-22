import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
import { Button } from '../../atoms/Button';
import { Label } from '../../atoms/Label';
import { InputField } from '../InputField';
import { Select } from '../Select';

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
        <Button>
          Drawer oeffnen
        </Button>
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
            <Button variant="secondary">
              Schliessen
            </Button>
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
        <Button variant="secondary">
          Filter oeffnen
        </Button>
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
            <Label>Trainingstyp</Label>
            <Select
              options={[
                { value: 'alle', label: 'Alle' },
                { value: 'longrun', label: 'Longrun' },
                { value: 'intervalle', label: 'Intervalle' },
                { value: 'tempo', label: 'Tempo' },
                { value: 'regeneration', label: 'Regeneration' },
              ]}
              placeholder="Alle"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Zeitraum</Label>
            <Select
              options={[
                { value: '7', label: 'Letzte 7 Tage' },
                { value: '30', label: 'Letzte 30 Tage' },
                { value: '90', label: 'Letztes Quartal' },
                { value: 'all', label: 'Gesamter Zeitraum' },
              ]}
              placeholder="Letzte 7 Tage"
            />
          </div>
          <InputField
            label="Mindestdistanz (km)"
            type="number"
            placeholder="0"
          />
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">
              Abbrechen
            </Button>
          </DrawerClose>
          <Button>
            Anwenden
          </Button>
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
          <Button variant="secondary">
            Trainingshistorie
          </Button>
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
              <Button variant="secondary">
                Schliessen
              </Button>
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
        <Button variant="secondary">
          Drawer ohne Griff
        </Button>
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
            <Button>
              Verstanden
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
