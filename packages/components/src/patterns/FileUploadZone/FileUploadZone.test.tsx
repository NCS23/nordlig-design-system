import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FileUploadZone, type FileUploadZoneFile } from './FileUploadZone';

/* ─── Helpers ─── */

function createMockFile(name: string, size: number, type = 'text/plain'): File {
  const content = new Array(size).fill('a').join('');
  return new File([content], name, { type });
}

function createUploadedFile(
  overrides: Partial<FileUploadZoneFile> & { name?: string; size?: number; type?: string } = {}
): FileUploadZoneFile {
  const { name = 'test.csv', size = 1024, type = 'text/csv', ...rest } = overrides;
  return {
    file: createMockFile(name, size, type),
    id: `file-${Math.random()}`,
    progress: 0,
    status: 'pending',
    ...rest,
  };
}

describe('FileUploadZone', () => {
  // --- 1. Rendert die Drop-Zone ---
  it('rendert die Drop-Zone', () => {
    render(<FileUploadZone />);
    expect(screen.getByTestId('file-upload-zone-dropzone')).toBeInTheDocument();
  });

  // --- 2. Zeigt Titel und Beschreibung ---
  it('zeigt Titel und Beschreibung', () => {
    render(
      <FileUploadZone
        title="Trainingsdaten hochladen"
        description="CSV- oder FIT-Dateien"
      />
    );
    expect(screen.getByText('Trainingsdaten hochladen')).toBeInTheDocument();
    expect(screen.getByText('CSV- oder FIT-Dateien')).toBeInTheDocument();
  });

  // --- 3. Verbirgt Header ohne Titel/Beschreibung ---
  it('verbirgt Header ohne Titel und Beschreibung', () => {
    render(<FileUploadZone />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  // --- 4. Zeigt Standard-Anweisungstext ---
  it('zeigt Standard-Anweisungstext in der Drop-Zone', () => {
    render(<FileUploadZone />);
    expect(screen.getByText('Dateien hierher ziehen oder klicken zum Auswählen')).toBeInTheDocument();
  });

  // --- 5. Zeigt benutzerdefinierten Anweisungstext ---
  it('zeigt benutzerdefinierten Anweisungstext', () => {
    render(<FileUploadZone instructionText="FIT-Dateien ablegen" />);
    expect(screen.getByText('FIT-Dateien ablegen')).toBeInTheDocument();
  });

  // --- 6. Zeigt Dateiformat-Hinweis ---
  it('zeigt Dateiformat- und Groessen-Hinweis', () => {
    render(<FileUploadZone accept=".csv,.fit" maxSize={10} />);
    expect(screen.getByText('CSV, FIT (max 10MB)')).toBeInTheDocument();
  });

  // --- 7. Datei-Auswahl per Klick ---
  it('oeffnet Dateiauswahl per Klick auf die Drop-Zone', async () => {
    const user = userEvent.setup();
    const onFilesAdd = vi.fn();
    render(<FileUploadZone onFilesAdd={onFilesAdd} />);

    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    const input = dropzone.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await user.click(dropzone);
    expect(clickSpy).toHaveBeenCalled();
  });

  // --- 8. Datei-Auswahl per Tastatur ---
  it('oeffnet Dateiauswahl per Enter-Taste', async () => {
    const user = userEvent.setup();
    render(<FileUploadZone />);

    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    const input = dropzone.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    dropzone.focus();
    await user.keyboard('{Enter}');
    expect(clickSpy).toHaveBeenCalled();
  });

  // --- 9. Space-Taste oeffnet auch ---
  it('oeffnet Dateiauswahl per Space-Taste', async () => {
    const user = userEvent.setup();
    render(<FileUploadZone />);

    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    const input = dropzone.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    dropzone.focus();
    await user.keyboard(' ');
    expect(clickSpy).toHaveBeenCalled();
  });

  // --- 10. Rendert Datei-Liste ---
  it('rendert eine Liste der hochgeladenen Dateien', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'training.csv', size: 2048 }),
      createUploadedFile({ name: 'workout.fit', size: 4096 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone-list')).toBeInTheDocument();
    expect(screen.getByText('training.csv')).toBeInTheDocument();
    expect(screen.getByText('workout.fit')).toBeInTheDocument();
  });

  // --- 11. Zeigt Dateigroessen ---
  it('zeigt Dateigroessen korrekt formatiert', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'small.txt', size: 500 }),
      createUploadedFile({ name: 'medium.csv', size: 2048 }),
      createUploadedFile({ name: 'large.fit', size: 2 * 1024 * 1024 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByText('500 B')).toBeInTheDocument();
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
    expect(screen.getByText('2.0 MB')).toBeInTheDocument();
  });

  // --- 12. Verbirgt Datei-Liste ohne Dateien ---
  it('verbirgt Datei-Liste ohne Dateien', () => {
    render(<FileUploadZone files={[]} />);
    expect(screen.queryByTestId('file-upload-zone-list')).not.toBeInTheDocument();
  });

  // --- 13. Zeigt Zusammenfassung ---
  it('zeigt Zusammenfassung mit Dateianzahl und Gesamtgroesse', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'a.csv', size: 1024 }),
      createUploadedFile({ name: 'b.csv', size: 1024 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone-summary')).toHaveTextContent('2 Dateien (2.0 KB)');
  });

  // --- 14. Zusammenfassung Singular ---
  it('zeigt Singular bei einer Datei', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'a.csv', size: 1024 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone-summary')).toHaveTextContent('1 Datei');
  });

  // --- 15. Per-File Progress ---
  it('zeigt Fortschrittsbalken bei uploading-Status', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'upload.csv', status: 'uploading', progress: 45 }),
    ];

    render(<FileUploadZone files={files} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '45');
  });

  // --- 16. Kein Progress bei pending ---
  it('zeigt keinen Fortschrittsbalken bei pending-Status', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'pending.csv', status: 'pending', progress: 0 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  // --- 17. Kein Progress bei complete ---
  it('zeigt keinen Fortschrittsbalken bei complete-Status', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'done.csv', status: 'complete', progress: 100 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  // --- 18. Entfernen-Button ---
  it('ruft onFileRemove beim Klick auf Entfernen auf', async () => {
    const user = userEvent.setup();
    const onFileRemove = vi.fn();
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'remove-me.csv' }),
    ];

    render(<FileUploadZone files={files} onFileRemove={onFileRemove} />);

    const removeButton = screen.getByLabelText('remove-me.csv entfernen');
    await user.click(removeButton);

    expect(onFileRemove).toHaveBeenCalledTimes(1);
    expect(onFileRemove).toHaveBeenCalledWith(files[0], 0);
  });

  // --- 19. Error-Status zeigt Fehlermeldung ---
  it('zeigt Fehlermeldung bei error-Status', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'bad.csv', status: 'error', error: 'Datei beschaedigt' }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByText(/Datei beschaedigt/)).toBeInTheDocument();
  });

  // --- 20. Error-Status: roter Rahmen ---
  it('rendert error-Items mit error-Border', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'err.csv', status: 'error' }),
    ];

    render(<FileUploadZone files={files} />);
    const item = screen.getByTestId('file-upload-zone-item-0');
    expect(item.className).toContain('border-[var(--color-fileupload-error-border)]');
  });

  // --- 21. Complete-Status ---
  it('zeigt Zusammenfassung mit fertig-Zaehler bei complete-Status', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'a.csv', status: 'complete', progress: 100, size: 512 }),
      createUploadedFile({ name: 'b.csv', status: 'uploading', progress: 50, size: 512 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone-summary')).toHaveTextContent('1 fertig');
  });

  // --- 22. Validierung: Dateigroesse ---
  it('zeigt Validierungsfehler bei zu grosser Datei', async () => {
    const user = userEvent.setup();
    const onFilesAdd = vi.fn();

    render(<FileUploadZone maxSize={1} onFilesAdd={onFilesAdd} />);

    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = createMockFile('huge.csv', 2 * 1024 * 1024, 'text/csv');

    await user.upload(input, bigFile);

    expect(screen.getByRole('alert')).toHaveTextContent('huge.csv ist zu groß (max 1MB)');
    expect(onFilesAdd).not.toHaveBeenCalled();
  });

  // --- 23. Validierung: Dateityp ---
  it('zeigt Validierungsfehler bei ungueltigem Dateityp', () => {
    const onFilesAdd = vi.fn();

    render(<FileUploadZone accept=".csv" onFilesAdd={onFilesAdd} />);

    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    const wrongFile = createMockFile('image.png', 1024, 'image/png');

    // fireEvent umgeht das accept-Attribut (userEvent.upload filtert)
    fireEvent.change(input, { target: { files: [wrongFile] } });

    expect(screen.getByRole('alert')).toHaveTextContent('image.png: Ungültiger Dateityp');
    expect(onFilesAdd).not.toHaveBeenCalled();
  });

  // --- 24. Gueltige Datei loest onFilesAdd aus ---
  it('ruft onFilesAdd bei gueltiger Datei auf', async () => {
    const user = userEvent.setup();
    const onFilesAdd = vi.fn();

    render(<FileUploadZone accept=".csv" onFilesAdd={onFilesAdd} />);

    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    const validFile = createMockFile('valid.csv', 1024, 'text/csv');

    await user.upload(input, validFile);

    expect(onFilesAdd).toHaveBeenCalledTimes(1);
    expect(onFilesAdd).toHaveBeenCalledWith([validFile]);
  });

  // --- 25. Disabled-Zustand ---
  it('deaktiviert Interaktion bei disabled', () => {
    render(<FileUploadZone disabled />);

    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    expect(dropzone).toHaveAttribute('tabindex', '-1');
    expect(dropzone.className).toContain('cursor-not-allowed');
    expect(dropzone.className).toContain('opacity-50');
  });

  // --- 26. Disabled: kein Klick-Handler ---
  it('oeffnet keine Dateiauswahl bei disabled', async () => {
    const user = userEvent.setup();
    render(<FileUploadZone disabled />);

    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await user.click(dropzone);
    expect(clickSpy).not.toHaveBeenCalled();
  });

  // --- 27. Forward ref ---
  it('leitet ref korrekt weiter', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FileUploadZone ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // --- 28. className wird angewendet ---
  it('wendet benutzerdefinierte className an', () => {
    render(<FileUploadZone className="custom-zone" />);
    expect(screen.getByTestId('file-upload-zone').className).toContain('custom-zone');
  });

  // --- 29. Verwendet Token-Klassen ---
  it('verwendet fuzpattern Token-Klassen', () => {
    render(<FileUploadZone />);
    expect(screen.getByTestId('file-upload-zone').className).toContain(
      'gap-[var(--spacing-fuzpattern-section-gap)]'
    );
  });

  // --- 30. displayName ist gesetzt ---
  it('hat den displayName "FileUploadZone"', () => {
    expect(FileUploadZone.displayName).toBe('FileUploadZone');
  });

  // --- 31. aria-label fuer Drop-Zone ---
  it('setzt aria-label auf der Drop-Zone', () => {
    render(<FileUploadZone aria-label="Trainingsdaten ablegen" />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    expect(dropzone).toHaveAttribute('aria-label', 'Trainingsdaten ablegen');
  });

  // --- 32. Datei-Liste hat role="list" ---
  it('rendert die Datei-Liste mit role="list"', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'a.csv' }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByRole('list', { name: 'Hochgeladene Dateien' })).toBeInTheDocument();
  });

  // --- 33. Zusammenfassung mit Fehler-Zaehler ---
  it('zeigt Fehler-Zaehler in der Zusammenfassung', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'a.csv', status: 'complete', size: 512 }),
      createUploadedFile({ name: 'b.csv', status: 'error', error: 'Fehler', size: 512 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone-summary')).toHaveTextContent('1 fehlerhaft');
  });

  // --- 34. Bild-Vorschau wird gerendert ---
  it('rendert Bild-Vorschau wenn preview=true und Vorschau vorhanden', () => {
    const files: FileUploadZoneFile[] = [
      {
        file: createMockFile('photo.png', 4096, 'image/png'),
        id: 'img-1',
        progress: 100,
        status: 'complete',
        preview: 'blob:http://localhost/preview-123',
      },
    ];

    render(<FileUploadZone files={files} preview />);
    const img = screen.getByAltText('photo.png');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'blob:http://localhost/preview-123');
  });

  // --- 35. Zeigt Icon statt Vorschau ohne preview-Prop ---
  it('zeigt Datei-Icon statt Vorschau wenn preview=false', () => {
    const files: FileUploadZoneFile[] = [
      {
        file: createMockFile('photo.png', 4096, 'image/png'),
        id: 'img-2',
        progress: 100,
        status: 'complete',
        preview: 'blob:http://localhost/preview-456',
      },
    ];

    render(<FileUploadZone files={files} preview={false} />);
    expect(screen.queryByAltText('photo.png')).not.toBeInTheDocument();
  });

  // --- 36. multiple=true als Standard ---
  it('setzt multiple=true als Standard auf dem Input', () => {
    render(<FileUploadZone />);
    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('multiple');
  });

  // --- 37. accept wird an input durchgereicht ---
  it('reicht accept an den File-Input durch', () => {
    render(<FileUploadZone accept=".csv,.fit" />);
    const input = screen.getByTestId('file-upload-zone').querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', '.csv,.fit');
  });

  // --- 38. Focus-Ring auf Entfernen-Button ---
  it('hat Focus-Ring auf dem Entfernen-Button', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'focus.csv' }),
    ];

    render(<FileUploadZone files={files} />);
    const removeBtn = screen.getByLabelText('focus.csv entfernen');
    expect(removeBtn.className).toContain('focus-visible:ring-2');
    expect(removeBtn.className).toContain('focus-visible:ring-[var(--color-border-focus)]');
  });

  // --- 39. motion-reduce Guards auf Drop-Zone ---
  it('hat motion-reduce Guard auf der Drop-Zone', () => {
    render(<FileUploadZone />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');
    expect(dropzone.className).toContain('motion-reduce:transition-none');
  });

  // --- 40. Touch-Target des Entfernen-Buttons ---
  it('hat min 44x44px Touch-Target auf dem Entfernen-Button', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'touch.csv' }),
    ];

    render(<FileUploadZone files={files} />);
    const removeBtn = screen.getByLabelText('touch.csv entfernen');
    expect(removeBtn.className).toContain('min-h-[var(--sizing-fuzpattern-remove-target)]');
    expect(removeBtn.className).toContain('min-w-[var(--sizing-fuzpattern-remove-target)]');
  });

  // --- 41. Disabled Entfernen-Button hat keinen Hover ---
  it('unterdrueckt hover auf Entfernen-Button bei disabled', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'locked.csv' }),
    ];

    render(<FileUploadZone files={files} disabled />);
    const removeBtn = screen.getByLabelText('locked.csv entfernen');
    expect(removeBtn.className).not.toContain('hover:text-');
    expect(removeBtn.className).toContain('cursor-not-allowed');
  });

  // --- 42. Tokenisierte Preview-Groesse ---
  it('verwendet tokenisierte Groesse fuer Bild-Vorschau', () => {
    const files: FileUploadZoneFile[] = [
      {
        file: createMockFile('sized.png', 4096, 'image/png'),
        id: 'sized-1',
        progress: 100,
        status: 'complete',
        preview: 'blob:http://localhost/preview-sized',
      },
    ];

    render(<FileUploadZone files={files} preview />);
    const img = screen.getByAltText('sized.png');
    expect(img.className).toContain('h-[var(--sizing-fuzpattern-preview-size)]');
    expect(img.className).toContain('w-[var(--sizing-fuzpattern-preview-size)]');
  });

  // --- 43. Tokenisierte Progress-Bar-Hoehe ---
  it('verwendet tokenisierte Hoehe fuer die Progress-Bar', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'progress.csv', status: 'uploading', progress: 50 }),
    ];

    render(<FileUploadZone files={files} />);
    const progressContainer = screen.getByRole('progressbar').parentElement;
    expect(progressContainer?.className).toContain('h-[var(--sizing-fuzpattern-progress-height)]');
  });

  // --- 44. aria-live auf Summary ---
  it('hat aria-live="polite" auf der Zusammenfassung', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'live.csv', size: 512 }),
    ];

    render(<FileUploadZone files={files} />);
    const summary = screen.getByTestId('file-upload-zone-summary');
    expect(summary).toHaveAttribute('aria-live', 'polite');
  });

  // --- 45. aria-busy bei aktiven Uploads ---
  it('setzt aria-busy bei laufenden Uploads', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'busy.csv', status: 'uploading', progress: 30 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone')).toHaveAttribute('aria-busy', 'true');
  });

  // --- 46. Kein aria-busy ohne aktive Uploads ---
  it('setzt kein aria-busy ohne laufende Uploads', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'done.csv', status: 'complete', progress: 100 }),
    ];

    render(<FileUploadZone files={files} />);
    expect(screen.getByTestId('file-upload-zone')).not.toHaveAttribute('aria-busy');
  });

  // --- 47. Drag-Over zeigt visuelles Feedback ---
  it('zeigt drag-over visuelles Feedback', () => {
    render(<FileUploadZone />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');

    fireEvent.dragOver(dropzone, { dataTransfer: { files: [] } });

    expect(dropzone.className).toContain('border-[var(--color-fileupload-drag-border)]');
    expect(dropzone.className).toContain('bg-[var(--color-fileupload-drag-bg)]');
  });

  // --- 48. Drag-Over zeigt "Dateien loslassen..." ---
  it('zeigt "Dateien loslassen..." bei Drag-Over', () => {
    render(<FileUploadZone />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');

    fireEvent.dragOver(dropzone, { dataTransfer: { files: [] } });

    expect(screen.getByText('Dateien loslassen…')).toBeInTheDocument();
  });

  // --- 49. Drag-Leave setzt State zurueck ---
  it('setzt Drag-State bei Drag-Leave zurueck', () => {
    render(<FileUploadZone />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');

    fireEvent.dragOver(dropzone, { dataTransfer: { files: [] } });
    expect(screen.getByText('Dateien loslassen…')).toBeInTheDocument();

    fireEvent.dragLeave(dropzone);
    expect(screen.queryByText('Dateien loslassen…')).not.toBeInTheDocument();
    expect(screen.getByText('Dateien hierher ziehen oder klicken zum Auswählen')).toBeInTheDocument();
  });

  // --- 50. Drop bei disabled wird ignoriert ---
  it('ignoriert Drop bei disabled', () => {
    const onFilesAdd = vi.fn();
    render(<FileUploadZone disabled onFilesAdd={onFilesAdd} />);
    const dropzone = screen.getByTestId('file-upload-zone-dropzone');

    const file = createMockFile('dropped.csv', 1024, 'text/csv');
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });

    expect(onFilesAdd).not.toHaveBeenCalled();
  });

  // --- 51. Tokenisierter Error-Gap ---
  it('verwendet tokenisierten error-gap statt hardcodiertem ml-2', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'err.csv', status: 'error', error: 'Fehler' }),
    ];

    render(<FileUploadZone files={files} />);
    const errorSpan = screen.getByText(/— Fehler/);
    expect(errorSpan.className).toContain('ml-[var(--spacing-fuzpattern-error-gap)]');
  });

  // --- 52. motion-reduce auf File-Items ---
  it('hat motion-reduce Guard auf Datei-Items', () => {
    const files: FileUploadZoneFile[] = [
      createUploadedFile({ name: 'motion.csv' }),
    ];

    render(<FileUploadZone files={files} />);
    const item = screen.getByTestId('file-upload-zone-item-0');
    expect(item.className).toContain('motion-reduce:transition-none');
  });
});
