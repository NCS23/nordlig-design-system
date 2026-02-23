import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchFilter } from './SearchFilter';

describe('SearchFilter', () => {
  // ─── Rendering ────────────────────────────────────────────────────────────

  it('renders search input', () => {
    render(<SearchFilter />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchFilter searchPlaceholder="Nutzer suchen..." />);
    expect(screen.getByPlaceholderText('Nutzer suchen...')).toBeInTheDocument();
  });

  it('renders children as filter slots', () => {
    render(
      <SearchFilter>
        <select data-testid="filter">
          <option>Alle</option>
        </select>
      </SearchFilter>
    );
    expect(screen.getByTestId('filter')).toBeInTheDocument();
  });

  it('renders result count when provided', () => {
    render(<SearchFilter resultCount={42} />);
    expect(screen.getByText('42 Ergebnisse')).toBeInTheDocument();
  });

  it('renders custom result label', () => {
    render(<SearchFilter resultCount={5} resultLabel="Treffer" />);
    expect(screen.getByText('5 Treffer')).toBeInTheDocument();
  });

  it('does not render result count when undefined', () => {
    render(<SearchFilter />);
    expect(screen.queryByText(/Ergebnisse/)).not.toBeInTheDocument();
  });

  // ─── Interaction ──────────────────────────────────────────────────────────

  it('calls onSearchChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchFilter searchValue="" onSearchChange={onChange} />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('calls onSearchChange with empty string on clear', () => {
    const onChange = vi.fn();
    render(<SearchFilter searchValue="test" onSearchChange={onChange} />);
    const clearButton = screen.getByLabelText('Leeren');
    fireEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith('');
  });

  // ─── Token-based styling ──────────────────────────────────────────────────

  it('applies gap token', () => {
    const { container } = render(<SearchFilter />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.className).toContain('gap-[var(--spacing-searchfilter-gap)]');
  });

  it('applies padding token', () => {
    const { container } = render(<SearchFilter />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.className).toContain('py-[var(--spacing-searchfilter-py)]');
  });

  it('result count uses token color', () => {
    render(<SearchFilter resultCount={10} />);
    const count = screen.getByText('10 Ergebnisse');
    expect(count.className).toContain('text-[var(--color-searchfilter-count)]');
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  it('has search landmark via SearchInput', () => {
    const { container } = render(<SearchFilter />);
    // SearchInput hat role="search" intern
    const searchRegions = container.querySelectorAll('[role="search"]');
    expect(searchRegions.length).toBe(1);
  });

  it('result count has aria-live polite', () => {
    render(<SearchFilter resultCount={42} />);
    const count = screen.getByText('42 Ergebnisse');
    expect(count).toHaveAttribute('aria-live', 'polite');
  });

  // ─── className & Ref ──────────────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<SearchFilter className="my-filter" />);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.className).toContain('my-filter');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<SearchFilter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
