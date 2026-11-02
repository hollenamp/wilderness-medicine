import { StoreProductDetailSection } from '@/Components/Sections/StoreProductDetailSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import type { SiteConfig } from '@/lib/siteConfig';
import type { StoreProductPageProps } from '@/types';

export default function Product({ product, siteConfig }: StoreProductPageProps) {
    const config = siteConfig as SiteConfig;

    return (
        <div className="min-h-screen w-full bg-white">
            <SubpageBannerSection
                headline="Store"
                image="/images/hero-04.webp"
            />
            <StoreProductDetailSection product={product} phone={config.phone} />
            <PageCTASection
                heading="Call (303) 688-5176"
                body="Call (303) 688-5176 (best 9:00–10:00 am MT) or email carl@wildernessmedicine.com to order this product."
                hint="Prefer to write it out? Use the contact page"
            />
        </div>
    );
}
