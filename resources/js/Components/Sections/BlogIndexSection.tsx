/**
 * **CURSOR INFO**
 * SECTION TYPE: Paginated blog post card grid
 * BEST FOR: Public blog index
 * VISUAL STYLE: Home editorial style — square photos, bold charcoal titles, tea-green category labels; white cards with centered dim halo shadow on white section
 * LAYOUT: Responsive three-column card grid with square pagination under it
 * CONTENT ELEMENTS: Eyebrow, bar heading, author intro, featured image, categories, title, excerpt, publish date, page numbers
 * CONVERSION ROLE: Route visitors into individual posts
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Matches StoreProductGridSection card treatment (`shadow-store-card`); empty state when nothing is published; pagination omitted on a single page; intro credits Carl Weil under the heading
 */

import { Link } from '@inertiajs/react';
import { FeaturedImageWithLogoFallback } from '@/Components/Sections/FeaturedImageWithLogoFallback';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import type { BlogPost, Paginated } from '@/types';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type BlogIndexSectionProps = {
    posts: Paginated<BlogPost>;
    eyebrow?: string;
    heading?: string;
    intro?: string;
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

export function BlogIndexSection({
    posts,
    eyebrow = 'From the archive',
    heading = 'Recent posts',
    intro = 'Written by Carl Weil — NREMT school director, State of Colorado EMS school director, and Wilderness Medicine Masters and Fellow degree holder.',
    id = 'posts',
    spacing = 'standard',
}: BlogIndexSectionProps) {
    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <div className="flex flex-col gap-4">
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                            {eyebrow}
                        </p>
                    ) : null}
                    <SectionHeading title={heading} />
                    {intro ? (
                        <p className="max-w-3xl text-base font-light leading-relaxed text-charcoal-brown-700 md:text-lg">
                            {intro}
                        </p>
                    ) : null}
                </div>
                {posts.data.length === 0 ? (
                    <p className="text-base font-light text-charcoal-brown-700">
                        No posts yet. Check back soon for field notes and training updates.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow-store-card md:p-6"
                            >
                                <Link
                                    href={route('blog.show', post.slug)}
                                    className="group flex flex-1 flex-col gap-4"
                                >
                                    <div className="aspect-square overflow-hidden rounded-lg bg-charcoal-brown-100">
                                        <FeaturedImageWithLogoFallback
                                            featuredImage={post.featured_image}
                                            title={post.title}
                                            imageClassName="transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
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
                                        <h2 className="text-base font-bold leading-snug text-charcoal-brown-950 group-hover:underline md:text-lg">
                                            {post.title}
                                        </h2>
                                        {post.excerpt ? (
                                            <p className="line-clamp-3 text-sm font-light leading-relaxed text-charcoal-brown-800">
                                                {post.excerpt}
                                            </p>
                                        ) : null}
                                        {post.published_at ? (
                                            <p className="text-xs font-light text-charcoal-brown-500">
                                                {formatDate(post.published_at)}
                                            </p>
                                        ) : null}
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {posts.last_page > 1 ? (
                    <nav
                        aria-label="Blog pagination"
                        className="flex flex-wrap items-center justify-center gap-2"
                    >
                        {Array.from({ length: posts.last_page }, (_, i) => i + 1).map((pageNum) => {
                            const isCurrent = pageNum === posts.current_page;

                            return (
                                <Link
                                    key={pageNum}
                                    href={`${route('blog.index')}?page=${pageNum}`}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={cx(
                                        'inline-flex h-10 w-10 items-center justify-center text-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2',
                                        isCurrent
                                            ? 'bg-tea-green-500 text-white hover:bg-forest-green-600'
                                            : 'border border-charcoal-brown-950 text-charcoal-brown-950 hover:bg-charcoal-brown-950 hover:text-white',
                                    )}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}
                    </nav>
                ) : null}
            </div>
        </section>
    );
}
