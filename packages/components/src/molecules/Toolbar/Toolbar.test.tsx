import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSeparator,
} from './Toolbar';

// Hilfsfunktion: Standard-Toolbar rendern
const renderToolbar = () => {
  return render(
    <Toolbar aria-label="Test-Werkzeugleiste">
      <ToolbarButton>Aktion 1</ToolbarButton>
      <ToolbarButton>Aktion 2</ToolbarButton>
    </Toolbar>
  );
};

describe('Toolbar', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  // Test 1: Rendert Toolbar mit role="toolbar"
  it('rendert Toolbar mit role="toolbar"', () => {
    renderToolbar();
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  // Test 2: Rendert ToolbarButton-Elemente
  it('rendert ToolbarButton-Elemente', () => {
    renderToolbar();
    expect(screen.getByText('Aktion 1')).toBeInTheDocument();
    expect(screen.getByText('Aktion 2')).toBeInTheDocument();
  });

  // Test 3: Wendet Token-Klassen an (bg, border, radius, padding)
  it('wendet Token-Klassen an (bg, border, radius, padding)', () => {
    renderToolbar();
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar.className).toContain('bg-[var(--color-toolbar-bg)]');
    expect(toolbar.className).toContain('border-[var(--color-toolbar-border)]');
    expect(toolbar.className).toContain('rounded-[var(--radius-toolbar-bar)]');
    expect(toolbar.className).toContain('p-[var(--spacing-toolbar-padding)]');
  });

  // Test 4: Rendert ToolbarSeparator
  it('rendert ToolbarSeparator', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarButton>A</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>B</ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  // Test 5: Rendert ToolbarLink
  it('rendert ToolbarLink', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarLink href="https://example.com">Hilfe</ToolbarLink>
      </Toolbar>
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  // Test 6: Rendert ToolbarToggleGroup mit ToolbarToggleItem
  it('rendert ToolbarToggleGroup mit ToolbarToggleItem', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarToggleGroup type="single" aria-label="Optionen">
          <ToolbarToggleItem value="a">Option A</ToolbarToggleItem>
          <ToolbarToggleItem value="b">Option B</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  // Test 7: Wendet Toggle-On-Styling bei data-state=on an
  it('wendet Toggle-On-Styling bei data-state=on an', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarToggleGroup type="single" defaultValue="a" aria-label="Optionen">
          <ToolbarToggleItem value="a">Option A</ToolbarToggleItem>
          <ToolbarToggleItem value="b">Option B</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    );
    const activeItem = screen.getByText('Option A').closest('button')!;
    expect(activeItem.className).toContain('data-[state=on]:bg-[var(--color-toolbar-toggle-on-bg)]');
  });

  // Test 8: Button hat Icon korrekt gerendert
  it('rendert Button mit Icon korrekt', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarButton icon={<svg data-testid="test-icon" />}>Mit Icon</ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Mit Icon')).toBeInTheDocument();
  });

  // Test 9: Leitet ref weiter
  it('leitet ref weiter', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Toolbar ref={ref} aria-label="Werkzeugleiste">
        <ToolbarButton>Test</ToolbarButton>
      </Toolbar>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute('role')).toBe('toolbar');
  });

  // Test 10: Wendet benutzerdefinierte className an
  it('wendet benutzerdefinierte className an', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste" className="meine-klasse">
        <ToolbarButton className="btn-klasse">Test</ToolbarButton>
      </Toolbar>
    );
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar.className).toContain('meine-klasse');
    const button = screen.getByText('Test').closest('button')!;
    expect(button.className).toContain('btn-klasse');
  });

  // Test 11: Rendert ToolbarButton mit Icon und Text
  it('rendert ToolbarButton mit Icon und Text', () => {
    render(
      <Toolbar aria-label="Werkzeugleiste">
        <ToolbarButton icon={<svg data-testid="btn-icon" />}>
          Klick mich
        </ToolbarButton>
      </Toolbar>
    );
    const icon = screen.getByTestId('btn-icon');
    const iconWrapper = icon.parentElement!;
    expect(iconWrapper.className).toContain('shrink-0');
    expect(screen.getByText('Klick mich')).toBeInTheDocument();
  });

  // Test 12: Hat korrekten displayName fuer alle Sub-Komponenten
  it('hat korrekten displayName fuer alle Sub-Komponenten', () => {
    expect(Toolbar.displayName).toBe('Toolbar');
    expect(ToolbarButton.displayName).toBe('ToolbarButton');
    expect(ToolbarLink.displayName).toBe('ToolbarLink');
    expect(ToolbarToggleGroup.displayName).toBe('ToolbarToggleGroup');
    expect(ToolbarToggleItem.displayName).toBe('ToolbarToggleItem');
    expect(ToolbarSeparator.displayName).toBe('ToolbarSeparator');
  });
});
