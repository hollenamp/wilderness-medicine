import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { NumberedListSection } from '@/Components/Sections/NumberedListSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { PageIntroSection } from '@/Components/Sections/PageIntroSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

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
                columns={2}
            />
            <NumberedListSection
                eyebrow={data.instructorResources.eyebrow}
                heading={data.instructorResources.heading}
                tagline={data.instructorResources.tagline}
                body={data.instructorResources.body}
                items={data.instructorResources.items}
                itemsIntro={data.instructorResources.listIntro}
                itemsAfterHeading
                bodyAside
                footerBody={data.instructorResources.footerBody}
                id="instructor-resources"
            />
            <NumberedListSection
                eyebrow={data.topics.eyebrow}
                heading={data.topics.heading}
                body={data.topics.body}
                items={data.topics.items}
                footerHeading={data.topics.footerHeading}
                footerBody={data.topics.footerBody}
                background="zinc-50"
                columns={2}
                id="topics"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
