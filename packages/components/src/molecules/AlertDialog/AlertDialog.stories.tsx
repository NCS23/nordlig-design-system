import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';

const meta: Meta = {
  title: 'Molecules/AlertDialog',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Default ───────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard (Destruktiv)',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded border text-red-600">
          Training loeschen
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Training loeschen?</AlertDialogTitle>
          <AlertDialogDescription>
            Moechten Sie das Training vom 13.02.2026 (Longrun, 11.07 km) wirklich
            loeschen? Diese Aktion kann nicht rueckgaengig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction>Endgueltig loeschen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// ─── NonDestructive ────────────────────────────────────────────────────────

export const NonDestructive: Story = {
  name: 'Primaere Aktion',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded border">
          Daten exportieren
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Trainingsdaten exportieren?</AlertDialogTitle>
          <AlertDialogDescription>
            Alle Trainingsdaten der letzten 12 Monate werden als CSV-Datei
            exportiert. Der Export kann einige Sekunden dauern.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction className="bg-[var(--color-toggle-active-bg)] hover:bg-[var(--color-toggle-active-bg)] hover:opacity-90">
            Exportieren
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// ─── OpenState ─────────────────────────────────────────────────────────────

export const OpenState: Story = {
  name: 'Geoeffneter Zustand',
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium rounded border text-red-600">
          Training loeschen
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Training loeschen?</AlertDialogTitle>
          <AlertDialogDescription>
            Moechten Sie das Training vom 13.02.2026 (Longrun, 11.07 km) wirklich
            loeschen? Diese Aktion kann nicht rueckgaengig gemacht werden. Alle
            zugehoerigen Herzfrequenz- und GPS-Daten werden ebenfalls entfernt.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction>Endgueltig loeschen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
