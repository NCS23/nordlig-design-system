import React from 'react';
import { UploadCloud, File, FileText, Image, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon as IconAtom } from '../../atoms/Icon';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';

// ─── Types ──────────────────────────────────────────────────────────────────

export type FileUploadZoneStatus = 'pending' | 'uploading' | 'complete' | 'error';

export interface FileUploadZoneFile {
  /** Die eigentliche File-Instanz */
  file: File;
  /** Eindeutige ID */
  id: string;
  /** Upload-Fortschritt (0-100) */
  progress: number;
  /** Status der Datei */
  status: FileUploadZoneStatus;
  /** Fehlermeldung bei status='error' */
  error?: string;
  /** Optionale Preview-URL (fuer Bilder) */
  preview?: string;
}

export interface FileUploadZoneProps {
  /** Ueberschrift */
  title?: string;
  /** Beschreibung */
  description?: string;
  /** Akzeptierte Dateitypen (z.B. ".csv,.fit,.png") */
  accept?: string;
  /** Mehrere Dateien erlauben */
  multiple?: boolean;
  /** Maximale Dateigroesse in MB */
  maxSize?: number;
  /** Bild-Vorschau anzeigen */
  preview?: boolean;
  /** Anweisungstext in der Drop-Zone */
  instructionText?: string;
  /** Zusaetzlicher Hinweistext */
  subText?: string;
  /** Aktuelle Dateien (controlled) */
  files?: FileUploadZoneFile[];
  /** Callback wenn Dateien hinzugefuegt werden */
  onFilesAdd?: (files: File[]) => void;
  /** Callback wenn eine Datei entfernt wird */
  onFileRemove?: (file: FileUploadZoneFile, index: number) => void;
  /** Disabled-Zustand */
  disabled?: boolean;
  /** Zusaetzliche CSS-Klassen */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(file: File) {
  const type = file.type;
  if (type.startsWith('image/')) return Image;
  if (type === 'text/csv' || file.name.endsWith('.csv')) return FileText;
  return File;
}

function buildSubText(accept?: string, maxSize?: number): string {
  const parts: string[] = [];
  if (accept) {
    const types = accept
      .split(',')
      .map((t) => t.trim().replace('.', '').toUpperCase());
    parts.push(types.join(', '));
  }
  if (maxSize) parts.push(`max ${maxSize}MB`);
  return parts.length > 0 ? parts.join(' (') + (parts.length > 1 ? ')' : '') : '';
}

// ─── FileUploadZone Component ───────────────────────────────────────────────

const FileUploadZone = React.forwardRef<HTMLDivElement, FileUploadZoneProps>(
  (
    {
      title,
      description,
      accept,
      multiple = true,
      maxSize,
      preview = false,
      instructionText,
      subText,
      files = [],
      onFilesAdd,
      onFileRemove,
      disabled = false,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [dragOver, setDragOver] = React.useState(false);
    const [validationError, setValidationError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const defaultInstruction = instructionText || 'Dateien hierher ziehen oder klicken zum Auswählen';
    const defaultSubText = subText || buildSubText(accept, maxSize);

    const hasActiveUploads = files.some((f) => f.status === 'uploading');

    // ── Validation ──────────────────────────────────────────────────────

    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        return `${file.name} ist zu groß (max ${maxSize}MB)`;
      }
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const matchesExt = acceptedTypes.some((t) => t === ext);
        const matchesMime = acceptedTypes.some((t) => {
          if (t.includes('/')) return file.type === t;
          return false;
        });
        if (!matchesExt && !matchesMime) {
          return `${file.name}: Ungültiger Dateityp`;
        }
      }
      return null;
    };

    // ── Summary ─────────────────────────────────────────────────────────

    const summary = React.useMemo(() => {
      if (files.length === 0) return null;
      const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);
      const completeCount = files.filter((f) => f.status === 'complete').length;
      const errorCount = files.filter((f) => f.status === 'error').length;

      let text = `${files.length} ${files.length === 1 ? 'Datei' : 'Dateien'} (${formatFileSize(totalSize)})`;
      if (completeCount > 0 && completeCount < files.length) {
        text += ` — ${completeCount} fertig`;
      }
      if (errorCount > 0) {
        text += ` — ${errorCount} fehlerhaft`;
      }
      return text;
    }, [files]);

    // ── Event Handlers ──────────────────────────────────────────────────

    const handleFiles = (newFiles: FileList | File[]) => {
      setValidationError(null);
      const fileArray = Array.from(newFiles);

      for (const file of fileArray) {
        const err = validateFile(file);
        if (err) {
          setValidationError(err);
          return;
        }
      }

      onFilesAdd?.(fileArray);
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
      e.target.value = '';
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };

    // ── Status-Icon pro Datei ───────────────────────────────────────────

    const getStatusIcon = (status: FileUploadZoneStatus) => {
      switch (status) {
        case 'complete':
          return <IconAtom icon={CheckCircle2} size="sm" className="text-[var(--color-feedback-success)]" />;
        case 'error':
          return <IconAtom icon={AlertCircle} size="sm" className="text-[var(--color-feedback-error)]" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--spacing-fuzpattern-section-gap)]',
          className
        )}
        data-testid="file-upload-zone"
        aria-busy={hasActiveUploads || undefined}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex flex-col gap-[var(--spacing-fuzpattern-header-gap)]">
            {title && (
              <Heading level={4} className="text-[var(--color-fuzpattern-header-text)]">
                {title}
              </Heading>
            )}
            {description && (
              <Text variant="muted" className="text-[var(--color-fuzpattern-summary-text)]">
                {description}
              </Text>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
          aria-label={ariaLabel || title || 'Dateien auswählen'}
          tabIndex={-1}
        />

        {/* Drop Zone */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label={ariaLabel || title || 'Dateien hochladen'}
          aria-disabled={disabled || undefined}
          data-testid="file-upload-zone-dropzone"
          className={cn(
            'group relative rounded-[var(--radius-fileupload-zone)] cursor-pointer',
            'transition-colors duration-200 motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
            disabled && 'cursor-not-allowed opacity-50',
            !dragOver && [
              'border-2 border-dashed',
              'border-[var(--color-fileupload-zone-border)]',
              'bg-[var(--color-fileupload-zone-bg)]',
              !disabled && 'hover:border-solid hover:border-[var(--color-fileupload-hover-border)] hover:bg-[var(--color-fileupload-hover-bg)]',
            ],
            dragOver && [
              'border-2 border-solid',
              'border-[var(--color-fileupload-drag-border)]',
              'bg-[var(--color-fileupload-drag-bg)]',
            ]
          )}
        >
          <div className="flex flex-col items-center gap-[var(--spacing-fileupload-file-gap)] p-[var(--spacing-fileupload-zone-padding)]">
            <IconAtom
              icon={UploadCloud}
              size={48}
              strokeWidth={1.5}
              className={cn(
                'transition-colors duration-200 motion-reduce:transition-none',
                dragOver
                  ? 'text-[var(--color-fileupload-drag-icon)] scale-105 motion-reduce:scale-100'
                  : 'text-[var(--color-fileupload-zone-icon)] group-hover:scale-105 motion-reduce:group-hover:scale-100'
              )}
            />
            <div className="text-center">
              <p
                className={cn(
                  'text-[length:var(--font-fileupload-instruction-size)] [font-weight:var(--font-fileupload-instruction-weight)]',
                  'transition-colors duration-200 motion-reduce:transition-none',
                  dragOver
                    ? 'text-[var(--color-fileupload-drag-text)]'
                    : 'text-[var(--color-fileupload-zone-text)]'
                )}
              >
                {dragOver ? 'Dateien loslassen…' : defaultInstruction}
              </p>
              {defaultSubText && !dragOver && (
                <p className="mt-[var(--spacing-fileupload-subtext-mt)] text-[length:var(--font-fileupload-hint-size)] text-[var(--color-fileupload-zone-text-sub)]">
                  {defaultSubText}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <p role="alert" className="text-[length:var(--font-fileupload-hint-size)] text-[var(--color-fileupload-error-text)]">
            {validationError}
          </p>
        )}

        {/* Summary */}
        {summary && (
          <Text
            variant="small"
            className="text-[var(--color-fuzpattern-summary-text)]"
            data-testid="file-upload-zone-summary"
            aria-live="polite"
          >
            {summary}
          </Text>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div
            className="flex flex-col gap-[var(--spacing-fuzpattern-list-gap)]"
            data-testid="file-upload-zone-list"
            role="list"
            aria-label="Hochgeladene Dateien"
          >
            {files.map((uploadedFile, idx) => {
              const FileIcon = getFileIcon(uploadedFile.file);
              const isUploading = uploadedFile.status === 'uploading';
              const hasError = uploadedFile.status === 'error';

              return (
                <div
                  key={uploadedFile.id}
                  role="listitem"
                  className={cn(
                    'flex items-center gap-[var(--spacing-fileupload-file-item-gap)]',
                    'rounded-[var(--radius-fuzpattern-item)]',
                    'border border-[var(--color-fuzpattern-item-border)]',
                    'bg-[var(--color-fuzpattern-item-bg)]',
                    'p-[var(--spacing-fuzpattern-item-padding)]',
                    'transition-colors duration-200 motion-reduce:transition-none',
                    hasError && 'border-[var(--color-fileupload-error-border)]'
                  )}
                  data-testid={`file-upload-zone-item-${idx}`}
                >
                  {/* Preview oder Icon */}
                  {preview && uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className={cn(
                        'h-[var(--sizing-fuzpattern-preview-size)] w-[var(--sizing-fuzpattern-preview-size)]',
                        'rounded-[var(--radius-fuzpattern-preview)] object-cover shrink-0'
                      )}
                    />
                  ) : (
                    <IconAtom
                      icon={FileIcon}
                      size="md"
                      className="text-[var(--color-fileupload-file-icon)] shrink-0"
                    />
                  )}

                  {/* Dateiinfo + Progress */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-[var(--spacing-fileupload-file-gap)]">
                      <p className="text-[length:var(--font-fileupload-filename-size)] [font-weight:var(--font-fileupload-instruction-weight)] text-[var(--color-fileupload-file-text)] truncate">
                        {uploadedFile.file.name}
                      </p>
                      {getStatusIcon(uploadedFile.status)}
                    </div>
                    <p className="text-[length:var(--font-fileupload-hint-size)] text-[var(--color-fileupload-file-size)]">
                      {formatFileSize(uploadedFile.file.size)}
                      {hasError && uploadedFile.error && (
                        <span className="ml-[var(--spacing-fuzpattern-error-gap)] text-[var(--color-fileupload-error-text)]">
                          — {uploadedFile.error}
                        </span>
                      )}
                    </p>

                    {/* Per-File Progress */}
                    {isUploading && (
                      <div className="mt-[var(--spacing-fileupload-subtext-mt)]">
                        <div className="h-[var(--sizing-fuzpattern-progress-height)] w-full rounded-[var(--radius-fileupload-progress)] bg-[var(--color-fileupload-progress-bg)] overflow-hidden">
                          <div
                            role="progressbar"
                            aria-valuenow={uploadedFile.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Upload-Fortschritt ${uploadedFile.file.name}`}
                            className="h-full rounded-[var(--radius-fileupload-progress)] bg-[var(--color-fileupload-progress-fill)] transition-[width] duration-500 motion-reduce:transition-none"
                            style={{ width: `${uploadedFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Entfernen-Button — min 44x44px Touch-Target */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileRemove?.(uploadedFile, idx);
                    }}
                    aria-label={`${uploadedFile.file.name} entfernen`}
                    disabled={disabled}
                    className={cn(
                      'shrink-0 flex items-center justify-center',
                      'min-h-[var(--sizing-fuzpattern-remove-target)] min-w-[var(--sizing-fuzpattern-remove-target)]',
                      'rounded-[var(--radius-fuzpattern-item)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
                      'text-[var(--color-fileupload-file-remove)]',
                      'transition-colors duration-200 motion-reduce:transition-none',
                      !disabled && 'hover:text-[var(--color-fileupload-file-remove-hover)] hover:bg-[var(--color-fileupload-hover-bg)]',
                      disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <IconAtom icon={X} size="sm" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

FileUploadZone.displayName = 'FileUploadZone';

export { FileUploadZone };
