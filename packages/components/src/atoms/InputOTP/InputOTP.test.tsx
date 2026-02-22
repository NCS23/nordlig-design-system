import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './InputOTP';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

// Hilfsfunktion: Standard-6-Slot OTP rendern
function renderOTP(extraProps: { error?: boolean; className?: string; disabled?: boolean } = {}) {
  return render(
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...extraProps}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

// Hilfsfunktion: OTP mit Gruppen und Separator rendern
function renderOTPWithGroups(extraProps: { error?: boolean; className?: string } = {}) {
  return render(
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...extraProps}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe('InputOTP', () => {
  // Test 1: Korrekte Anzahl von Slots rendern
  it('rendert die richtige Anzahl von Slots (6 Standardmaessig)', () => {
    const { container } = renderOTP();
    // Jeder Slot hat die sizing-Token-Klasse
    const slots = container.querySelectorAll('[class*="h-[var(--sizing-inputotp-slot-size)]"]');
    expect(slots).toHaveLength(6);
  });

  // Test 2: displayName fuer alle Sub-Komponenten
  it('hat korrekten displayName fuer alle Sub-Komponenten', () => {
    expect(InputOTP.displayName).toBe('InputOTP');
    expect(InputOTPGroup.displayName).toBe('InputOTPGroup');
    expect(InputOTPSlot.displayName).toBe('InputOTPSlot');
    expect(InputOTPSeparator.displayName).toBe('InputOTPSeparator');
  });

  // Test 3: Benutzerdefinierte className zusammenfuehren
  it('fuegt benutzerdefinierte className zusammen', () => {
    const { container } = render(
      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} className="meine-klasse">
        <InputOTPGroup className="gruppe-klasse">
          <InputOTPSlot index={0} className="slot-klasse" />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );

    // Gruppe hat benutzerdefinierte Klasse
    const gruppe = container.querySelector('.gruppe-klasse');
    expect(gruppe).toBeInTheDocument();

    // Slot hat benutzerdefinierte Klasse
    const slot = container.querySelector('.slot-klasse');
    expect(slot).toBeInTheDocument();
  });

  // Test 4: Separator zwischen Gruppen rendern
  it('rendert Separator zwischen Gruppen', () => {
    renderOTPWithGroups();
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    // Separator hat Token-Klasse fuer Farbe
    expect(separator.className).toContain('text-[var(--color-inputotp-separator)]');
  });

  // Test 5: Token-Klassen anwenden (border, bg, radius)
  it('wendet Token-Klassen fuer border, bg und radius an', () => {
    const { container } = renderOTP();
    const slot = container.querySelector('[class*="h-[var(--sizing-inputotp-slot-size)]"]');
    expect(slot).toBeTruthy();

    const klassen = slot!.className;
    // Border-Token
    expect(klassen).toContain('border-[var(--color-inputotp-border)]');
    // Hintergrund-Token
    expect(klassen).toContain('bg-[var(--color-inputotp-bg)]');
    // Radius-Token
    expect(klassen).toContain('rounded-[var(--radius-inputotp)]');
    // Text-Token
    expect(klassen).toContain('text-[var(--color-inputotp-text)]');
  });

  // Test 6: Error-Prop wendet Fehlerstil an
  it('wendet error-Styling an wenn error-Prop gesetzt ist', () => {
    const { container } = renderOTP({ error: true });
    // Der Container sollte die has-error Klasse haben
    const otpContainer = container.querySelector('.has-error');
    expect(otpContainer).toBeInTheDocument();
    // Der Container sollte group/otp Klasse haben fuer CSS-Selektoren
    expect(otpContainer!.className).toContain('group/otp');
  });

  // Test 7: Separator leitet ref weiter
  it('Separator leitet ref weiter', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator ref={ref} />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // Test 8: Disabled-Zustand wird angewendet
  it('wendet disabled-Styling an', () => {
    const { container } = renderOTP({ disabled: true });
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
});
