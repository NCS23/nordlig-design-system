import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    preview: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    maxSize: { control: 'number' },
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'FileUpload with drag & drop zone, file list, progress bar, file validation, and image preview. Supports single and multiple file uploads.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Datei hochladen',
  },
};

export const WithAcceptAndMaxSize: Story = {
  name: 'CSV Upload',
  args: {
    label: 'CSV Upload',
    accept: '.csv,.fit',
    maxSize: 10,
  },
};

export const Multiple: Story = {
  name: 'Multiple Files',
  args: {
    label: 'Trainingseinheiten',
    accept: '.csv,.fit',
    multiple: true,
    maxSize: 10,
  },
};

export const WithProgress: Story = {
  name: 'Upload Progress',
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [running, setRunning] = React.useState(false);

    const startUpload = (files: File[]) => {
      if (files.length === 0) return;
      setProgress(0);
      setRunning(true);
    };

    React.useEffect(() => {
      if (!running) return;
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setRunning(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }, [running]);

    return (
      <div style={{ maxWidth: '400px' }}>
        <FileUpload
          label="Upload mit Fortschritt"
          accept=".csv"
          onUpload={startUpload}
          progress={running || progress > 0 ? progress : undefined}
        />
      </div>
    );
  },
};

export const ErrorFileTooLarge: Story = {
  name: 'Error - Datei zu groß',
  args: {
    label: 'CSV Upload',
    accept: '.csv',
    maxSize: 1,
    errorMessage: 'Datei ist zu groß (max 1MB)',
    error: true,
  },
};

export const ErrorInvalidType: Story = {
  name: 'Error - Ungültiger Dateityp',
  args: {
    label: 'CSV Upload',
    accept: '.csv',
    errorMessage: 'Nur CSV-Dateien erlaubt',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Gesperrt',
    disabled: true,
  },
};

export const ImagePreview: Story = {
  name: 'Bild-Vorschau',
  args: {
    label: 'Screenshots',
    accept: '.png,.jpg,.jpeg',
    multiple: true,
    maxSize: 10,
    preview: true,
  },
};

export const CustomText: Story = {
  name: 'Benutzerdefinierter Text',
  args: {
    label: 'Garmin FIT Upload',
    instructionText: 'FIT-Datei von Garmin Connect exportieren und hier ablegen',
    subText: 'Nur .fit Dateien, max 20MB',
    accept: '.fit',
    maxSize: 20,
  },
};

// ─── Training Analyzer Use Cases ──────────────────────────────────────────

export const TrainingCSV: Story = {
  name: 'Training - Apple Watch CSV',
  render: () => {
    const handleUpload = (files: File[]) => {
      console.log('CSV uploaded:', files.map((f) => f.name));
    };
    return (
      <div style={{ maxWidth: '400px' }}>
        <FileUpload
          label="Apple Watch CSV"
          accept=".csv"
          onUpload={handleUpload}
          maxSize={5}
          instructionText="CSV-Export von Apple Health hierher ziehen"
          subText="CSV (max 5MB)"
        />
      </div>
    );
  },
};

export const TrainingMultiple: Story = {
  name: 'Training - Mehrere Einheiten',
  render: () => {
    const handleUpload = (files: File[]) => {
      console.log('Files uploaded:', files.map((f) => f.name));
    };
    return (
      <div style={{ maxWidth: '400px' }}>
        <FileUpload
          label="Trainingseinheiten"
          accept=".csv,.fit"
          multiple
          onUpload={handleUpload}
          maxSize={10}
        />
      </div>
    );
  },
};

export const TrainingScreenshots: Story = {
  name: 'Training - Screenshots',
  render: () => {
    return (
      <div style={{ maxWidth: '400px' }}>
        <FileUpload
          label="Screenshots"
          accept=".png,.jpg,.jpeg"
          multiple
          maxSize={10}
          preview
        />
      </div>
    );
  },
};
