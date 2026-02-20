import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './Sheet';
import { Button } from '../../atoms/Button';
import { Link } from '../../atoms/Link';
import { Label } from '../../atoms/Label';
import { InputField } from '../InputField';
import { Select } from '../Select';

const meta: Meta = {
  title: 'Molecules/Sheet',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Default (Right) ────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard (Rechts)',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Sheet oeffnen</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Einstellungen</SheetTitle>
          <SheetDescription>Passen Sie Ihre Praeferenzen an.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 text-sm">
          <p>Hier koennen Sie verschiedene Optionen konfigurieren.</p>
        </div>
        <SheetFooter>
          <Button variant="secondary">Abbrechen</Button>
          <Button>Speichern</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// ─── Left ───────────────────────────────────────────────────────────────────

export const Left: Story = {
  name: 'Links',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Navigation oeffnen</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Hauptmenue der Anwendung</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="#">Dashboard</Link>
          <Link href="#">Trainingshistorie</Link>
          <Link href="#">Statistiken</Link>
          <Link href="#">Einstellungen</Link>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

// ─── Bottom ─────────────────────────────────────────────────────────────────

export const Bottom: Story = {
  name: 'Unten',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Details anzeigen</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Schnellansicht</SheetTitle>
          <SheetDescription>Zusammenfassung der letzten Trainingseinheit</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Distanz</p>
            <p className="text-lg">11.07 km</p>
          </div>
          <div>
            <p className="font-medium">Dauer</p>
            <p className="text-lg">58:23 min</p>
          </div>
          <div>
            <p className="font-medium">Pace</p>
            <p className="text-lg">5:16/km</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// ─── With Form ──────────────────────────────────────────────────────────────

export const WithForm: Story = {
  name: 'Mit Formular',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Training hinzufuegen</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Neues Training</SheetTitle>
          <SheetDescription>Erfassen Sie eine neue Trainingseinheit.</SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <Label>Trainingstyp</Label>
            <Select
              options={[
                { value: 'longrun', label: 'Longrun' },
                { value: 'intervalle', label: 'Intervalle' },
                { value: 'tempo', label: 'Tempo' },
                { value: 'regeneration', label: 'Regeneration' },
              ]}
              placeholder="Trainingstyp waehlen"
            />
          </div>
          <InputField label="Distanz (km)" type="number" placeholder="z.B. 10.5" />
          <InputField label="Dauer (min)" type="number" placeholder="z.B. 55" />
        </form>
        <SheetFooter>
          <Button variant="secondary">Abbrechen</Button>
          <Button>Speichern</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// ─── Training: Session Details ──────────────────────────────────────────────

export const TrainingSessionDetails: Story = {
  name: 'Use Case: Trainingsdetails',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Details anzeigen</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Longrun - 13.02.2026</SheetTitle>
          <SheetDescription>Detaillierte Auswertung der Trainingseinheit</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Distanz</span>
            <span>11.07 km</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Dauer</span>
            <span>58:23 min</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Pace (Durchschnitt)</span>
            <span>5:16/km</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Herzfrequenz (Durchschnitt)</span>
            <span>148 bpm</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">Kalorienverbrauch</span>
            <span>782 kcal</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// ─── Training: Filter Panel ─────────────────────────────────────────────────

export const TrainingFilterPanel: Story = {
  name: 'Use Case: Filterpanel',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Filter</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Trainingseinheiten filtern</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <Label>Zeitraum</Label>
            <Select
              options={[
                { value: '7d', label: 'Letzte 7 Tage' },
                { value: '30d', label: 'Letzte 30 Tage' },
                { value: 'quarter', label: 'Letztes Quartal' },
                { value: 'all', label: 'Gesamter Zeitraum' },
              ]}
              placeholder="Zeitraum waehlen"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Trainingstyp</Label>
            <Select
              options={[
                { value: 'all', label: 'Alle' },
                { value: 'longrun', label: 'Longrun' },
                { value: 'intervalle', label: 'Intervalle' },
                { value: 'tempo', label: 'Tempo' },
                { value: 'regeneration', label: 'Regeneration' },
              ]}
              placeholder="Trainingstyp waehlen"
            />
          </div>
          <InputField label="Mindestdistanz (km)" type="number" placeholder="0" />
        </div>
        <SheetFooter>
          <Button variant="secondary">Zuruecksetzen</Button>
          <Button>Anwenden</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
