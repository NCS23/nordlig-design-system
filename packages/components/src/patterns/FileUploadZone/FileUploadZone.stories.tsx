import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FileUploadZone, type FileUploadZoneFile } from './FileUploadZone';

/* ─── Meta ─── */

const meta: Meta<typeof FileUploadZone> = {
  title: 'Patterns/FileUploadZone',
  component: FileUploadZone,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
    preview: { control: 'boolean' },
    disabled: { control: 'boolean' },
    instructionText: { control: 'text' },
    subText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadZone>;

/* ─── Helpers ─── */

let idCounter = 0;
function createDemoFile(
  name: string,
  size: number,
  type: string,
  status: FileUploadZoneFile['status'] = 'pending',
  progress = 0,
  error?: string
): FileUploadZoneFile {
  return {
    file: new File(['x'.repeat(Math.min(size, 100))], name, { type }),
    id: `demo-${++idCounter}`,
    progress,
    status,
    error,
  };
}

/* ─── Interactive Wrapper ─── */

function InteractiveWrapper({
  initialFiles = [],
  ...props
}: React.ComponentProps<typeof FileUploadZone> & { initialFiles?: FileUploadZoneFile[] }) {
  const [files, setFiles] = React.useState<FileUploadZoneFile[]>(initialFiles);

  const handleFilesAdd = (newFiles: File[]) => {
    const uploaded: FileUploadZoneFile[] = newFiles.map((file) => ({
      file,
      id: `file-${++idCounter}-${Date.now()}`,
      progress: 0,
      status: 'pending' as const,
    }));
    setFiles((prev) => [...prev, ...uploaded]);

    // Upload-Simulation
    uploaded.forEach((uf) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id ? { ...f, progress: 100, status: 'complete' as const } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id ? { ...f, progress: Math.round(progress), status: 'uploading' as const } : f
            )
          );
        }
      }, 500);
    });
  };

  const handleFileRemove = (_file: FileUploadZoneFile, index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FileUploadZone
      {...props}
      files={files}
      onFilesAdd={handleFilesAdd}
      onFileRemove={handleFileRemove}
    />
  );
}

/* ─── Stories ─── */

export const Default: Story = {
  render: () => (
    <InteractiveWrapper
      title="Dateien hochladen"
      description="Ziehe Dateien in die Zone oder klicke zum Auswählen."
    />
  ),
};

export const CsvUpload: Story = {
  name: 'CSV-Upload',
  render: () => (
    <InteractiveWrapper
      title="Trainingsdaten importieren"
      description="Lade CSV- oder FIT-Dateien deiner Sportuhr hoch."
      accept=".csv,.fit"
      maxSize={50}
    />
  ),
};

export const MitDateien: Story = {
  name: 'Mit Dateien',
  render: () => {
    const files: FileUploadZoneFile[] = [
      createDemoFile('morgen-lauf.csv', 2048, 'text/csv', 'complete', 100),
      createDemoFile('intervall.fit', 4096, 'application/octet-stream', 'complete', 100),
      createDemoFile('rennrad-tour.csv', 8192, 'text/csv', 'uploading', 65),
    ];

    return (
      <InteractiveWrapper
        title="Trainingsdaten"
        description="3 Dateien hochgeladen"
        accept=".csv,.fit"
        initialFiles={files}
      />
    );
  },
};

export const MitFortschritt: Story = {
  name: 'Upload-Fortschritt',
  render: () => {
    const files: FileUploadZoneFile[] = [
      createDemoFile('session-01.csv', 1024, 'text/csv', 'complete', 100),
      createDemoFile('session-02.csv', 2048, 'text/csv', 'uploading', 45),
      createDemoFile('session-03.csv', 3072, 'text/csv', 'pending', 0),
    ];

    return (
      <FileUploadZone
        title="Mehrere Dateien"
        description="Verschiedene Upload-Status"
        files={files}
      />
    );
  },
};

export const MitFehlern: Story = {
  name: 'Fehler-Status',
  render: () => {
    const files: FileUploadZoneFile[] = [
      createDemoFile('valid.csv', 1024, 'text/csv', 'complete', 100),
      createDemoFile('corrupt.csv', 2048, 'text/csv', 'error', 30, 'Datei beschaedigt'),
      createDemoFile('too-large.fit', 100 * 1024 * 1024, 'application/octet-stream', 'error', 0, 'Datei zu gross'),
    ];

    return (
      <FileUploadZone
        title="Upload mit Fehlern"
        description="Einige Dateien konnten nicht hochgeladen werden."
        files={files}
      />
    );
  },
};

export const BildUpload: Story = {
  name: 'Bild-Upload mit Vorschau',
  render: () => (
    <InteractiveWrapper
      title="Bilder hochladen"
      description="Unterstuetzte Formate: PNG, JPG, WebP"
      accept=".png,.jpg,.jpeg,.webp"
      maxSize={10}
      preview
    />
  ),
};

export const Disabled: Story = {
  render: () => {
    const files: FileUploadZoneFile[] = [
      createDemoFile('locked.csv', 1024, 'text/csv', 'complete', 100),
    ];

    return (
      <FileUploadZone
        title="Gesperrter Upload"
        description="Upload ist derzeit nicht verfuegbar."
        files={files}
        disabled
      />
    );
  },
};

export const OhneHeader: Story = {
  name: 'Ohne Header',
  render: () => (
    <InteractiveWrapper
      accept=".csv"
      instructionText="CSV-Dateien ablegen"
      subText="Nur CSV-Dateien, max 10MB"
      maxSize={10}
    />
  ),
};

export const EinzelDatei: Story = {
  name: 'Einzeldatei-Upload',
  render: () => (
    <InteractiveWrapper
      title="Profilbild hochladen"
      description="Waehle ein Bild fuer dein Profil."
      accept=".png,.jpg,.jpeg"
      maxSize={5}
      multiple={false}
      preview
    />
  ),
};
