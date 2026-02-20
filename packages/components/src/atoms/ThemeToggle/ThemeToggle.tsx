import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { useTheme, type Theme } from '../../system/ThemeProvider';

export interface ThemeToggleProps {
  className?: string;
}

const themeOrder: Theme[] = ['light', 'dark', 'system'];

const themeLabels: Record<Theme, string> = {
  light: 'Helles Theme aktiv – Klicken fuer Dunkles Theme',
  dark: 'Dunkles Theme aktiv – Klicken fuer System-Theme',
  system: 'System-Theme aktiv – Klicken fuer Helles Theme',
};

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className }, ref) => {
    const { theme, setTheme } = useTheme();

    const handleClick = () => {
      const currentIndex = themeOrder.indexOf(theme);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      setTheme(themeOrder[nextIndex]);
    };

    const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-label={themeLabels[theme]}
        className={cn(
          'inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-toggle)]',
          'border border-[var(--color-toggle-border)]',
          'bg-[var(--color-toggle-bg)]',
          'hover:bg-[var(--color-toggle-hover-bg)]',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1',
          className
        )}
      >
        <Icon icon={ThemeIcon} size="sm" className="text-[var(--color-toggle-text)]" />
      </button>
    );
  }
);

ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };
