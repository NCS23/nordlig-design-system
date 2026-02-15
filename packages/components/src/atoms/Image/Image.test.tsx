import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Image } from './Image';

describe('Image', () => {
  // 1. Rendert img-Element mit src und alt
  it('rendert img-Element mit src und alt', () => {
    render(<Image src="https://example.com/photo.jpg" alt="Testbild" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Testbild');
  });

  // 2. Wendet CVA rounded-Variante 'lg' an
  it('wendet CVA rounded-Variante lg an', () => {
    render(<Image src="test.jpg" alt="test" rounded="lg" />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper.className).toContain('radius-img-lg');
  });

  // 3. Wendet CVA objectFit-Variante 'contain' an
  it('wendet CVA objectFit-Variante contain an', () => {
    render(<Image src="test.jpg" alt="test" objectFit="contain" />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper.className).toContain('object-contain');
  });

  // 4. Zeigt Lade-Hintergrund (wrapper hat color-img-bg Klasse)
  it('zeigt Lade-Hintergrund', () => {
    render(<Image src="test.jpg" alt="test" />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper.className).toContain('color-img-bg');
  });

  // 5. Setzt data-loading Attribut waehrend des Ladens
  it('setzt data-loading Attribut waehrend des Ladens', () => {
    render(<Image src="test.jpg" alt="test" />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper).toHaveAttribute('data-loading');
  });

  // 6. Entfernt data-loading nach erfolgreichem Laden
  it('entfernt data-loading nach erfolgreichem Laden', () => {
    render(<Image src="test.jpg" alt="test" />);
    const img = screen.getByRole('img');
    fireEvent.load(img);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper).not.toHaveAttribute('data-loading');
  });

  // 7. Zeigt Standard-Fallback bei Fehler
  it('zeigt Standard-Fallback bei Fehler', () => {
    render(<Image src="broken.jpg" alt="test" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByTestId('image-fallback')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  // 8. Zeigt benutzerdefinierten Fallback bei Fehler
  it('zeigt benutzerdefinierten Fallback bei Fehler', () => {
    render(
      <Image
        src="broken.jpg"
        alt="test"
        fallback={<span data-testid="custom-fallback">Fehler</span>}
      />
    );
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Fehler')).toBeInTheDocument();
  });

  // 9. Wendet aspectRatio-Style an
  it('wendet aspectRatio-Style an', () => {
    render(<Image src="test.jpg" alt="test" aspectRatio={16 / 9} />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper.style.aspectRatio).toBe(String(16 / 9));
  });

  // 10. Leitet ref weiter (zum Wrapper-div-Element)
  it('leitet ref weiter (zum Wrapper)', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Image ref={ref} src="test.jpg" alt="test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute('data-testid')).toBe('image-wrapper');
  });

  // 11. Wendet benutzerdefinierte className an (auf Wrapper)
  it('wendet benutzerdefinierte className an', () => {
    render(<Image src="test.jpg" alt="test" className="meine-klasse" />);
    const wrapper = screen.getByTestId('image-wrapper');
    expect(wrapper.className).toContain('meine-klasse');
  });

  // 12. Ruft onError-Callback bei Fehler auf
  it('ruft onError-Callback bei Fehler auf', () => {
    const onError = vi.fn();
    render(<Image src="broken.jpg" alt="test" onError={onError} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  // 13. Hat korrekten displayName
  it('hat korrekten displayName', () => {
    expect(Image.displayName).toBe('Image');
  });
});
