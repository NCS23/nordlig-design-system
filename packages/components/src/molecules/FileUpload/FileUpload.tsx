import React from 'react';
import { UploadCloud, File, FileText, Image, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon as IconAtom } from '../../atoms/Icon';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

export interface FileUploadProps {
  /** Label text */
  label?: string;
  /** Accepted file types (e.g. ".csv,.fit,.png") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Callback when files are added */
  onUpload?: (files: File[]) => void;
  /** Callback when a file is removed */
  onRemove?: (file: File, index: number) => void;
  /** Maximum file size in MB */
  maxSize?: number;
  /** Show image previews */
  preview?: boolean;
  /** Upload progress (0-100) */
  progress?: number;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom instruction text */
  instructionText?: string;
  /** Custom sub-text (file type hints) */
  subText?: string;
  /** Additional class name */
  className?: string;
  /** aria-label */
  'aria-label'?: string;
}

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

let fileIdCounter = 0;
function generateFileId(): string {
  return `file-${++fileIdCounter}-${Date.now()}`;
}

// ─── FileUpload Component ───────────────────────────────────────────────────

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      label,
      accept,
      multiple = false,
      onUpload,
      onRemove,
      maxSize,
      preview = false,
      progress,
      error = false,
      errorMessage,
      disabled = false,
      instructionText,
      subText,
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const [dragOver, setDragOver] = React.useState(false);
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    const [validationError, setValidationError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const hasError = error || !!errorMessage || !!validationError;
    const displayError = errorMessage || validationError;

    const defaultInstruction = instructionText || 'Dateien hierher ziehen oder klicken zum Auswählen';
    const defaultSubText = subText || buildSubText(accept, maxSize);

    function buildSubText(acc?: string, max?: number): string {
      const parts: string[] = [];
      if (acc) {
        const types = acc
          .split(',')
          .map((t) => t.trim().replace('.', '').toUpperCase());
        parts.push(types.join(', '));
      }
      if (max) parts.push(`max ${max}MB`);
      return parts.length > 0 ? parts.join(' (') + (parts.length > 1 ? ')' : '') : '';
    }

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

    const addFiles = (newFiles: FileList | File[]) => {
      setValidationError(null);
      const fileArray = Array.from(newFiles);

      // Validate all files
      for (const file of fileArray) {
        const err = validateFile(file);
        if (err) {
          setValidationError(err);
          return;
        }
      }

      const uploadedFiles: UploadedFile[] = fileArray.map((file) => {
        const uploaded: UploadedFile = { file, id: generateFileId() };
        if (preview && file.type.startsWith('image/')) {
          uploaded.preview = URL.createObjectURL(file);
        }
        return uploaded;
      });

      if (multiple) {
        setFiles((prev) => [...prev, ...uploadedFiles]);
      } else {
        // Clean up old previews
        files.forEach((f) => {
          if (f.preview) URL.revokeObjectURL(f.preview);
        });
        setFiles(uploadedFiles);
      }

      onUpload?.(fileArray);
    };

    const removeFile = (index: number) => {
      const removed = files[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      setFiles((prev) => prev.filter((_, i) => i !== index));
      onRemove?.(removed.file, index);
      setValidationError(null);
    };

    // Clean up previews on unmount
    React.useEffect(() => {
      return () => {
        files.forEach((f) => {
          if (f.preview) URL.revokeObjectURL(f.preview);
        });
      };
    }, []);

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
        addFiles(e.target.files);
      }
      // Reset input value so same file can be re-selected
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
        addFiles(e.dataTransfer.files);
      }
    };

    const hasFiles = files.length > 0;

    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-[var(--spacing-fileupload-file-gap)]', className)}>
        {label && (
          <label className="text-[length:var(--sizing-input-sm-font-size)] font-medium text-[var(--color-input-text)]">
            {label}
          </label>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
          aria-label={ariaLabel || label || 'Datei auswählen'}
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
          aria-label={ariaLabel || label || 'Dateien hochladen'}
          aria-disabled={disabled || undefined}
          className={cn(
            'group relative rounded-[var(--radius-fileupload-zone)] transition-all duration-200 cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
            disabled && 'cursor-not-allowed opacity-50',
            // Default state (with hover)
            !dragOver && !hasError && [
              'border-2 border-dashed',
              'border-[var(--color-fileupload-zone-border)]',
              'bg-[var(--color-fileupload-zone-bg)]',
              hasFiles && 'border-solid',
              !disabled && 'hover:border-solid hover:border-[var(--color-fileupload-hover-border)] hover:bg-[var(--color-fileupload-hover-bg)]',
            ],
            // Drag over state
            dragOver && [
              'border-2 border-solid',
              'border-[var(--color-fileupload-drag-border)]',
              'bg-[var(--color-fileupload-drag-bg)]',
            ],
            // Error state
            hasError && !dragOver && [
              'border-2 border-dashed',
              'border-[var(--color-fileupload-error-border)]',
              'bg-[var(--color-fileupload-zone-bg)]',
              !disabled && 'hover:border-solid',
            ]
          )}
        >
          {/* Empty State / Drop Target */}
          {!hasFiles && (
            <div className="flex flex-col items-center gap-[var(--spacing-fileupload-file-gap)] p-[var(--spacing-fileupload-zone-padding)]">
              <IconAtom
                icon={UploadCloud}
                size={48}
                strokeWidth={1.5}
                className={cn(
                  'transition-all duration-200',
                  dragOver
                    ? 'text-[var(--color-fileupload-drag-icon)] animate-bounce'
                    : 'text-[var(--color-fileupload-zone-icon)] group-hover:scale-110'
                )}
              />
              <div className="text-center">
                <p
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    dragOver
                      ? 'text-[var(--color-fileupload-drag-text)]'
                      : 'text-[var(--color-fileupload-zone-text)]'
                  )}
                >
                  {dragOver ? 'Dateien loslassen…' : defaultInstruction}
                </p>
                {defaultSubText && !dragOver && (
                  <p className="mt-1 text-xs text-[var(--color-fileupload-zone-text-sub)]">
                    {defaultSubText}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* File List */}
          {hasFiles && (
            <div className="p-3">
              <div className="flex flex-col gap-[var(--spacing-fileupload-file-gap)]">
                {files.map((uploadedFile, idx) => {
                  const FileIcon = getFileIcon(uploadedFile.file);
                  return (
                    <div
                      key={uploadedFile.id}
                      className="flex items-center gap-[var(--spacing-fileupload-file-item-gap)] rounded-[var(--radius-fileupload-item)] p-2 hover:bg-[var(--color-fileupload-hover-bg)] transition-colors duration-200"
                    >
                      {/* Preview or Icon */}
                      {uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="h-10 w-10 rounded object-cover shrink-0"
                        />
                      ) : (
                        <IconAtom
                          icon={FileIcon}
                          size="md"
                          className="text-[var(--color-fileupload-file-icon)]"
                        />
                      )}
                      {/* Name & Size */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--color-fileupload-file-text)] truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-[var(--color-fileupload-file-size)]">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                      </div>
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        aria-label={`${uploadedFile.file.name} entfernen`}
                        className="shrink-0 p-1 rounded text-[var(--color-fileupload-file-remove)] hover:text-[var(--color-fileupload-file-remove-hover)] hover:bg-[var(--color-fileupload-hover-bg)] transition-colors duration-200"
                      >
                        <IconAtom icon={X} size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add More hint */}
              {multiple && (
                <p className="mt-2 text-center text-xs text-[var(--color-fileupload-zone-text-sub)]">
                  Klicken oder ziehen für weitere Dateien
                </p>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {progress !== undefined && progress >= 0 && progress <= 100 && (
            <div className="px-3 pb-3">
              <div className="h-1 w-full rounded-[var(--radius-fileupload-progress)] bg-[var(--color-fileupload-progress-bg)] overflow-hidden">
                <div
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Upload-Fortschritt"
                  className="h-full rounded-[var(--radius-fileupload-progress)] bg-[var(--color-fileupload-progress-fill)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-[var(--color-fileupload-file-size)] text-right tabular-nums">
                {progress}%
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {displayError && (
          <p role="alert" className="text-xs text-[var(--color-fileupload-error-text)]">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
