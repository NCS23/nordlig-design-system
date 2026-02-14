import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider, useTheme, type Theme } from './ThemeProvider';

// Helper component to access theme context in tests
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
      <button data-testid="set-system" onClick={() => setTheme('system')}>System</button>
    </div>
  );
}

let mediaQueryListeners: Array<(e: MediaQueryListEvent) => void> = [];
let mediaMatches = false;

const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: mediaMatches,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
    mediaQueryListeners.push(handler);
  }),
  removeEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
    mediaQueryListeners = mediaQueryListeners.filter((h) => h !== handler);
  }),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

// Mock localStorage using a real store object
let storageStore: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string): string | null => storageStore[key] ?? null,
  setItem: (key: string, value: string) => { storageStore[key] = value; },
  removeItem: (key: string) => { delete storageStore[key]; },
  clear: () => { storageStore = {}; },
  get length() { return Object.keys(storageStore).length; },
  key: (index: number) => Object.keys(storageStore)[index] ?? null,
};

// Spy on the methods so we can assert calls
const getItemSpy = vi.spyOn(localStorageMock, 'getItem');
const setItemSpy = vi.spyOn(localStorageMock, 'setItem');

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock,
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    mediaMatches = false;
    mediaQueryListeners = [];
    storageStore = {};
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('default theme is system', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
  });

  it('sets dark class on document when dark', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when light', () => {
    document.documentElement.classList.add('dark');
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    await user.click(screen.getByTestId('set-dark'));
    expect(setItemSpy).toHaveBeenCalledWith('nordlig-theme', 'dark');
  });

  it('reads theme from localStorage', () => {
    storageStore['nordlig-theme'] = 'dark';
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('system theme follows matchMedia', () => {
    mediaMatches = true;
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('setTheme updates theme', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    await user.click(screen.getByTestId('set-dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('useTheme hook returns context values', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });

  it('custom storageKey works', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider storageKey="custom-key">
        <ThemeConsumer />
      </ThemeProvider>
    );
    await user.click(screen.getByTestId('set-dark'));
    expect(setItemSpy).toHaveBeenCalledWith('custom-key', 'dark');
  });

  it('resolvedTheme reflects actual state', () => {
    mediaMatches = false;
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });

  it('matchMedia change listener updates theme', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');

    // Simulate system theme change to dark
    act(() => {
      mediaQueryListeners.forEach((listener) =>
        listener({ matches: true } as MediaQueryListEvent)
      );
    });

    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('useTheme throws when used outside ThemeProvider', () => {
    // Suppress console.error for expected error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });
});
