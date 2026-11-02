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
            />
            <CopyAsideSection
                headline={data.director.headline}
                tagline={data.director.tagline}
                body={data.director.body}
                asideHeading={data.director.asideHeading}
                facts={data.director.highlights}
                id="director"
            />
            <NumberedListSection
                eyebrow={data.roster.eyebrow}
                heading={data.roster.heading}
                tagline={data.roster.tagline}
                body={data.roster.body}
                items={data.roster.items}
                background="zinc-50"
                id="instructors"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
