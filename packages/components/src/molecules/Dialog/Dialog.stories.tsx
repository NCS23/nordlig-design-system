import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog';

const meta: Meta = {
  title: 'Molecules/Dialog',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Dialog oeffnen
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hinweis</DialogTitle>
          <DialogDescription>
            Dies ist ein einfacher Bestaetigungsdialog.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">Moechten Sie fortfahren?</p>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Bestaetigen
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Confirmation ───────────────────────────────────────────────────────────

export const Confirmation: Story = {
  name: 'Loeschbestätigung',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border text-red-600">
          Eintrag loeschen
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eintrag endgueltig loeschen?</DialogTitle>
          <DialogDescription>
            Diese Aktion kann nicht rueckgaengig gemacht werden. Alle zugehoerigen
            Daten werden unwiderruflich entfernt.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-red-600 text-white">
            Endgueltig loeschen
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── With Form ──────────────────────────────────────────────────────────────

export const WithForm: Story = {
  name: 'Mit Formular',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Feedback senden
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Teilen Sie uns Ihre Erfahrungen mit der Anwendung mit.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Betreff</label>
            <input className="border rounded px-2 py-1.5 text-sm" placeholder="Kurze Beschreibung" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nachricht</label>
            <textarea className="border rounded px-2 py-1.5 text-sm" rows={3} placeholder="Ihr Feedback..." />
          </div>
        </form>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Senden
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Training: Delete Session ───────────────────────────────────────────────

export const TrainingDeleteSession: Story = {
  name: 'Use Case: Training loeschen',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border text-red-600">
          Training loeschen
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Training loeschen?</DialogTitle>
          <DialogDescription>
            Moechten Sie das Training vom 13.02.2026 (Longrun, 11.07 km) wirklich loeschen?
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">
          Diese Aktion kann nicht rueckgaengig gemacht werden. Alle zugehoerigen
          Herzfrequenz- und GPS-Daten werden ebenfalls entfernt.
        </p>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-red-600 text-white">Loeschen</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Training: Export Data ──────────────────────────────────────────────────

export const TrainingExportData: Story = {
  name: 'Use Case: Daten exportieren',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Daten exportieren
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trainingsdaten exportieren</DialogTitle>
          <DialogDescription>
            Waehlen Sie das gewuenschte Format fuer den Export Ihrer Trainingsdaten.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="format" defaultChecked /> CSV
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="format" /> JSON
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="format" /> GPX
          </label>
        </div>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Abbrechen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Exportieren
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Long Content ───────────────────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Langer Inhalt',
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Nutzungsbedingungen
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nutzungsbedingungen</DialogTitle>
          <DialogDescription>
            Bitte lesen Sie die folgenden Bedingungen sorgfaeltig durch.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-auto text-sm flex flex-col gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>
              Absatz {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
        <DialogFooter>
          <button className="px-3 py-1.5 text-sm rounded border">Ablehnen</button>
          <button className="px-3 py-1.5 text-sm rounded bg-[var(--color-toggle-active-bg)] text-[var(--color-toggle-active-text)]">
            Akzeptieren
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
