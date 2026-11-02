import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { CopyAsideSection } from '@/Components/Sections/CopyAsideSection';
import { FaqAccordionSection } from '@/Components/Sections/FaqAccordionSection';
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
    const courseItems = data.courses.items.map((item) => ({
        question: item.title,
        answer: item.description,
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
                columns={2}
            />
            <CopyAsideSection
                headline={data.unusual.headline}
                tagline={data.unusual.tagline}
                body={data.unusual.body}
                asideHeading={data.unusual.asideHeading}
                facts={data.unusual.links}
                background="white"
                id="unusual"
            />
            <NumberedListSection
                eyebrow={data.policies.eyebrow}
                heading={data.policies.heading}
                tagline={data.policies.tagline}
                body={data.policies.body}
                items={data.policies.items}
                background="zinc-50"
                columns={2}
                id="policies"
            />
            <FaqAccordionSection
                eyebrow={data.rubric.eyebrow}
                heading={data.rubric.heading}
                intro={data.rubric.intro}
                items={data.rubric.items}
                id="rubric"
            />
            <FaqAccordionSection
                eyebrow={data.courses.eyebrow}
                heading={data.courses.heading}
                intro={data.courses.intro}
                items={courseItems}
                id="courses"
                layout="stack"
                background="zinc-50"
                spacing="first"
            />
            <PageIntroSection
                headline={data.distance.headline}
                tagline={data.distance.tagline}
                body={data.distance.body}
                background="zinc-50"
                columns={2}
                id="distance-learning"
                spacing="last"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
