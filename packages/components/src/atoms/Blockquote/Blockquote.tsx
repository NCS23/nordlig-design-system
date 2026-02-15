import React from 'react';
import { cn } from '../../utils/cn';

// ─── Blockquote ─────────────────────────────────────────────────────────────

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {}

/**
 * Semantisches Blockquote-Element mit Design-Token-basiertem Styling.
 * Verwendet L4-Tokens mit dem Prefix `bq`.
 */
const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        '[border-left-width:var(--spacing-bq-border-width)]',
        '[border-left-color:var(--color-bq-border)]',
        'bg-[var(--color-bq-bg)]',
        'text-[color:var(--color-bq-text)]',
        'p-[var(--spacing-bq-padding)]',
        'rounded-[var(--radius-bq)]',
        'italic',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
);
Blockquote.displayName = 'Blockquote';

// ─── BlockquoteCitation ─────────────────────────────────────────────────────

export interface BlockquoteCitationProps extends React.HTMLAttributes<HTMLElement> {
  /** Name des Autors */
  author?: string;
  /** Quellenangabe (Buch, Artikel etc.) */
  source?: string;
}

/**
 * Zitations-Footer fuer das Blockquote.
 * Rendert entweder benutzerdefinierte Kinder oder eine automatische
 * Autor/Quelle-Darstellung.
 */
const BlockquoteCitation = React.forwardRef<HTMLElement, BlockquoteCitationProps>(
  ({ className, author, source, children, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        'mt-[var(--spacing-bq-cite-gap)] text-sm not-italic text-[color:var(--color-bq-cite-text)]',
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {author && <span className="font-medium">{author}</span>}
          {author && source && ' — '}
          {source && <cite>{source}</cite>}
        </>
      )}
    </footer>
  )
);
BlockquoteCitation.displayName = 'BlockquoteCitation';

export { Blockquote, BlockquoteCitation };
