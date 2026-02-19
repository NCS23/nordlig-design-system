import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders with default color', () => {
    render(<ColorPicker />);
    expect(screen.getByRole('group', { name: 'Color picker' })).toBeInTheDocument();
  });

  it('renders saturation field, hue slider, and hex input', () => {
    render(<ColorPicker />);
    expect(screen.getByLabelText('Saturation and brightness')).toBeInTheDocument();
    expect(screen.getByLabelText('Hue')).toBeInTheDocument();
    expect(screen.getByLabelText('Hex color value')).toBeInTheDocument();
  });

  it('renders alpha slider when showAlpha is true', () => {
    render(<ColorPicker showAlpha />);
    expect(screen.getByLabelText('Opacity')).toBeInTheDocument();
  });

  it('does not render alpha slider by default', () => {
    render(<ColorPicker />);
    expect(screen.queryByLabelText('Opacity')).not.toBeInTheDocument();
  });

  it('renders swatches when provided', () => {
    const swatches = ['#ff0000', '#00ff00', '#0000ff'];
    render(<ColorPicker swatches={swatches} />);
    expect(screen.getByRole('group', { name: 'Preset colors' })).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('does not render swatches when not provided', () => {
    render(<ColorPicker />);
    // Main group + SaturationField group, but no preset colors group
    expect(screen.queryByRole('group', { name: 'Preset colors' })).not.toBeInTheDocument();
  });

  // ─── Controlled mode ──────────────────────────────────────────────────

  it('displays the controlled hex value', () => {
    render(<ColorPicker value="#ff5500" />);
    const input = screen.getByLabelText('Hex color value') as HTMLInputElement;
    expect(input.value.toLowerCase()).toBe('ff5500');
  });

  it('calls onChange when hex input changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);

    const input = screen.getByLabelText('Hex color value');
    await user.clear(input);
    await user.type(input, 'ff0000');

    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  // ─── Uncontrolled mode ────────────────────────────────────────────────

  it('uses defaultValue in uncontrolled mode', () => {
    render(<ColorPicker defaultValue="#abcdef" />);
    const input = screen.getByLabelText('Hex color value') as HTMLInputElement;
    expect(input.value.toLowerCase()).toBe('abcdef');
  });

  // ─── Hex input validation ─────────────────────────────────────────────

  it('rejects invalid hex characters in input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#000000" />);

    const input = screen.getByLabelText('Hex color value') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, 'ggzz!!');

    expect(input.value).toBe('');
  });

  it('reverts to previous value on blur with invalid input', async () => {
    const user = userEvent.setup();
    render(<ColorPicker defaultValue="#ff0000" />);

    const input = screen.getByLabelText('Hex color value') as HTMLInputElement;
    await user.clear(input);
    await user.type(input, 'abc');
    await user.tab();

    expect(input.value.toLowerCase()).toBe('aabbcc');
  });

  it('commits hex value on Enter key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ColorPicker defaultValue="#000000" onChange={onChange} />);

    const input = screen.getByLabelText('Hex color value');
    await user.clear(input);
    await user.type(input, 'abc');
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('#aabbcc');
  });

  // ─── Swatch selection ─────────────────────────────────────────────────

  it('selects a swatch and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ColorPicker
        value="#000000"
        onChange={onChange}
        swatches={['#ff0000', '#00ff00']}
      />
    );

    const redSwatch = screen.getByRole('button', { name: '#ff0000' });
    await user.click(redSwatch);

    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('marks the active swatch as pressed', () => {
    render(
      <ColorPicker value="#ff0000" swatches={['#ff0000', '#00ff00']} />
    );
    const redSwatch = screen.getByRole('button', { name: '#ff0000' });
    expect(redSwatch).toHaveAttribute('aria-pressed', 'true');

    const greenSwatch = screen.getByRole('button', { name: '#00ff00' });
    expect(greenSwatch).toHaveAttribute('aria-pressed', 'false');
  });

  // ─── Keyboard navigation ──────────────────────────────────────────────

  it('saturation field responds to arrow keys', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#808080" onChange={onChange} />);

    const field = screen.getByLabelText('Saturation and brightness');
    fireEvent.keyDown(field, { key: 'ArrowRight' });

    expect(onChange).toHaveBeenCalled();
  });

  it('hue slider responds to arrow keys', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#ff0000" onChange={onChange} />);

    const hueSlider = screen.getByLabelText('Hue');
    fireEvent.keyDown(hueSlider, { key: 'ArrowRight' });

    expect(onChange).toHaveBeenCalled();
  });

  it('hue slider supports Home/End keys', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#00ff00" onChange={onChange} />);

    const hueSlider = screen.getByLabelText('Hue');
    fireEvent.keyDown(hueSlider, { key: 'Home' });
    expect(onChange).toHaveBeenCalled();

    onChange.mockClear();
    fireEvent.keyDown(hueSlider, { key: 'End' });
    expect(onChange).toHaveBeenCalled();
  });

  // ─── Alpha slider ─────────────────────────────────────────────────────

  it('alpha slider responds to keyboard and calls onAlphaChange', () => {
    const onAlphaChange = vi.fn();
    render(<ColorPicker showAlpha onAlphaChange={onAlphaChange} />);

    const alphaSlider = screen.getByLabelText('Opacity');
    fireEvent.keyDown(alphaSlider, { key: 'ArrowLeft' });

    expect(onAlphaChange).toHaveBeenCalled();
  });

  // ─── Disabled state ───────────────────────────────────────────────────

  it('disables all interactive elements when disabled', () => {
    render(
      <ColorPicker disabled swatches={['#ff0000']} showAlpha />
    );

    const group = screen.getByLabelText('Color picker');
    expect(group).toHaveAttribute('aria-disabled', 'true');

    const hexInput = screen.getByLabelText('Hex color value') as HTMLInputElement;
    expect(hexInput).toBeDisabled();

    const swatch = screen.getByRole('button', { name: '#ff0000' });
    expect(swatch).toBeDisabled();

    const satField = screen.getByLabelText('Saturation and brightness');
    expect(satField).toHaveAttribute('tabindex', '-1');

    const hueSlider = screen.getByLabelText('Hue');
    expect(hueSlider).toHaveAttribute('tabindex', '-1');

    const alphaSlider = screen.getByLabelText('Opacity');
    expect(alphaSlider).toHaveAttribute('tabindex', '-1');
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<ColorPicker disabled value="#000000" onChange={onChange} />);

    const field = screen.getByLabelText('Saturation and brightness');
    fireEvent.keyDown(field, { key: 'ArrowRight' });

    expect(onChange).not.toHaveBeenCalled();
  });

  // ─── Accessibility ────────────────────────────────────────────────────

  it('applies custom aria-label', () => {
    render(<ColorPicker aria-label="Background color" />);
    expect(screen.getByLabelText('Background color')).toBeInTheDocument();
  });

  it('saturation field uses aria-roledescription for 2D control', () => {
    render(<ColorPicker />);
    const field = screen.getByLabelText('Saturation and brightness');
    expect(field).toHaveAttribute('role', 'slider');
    expect(field).toHaveAttribute('aria-roledescription', '2D color field');
    expect(field).toHaveAttribute('tabindex', '0');
  });

  it('hue slider has proper ARIA attributes', () => {
    render(<ColorPicker />);
    const slider = screen.getByLabelText('Hue');
    expect(slider).toHaveAttribute('role', 'slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '360');
  });

  it('swatches use aria-pressed instead of aria-selected', () => {
    render(
      <ColorPicker value="#ff0000" swatches={['#ff0000', '#00ff00']} />
    );
    const redSwatch = screen.getByRole('button', { name: '#ff0000' });
    expect(redSwatch).toHaveAttribute('aria-pressed', 'true');
    expect(redSwatch).not.toHaveAttribute('aria-selected');
  });

  // ─── Styling ──────────────────────────────────────────────────────────

  it('applies custom className', () => {
    render(<ColorPicker className="custom-class" />);
    expect(screen.getByLabelText('Color picker')).toHaveClass('custom-class');
  });

  it('uses token-based classes', () => {
    render(<ColorPicker />);
    const group = screen.getByLabelText('Color picker');
    expect(group.className).toContain('var(--spacing-cpick-gap)');
    expect(group.className).toContain('var(--color-cpick-bg)');
  });

  // ─── Ref forwarding ──────────────────────────────────────────────────

  it('forwards ref to container div', () => {
    const ref = vi.fn();
    render(<ColorPicker ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
