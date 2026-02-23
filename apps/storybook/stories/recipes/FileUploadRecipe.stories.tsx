import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardBody,
  FileUploadZone,
  type FileUploadZoneFile,
  Progress,
  Button,
  Badge,
  Heading,
  Text,
  List,
  ListItem,
  Separator,
} from '@nordlig/components';
import { Upload, FileText, Image, X, CheckCircle2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   REZEPT: Datei-Upload
   ═══════════════════════════════════════════════════════════════════════════ */

function FileUploadPage() {
  const [files, setFiles] = React.useState<FileUploadZoneFile[]>([]);
  const [totalProgress, setTotalProgress] = React.useState(0);

  const simulateUpload = (newFiles: File[]) => {
    const uploadFiles: FileUploadZoneFile[] = newFiles.map((file) => ({
      file,
      id: `${Date.now()}-${file.name}`,
      progress: 0,
      status: 'pending' as const,
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);

    uploadFiles.forEach((uf) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id
                ? { ...f, progress: 100, status: 'complete' as const }
                : f,
            ),
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id
                ? { ...f, progress: Math.round(progress), status: 'uploading' as const }
                : f,
            ),
          );
        }
      }, 300 + Math.random() * 400);
    });
  };

  const handleRemove = (_file: FileUploadZoneFile, index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    if (files.length === 0) {
      setTotalProgress(0);
      return;
    }
    const total = files.reduce((sum, f) => sum + f.progress, 0) / files.length;
    setTotalProgress(Math.round(total));
  }, [files]);

  const completedCount = files.filter((f) => f.status === 'complete').length;
  const uploadingCount = files.filter((f) => f.status === 'uploading').length;

  return (
    <div style={{ maxWidth: 640 }}>
      <Card elevation="raised" padding="spacious">
        <CardBody className="flex flex-col gap-8">
          {/* ── Header ───────────────────────────────────────────────── */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Heading level={3}>Dateien hochladen</Heading>
              <Text variant="muted">
                Lade Trainingsdaten (.fit, .gpx, .csv) oder Bilder hoch.
              </Text>
            </div>
            {files.length > 0 && (
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="info" size="sm">
                  {completedCount}/{files.length}
                </Badge>
                {uploadingCount > 0 && (
                  <Badge variant="warning" size="sm">Laedt...</Badge>
                )}
              </div>
            )}
          </div>

          {/* ── Upload-Zone ──────────────────────────────────────────── */}
          <FileUploadZone
            accept=".fit,.gpx,.csv,.png,.jpg,.jpeg"
            multiple
            maxSize={50}
            files={files}
            onFilesAdd={simulateUpload}
            onFileRemove={handleRemove}
          />

          {/* ── Fortschritt & Dateiliste ─────────────────────────────── */}
          {files.length > 0 && (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Text variant="small">Gesamtfortschritt</Text>
                  <Text variant="small" className="font-medium">{totalProgress}%</Text>
                </div>
                <Progress
                  value={totalProgress}
                  color={totalProgress === 100 ? 'success' : 'default'}
                  size="sm"
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-4">
                <Text variant="small" className="font-medium">
                  Hochgeladene Dateien
                </Text>

                <List gap="sm">
                  {files.map((f, i) => (
                    <ListItem
                      key={f.id}
                      icon={
                        f.file.type.startsWith('image/')
                          ? <Image size={16} className="text-[var(--color-text-muted)]" />
                          : <FileText size={16} className="text-[var(--color-text-muted)]" />
                      }
                      description={
                        f.status === 'complete'
                          ? `${(f.file.size / 1024).toFixed(1)} KB`
                          : f.status === 'uploading'
                            ? `${f.progress}% hochgeladen`
                            : 'Wartet...'
                      }
                      action={
                        f.status === 'complete' ? (
                          <CheckCircle2 size={16} className="text-[var(--color-text-success)]" />
                        ) : (
                          <button
                            onClick={() => handleRemove(f, i)}
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-error)] p-1"
                            aria-label={`${f.file.name} entfernen`}
                          >
                            <X size={16} />
                          </button>
                        )
                      }
                    >
                      {f.file.name}
                    </ListItem>
                  ))}
                </List>
              </div>

              {completedCount === files.length && files.length > 0 && (
                <Button variant="primary" className="w-full">
                  <Upload size={16} className="mr-2" />
                  {files.length} {files.length === 1 ? 'Datei' : 'Dateien'} verarbeiten
                </Button>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

const meta: Meta<typeof FileUploadPage> = {
  title: 'Recipes/Datei Upload',
  component: FileUploadPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zeigt wie FileUploadZone, Progress, Card, Button, Badge und List ' +
          'einen Datei-Upload mit Fortschrittsanzeige und Dateiliste aufbauen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FileUploadPage>;

export const Default: Story = {};
