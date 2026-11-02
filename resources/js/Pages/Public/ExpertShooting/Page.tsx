import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { PageIntroSection } from '@/Components/Sections/PageIntroSection';
import { StorySplitSection } from '@/Components/Sections/StorySplitSection';
import { TestimonialWallSection } from '@/Components/Sections/TestimonialWallSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

    const letters = data.letter.items.map((item) => ({
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
            />
            <TestimonialWallSection
                eyebrow={data.letter.eyebrow}
                heading={data.letter.heading}
                intro={data.letter.intro}
                items={letters}
                id="letters"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
