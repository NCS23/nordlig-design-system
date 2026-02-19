import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert die Komponente mit Such-Icon', () => {
    render(<SearchInput placeholder="Suchen..." />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    const wrapper = screen.getByRole('searchbox').parentElement!;
    const svg = wrapper.querySelector('svg[aria-hidden="true"]');
    expect(svg).toBeInTheDocument();
  });

  it('leitet ref weiter (auf input)', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement>;
    render(<SearchInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('merged className auf wrapper', () => {
    render(<SearchInput className="custom-class" />);
    const wrapper = screen.getByRole('search');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('hat displayName "SearchInput"', () => {
    expect(SearchInput.displayName).toBe('SearchInput');
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt Token-Klassen fuer Such-Icon', () => {
    render(<SearchInput />);
    const wrapper = screen.getByRole('searchbox').parentElement!;
    const searchIcon = wrapper.querySelector('svg[aria-hidden="true"]');
    expect(searchIcon?.getAttribute('class') ?? '').toContain(
      'text-[var(--color-sinput-icon)]'
    );
  });

  // ─── Clear-Button ──────────────────────────────────────────────────────

  it('zeigt Clear-Button nur bei Wert', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    expect(
      screen.queryByRole('button', { name: 'Leeren' })
    ).not.toBeInTheDocument();

    await user.type(screen.getByRole('searchbox'), 'test');
    expect(
      screen.getByRole('button', { name: 'Leeren' })
    ).toBeInTheDocument();
  });

  it('Clear-Button leert den Wert', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    await user.click(screen.getByRole('button', { name: 'Leeren' }));
    expect(input).toHaveValue('');
  });

  it('onClear wird aufgerufen', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput onClear={onClear} />);
    await user.type(screen.getByRole('searchbox'), 'test');
    await user.click(screen.getByRole('button', { name: 'Leeren' }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  // ─── Keyboard ──────────────────────────────────────────────────────────

  it('Enter ruft onSearch auf', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    await user.keyboard('{Enter}');
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('Escape leert den Wert und ruft onClear', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchInput onClear={onClear} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    await user.keyboard('{Escape}');
    expect(input).toHaveValue('');
    expect(onClear).toHaveBeenCalledOnce();
  });

  // ─── States ─────────────────────────────────────────────────────────────

  it('disabled Zustand', () => {
    render(<SearchInput disabled />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });

  it('kontrollierter Modus (value Prop)', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SearchInput value="initial" onChange={onChange} />
    );
    expect(screen.getByRole('searchbox')).toHaveValue('initial');

    rerender(<SearchInput value="updated" onChange={onChange} />);
    expect(screen.getByRole('searchbox')).toHaveValue('updated');
  });

  // ─── Groessen ───────────────────────────────────────────────────────────

  it('verschiedene Groessen (inputSize sm/md/lg)', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const size of sizes) {
      const { unmount } = render(<SearchInput inputSize={size} />);
      const input = screen.getByRole('searchbox');
      expect(input.className).toContain(size);
      unmount();
    }
  });

  // ─── Debounce ──────────────────────────────────────────────────────────

  describe('Debounce', () => {
    it('onSearch wird verzoegert aufgerufen', async () => {
      const onSearch = vi.fn();
      render(<SearchInput onSearch={onSearch} debounceMs={200} />);

      const user = userEvent.setup();
      await user.type(screen.getByRole('searchbox'), 'abc');

      // Wait for debounce to settle
      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalled();
      }, { timeout: 1000 });

      // Last call should have the full value
      const lastCall = onSearch.mock.calls[onSearch.mock.calls.length - 1];
      expect(lastCall[0]).toBe('abc');
    });
  });
});
