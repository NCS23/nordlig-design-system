import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
} from './ContextMenu';

const renderContextMenu = (props?: { onSelect?: () => void }) => {
  return render(
    <ContextMenu>
      <ContextMenuTrigger>
        <div data-testid="trigger-area" style={{ width: 200, height: 100 }}>
          Rechtsklick hier
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Optionen</ContextMenuLabel>
        <ContextMenuItem onSelect={props?.onSelect}>
          Bearbeiten
          <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem icon={<svg data-testid="icon" />}>Mit Icon</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Deaktiviert</ContextMenuItem>
        <ContextMenuItem destructive>Loeschen</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const openContextMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  const trigger = screen.getByTestId('trigger-area');
  // Radix context menu opens on contextmenu event (right-click)
  await user.pointer({ target: trigger, keys: '[MouseRight]' });
};

describe('ContextMenu', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders trigger area', () => {
    renderContextMenu();
    expect(screen.getByTestId('trigger-area')).toBeInTheDocument();
  });

  it('does not show menu initially', () => {
    renderContextMenu();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // ─── Open/Close ─────────────────────────────────────────────────────────

  it('opens menu on right-click', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('shows menu items when open', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByText('Bearbeiten')).toBeInTheDocument();
    expect(screen.getByText('Loeschen')).toBeInTheDocument();
  });

  it('closes menu on Escape', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // ─── Item Interaction ───────────────────────────────────────────────────

  it('calls onSelect when clicking item', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderContextMenu({ onSelect });
    await openContextMenu(user);
    await user.click(screen.getByText('Bearbeiten'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('closes menu after item click', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    await user.click(screen.getByText('Bearbeiten'));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  // ─── Keyboard Navigation ─────────────────────────────────────────────────

  it('navigates items with ArrowDown', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    await user.keyboard('{ArrowDown}');
    // Radix handles focus management
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  // ─── Sub-Components ───────────────────────────────────────────────────────

  it('renders label', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByText('Optionen')).toBeInTheDocument();
  });

  it('renders separator', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders icon in item', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders shortcut text', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    expect(screen.getByText('Ctrl+E')).toBeInTheDocument();
  });

  // ─── Destructive Item ───────────────────────────────────────────────────

  it('applies destructive styling', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    const deleteItem = screen.getByText('Loeschen').closest('[role="menuitem"]')!;
    expect(deleteItem.className).toContain('text-[var(--color-dropdown-destructive-text)]');
  });

  // ─── Disabled Item ──────────────────────────────────────────────────────

  it('marks disabled item with data-disabled', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    const disabledItem = screen.getByText('Deaktiviert').closest('[role="menuitem"]')!;
    expect(disabledItem).toHaveAttribute('data-disabled');
  });

  // ─── Token Classes ──────────────────────────────────────────────────────

  it('applies token-based classes to menu content', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    const menu = screen.getByRole('menu');
    expect(menu.className).toContain('bg-[var(--color-dropdown-bg)]');
    expect(menu.className).toContain('rounded-[var(--radius-dropdown-menu)]');
    expect(menu.className).toContain('border-[var(--color-dropdown-border)]');
  });

  it('applies token-based padding to items', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    const item = screen.getByText('Bearbeiten').closest('[role="menuitem"]')!;
    expect(item.className).toContain('px-[var(--spacing-dropdown-item-padding-x)]');
    expect(item.className).toContain('py-[var(--spacing-dropdown-item-padding-y)]');
  });

  // ─── Label Styling ──────────────────────────────────────────────────────

  it('applies token-based label styling', async () => {
    const user = userEvent.setup();
    renderContextMenu();
    await openContextMenu(user);
    const label = screen.getByText('Optionen');
    expect(label.className).toContain('text-[var(--color-dropdown-label-text)]');
  });
});
