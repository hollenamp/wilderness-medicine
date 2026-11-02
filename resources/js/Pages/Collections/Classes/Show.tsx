import { ClassArticleSection } from '@/Components/Sections/ClassArticleSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import type { ClassShowPageProps } from '@/types';

export default function Show({ course }: ClassShowPageProps) {
    return (
        <div className="min-h-screen w-full bg-white">
            <SubpageBannerSection
                headline="Classes"
                image="/images/hero-04.webp"
            />
            <ClassArticleSection course={course} />
            <PageCTASection
                heading="Call (303) 688-5176"
                body="Call (303) 688-5176 (best 9:00–10:00 am MT) or email carl@wildernessmedicine.com."
                hint="Prefer to write it out? Use the contact page"
            />
        </div>
    );
}
