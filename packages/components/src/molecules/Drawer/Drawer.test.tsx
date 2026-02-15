import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerOverlay,
} from './Drawer';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Rendert einen vollstaendigen Drawer mit allen Sub-Komponenten */
function renderDrawer(props?: {
  showHandle?: boolean;
  contentClassName?: string;
  defaultOpen?: boolean;
}) {
  return render(
    <Drawer open={props?.defaultOpen}>
      <DrawerTrigger asChild>
        <button>Drawer oeffnen</button>
      </DrawerTrigger>
      <DrawerContent
        showHandle={props?.showHandle}
        className={props?.contentClassName}
      >
        <DrawerHeader>
          <DrawerTitle>Test Titel</DrawerTitle>
          <DrawerDescription>Test Beschreibung</DrawerDescription>
        </DrawerHeader>
        <div>Drawer Inhalt</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button>Schliessen</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Drawer', () => {
  // ─── Trigger Rendering ──────────────────────────────────────────────────

  it('rendert den Trigger-Button', () => {
    renderDrawer();
    expect(screen.getByText('Drawer oeffnen')).toBeInTheDocument();
  });

  // ─── DisplayName ────────────────────────────────────────────────────────

  it('hat korrekte displayNames fuer alle Sub-Komponenten', () => {
    expect(Drawer.displayName).toBe('Drawer');
    expect(DrawerTrigger.displayName).toBe('DrawerTrigger');
    expect(DrawerContent.displayName).toBe('DrawerContent');
    expect(DrawerHeader.displayName).toBe('DrawerHeader');
    expect(DrawerTitle.displayName).toBe('DrawerTitle');
    expect(DrawerDescription.displayName).toBe('DrawerDescription');
    expect(DrawerFooter.displayName).toBe('DrawerFooter');
    expect(DrawerClose.displayName).toBe('DrawerClose');
    expect(DrawerOverlay.displayName).toBe('DrawerOverlay');
  });

  // ─── Drag Handle ────────────────────────────────────────────────────────

  it('rendert den Drag-Handle standardmaessig', () => {
    renderDrawer({ defaultOpen: true });
    // Der Handle ist ein div mit spezifischen Klassen
    const handle = document.querySelector('.bg-\\[var\\(--color-drawer-handle\\)\\]');
    expect(handle).toBeInTheDocument();
  });

  // ─── Token-Klassen auf Content ──────────────────────────────────────────

  it('hat Token-Klassen fuer Hintergrund, Rahmen und Radius auf Content', () => {
    renderDrawer({ defaultOpen: true });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('bg-[var(--color-drawer-bg)]');
    expect(dialog).toHaveClass('border-[var(--color-drawer-border)]');
    expect(dialog).toHaveClass('rounded-t-[var(--radius-drawer)]');
  });

  // ─── Header Padding ────────────────────────────────────────────────────

  it('hat Padding-Token-Klasse auf Header', () => {
    renderDrawer({ defaultOpen: true });
    const header = screen.getByText('Test Titel').closest(
      '.p-\\[var\\(--spacing-drawer-padding\\)\\]'
    );
    expect(header).toBeInTheDocument();
  });

  // ─── Title Styling ─────────────────────────────────────────────────────

  it('hat Text-Styling-Klassen auf Title', () => {
    renderDrawer({ defaultOpen: true });
    const title = screen.getByText('Test Titel');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-[var(--color-drawer-title)]');
  });

  // ─── Description Styling ───────────────────────────────────────────────

  it('hat Text-Styling-Klassen auf Description', () => {
    renderDrawer({ defaultOpen: true });
    const description = screen.getByText('Test Beschreibung');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-[var(--color-drawer-description)]');
  });

  // ─── Footer Layout ─────────────────────────────────────────────────────

  it('hat Flex-Layout auf Footer', () => {
    renderDrawer({ defaultOpen: true });
    const footer = screen.getByText('Schliessen').closest(
      '.flex.items-center.justify-end'
    );
    expect(footer).toBeInTheDocument();
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('merged benutzerdefinierte className auf Content', () => {
    renderDrawer({ defaultOpen: true, contentClassName: 'custom-drawer-class' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('custom-drawer-class');
  });
});
