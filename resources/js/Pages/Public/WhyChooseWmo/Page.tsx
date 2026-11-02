import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { CopyAsideSection } from '@/Components/Sections/CopyAsideSection';
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
                eyebrow={data.questions.eyebrow}
                heading={data.questions.heading}
                tagline={data.questions.tagline}
                body={data.questions.body}
                items={data.questions.items}
                columns={2}
                bodyAside
                id="questions"
            />
            <CopyAsideSection
                headline={data.notes.headline}
                tagline={data.notes.tagline}
                body={data.notes.body}
                asideHeading={data.notes.asideHeading}
                facts={data.notes.highlights}
                background="zinc-50"
                id="notes"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
