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

// ─── DesignTokens ──────────────────────────────────────────────────────────

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
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-overlay</td>
            <td className="py-2 pr-4 font-mono text-xs">rgba(0,0,0,0.5)</td>
            <td className="py-2 pr-4">Backdrop / Hintergrund-Abdunkelung</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Content-Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-title</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Titel-Textfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-description</td>
            <td className="py-2 pr-4 font-mono text-xs">#475569</td>
            <td className="py-2 pr-4">Beschreibungs-Textfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-border</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Rahmenfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-action-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#ef4444</td>
            <td className="py-2 pr-4">Action-Button Hintergrund (destruktiv)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-action-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#ffffff</td>
            <td className="py-2 pr-4">Action-Button Textfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-action-hover-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#b91c1c</td>
            <td className="py-2 pr-4">Action-Button Hover-Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-cancel-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#f1f5f9</td>
            <td className="py-2 pr-4">Cancel-Button Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-cancel-text</td>
            <td className="py-2 pr-4 font-mono text-xs">#0f172a</td>
            <td className="py-2 pr-4">Cancel-Button Textfarbe</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--color-alertdlg-cancel-hover-bg</td>
            <td className="py-2 pr-4 font-mono text-xs">#e2e8f0</td>
            <td className="py-2 pr-4">Cancel-Button Hover-Hintergrund</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--shadow-alertdlg</td>
            <td className="py-2 pr-4 font-mono text-xs">0 20px 25px rgba(0,0,0,0.1)...</td>
            <td className="py-2 pr-4">Content-Schatten</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--radius-alertdlg</td>
            <td className="py-2 pr-4 font-mono text-xs">0.5rem</td>
            <td className="py-2 pr-4">Eckenradius (Content + Buttons)</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-alertdlg-padding</td>
            <td className="py-2 pr-4 font-mono text-xs">24px</td>
            <td className="py-2 pr-4">Content-Innenabstand</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4 font-mono text-xs">--spacing-alertdlg-gap</td>
            <td className="py-2 pr-4 font-mono text-xs">12px</td>
            <td className="py-2 pr-4">Abstand zwischen Sektionen</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
