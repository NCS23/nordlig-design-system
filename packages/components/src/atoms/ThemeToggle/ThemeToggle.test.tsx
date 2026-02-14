import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../system/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
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

Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: localStorageMock,
});

function renderWithTheme(defaultTheme: 'light' | 'dark' | 'system' = 'light') {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    storageStore = {};
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders', () => {
    renderWithTheme();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows Sun icon in light mode', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    // lucide-react renders an SVG; Sun has a specific class or we check the SVG exists
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // The aria-label confirms light mode
    expect(button).toHaveAttribute(
      'aria-label',
      'Helles Theme aktiv – Klicken fuer Dunkles Theme'
    );
  });

  it('shows Moon icon in dark mode', () => {
    renderWithTheme('dark');
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      'Dunkles Theme aktiv – Klicken fuer System-Theme'
    );
  });

  it('shows Monitor icon in system mode', () => {
    renderWithTheme('system');
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      'System-Theme aktiv – Klicken fuer Helles Theme'
    );
  });

  it('click cycles to next theme', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');
    const button = screen.getByRole('button');

    // light -> dark
    await user.click(button);
    expect(button).toHaveAttribute(
      'aria-label',
      'Dunkles Theme aktiv – Klicken fuer System-Theme'
    );

    // dark -> system
    await user.click(button);
    expect(button).toHaveAttribute(
      'aria-label',
      'System-Theme aktiv – Klicken fuer Helles Theme'
    );

    // system -> light
    await user.click(button);
    expect(button).toHaveAttribute(
      'aria-label',
      'Helles Theme aktiv – Klicken fuer Dunkles Theme'
    );
  });

  it('uses useTheme hook', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');
    const button = screen.getByRole('button');

    // Clicking should change the theme, proving the hook connection works
    await user.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('custom className is applied', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle className="my-custom-class" />
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  it('aria-label is present', () => {
    renderWithTheme();
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toBeTruthy();
  });
});
