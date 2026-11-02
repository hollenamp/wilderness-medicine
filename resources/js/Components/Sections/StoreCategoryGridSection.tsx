/**
 * **CURSOR INFO**
 * SECTION TYPE: Store category card grid
 * BEST FOR: Public store hub listing product categories
 * VISUAL STYLE: Home editorial style — bold charcoal titles, tea-green labels; white cards with centered dim halo shadow on white section
 * LAYOUT: Responsive three-column card grid
 * CONTENT ELEMENTS: Eyebrow, bar heading, category name, optional description, product count
 * CONVERSION ROLE: Route visitors into category product listings
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Empty state when no categories exist; count omitted when zero
 */

import { Link } from '@inertiajs/react';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import type { ProductCategory } from '@/types';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type StoreCategoryGridSectionProps = {
    categories: ProductCategory[];
    eyebrow?: string;
    heading?: string;
    id?: string;
    spacing?: SectionSpacing;
};

export function StoreCategoryGridSection({
    categories,
    eyebrow = 'Call to order',
    heading = 'Shop by category',
    id = 'categories',
    spacing = 'standard',
}: StoreCategoryGridSectionProps) {
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
                </div>
                {categories.length === 0 ? (
                    <p className="text-base font-light text-charcoal-brown-700">
                        No store categories yet. Check back soon.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('store.category', category.slug)}
                                className="group flex h-full flex-col gap-3 rounded-lg bg-white p-6 shadow-store-card"
                            >
                                <h2 className="text-base font-bold uppercase leading-snug tracking-tight text-charcoal-brown-950 group-hover:underline md:text-lg">
                                    {category.name}
                                </h2>
                                {category.description ? (
                                    <p className="line-clamp-3 text-sm font-light leading-relaxed text-charcoal-brown-800">
                                        {category.description}
                                    </p>
                                ) : null}
                                {typeof category.products_count === 'number' ? (
                                    <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600">
                                        {category.products_count} {category.products_count === 1 ? 'product' : 'products'}
                                    </p>
                                ) : null}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
