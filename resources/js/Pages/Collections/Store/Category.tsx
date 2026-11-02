import { StoreProductGridSection } from '@/Components/Sections/StoreProductGridSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import type { SiteConfig } from '@/lib/siteConfig';
import type { StoreCategoryPageProps } from '@/types';

export default function Category({ category, products, siteConfig }: StoreCategoryPageProps) {
    const config = siteConfig as SiteConfig;

    return (
        <div className="min-h-screen w-full bg-white">
            <SubpageBannerSection
                headline={category.name}
                image="/images/hero-04.webp"
            />
            <StoreProductGridSection
                products={products}
                categorySlug={category.slug}
                phone={config.phone}
                heading={category.name}
            />
            <PageCTASection
                heading="Call (303) 688-5176"
                body="Call (303) 688-5176 (best 9:00–10:00 am MT) or email carl@wildernessmedicine.com to order any product."
                hint="Prefer to write it out? Use the contact page"
            />
        </div>
    );
}
