import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

const renderCollapsible = (props: { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void } = {}) => {
  return render(
    <Collapsible {...props}>
      <CollapsibleTrigger asChild>
        <button>Umschalten</button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div>Versteckter Inhalt</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

describe('Collapsible', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders the trigger', () => {
    renderCollapsible();
    expect(screen.getByRole('button', { name: 'Umschalten' })).toBeInTheDocument();
  });

  // ─── Initially Hidden ──────────────────────────────────────────────────

  it('hides content initially when closed', () => {
    renderCollapsible();
    // Radix removes content from DOM when closed
    const content = screen.queryByText('Versteckter Inhalt');
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  // ─── Toggle Open ──────────────────────────────────────────────────────

  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    await user.click(screen.getByRole('button', { name: 'Umschalten' }));
    expect(screen.getByText('Versteckter Inhalt')).toBeVisible();
  });

  // ─── Toggle Close ─────────────────────────────────────────────────────

  it('hides content when trigger is clicked again', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    const trigger = screen.getByRole('button', { name: 'Umschalten' });
    await user.click(trigger);
    expect(screen.getByText('Versteckter Inhalt')).toBeVisible();
    await user.click(trigger);
    // After closing, Radix may remove content from DOM
    const content = screen.queryByText('Versteckter Inhalt');
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  // ─── Controlled ───────────────────────────────────────────────────────

  it('supports controlled open/close', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger asChild>
          <button>Umschalten</button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Kontrollierter Inhalt</div>
        </CollapsibleContent>
      </Collapsible>
    );
    // Radix removes closed content from DOM
    const content = screen.queryByText('Kontrollierter Inhalt');
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }

    rerender(
      <Collapsible open={true}>
        <CollapsibleTrigger asChild>
          <button>Umschalten</button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>Kontrollierter Inhalt</div>
        </CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Kontrollierter Inhalt')).toBeVisible();
  });

  // ─── onOpenChange Callback ────────────────────────────────────────────

  it('calls onOpenChange when toggled', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    renderCollapsible({ onOpenChange: handleOpenChange });
    await user.click(screen.getByRole('button', { name: 'Umschalten' }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  // ─── Custom className ─────────────────────────────────────────────────

  it('forwards custom className to content', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <button>Umschalten</button>
        </CollapsibleTrigger>
        <CollapsibleContent className="my-custom-class">
          <div>Inhalt</div>
        </CollapsibleContent>
      </Collapsible>
    );
    const content = screen.getByText('Inhalt').parentElement;
    expect(content?.getAttribute('class')).toContain('my-custom-class');
  });

  // ─── Keyboard Enter ──────────────────────────────────────────────────

  it('toggles with Enter key', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    const trigger = screen.getByRole('button', { name: 'Umschalten' });
    trigger.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Versteckter Inhalt')).toBeVisible();
  });
});
