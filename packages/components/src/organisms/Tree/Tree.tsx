import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Baumdaten als verschachtelte Struktur */
  data: TreeNode[];
  /** Callback bei Auswahl eines Knotens */
  onSelect?: (node: TreeNode) => void;
  /** IDs der standardmaessig ausgeklappten Knoten */
  defaultExpanded?: string[];
}

// ─── Internal: TreeNodeItem ──────────────────────────────────────────────────

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  expanded: Set<string>;
  selected: string | null;
  onToggle: (id: string) => void;
  onSelect?: (node: TreeNode) => void;
  focusedId: string | null;
  onFocusChange: (id: string) => void;
  visibleNodeIds: string[];
}

function TreeNodeItem({
  node,
  level,
  expanded,
  selected,
  onToggle,
  onSelect,
  focusedId,
  onFocusChange,
  visibleNodeIds,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected === node.id;
  const isFocused = focusedId === node.id;
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
    }
  }, [isFocused]);

  const handleClick = () => {
    if (hasChildren) {
      onToggle(node.id);
    }
    onSelect?.(node);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIdx = visibleNodeIds.indexOf(node.id);

    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (hasChildren) {
          onToggle(node.id);
        }
        onSelect?.(node);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        if (currentIdx < visibleNodeIds.length - 1) {
          onFocusChange(visibleNodeIds[currentIdx + 1]);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (currentIdx > 0) {
          onFocusChange(visibleNodeIds[currentIdx - 1]);
        }
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (hasChildren && !isExpanded) {
          onToggle(node.id);
        } else if (hasChildren && isExpanded && currentIdx < visibleNodeIds.length - 1) {
          onFocusChange(visibleNodeIds[currentIdx + 1]);
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        if (hasChildren && isExpanded) {
          onToggle(node.id);
        }
        break;
      }
    }
  };

  return (
    <>
      <div
        ref={itemRef}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level + 1}
        tabIndex={isFocused ? 0 : -1}
        className={cn(
          'flex items-center gap-1 py-1 px-2 rounded-[var(--radius-sm)] cursor-pointer',
          'hover:bg-[var(--color-bg-muted)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
          isSelected && 'bg-[var(--color-bg-muted)]'
        )}
        style={{ paddingLeft: level * 16 + 8 }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* Expand/collapse icon */}
        {hasChildren ? (
          <span
            className={cn(
              'flex items-center justify-center w-4 h-4 transition-transform duration-200',
              isExpanded && 'rotate-90'
            )}
            aria-hidden="true"
          >
            <Icon icon={ChevronRight} size="sm" />
          </span>
        ) : (
          <span className="w-4" aria-hidden="true" />
        )}

        {/* Node icon */}
        {node.icon && (
          <span className="flex items-center justify-center w-4 h-4 text-[var(--color-text-muted)]" aria-hidden="true">
            {node.icon}
          </span>
        )}

        {/* Label */}
        <span className="text-sm text-[var(--color-text-base)] select-none">
          {node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
              focusedId={focusedId}
              onFocusChange={onFocusChange}
              visibleNodeIds={visibleNodeIds}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ─── Helper: Collect visible node IDs ────────────────────────────────────────

function collectVisibleIds(nodes: TreeNode[], expanded: Set<string>): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    ids.push(node.id);
    if (node.children && expanded.has(node.id)) {
      ids.push(...collectVisibleIds(node.children, expanded));
    }
  }
  return ids;
}

// ─── Helper: Find node by id ─────────────────────────────────────────────────

function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

// ─── Tree ────────────────────────────────────────────────────────────────────

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ className, data, onSelect, defaultExpanded = [], ...props }, ref) => {
    const [expanded, setExpanded] = useState<Set<string>>(
      () => new Set(defaultExpanded)
    );
    const [selected, setSelected] = useState<string | null>(null);
    const [focusedId, setFocusedId] = useState<string | null>(
      data.length > 0 ? data[0].id : null
    );

    const visibleNodeIds = collectVisibleIds(data, expanded);

    const handleToggle = useCallback((id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }, []);

    const handleSelect = useCallback(
      (node: TreeNode) => {
        setSelected(node.id);
        setFocusedId(node.id);
        onSelect?.(node);
      },
      [onSelect]
    );

    const handleFocusChange = useCallback((id: string) => {
      setFocusedId(id);
    }, []);

    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Baumansicht"
        className={cn('flex flex-col', className)}
        {...props}
      >
        {data.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            expanded={expanded}
            selected={selected}
            onToggle={handleToggle}
            onSelect={handleSelect}
            focusedId={focusedId}
            onFocusChange={handleFocusChange}
            visibleNodeIds={visibleNodeIds}
          />
        ))}
      </div>
    );
  }
);
Tree.displayName = 'Tree';

// ─── Exports ─────────────────────────────────────────────────────────────────

export { Tree };
