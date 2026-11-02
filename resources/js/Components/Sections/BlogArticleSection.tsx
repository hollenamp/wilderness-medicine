/**
 * **CURSOR INFO**
 * SECTION TYPE: Single blog article body
 * BEST FOR: Public blog post pages
 * VISUAL STYLE: Home editorial style — bar heading, tea-green labels, charcoal body
 * LAYOUT: Narrow centered column under the interior banner
 * CONTENT ELEMENTS: Back link, categories, title, author and date, featured image, HTML article body
 * CONVERSION ROLE: Deliver the post, then hand off to the closing CTA
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Featured image is omitted when it already appears in the imported article HTML; body markup is sanitised on import
 */

import { Link } from '@inertiajs/react';
import { FeaturedImageWithLogoFallback } from '@/Components/Sections/FeaturedImageWithLogoFallback';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';
import type { BlogPost } from '@/types';

type BlogArticleSectionProps = {
    post: BlogPost;
    id?: string;
    spacing?: SectionSpacing;
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) {
        return '';
    }

    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export function BlogArticleSection({
    post,
    id = 'article',
    spacing = 'standard',
}: BlogArticleSectionProps) {
    const featuredFilename = post.featured_image?.url?.split('/').pop() ?? null;
    const featuredImageDuplicatedInContent =
        !!featuredFilename && (post.content ?? '').includes(featuredFilename);
    const showFeaturedImageArea = post.featured_image?.url
        ? !featuredImageDuplicatedInContent
        : true;

    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <article className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                <div className="mx-auto flex max-w-3xl flex-col gap-8 md:gap-12">
                    <Link
                        href={route('blog.index')}
                        className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 hover:text-forest-green-700 md:text-sm"
                    >
                        Back to Blog
                    </Link>

                    <header className="flex flex-col gap-4">
                        {post.categories && post.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category) => (
                                    <span
                                        key={category.id}
                                        className="text-xs font-semibold uppercase tracking-widest text-tea-green-600"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                        <SectionHeading title={post.title} as="h1" />
                        <div className="flex flex-wrap items-center gap-2 text-sm font-light text-charcoal-brown-600">
                            {post.author?.name ? <span>{post.author.name}</span> : null}
                            {post.author?.name && post.published_at ? <span>&middot;</span> : null}
                            {post.published_at ? <span>{formatDate(post.published_at)}</span> : null}
                        </div>
                    </header>

                    {showFeaturedImageArea ? (
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-charcoal-brown-100">
                            <FeaturedImageWithLogoFallback
                                featuredImage={post.featured_image}
                                title={post.title}
                            />
                        </div>
                    ) : null}

                    <div
                        className="blog-content text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                    />
                </div>
            </article>
        </section>
    );
}
