import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable, DataTableColumnHeader } from './DataTable';

/* ─── Test-Daten ─── */

type TestRow = {
  id: string;
  name: string;
  value: number;
};

const testData: TestRow[] = [
  { id: '1', name: 'Alpha', value: 100 },
  { id: '2', name: 'Beta', value: 200 },
  { id: '3', name: 'Gamma', value: 300 },
  { id: '4', name: 'Delta', value: 400 },
  { id: '5', name: 'Epsilon', value: 500 },
];

const testColumns: ColumnDef<TestRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'value', header: 'Wert' },
];

describe('DataTable', () => {
  // --- 1. Rendert Tabelle mit Spalten und Daten ---

  it('rendert eine Tabelle mit Spalten und Daten', () => {
    render(<DataTable columns={testColumns} data={testData} />);

    // Spaltenkoepfe pruefen
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Wert')).toBeInTheDocument();

    // Daten pruefen
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  // --- 2. Rendert korrekte Anzahl an Zeilen ---

  it('rendert die korrekte Anzahl an Zeilen', () => {
    render(<DataTable columns={testColumns} data={testData} />);

    // 5 Datenzeilen + 1 Header-Zeile
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6); // 1 Header + 5 Daten
  });

  // --- 3. Spaltenkoepfe werden korrekt angezeigt ---

  it('zeigt Spaltenkoepfe korrekt an', () => {
    const columnsWithCustomHeaders: ColumnDef<TestRow>[] = [
      { accessorKey: 'name', header: 'Bezeichnung' },
      { accessorKey: 'value', header: 'Betrag' },
    ];

    render(<DataTable columns={columnsWithCustomHeaders} data={testData} />);

    expect(screen.getByText('Bezeichnung')).toBeInTheDocument();
    expect(screen.getByText('Betrag')).toBeInTheDocument();
  });

  // --- 4. Zeigt Leerzustand wenn keine Daten ---

  it('zeigt Leerzustand-Nachricht wenn keine Daten vorhanden', () => {
    render(<DataTable columns={testColumns} data={[]} />);

    expect(screen.getByText('Keine Ergebnisse.')).toBeInTheDocument();
  });

  it('zeigt benutzerdefinierte Leerzustand-Nachricht', () => {
    render(
      <DataTable
        columns={testColumns}
        data={[]}
        emptyMessage="Keine Trainingseinheiten gefunden."
      />
    );

    expect(
      screen.getByText('Keine Trainingseinheiten gefunden.')
    ).toBeInTheDocument();
  });

  // --- 5. Hat korrekten displayName ---

  it('hat den displayName "DataTable"', () => {
    expect(DataTable.displayName).toBe('DataTable');
  });

  it('hat den displayName "DataTableColumnHeader"', () => {
    expect(DataTableColumnHeader.displayName).toBe('DataTableColumnHeader');
  });

  // --- 6. Benutzerdefinierte className wird zusammengefuehrt ---

  it('uebergibt zusaetzliche className an den Wrapper', () => {
    const { container } = render(
      <DataTable
        columns={testColumns}
        data={testData}
        className="custom-datatable"
      />
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('custom-datatable');
  });

  // --- 7. Pagination zeigt Seiteninformation ---

  it('zeigt Seiteninformation bei aktivierter Pagination', () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        pagination
        pageSize={2}
      />
    );

    // Seite 1 von 3 (5 Eintraege / 2 pro Seite = 3 Seiten)
    expect(screen.getByText(/Seite 1 von 3/)).toBeInTheDocument();
    expect(screen.getByText('Zurueck')).toBeInTheDocument();
    expect(screen.getByText('Weiter')).toBeInTheDocument();
  });

  it('zeigt nur aktuelle Seitenzeilen bei Pagination', () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        pagination
        pageSize={2}
      />
    );

    // Nur erste 2 Zeilen sichtbar
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument();
  });

  // --- 8. Sucheingabe filtert (globaler Filter) ---

  it('rendert Sucheingabe bei searchable=true', () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        searchable
        searchPlaceholder="Suchen..."
      />
    );

    expect(screen.getByPlaceholderText('Suchen...')).toBeInTheDocument();
  });

  it('filtert Zeilen mit globalem Suchfilter', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={testColumns}
        data={testData}
        searchable
        searchPlaceholder="Suchen..."
      />
    );

    const searchInput = screen.getByPlaceholderText('Suchen...');
    await user.type(searchInput, 'Alpha');

    // Nur Alpha-Zeile sichtbar
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument();
  });

  // --- 9. Auswahlcheckboxen werden gerendert wenn selectable ---

  it('rendert Checkboxen bei selectable=true', () => {
    render(
      <DataTable columns={testColumns} data={testData} selectable />
    );

    // "Alle auswaehlen" Checkbox + 5 Zeilen-Checkboxen
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(6); // 1 Header + 5 Zeilen
  });

  it('rendert keine Checkboxen bei selectable=false (Standard)', () => {
    render(<DataTable columns={testColumns} data={testData} />);

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  // --- 10. Verwendet Token-Klassen ---

  it('verwendet Token-Klasse fuer ausgewaehlte Zeilen-Hintergrund', () => {
    const { container } = render(
      <DataTable
        columns={testColumns}
        data={testData}
        className="test-wrapper"
      />
    );

    const wrapper = container.firstElementChild;
    // Der Wrapper verwendet die gap-Token-Klasse
    expect(wrapper?.className).toContain(
      'gap-[var(--spacing-datatable-toolbar-gap)]'
    );
  });

  it('verwendet Token-Klasse fuer Leerzustand-Text', () => {
    render(<DataTable columns={testColumns} data={[]} />);

    const emptyCell = screen.getByText('Keine Ergebnisse.');
    expect(emptyCell.className).toContain(
      'text-[var(--color-datatable-empty-text)]'
    );
  });
});
