import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { MediaSplitSection } from '@/Components/Sections/MediaSplitSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { PageIntroSection } from '@/Components/Sections/PageIntroSection';
import { TestimonialWallSection } from '@/Components/Sections/TestimonialWallSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

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
            <MediaSplitSection
                eyebrow={data.letter.eyebrow}
                title={data.letter.title}
                body={data.letter.body}
                imageSrc={data.letter.image}
                imageAlt={data.letter.imageAlt}
                id="letter"
            />
            <TestimonialWallSection
                eyebrow={data.reviews.eyebrow}
                heading={data.reviews.heading}
                intro={data.reviews.intro}
                items={reviews}
                id="reviews"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
