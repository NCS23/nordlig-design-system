import React from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'font-mono text-[length:var(--font-code-size)] bg-[var(--color-code-bg)] text-[var(--color-code-text)] px-1.5 py-0.5 rounded-[var(--radius-code)]',
          className
        )}
        {...props}
      />
    );
  }
);

Code.displayName = 'Code';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  copyable?: boolean;
  showLineNumbers?: boolean;
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, copyable, showLineNumbers, children, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const textContent =
      typeof children === 'string'
        ? children
        : React.Children.toArray(children)
            .map((child) => {
              if (typeof child === 'string') return child;
              if (React.isValidElement(child) && child.props.children) {
                return typeof child.props.children === 'string'
                  ? child.props.children
                  : '';
              }
              return '';
            })
            .join('');

    const handleCopy = async () => {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = () => {
      if (!showLineNumbers) return children;

      const lines = textContent.split('\n');
      return lines.map((line, index) => (
        <div key={index} className="flex">
          <span className="text-[var(--color-code-line-number)] select-none pr-4 text-right inline-block w-8">
            {index + 1}
          </span>
          <span>{line}</span>
        </div>
      ));
    };

    return (
      <div className="relative">
        <pre
          ref={ref}
          className={cn(
            'bg-[var(--color-code-block-bg)] text-[var(--color-code-block-text)] p-4 rounded-[var(--radius-code-block)] overflow-x-auto font-mono text-[length:var(--font-code-size)]',
            className
          )}
          {...props}
        >
          <code>{renderContent()}</code>
        </pre>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-[var(--radius-code)] bg-[var(--color-code-block-bg)] hover:bg-[var(--color-code-copy-hover-bg)] text-[var(--color-code-block-text)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1"
            aria-label={copied ? 'Kopiert' : 'Code kopieren'}
          >
            {copied ? <Icon icon={Check} size="sm" /> : <Icon icon={Copy} size="sm" />}
          </button>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

export { Code, CodeBlock };
