/**
 * **CURSOR INFO**
 * SECTION TYPE: Three-card blog preview with sidebar copy
 * BEST FOR: Home page editorial teaser
 * VISUAL STYLE: Light, square photos, bold titles, sidebar paragraph
 * LAYOUT: Heading with vertical bar, three image cards, sidebar text column
 * CONTENT ELEMENTS: Section heading, post images and titles, sidebar copy
 * CONVERSION ROLE: Drive readers to the blog index or a post
 * IDEAL POSITION: After testimonials, before contact
 * NOTES / MODIFIERS: Falls back to an empty state when no posts are published
 */

import { Link } from '@inertiajs/react';
import { FeaturedImageWithLogoFallback } from '@/Components/Sections/FeaturedImageWithLogoFallback';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export type BlogPreviewPost = {
    id: number;
    title: string;
    slug: string;
    featured_image?: {
        url: string;
        alt_text?: string | null;
    } | null;
};

type BlogPreviewSectionProps = {
    heading?: string;
    sidebar?: string;
    posts?: BlogPreviewPost[];
};

export function BlogPreviewSection({
    heading = 'Our Blog',
    sidebar = 'Come train with a program that has taught wilderness medicine since 1967 — then keep learning through field notes, gear guidance, and backcountry care.',
    posts = [],
}: BlogPreviewSectionProps) {
    return (
        <section className="bg-white py-8 md:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:gap-16 lg:px-12">
                <SectionHeading title={heading} />
                {posts.length === 0 ? (
                    <p className="text-base font-light text-charcoal-brown-700">
                        No posts yet. Check back soon for field notes and training updates.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-4 md:gap-8 lg:gap-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-3 md:gap-8 lg:gap-12">
                            {posts.slice(0, 3).map((post) => (
                                <Link
                                    key={post.id}
                                    href={route('blog.show', post.slug)}
                                    className="group flex flex-col gap-4"
                                >
                                    <div className="aspect-square overflow-hidden rounded-lg bg-charcoal-brown-100">
                                        <FeaturedImageWithLogoFallback
                                            featuredImage={post.featured_image}
                                            title={post.title}
                                            imageClassName="transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-base font-bold leading-snug text-charcoal-brown-950 group-hover:underline md:text-lg">
                                        {post.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                        <p className="text-base font-light leading-relaxed text-charcoal-brown-800 md:col-span-1">
                            {sidebar}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
