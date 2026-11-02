import React from 'react';

export interface SectionHeaderBlockProps {
    eyebrow: string;
    title: string;
    description: string;
    className?: string;
}

export const SectionHeaderBlock: React.FC<SectionHeaderBlockProps> = ({
    eyebrow,
    title,
    description,
    className = '',
}) => {
    return (
        <div
            className={['mb-8 text-center md:mb-12 lg:mb-16', className].filter(Boolean).join(' ')}
            role="presentation"
        >
            <header>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {eyebrow}
                </h2>
                <h3 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
                    {title}
                </h3>
            </header>
            <p className="mt-4 text-sm text-zinc-600 md:text-base md:leading-relaxed">{description}</p>
        </div>
    );
};
