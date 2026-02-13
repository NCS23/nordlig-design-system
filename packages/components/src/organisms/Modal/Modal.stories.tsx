import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from './Modal';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

const meta: Meta = {
  title: 'Organisms/Modal',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Basic: Story = {
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button>Dialog öffnen</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Bestätigung</ModalTitle>
          <ModalDescription>Möchten Sie fortfahren?</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--color-text-base)]">
            Diese Aktion erfordert Ihre Bestätigung.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Abbrechen</Button>
          <Button variant="primary" size="sm">Bestätigen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── With Description ────────────────────────────────────────────────────────

export const WithDescription: Story = {
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button>Details anzeigen</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Trainingseinheit erstellt</ModalTitle>
          <ModalDescription>
            Die neue Trainingseinheit wurde erfolgreich in Ihrem Plan gespeichert.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2 text-sm text-[var(--color-text-base)]">
            <p><strong>Typ:</strong> Longrun</p>
            <p><strong>Distanz:</strong> 11.07 km</p>
            <p><strong>Datum:</strong> 13.02.2026</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm">Schließen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── Size Variants ───────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size: Small',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button variant="secondary">Small Modal</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Kleine Bestätigung</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm">Kompakter Dialog für schnelle Bestätigungen.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Nein</Button>
          <Button variant="primary" size="sm">Ja</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const SizeLarge: Story = {
  name: 'Size: Large',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button variant="secondary">Large Modal</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Trainingsplan KW07</ModalTitle>
          <ModalDescription>Übersicht aller geplanten Einheiten</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[var(--color-border-muted)]">
              <span>Montag</span><span>Regeneration – 5 km</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--color-border-muted)]">
              <span>Mittwoch</span><span>Intervalle – 8 km</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--color-border-muted)]">
              <span>Freitag</span><span>Tempo – 10 km</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Sonntag</span><span>Longrun – 18 km</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Bearbeiten</Button>
          <Button variant="primary" size="sm">Plan starten</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const SizeXL: Story = {
  name: 'Size: Extra Large',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button variant="secondary">XL Modal</Button>
      </ModalTrigger>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>Erweiterte Analyse</ModalTitle>
          <ModalDescription>Detaillierte Auswertung der letzten 4 Wochen</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--color-bg-surface)]">
              <span className="font-medium">Gesamtdistanz</span>
              <span className="text-2xl font-bold">142.3 km</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--color-bg-surface)]">
              <span className="font-medium">Einheiten</span>
              <span className="text-2xl font-bold">16</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--color-bg-surface)]">
              <span className="font-medium">Ø Pace</span>
              <span className="text-2xl font-bold">5:42/km</span>
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--color-bg-surface)]">
              <span className="font-medium">Ø Herzfrequenz</span>
              <span className="text-2xl font-bold">148 bpm</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Export</Button>
          <Button variant="primary" size="sm">Schließen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── Delete Confirmation (Use Case) ─────────────────────────────────────────

export const DeleteConfirmation: Story = {
  name: 'Use Case: Delete Confirmation',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button variant="ghost">Training löschen</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Training löschen?</ModalTitle>
          <ModalDescription>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--color-text-base)]">
            Training vom <strong>13.02.2026</strong> (Longrun, 11.07 km)
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Abbrechen</Button>
          <Button variant="primary" size="sm">Löschen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── Settings Dialog (Use Case) ─────────────────────────────────────────────

export const SettingsDialog: Story = {
  name: 'Use Case: Settings',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button variant="secondary">Einstellungen</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Einstellungen</ModalTitle>
          <ModalDescription>
            Passen Sie Ihre persönlichen Trainingsparameter an.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text-base)]">
                Maximale Herzfrequenz
              </label>
              <Input type="number" placeholder="z.B. 190" inputSize="sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text-base)]">
                Standard-Trainingstyp
              </label>
              <Input placeholder="z.B. Longrun" inputSize="sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text-base)]">
                Wöchentliches Kilometerziel
              </label>
              <Input type="number" placeholder="z.B. 50" inputSize="sm" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm">Abbrechen</Button>
          <Button variant="primary" size="sm">Speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── Without Close Button ────────────────────────────────────────────────────

export const WithoutCloseButton: Story = {
  name: 'Without Close Button',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button>Ohne X-Button</Button>
      </ModalTrigger>
      <ModalContent showClose={false}>
        <ModalHeader>
          <ModalTitle>Pflichtbestätigung</ModalTitle>
          <ModalDescription>
            Diese Meldung muss explizit bestätigt werden.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--color-text-base)]">
            Bitte bestätigen Sie die Nutzungsbedingungen.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm">Akzeptieren</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// ─── Long Content (Scrollable) ───────────────────────────────────────────────

export const LongContent: Story = {
  name: 'Long Content (Scrollable)',
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button>Langer Inhalt</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Trainingsverlauf</ModalTitle>
          <ModalDescription>Alle Einheiten der letzten 30 Tage</ModalDescription>
        </ModalHeader>
        <ModalBody className="max-h-[60vh]">
          <div className="flex flex-col gap-2 text-sm">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-[var(--color-border-muted)]"
              >
                <span>
                  {new Date(2026, 1, 13 - i).toLocaleDateString('de-DE')}
                </span>
                <span>{(Math.random() * 15 + 3).toFixed(1)} km</span>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm">Schließen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
