import React, { useState, useRef, useCallback, useId } from 'react';
import { cn } from '../../utils/cn';
import { Tag } from '../../atoms/Tag';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Aktuelle Tag-Werte */
  value?: string[];
  /** Default-Werte (unkontrolliert) */
  defaultValue?: string[];
  /** Callback bei Aenderung */
  onChange?: (tags: string[]) => void;
  /** Placeholder fuer das Eingabefeld */
  placeholder?: string;
  /** Maximale Anzahl Tags (0 = unbegrenzt) */
  maxTags?: number;
  /** Duplikate erlauben */
  allowDuplicates?: boolean;
  /** Validierungsfunktion — gibt true bei gueltigem Tag zurueck, oder einen Fehlertext */
  validate?: (tag: string) => boolean | string;
  /** Tag-Variante */
  tagVariant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Tag-Groesse */
  tagSize?: 'sm' | 'md';
  /** Fehler-State */
  error?: boolean;
  /** Deaktiviert */
  disabled?: boolean;
  /** Trennzeichen die einen Tag erstellen (default: ['Enter']) */
  delimiters?: string[];
  /** Name fuer Form-Integration */
  name?: string;
}

// ─── TagInput Component ─────────────────────────────────────────────────────

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = 'Tag hinzufuegen…',
      maxTags = 0,
      allowDuplicates = false,
      validate,
      tagVariant = 'default',
      tagSize = 'md',
      error = false,
      disabled = false,
      delimiters = ['Enter'],
      name,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
    const tags = isControlled ? controlledValue : internalTags;

    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const liveRegionId = useId();

    const setTags = useCallback(
      (newTags: string[]) => {
        if (!isControlled) {
          setInternalTags(newTags);
        }
        onChange?.(newTags);
      },
      [isControlled, onChange]
    );

    const addTag = useCallback(
      (tagText: string) => {
        const trimmed = tagText.trim();
        if (!trimmed) return;

        // Max limit check
        if (maxTags > 0 && tags.length >= maxTags) return;

        // Duplicate check
        if (!allowDuplicates && tags.includes(trimmed)) return;

        // Validation
        if (validate) {
          const result = validate(trimmed);
          if (result !== true && result !== '') return;
        }

        setTags([...tags, trimmed]);
        setInputValue('');
      },
      [tags, maxTags, allowDuplicates, validate, setTags]
    );

    const removeTag = useCallback(
      (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
      },
      [tags, setTags]
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      // Check delimiters
      if (delimiters.includes(event.key)) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }

      // Comma as delimiter check
      if (delimiters.includes(',') && event.key === ',') {
        event.preventDefault();
        addTag(inputValue);
        return;
      }

      // Tab as delimiter
      if (delimiters.includes('Tab') && event.key === 'Tab' && inputValue.trim()) {
        event.preventDefault();
        addTag(inputValue);
        return;
      }

      // Backspace to remove last tag
      if (event.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const handleContainerClick = () => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;

      // Check for delimiter characters in pasted/typed text
      if (delimiters.includes(',') && val.includes(',')) {
        const parts = val.split(',');
        parts.forEach((part, i) => {
          if (i < parts.length - 1) {
            addTag(part);
          } else {
            setInputValue(part);
          }
        });
        return;
      }

      setInputValue(val);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (delimiters.includes(',')) {
        const text = event.clipboardData.getData('text');
        if (text.includes(',')) {
          event.preventDefault();
          const parts = text.split(',');
          parts.forEach((part) => addTag(part));
        }
      }
    };

    const atLimit = maxTags > 0 && tags.length >= maxTags;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-[var(--spacing-taginput-gap)]',
          'min-h-[var(--sizing-taginput-min-height)]',
          'p-[var(--spacing-taginput-padding)]',
          'rounded-[var(--radius-taginput)]',
          'border bg-[var(--color-taginput-bg)]',
          'transition-colors cursor-text',
          // Border states
          error
            ? 'border-[var(--color-taginput-border-error)] hover:border-[var(--color-taginput-border-error)]'
            : [
                'border-[var(--color-taginput-border)]',
                !disabled && 'hover:border-[var(--color-taginput-border-hover)]',
              ],
          // Focus ring on container
          isFocused && !error &&
            'ring-2 ring-[var(--color-taginput-border-focus)] ring-offset-1 border-[var(--color-taginput-border-focus)]',
          isFocused && error &&
            'ring-2 ring-[var(--color-taginput-border-error)] ring-offset-1',
          // Disabled
          disabled && 'cursor-not-allowed bg-[var(--color-taginput-bg-disabled)] opacity-50',
          className
        )}
        role="presentation"
        onClick={handleContainerClick}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* Tags */}
        {tags.map((tag, index) => (
          <Tag
            key={`${tag}-${index}`}
            variant={tagVariant}
            size={tagSize}
            onRemove={disabled ? undefined : () => removeTag(index)}
          >
            {tag}
          </Tag>
        ))}

        {/* Inline Input */}
        {!atLimit && (
          <input
            ref={inputRef}
            type="text"
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={tags.length === 0 ? placeholder : undefined}
            disabled={disabled}
            className={cn(
              'flex-1 min-w-[80px] bg-transparent outline-none border-none',
              'text-[length:var(--font-taginput-input-size)]',
              'text-[var(--color-taginput-input-text)]',
              'placeholder:text-[var(--color-taginput-input-placeholder)]',
              'disabled:cursor-not-allowed'
            )}
            aria-label={placeholder}
            aria-invalid={error || undefined}
          />
        )}

        {/* Screenreader live region */}
        <span id={liveRegionId} className="sr-only" aria-live="polite" role="status" />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';

export { TagInput };
