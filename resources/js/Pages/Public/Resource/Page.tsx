import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { FaqAccordionSection } from '@/Components/Sections/FaqAccordionSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { MediaSplitSection } from '@/Components/Sections/MediaSplitSection';
import { NumberedListSection } from '@/Components/Sections/NumberedListSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import { PageIntroSection } from '@/Components/Sections/PageIntroSection';
import { TwoColumnMediaSection } from '@/Components/Sections/TwoColumnMediaSection';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

    const skillVideos = data.skillVideos.items.map((item) => ({
        title: item.title,
        body: item.body,
        videoSrc: item.video,
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
                asideBody={data.intro.card}
                background="zinc-50"
                columns={2}
            />
            <MediaSplitSection
                eyebrow={data.denverTv.eyebrow}
                title={data.denverTv.title}
                titleLine2={data.denverTv.titleLine2}
                body={data.denverTv.body}
                videoSrc={data.denverTv.video}
                id="denver-tv"
            />
            <NumberedListSection
                eyebrow={data.autoGear.eyebrow}
                heading={data.autoGear.heading}
                tagline={data.autoGear.tagline}
                body={data.autoGear.body}
                items={data.autoGear.items}
                footerHeading={data.autoGear.footerHeading}
                footerBody={data.autoGear.footerBody}
                footerNotes={data.autoGear.footerNotes}
                footerCard
                background="zinc-50"
                columns={2}
                id="auto-gear"
            />
            <NumberedListSection
                eyebrow={data.foxTv.eyebrow}
                heading={data.foxTv.heading}
                tagline={data.foxTv.tagline}
                body={data.foxTv.body}
                listAsideHeading={data.foxTv.listHeading}
                items={data.foxTv.items}
                listAside
                id="fox-tv"
            />
            <TwoColumnMediaSection
                eyebrow={data.skillVideos.eyebrow}
                heading={data.skillVideos.heading}
                items={skillVideos}
                background="zinc-50"
                id="skill-videos"
            />
            <MediaSplitSection
                eyebrow={data.algorithm.eyebrow}
                title={data.algorithm.title}
                body={data.algorithm.body}
                imageSrc={data.algorithm.image}
                imageAlt={data.algorithm.imageAlt}
                id="algorithm"
            />
            <FaqAccordionSection
                eyebrow={data.rubric.eyebrow}
                heading={data.rubric.heading}
                intro={data.rubric.intro}
                items={data.rubric.items}
                id="rubric"
            />
            <PageIntroSection
                headline={data.pome.headline}
                body={data.pome.body}
                background="zinc-50"
                id="pome"
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
