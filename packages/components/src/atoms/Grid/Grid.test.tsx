import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid, GridItem } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid data-testid="grid"><div>A</div><div>B</div></Grid>);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('applies grid display', () => {
    render(<Grid data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('grid');
  });

  it('applies cols variant', () => {
    render(<Grid cols={3} data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('grid-cols-3');
  });

  it('applies 12-column grid', () => {
    render(<Grid cols={12} data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('grid-cols-12');
  });

  it('applies gap variant', () => {
    render(<Grid gap="lg" data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('gap-');
  });

  it('applies align variant', () => {
    render(<Grid align="center" data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('items-center');
  });

  it('merges custom className', () => {
    render(<Grid className="custom" data-testid="grid">content</Grid>);
    expect(screen.getByTestId('grid').className).toContain('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Grid ref={ref}>content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('GridItem', () => {
  it('renders children', () => {
    render(<GridItem data-testid="item">Cell</GridItem>);
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });

  it('applies span variant', () => {
    render(<GridItem span={6} data-testid="item">content</GridItem>);
    expect(screen.getByTestId('item').className).toContain('col-span-6');
  });

  it('applies full span', () => {
    render(<GridItem span="full" data-testid="item">content</GridItem>);
    expect(screen.getByTestId('item').className).toContain('col-span-full');
  });

  it('applies start position', () => {
    render(<GridItem start={3} data-testid="item">content</GridItem>);
    expect(screen.getByTestId('item').className).toContain('col-start-3');
  });

  it('applies rowSpan', () => {
    render(<GridItem rowSpan={2} data-testid="item">content</GridItem>);
    expect(screen.getByTestId('item').className).toContain('row-span-2');
  });

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<GridItem ref={ref}>content</GridItem>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
