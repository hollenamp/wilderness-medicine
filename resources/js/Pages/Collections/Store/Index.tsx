import { StoreCategoryGridSection } from '@/Components/Sections/StoreCategoryGridSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import type { StoreIndexPageProps } from '@/types';

export default function Index({ categories }: StoreIndexPageProps) {
    return (
        <div className="min-h-screen w-full bg-white">
            <SubpageBannerSection
                headline="Store"
                image="/images/hero-04.webp"
            />
            <StoreCategoryGridSection categories={categories} />
            <PageCTASection
                heading="Call (303) 688-5176"
                body="Call (303) 688-5176 (best 9:00–10:00 am MT) or email carl@wildernessmedicine.com to order any product."
                hint="Prefer to write it out? Use the contact page"
            />
        </div>
    );
}
