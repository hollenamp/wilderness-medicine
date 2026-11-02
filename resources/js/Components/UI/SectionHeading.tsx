import { cx } from '@/lib/utils';

type SectionHeadingProps = {
    title: string;
    titleLine2?: string;
    tone?: 'light' | 'dark';
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
};

export function SectionHeading({
    title,
    titleLine2,
    tone = 'light',
    as: Tag = 'h2',
    className,
}: SectionHeadingProps) {
    const barClass = tone === 'dark' ? 'bg-white' : 'bg-charcoal-brown-950';
    const textClass = tone === 'dark' ? 'text-white' : 'text-charcoal-brown-950';

    return (
        <div className={cx('flex items-stretch gap-3 md:gap-4', className)}>
            <span className={cx('w-1 shrink-0 self-stretch min-h-8 md:min-h-10', barClass)} aria-hidden />
            <Tag className={cx('text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-tight', textClass)}>
                <span className="block">{title}</span>
                {titleLine2 ? <span className="block">{titleLine2}</span> : null}
            </Tag>
        </div>
    );
}
