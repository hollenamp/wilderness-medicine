/**
 * **CURSOR INFO**
 * SECTION TYPE: Paginated store product card grid
 * BEST FOR: Public store category pages
 * VISUAL STYLE: Home editorial style — square photos, bold charcoal titles, tea-green labels; white cards with centered dim halo shadow on white section
 * LAYOUT: Responsive three-column card grid with square pagination under it
 * CONTENT ELEMENTS: Eyebrow, bar heading, featured image, title, author (when set), excerpt, catalog price, call-to-order link
 * CONVERSION ROLE: Route visitors into product pages and phone orders
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Empty state when the category has no published products; pagination omitted on a single page; no cart or checkout; product photos use object-contain so they are not cropped
 */

import { Link } from '@inertiajs/react';
import { FeaturedImageWithLogoFallback } from '@/Components/Sections/FeaturedImageWithLogoFallback';
import { Button } from '@/Components/UI/Button';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import type { Paginated, Product } from '@/types';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';

type StoreProductGridSectionProps = {
    products: Paginated<Product>;
    categorySlug: string;
    phone?: string | null;
    eyebrow?: string;
    heading?: string;
    id?: string;
    spacing?: SectionSpacing;
};

function formatPrice(price: Product['price']): string | null {
    if (price === null || price === '') {
        return null;
    }

    const amount = typeof price === 'number' ? price : Number(price);

    if (Number.isNaN(amount)) {
        return null;
    }

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function telHref(phone?: string | null): string {
    const digits = (phone ?? '303-688-5176').replace(/[^\d+]/g, '');

    return `tel:${digits}`;
}

export function StoreProductGridSection({
    products,
    categorySlug,
    phone,
    eyebrow = 'Call to order',
    heading = 'Products',
    id = 'products',
    spacing = 'standard',
}: StoreProductGridSectionProps) {
    const callHref = telHref(phone);

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
                {products.data.length === 0 ? (
                    <p className="text-base font-light text-charcoal-brown-700">
                        No products in this category yet. Call to ask about availability.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                        {products.data.map((product) => {
                            const priceLabel = formatPrice(product.price);

                            return (
                                <article
                                    key={product.id}
                                    className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow-store-card md:p-6"
                                >
                                    <Link
                                        href={route('store.show', product.slug)}
                                        className="group flex flex-1 flex-col gap-4"
                                    >
                                        <div className="aspect-square overflow-hidden rounded-lg bg-charcoal-brown-100">
                                            <FeaturedImageWithLogoFallback
                                                featuredImage={product.featured_image}
                                                title={product.title}
                                                objectFit="contain"
                                                imageClassName="transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-base font-bold leading-snug text-charcoal-brown-950 group-hover:underline md:text-lg">
                                                {product.title}
                                            </h2>
                                            {product.author ? (
                                                <p className="text-sm font-light text-charcoal-brown-700">
                                                    by {product.author}
                                                </p>
                                            ) : null}
                                            {product.excerpt ? (
                                                <p className="line-clamp-3 text-sm font-light leading-relaxed text-charcoal-brown-800">
                                                    {product.excerpt}
                                                </p>
                                            ) : null}
                                        </div>
                                    </Link>
                                    <div className="mt-4 flex items-center justify-between gap-3 md:gap-4">
                                        {priceLabel ? (
                                            <p className="text-base font-medium text-zinc-600">
                                                {priceLabel}
                                            </p>
                                        ) : null}
                                        <Button
                                            asChild
                                            variant="secondary"
                                            className={cx(
                                                'shrink-0 text-xs uppercase tracking-wide',
                                                !priceLabel && 'ml-auto',
                                            )}
                                        >
                                            <a href={callHref}>Call to order</a>
                                        </Button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {products.last_page > 1 ? (
                    <nav
                        aria-label="Product pagination"
                        className="flex flex-wrap items-center justify-center gap-2"
                    >
                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map((pageNum) => {
                            const isCurrent = pageNum === products.current_page;

                            return (
                                <Link
                                    key={pageNum}
                                    href={`${route('store.category', categorySlug)}?page=${pageNum}`}
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
