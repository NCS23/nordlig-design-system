import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tree, type TreeNode } from './Tree';

// ─── Test Data ───────────────────────────────────────────────────────────────

const simpleData: TreeNode[] = [
  {
    id: 'root-1',
    label: 'Root 1',
    children: [
      { id: 'child-1', label: 'Child 1' },
      { id: 'child-2', label: 'Child 2' },
    ],
  },
  {
    id: 'root-2',
    label: 'Root 2',
  },
];

const deepData: TreeNode[] = [
  {
    id: 'l1',
    label: 'Level 1',
    children: [
      {
        id: 'l2',
        label: 'Level 2',
        children: [
          {
            id: 'l3',
            label: 'Level 3',
            children: [
              { id: 'l4', label: 'Level 4' },
            ],
          },
        ],
      },
    ],
  },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Tree', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────────

  it('renders root nodes', () => {
    render(<Tree data={simpleData} />);
    expect(screen.getByText('Root 1')).toBeInTheDocument();
    expect(screen.getByText('Root 2')).toBeInTheDocument();
  });

  it('renders with tree role', () => {
    render(<Tree data={simpleData} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('renders treeitems', () => {
    render(<Tree data={simpleData} />);
    const items = screen.getAllByRole('treeitem');
    // Only root-level nodes visible initially (children not expanded)
    expect(items).toHaveLength(2);
  });

  it('applies custom className', () => {
    render(<Tree data={simpleData} className="my-tree" />);
    expect(screen.getByRole('tree')).toHaveClass('my-tree');
  });

  it('renders empty tree', () => {
    render(<Tree data={[]} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  // ─── Expand/Collapse ──────────────────────────────────────────────────────

  it('children are hidden by default', () => {
    render(<Tree data={simpleData} />);
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child 2')).not.toBeInTheDocument();
  });

  it('expands node on click', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    await user.click(screen.getByText('Root 1'));

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('collapses node on second click', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    await user.click(screen.getByText('Root 1'));
    expect(screen.getByText('Child 1')).toBeInTheDocument();

    await user.click(screen.getByText('Root 1'));
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
  });

  it('sets aria-expanded on parent nodes', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    const root1 = screen.getByText('Root 1').closest('[role="treeitem"]');
    expect(root1).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByText('Root 1'));
    expect(root1).toHaveAttribute('aria-expanded', 'true');
  });

  it('leaf nodes do not have aria-expanded', () => {
    render(<Tree data={simpleData} />);
    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]');
    expect(root2).not.toHaveAttribute('aria-expanded');
  });

  // ─── defaultExpanded ──────────────────────────────────────────────────────

  it('expands nodes from defaultExpanded', () => {
    render(<Tree data={simpleData} defaultExpanded={['root-1']} />);
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('supports multiple defaultExpanded IDs', () => {
    render(<Tree data={deepData} defaultExpanded={['l1', 'l2']} />);
    expect(screen.getByText('Level 2')).toBeInTheDocument();
    expect(screen.getByText('Level 3')).toBeInTheDocument();
  });

  // ─── Deep Nesting ─────────────────────────────────────────────────────────

  it('renders deeply nested nodes', async () => {
    const user = userEvent.setup();
    render(<Tree data={deepData} />);

    await user.click(screen.getByText('Level 1'));
    await user.click(screen.getByText('Level 2'));
    await user.click(screen.getByText('Level 3'));

    expect(screen.getByText('Level 4')).toBeInTheDocument();
  });

  it('applies increasing indentation for nested levels', async () => {
    const user = userEvent.setup();
    render(<Tree data={deepData} />);

    const l1Item = screen.getByText('Level 1').closest('[role="treeitem"]');
    expect(l1Item).toHaveAttribute('aria-level', '1');

    await user.click(screen.getByText('Level 1'));

    const l2Item = screen.getByText('Level 2').closest('[role="treeitem"]');
    expect(l2Item).toHaveAttribute('aria-level', '2');
  });

  // ─── Selection ────────────────────────────────────────────────────────────

  it('calls onSelect when clicking a node', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Tree data={simpleData} onSelect={onSelect} />);

    await user.click(screen.getByText('Root 2'));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'root-2', label: 'Root 2' })
    );
  });

  it('calls onSelect for child nodes', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Tree data={simpleData} onSelect={onSelect} defaultExpanded={['root-1']} />
    );

    await user.click(screen.getByText('Child 1'));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'child-1', label: 'Child 1' })
    );
  });

  it('sets aria-selected on selected node', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    await user.click(screen.getByText('Root 2'));

    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]');
    expect(root2).toHaveAttribute('aria-selected', 'true');
  });

  it('deselects previous node when selecting a new one', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    await user.click(screen.getByText('Root 1'));
    await user.click(screen.getByText('Root 2'));

    const root1 = screen.getByText('Root 1').closest('[role="treeitem"]');
    expect(root1).toHaveAttribute('aria-selected', 'false');

    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]');
    expect(root2).toHaveAttribute('aria-selected', 'true');
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────────

  it('navigates down with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    const root1 = screen.getByText('Root 1').closest('[role="treeitem"]') as HTMLElement;
    root1.focus();

    await user.keyboard('{ArrowDown}');

    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]') as HTMLElement;
    expect(document.activeElement).toBe(root2);
  });

  it('navigates up with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    // Click Root 2 to set the component's internal focusedId state,
    // then press ArrowUp so the focus transition actually triggers.
    await user.click(screen.getByText('Root 2'));

    await user.keyboard('{ArrowUp}');

    await waitFor(() => {
      const root1 = screen.getByText('Root 1').closest('[role="treeitem"]') as HTMLElement;
      expect(document.activeElement).toBe(root1);
    });
  });

  it('expands node with Enter key', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    const root1 = screen.getByText('Root 1').closest('[role="treeitem"]') as HTMLElement;
    root1.focus();

    await user.keyboard('{Enter}');

    expect(screen.getByText('Child 1')).toBeInTheDocument();
  });

  it('expands node with Space key', async () => {
    const user = userEvent.setup();
    render(<Tree data={simpleData} />);

    const root1 = screen.getByText('Root 1').closest('[role="treeitem"]') as HTMLElement;
    root1.focus();

    await user.keyboard(' ');

    expect(screen.getByText('Child 1')).toBeInTheDocument();
  });

  it('calls onSelect with Enter key', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Tree data={simpleData} onSelect={onSelect} />);

    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]') as HTMLElement;
    root2.focus();

    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'root-2', label: 'Root 2' })
    );
  });

  // ─── Token-based Styling ──────────────────────────────────────────────────

  describe('token-based styling', () => {
    it('uses muted background for hover/selection', async () => {
      const user = userEvent.setup();
      render(<Tree data={simpleData} />);

      await user.click(screen.getByText('Root 2'));

      const root2 = screen.getByText('Root 2').closest('[role="treeitem"]');
      expect(root2).toHaveClass('bg-[var(--color-bg-muted)]');
    });

    it('uses sm radius token for item rounding', () => {
      render(<Tree data={simpleData} />);
      const items = screen.getAllByRole('treeitem');
      items.forEach((item) => {
        expect(item).toHaveClass('rounded-[var(--radius-sm)]');
      });
    });

    it('uses text-base token for label color', () => {
      render(<Tree data={simpleData} />);
      const label = screen.getByText('Root 1');
      expect(label).toHaveClass('text-[var(--color-text-base)]');
    });
  });

  // ─── Icons ────────────────────────────────────────────────────────────────

  it('renders node icons when provided', () => {
    const dataWithIcons: TreeNode[] = [
      {
        id: 'folder',
        label: 'Documents',
        icon: <span data-testid="folder-icon">F</span>,
        children: [],
      },
    ];
    render(<Tree data={dataWithIcons} />);
    expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
  });

  it('does not render icon placeholder when no icon', () => {
    render(<Tree data={simpleData} />);
    // The alignment spacer (w-4) for missing expand icon is present,
    // but no icon container when icon is undefined
    const root2 = screen.getByText('Root 2').closest('[role="treeitem"]');
    const iconContainers = root2!.querySelectorAll('.text-\\[var\\(--color-text-muted\\)\\]');
    expect(iconContainers).toHaveLength(0);
  });
});
