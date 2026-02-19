import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('rendert children', () => {
    render(<Tag>Status</Tag>);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('rendert als span Element', () => {
    render(<Tag data-testid="tag">Text</Tag>);
    expect(screen.getByTestId('tag').tagName).toBe('SPAN');
  });

  it('leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Tag ref={ref}>Text</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('merged zusaetzliche classNames', () => {
    render(<Tag className="extra" data-testid="tag">Text</Tag>);
    expect(screen.getByTestId('tag')).toHaveClass('extra');
  });

  it('kuerzt langen Text mit truncate', () => {
    render(<Tag>Sehr langer Text</Tag>);
    expect(screen.getByText('Sehr langer Text')).toHaveClass('truncate');
  });

  // Varianten
  describe('Varianten', () => {
    it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
      'rendert %s Variante',
      (variant) => {
        render(<Tag variant={variant} data-testid="tag">{variant}</Tag>);
        const tag = screen.getByTestId('tag');
        expect(tag).toBeInTheDocument();
        expect(tag.className).toContain(`--color-tag-bg-${variant}`);
      }
    );

    it('nutzt default als Standardvariante', () => {
      render(<Tag data-testid="tag">Default</Tag>);
      expect(screen.getByTestId('tag').className).toContain('--color-tag-bg-default');
    });
  });

  // Sizes
  describe('Sizes', () => {
    it('rendert sm Size', () => {
      render(<Tag size="sm" data-testid="tag">Klein</Tag>);
      expect(screen.getByTestId('tag').className).toContain('text-[length:var(--font-tag-sm-size)]');
    });

    it('rendert md Size (default)', () => {
      render(<Tag data-testid="tag">Normal</Tag>);
      expect(screen.getByTestId('tag').className).toContain('text-[length:var(--font-tag-md-size)]');
    });
  });

  // Removable
  describe('Removable', () => {
    it('zeigt X-Button wenn onRemove gesetzt', () => {
      render(<Tag onRemove={() => {}}>Entfernbar</Tag>);
      expect(screen.getByRole('button', { name: 'Tag entfernen' })).toBeInTheDocument();
    });

    it('zeigt keinen X-Button ohne onRemove', () => {
      render(<Tag>Nicht entfernbar</Tag>);
      expect(screen.queryByRole('button', { name: 'Tag entfernen' })).not.toBeInTheDocument();
    });

    it('ruft onRemove beim Klick auf X auf', async () => {
      const user = userEvent.setup();
      const onRemove = vi.fn();
      render(<Tag onRemove={onRemove}>Entfernbar</Tag>);
      await user.click(screen.getByRole('button', { name: 'Tag entfernen' }));
      expect(onRemove).toHaveBeenCalledOnce();
    });

    it('stoppt Event-Propagation beim Remove', async () => {
      const user = userEvent.setup();
      const outerClick = vi.fn();
      const onRemove = vi.fn();
      render(
        <div onClick={outerClick}>
          <Tag onRemove={onRemove} onClick={() => {}}>Tag</Tag>
        </div>
      );
      await user.click(screen.getByRole('button', { name: 'Tag entfernen' }));
      expect(onRemove).toHaveBeenCalledOnce();
      expect(outerClick).not.toHaveBeenCalled();
    });
  });

  // Clickable
  describe('Clickable', () => {
    it('hat role=button wenn onClick gesetzt', () => {
      render(<Tag onClick={() => {}} data-testid="tag">Klickbar</Tag>);
      expect(screen.getByTestId('tag')).toHaveAttribute('role', 'button');
    });

    it('hat tabIndex=0 wenn onClick gesetzt', () => {
      render(<Tag onClick={() => {}} data-testid="tag">Klickbar</Tag>);
      expect(screen.getByTestId('tag')).toHaveAttribute('tabindex', '0');
    });

    it('hat kein role ohne onClick', () => {
      render(<Tag data-testid="tag">Statisch</Tag>);
      expect(screen.getByTestId('tag')).not.toHaveAttribute('role');
    });

    it('hat kein tabIndex ohne onClick', () => {
      render(<Tag data-testid="tag">Statisch</Tag>);
      expect(screen.getByTestId('tag')).not.toHaveAttribute('tabindex');
    });

    it('ruft onClick auf', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Tag onClick={onClick}>Klickbar</Tag>);
      await user.click(screen.getByText('Klickbar'));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('reagiert auf Enter-Taste', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Tag onClick={onClick} data-testid="tag">Klickbar</Tag>);
      screen.getByTestId('tag').focus();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('reagiert auf Space-Taste', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Tag onClick={onClick} data-testid="tag">Klickbar</Tag>);
      screen.getByTestId('tag').focus();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('hat cursor-pointer Klasse wenn klickbar', () => {
      render(<Tag onClick={() => {}} data-testid="tag">Klickbar</Tag>);
      expect(screen.getByTestId('tag')).toHaveClass('cursor-pointer');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('leitet aria-Attribute weiter', () => {
      render(<Tag aria-label="Status Tag" data-testid="tag">OK</Tag>);
      expect(screen.getByTestId('tag')).toHaveAttribute('aria-label', 'Status Tag');
    });

    it('Remove-Button hat aria-label', () => {
      render(<Tag onRemove={() => {}}>Tag</Tag>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Tag entfernen');
    });
  });
});
