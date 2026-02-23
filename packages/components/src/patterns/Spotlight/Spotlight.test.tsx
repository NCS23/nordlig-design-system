import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Spotlight, useSpotlight } from './Spotlight';

const mockGroups = [
  {
    label: 'Aktionen',
    items: [
      { id: '1', label: 'Neues Projekt', onSelect: vi.fn() },
      { id: '2', label: 'Einstellungen', onSelect: vi.fn(), shortcut: 'Ctrl+,' },
      { id: '3', label: 'Deaktiviert', disabled: true, onSelect: vi.fn() },
    ],
  },
  {
    label: 'Seiten',
    items: [
      { id: '4', label: 'Dashboard', description: 'Uebersicht', onSelect: vi.fn() },
      { id: '5', label: 'Profil', keywords: ['account', 'benutzer'], onSelect: vi.fn() },
    ],
  },
];

describe('Spotlight', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Rendering ---------------------------------------------------------------

  it('does not render content when closed', () => {
    render(<Spotlight groups={mockGroups} open={false} />);
    expect(screen.queryByText('Neues Projekt')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    expect(screen.getByText('Neues Projekt')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<Spotlight groups={mockGroups} open={true} placeholder="Suche..." />);
    expect(screen.getByPlaceholderText('Suche...')).toBeInTheDocument();
  });

  it('renders grouped items', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    expect(screen.getByText('Aktionen')).toBeInTheDocument();
    expect(screen.getByText('Seiten')).toBeInTheDocument();
  });

  it('renders item descriptions', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    expect(screen.getByText('Uebersicht')).toBeInTheDocument();
  });

  it('renders shortcut badges', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    expect(screen.getByText('Ctrl+,')).toBeInTheDocument();
  });

  // --- Styling -----------------------------------------------------------------

  it('applies spotlight token classes', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    const content = screen.getByLabelText('Globale Suche');
    expect(content.className).toContain('bg-[var(--color-spotlight-bg)]');
    expect(content.className).toContain('border-[var(--color-spotlight-border)]');
    expect(content.className).toContain('rounded-[var(--radius-spotlight)]');
  });

  it('positions content near top of viewport', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    const content = screen.getByLabelText('Globale Suche');
    expect(content.className).toContain('top-[20%]');
  });

  // --- Selection ---------------------------------------------------------------

  it('calls item.onSelect on selection', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    fireEvent.click(screen.getByText('Neues Projekt'));
    expect(mockGroups[0].items[0].onSelect).toHaveBeenCalled();
  });

  it('calls onSelect callback on selection', () => {
    const onSelect = vi.fn();
    render(<Spotlight groups={mockGroups} open={true} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Neues Projekt'));
    expect(onSelect).toHaveBeenCalledWith(mockGroups[0].items[0]);
  });

  it('closes after selection', () => {
    const onOpenChange = vi.fn();
    render(<Spotlight groups={mockGroups} open={true} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByText('Neues Projekt'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // --- Keyboard shortcut -------------------------------------------------------

  it('opens on Cmd+K', () => {
    const onOpenChange = vi.fn();
    render(<Spotlight groups={mockGroups} onOpenChange={onOpenChange} />);
    act(() => {
      fireEvent.keyDown(document, { key: 'k', metaKey: true });
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('opens on Ctrl+K', () => {
    const onOpenChange = vi.fn();
    render(<Spotlight groups={mockGroups} onOpenChange={onOpenChange} />);
    act(() => {
      fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('uses custom shortcut key', () => {
    const onOpenChange = vi.fn();
    render(<Spotlight groups={mockGroups} onOpenChange={onOpenChange} shortcutKey="p" />);
    act(() => {
      fireEvent.keyDown(document, { key: 'p', metaKey: true });
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- Controlled/Uncontrolled ------------------------------------------------

  it('works in uncontrolled mode', () => {
    render(<Spotlight groups={mockGroups} />);
    expect(screen.queryByText('Neues Projekt')).not.toBeInTheDocument();
    act(() => {
      fireEvent.keyDown(document, { key: 'k', metaKey: true });
    });
    expect(screen.getByText('Neues Projekt')).toBeInTheDocument();
  });

  // --- Accessibility -----------------------------------------------------------

  it('has aria-label on dialog', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    expect(screen.getByLabelText('Globale Suche')).toBeInTheDocument();
  });

  it('has visually hidden title for screenreaders', () => {
    render(<Spotlight groups={mockGroups} open={true} />);
    const title = screen.getByText('Globale Suche');
    expect(title).toBeInTheDocument();
    expect(title.className).toContain('sr-only');
  });

  // --- Custom className --------------------------------------------------------

  it('applies custom className', () => {
    render(<Spotlight groups={mockGroups} open={true} className="custom-class" />);
    expect(screen.getByLabelText('Globale Suche').className).toContain('custom-class');
  });

  // --- Empty state -------------------------------------------------------------

  it('shows custom empty message', () => {
    render(
      <Spotlight
        groups={[{ label: 'Test', items: [] }]}
        open={true}
        emptyMessage="Nichts gefunden"
      />
    );
    expect(screen.getByText('Nichts gefunden')).toBeInTheDocument();
  });
});

describe('useSpotlight', () => {
  it('returns open state and controls', () => {
    let result: ReturnType<typeof useSpotlight>;
    function TestComponent() {
      result = useSpotlight();
      return null;
    }
    render(<TestComponent />);
    expect(result!.open).toBe(false);
    act(() => result!.toggle());
    expect(result!.open).toBe(true);
  });
});
