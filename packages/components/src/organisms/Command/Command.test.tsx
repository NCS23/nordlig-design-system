import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';

describe('Command', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders the command container', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem>Element</CommandItem>
        </CommandList>
      </Command>
    );
    expect(container.querySelector('[cmdk-root]')).toBeInTheDocument();
  });

  // ─── Input ──────────────────────────────────────────────────────────────

  it('renders the input with search icon', () => {
    render(
      <Command>
        <CommandInput placeholder="Suche..." />
        <CommandList>
          <CommandItem>Element</CommandItem>
        </CommandList>
      </Command>
    );
    const input = screen.getByPlaceholderText('Suche...');
    expect(input).toBeInTheDocument();
    // Search icon (SVG) should be present
    const wrapper = input.closest('[cmdk-input-wrapper]');
    const svg = wrapper?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  // ─── List ──────────────────────────────────────────────────────────────

  it('renders the list container', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem>Element 1</CommandItem>
          <CommandItem>Element 2</CommandItem>
        </CommandList>
      </Command>
    );
    const list = container.querySelector('[cmdk-list]');
    expect(list).toBeInTheDocument();
  });

  // ─── Empty State ──────────────────────────────────────────────────────

  it('shows empty state when no results match', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Suche..." />
        <CommandList>
          <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
          <CommandItem value="apfel">Apfel</CommandItem>
          <CommandItem value="birne">Birne</CommandItem>
        </CommandList>
      </Command>
    );
    const input = screen.getByPlaceholderText('Suche...');
    await user.type(input, 'zzzzz');
    expect(screen.getByText('Keine Ergebnisse gefunden.')).toBeInTheDocument();
  });

  // ─── Group Heading ──────────────────────────────────────────────────────

  it('renders group heading', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Fruechte">
            <CommandItem>Apfel</CommandItem>
            <CommandItem>Birne</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Fruechte')).toBeInTheDocument();
  });

  // ─── Items ──────────────────────────────────────────────────────────────

  it('renders items', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Element A</CommandItem>
          <CommandItem>Element B</CommandItem>
          <CommandItem>Element C</CommandItem>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Element A')).toBeInTheDocument();
    expect(screen.getByText('Element B')).toBeInTheDocument();
    expect(screen.getByText('Element C')).toBeInTheDocument();
  });

  // ─── Keyboard Navigation ──────────────────────────────────────────────

  it('navigates items with keyboard (ArrowDown/ArrowUp)', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Command>
        <CommandInput placeholder="Suche..." />
        <CommandList>
          <CommandItem value="eins">Eins</CommandItem>
          <CommandItem value="zwei">Zwei</CommandItem>
          <CommandItem value="drei">Drei</CommandItem>
        </CommandList>
      </Command>
    );

    // Focus the input so cmdk processes keyboard events
    const input = screen.getByPlaceholderText('Suche...');
    await user.click(input);

    // First item is selected by default in cmdk
    const firstItem = container.querySelector('[cmdk-item][data-selected="true"]');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem?.textContent).toBe('Eins');

    // Navigate down
    await user.keyboard('{ArrowDown}');
    const secondItem = container.querySelector('[cmdk-item][data-selected="true"]');
    expect(secondItem?.textContent).toBe('Zwei');

    // Navigate up
    await user.keyboard('{ArrowUp}');
    const backToFirst = container.querySelector('[cmdk-item][data-selected="true"]');
    expect(backToFirst?.textContent).toBe('Eins');
  });

  // ─── Filtering ────────────────────────────────────────────────────────

  it('filters items based on search input', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Command>
        <CommandInput placeholder="Suche..." />
        <CommandList>
          <CommandItem value="apfel">Apfel</CommandItem>
          <CommandItem value="birne">Birne</CommandItem>
          <CommandItem value="kirsche">Kirsche</CommandItem>
        </CommandList>
      </Command>
    );
    const input = screen.getByPlaceholderText('Suche...');
    await user.type(input, 'Apfel');

    // Only matching item should be visible
    const visibleItems = container.querySelectorAll('[cmdk-item]:not([aria-hidden="true"])');
    const allItems = container.querySelectorAll('[cmdk-item]');
    // cmdk hides non-matching items via aria-hidden or removes them
    // Check that Apfel is visible and Birne is not
    expect(screen.getByText('Apfel')).toBeInTheDocument();
    // Birne should be filtered out (aria-hidden or display:none)
    const birne = screen.queryByText('Birne');
    if (birne) {
      // cmdk renders but hides with aria-hidden
      const birneItem = birne.closest('[cmdk-item]');
      expect(birneItem?.getAttribute('aria-hidden')).toBe('true');
    }
  });

  // ─── Custom className ──────────────────────────────────────────────────

  it('forwards custom className to root', () => {
    const { container } = render(
      <Command className="my-command-class">
        <CommandList>
          <CommandItem>Element</CommandItem>
        </CommandList>
      </Command>
    );
    const root = container.querySelector('[cmdk-root]');
    expect(root?.getAttribute('class')).toContain('my-command-class');
  });

  // ─── Token Classes ────────────────────────────────────────────────────

  it('applies token-based classes to root', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem>Element</CommandItem>
        </CommandList>
      </Command>
    );
    const root = container.querySelector('[cmdk-root]');
    const classes = root?.getAttribute('class') || '';
    expect(classes).toContain('bg-[var(--color-command-bg)]');
    expect(classes).toContain('border-[var(--color-command-border)]');
    expect(classes).toContain('rounded-[var(--radius-command)]');
    expect(classes).toContain('[box-shadow:var(--shadow-command)]');
  });

  // ─── Separator ────────────────────────────────────────────────────────

  it('renders separator', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandItem>Eins</CommandItem>
          <CommandSeparator alwaysRender />
          <CommandItem>Zwei</CommandItem>
        </CommandList>
      </Command>
    );
    const separator = container.querySelector('[cmdk-separator]');
    expect(separator).toBeInTheDocument();
    expect(separator?.getAttribute('class')).toContain('bg-[var(--color-command-separator)]');
  });

  // ─── Shortcut ─────────────────────────────────────────────────────────

  it('renders shortcut span', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>
            Speichern
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    );
    const shortcut = screen.getByText('Ctrl+S');
    expect(shortcut).toBeInTheDocument();
    expect(shortcut.tagName).toBe('SPAN');
    expect(shortcut.getAttribute('class')).toContain('ml-auto');
    expect(shortcut.getAttribute('class')).toContain('tracking-widest');
  });
});
