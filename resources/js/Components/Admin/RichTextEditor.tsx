import { useCallback, useEffect, useState } from 'react';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Placeholder } from '@tiptap/extensions';
import {
    Bold,
    Code2,
    Heading2,
    Heading3,
    Heading4,
    ImagePlus,
    Italic,
    Link2,
    Link2Off,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo2,
    Strikethrough,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    Underline,
    Undo2,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/UI/Popover';
import { Input } from '@/Components/Inputs/Input';
import { Button } from '@/Components/UI/Button';
import { MediaManagerDialog } from '@/Components/Admin/Media/MediaManagerDialog';
import { cx, focusRing, hasErrorInput } from '@/lib/utils';

/**
 * The editor schema is deliberately narrow — it mirrors the allowlist the legacy
 * importers use (see ImportLegacyClasses::ALLOWED_TAGS). Tags outside the schema
 * are dropped when content is parsed, which is what keeps pasted Word markup out
 * of the database.
 */
const extensions = [
    StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Rendered body copy has no styling for these, so leave them out entirely.
        codeBlock: false,
        code: false,
        link: {
            openOnClick: false,
            autolink: true,
            defaultProtocol: 'https',
            // Tiptap defaults these to target="_blank" / rel="…nofollow", which would
            // rewrite every link in the archive — sending mailto: and same-site links
            // to a new tab, and adding nofollow to outbound ones. Null keeps whatever
            // the stored markup already had.
            HTMLAttributes: { target: null, rel: null, class: null },
        },
    }),
    // Inline, so that `<a href="…-full.jpg"><img></a>` keeps its anchor. A block
    // image cannot carry the link mark and the enlarge link would be dropped.
    Image.configure({ allowBase64: false, inline: true }),
    Subscript,
    Superscript,
    Placeholder.configure({ placeholder: 'Write the article…' }),
];

interface ToolbarButtonProps {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    label: string;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, active, disabled, label, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={cx(
                'inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors',
                'text-muted-foreground hover:bg-muted hover:text-foreground',
                'disabled:pointer-events-none disabled:opacity-40',
                active && 'bg-muted text-foreground',
                focusRing,
            )}
        >
            {children}
        </button>
    );
}

function ToolbarDivider() {
    return <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-border" />;
}

function LinkButton({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const isActive = editor.isActive('link');

    const apply = () => {
        const href = value.trim();

        if (href === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
        }

        setOpen(false);
    };

    return (
        <Popover
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (next) setValue(editor.getAttributes('link').href ?? '');
            }}
        >
            <PopoverTrigger asChild>
                <button
                    type="button"
                    title="Link"
                    aria-label="Link"
                    aria-pressed={isActive}
                    className={cx(
                        'inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors',
                        'text-muted-foreground hover:bg-muted hover:text-foreground',
                        isActive && 'bg-muted text-foreground',
                        focusRing,
                    )}
                >
                    <Link2 className="size-4" />
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 p-3">
                <div className="space-y-2">
                    <Input
                        autoFocus
                        value={value}
                        placeholder="https://example.com"
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                apply();
                            }
                        }}
                    />
                    <div className="flex items-center gap-2">
                        <Button type="button" className="h-8 px-3 text-xs" onClick={apply}>
                            Apply
                        </Button>
                        {isActive && (
                            <Button
                                type="button"
                                variant="secondary"
                                className="h-8 gap-1 px-3 text-xs"
                                onClick={() => {
                                    editor.chain().focus().extendMarkRange('link').unsetLink().run();
                                    setOpen(false);
                                }}
                            >
                                <Link2Off className="size-3.5" />
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    hasError?: boolean;
    id?: string;
}

export function RichTextEditor({ value, onChange, hasError, id }: RichTextEditorProps) {
    const [sourceMode, setSourceMode] = useState(false);
    const [source, setSource] = useState(value);
    const [mediaOpen, setMediaOpen] = useState(false);

    const editor = useEditor({
        extensions,
        content: value,
        // Pages are server-rendered (see ssr.tsx), so the editor must not mount during SSR.
        immediatelyRender: false,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: cx(
                    // Mirrors the published article's spacing and scale; see app.css.
                    'rte-content',
                    'min-h-[24rem] w-full px-4 py-3 outline-none',
                    'text-sm text-foreground sm:text-base',
                ),
            },
        },
    });

    // Pull external resets (Inertia validation replays, form.reset()) back into the
    // editor, but skip the round trip while the user is the one typing.
    useEffect(() => {
        if (!editor || sourceMode) return;
        if (value === editor.getHTML()) return;

        editor.commands.setContent(value, { emitUpdate: false });
    }, [editor, value, sourceMode]);

    const toggleSource = useCallback(() => {
        if (!editor) return;

        if (sourceMode) {
            // Parsing through the schema is what normalises hand-edited markup —
            // unsupported tags are dropped here rather than reaching the database.
            editor.commands.setContent(source, { emitUpdate: false });
            onChange(editor.getHTML());
            setSourceMode(false);
        } else {
            setSource(editor.getHTML());
            setSourceMode(true);
        }
    }, [editor, sourceMode, source, onChange]);

    if (!editor) {
        return <div className="min-h-[28rem] w-full rounded-md border border-border bg-background" />;
    }

    return (
        <div
            className={cx(
                'overflow-hidden rounded-md border shadow-sm transition-colors',
                'border-border bg-background',
                hasError ? hasErrorInput : '',
            )}
        >
            <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1.5">
                <ToolbarButton
                    label="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={sourceMode || !editor.can().undo()}
                >
                    <Undo2 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={sourceMode || !editor.can().redo()}
                >
                    <Redo2 className="size-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    label="Heading 2"
                    disabled={sourceMode}
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 3"
                    disabled={sourceMode}
                    active={editor.isActive('heading', { level: 3 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 4"
                    disabled={sourceMode}
                    active={editor.isActive('heading', { level: 4 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                >
                    <Heading4 className="size-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    label="Bold"
                    disabled={sourceMode}
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    disabled={sourceMode}
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Underline"
                    disabled={sourceMode}
                    active={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <Underline className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Strikethrough"
                    disabled={sourceMode}
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="size-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    label="Bullet list"
                    disabled={sourceMode}
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    disabled={sourceMode}
                    active={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Quote"
                    disabled={sourceMode}
                    active={editor.isActive('blockquote')}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Divider"
                    disabled={sourceMode}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <Minus className="size-4" />
                </ToolbarButton>

                <ToolbarDivider />

                {!sourceMode && <LinkButton editor={editor} />}
                <ToolbarButton label="Insert image" disabled={sourceMode} onClick={() => setMediaOpen(true)}>
                    <ImagePlus className="size-4" />
                </ToolbarButton>

                <ToolbarDivider />

                <ToolbarButton
                    label="Superscript"
                    disabled={sourceMode}
                    active={editor.isActive('superscript')}
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                >
                    <SuperscriptIcon className="size-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Subscript"
                    disabled={sourceMode}
                    active={editor.isActive('subscript')}
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                >
                    <SubscriptIcon className="size-4" />
                </ToolbarButton>

                <span className="ml-auto" />

                <ToolbarButton label="Edit HTML source" active={sourceMode} onClick={toggleSource}>
                    <Code2 className="size-4" />
                </ToolbarButton>
            </div>

            {sourceMode ? (
                <textarea
                    id={id}
                    value={source}
                    spellCheck={false}
                    onChange={(e) => setSource(e.target.value)}
                    className={cx(
                        'block min-h-[24rem] w-full resize-y bg-background px-4 py-3',
                        'font-mono text-xs leading-relaxed text-foreground outline-none',
                    )}
                />
            ) : (
                <EditorContent editor={editor} />
            )}

            <MediaManagerDialog
                open={mediaOpen}
                onOpenChange={setMediaOpen}
                selectTitle="Insert image"
                onSelect={(media) => {
                    editor
                        .chain()
                        .focus()
                        .setImage({ src: media.url, alt: media.alt_text ?? '' })
                        .run();
                }}
            />
        </div>
    );
}
