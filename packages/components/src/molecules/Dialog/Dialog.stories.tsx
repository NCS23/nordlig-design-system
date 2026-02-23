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
import { Button } from '../../atoms/Button';
import { InputField } from '../InputField';
import { Textarea } from '../Textarea';
import { Radio } from '../../atoms/Radio';
import { RadioGroup } from '../RadioGroup';

const meta: Meta = {
  title: 'Molecules/Dialog',
};

export default meta;
type Story = StoryObj;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Dialog oeffnen</Button>
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
          <Button variant="secondary">Abbrechen</Button>
          <Button>Bestaetigen</Button>
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
      <DialogTrigger asChild>
        <Button variant="secondary">Eintrag loeschen</Button>
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
          <Button variant="secondary">Abbrechen</Button>
          <Button>Endgueltig loeschen</Button>
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
      <DialogTrigger asChild>
        <Button variant="secondary">Feedback senden</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            Teilen Sie uns Ihre Erfahrungen mit der Anwendung mit.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3">
          <InputField label="Betreff" placeholder="Kurze Beschreibung" />
          <Textarea label="Nachricht" rows={3} placeholder="Ihr Feedback..." />
        </form>
        <DialogFooter>
          <Button variant="secondary">Abbrechen</Button>
          <Button>Senden</Button>
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
      <DialogTrigger asChild>
        <Button variant="secondary">Training loeschen</Button>
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
          <Button variant="secondary">Abbrechen</Button>
          <Button>Loeschen</Button>
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
      <DialogTrigger asChild>
        <Button variant="secondary">Daten exportieren</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trainingsdaten exportieren</DialogTitle>
          <DialogDescription>
            Waehlen Sie das gewuenschte Format fuer den Export Ihrer Trainingsdaten.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup name="format" defaultValue="csv" aria-label="Exportformat">
          <Radio label="CSV" value="csv" />
          <Radio label="JSON" value="json" />
          <Radio label="GPX" value="gpx" />
        </RadioGroup>
        <DialogFooter>
          <Button variant="secondary">Abbrechen</Button>
          <Button>Exportieren</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Long Content ───────────────────────────────────────────────────────────

// ─── Open State ─────────────────────────────────────────────────────────────

export const OpenState: Story = {
  name: 'Geoeffneter Zustand',
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="secondary">Dialog oeffnen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Geoeffneter Dialog</DialogTitle>
          <DialogDescription>
            Dieser Dialog wird standardmaessig geoeffnet dargestellt, um Overlay,
            Animationen und Layoutverhalten direkt sichtbar zu machen.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">
          Ideal fuer visuelle Regression-Tests und Design-Reviews.
        </p>
        <DialogFooter>
          <Button variant="secondary">Schliessen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ─── Open Confirmation ─────────────────────────────────────────────────────

export const OpenConfirmation: Story = {
  name: 'Geoeffnete Loeschbestätigung',
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="secondary">Eintrag loeschen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eintrag endgueltig loeschen?</DialogTitle>
          <DialogDescription>
            Diese Aktion kann nicht rueckgaengig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Abbrechen</Button>
          <Button>Endgueltig loeschen</Button>
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
      <DialogTrigger asChild>
        <Button variant="secondary">Nutzungsbedingungen</Button>
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
          <Button variant="secondary">Ablehnen</Button>
          <Button>Akzeptieren</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
