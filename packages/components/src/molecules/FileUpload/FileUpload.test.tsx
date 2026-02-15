import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from './FileUpload';

function createFile(name: string, size: number, type: string): File {
  const content = new ArrayBuffer(size);
  return new File([content], name, { type });
}

function createDataTransfer(files: File[]): DataTransfer {
  const dt = {
    files,
    items: files.map((f) => ({ kind: 'file', type: f.type, getAsFile: () => f })),
    types: ['Files'],
  };
  return dt as unknown as DataTransfer;
}

describe('FileUpload', () => {
  // ─── Rendering ──────────────────────────────────────────────────────────

  it('renders upload zone', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<FileUpload label="CSV Upload" />);
    expect(screen.getByText('CSV Upload')).toBeInTheDocument();
  });

  it('renders default instruction text', () => {
    render(<FileUpload />);
    expect(screen.getByText('Dateien hierher ziehen oder klicken zum Auswählen')).toBeInTheDocument();
  });

  it('renders custom instruction text', () => {
    render(<FileUpload instructionText="Datei ablegen" />);
    expect(screen.getByText('Datei ablegen')).toBeInTheDocument();
  });

  it('renders sub-text from accept and maxSize', () => {
    render(<FileUpload accept=".csv,.fit" maxSize={10} />);
    expect(screen.getByText('CSV, FIT (max 10MB)')).toBeInTheDocument();
  });

  it('renders custom sub-text', () => {
    render(<FileUpload subText="Nur CSV-Dateien" />);
    expect(screen.getByText('Nur CSV-Dateien')).toBeInTheDocument();
  });

  it('renders upload cloud icon', () => {
    const { container } = render(<FileUpload />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has dashed border by default', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button').className).toContain('border-dashed');
  });

  it('has aria-label', () => {
    render(<FileUpload aria-label="Datei hochladen" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Datei hochladen');
  });

  it('uses label as default aria-label', () => {
    render(<FileUpload label="CSV Upload" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'CSV Upload');
  });

  // ─── File Selection via Click ──────────────────────────────────────────

  it('opens file dialog on zone click', async () => {
    const user = userEvent.setup();
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    await user.click(screen.getByRole('button'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('opens file dialog on Enter key', async () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    const zone = screen.getByRole('button');
    zone.focus();
    fireEvent.keyDown(zone, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalled();
  });

  it('opens file dialog on Space key', async () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    const zone = screen.getByRole('button');
    zone.focus();
    fireEvent.keyDown(zone, { key: ' ' });
    expect(clickSpy).toHaveBeenCalled();
  });

  it('passes accept to hidden input', () => {
    render(<FileUpload accept=".csv,.fit" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', '.csv,.fit');
  });

  it('passes multiple to hidden input', () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('multiple');
  });

  it('calls onUpload when files are selected via input', () => {
    const onUpload = vi.fn();
    render(<FileUpload onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(onUpload).toHaveBeenCalledWith([file]);
  });

  it('displays file name after upload', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('workout.csv', 2048, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('workout.csv')).toBeInTheDocument();
  });

  it('displays file size after upload', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.csv', 2048, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('shows remove button for each file', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByLabelText('test.csv entfernen')).toBeInTheDocument();
  });

  it('removes file on remove button click', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<FileUpload onRemove={onRemove} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('test.csv')).toBeInTheDocument();
    await user.click(screen.getByLabelText('test.csv entfernen'));
    expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
    expect(onRemove).toHaveBeenCalledWith(file, 0);
  });

  // ─── Multiple Files ─────────────────────────────────────────────────────

  it('supports multiple file uploads', () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file1 = createFile('a.csv', 1000, 'text/csv');
    const file2 = createFile('b.csv', 2000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file1, file2], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('a.csv')).toBeInTheDocument();
    expect(screen.getByText('b.csv')).toBeInTheDocument();
  });

  it('shows "add more" hint in multiple mode', () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('a.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('Klicken oder ziehen für weitere Dateien')).toBeInTheDocument();
  });

  it('replaces file in single mode', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file1 = createFile('first.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file1], configurable: true });
    fireEvent.change(input);
    expect(screen.getByText('first.csv')).toBeInTheDocument();
    const file2 = createFile('second.csv', 2000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file2], configurable: true });
    fireEvent.change(input);
    expect(screen.queryByText('first.csv')).not.toBeInTheDocument();
    expect(screen.getByText('second.csv')).toBeInTheDocument();
  });

  // ─── Drag & Drop ───────────────────────────────────────────────────────

  it('shows drag-over state on dragOver', () => {
    render(<FileUpload />);
    const zone = screen.getByRole('button');
    fireEvent.dragOver(zone, { dataTransfer: createDataTransfer([]) });
    expect(zone.className).toContain('border-[var(--color-fileupload-drag-border)]');
    expect(zone.className).toContain('bg-[var(--color-fileupload-drag-bg)]');
  });

  it('shows "Dateien loslassen…" on drag over', () => {
    render(<FileUpload />);
    const zone = screen.getByRole('button');
    fireEvent.dragOver(zone, { dataTransfer: createDataTransfer([]) });
    expect(screen.getByText('Dateien loslassen…')).toBeInTheDocument();
  });

  it('removes drag-over state on dragLeave', () => {
    render(<FileUpload />);
    const zone = screen.getByRole('button');
    fireEvent.dragOver(zone, { dataTransfer: createDataTransfer([]) });
    expect(zone.className).toContain('border-[var(--color-fileupload-drag-border)]');
    fireEvent.dragLeave(zone, { dataTransfer: createDataTransfer([]) });
    expect(zone.className).not.toContain('border-[var(--color-fileupload-drag-border)]');
  });

  it('adds file on drop', () => {
    const onUpload = vi.fn();
    render(<FileUpload onUpload={onUpload} />);
    const zone = screen.getByRole('button');
    const file = createFile('dropped.csv', 1000, 'text/csv');
    fireEvent.drop(zone, { dataTransfer: createDataTransfer([file]) });
    expect(onUpload).toHaveBeenCalledWith([file]);
    expect(screen.getByText('dropped.csv')).toBeInTheDocument();
  });

  // ─── Validation ─────────────────────────────────────────────────────────

  it('shows error for file too large', () => {
    render(<FileUpload maxSize={1} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('big.csv', 2 * 1024 * 1024, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByRole('alert')).toHaveTextContent('big.csv ist zu groß (max 1MB)');
  });

  it('shows error for invalid file type', () => {
    render(<FileUpload accept=".csv" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('photo.png', 1000, 'image/png');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByRole('alert')).toHaveTextContent('photo.png: Ungültiger Dateityp');
  });

  it('does not add file on validation error', () => {
    const onUpload = vi.fn();
    render(<FileUpload maxSize={1} onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('big.csv', 2 * 1024 * 1024, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(onUpload).not.toHaveBeenCalled();
  });

  it('accepts valid file', () => {
    const onUpload = vi.fn();
    render(<FileUpload accept=".csv" maxSize={5} onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('data.csv', 1000, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(onUpload).toHaveBeenCalledWith([file]);
  });

  it('shows external error message', () => {
    render(<FileUpload errorMessage="Upload fehlgeschlagen" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Upload fehlgeschlagen');
  });

  it('applies error border state', () => {
    render(<FileUpload error />);
    expect(screen.getByRole('button').className).toContain('border-[var(--color-fileupload-error-border)]');
  });

  // ─── Progress Bar ───────────────────────────────────────────────────────

  it('shows progress bar when progress is set', () => {
    render(<FileUpload progress={60} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60');
  });

  it('shows progress percentage text', () => {
    render(<FileUpload progress={42} />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('progress bar has correct width', () => {
    render(<FileUpload progress={75} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.style.width).toBe('75%');
  });

  it('does not show progress bar when progress is undefined', () => {
    render(<FileUpload />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('progress bar has aria-label', () => {
    render(<FileUpload progress={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload-Fortschritt');
  });

  // ─── Disabled State ─────────────────────────────────────────────────────

  it('applies disabled styling', () => {
    render(<FileUpload disabled />);
    const zone = screen.getByRole('button');
    expect(zone.className).toContain('opacity-50');
    expect(zone.className).toContain('cursor-not-allowed');
  });

  it('has aria-disabled when disabled', () => {
    render(<FileUpload disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not open file dialog when disabled', async () => {
    const user = userEvent.setup();
    render(<FileUpload disabled />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');
    await user.click(screen.getByRole('button'));
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('does not accept drops when disabled', () => {
    const onUpload = vi.fn();
    render(<FileUpload disabled onUpload={onUpload} />);
    const zone = screen.getByRole('button');
    const file = createFile('test.csv', 1000, 'text/csv');
    fireEvent.drop(zone, { dataTransfer: createDataTransfer([file]) });
    expect(onUpload).not.toHaveBeenCalled();
  });

  // ─── Ref / ClassName ────────────────────────────────────────────────────

  it('forwards ref to wrapper div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<FileUpload ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(<FileUpload className="my-upload" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('my-upload');
  });

  // ─── File Size Formatting ───────────────────────────────────────────────

  it('formats bytes correctly', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('tiny.csv', 500, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('500 B')).toBeInTheDocument();
  });

  it('formats KB correctly', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('small.csv', 5120, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('5.0 KB')).toBeInTheDocument();
  });

  it('formats MB correctly', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('large.csv', 3 * 1024 * 1024, 'text/csv');
    Object.defineProperty(input, 'files', { value: [file], writable: false });
    fireEvent.change(input);
    expect(screen.getByText('3.0 MB')).toBeInTheDocument();
  });

  // ─── Focus ──────────────────────────────────────────────────────────────

  it('is focusable via tab', () => {
    render(<FileUpload />);
    const zone = screen.getByRole('button');
    expect(zone).toHaveAttribute('tabindex', '0');
  });

  it('is not focusable when disabled', () => {
    render(<FileUpload disabled />);
    const zone = screen.getByRole('button');
    expect(zone).toHaveAttribute('tabindex', '-1');
  });

  it('has focus-visible ring class', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button').className).toContain('focus-visible:ring-2');
  });
});
