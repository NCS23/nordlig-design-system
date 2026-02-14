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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
          Sheet oeffnen
        </button>
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
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Speichern
          </button>
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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Navigation oeffnen
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Hauptmenue der Anwendung</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 text-sm">
          <a href="#" className="py-2 hover:underline">Dashboard</a>
          <a href="#" className="py-2 hover:underline">Trainingshistorie</a>
          <a href="#" className="py-2 hover:underline">Statistiken</a>
          <a href="#" className="py-2 hover:underline">Einstellungen</a>
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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Details anzeigen
        </button>
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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Training hinzufuegen
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Neues Training</SheetTitle>
          <SheetDescription>Erfassen Sie eine neue Trainingseinheit.</SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Trainingstyp</label>
            <select className="border rounded px-2 py-1.5">
              <option>Longrun</option>
              <option>Intervalle</option>
              <option>Tempo</option>
              <option>Regeneration</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Distanz (km)</label>
            <input type="number" className="border rounded px-2 py-1.5" placeholder="z.B. 10.5" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Dauer (min)</label>
            <input type="number" className="border rounded px-2 py-1.5" placeholder="z.B. 55" />
          </div>
        </form>
        <SheetFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Speichern
          </button>
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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Details anzeigen
        </button>
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
      <SheetTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Filter
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>Trainingseinheiten filtern</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 text-sm">
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
            <label className="font-medium">Mindestdistanz (km)</label>
            <input type="number" className="border rounded px-2 py-1.5" placeholder="0" />
          </div>
        </div>
        <SheetFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Zuruecksetzen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Anwenden
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
