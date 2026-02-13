import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from './Toast';
import { Button } from '../../atoms/Button';
import * as ToastPrimitive from '@radix-ui/react-toast';

const meta: Meta = {
  title: 'Molecules/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ToastDemo({
  variant,
  title,
  description,
}: {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}) {
  return (
    <ToastPrimitive.Provider>
      <Toast
        variant={variant}
        title={title}
        description={description}
        open
        duration={Infinity}
      />
      <ToastPrimitive.Viewport className="relative flex flex-col gap-2 w-[380px]" />
    </ToastPrimitive.Provider>
  );
}

function InteractiveToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          toast({
            title: 'Upload erfolgreich',
            description: 'CSV-Datei wurde importiert (23 Einträge)',
            variant: 'success',
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          toast({
            title: 'Upload fehlgeschlagen',
            description: 'Datei zu groß (max 10MB)',
            variant: 'error',
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          toast({
            title: 'Überprüfen Sie Ihre Eingabe',
            description: 'HF-Wert scheint ungewöhnlich hoch (>220)',
            variant: 'warning',
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: 'Plan aktualisiert',
            description: 'KW07 Tempo auf 6:15/km angepasst',
            variant: 'info',
          })
        }
      >
        Info Toast
      </Button>
    </div>
  );
}

// ─── Static Variants ─────────────────────────────────────────────────────────

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Upload erfolgreich"
      description="CSV-Datei wurde importiert (23 Einträge)"
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastDemo
      variant="error"
      title="Upload fehlgeschlagen"
      description="Datei zu groß (max 10MB)"
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Überprüfen Sie Ihre Eingabe"
      description="HF-Wert scheint ungewöhnlich hoch (>220)"
    />
  ),
};

export const InfoToast: Story = {
  name: 'Info',
  render: () => (
    <ToastDemo
      variant="info"
      title="Plan aktualisiert"
      description="KW07 Tempo auf 6:15/km angepasst"
    />
  ),
};

// ─── Without Description ─────────────────────────────────────────────────────

export const WithoutDescription: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Training gespeichert"
    />
  ),
};

// ─── Long Description ────────────────────────────────────────────────────────

export const LongDescription: Story = {
  render: () => (
    <ToastDemo
      variant="info"
      title="Trainingsplan synchronisiert"
      description="Alle 16 Einheiten der KW07 wurden erfolgreich mit Ihrem Garmin-Konto synchronisiert. Die Daten sind jetzt auf allen verbundenen Geräten verfügbar."
    />
  ),
};

// ─── Interactive (with Provider) ─────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (Click to trigger)',
  render: () => (
    <ToastProvider position="bottom-right">
      <InteractiveToastDemo />
    </ToastProvider>
  ),
};

// ─── Training Use Cases ──────────────────────────────────────────────────────

export const TrainingUploadSuccess: Story = {
  name: 'Use Case: Upload Success',
  render: () => (
    <ToastDemo
      variant="success"
      title="Upload erfolgreich"
      description="CSV-Datei wurde importiert (23 Einträge)"
    />
  ),
};

export const TrainingSaveSuccess: Story = {
  name: 'Use Case: Save Success',
  render: () => (
    <ToastDemo
      variant="success"
      title="Training gespeichert"
      description="Longrun vom 13.02.2026"
    />
  ),
};

export const TrainingUploadError: Story = {
  name: 'Use Case: Upload Error',
  render: () => (
    <ToastDemo
      variant="error"
      title="Upload fehlgeschlagen"
      description="Datei zu groß (max 10MB)"
    />
  ),
};

export const TrainingValidationWarning: Story = {
  name: 'Use Case: Validation Warning',
  render: () => (
    <ToastDemo
      variant="warning"
      title="Überprüfen Sie Ihre Eingabe"
      description="HF-Wert scheint ungewöhnlich hoch (>220)"
    />
  ),
};

export const TrainingPlanUpdated: Story = {
  name: 'Use Case: Plan Updated',
  render: () => (
    <ToastDemo
      variant="info"
      title="Plan aktualisiert"
      description="KW07 Tempo auf 6:15/km angepasst"
    />
  ),
};

// ─── All Variants Overview ───────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-3 w-[380px]">
      <ToastPrimitive.Provider>
        <Toast
          variant="success"
          title="Erfolg"
          description="Aktion erfolgreich abgeschlossen"
          open
          duration={Infinity}
        />
        <Toast
          variant="error"
          title="Fehler"
          description="Ein Fehler ist aufgetreten"
          open
          duration={Infinity}
        />
        <Toast
          variant="warning"
          title="Warnung"
          description="Bitte überprüfen Sie die Eingabe"
          open
          duration={Infinity}
        />
        <Toast
          variant="info"
          title="Info"
          description="Neue Daten verfügbar"
          open
          duration={Infinity}
        />
        <ToastPrimitive.Viewport className="relative flex flex-col gap-3" />
      </ToastPrimitive.Provider>
    </div>
  ),
};
