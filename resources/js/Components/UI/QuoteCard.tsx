import { useState } from 'react';
import { Star } from 'lucide-react';
import { FormattedText } from '@/Components/UI/FormattedText';
import { cx } from '@/lib/utils';

const stripFormattedMarkup = (value: string): string =>
    value
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*/g, '')
        .replace(/\+\+/g, '')
        .replace(/(?<!\*)\*(?!\*)/g, '');

type QuoteCardVariant = 'card' | 'plain';

type QuoteCardProps = {
    testimonial: string;
    name?: string;
    title?: string;
    date?: string;
    avatar?: string;
    starRating?: number;
    /** Characters shown before the Read more toggle appears. */
    maxLength?: number;
    /** `plain` drops the bordered card for a pull quote beside a heading. */
    variant?: QuoteCardVariant;
    className?: string;
};

export function QuoteCard({
    testimonial,
    name,
    title,
    date,
    avatar,
    starRating,
    maxLength = 260,
    variant = 'card',
    className,
}: QuoteCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const showAvatar = Boolean(avatar) && !avatarFailed;
    const isPlain = variant === 'plain';
    const plainTestimonial = stripFormattedMarkup(testimonial);
    const exceedsMaxLength = !isPlain && plainTestimonial.length > maxLength;
    const collapsedPreview =
        exceedsMaxLength && !isExpanded ? `${plainTestimonial.slice(0, maxLength).trimEnd()}…` : null;

    return (
        <figure
            className={cx(
                'flex flex-col',
                isPlain
                    ? 'gap-3 border-l-2 border-tea-green-500 pl-4 md:pl-6'
                    : 'h-full gap-4 rounded-lg border border-zinc-200 bg-white p-6 md:p-8',
                className,
            )}
        >
            {starRating ? (
                <div className="flex items-center gap-1" aria-label={`${starRating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={cx(
                                'h-4 w-4',
                                index < starRating
                                    ? 'fill-tea-green-500 text-tea-green-500'
                                    : 'fill-zinc-200 text-zinc-200',
                            )}
                            strokeWidth={1.5}
                            aria-hidden
                        />
                    ))}
                </div>
            ) : null}

            <blockquote
                className={cx(
                    'text-base font-light leading-relaxed text-charcoal-brown-800',
                    isPlain ? 'md:text-lg' : 'flex-1',
                )}
            >
                &ldquo;
                {collapsedPreview ? collapsedPreview : <FormattedText text={testimonial} />}
                &rdquo;
            </blockquote>

            {exceedsMaxLength ? (
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="self-start text-xs font-semibold uppercase tracking-widest text-tea-green-600 transition-colors hover:text-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            ) : null}

            {name || title || date || showAvatar ? (
                <figcaption
                    className={cx(
                        'flex items-start gap-4',
                        !isPlain && 'border-t border-zinc-200 pt-4',
                    )}
                >
                    {showAvatar ? (
                        <img
                            src={avatar}
                            alt={name ? `Photo of ${name}` : 'Reviewer photo'}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() => setAvatarFailed(true)}
                            className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        />
                    ) : null}
                    <div className="flex flex-col gap-1">
                        {name ? (
                            <span className="text-base font-bold text-charcoal-brown-950">
                                <FormattedText text={name} />
                            </span>
                        ) : null}
                        {title ? <span className="text-sm text-charcoal-brown-700">{title}</span> : null}
                        {date ? (
                            <span className="text-xs font-semibold uppercase tracking-widest text-charcoal-brown-700">
                                {date}
                            </span>
                        ) : null}
                    </div>
                </figcaption>
            ) : null}
        </figure>
    );
}
