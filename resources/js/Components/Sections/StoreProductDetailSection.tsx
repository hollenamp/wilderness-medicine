/**
 * **CURSOR INFO**
 * SECTION TYPE: Single product detail
 * BEST FOR: Public store product pages
 * VISUAL STYLE: Home editorial style — bar heading, tea-green labels, charcoal body
 * LAYOUT: Split image and copy on desktop, stacked on mobile
 * CONTENT ELEMENTS: Back link, categories, title, featured image, catalog price, variant list, HTML body, call-to-order link
 * CONVERSION ROLE: Show catalog details and drive phone orders
 * IDEAL POSITION: Directly after the subpage banner, before the closing CTA
 * NOTES / MODIFIERS: Variants render as an informational list, not a purchase selector; no cart or checkout
 */

import { Link } from '@inertiajs/react';
import { FeaturedImageWithLogoFallback } from '@/Components/Sections/FeaturedImageWithLogoFallback';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { sectionSpacing, type SectionSpacing } from '@/lib/sectionSpacing';
import { cx } from '@/lib/utils';
import type { Product } from '@/types';

type StoreProductDetailSectionProps = {
    product: Product;
    phone?: string | null;
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

export function StoreProductDetailSection({
    product,
    phone,
    id = 'product',
    spacing = 'standard',
}: StoreProductDetailSectionProps) {
    const priceLabel = formatPrice(product.price);
    const variants = (product.variants ?? []).filter((variant) => variant.label.trim() !== '');
    const backHref = product.categories?.[0]
        ? route('store.category', product.categories[0].slug)
        : route('store.index');
    const backLabel = product.categories?.[0]
        ? `Back to ${product.categories[0].name}`
        : 'Back to Store';

    return (
        <section id={id} className={cx('bg-white', sectionSpacing(spacing))}>
            <article className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
                <div className="mb-8 md:mb-12">
                    <Link
                        href={backHref}
                        className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 hover:text-forest-green-700 md:text-sm"
                    >
                        {backLabel}
                    </Link>
                </div>

                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                    <div className="aspect-square overflow-hidden rounded-lg bg-charcoal-brown-100">
                        <FeaturedImageWithLogoFallback
                            featuredImage={product.featured_image}
                            title={product.title}
                            objectFit="contain"
                        />
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8">
                        {product.categories && product.categories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {product.categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('store.category', category.slug)}
                                        className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 hover:text-forest-green-700"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        ) : null}

                        <SectionHeading title={product.title} as="h1" />

                        {priceLabel ? (
                            <p className="text-xl font-semibold text-charcoal-brown-950 md:text-2xl">
                                {priceLabel}
                            </p>
                        ) : null}

                        {variants.length > 0 ? (
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-tea-green-600">
                                    Options
                                </p>
                                <ul className="flex flex-col gap-1 text-sm font-light text-charcoal-brown-800">
                                    {variants.map((variant) => {
                                        const variantPrice = formatPrice(variant.price ?? null);

                                        return (
                                            <li key={variant.label}>
                                                {variant.label}
                                                {variantPrice ? ` — ${variantPrice}` : ''}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : null}

                        <a
                            href={telHref(phone)}
                            className="inline-flex w-fit items-center justify-center bg-tea-green-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2 md:px-8 md:text-base"
                        >
                            Call to order
                        </a>

                        <div
                            className="store-content text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                            dangerouslySetInnerHTML={{ __html: product.content ?? '' }}
                        />
                    </div>
                </div>
            </article>
        </section>
    );
}
