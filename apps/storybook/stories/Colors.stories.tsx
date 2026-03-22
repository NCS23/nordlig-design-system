import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

type ColorToken = {
  name: string;
  value: string;
  cssVar: string;
  chain?: string;
};

const ColorSwatch = ({ name, value, cssVar, chain }: ColorToken) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        backgroundColor: value,
        border: '1px solid #e2e8f0',
        flexShrink: 0,
      }}
    />
    <div style={{ minWidth: 0 }}>
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{cssVar}</div>
      {chain && (
        <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.4 }}>{chain}</div>
      )}
      <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>{value}</div>
    </div>
  </div>
);

/** Alle Palette-CSS-Variablennamen (explizit für vollständige Dokumentation) */
const paletteCssVars: Record<string, string[]> = {
  '--color-base-slate': ['--color-base-slate-50', '--color-base-slate-100', '--color-base-slate-200', '--color-base-slate-300', '--color-base-slate-400', '--color-base-slate-500', '--color-base-slate-600', '--color-base-slate-700', '--color-base-slate-800', '--color-base-slate-900', '--color-base-slate-950'],
  '--color-base-stone': ['--color-base-stone-50', '--color-base-stone-100', '--color-base-stone-200', '--color-base-stone-300', '--color-base-stone-400', '--color-base-stone-500', '--color-base-stone-600', '--color-base-stone-700', '--color-base-stone-800', '--color-base-stone-900', '--color-base-stone-950'],
  '--color-base-zinc': ['--color-base-zinc-50', '--color-base-zinc-100', '--color-base-zinc-200', '--color-base-zinc-300', '--color-base-zinc-400', '--color-base-zinc-500', '--color-base-zinc-600', '--color-base-zinc-700', '--color-base-zinc-800', '--color-base-zinc-900', '--color-base-zinc-950'],
  '--color-base-sky': ['--color-base-sky-50', '--color-base-sky-100', '--color-base-sky-200', '--color-base-sky-300', '--color-base-sky-400', '--color-base-sky-500', '--color-base-sky-600', '--color-base-sky-700', '--color-base-sky-800', '--color-base-sky-900', '--color-base-sky-950'],
  '--color-base-cyan': ['--color-base-cyan-50', '--color-base-cyan-100', '--color-base-cyan-200', '--color-base-cyan-300', '--color-base-cyan-400', '--color-base-cyan-500', '--color-base-cyan-600', '--color-base-cyan-700', '--color-base-cyan-800', '--color-base-cyan-900', '--color-base-cyan-950'],
  '--color-base-teal': ['--color-base-teal-50', '--color-base-teal-100', '--color-base-teal-200', '--color-base-teal-300', '--color-base-teal-400', '--color-base-teal-500', '--color-base-teal-600', '--color-base-teal-700', '--color-base-teal-800', '--color-base-teal-900', '--color-base-teal-950'],
  '--color-base-indigo': ['--color-base-indigo-50', '--color-base-indigo-100', '--color-base-indigo-200', '--color-base-indigo-300', '--color-base-indigo-400', '--color-base-indigo-500', '--color-base-indigo-600', '--color-base-indigo-700', '--color-base-indigo-800', '--color-base-indigo-900', '--color-base-indigo-950'],
  '--color-base-blue': ['--color-base-blue-50', '--color-base-blue-100', '--color-base-blue-200', '--color-base-blue-300', '--color-base-blue-400', '--color-base-blue-500', '--color-base-blue-600', '--color-base-blue-700', '--color-base-blue-800', '--color-base-blue-900', '--color-base-blue-950'],
  '--color-base-emerald': ['--color-base-emerald-50', '--color-base-emerald-100', '--color-base-emerald-200', '--color-base-emerald-300', '--color-base-emerald-400', '--color-base-emerald-500', '--color-base-emerald-600', '--color-base-emerald-700', '--color-base-emerald-800', '--color-base-emerald-900', '--color-base-emerald-950'],
  '--color-base-amber': ['--color-base-amber-50', '--color-base-amber-100', '--color-base-amber-200', '--color-base-amber-300', '--color-base-amber-400', '--color-base-amber-500', '--color-base-amber-600', '--color-base-amber-700', '--color-base-amber-800', '--color-base-amber-900', '--color-base-amber-950'],
  '--color-base-red': ['--color-base-red-50', '--color-base-red-100', '--color-base-red-200', '--color-base-red-300', '--color-base-red-400', '--color-base-red-500', '--color-base-red-600', '--color-base-red-700', '--color-base-red-800', '--color-base-red-900', '--color-base-red-950'],
  '--color-base-yellow': ['--color-base-yellow-50', '--color-base-yellow-100', '--color-base-yellow-200', '--color-base-yellow-300', '--color-base-yellow-400', '--color-base-yellow-500', '--color-base-yellow-600', '--color-base-yellow-700', '--color-base-yellow-800', '--color-base-yellow-900', '--color-base-yellow-950'],
  '--color-base-green': ['--color-base-green-50', '--color-base-green-100', '--color-base-green-200', '--color-base-green-300', '--color-base-green-400', '--color-base-green-500', '--color-base-green-600', '--color-base-green-700', '--color-base-green-800', '--color-base-green-900', '--color-base-green-950'],
  '--color-primary-1': ['--color-primary-1-50', '--color-primary-1-100', '--color-primary-1-200', '--color-primary-1-300', '--color-primary-1-400', '--color-primary-1-500', '--color-primary-1-600', '--color-primary-1-700', '--color-primary-1-800', '--color-primary-1-900', '--color-primary-1-950'],
  '--color-primary-2': ['--color-primary-2-50', '--color-primary-2-100', '--color-primary-2-200', '--color-primary-2-300', '--color-primary-2-400', '--color-primary-2-500', '--color-primary-2-600', '--color-primary-2-700', '--color-primary-2-800', '--color-primary-2-900', '--color-primary-2-950'],
  '--color-secondary-1': ['--color-secondary-1-50', '--color-secondary-1-100', '--color-secondary-1-200', '--color-secondary-1-300', '--color-secondary-1-400', '--color-secondary-1-500', '--color-secondary-1-600', '--color-secondary-1-700', '--color-secondary-1-800', '--color-secondary-1-900', '--color-secondary-1-950'],
  '--color-secondary-2': ['--color-secondary-2-50', '--color-secondary-2-100', '--color-secondary-2-200', '--color-secondary-2-300', '--color-secondary-2-400', '--color-secondary-2-500', '--color-secondary-2-600', '--color-secondary-2-700', '--color-secondary-2-800', '--color-secondary-2-900', '--color-secondary-2-950'],
  '--color-accent-1': ['--color-accent-1-50', '--color-accent-1-100', '--color-accent-1-200', '--color-accent-1-300', '--color-accent-1-400', '--color-accent-1-500', '--color-accent-1-600', '--color-accent-1-700', '--color-accent-1-800', '--color-accent-1-900', '--color-accent-1-950'],
  '--color-accent-2': ['--color-accent-2-50', '--color-accent-2-100', '--color-accent-2-200', '--color-accent-2-300', '--color-accent-2-400', '--color-accent-2-500', '--color-accent-2-600', '--color-accent-2-700', '--color-accent-2-800', '--color-accent-2-900', '--color-accent-2-950'],
  '--color-accent-3': ['--color-accent-3-50', '--color-accent-3-100', '--color-accent-3-200', '--color-accent-3-300', '--color-accent-3-400', '--color-accent-3-500', '--color-accent-3-600', '--color-accent-3-700', '--color-accent-3-800', '--color-accent-3-900', '--color-accent-3-950'],
  '--color-accent-4': ['--color-accent-4-50', '--color-accent-4-100', '--color-accent-4-200', '--color-accent-4-300', '--color-accent-4-400', '--color-accent-4-500', '--color-accent-4-600', '--color-accent-4-700', '--color-accent-4-800', '--color-accent-4-900', '--color-accent-4-950'],
  '--color-accent-5': ['--color-accent-5-50', '--color-accent-5-100', '--color-accent-5-200', '--color-accent-5-300', '--color-accent-5-400', '--color-accent-5-500', '--color-accent-5-600', '--color-accent-5-700', '--color-accent-5-800', '--color-accent-5-900', '--color-accent-5-950'],
  '--color-neutral-1': ['--color-neutral-1-0', '--color-neutral-1-50', '--color-neutral-1-100', '--color-neutral-1-200', '--color-neutral-1-300', '--color-neutral-1-400', '--color-neutral-1-500', '--color-neutral-1-600', '--color-neutral-1-700', '--color-neutral-1-800', '--color-neutral-1-900', '--color-neutral-1-950', '--color-neutral-1-1000'],
  '--color-neutral-2': ['--color-neutral-2-50', '--color-neutral-2-100', '--color-neutral-2-200', '--color-neutral-2-300', '--color-neutral-2-400', '--color-neutral-2-500', '--color-neutral-2-600', '--color-neutral-2-700', '--color-neutral-2-800', '--color-neutral-2-900', '--color-neutral-2-950'],
};

const PaletteRow = ({ palette, shades, cssVarPrefix }: { palette: string; shades: { shade: string; value: string }[]; cssVarPrefix: string }) => {
  const vars = paletteCssVars[cssVarPrefix];
  return (
    <div style={{ marginBottom: '24px' }}>
      <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#334155', textTransform: 'capitalize' }}>{palette}</h4>
      <div style={{ display: 'flex', gap: '2px', borderRadius: '8px', overflow: 'hidden' }}>
        {shades.map(({ shade, value }, i) => (
          <div
            key={shade}
            style={{
              flex: 1,
              height: '64px',
              backgroundColor: value,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '4px',
            }}
            title={`${vars[i]}: ${value}`}
          >
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: parseInt(shade) >= 500 ? '#fff' : '#1e293b' }}>{shade}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '4px', fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6 }}>
        {vars.join(' · ')}
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>{title}</h3>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>{title}</h4>
    {children}
  </div>
);

const TokenGrid = ({ tokens }: { tokens: ColorToken[] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
    {tokens.map((c) => <ColorSwatch key={c.cssVar} {...c} />)}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 1: BASE PALETTES
   ═══════════════════════════════════════════════════════════════════════════ */

const basePalettes: Record<string, { shade: string; value: string }[]> = {
  sky: [
    { shade: '50', value: '#f0f9ff' }, { shade: '100', value: '#e0f2fe' }, { shade: '200', value: '#bae6fd' },
    { shade: '300', value: '#7dd3fc' }, { shade: '400', value: '#38bdf8' }, { shade: '500', value: '#0ea5e9' },
    { shade: '600', value: '#0284c7' }, { shade: '700', value: '#0369a1' }, { shade: '800', value: '#075985' },
    { shade: '900', value: '#0c4a6e' }, { shade: '950', value: '#082f49' },
  ],
  indigo: [
    { shade: '50', value: '#eef2ff' }, { shade: '100', value: '#e0e7ff' }, { shade: '200', value: '#c7d2fe' },
    { shade: '300', value: '#a5b4fc' }, { shade: '400', value: '#818cf8' }, { shade: '500', value: '#6366f1' },
    { shade: '600', value: '#4f46e5' }, { shade: '700', value: '#4338ca' }, { shade: '800', value: '#3730a3' },
    { shade: '900', value: '#312e81' }, { shade: '950', value: '#1e1b4b' },
  ],
  slate: [
    { shade: '50', value: '#f8fafc' }, { shade: '100', value: '#f1f5f9' }, { shade: '200', value: '#e2e8f0' },
    { shade: '300', value: '#cbd5e1' }, { shade: '400', value: '#94a3b8' }, { shade: '500', value: '#64748b' },
    { shade: '600', value: '#475569' }, { shade: '700', value: '#334155' }, { shade: '800', value: '#1e293b' },
    { shade: '900', value: '#0f172a' }, { shade: '950', value: '#020617' },
  ],
  stone: [
    { shade: '50', value: '#fafaf9' }, { shade: '100', value: '#f5f5f4' }, { shade: '200', value: '#e7e5e4' },
    { shade: '300', value: '#d6d3d1' }, { shade: '400', value: '#a8a29e' }, { shade: '500', value: '#78716c' },
    { shade: '600', value: '#57534e' }, { shade: '700', value: '#44403c' }, { shade: '800', value: '#292524' },
    { shade: '900', value: '#1c1917' }, { shade: '950', value: '#0c0a09' },
  ],
  zinc: [
    { shade: '50', value: '#fafafa' }, { shade: '100', value: '#f4f4f5' }, { shade: '200', value: '#e4e4e7' },
    { shade: '300', value: '#d4d4d8' }, { shade: '400', value: '#a1a1aa' }, { shade: '500', value: '#71717a' },
    { shade: '600', value: '#52525b' }, { shade: '700', value: '#3f3f46' }, { shade: '800', value: '#27272a' },
    { shade: '900', value: '#18181b' }, { shade: '950', value: '#09090b' },
  ],
  emerald: [
    { shade: '50', value: '#ecfdf5' }, { shade: '100', value: '#d1fae5' }, { shade: '200', value: '#a7f3d0' },
    { shade: '300', value: '#6ee7b7' }, { shade: '400', value: '#34d399' }, { shade: '500', value: '#10b981' },
    { shade: '600', value: '#059669' }, { shade: '700', value: '#047857' }, { shade: '800', value: '#065f46' },
    { shade: '900', value: '#064e3b' }, { shade: '950', value: '#022c22' },
  ],
  amber: [
    { shade: '50', value: '#fffbeb' }, { shade: '100', value: '#fef3c7' }, { shade: '200', value: '#fde68a' },
    { shade: '300', value: '#fcd34d' }, { shade: '400', value: '#fbbf24' }, { shade: '500', value: '#f59e0b' },
    { shade: '600', value: '#d97706' }, { shade: '700', value: '#b45309' }, { shade: '800', value: '#92400e' },
    { shade: '900', value: '#78350f' }, { shade: '950', value: '#451a03' },
  ],
  red: [
    { shade: '50', value: '#fef2f2' }, { shade: '100', value: '#fee2e2' }, { shade: '200', value: '#fecaca' },
    { shade: '300', value: '#fca5a5' }, { shade: '400', value: '#f87171' }, { shade: '500', value: '#ef4444' },
    { shade: '600', value: '#dc2626' }, { shade: '700', value: '#b91c1c' }, { shade: '800', value: '#991b1b' },
    { shade: '900', value: '#7f1d1d' }, { shade: '950', value: '#450a0a' },
  ],
  blue: [
    { shade: '50', value: '#eff6ff' }, { shade: '100', value: '#dbeafe' }, { shade: '200', value: '#bfdbfe' },
    { shade: '300', value: '#93c5fd' }, { shade: '400', value: '#60a5fa' }, { shade: '500', value: '#3b82f6' },
    { shade: '600', value: '#2563eb' }, { shade: '700', value: '#1d4ed8' }, { shade: '800', value: '#1e40af' },
    { shade: '900', value: '#1e3a8a' }, { shade: '950', value: '#172554' },
  ],
  teal: [
    { shade: '50', value: '#f0fdfa' }, { shade: '100', value: '#ccfbf1' }, { shade: '200', value: '#99f6e4' },
    { shade: '300', value: '#5eead4' }, { shade: '400', value: '#2dd4bf' }, { shade: '500', value: '#14b8a6' },
    { shade: '600', value: '#0d9488' }, { shade: '700', value: '#0f766e' }, { shade: '800', value: '#115e59' },
    { shade: '900', value: '#134e4a' }, { shade: '950', value: '#042f2e' },
  ],
  cyan: [
    { shade: '50', value: '#ecfeff' }, { shade: '100', value: '#cffafe' }, { shade: '200', value: '#a5f3fc' },
    { shade: '300', value: '#67e8f9' }, { shade: '400', value: '#22d3ee' }, { shade: '500', value: '#06b6d4' },
    { shade: '600', value: '#0891b2' }, { shade: '700', value: '#0e7490' }, { shade: '800', value: '#155e75' },
    { shade: '900', value: '#164e63' }, { shade: '950', value: '#083344' },
  ],
  green: [
    { shade: '50', value: '#f0fdf4' }, { shade: '100', value: '#dcfce7' }, { shade: '200', value: '#bbf7d0' },
    { shade: '300', value: '#86efac' }, { shade: '400', value: '#4ade80' }, { shade: '500', value: '#22c55e' },
    { shade: '600', value: '#16a34a' }, { shade: '700', value: '#15803d' }, { shade: '800', value: '#166534' },
    { shade: '900', value: '#14532d' }, { shade: '950', value: '#052e16' },
  ],
  yellow: [
    { shade: '50', value: '#fefce8' }, { shade: '100', value: '#fef9c3' }, { shade: '200', value: '#fef08a' },
    { shade: '300', value: '#fde047' }, { shade: '400', value: '#facc15' }, { shade: '500', value: '#eab308' },
    { shade: '600', value: '#ca8a04' }, { shade: '700', value: '#a16207' }, { shade: '800', value: '#854d0e' },
    { shade: '900', value: '#713f12' }, { shade: '950', value: '#422006' },
  ],
};

/** Neutral-1 Palette erweitert um Shade 0 (white) und 1000 (black) */
const neutral1Extended = [
  { shade: '0', value: '#ffffff' },
  ...basePalettes.slate,
  { shade: '1000', value: '#000000' },
];

const baseUtilityColors: ColorToken[] = [
  { name: 'white', value: '#ffffff', cssVar: '--color-base-white' },
  { name: 'black', value: '#000000', cssVar: '--color-base-black' },
  { name: 'overlay', value: 'rgba(0, 0, 0, 0.5)', cssVar: '--color-base-overlay' },
];

const neutralUtilityColors: ColorToken[] = [
  { name: 'neutral-overlay', value: 'rgba(0, 0, 0, 0.5)', cssVar: '--color-neutral-overlay', chain: '← base.overlay' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 3: ROLE TOKENS (komplett)
   ═══════════════════════════════════════════════════════════════════════════ */

const roleBgColors: ColorToken[] = [
  { name: 'bg-paper', value: '#ffffff', cssVar: '--color-bg-paper', chain: '← neutral-1.0 ← base.white' },
  { name: 'bg-base', value: '#f8fafc', cssVar: '--color-bg-base', chain: '← neutral-1.50 ← base.slate.50' },
  { name: 'bg-surface', value: '#f1f5f9', cssVar: '--color-bg-surface', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'bg-elevated', value: '#f8fafc', cssVar: '--color-bg-elevated', chain: '← neutral-1.50 ← base.slate.50' },
  { name: 'bg-primary', value: '#0ea5e9', cssVar: '--color-bg-primary', chain: '← primary-1.500 ← base.sky.500' },
  { name: 'bg-primary-hover', value: '#0284c7', cssVar: '--color-bg-primary-hover', chain: '← primary-1.600 ← base.sky.600' },
  { name: 'bg-primary-active', value: '#0369a1', cssVar: '--color-bg-primary-active', chain: '← primary-1.700 ← base.sky.700' },
  { name: 'bg-secondary', value: '#64748b', cssVar: '--color-bg-secondary', chain: '← secondary-1.500 ← base.slate.500' },
  { name: 'bg-secondary-hover', value: '#475569', cssVar: '--color-bg-secondary-hover', chain: '← secondary-1.600 ← base.slate.600' },
  { name: 'bg-success-subtle', value: '#ecfdf5', cssVar: '--color-bg-success-subtle', chain: '← accent-1.50 ← base.emerald.50' },
  { name: 'bg-success', value: '#d1fae5', cssVar: '--color-bg-success', chain: '← accent-1.100 ← base.emerald.100' },
  { name: 'bg-success-solid', value: '#10b981', cssVar: '--color-bg-success-solid', chain: '← accent-1.500 ← base.emerald.500' },
  { name: 'bg-warning-subtle', value: '#fffbeb', cssVar: '--color-bg-warning-subtle', chain: '← accent-2.50 ← base.amber.50' },
  { name: 'bg-warning', value: '#fef3c7', cssVar: '--color-bg-warning', chain: '← accent-2.100 ← base.amber.100' },
  { name: 'bg-warning-solid', value: '#f59e0b', cssVar: '--color-bg-warning-solid', chain: '← accent-2.500 ← base.amber.500' },
  { name: 'bg-error-subtle', value: '#fef2f2', cssVar: '--color-bg-error-subtle', chain: '← accent-3.50 ← base.red.50' },
  { name: 'bg-error', value: '#fee2e2', cssVar: '--color-bg-error', chain: '← accent-3.100 ← base.red.100' },
  { name: 'bg-error-solid', value: '#ef4444', cssVar: '--color-bg-error-solid', chain: '← accent-3.500 ← base.red.500' },
  { name: 'bg-info-subtle', value: '#eff6ff', cssVar: '--color-bg-info-subtle', chain: '← accent-4.50 ← base.blue.50' },
  { name: 'bg-info', value: '#dbeafe', cssVar: '--color-bg-info', chain: '← accent-4.100 ← base.blue.100' },
  { name: 'bg-info-solid', value: '#3b82f6', cssVar: '--color-bg-info-solid', chain: '← accent-4.500 ← base.blue.500' },
  { name: 'bg-overlay', value: 'rgba(0,0,0,0.5)', cssVar: '--color-bg-overlay', chain: '← neutral.overlay' },
];

const roleTextColors: ColorToken[] = [
  { name: 'text-base', value: '#0f172a', cssVar: '--color-text-base', chain: '← neutral-1.900 ← base.slate.900' },
  { name: 'text-muted', value: '#475569', cssVar: '--color-text-muted', chain: '← neutral-1.600 ← base.slate.600' },
  { name: 'text-disabled', value: '#94a3b8', cssVar: '--color-text-disabled', chain: '← neutral-1.400 ← base.slate.400' },
  { name: 'text-inverse', value: '#f8fafc', cssVar: '--color-text-inverse', chain: '← neutral-1.50 ← base.slate.50' },
  { name: 'text-on-primary', value: '#ffffff', cssVar: '--color-text-on-primary', chain: '← neutral-1.0 ← base.white' },
  { name: 'text-primary', value: '#0284c7', cssVar: '--color-text-primary', chain: '← primary-1.600 ← base.sky.600' },
  { name: 'text-success', value: '#047857', cssVar: '--color-text-success', chain: '← accent-1.700 ← base.emerald.700' },
  { name: 'text-warning', value: '#b45309', cssVar: '--color-text-warning', chain: '← accent-2.700 ← base.amber.700' },
  { name: 'text-error', value: '#b91c1c', cssVar: '--color-text-error', chain: '← accent-3.700 ← base.red.700' },
  { name: 'text-info', value: '#1d4ed8', cssVar: '--color-text-info', chain: '← accent-4.700 ← base.blue.700' },
];

const roleBorderColors: ColorToken[] = [
  { name: 'border-default', value: '#cbd5e1', cssVar: '--color-border-default', chain: '← neutral-1.300 ← base.slate.300' },
  { name: 'border-muted', value: '#e2e8f0', cssVar: '--color-border-muted', chain: '← neutral-1.200 ← base.slate.200' },
  { name: 'border-strong', value: '#94a3b8', cssVar: '--color-border-strong', chain: '← neutral-1.400 ← base.slate.400' },
  { name: 'border-focus', value: '#0ea5e9', cssVar: '--color-border-focus', chain: '← primary-1.500 ← base.sky.500' },
  { name: 'border-success', value: '#10b981', cssVar: '--color-border-success', chain: '← accent-1.500 ← base.emerald.500' },
  { name: 'border-warning', value: '#f59e0b', cssVar: '--color-border-warning', chain: '← accent-2.500 ← base.amber.500' },
  { name: 'border-error', value: '#ef4444', cssVar: '--color-border-error', chain: '← accent-3.500 ← base.red.500' },
  { name: 'border-info', value: '#3b82f6', cssVar: '--color-border-info', chain: '← accent-4.500 ← base.blue.500' },
];

const roleInteractiveColors: ColorToken[] = [
  { name: 'interactive-primary', value: '#0ea5e9', cssVar: '--color-interactive-primary', chain: '← primary-1.500 ← base.sky.500' },
  { name: 'interactive-primary-hover', value: '#0284c7', cssVar: '--color-interactive-primary-hover', chain: '← primary-1.600 ← base.sky.600' },
  { name: 'interactive-primary-active', value: '#0369a1', cssVar: '--color-interactive-primary-active', chain: '← primary-1.700 ← base.sky.700' },
  { name: 'interactive-primary-disabled', value: '#cbd5e1', cssVar: '--color-interactive-primary-disabled', chain: '← neutral-1.300 ← base.slate.300' },
  { name: 'interactive-secondary', value: '#64748b', cssVar: '--color-interactive-secondary', chain: '← secondary-1.500 ← base.slate.500' },
  { name: 'interactive-secondary-hover', value: '#475569', cssVar: '--color-interactive-secondary-hover', chain: '← secondary-1.600 ← base.slate.600' },
  { name: 'interactive-secondary-active', value: '#334155', cssVar: '--color-interactive-secondary-active', chain: '← secondary-1.700 ← base.slate.700' },
];

/* Semantic Status Colors — consolidated into bg/text/border groups (NDS-033) */

/* ═══════════════════════════════════════════════════════════════════════════
   LEVEL 4: COMPONENT TOKENS (komplett mit Referenzketten)
   ═══════════════════════════════════════════════════════════════════════════ */

const buttonColors: ColorToken[] = [
  { name: 'btn-primary-bg', value: '#0ea5e9', cssVar: '--color-btn-primary-bg', chain: '← bg.primary ← primary-1.500' },
  { name: 'btn-primary-bg-hover', value: '#0284c7', cssVar: '--color-btn-primary-bg-hover', chain: '← bg.primary-hover ← primary-1.600' },
  { name: 'btn-primary-bg-active', value: '#0369a1', cssVar: '--color-btn-primary-bg-active', chain: '← bg.primary-active ← primary-1.700' },
  { name: 'btn-primary-text', value: '#f8fafc', cssVar: '--color-btn-primary-text', chain: '← text.inverse ← neutral-1.50' },
  { name: 'btn-primary-border', value: '#0ea5e9', cssVar: '--color-btn-primary-border', chain: '← bg.primary ← primary-1.500' },
  { name: 'btn-secondary-bg', value: '#f1f5f9', cssVar: '--color-btn-secondary-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'btn-secondary-bg-hover', value: '#e2e8f0', cssVar: '--color-btn-secondary-bg-hover', chain: '← neutral-1.200 ← base.slate.200' },
  { name: 'btn-secondary-bg-active', value: '#cbd5e1', cssVar: '--color-btn-secondary-bg-active', chain: '← neutral-1.300 ← base.slate.300' },
  { name: 'btn-secondary-text', value: '#0f172a', cssVar: '--color-btn-secondary-text', chain: '← text.base ← neutral-1.900' },
  { name: 'btn-secondary-border', value: '#cbd5e1', cssVar: '--color-btn-secondary-border', chain: '← border.default ← neutral-1.300' },
  { name: 'btn-ghost-text', value: '#0284c7', cssVar: '--color-btn-ghost-text', chain: '← text.primary ← primary-1.600' },
  { name: 'btn-ghost-bg-hover', value: '#f1f5f9', cssVar: '--color-btn-ghost-bg-hover', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'btn-ghost-bg-active', value: '#e2e8f0', cssVar: '--color-btn-ghost-bg-active', chain: '← neutral-1.200 ← base.slate.200' },
  { name: 'btn-disabled-bg', value: '#cbd5e1', cssVar: '--color-btn-disabled-bg', chain: '← interactive.primary-disabled ← neutral-1.300' },
  { name: 'btn-disabled-text', value: '#94a3b8', cssVar: '--color-btn-disabled-text', chain: '← text.disabled ← neutral-1.400' },
];

const badgeColors: ColorToken[] = [
  { name: 'badge-success-bg', value: '#d1fae5', cssVar: '--color-badge-success-bg', chain: '← bg.success ← accent-1.100' },
  { name: 'badge-success-text', value: '#047857', cssVar: '--color-badge-success-text', chain: '← text.success ← accent-1.700' },
  { name: 'badge-success-border', value: '#10b981', cssVar: '--color-badge-success-border', chain: '← border.success ← accent-1.500' },
  { name: 'badge-warning-bg', value: '#fef3c7', cssVar: '--color-badge-warning-bg', chain: '← bg.warning ← accent-2.100' },
  { name: 'badge-warning-text', value: '#b45309', cssVar: '--color-badge-warning-text', chain: '← text.warning ← accent-2.700' },
  { name: 'badge-warning-border', value: '#f59e0b', cssVar: '--color-badge-warning-border', chain: '← border.warning ← accent-2.500' },
  { name: 'badge-error-bg', value: '#fee2e2', cssVar: '--color-badge-error-bg', chain: '← bg.error ← accent-3.100' },
  { name: 'badge-error-text', value: '#b91c1c', cssVar: '--color-badge-error-text', chain: '← text.error ← accent-3.700' },
  { name: 'badge-error-border', value: '#ef4444', cssVar: '--color-badge-error-border', chain: '← border.error ← accent-3.500' },
  { name: 'badge-info-bg', value: '#dbeafe', cssVar: '--color-badge-info-bg', chain: '← bg.info ← accent-4.100' },
  { name: 'badge-info-text', value: '#1d4ed8', cssVar: '--color-badge-info-text', chain: '← text.info ← accent-4.700' },
  { name: 'badge-info-border', value: '#3b82f6', cssVar: '--color-badge-info-border', chain: '← border.info ← accent-4.500' },
  { name: 'badge-neutral-bg', value: '#f1f5f9', cssVar: '--color-badge-neutral-bg', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'badge-neutral-text', value: '#475569', cssVar: '--color-badge-neutral-text', chain: '← text.muted ← neutral-1.600' },
  { name: 'badge-neutral-border', value: '#e2e8f0', cssVar: '--color-badge-neutral-border', chain: '← border.muted ← neutral-1.200' },
];

const cardColors: ColorToken[] = [
  { name: 'card-bg', value: '#ffffff', cssVar: '--color-card-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'card-border', value: '#e2e8f0', cssVar: '--color-card-border', chain: '← border.muted ← neutral-1.200' },
];

const sessionCardColors: ColorToken[] = [
  { name: 'session-card-bg', value: '#ffffff', cssVar: '--color-session-card-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'session-card-border', value: '#e2e8f0', cssVar: '--color-session-card-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'session-card-border-hover', value: '#cbd5e1', cssVar: '--color-session-card-border-hover', chain: '← border.default ← neutral-1.300' },
  { name: 'session-card-bg-hover', value: '#f1f5f9', cssVar: '--color-session-card-bg-hover', chain: '← bg.surface ← neutral-1.100' },
  { name: 'session-card-bg-error', value: '#fef2f2', cssVar: '--color-session-card-bg-error', chain: '← bg.error-subtle ← accent-3.50' },
  { name: 'session-card-border-error', value: '#ef4444', cssVar: '--color-session-card-border-error', chain: '← border.error ← accent-3.500' },
  { name: 'session-card-text-primary', value: '#0f172a', cssVar: '--color-session-card-text-primary', chain: '← text.base ← neutral-1.900' },
  { name: 'session-card-text-secondary', value: '#475569', cssVar: '--color-session-card-text-secondary', chain: '← text.muted ← neutral-1.600' },
  { name: 'session-card-text-tertiary', value: '#94a3b8', cssVar: '--color-session-card-text-tertiary', chain: '← text.disabled ← neutral-1.400' },
  { name: 'session-card-text-error', value: '#b91c1c', cssVar: '--color-session-card-text-error', chain: '← text.error ← accent-3.700' },
  { name: 'session-card-skeleton', value: '#f1f5f9', cssVar: '--color-session-card-skeleton', chain: '← bg.surface ← neutral-1.100' },
  { name: 'session-card-zone-bg', value: '#f1f5f9', cssVar: '--color-session-card-zone-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'session-card-zone-1', value: '#94a3b8', cssVar: '--color-session-card-zone-1', chain: '← border.strong ← neutral-1.400' },
  { name: 'session-card-zone-2', value: '#10b981', cssVar: '--color-session-card-zone-2', chain: '← border.success ← accent-1.500' },
  { name: 'session-card-zone-3', value: '#f59e0b', cssVar: '--color-session-card-zone-3', chain: '← border.warning ← accent-2.500' },
  { name: 'session-card-zone-4', value: '#b45309', cssVar: '--color-session-card-zone-4', chain: '← text.warning ← accent-2.700' },
  { name: 'session-card-zone-5', value: '#ef4444', cssVar: '--color-session-card-zone-5', chain: '← border.error ← accent-3.500' },
];

const statCardColors: ColorToken[] = [
  { name: 'stat-card-bg', value: '#ffffff', cssVar: '--color-stat-card-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'stat-card-border', value: '#e2e8f0', cssVar: '--color-stat-card-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'stat-card-text-primary', value: '#0f172a', cssVar: '--color-stat-card-text-primary', chain: '← text.base ← neutral-1.900' },
  { name: 'stat-card-text-secondary', value: '#475569', cssVar: '--color-stat-card-text-secondary', chain: '← text.muted ← neutral-1.600' },
  { name: 'stat-card-border-success', value: '#10b981', cssVar: '--color-stat-card-border-success', chain: '← border.success ← accent-1.500' },
  { name: 'stat-card-border-warning', value: '#f59e0b', cssVar: '--color-stat-card-border-warning', chain: '← border.warning ← accent-2.500' },
  { name: 'stat-card-border-error', value: '#ef4444', cssVar: '--color-stat-card-border-error', chain: '← border.error ← accent-3.500' },
  { name: 'stat-card-trend-up', value: '#047857', cssVar: '--color-stat-card-trend-up', chain: '← text.success ← accent-1.700' },
  { name: 'stat-card-trend-down', value: '#b91c1c', cssVar: '--color-stat-card-trend-down', chain: '← text.error ← accent-3.700' },
  { name: 'stat-card-trend-neutral', value: '#475569', cssVar: '--color-stat-card-trend-neutral', chain: '← text.muted ← neutral-1.600' },
];

const tagColors: ColorToken[] = [
  { name: 'tag-bg-default', value: '#f1f5f9', cssVar: '--color-tag-bg-default', chain: '← bg.surface ← neutral-1.100' },
  { name: 'tag-bg-success', value: '#ecfdf5', cssVar: '--color-tag-bg-success', chain: '← bg.success-subtle ← accent-1.50' },
  { name: 'tag-bg-warning', value: '#fffbeb', cssVar: '--color-tag-bg-warning', chain: '← bg.warning-subtle ← accent-2.50' },
  { name: 'tag-bg-error', value: '#fef2f2', cssVar: '--color-tag-bg-error', chain: '← bg.error-subtle ← accent-3.50' },
  { name: 'tag-bg-info', value: '#eff6ff', cssVar: '--color-tag-bg-info', chain: '← bg.info-subtle ← accent-4.50' },
  { name: 'tag-text-default', value: '#0f172a', cssVar: '--color-tag-text-default', chain: '← text.base ← neutral-1.900' },
  { name: 'tag-text-success', value: '#047857', cssVar: '--color-tag-text-success', chain: '← text.success ← accent-1.700' },
  { name: 'tag-text-warning', value: '#b45309', cssVar: '--color-tag-text-warning', chain: '← text.warning ← accent-2.700' },
  { name: 'tag-text-error', value: '#b91c1c', cssVar: '--color-tag-text-error', chain: '← text.error ← accent-3.700' },
  { name: 'tag-text-info', value: '#1d4ed8', cssVar: '--color-tag-text-info', chain: '← text.info ← accent-4.700' },
  { name: 'tag-border-default', value: '#e2e8f0', cssVar: '--color-tag-border-default', chain: '← border.muted ← neutral-1.200' },
  { name: 'tag-border-success', value: '#10b981', cssVar: '--color-tag-border-success', chain: '← border.success ← accent-1.500' },
  { name: 'tag-border-warning', value: '#f59e0b', cssVar: '--color-tag-border-warning', chain: '← border.warning ← accent-2.500' },
  { name: 'tag-border-error', value: '#ef4444', cssVar: '--color-tag-border-error', chain: '← border.error ← accent-3.500' },
  { name: 'tag-border-info', value: '#3b82f6', cssVar: '--color-tag-border-info', chain: '← border.info ← accent-4.500' },
  { name: 'tag-border-focus', value: '#0ea5e9', cssVar: '--color-tag-border-focus', chain: '← border.focus ← primary-1.500' },
];

const numberInputColors: ColorToken[] = [
  { name: 'numberinput-bg', value: '#ffffff', cssVar: '--color-numberinput-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'numberinput-bg-disabled', value: '#f1f5f9', cssVar: '--color-numberinput-bg-disabled', chain: '← bg.surface ← neutral-1.100' },
  { name: 'numberinput-text', value: '#0f172a', cssVar: '--color-numberinput-text', chain: '← text.base ← neutral-1.900' },
  { name: 'numberinput-border', value: '#cbd5e1', cssVar: '--color-numberinput-border', chain: '← border.default ← neutral-1.300' },
  { name: 'numberinput-border-hover', value: '#94a3b8', cssVar: '--color-numberinput-border-hover', chain: '← border.strong ← neutral-1.400' },
  { name: 'numberinput-border-focus', value: '#0ea5e9', cssVar: '--color-numberinput-border-focus', chain: '← border.focus ← primary-1.500' },
  { name: 'numberinput-border-error', value: '#ef4444', cssVar: '--color-numberinput-border-error', chain: '← border.error ← accent-3.500' },
  { name: 'numberinput-stepper-text', value: '#475569', cssVar: '--color-numberinput-stepper-text', chain: '← text.muted ← neutral-1.600' },
  { name: 'numberinput-stepper-text-hover', value: '#0f172a', cssVar: '--color-numberinput-stepper-text-hover', chain: '← text.base ← neutral-1.900' },
  { name: 'numberinput-stepper-bg-hover', value: '#f1f5f9', cssVar: '--color-numberinput-stepper-bg-hover', chain: '← bg.surface ← neutral-1.100' },
];

const checkboxColors: ColorToken[] = [
  { name: 'checkbox-bg', value: '#ffffff', cssVar: '--color-checkbox-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'checkbox-border', value: '#cbd5e1', cssVar: '--color-checkbox-border', chain: '← border.default ← neutral-1.300' },
  { name: 'checkbox-border-hover', value: '#94a3b8', cssVar: '--color-checkbox-border-hover', chain: '← border.strong ← neutral-1.400' },
  { name: 'checkbox-checked-bg', value: '#0ea5e9', cssVar: '--color-checkbox-checked-bg', chain: '← interactive.primary ← primary-1.500' },
  { name: 'checkbox-checked-border', value: '#0ea5e9', cssVar: '--color-checkbox-checked-border', chain: '← interactive.primary ← primary-1.500' },
  { name: 'checkbox-checked-icon', value: '#ffffff', cssVar: '--color-checkbox-checked-icon', chain: '← text.on-primary ← neutral-1.0' },
  { name: 'checkbox-focus-ring', value: '#0ea5e9', cssVar: '--color-checkbox-focus-ring', chain: '← border.focus ← primary-1.500' },
  { name: 'checkbox-disabled-bg', value: '#f1f5f9', cssVar: '--color-checkbox-disabled-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'checkbox-label', value: '#0f172a', cssVar: '--color-checkbox-label', chain: '← text.base ← neutral-1.900' },
  { name: 'checkbox-description', value: '#475569', cssVar: '--color-checkbox-description', chain: '← text.muted ← neutral-1.600' },
];

const datepickerColors: ColorToken[] = [
  { name: 'datepicker-popover-bg', value: '#ffffff', cssVar: '--color-datepicker-popover-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'datepicker-popover-border', value: '#e2e8f0', cssVar: '--color-datepicker-popover-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'datepicker-header-text', value: '#0f172a', cssVar: '--color-datepicker-header-text', chain: '← text.base ← neutral-1.900' },
  { name: 'datepicker-weekday-text', value: '#475569', cssVar: '--color-datepicker-weekday-text', chain: '← text.muted ← neutral-1.600' },
  { name: 'datepicker-day-text', value: '#0f172a', cssVar: '--color-datepicker-day-text', chain: '← text.base ← neutral-1.900' },
  { name: 'datepicker-day-hover-bg', value: '#f1f5f9', cssVar: '--color-datepicker-day-hover-bg', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'datepicker-day-selected-bg', value: '#0ea5e9', cssVar: '--color-datepicker-day-selected-bg', chain: '← bg.primary ← primary-1.500' },
  { name: 'datepicker-day-selected-text', value: '#f8fafc', cssVar: '--color-datepicker-day-selected-text', chain: '← text.inverse ← neutral-1.50' },
  { name: 'datepicker-day-today-border', value: '#0ea5e9', cssVar: '--color-datepicker-day-today-border', chain: '← border.focus ← primary-1.500' },
  { name: 'datepicker-day-disabled-text', value: '#94a3b8', cssVar: '--color-datepicker-day-disabled-text', chain: '← text.disabled ← neutral-1.400' },
  { name: 'datepicker-day-range-bg', value: '#e0f2fe', cssVar: '--color-datepicker-day-range-bg', chain: '← primary-1.100 ← base.sky.100' },
  { name: 'datepicker-nav-hover-bg', value: '#f1f5f9', cssVar: '--color-datepicker-nav-hover-bg', chain: '← neutral-1.100 ← base.slate.100' },
];

const fileuploadColors: ColorToken[] = [
  { name: 'fileupload-zone-bg', value: '#f1f5f9', cssVar: '--color-fileupload-zone-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'fileupload-zone-border', value: '#cbd5e1', cssVar: '--color-fileupload-zone-border', chain: '← border.default ← neutral-1.300' },
  { name: 'fileupload-zone-text', value: '#0f172a', cssVar: '--color-fileupload-zone-text', chain: '← text.base ← neutral-1.900' },
  { name: 'fileupload-zone-text-sub', value: '#475569', cssVar: '--color-fileupload-zone-text-sub', chain: '← text.muted ← neutral-1.600' },
  { name: 'fileupload-zone-icon', value: '#0ea5e9', cssVar: '--color-fileupload-zone-icon', chain: '← interactive.primary ← primary-1.500' },
  { name: 'fileupload-hover-bg', value: '#f0f9ff', cssVar: '--color-fileupload-hover-bg', chain: '← primary-1.50 ← base.sky.50' },
  { name: 'fileupload-hover-border', value: '#0ea5e9', cssVar: '--color-fileupload-hover-border', chain: '← border.focus ← primary-1.500' },
  { name: 'fileupload-drag-bg', value: '#f0f9ff', cssVar: '--color-fileupload-drag-bg', chain: '← primary-1.50 ← base.sky.50' },
  { name: 'fileupload-drag-border', value: '#0ea5e9', cssVar: '--color-fileupload-drag-border', chain: '← border.focus ← primary-1.500' },
  { name: 'fileupload-drag-icon', value: '#0ea5e9', cssVar: '--color-fileupload-drag-icon', chain: '← bg.primary ← primary-1.500' },
  { name: 'fileupload-drag-text', value: '#0284c7', cssVar: '--color-fileupload-drag-text', chain: '← text.primary ← primary-1.600' },
  { name: 'fileupload-file-text', value: '#0f172a', cssVar: '--color-fileupload-file-text', chain: '← text.base ← neutral-1.900' },
  { name: 'fileupload-file-size', value: '#475569', cssVar: '--color-fileupload-file-size', chain: '← text.muted ← neutral-1.600' },
  { name: 'fileupload-file-icon', value: '#475569', cssVar: '--color-fileupload-file-icon', chain: '← text.muted ← neutral-1.600' },
  { name: 'fileupload-file-remove', value: '#475569', cssVar: '--color-fileupload-file-remove', chain: '← text.muted ← neutral-1.600' },
  { name: 'fileupload-file-remove-hover', value: '#b91c1c', cssVar: '--color-fileupload-file-remove-hover', chain: '← text.error ← accent-3.700' },
  { name: 'fileupload-progress-bg', value: '#e2e8f0', cssVar: '--color-fileupload-progress-bg', chain: '← neutral-1.200 ← base.slate.200' },
  { name: 'fileupload-progress-fill', value: '#0ea5e9', cssVar: '--color-fileupload-progress-fill', chain: '← bg.primary ← primary-1.500' },
  { name: 'fileupload-error-text', value: '#b91c1c', cssVar: '--color-fileupload-error-text', chain: '← text.error ← accent-3.700' },
  { name: 'fileupload-error-border', value: '#ef4444', cssVar: '--color-fileupload-error-border', chain: '← border.error ← accent-3.500' },
];

const inputColors: ColorToken[] = [
  { name: 'input-bg', value: '#ffffff', cssVar: '--color-input-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'input-bg-disabled', value: '#f1f5f9', cssVar: '--color-input-bg-disabled', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'input-text', value: '#0f172a', cssVar: '--color-input-text', chain: '← text.base ← neutral-1.900' },
  { name: 'input-text-placeholder', value: '#475569', cssVar: '--color-input-text-placeholder', chain: '← text.muted ← neutral-1.600' },
  { name: 'input-border', value: '#cbd5e1', cssVar: '--color-input-border', chain: '← border.default ← neutral-1.300' },
  { name: 'input-border-hover', value: '#94a3b8', cssVar: '--color-input-border-hover', chain: '← border.strong ← neutral-1.400' },
  { name: 'input-border-focus', value: '#0ea5e9', cssVar: '--color-input-border-focus', chain: '← border.focus ← primary-1.500' },
  { name: 'input-border-error', value: '#ef4444', cssVar: '--color-input-border-error', chain: '← border.error ← accent-3.500' },
];

const modalColors: ColorToken[] = [
  { name: 'modal-overlay', value: 'rgba(0,0,0,0.5)', cssVar: '--color-modal-overlay', chain: '← bg.overlay ← neutral.overlay' },
  { name: 'modal-bg', value: '#ffffff', cssVar: '--color-modal-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'modal-title', value: '#0f172a', cssVar: '--color-modal-title', chain: '← text.base ← neutral-1.900' },
  { name: 'modal-description', value: '#475569', cssVar: '--color-modal-description', chain: '← text.muted ← neutral-1.600' },
  { name: 'modal-divider', value: '#e2e8f0', cssVar: '--color-modal-divider', chain: '← border.muted ← neutral-1.200' },
  { name: 'modal-close-hover-bg', value: '#f1f5f9', cssVar: '--color-modal-close-hover-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'modal-close-hover-text', value: '#0ea5e9', cssVar: '--color-modal-close-hover-text', chain: '← interactive.primary ← primary-1.500' },
];

const radioColors: ColorToken[] = [
  { name: 'radio-bg', value: '#ffffff', cssVar: '--color-radio-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'radio-border', value: '#cbd5e1', cssVar: '--color-radio-border', chain: '← border.default ← neutral-1.300' },
  { name: 'radio-border-hover', value: '#94a3b8', cssVar: '--color-radio-border-hover', chain: '← border.strong ← neutral-1.400' },
  { name: 'radio-selected-border', value: '#0ea5e9', cssVar: '--color-radio-selected-border', chain: '← interactive.primary ← primary-1.500' },
  { name: 'radio-selected-dot', value: '#0ea5e9', cssVar: '--color-radio-selected-dot', chain: '← interactive.primary ← primary-1.500' },
  { name: 'radio-focus-ring', value: '#0ea5e9', cssVar: '--color-radio-focus-ring', chain: '← border.focus ← primary-1.500' },
  { name: 'radio-disabled-bg', value: '#f1f5f9', cssVar: '--color-radio-disabled-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'radio-item-hover-bg', value: '#f1f5f9', cssVar: '--color-radio-item-hover-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'radio-label', value: '#0f172a', cssVar: '--color-radio-label', chain: '← text.base ← neutral-1.900' },
  { name: 'radio-description', value: '#475569', cssVar: '--color-radio-description', chain: '← text.muted ← neutral-1.600' },
];

const selectColors: ColorToken[] = [
  { name: 'select-trigger-bg', value: '#ffffff', cssVar: '--color-select-trigger-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'select-trigger-text', value: '#0f172a', cssVar: '--color-select-trigger-text', chain: '← text.base ← neutral-1.900' },
  { name: 'select-trigger-placeholder', value: '#475569', cssVar: '--color-select-trigger-placeholder', chain: '← text.muted ← neutral-1.600' },
  { name: 'select-trigger-border', value: '#cbd5e1', cssVar: '--color-select-trigger-border', chain: '← border.default ← neutral-1.300' },
  { name: 'select-trigger-border-hover', value: '#94a3b8', cssVar: '--color-select-trigger-border-hover', chain: '← border.strong ← neutral-1.400' },
  { name: 'select-trigger-border-focus', value: '#0ea5e9', cssVar: '--color-select-trigger-border-focus', chain: '← border.focus ← primary-1.500' },
  { name: 'select-trigger-border-error', value: '#ef4444', cssVar: '--color-select-trigger-border-error', chain: '← border.error ← accent-3.500' },
  { name: 'select-trigger-disabled-bg', value: '#f1f5f9', cssVar: '--color-select-trigger-disabled-bg', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'select-icon', value: '#475569', cssVar: '--color-select-icon', chain: '← text.muted ← neutral-1.600' },
  { name: 'select-icon-hover', value: '#0f172a', cssVar: '--color-select-icon-hover', chain: '← text.base ← neutral-1.900' },
  { name: 'select-popover-bg', value: '#ffffff', cssVar: '--color-select-popover-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'select-popover-border', value: '#e2e8f0', cssVar: '--color-select-popover-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'select-item-text', value: '#0f172a', cssVar: '--color-select-item-text', chain: '← text.base ← neutral-1.900' },
  { name: 'select-item-hover-bg', value: '#f1f5f9', cssVar: '--color-select-item-hover-bg', chain: '← neutral-1.100 ← base.slate.100' },
  { name: 'select-item-selected-bg', value: '#f0f9ff', cssVar: '--color-select-item-selected-bg', chain: '← primary-1.50 ← base.sky.50' },
  { name: 'select-item-selected-text', value: '#0284c7', cssVar: '--color-select-item-selected-text', chain: '← text.primary ← primary-1.600' },
  { name: 'select-item-disabled-text', value: '#94a3b8', cssVar: '--color-select-item-disabled-text', chain: '← text.disabled ← neutral-1.400' },
  { name: 'select-check-icon', value: '#0ea5e9', cssVar: '--color-select-check-icon', chain: '← bg.primary ← primary-1.500' },
  { name: 'select-group-label', value: '#475569', cssVar: '--color-select-group-label', chain: '← text.muted ← neutral-1.600' },
  { name: 'select-separator', value: '#e2e8f0', cssVar: '--color-select-separator', chain: '← border.muted ← neutral-1.200' },
  { name: 'select-search-bg', value: '#f8fafc', cssVar: '--color-select-search-bg', chain: '← neutral-1.50 ← base.slate.50' },
  { name: 'select-empty-text', value: '#475569', cssVar: '--color-select-empty-text', chain: '← text.muted ← neutral-1.600' },
  { name: 'select-checkbox-text', value: '#ffffff', cssVar: '--color-select-checkbox-text', chain: '← text.on-primary ← neutral-1.0' },
  { name: 'select-checkbox-bg', value: '#ffffff', cssVar: '--color-select-checkbox-bg', chain: '← bg.paper ← neutral-1.0' },
];

const switchColors: ColorToken[] = [
  { name: 'switch-track-bg', value: '#cbd5e1', cssVar: '--color-switch-track-bg', chain: '← border.default ← neutral-1.300' },
  { name: 'switch-track-bg-checked', value: '#0ea5e9', cssVar: '--color-switch-track-bg-checked', chain: '← interactive.primary ← primary-1.500' },
  { name: 'switch-thumb-bg', value: '#ffffff', cssVar: '--color-switch-thumb-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'switch-focus-ring', value: '#0ea5e9', cssVar: '--color-switch-focus-ring', chain: '← border.focus ← primary-1.500' },
  { name: 'switch-disabled-track-bg', value: '#f1f5f9', cssVar: '--color-switch-disabled-track-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'switch-label', value: '#0f172a', cssVar: '--color-switch-label', chain: '← text.base ← neutral-1.900' },
  { name: 'switch-description', value: '#475569', cssVar: '--color-switch-description', chain: '← text.muted ← neutral-1.600' },
];

const tableColors: ColorToken[] = [
  { name: 'table-header-bg', value: '#f8fafc', cssVar: '--color-table-header-bg', chain: '← bg.base ← neutral-1.50' },
  { name: 'table-header-text', value: '#0f172a', cssVar: '--color-table-header-text', chain: '← text.base ← neutral-1.900' },
  { name: 'table-border', value: '#e2e8f0', cssVar: '--color-table-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'table-row-stripe', value: '#f8fafc', cssVar: '--color-table-row-stripe', chain: '← neutral-1.50 ← base.slate.50' },
  { name: 'table-row-hover', value: '#f1f5f9', cssVar: '--color-table-row-hover', chain: '← neutral-1.100 ← base.slate.100' },
];

const textareaColors: ColorToken[] = [
  { name: 'textarea-counter-text', value: '#475569', cssVar: '--color-textarea-counter-text', chain: '← text.muted ← neutral-1.600' },
  { name: 'textarea-counter-text-over', value: '#b91c1c', cssVar: '--color-textarea-counter-text-over', chain: '← text.error ← accent-3.700' },
];

const toastColors: ColorToken[] = [
  { name: 'toast-bg', value: '#ffffff', cssVar: '--color-toast-bg', chain: '← bg.paper ← neutral-1.0' },
  { name: 'toast-border', value: '#e2e8f0', cssVar: '--color-toast-border', chain: '← border.muted ← neutral-1.200' },
  { name: 'toast-title', value: '#0f172a', cssVar: '--color-toast-title', chain: '← text.base ← neutral-1.900' },
  { name: 'toast-description', value: '#475569', cssVar: '--color-toast-description', chain: '← text.muted ← neutral-1.600' },
  { name: 'toast-close-hover-bg', value: '#f1f5f9', cssVar: '--color-toast-close-hover-bg', chain: '← bg.surface ← neutral-1.100' },
  { name: 'toast-success-border', value: '#10b981', cssVar: '--color-toast-success-border', chain: '← border.success ← accent-1.500' },
  { name: 'toast-success-icon', value: '#047857', cssVar: '--color-toast-success-icon', chain: '← text.success ← accent-1.700' },
  { name: 'toast-error-border', value: '#ef4444', cssVar: '--color-toast-error-border', chain: '← border.error ← accent-3.500' },
  { name: 'toast-error-icon', value: '#b91c1c', cssVar: '--color-toast-error-icon', chain: '← text.error ← accent-3.700' },
  { name: 'toast-warning-border', value: '#f59e0b', cssVar: '--color-toast-warning-border', chain: '← border.warning ← accent-2.500' },
  { name: 'toast-warning-icon', value: '#b45309', cssVar: '--color-toast-warning-icon', chain: '← text.warning ← accent-2.700' },
  { name: 'toast-info-border', value: '#3b82f6', cssVar: '--color-toast-info-border', chain: '← border.info ← accent-4.500' },
  { name: 'toast-info-icon', value: '#1d4ed8', cssVar: '--color-toast-info-icon', chain: '← text.info ← accent-4.700' },
];

const progressColors: ColorToken[] = [
  { name: 'progress-track', value: '#f1f5f9', cssVar: '--color-progress-track', chain: '← bg.surface ← neutral-1.100' },
  { name: 'progress-fill', value: '#0ea5e9', cssVar: '--color-progress-fill', chain: '← interactive.primary ← primary-1.500' },
  { name: 'progress-fill-success', value: '#10b981', cssVar: '--color-progress-fill-success', chain: '← bg.success-solid ← accent-1.500' },
  { name: 'progress-fill-warning', value: '#f59e0b', cssVar: '--color-progress-fill-warning', chain: '← bg.warning-solid ← accent-2.500' },
  { name: 'progress-fill-error', value: '#ef4444', cssVar: '--color-progress-fill-error', chain: '← bg.error-solid ← accent-3.500' },
  { name: 'progress-label', value: '#0f172a', cssVar: '--color-progress-label', chain: '← text.base ← neutral-1.900' },
  { name: 'progress-value', value: '#475569', cssVar: '--color-progress-value', chain: '← text.muted ← neutral-1.600' },
];

const spinnerColors: ColorToken[] = [
  { name: 'spinner-primary', value: '#0ea5e9', cssVar: '--color-spinner-primary', chain: '← interactive.primary ← primary-1.500' },
  { name: 'spinner-track', value: '#e2e8f0', cssVar: '--color-spinner-track', chain: '← border.muted ← neutral-1.200' },
  { name: 'spinner-label', value: '#475569', cssVar: '--color-spinner-label', chain: '← text.muted ← neutral-1.600' },
];

const skeletonColors: ColorToken[] = [
  { name: 'skeleton-base', value: '#f1f5f9', cssVar: '--color-skeleton-base', chain: '← bg.surface ← neutral-1.100' },
  { name: 'skeleton-shimmer', value: '#f8fafc', cssVar: '--color-skeleton-shimmer', chain: '← bg.base ← neutral-1.50' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function ColorsPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1100px', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Color Tokens</h2>
      <p style={{ margin: '0 0 32px', color: '#64748b', fontSize: '15px' }}>
        4-Layer Architektur: L1 Base → L2 Global → L3 Roles → L4 Semantic
      </p>

      {/* ── L1 ───────────────────────────────────────────── */}
      <Section title="Level 1 — Base Palettes">
        {Object.entries(basePalettes).map(([name, shades]) => (
          <PaletteRow key={name} palette={name} shades={shades} cssVarPrefix={`--color-base-${name}`} />
        ))}
        <SubSection title="Utility Colors">
          <TokenGrid tokens={baseUtilityColors} />
        </SubSection>
      </Section>

      {/* ── L2 ───────────────────────────────────────────── */}
      <Section title="Level 2 — Theme Mapping">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary 1 → Sky</h4>
            <PaletteRow palette="primary-1" shades={basePalettes.sky} cssVarPrefix="--color-primary-1" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary 2 → Indigo</h4>
            <PaletteRow palette="primary-2" shades={basePalettes.indigo} cssVarPrefix="--color-primary-2" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secondary 1 → Slate</h4>
            <PaletteRow palette="secondary-1" shades={basePalettes.slate} cssVarPrefix="--color-secondary-1" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secondary 2 → Stone</h4>
            <PaletteRow palette="secondary-2" shades={basePalettes.stone} cssVarPrefix="--color-secondary-2" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Neutral 1 → Slate (+ White/Black)</h4>
            <PaletteRow palette="neutral-1" shades={neutral1Extended} cssVarPrefix="--color-neutral-1" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Neutral 2 → Zinc</h4>
            <PaletteRow palette="neutral-2" shades={basePalettes.zinc} cssVarPrefix="--color-neutral-2" />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '24px' }}>
          {[
            { label: 'Accent 1 (Emerald)', palette: basePalettes.emerald, prefix: '--color-accent-1' },
            { label: 'Accent 2 (Amber)', palette: basePalettes.amber, prefix: '--color-accent-2' },
            { label: 'Accent 3 (Red)', palette: basePalettes.red, prefix: '--color-accent-3' },
            { label: 'Accent 4 (Blue)', palette: basePalettes.blue, prefix: '--color-accent-4' },
            { label: 'Accent 5 (Teal)', palette: basePalettes.teal, prefix: '--color-accent-5' },
          ].map(({ label, palette, prefix }) => {
            const vars = paletteCssVars[prefix];
            return (
              <div key={label}>
                <h4 style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '8px', overflow: 'hidden' }}>
                  {palette.map(({ shade, value }, i) => (
                    <div key={shade} style={{ height: '20px', backgroundColor: value, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={`${vars[i]}: ${value}`}>
                      <span style={{ fontSize: '9px', fontFamily: 'monospace', color: parseInt(shade) >= 500 ? '#fff' : '#1e293b' }}>{shade}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <SubSection title="Utility Colors">
          <TokenGrid tokens={neutralUtilityColors} />
        </SubSection>
      </Section>

      {/* ── L3 ───────────────────────────────────────────── */}
      <Section title="Level 3 — Role Colors">
        <SubSection title="Backgrounds">
          <TokenGrid tokens={roleBgColors} />
        </SubSection>
        <SubSection title="Text">
          <TokenGrid tokens={roleTextColors} />
        </SubSection>
        <SubSection title="Borders">
          <TokenGrid tokens={roleBorderColors} />
        </SubSection>
        <SubSection title="Interactive">
          <TokenGrid tokens={roleInteractiveColors} />
        </SubSection>
        {/* Semantic Status Colors consolidated into bg/text/border (NDS-033) */}
      </Section>

      {/* ── L4 ───────────────────────────────────────────── */}
      <Section title="Level 4 — Component: Button">
        <TokenGrid tokens={buttonColors} />
      </Section>

      <Section title="Level 4 — Component: Badge">
        <TokenGrid tokens={badgeColors} />
      </Section>

      <Section title="Level 4 — Component: Card">
        <TokenGrid tokens={cardColors} />
      </Section>

      <Section title="Level 4 — Component: SessionCard">
        <TokenGrid tokens={sessionCardColors} />
      </Section>

      <Section title="Level 4 — Component: StatCard">
        <TokenGrid tokens={statCardColors} />
      </Section>

      <Section title="Level 4 — Component: Tag">
        <TokenGrid tokens={tagColors} />
      </Section>

      <Section title="Level 4 — Component: NumberInput">
        <TokenGrid tokens={numberInputColors} />
      </Section>

      <Section title="Level 4 — Component: Checkbox">
        <TokenGrid tokens={checkboxColors} />
      </Section>

      <Section title="Level 4 — Component: DatePicker">
        <TokenGrid tokens={datepickerColors} />
      </Section>

      <Section title="Level 4 — Component: FileUpload">
        <TokenGrid tokens={fileuploadColors} />
      </Section>

      <Section title="Level 4 — Component: Input">
        <TokenGrid tokens={inputColors} />
      </Section>

      <Section title="Level 4 — Component: Modal">
        <TokenGrid tokens={modalColors} />
      </Section>

      <Section title="Level 4 — Component: RadioGroup">
        <TokenGrid tokens={radioColors} />
      </Section>

      <Section title="Level 4 — Component: Select">
        <TokenGrid tokens={selectColors} />
      </Section>

      <Section title="Level 4 — Component: Switch">
        <TokenGrid tokens={switchColors} />
      </Section>

      <Section title="Level 4 — Component: Table">
        <TokenGrid tokens={tableColors} />
      </Section>

      <Section title="Level 4 — Component: Textarea">
        <TokenGrid tokens={textareaColors} />
      </Section>

      <Section title="Level 4 — Component: Toast">
        <TokenGrid tokens={toastColors} />
      </Section>

      <Section title="Level 4 — Component: Progress">
        <TokenGrid tokens={progressColors} />
      </Section>

      <Section title="Level 4 — Component: Spinner">
        <TokenGrid tokens={spinnerColors} />
      </Section>

      <Section title="Level 4 — Component: Skeleton">
        <TokenGrid tokens={skeletonColors} />
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ColorsPage />,
};
