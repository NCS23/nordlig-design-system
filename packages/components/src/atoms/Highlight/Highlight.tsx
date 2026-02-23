import React from 'react';
import { cn } from '../../utils/cn';

export interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Der vollstaendige Text */
  children: string;
  /** Suchbegriff(e) zum Hervorheben */
  query: string | string[];
  /** Case-sensitive Matching */
  caseSensitive?: boolean;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(
  ({ className, children, query, caseSensitive = false, ...props }, ref) => {
    const queries = Array.isArray(query) ? query : [query];
    const validQueries = queries.filter((q) => q.length > 0);

    // Kein Query oder leerer Text → nur Text
    if (!children || validQueries.length === 0) {
      return (
        <span ref={ref} className={className} {...props}>
          {children ?? ''}
        </span>
      );
    }

    const pattern = validQueries.map(escapeRegExp).join('|');
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`(${pattern})`, flags);
    const parts = children.split(regex);

    return (
      <span ref={ref} className={className} {...props}>
        {parts.map((part, i) => {
          const isMatch = validQueries.some((q) =>
            caseSensitive ? part === q : part.toLowerCase() === q.toLowerCase()
          );

          if (isMatch) {
            return (
              <mark
                key={i}
                className={cn(
                  'bg-[var(--color-hl-bg)] text-[color:var(--color-hl-text)]',
                  'rounded-[var(--radius-hl)]',
                  'px-[var(--spacing-hl-px)]'
                )}
              >
                {part}
              </mark>
            );
          }

          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </span>
    );
  }
);

Highlight.displayName = 'Highlight';

export { Highlight };
