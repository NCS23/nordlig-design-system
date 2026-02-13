import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

describe('Table', () => {
  it('renders a table element', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('table').tagName).toBe('TABLE');
  });

  it('wraps in overflow-x-auto container', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    const wrapper = screen.getByTestId('table').parentElement;
    expect(wrapper?.className).toContain('overflow-x-auto');
  });

  it('applies default density (normal) CSS custom properties', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByTestId('table');
    expect(table.style.getPropertyValue('--tbl-px')).toBe('var(--spacing-table-cell-x-normal)');
    expect(table.style.getPropertyValue('--tbl-py')).toBe('var(--spacing-table-cell-y-normal)');
    expect(table.style.getPropertyValue('--tbl-head-py')).toBe('var(--spacing-table-head-y-normal)');
  });

  it('has leading-relaxed for vertical rhythm', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('table').className).toContain('leading-relaxed');
  });

  it('applies compact density CSS custom properties', () => {
    render(
      <Table data-testid="table" density="compact">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByTestId('table');
    expect(table.style.getPropertyValue('--tbl-px')).toBe('var(--spacing-table-cell-x-compact)');
    expect(table.style.getPropertyValue('--tbl-head-py')).toBe('var(--spacing-table-head-y-compact)');
  });

  it('applies spacious density CSS custom properties', () => {
    render(
      <Table data-testid="table" density="spacious">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByTestId('table');
    expect(table.style.getPropertyValue('--tbl-px')).toBe('var(--spacing-table-cell-x-spacious)');
    expect(table.style.getPropertyValue('--tbl-head-py')).toBe('var(--spacing-table-head-y-spacious)');
  });

  it('sets data-striped attribute when striped', () => {
    render(
      <Table data-testid="table" striped>
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-striped');
  });

  it('does not set data-striped when not striped', () => {
    render(
      <Table data-testid="table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('table')).not.toHaveAttribute('data-striped');
  });

  it('applies custom className', () => {
    render(
      <Table data-testid="table" className="custom">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('table').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableElement>;
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});

describe('TableHeader', () => {
  it('renders thead element', () => {
    render(
      <table>
        <TableHeader data-testid="thead">
          <tr><th>Head</th></tr>
        </TableHeader>
      </table>
    );
    expect(screen.getByTestId('thead').tagName).toBe('THEAD');
  });

  it('has sticky positioning', () => {
    render(
      <table>
        <TableHeader data-testid="thead">
          <tr><th>Head</th></tr>
        </TableHeader>
      </table>
    );
    expect(screen.getByTestId('thead').className).toContain('sticky');
    expect(screen.getByTestId('thead').className).toContain('top-0');
  });

  it('has header background', () => {
    render(
      <table>
        <TableHeader data-testid="thead">
          <tr><th>Head</th></tr>
        </TableHeader>
      </table>
    );
    expect(screen.getByTestId('thead').className).toContain('bg-[var(--color-table-header-bg)]');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableSectionElement>;
    render(
      <table>
        <TableHeader ref={ref}>
          <tr><th>Head</th></tr>
        </TableHeader>
      </table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });
});

describe('TableBody', () => {
  it('renders tbody element', () => {
    render(
      <table>
        <TableBody data-testid="tbody">
          <tr><td>Cell</td></tr>
        </TableBody>
      </table>
    );
    expect(screen.getByTestId('tbody').tagName).toBe('TBODY');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableSectionElement>;
    render(
      <table>
        <TableBody ref={ref}>
          <tr><td>Cell</td></tr>
        </TableBody>
      </table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });
});

describe('TableRow', () => {
  it('renders tr element', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row"><td>Cell</td></TableRow>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('row').tagName).toBe('TR');
  });

  it('has border and hover by default', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row"><td>Cell</td></TableRow>
        </tbody>
      </table>
    );
    const row = screen.getByTestId('row');
    expect(row.className).toContain('border-b');
    expect(row.className).toContain('hover:bg-[var(--color-table-row-hover)]');
  });

  it('disables hover when hoverable=false', () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" hoverable={false}><td>Cell</td></TableRow>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('row').className).not.toContain('hover:bg-');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableRowElement>;
    render(
      <table>
        <tbody>
          <TableRow ref={ref}><td>Cell</td></TableRow>
        </tbody>
      </table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
  });
});

describe('TableHead', () => {
  it('renders th element', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th">Header</TableHead></tr>
        </thead>
      </table>
    );
    expect(screen.getByTestId('th').tagName).toBe('TH');
  });

  it('defaults to left align', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th">Header</TableHead></tr>
        </thead>
      </table>
    );
    expect(screen.getByTestId('th').className).toContain('text-left');
  });

  it('applies right align', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th" align="right">Header</TableHead></tr>
        </thead>
      </table>
    );
    expect(screen.getByTestId('th').className).toContain('text-right');
  });

  it('applies center align', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th" align="center">Header</TableHead></tr>
        </thead>
      </table>
    );
    expect(screen.getByTestId('th').className).toContain('text-center');
  });

  it('has newspaper-style typography: medium weight, uppercase, tracking', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th">Header</TableHead></tr>
        </thead>
      </table>
    );
    const th = screen.getByTestId('th');
    expect(th.className).toContain('font-medium');
    expect(th.className).toContain('uppercase');
    expect(th.className).toContain('tracking-wider');
  });

  it('uses CSS custom properties for padding with separate header vertical', () => {
    render(
      <table>
        <thead>
          <tr><TableHead data-testid="th">Header</TableHead></tr>
        </thead>
      </table>
    );
    const th = screen.getByTestId('th');
    expect(th.className).toContain('px-[var(--tbl-px)]');
    expect(th.className).toContain('py-[var(--tbl-head-py)]');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableCellElement>;
    render(
      <table>
        <thead>
          <tr><TableHead ref={ref}>Header</TableHead></tr>
        </thead>
      </table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });
});

describe('TableCell', () => {
  it('renders td element', () => {
    render(
      <table>
        <tbody>
          <tr><TableCell data-testid="td">Cell</TableCell></tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('td').tagName).toBe('TD');
  });

  it('defaults to left align', () => {
    render(
      <table>
        <tbody>
          <tr><TableCell data-testid="td">Cell</TableCell></tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('td').className).toContain('text-left');
  });

  it('applies right align for numeric', () => {
    render(
      <table>
        <tbody>
          <tr><TableCell data-testid="td" numeric>42</TableCell></tr>
        </tbody>
      </table>
    );
    const td = screen.getByTestId('td');
    expect(td.className).toContain('text-right');
    expect(td.className).toContain('tabular-nums');
  });

  it('explicit align overrides numeric', () => {
    render(
      <table>
        <tbody>
          <tr><TableCell data-testid="td" numeric align="center">42</TableCell></tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('td').className).toContain('text-center');
  });

  it('uses CSS custom properties for padding', () => {
    render(
      <table>
        <tbody>
          <tr><TableCell data-testid="td">Cell</TableCell></tr>
        </tbody>
      </table>
    );
    const td = screen.getByTestId('td');
    expect(td.className).toContain('px-[var(--tbl-px)]');
    expect(td.className).toContain('py-[var(--tbl-py)]');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLTableCellElement>;
    render(
      <table>
        <tbody>
          <tr><TableCell ref={ref}>Cell</TableCell></tr>
        </tbody>
      </table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });
});

describe('Table Compound', () => {
  it('renders full table with semantic HTML', () => {
    render(
      <Table data-testid="table" density="normal" striped>
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead>Name</TableHead>
            <TableHead align="right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alpha</TableCell>
            <TableCell numeric>100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beta</TableCell>
            <TableCell numeric>200</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toHaveAttribute('data-striped');
  });

  it('supports accessibility attributes', () => {
    render(
      <Table data-testid="table" aria-label="Training data">
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead scope="col">Lap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('table')).toHaveAttribute('aria-label', 'Training data');
    expect(screen.getByText('Lap')).toHaveAttribute('scope', 'col');
  });
});
