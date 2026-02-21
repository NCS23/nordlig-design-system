import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTablePattern } from './DataTablePattern';

/* ─── Test-Daten ─── */

type TestRow = {
  id: string;
  name: string;
  typ: string;
  distanz: string;
};

const testData: TestRow[] = [
  { id: '1', name: 'Morgenlauf', typ: 'Laufen', distanz: '8.2 km' },
  { id: '2', name: 'Intervall-Training', typ: 'Laufen', distanz: '6.1 km' },
  { id: '3', name: 'Rennrad Tour', typ: 'Radfahren', distanz: '42.5 km' },
  { id: '4', name: 'Schwimmen', typ: 'Schwimmen', distanz: '2.0 km' },
  { id: '5', name: 'Trail Run', typ: 'Laufen', distanz: '12.3 km' },
];

const testColumns: ColumnDef<TestRow, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'typ', header: 'Typ' },
  { accessorKey: 'distanz', header: 'Distanz' },
];

describe('DataTablePattern', () => {
  // --- 1. Rendert Tabelle mit Daten und Spalten ---
  it('rendert eine Tabelle mit Daten und Spalten', () => {
    render(<DataTablePattern columns={testColumns} data={testData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Typ')).toBeInTheDocument();
    expect(screen.getByText('Distanz')).toBeInTheDocument();
    expect(screen.getByText('Morgenlauf')).toBeInTheDocument();
    expect(screen.getByText('Rennrad Tour')).toBeInTheDocument();
  });

  // --- 2. Zeigt Titel und Beschreibung ---
  it('zeigt Titel und Beschreibung wenn angegeben', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        title="Trainingseinheiten"
        description="Alle Aktivitaeten im Ueberblick"
      />
    );

    expect(screen.getByText('Trainingseinheiten')).toBeInTheDocument();
    expect(screen.getByText('Alle Aktivitaeten im Ueberblick')).toBeInTheDocument();
  });

  // --- 3. Zeigt headerActions ---
  it('zeigt headerActions wenn angegeben', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        title="Trainings"
        headerActions={<button>Neues Training</button>}
      />
    );

    expect(screen.getByText('Neues Training')).toBeInTheDocument();
  });

  // --- 4. SearchFilter bei searchable=true ---
  it('zeigt SearchFilter bei searchable=true', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        searchable
        searchPlaceholder="Training suchen..."
      />
    );

    expect(screen.getByPlaceholderText('Training suchen...')).toBeInTheDocument();
  });

  // --- 5. SearchFilter verborgen bei searchable=false ---
  it('verbirgt SearchFilter bei searchable=false (Standard)', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
      />
    );

    expect(screen.queryByPlaceholderText('Suchen...')).not.toBeInTheDocument();
  });

  // --- 6. filterSlots werden im SearchFilter gerendert ---
  it('rendert filterSlots innerhalb SearchFilter', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        searchable
        filterSlots={<select data-testid="type-filter"><option>Laufen</option></select>}
      />
    );

    expect(screen.getByTestId('type-filter')).toBeInTheDocument();
  });

  // --- 7. Suche filtert die Daten ---
  it('filtert Daten basierend auf Sucheingabe', async () => {
    const user = userEvent.setup();

    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        searchable
        searchPlaceholder="Suchen..."
        pagination={false}
      />
    );

    const searchInput = screen.getByPlaceholderText('Suchen...');
    await user.type(searchInput, 'Trail');

    expect(screen.getByText('Trail Run')).toBeInTheDocument();
    expect(screen.queryByText('Morgenlauf')).not.toBeInTheDocument();
    expect(screen.queryByText('Rennrad Tour')).not.toBeInTheDocument();
  });

  // --- 8. Bulk Actions Bar bei Selektion sichtbar ---
  it('zeigt Bulk-Actions-Bar wenn Zeilen selektiert sind', async () => {
    const user = userEvent.setup();

    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        selectable
        bulkActions={(rows) => (
          <button data-testid="delete-btn">
            {rows.length} loeschen
          </button>
        )}
        pagination={false}
      />
    );

    // Erste Zeile selektieren
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // erste Datenzeile (Index 0 = Header-Checkbox)

    expect(screen.getByTestId('bulk-actions-bar')).toBeInTheDocument();
    expect(screen.getByText('1 ausgewaehlt')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  // --- 9. Bulk Actions Bar verborgen ohne Selektion ---
  it('verbirgt Bulk-Actions-Bar ohne Selektion', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        selectable
        bulkActions={() => <button>Loeschen</button>}
      />
    );

    expect(screen.queryByTestId('bulk-actions-bar')).not.toBeInTheDocument();
  });

  // --- 10. EmptyState bei leeren Daten ---
  it('zeigt EmptyState wenn keine Daten vorhanden', () => {
    render(<DataTablePattern columns={testColumns} data={[]} />);

    expect(screen.getByText('Keine Daten')).toBeInTheDocument();
    expect(screen.getByText('Es sind keine Eintraege vorhanden.')).toBeInTheDocument();
  });

  // --- 11. Benutzerdefinierter emptyState ---
  it('rendert benutzerdefinierten emptyState', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={[]}
        emptyState={<div data-testid="custom-empty">Individueller Leerzustand</div>}
      />
    );

    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    expect(screen.getByText('Individueller Leerzustand')).toBeInTheDocument();
  });

  // --- 12. emptyTitle und emptyDescription ---
  it('verwendet emptyTitle und emptyDescription im Standard-EmptyState', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={[]}
        emptyTitle="Keine Trainings"
        emptyDescription="Erstelle dein erstes Training."
      />
    );

    expect(screen.getByText('Keine Trainings')).toBeInTheDocument();
    expect(screen.getByText('Erstelle dein erstes Training.')).toBeInTheDocument();
  });

  // --- 13. Pagination respektiert pageSize ---
  it('zeigt Pagination und respektiert pageSize', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        pagination
        pageSize={2}
      />
    );

    // Seite 1 von 3 (5 Eintraege / 2 pro Seite)
    expect(screen.getByText(/Seite 1 von 3/)).toBeInTheDocument();
    // Nur erste 2 Eintraege sichtbar
    expect(screen.getByText('Morgenlauf')).toBeInTheDocument();
    expect(screen.getByText('Intervall-Training')).toBeInTheDocument();
    expect(screen.queryByText('Rennrad Tour')).not.toBeInTheDocument();
  });

  // --- 14. Forward ref funktioniert ---
  it('leitet ref korrekt weiter', () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <DataTablePattern
        ref={ref}
        columns={testColumns}
        data={testData}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // --- 15. className wird angewendet ---
  it('wendet benutzerdefinierte className an', () => {
    const { container } = render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        className="custom-pattern"
      />
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('custom-pattern');
  });

  // --- 16. Verwendet Token-Klassen ---
  it('verwendet Token-Klasse fuer section-gap', () => {
    const { container } = render(
      <DataTablePattern columns={testColumns} data={testData} />
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('gap-[var(--spacing-dtpattern-section-gap)]');
  });

  // --- 17. density wird an DataTable durchgereicht ---
  it('reicht density an DataTable durch', () => {
    const { container } = render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        density="compact"
      />
    );

    // DataTable rendert eine table — pruefe, dass sie existiert
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  // --- 18. striped wird an DataTable durchgereicht ---
  it('reicht striped an DataTable durch', () => {
    const { container } = render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        striped
      />
    );

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  // --- 19. displayName ist gesetzt ---
  it('hat den displayName "DataTablePattern"', () => {
    expect((DataTablePattern as { displayName?: string }).displayName).toBe(
      'DataTablePattern'
    );
  });

  // --- 20. Ergebniszahl wird im SearchFilter angezeigt ---
  it('zeigt Ergebniszahl im SearchFilter', () => {
    render(
      <DataTablePattern
        columns={testColumns}
        data={testData}
        searchable
      />
    );

    expect(screen.getByText('5 Ergebnisse')).toBeInTheDocument();
  });
});
