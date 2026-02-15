import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from './Menubar';

// Hilfsfunktion: Standard-Menubar rendern
const renderMenubar = (props?: { onSelect?: () => void }) => {
  return render(
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Datei</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Aktionen</MenubarLabel>
          <MenubarItem onSelect={props?.onSelect}>Neues Dokument</MenubarItem>
          <MenubarItem icon={<svg data-testid="icon" />}>Oeffnen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Speichern
            <MenubarShortcut>Cmd+S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem destructive>Loeschen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Bearbeiten</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Rueckgaengig</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

describe('Menubar', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  // Test 1: Rendert Menubar mit Trigger-Buttons
  it('rendert Menubar mit Trigger-Buttons', () => {
    renderMenubar();
    expect(screen.getByText('Datei')).toBeInTheDocument();
    expect(screen.getByText('Bearbeiten')).toBeInTheDocument();
  });

  // Test 2: Oeffnet Menue bei Klick auf Trigger
  it('oeffnet Menue bei Klick auf Trigger', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    expect(screen.getByText('Neues Dokument')).toBeInTheDocument();
  });

  // Test 3: Zeigt Menuepunkte an wenn offen
  it('zeigt Menuepunkte an wenn offen', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    expect(screen.getByText('Neues Dokument')).toBeInTheDocument();
    expect(screen.getByText('Oeffnen')).toBeInTheDocument();
    expect(screen.getByText('Speichern')).toBeInTheDocument();
    expect(screen.getByText('Loeschen')).toBeInTheDocument();
  });

  // Test 4: Ruft onSelect bei Klick auf Menuepunkt auf
  it('ruft onSelect bei Klick auf Menuepunkt auf', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderMenubar({ onSelect });
    await user.click(screen.getByText('Datei'));
    await user.click(screen.getByText('Neues Dokument'));
    expect(onSelect).toHaveBeenCalled();
  });

  // Test 5: Rendert Separator
  it('rendert Separator', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  // Test 6: Rendert Label
  it('rendert Label', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    expect(screen.getByText('Aktionen')).toBeInTheDocument();
  });

  // Test 7: Rendert Shortcut-Text
  it('rendert Shortcut-Text', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    expect(screen.getByText('Cmd+S')).toBeInTheDocument();
  });

  // Test 8: Wendet destruktives Styling an
  it('wendet destruktives Styling an', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    const deleteItem = screen.getByText('Loeschen').closest('[role="menuitem"]')!;
    expect(deleteItem.className).toContain('text-[var(--color-dropdown-destructive-text)]');
  });

  // Test 9: Verwendet Menubar-Token-Klassen (Bar bg, border, radius)
  it('verwendet Menubar-Token-Klassen fuer die Leiste', () => {
    renderMenubar();
    const menubar = screen.getByRole('menubar');
    expect(menubar.className).toContain('bg-[var(--color-menubar-bg)]');
    expect(menubar.className).toContain('border-[var(--color-menubar-border)]');
    expect(menubar.className).toContain('rounded-[var(--radius-menubar-bar)]');
  });

  // Test 10: Verwendet Dropdown-Token-Klassen (Content bg)
  it('verwendet Dropdown-Token-Klassen fuer den Content', async () => {
    const user = userEvent.setup();
    renderMenubar();
    await user.click(screen.getByText('Datei'));
    const menu = screen.getByRole('menu');
    expect(menu.className).toContain('bg-[var(--color-dropdown-bg)]');
  });

  // Test 11: Hat korrekten displayName fuer alle Sub-Komponenten
  it('hat korrekten displayName fuer alle Sub-Komponenten', () => {
    expect(Menubar.displayName).toBe('Menubar');
    expect(MenubarTrigger.displayName).toBe('MenubarTrigger');
    expect(MenubarContent.displayName).toBe('MenubarContent');
    expect(MenubarItem.displayName).toBe('MenubarItem');
    expect(MenubarSeparator.displayName).toBe('MenubarSeparator');
    expect(MenubarLabel.displayName).toBe('MenubarLabel');
    expect(MenubarShortcut.displayName).toBe('MenubarShortcut');
    expect(MenubarCheckboxItem.displayName).toBe('MenubarCheckboxItem');
    expect(MenubarRadioGroup.displayName).toBe('MenubarRadioGroup');
    expect(MenubarRadioItem.displayName).toBe('MenubarRadioItem');
  });
});
