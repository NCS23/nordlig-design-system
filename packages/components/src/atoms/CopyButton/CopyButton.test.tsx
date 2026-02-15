import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CopyButton } from './CopyButton';

// Navigator-Clipboard mocken (configurable, damit kein Konflikt entsteht)
const writeTextMock = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: writeTextMock },
  writable: true,
  configurable: true,
});

describe('CopyButton', () => {
  beforeEach(() => {
    writeTextMock.mockClear();
    writeTextMock.mockResolvedValue(undefined);
  });

  // 1. Rendert als Button-Element
  it('rendert als Button-Element', () => {
    render(<CopyButton value="test" data-testid="cpybtn" />);
    expect(screen.getByTestId('cpybtn').tagName).toBe('BUTTON');
  });

  // 2. Zeigt Copy-Icon standardmaessig
  it('zeigt Copy-Icon standardmaessig', () => {
    render(<CopyButton value="test" />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'In Zwischenablage kopieren',
    );
  });

  // 3. Wechselt zu Check-Icon nach Klick
  it('wechselt zu Check-Icon nach Klick', async () => {
    render(<CopyButton value="Hallo" />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Kopiert');
  });

  // 4. Ruft onCopy-Callback nach Klick auf
  it('ruft onCopy-Callback nach Klick auf', async () => {
    const handleCopy = vi.fn();
    render(<CopyButton value="Hallo" onCopy={handleCopy} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(handleCopy).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith('Hallo');
  });

  // 5. Wechselt nach Timeout zurueck zum Copy-Icon
  it('wechselt nach Timeout zurueck zum Copy-Icon', async () => {
    vi.useFakeTimers();

    render(<CopyButton value="test" timeout={1000} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Kopiert');

    // Timeout ablaufen lassen
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'In Zwischenablage kopieren',
    );

    vi.useRealTimers();
  });

  // 6. Wendet Token-Klassen an (bg, border, radius)
  it('wendet Token-Klassen an', () => {
    render(<CopyButton value="test" data-testid="cpybtn" />);
    const btn = screen.getByTestId('cpybtn');
    expect(btn.className).toContain('bg-[var(--color-cpybtn-bg)]');
    expect(btn.className).toContain('border-[var(--color-cpybtn-border)]');
    expect(btn.className).toContain('rounded-[var(--radius-cpybtn)]');
  });

  // 7. Wendet Token-basierte Groesse sm an
  it('wendet Token-basierte Groesse sm an', () => {
    render(<CopyButton value="test" size="sm" data-testid="cpybtn" />);
    const btn = screen.getByTestId('cpybtn');
    expect(btn.className).toContain('h-[var(--sizing-cpybtn-sm)]');
    expect(btn.className).toContain('w-[var(--sizing-cpybtn-sm)]');
  });

  // 8. Wendet Token-basierte Groesse lg an
  it('wendet Token-basierte Groesse lg an', () => {
    render(<CopyButton value="test" size="lg" data-testid="cpybtn" />);
    const btn = screen.getByTestId('cpybtn');
    expect(btn.className).toContain('h-[var(--sizing-cpybtn-lg)]');
    expect(btn.className).toContain('w-[var(--sizing-cpybtn-lg)]');
  });

  // 9. Leitet ref weiter
  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(<CopyButton ref={ref} value="test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // 10. Wendet benutzerdefinierte className an
  it('wendet benutzerdefinierte className an', () => {
    render(<CopyButton value="test" className="meine-klasse" data-testid="cpybtn" />);
    expect(screen.getByTestId('cpybtn').className).toContain('meine-klasse');
  });

  // 11. Hat korrekten displayName
  it('hat korrekten displayName', () => {
    expect(CopyButton.displayName).toBe('CopyButton');
  });

  // 12. Ruft onError-Callback bei Clipboard-Fehler auf
  it('ruft onError-Callback bei Clipboard-Fehler auf', async () => {
    writeTextMock.mockRejectedValueOnce(new Error('Permission denied'));
    const handleError = vi.fn();
    render(<CopyButton value="test" onError={handleError} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith(expect.any(Error));
    // Sollte NICHT in den "copied"-State wechseln
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'In Zwischenablage kopieren',
    );
  });
});
