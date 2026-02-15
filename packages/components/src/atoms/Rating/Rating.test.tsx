import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('rendert 5 Sterne standardmaessig', () => {
    render(<Rating />);
    const group = screen.getByRole('radiogroup');
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(5);
  });

  it('rendert custom max (3 Sterne)', () => {
    render(<Rating max={3} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('readOnly: role=img statt radiogroup', () => {
    render(<Rating value={3} readOnly />);
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // ─── Interaktion ───────────────────────────────────────────────────────

  it('Klick aendert Wert (onChange aufgerufen)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={0} onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    await user.click(radios[2]); // 3. Stern (Index 2 = Wert 3)
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('disabled: role=img, aria-disabled, kein onChange bei Klick', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Rating value={2} onChange={onChange} disabled />);
    const el = screen.getByRole('img');
    expect(el).toHaveAttribute('aria-disabled', 'true');

    // Stars are not radios when disabled
    expect(screen.queryAllByRole('radio')).toHaveLength(0);

    const stars = container.querySelectorAll('span > svg');
    await user.click(stars[3]);
    expect(onChange).not.toHaveBeenCalled();
  });

  // ─── Keyboard ──────────────────────────────────────────────────────────

  it('ArrowRight erhoeht Wert', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    const group = screen.getByRole('radiogroup');
    group.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('ArrowLeft verringert Wert', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={3} onChange={onChange} />);
    const group = screen.getByRole('radiogroup');
    group.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('Home setzt auf 0', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={3} onChange={onChange} />);
    const group = screen.getByRole('radiogroup');
    group.focus();
    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('End setzt auf max', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} max={5} />);
    const group = screen.getByRole('radiogroup');
    group.focus();
    await user.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(5);
  });

  // ─── Token-Klassen ─────────────────────────────────────────────────────

  it('nutzt gap-Token-Klasse', () => {
    render(<Rating data-testid="rating" />);
    const group = screen.getByRole('radiogroup');
    expect(group.className).toContain('gap-[var(--spacing-rtg-gap)]');
  });

  it('gefuellte Sterne haben color-rtg-filled Klasse', () => {
    const { container } = render(<Rating value={3} />);
    // SVG elements need getAttribute('class') due to SVGAnimatedString in jsdom
    const svgs = container.querySelectorAll('svg');
    const filledSvgs = Array.from(svgs).filter((svg) =>
      (svg.getAttribute('class') ?? '').includes('color-rtg-filled')
    );
    expect(filledSvgs.length).toBeGreaterThan(0);
  });

  // ─── Ref Forwarding ────────────────────────────────────────────────────

  it('leitet ref auf HTMLDivElement weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Rating ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // ─── className ──────────────────────────────────────────────────────────

  it('merged className', () => {
    render(<Rating className="custom-rating" />);
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveClass('custom-rating');
  });

  // ─── displayName ────────────────────────────────────────────────────────

  it('hat displayName "Rating"', () => {
    expect(Rating.displayName).toBe('Rating');
  });
});
