import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionCard, { type SessionData } from './SessionCard';

// Mock session data
const mockSessionData: SessionData = {
  id: '1',
  type: 'running',
  duration: 45,
  distance: 8.5,
  date: new Date('2024-01-15T10:30:00'),
  title: 'Morgenlauf',
  description: 'Entspannter Lauf im Park',
  hrZones: {
    zone1: 10,
    zone2: 15,
    zone3: 12,
    zone4: 6,
    zone5: 2
  },
  metrics: {
    avgHeartRate: 145,
    maxHeartRate: 165,
    calories: 420,
    pace: '5:18/km',
    elevation: 120
  }
};

const mockCompactSessionData: SessionData = {
  id: '2',
  type: 'cycling',
  duration: 90,
  distance: 25.0,
  date: new Date('2024-01-14T16:00:00'),
  metrics: {
    avgHeartRate: 138,
    calories: 680
  }
};

describe('SessionCard', () => {
  it('rendert grundlegende Session-Informationen', () => {
    render(<SessionCard sessionData={mockSessionData} />);
    
    expect(screen.getByText('Morgenlauf')).toBeInTheDocument();
    expect(screen.getByText('45min')).toBeInTheDocument();
    expect(screen.getByText('Entspannter Lauf im Park')).toBeInTheDocument();
    expect(screen.getByText('8.5 km')).toBeInTheDocument();
  });

  it('zeigt Herzfrequenzzonen korrekt an', () => {
    render(<SessionCard sessionData={mockSessionData} />);
    
    expect(screen.getByText('Herzfrequenzzonen')).toBeInTheDocument();
    expect(screen.getByText('Z1')).toBeInTheDocument();
    expect(screen.getByText('Z5')).toBeInTheDocument();
  });

  it('zeigt Metriken im Grid an (max. 4 Werte)', () => {
    render(<SessionCard sessionData={mockSessionData} />);

    expect(screen.getByText('8.5 km')).toBeInTheDocument();
    expect(screen.getByText('5:18/km')).toBeInTheDocument();
    expect(screen.getByText('145 bpm')).toBeInTheDocument();
    expect(screen.getByText('420 kcal')).toBeInTheDocument();
  });

  it('verwendet Session-Typ als Fallback-Titel (deutsch)', () => {
    const sessionWithoutTitle = { ...mockSessionData, title: undefined };
    render(<SessionCard sessionData={sessionWithoutTitle} />);

    expect(screen.getByText('Laufen')).toBeInTheDocument();
  });

  it('formatiert Datum korrekt', () => {
    render(<SessionCard sessionData={mockSessionData} />);
    
    // Überprüfe dass ein deutsches Datumsformat angezeigt wird
    const dateElement = screen.getByText(/Mo.*15.*Jan/i);
    expect(dateElement).toBeInTheDocument();
  });

  it('formatiert Dauer über einer Stunde korrekt', () => {
    render(<SessionCard sessionData={mockCompactSessionData} />);
    
    expect(screen.getByText('1h 30min')).toBeInTheDocument();
  });

  it('ruft onClick-Handler auf', () => {
    const handleClick = vi.fn();
    render(<SessionCard sessionData={mockSessionData} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('unterstützt Tastatur-Navigation', () => {
    const handleClick = vi.fn();
    render(<SessionCard sessionData={mockSessionData} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledOnce();
    
    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('zeigt Loading-State an', () => {
    render(<SessionCard sessionData={mockSessionData} loading={true} />);
    
    const loadingCard = screen.getByRole('generic');
    expect(loadingCard).toHaveClass('animate-pulse');
  });

  it('zeigt Error-State an', () => {
    const errorMessage = 'Verbindung fehlgeschlagen';
    render(<SessionCard sessionData={mockSessionData} error={errorMessage} />);

    expect(screen.getByText('Fehler beim Laden')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('wendet Compact-Variante an', () => {
    render(<SessionCard sessionData={mockSessionData} size="compact" />);

    const card = screen.getByRole('generic');
    expect(card).toHaveClass('p-6');
  });

  it('wendet Interactive-State bei onClick an', () => {
    const handleClick = vi.fn();
    render(<SessionCard sessionData={mockSessionData} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('handhabt Session ohne optionale Daten', () => {
    const minimalSession: SessionData = {
      id: '3',
      type: 'other',
      duration: 30,
      date: new Date()
    };

    render(<SessionCard sessionData={minimalSession} />);

    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('30min')).toBeInTheDocument();
    expect(screen.queryByText('Herzfrequenzzonen')).not.toBeInTheDocument();
  });

  it('zeigt korrekte deutsche Session-Labels an', () => {
    const sessions: { type: SessionData['type']; label: string }[] = [
      { type: 'running', label: 'Laufen' },
      { type: 'cycling', label: 'Radfahren' },
      { type: 'swimming', label: 'Schwimmen' },
      { type: 'strength', label: 'Krafttraining' }
    ];

    sessions.forEach((session) => {
      const data = { ...mockSessionData, type: session.type, title: undefined };
      const { unmount } = render(<SessionCard sessionData={data} />);
      expect(screen.getByText(session.label)).toBeInTheDocument();
      unmount();
    });
  });

  it('unterstützt Custom className', () => {
    render(<SessionCard sessionData={mockSessionData} className="custom-class" />);
    
    const card = screen.getByRole('generic');
    expect(card).toHaveClass('custom-class');
  });

  it('leitet HTML-Attribute weiter', () => {
    render(<SessionCard sessionData={mockSessionData} data-testid="session-card" />);
    
    expect(screen.getByTestId('session-card')).toBeInTheDocument();
  });

  it('setzt aria-label für interaktive Cards', () => {
    const handleClick = vi.fn();
    render(<SessionCard sessionData={mockSessionData} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('Morgenlauf'));
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('öffnen'));
  });
});