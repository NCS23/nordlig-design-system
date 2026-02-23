import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Icon } from '../../atoms/Icon';
import { Separator } from '../../atoms/Separator';

// ─── Types ──────────────────────────────────────────────────────────────────

export type RichTextFeature =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'codeBlock'
  | 'link';

const ALL_FEATURES: RichTextFeature[] = [
  'bold', 'italic', 'underline', 'strikethrough',
  'heading1', 'heading2', 'heading3',
  'bulletList', 'orderedList',
  'blockquote', 'codeBlock', 'link',
];

export interface RichTextEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Initialer Inhalt (HTML string) */
  defaultValue?: string;
  /** Kontrollierter Inhalt (HTML string) */
  value?: string;
  /** Callback bei Aenderung */
  onChange?: (value: string) => void;
  /** Placeholder-Text */
  placeholder?: string;
  /** Nur-Lesen-Modus */
  readOnly?: boolean;
  /** Deaktiviert */
  disabled?: boolean;
  /** Fehler-State */
  error?: boolean;
  /** Toolbar ausblenden */
  hideToolbar?: boolean;
  /** Verfuegbare Formatierungsoptionen */
  features?: RichTextFeature[];
  /** Minimale Hoehe des Editors */
  minHeight?: string;
}

// ─── Toolbar Button ─────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function ToolbarButton({ icon, label, active, disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center',
        'h-[var(--sizing-rte-toolbar-btn)] w-[var(--sizing-rte-toolbar-btn)]',
        'rounded-[var(--radius-rte-toolbar-btn)]',
        'text-[var(--color-rte-toolbar-btn-text)]',
        'transition-colors',
        'hover:bg-[var(--color-rte-toolbar-btn-hover-bg)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-rte-border-focus)] focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        active && 'bg-[var(--color-rte-toolbar-btn-active-bg)] text-[var(--color-rte-toolbar-btn-active-text)]'
      )}
    >
      <Icon icon={icon} size={16} />
    </button>
  );
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

interface ToolbarProps {
  editor: Editor;
  features: RichTextFeature[];
  disabled: boolean;
}

function Toolbar({ editor, features, disabled }: ToolbarProps) {
  const has = (f: RichTextFeature) => features.includes(f);

  const handleLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt('URL eingeben:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const inlineFormats = [
    has('bold') && { icon: Bold, label: 'Fett', active: editor.isActive('bold'), onClick: () => editor.chain().focus().toggleBold().run() },
    has('italic') && { icon: Italic, label: 'Kursiv', active: editor.isActive('italic'), onClick: () => editor.chain().focus().toggleItalic().run() },
    has('underline') && { icon: UnderlineIcon, label: 'Unterstrichen', active: editor.isActive('underline'), onClick: () => editor.chain().focus().toggleUnderline().run() },
    has('strikethrough') && { icon: Strikethrough, label: 'Durchgestrichen', active: editor.isActive('strike'), onClick: () => editor.chain().focus().toggleStrike().run() },
  ].filter(Boolean) as ToolbarButtonProps[];

  const headingFormats = [
    has('heading1') && { icon: Heading1, label: 'Ueberschrift 1', active: editor.isActive('heading', { level: 1 }), onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    has('heading2') && { icon: Heading2, label: 'Ueberschrift 2', active: editor.isActive('heading', { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    has('heading3') && { icon: Heading3, label: 'Ueberschrift 3', active: editor.isActive('heading', { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  ].filter(Boolean) as ToolbarButtonProps[];

  const blockFormats = [
    has('bulletList') && { icon: List, label: 'Aufzaehlung', active: editor.isActive('bulletList'), onClick: () => editor.chain().focus().toggleBulletList().run() },
    has('orderedList') && { icon: ListOrdered, label: 'Nummerierte Liste', active: editor.isActive('orderedList'), onClick: () => editor.chain().focus().toggleOrderedList().run() },
    has('blockquote') && { icon: Quote, label: 'Zitat', active: editor.isActive('blockquote'), onClick: () => editor.chain().focus().toggleBlockquote().run() },
    has('codeBlock') && { icon: Code, label: 'Codeblock', active: editor.isActive('codeBlock'), onClick: () => editor.chain().focus().toggleCodeBlock().run() },
    has('link') && { icon: LinkIcon, label: 'Link', active: editor.isActive('link'), onClick: handleLink },
  ].filter(Boolean) as ToolbarButtonProps[];

  return (
    <div
      role="toolbar"
      aria-label="Formatierung"
      className={cn(
        'flex flex-wrap items-center gap-[var(--spacing-rte-toolbar-gap)]',
        'p-[var(--spacing-rte-toolbar-padding)]',
        'bg-[var(--color-rte-toolbar-bg)]',
        'border-b border-[var(--color-rte-toolbar-border)]',
        'rounded-t-[var(--radius-rte)]'
      )}
    >
      {inlineFormats.map((btn) => (
        <ToolbarButton key={btn.label} {...btn} disabled={disabled} />
      ))}
      {inlineFormats.length > 0 && headingFormats.length > 0 && (
        <Separator orientation="vertical" className="mx-1 h-5" />
      )}
      {headingFormats.map((btn) => (
        <ToolbarButton key={btn.label} {...btn} disabled={disabled} />
      ))}
      {(inlineFormats.length > 0 || headingFormats.length > 0) && blockFormats.length > 0 && (
        <Separator orientation="vertical" className="mx-1 h-5" />
      )}
      {blockFormats.map((btn) => (
        <ToolbarButton key={btn.label} {...btn} disabled={disabled} />
      ))}
    </div>
  );
}

// ─── RichTextEditor ─────────────────────────────────────────────────────────

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      defaultValue = '',
      value,
      onChange,
      placeholder = 'Inhalt eingeben…',
      readOnly = false,
      disabled = false,
      error = false,
      hideToolbar = false,
      features = ALL_FEATURES,
      minHeight = '200px',
      className,
      ...props
    },
    ref
  ) => {
    const isEditable = !readOnly && !disabled;

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: features.some((f) => f.startsWith('heading'))
            ? { levels: [1, 2, 3] }
            : false,
          bulletList: features.includes('bulletList') ? {} : false,
          orderedList: features.includes('orderedList') ? {} : false,
          blockquote: features.includes('blockquote') ? {} : false,
          codeBlock: features.includes('codeBlock') ? {} : false,
          bold: features.includes('bold') ? {} : false,
          italic: features.includes('italic') ? {} : false,
          strike: features.includes('strikethrough') ? {} : false,
        }),
        ...(features.includes('underline') ? [Underline] : []),
        ...(features.includes('link')
          ? [
              Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'underline text-[var(--color-text-primary)]' },
              }),
            ]
          : []),
        Placeholder.configure({ placeholder }),
      ],
      content: value ?? defaultValue,
      editable: isEditable,
      onUpdate: ({ editor: e }) => {
        onChange?.(e.getHTML());
      },
    });

    // Sync controlled value
    useEffect(() => {
      if (editor && value !== undefined && editor.getHTML() !== value) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }, [editor, value]);

    // Sync editable state
    useEffect(() => {
      if (editor) {
        editor.setEditable(isEditable);
      }
    }, [editor, isEditable]);

    const handleContainerClick = useCallback(() => {
      if (isEditable && editor) {
        editor.commands.focus();
      }
    }, [editor, isEditable]);

    if (!editor) return null;

    const showToolbar = !hideToolbar && !readOnly;

    return (
      <div
        ref={ref}
        className={cn(
          'border rounded-[var(--radius-rte)] overflow-hidden',
          'bg-[var(--color-rte-bg)]',
          'transition-colors',
          error
            ? 'border-[var(--color-rte-border-error)]'
            : 'border-[var(--color-rte-border)]',
          editor.isFocused && !error &&
            'ring-2 ring-[var(--color-rte-border-focus)] ring-offset-1 border-[var(--color-rte-border-focus)]',
          editor.isFocused && error &&
            'ring-2 ring-[var(--color-rte-border-error)] ring-offset-1',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        aria-invalid={error || undefined}
        data-disabled={disabled || undefined}
        {...props}
      >
        {showToolbar && (
          <Toolbar editor={editor} features={features} disabled={disabled} />
        )}

        <div
          role="presentation"
          onClick={handleContainerClick}
          className={cn(
            'p-[var(--spacing-rte-padding)]',
            'text-[length:var(--font-rte-content-size)]',
            'text-[var(--color-rte-text)]',
            // Tiptap placeholder styling
            '[&_.tiptap_p.is-editor-empty:first-child::before]:text-[var(--color-rte-placeholder)]',
            '[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
            '[&_.tiptap_p.is-editor-empty:first-child::before]:float-left',
            '[&_.tiptap_p.is-editor-empty:first-child::before]:h-0',
            '[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none',
            // Content styles
            '[&_.tiptap]:outline-none',
            '[&_.tiptap]:min-h-[var(--min-height)]',
            '[&_.tiptap_h1]:text-2xl [&_.tiptap_h1]:font-bold [&_.tiptap_h1]:mt-4 [&_.tiptap_h1]:mb-2',
            '[&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-semibold [&_.tiptap_h2]:mt-3 [&_.tiptap_h2]:mb-2',
            '[&_.tiptap_h3]:text-lg [&_.tiptap_h3]:font-medium [&_.tiptap_h3]:mt-2 [&_.tiptap_h3]:mb-1',
            '[&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ul]:my-2',
            '[&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ol]:my-2',
            '[&_.tiptap_li]:my-0.5',
            '[&_.tiptap_blockquote]:border-l-4 [&_.tiptap_blockquote]:border-[var(--color-rte-toolbar-border)] [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:italic [&_.tiptap_blockquote]:my-2',
            '[&_.tiptap_pre]:bg-[var(--color-rte-toolbar-bg)] [&_.tiptap_pre]:p-3 [&_.tiptap_pre]:rounded [&_.tiptap_pre]:font-mono [&_.tiptap_pre]:text-sm [&_.tiptap_pre]:my-2',
            '[&_.tiptap_p]:my-1'
          )}
          style={{ '--min-height': minHeight } as React.CSSProperties}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor };
