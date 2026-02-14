import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const renderTabs = (props?: { variant?: 'underline' | 'pills' }) => {
  return render(
    <Tabs defaultValue="tab1">
      <TabsList variant={props?.variant}>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );
};

describe('Tabs', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders tab list with triggers', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('renders default active tab content', () => {
    renderTabs();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('does not render inactive tab content', () => {
    renderTabs();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  // ─── Click Interaction ──────────────────────────────────────────────────

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('does not switch to disabled tab', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  // ─── Keyboard Navigation ───────────────────────────────────────────────

  it('navigates with ArrowRight', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole('tab', { name: 'Tab 1' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('navigates with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole('tab', { name: 'Tab 2' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  // ─── ARIA Attributes ───────────────────────────────────────────────────

  it('has aria-selected on active tab', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('has tabpanel role on content', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('marks disabled tab with disabled attribute', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeDisabled();
  });

  // ─── Underline Variant ──────────────────────────────────────────────────

  it('applies underline variant styles to list', () => {
    renderTabs({ variant: 'underline' });
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('border-b');
    expect(tablist.className).toContain('border-[var(--color-tabs-border)]');
  });

  it('applies underline variant styles to trigger', () => {
    renderTabs({ variant: 'underline' });
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab.className).toContain('border-b-2');
  });

  // ─── Pills Variant ─────────────────────────────────────────────────────

  it('applies pills variant styles to list', () => {
    renderTabs({ variant: 'pills' });
    const tablist = screen.getByRole('tablist');
    expect(tablist.className).toContain('bg-[var(--color-tabs-list-bg)]');
    expect(tablist.className).toContain('rounded-[var(--radius-tabs-list)]');
  });

  it('applies pills variant styles to trigger', () => {
    renderTabs({ variant: 'pills' });
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab.className).toContain('rounded-[var(--radius-tabs-trigger)]');
  });

  // ─── Token Classes ──────────────────────────────────────────────────────

  it('uses token-based padding on triggers', () => {
    renderTabs();
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab.className).toContain('px-[var(--spacing-tabs-trigger-padding-x)]');
    expect(tab.className).toContain('py-[var(--spacing-tabs-trigger-padding-y)]');
  });

  it('uses token-based padding on content', () => {
    renderTabs();
    const panel = screen.getByRole('tabpanel');
    expect(panel.className).toContain('pt-[var(--spacing-tabs-content-padding)]');
  });
});
