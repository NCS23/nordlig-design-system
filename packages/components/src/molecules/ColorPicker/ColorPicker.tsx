import React from 'react';
import { cn } from '../../utils/cn';
import {

  clamp,
  hexToHsv,
  hsvToHex,
  hsvToRgb,
  isValidHex,
  normalizeHex,
  type HSVA,
} from '../../utils/color';

// Component token CSS
import '@nordlig/styles/tokens/colorpicker';
import '@nordlig/styles/tokens/text';

// ─── SaturationField ────────────────────────────────────────────────────────

interface SaturationFieldProps {
  hsv: HSVA;
  onChange: (hsv: HSVA) => void;
  disabled?: boolean;
}

const SaturationField = React.forwardRef<HTMLDivElement, SaturationFieldProps>(
  ({ hsv, onChange, disabled }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );
    const dragging = React.useRef(false);

    const updateFromPosition = React.useCallback(
      (clientX: number, clientY: number) => {
        if (disabled) return;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const s = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
        const v = clamp(100 - ((clientY - rect.top) / rect.height) * 100, 0, 100);
        onChange({ ...hsv, s, v });
      },
      [hsv, onChange, disabled]
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updateFromPosition(e.clientX, e.clientY);
      },
      [updateFromPosition, disabled]
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!dragging.current) return;
        updateFromPosition(e.clientX, e.clientY);
      },
      [updateFromPosition]
    );

    const handlePointerUp = React.useCallback(() => {
      dragging.current = false;
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = e.shiftKey ? 10 : 1;
        let { s, v } = hsv;
        let handled = true;
        switch (e.key) {
          case 'ArrowRight': s = clamp(s + step, 0, 100); break;
          case 'ArrowLeft': s = clamp(s - step, 0, 100); break;
          case 'ArrowUp': v = clamp(v + step, 0, 100); break;
          case 'ArrowDown': v = clamp(v - step, 0, 100); break;
          case 'Home': s = 0; break;
          case 'End': s = 100; break;
          default: handled = false;
        }
        if (handled) {
          e.preventDefault();
          onChange({ ...hsv, s, v });
        }
      },
      [hsv, onChange, disabled]
    );

    const hueColor = `hsl(${hsv.h}, 100%, 50%)`;

    return (
      <div
        ref={mergedRef}
        role="slider"
        aria-roledescription="2D color field"
        aria-label="Saturation and brightness"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(hsv.s)}
        aria-valuetext={`Saturation ${Math.round(hsv.s)}%, Brightness ${Math.round(hsv.v)}%`}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full cursor-crosshair touch-none',
          'h-[var(--sizing-cpick-field-height)]',
          'rounded-[var(--radius-cpick-field)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
          disabled && 'pointer-events-none opacity-50'
        )}
        style={{ background: hueColor }}
      >
        {/* White overlay (left to right) */}
        <div
          className="absolute inset-0 rounded-[var(--radius-cpick-field)]"
          style={{ background: 'linear-gradient(to right, #fff, transparent)' }}
        />
        {/* Black overlay (top to bottom) */}
        <div
          className="absolute inset-0 rounded-[var(--radius-cpick-field)]"
          style={{ background: 'linear-gradient(to bottom, transparent, #000)' }}
        />
        {/* Thumb */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            width: 'var(--sizing-cpick-thumb-size)',
            height: 'var(--sizing-cpick-thumb-size)',
            borderRadius: 'var(--radius-cpick-thumb)',
            border: '2px solid white',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.3)',
            background: hsvToHex({ ...hsv, a: 1 }),
          }}
        />
      </div>
    );
  }
);
SaturationField.displayName = 'SaturationField';

// ─── ColorSlider ────────────────────────────────────────────────────────────

interface SliderProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  'aria-label': string;
  trackStyle: React.CSSProperties;
  thumbColor?: string;
  disabled?: boolean;
}

const ColorSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, max, onChange, 'aria-label': ariaLabel, trackStyle, thumbColor, disabled }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );
    const dragging = React.useRef(false);

    const updateFromPosition = React.useCallback(
      (clientX: number) => {
        if (disabled) return;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        onChange(ratio * max);
      },
      [max, onChange, disabled]
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updateFromPosition(e.clientX);
      },
      [updateFromPosition, disabled]
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!dragging.current) return;
        updateFromPosition(e.clientX);
      },
      [updateFromPosition]
    );

    const handlePointerUp = React.useCallback(() => {
      dragging.current = false;
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = e.shiftKey ? max * 0.1 : max * 0.01;
        let newValue = value;
        let handled = true;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = clamp(value + step, 0, max);
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = clamp(value - step, 0, max);
            break;
          case 'Home':
            newValue = 0;
            break;
          case 'End':
            newValue = max;
            break;
          default:
            handled = false;
        }
        if (handled) {
          e.preventDefault();
          onChange(newValue);
        }
      },
      [value, max, onChange, disabled]
    );

    const percent = (value / max) * 100;

    return (
      <div
        ref={mergedRef}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.round(value)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full cursor-pointer touch-none',
          'h-[var(--sizing-cpick-slider-height)]',
          'rounded-[var(--radius-cpick-slider)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
          disabled && 'pointer-events-none opacity-50'
        )}
        style={trackStyle}
      >
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${percent}%`,
            width: 'var(--sizing-cpick-thumb-size)',
            height: 'var(--sizing-cpick-thumb-size)',
            borderRadius: 'var(--radius-cpick-thumb)',
            border: '2px solid white',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
            background: thumbColor || 'transparent',
          }}
        />
      </div>
    );
  }
);
ColorSlider.displayName = 'ColorSlider';

// ─── HexInput ───────────────────────────────────────────────────────────────

interface HexInputProps {
  value: string;
  onChange: (hex: string) => void;
  disabled?: boolean;
}

const HexInput: React.FC<HexInputProps> = ({ value, onChange, disabled }) => {
  const [inputValue, setInputValue] = React.useState(value.replace('#', ''));

  React.useEffect(() => {
    setInputValue(value.replace('#', ''));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
    setInputValue(raw);
    if (raw.length === 6 && isValidHex(raw)) {
      onChange('#' + raw.toLowerCase());
    }
  };

  const commitValue = () => {
    if (isValidHex(inputValue)) {
      const hex = normalizeHex(inputValue);
      onChange(hex);
      setInputValue(hex.replace('#', ''));
    } else {
      setInputValue(value.replace('#', ''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitValue();
  };

  return (
    <div className="flex items-center gap-[var(--spacing-cpick-swatch-gap)]">
      <span className="text-[length:var(--font-cpick-label-size)] text-[var(--color-cpick-label-text)] select-none">#</span>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
        maxLength={6}
        disabled={disabled}
        aria-label="Hex color value"
        className={cn(
          'w-20 px-2 py-1 text-[length:var(--font-cpick-input-size)] font-mono uppercase',
          'bg-[var(--color-cpick-input-bg)]',
          'text-[var(--color-cpick-input-text)]',
          'border border-[var(--color-cpick-input-border)]',
          'rounded-[var(--radius-cpick-swatch)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cpick-input-border-focus)] focus-visible:ring-offset-1',
          'transition-colors',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      />
    </div>
  );
};

// ─── Swatches ───────────────────────────────────────────────────────────────

interface SwatchesProps {
  colors: string[];
  activeColor: string;
  onSelect: (hex: string) => void;
  disabled?: boolean;
}

const Swatches: React.FC<SwatchesProps> = ({ colors, activeColor, onSelect, disabled }) => {
  return (
    <div
      className="flex flex-wrap gap-[var(--spacing-cpick-swatch-gap)]"
      role="group"
      aria-label="Preset colors"
    >
      {colors.map((color) => {
        const normalized = normalizeHex(color);
        const isActive = normalizeHex(activeColor) === normalized;
        return (
          <button
            key={color}
            type="button"
            aria-pressed={isActive}
            aria-label={normalized}
            disabled={disabled}
            onClick={() => onSelect(normalized)}
            className={cn(
              'w-[var(--sizing-cpick-swatch-size)] h-[var(--sizing-cpick-swatch-size)]',
              'rounded-[var(--radius-cpick-swatch)]',
              'border-2 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
              isActive
                ? 'border-[var(--color-cpick-swatch-border-active)]'
                : 'border-[var(--color-cpick-swatch-border)]',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            style={{ background: normalized }}
          />
        );
      })}
    </div>
  );
};

// ─── ColorPicker ────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  /** Current color value (hex, e.g. "#0ea5e9") */
  value?: string;
  /** Default color for uncontrolled mode */
  defaultValue?: string;
  /** Called when color changes */
  onChange?: (hex: string) => void;
  /** Called when alpha changes (0-1) */
  onAlphaChange?: (alpha: number) => void;
  /** Show alpha slider */
  showAlpha?: boolean;
  /** Preset color swatches */
  swatches?: string[];
  /** Disables all interaction */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const DEFAULT_COLOR = '#0ea5e9';

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onAlphaChange,
      showAlpha = false,
      swatches,
      disabled,
      className,
      'aria-label': ariaLabel = 'Color picker',
      ...props
    },
    ref
  ) => {
    const [internalHsv, setInternalHsv] = React.useState<HSVA>(() =>
      hexToHsv(defaultValue || DEFAULT_COLOR)
    );
    const [alpha, setAlpha] = React.useState(1);

    // Sync from external value
    React.useEffect(() => {
      if (value !== undefined) {
        const newHsv = hexToHsv(value);
        setInternalHsv((prev) => {
          // Only update if the hex actually changed (avoid losing hsv precision during drag)
          if (hsvToHex(prev) !== normalizeHex(value)) {
            return newHsv;
          }
          return prev;
        });
      }
    }, [value]);

    const currentHex = React.useMemo(() => hsvToHex(internalHsv), [internalHsv]);

    const handleHsvChange = React.useCallback(
      (newHsv: HSVA) => {
        setInternalHsv(newHsv);
        const hex = hsvToHex(newHsv);
        onChange?.(hex);
      },
      [onChange]
    );

    const handleHueChange = React.useCallback(
      (h: number) => {
        handleHsvChange({ ...internalHsv, h });
      },
      [internalHsv, handleHsvChange]
    );

    const handleAlphaChange = React.useCallback(
      (a: number) => {
        const newAlpha = a / 100;
        setAlpha(newAlpha);
        onAlphaChange?.(newAlpha);
      },
      [onAlphaChange]
    );

    const handleHexChange = React.useCallback(
      (hex: string) => {
        const newHsv = hexToHsv(hex);
        setInternalHsv(newHsv);
        onChange?.(hex);
      },
      [onChange]
    );

    const handleSwatchSelect = React.useCallback(
      (hex: string) => {
        const newHsv = hexToHsv(hex);
        setInternalHsv(newHsv);
        onChange?.(hex);
      },
      [onChange]
    );

    const rgb = hsvToRgb(internalHsv);
    const hueThumbColor = `hsl(${internalHsv.h}, 100%, 50%)`;
    const alphaThumbColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
    const hueTrackStyle: React.CSSProperties = {
      background:
        'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
    };
    const alphaTrackStyle: React.CSSProperties = {
      background: `linear-gradient(to right, transparent, ${currentHex}), repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 0 0 / 8px 8px`,
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        className={cn(
          'inline-flex flex-col',
          'gap-[var(--spacing-cpick-gap)]',
          'p-[var(--spacing-cpick-padding)]',
          'bg-[var(--color-cpick-bg)] text-[var(--color-text-base)]',
          'border border-[var(--color-cpick-border)]',
          'rounded-[var(--radius-cpick-container)]',
          className
        )}
        {...props}
      >
        <SaturationField hsv={internalHsv} onChange={handleHsvChange} disabled={disabled} />

        <ColorSlider
          value={internalHsv.h}
          max={360}
          onChange={handleHueChange}
          aria-label="Hue"
          trackStyle={hueTrackStyle}
          thumbColor={hueThumbColor}
          disabled={disabled}
        />

        {showAlpha && (
          <ColorSlider
            value={alpha * 100}
            max={100}
            onChange={handleAlphaChange}
            aria-label="Opacity"
            trackStyle={alphaTrackStyle}
            thumbColor={alphaThumbColor}
            disabled={disabled}
          />
        )}

        <div className="flex items-center justify-between gap-[var(--spacing-cpick-gap)]">
          <HexInput value={currentHex} onChange={handleHexChange} disabled={disabled} />
          <div
            className={cn(
              'h-[var(--sizing-cpick-swatch-size)] w-[var(--sizing-cpick-swatch-size)]',
              'rounded-[var(--radius-cpick-swatch)]',
              'border border-[var(--color-cpick-swatch-border)]'
            )}
            style={{
              background: showAlpha
                ? `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
                : currentHex,
            }}
            aria-hidden="true"
          />
        </div>

        {swatches && swatches.length > 0 && (
          <Swatches
            colors={swatches}
            activeColor={currentHex}
            onSelect={handleSwatchSelect}
            disabled={disabled}
          />
        )}
      </div>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { ColorPicker };
