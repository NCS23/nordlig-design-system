// ResizeObserver Mock fuer jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock as any;

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';

// ─── Hilfsfunktion: Standard-Layout rendern ─────────────────────────────────

const renderResizable = (handleProps: { withHandle?: boolean; className?: string } = {}) => {
  return render(
    <ResizablePanelGroup orientation="horizontal">
      <ResizablePanel defaultSize="50%">
        <div>Panel 1</div>
      </ResizablePanel>
      <ResizableHandle {...handleProps} />
      <ResizablePanel defaultSize="50%">
        <div>Panel 2</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

describe('Resizable', () => {
  // ─── 1. Rendert PanelGroup mit Panels ─────────────────────────────────

  it('rendert PanelGroup mit Panels', () => {
    renderResizable();
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  // ─── 2. Rendert ResizableHandle zwischen Panels ──────────────────────

  it('rendert ResizableHandle zwischen Panels', () => {
    renderResizable();
    const handle = screen.getByRole('separator');
    expect(handle).toBeInTheDocument();
  });

  // ─── 3. Token-Klassen auf Handle (panel-border) ──────────────────────

  it('wendet Token-Klassen auf Handle an', () => {
    renderResizable();
    const handle = screen.getByRole('separator');
    expect(handle.className).toContain('bg-[var(--color-rsz-panel-border)]');
  });

  // ─── 4. Zeigt Griff-Indikator mit withHandle ─────────────────────────

  it('zeigt Griff-Indikator mit withHandle', () => {
    renderResizable({ withHandle: true });
    const handle = screen.getByRole('separator');
    // Der Griff-Indikator enthaelt ein div mit dem GripVertical Icon
    const gripIndicator = handle.querySelector('div');
    expect(gripIndicator).toBeInTheDocument();
    expect(gripIndicator?.className).toContain('bg-[var(--color-rsz-handle-bg)]');
  });

  // ─── 5. Versteckt Griff-Indikator ohne withHandle (default) ──────────

  it('versteckt Griff-Indikator ohne withHandle', () => {
    renderResizable();
    const handle = screen.getByRole('separator');
    // Ohne withHandle sollte kein inneres div mit Handle-Klassen vorhanden sein
    const gripIndicator = handle.querySelector('div');
    expect(gripIndicator).toBeNull();
  });

  // ─── 6. Handle hat korrekte Basis-Klassen ────────────────────────────

  it('hat korrekte Basis-Klassen auf dem Handle', () => {
    renderResizable();
    const handle = screen.getByRole('separator');
    expect(handle.className).toContain('flex');
    expect(handle.className).toContain('w-px');
  });

  // ─── 7. Benutzerdefinierte className auf PanelGroup ──────────────────

  it('wendet benutzerdefinierte className auf PanelGroup an', () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal" className="meine-klasse">
        <ResizablePanel defaultSize="100%">
          <div>Inhalt</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
    // PanelGroup rendert das aeusserste Element mit der className
    const group = container.querySelector('[data-group]');
    expect(group?.className).toContain('meine-klasse');
  });

  // ─── 8. Benutzerdefinierte className auf Handle ──────────────────────

  it('wendet benutzerdefinierte className auf Handle an', () => {
    renderResizable({ className: 'extra-klasse' });
    const handle = screen.getByRole('separator');
    expect(handle.className).toContain('extra-klasse');
  });

  // ─── 9. Rendert drei Panels korrekt ──────────────────────────────────

  it('rendert drei Panels korrekt', () => {
    render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="25%">
          <div>Links</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <div>Mitte</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="25%">
          <div>Rechts</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('Mitte')).toBeInTheDocument();
    expect(screen.getByText('Rechts')).toBeInTheDocument();
    // Zwei Handles/Separatoren
    const handles = screen.getAllByRole('separator');
    expect(handles).toHaveLength(2);
  });

  // ─── 10. displayName fuer alle Sub-Komponenten ───────────────────────

  it('hat korrekten displayName fuer alle Sub-Komponenten', () => {
    expect(ResizablePanelGroup.displayName).toBe('ResizablePanelGroup');
    expect(ResizablePanel.displayName).toBe('ResizablePanel');
    expect(ResizableHandle.displayName).toBe('ResizableHandle');
  });
});
