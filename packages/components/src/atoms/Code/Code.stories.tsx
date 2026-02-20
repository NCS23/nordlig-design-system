import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Code, CodeBlock } from './Code';
import { Heading } from '../Heading';

const codeMeta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Code components for displaying inline code snippets and code blocks. Supports copy-to-clipboard functionality and optional line numbers.',
      },
    },
  },
};

export default codeMeta;
type Story = StoryObj<typeof Code>;

export const InlineCode: Story = {
  name: 'Inline Code',
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Verwende <Code>npm install</Code> um die Abhängigkeiten zu installieren,
      dann starte den Server mit <Code>npm run dev</Code>.
    </p>
  ),
};

export const CodeBlockDefault: Story = {
  name: 'Code Block: Default',
  render: () => (
    <CodeBlock>
      {`import { Button } from '@nordlig/components';

function App() {
  return <Button variant="primary">Klick mich</Button>;
}`}
    </CodeBlock>
  ),
};

export const CodeBlockCopyable: Story = {
  name: 'Code Block: Copyable',
  render: () => (
    <CodeBlock copyable>
      {`npm install @nordlig/components @nordlig/tokens
npm install tailwindcss postcss autoprefixer`}
    </CodeBlock>
  ),
};

export const CodeBlockWithLineNumbers: Story = {
  name: 'Code Block: Line Numbers',
  render: () => (
    <CodeBlock showLineNumbers>
      {`import React from 'react';
import { cn } from '../../utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4', className)}>
      {children}
    </div>
  );
}`}
    </CodeBlock>
  ),
};

export const CodeBlockCopyableWithLineNumbers: Story = {
  name: 'Code Block: Copyable + Line Numbers',
  render: () => (
    <CodeBlock copyable showLineNumbers>
      {`const trainingData = {
  type: 'Intervalle',
  duration: '45 min',
  zones: ['Z2', 'Z4', 'Z5'],
  heartRate: { avg: 152, max: 178 },
};

console.log(trainingData);`}
    </CodeBlock>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Heading level={3}>Inline Code</Heading>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          Die Funktion <Code>calculatePace()</Code> berechnet die Pace aus{' '}
          <Code>distance</Code> und <Code>time</Code>.
        </p>
      </div>
      <div>
        <Heading level={3}>Code Block (Standard)</Heading>
        <CodeBlock>
          {`const pace = distance / time;
console.log(\`Pace: \${pace} min/km\`);`}
        </CodeBlock>
      </div>
      <div>
        <Heading level={3}>Code Block (Kopierbar)</Heading>
        <CodeBlock copyable>
          {'npm install @nordlig/components'}
        </CodeBlock>
      </div>
      <div>
        <Heading level={3}>Code Block (Zeilennummern)</Heading>
        <CodeBlock showLineNumbers>
          {`function greet(name: string) {
  return \`Hallo, \${name}!\`;
}

greet('Welt');`}
        </CodeBlock>
      </div>
    </div>
  ),
};

export const DesignTokens: Story = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
      <Heading level={3}>Code Design Tokens</Heading>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Token</th>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Resolved Value</th>
            <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['--color-code-bg', '#f1f5f9', 'Inline code background (Surface)'],
            ['--color-code-text', '#0284c7', 'Inline code text color (Sky-600)'],
            ['--color-code-block-bg', '#0f172a', 'Code block dark background (Slate-900)'],
            ['--color-code-block-text', '#f1f5f9', 'Code block light text (Slate-100)'],
            ['--color-code-copy-hover-bg', '#334155', 'Copy button hover bg (Slate-700)'],
            ['--radius-code', '0.125rem', 'Inline code border radius'],
            ['--radius-code-block', '0.5rem', 'Code block border radius'],
            ['--color-text-muted', '#475569', 'Line number text color (Slate-600)'],
          ].map(([token, value, usage]) => (
            <tr key={token} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px' }}>{token}</td>
              <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    backgroundColor: value,
                    border: '1px solid #e2e8f0',
                  }}
                />
                {value}
              </td>
              <td style={{ padding: '8px', color: '#64748b' }}>{usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
