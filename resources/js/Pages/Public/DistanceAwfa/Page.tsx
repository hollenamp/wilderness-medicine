import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { CopyAsideSection } from '@/Components/Sections/CopyAsideSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { MediaSplitSection } from '@/Components/Sections/MediaSplitSection';
import { NumberedListSection } from '@/Components/Sections/NumberedListSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { TestimonialWallSection } from '@/Components/Sections/TestimonialWallSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

    const reviews = data.review.items.map((item) => ({
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
            <MediaSplitSection
                eyebrow={data.intro.tagline}
                eyebrowPosition="media"
                title={data.intro.headline}
                titlePosition="full"
                body={data.intro.body}
                imageSrc={data.intro.image}
                imageAlt={data.intro.imageAlt}
            />
            <TestimonialWallSection
                eyebrow={data.review.eyebrow}
                heading={data.review.heading}
                intro={data.review.intro}
                items={reviews}
                layout="split"
                id="review"
            />
            <NumberedListSection
                eyebrow={data.lessons.eyebrow}
                heading={data.lessons.heading}
                body={data.lessons.body}
                items={data.lessons.items}
                columns={2}
                bodyAside
                id="lessons"
            />
            <CopyAsideSection
                headline={data.package.headline}
                tagline={data.package.tagline}
                body={data.package.body}
                asideHeading={data.package.asideHeading}
                facts={data.package.highlights}
                asideCompact
                asideTone="forest"
                background="zinc-50"
                id="package"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
