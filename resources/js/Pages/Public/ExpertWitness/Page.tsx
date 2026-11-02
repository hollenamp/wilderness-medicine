import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { CopyAsideSection } from '@/Components/Sections/CopyAsideSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { PageIntroSection } from '@/Components/Sections/PageIntroSection';
import { StorySplitSection } from '@/Components/Sections/StorySplitSection';
import { TestimonialCarouselSection } from '@/Components/Sections/TestimonialCarouselSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

    const credentials = data.about.credentials.map((item) => ({
        title: item.title,
        bullets: item.bullets
            .split('\n')
            .map((bullet) => bullet.trim())
            .filter(Boolean),
    }));

    const reviews = data.reviews.items.map((item) => ({
        name: item.name,
        title: item.title,
        testimonial: item.testimonial,
        date: item.date || undefined,
    }));

    return (
        <div className="min-h-screen w-full bg-white">
            <SubpageBannerSection
                tagline={data.hero.tagline}
                headline={data.hero.headline}
                headlineLine2={data.hero.headlineLine2}
                subheading={data.hero.subheading}
                image={data.hero.backgroundImage}
            />
            <PageIntroSection
                headline={data.intro.headline}
                tagline={data.intro.tagline}
                body={data.intro.body}
                background="zinc-50"
            />
            <StorySplitSection
                eyebrow={data.about.eyebrow}
                title={data.about.title}
                body={data.about.body}
                supportContent={data.about.supportContent}
                imageSrc={data.about.image}
                imageAlt={data.about.imageAlt}
                proofSignals={data.about.trustSignals}
                credentials={credentials}
                credentialsIntro={data.about.credentialsIntro}
                headingFullWidth
            />
            <TestimonialCarouselSection
                eyebrow={data.reviews.eyebrow}
                heading={data.reviews.heading}
                intro={data.reviews.intro}
                items={reviews}
            />
            <CopyAsideSection
                headline={data.fees.headline}
                tagline={data.fees.tagline}
                body={data.fees.body}
                asideHeading={data.fees.asideHeading}
                facts={data.fees.highlights}
                headingInColumn
                id="fees"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
