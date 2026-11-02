import { AboutWithStatsSection } from '@/Components/Sections/AboutWithStatsSection';
import { CourseCarouselSection } from '@/Components/Sections/CourseCarouselSection';
import { HeroSplitHeadlineSection } from '@/Components/Sections/Heros/HeroSplitHeadlineSection';
import { PressCtaSection } from '@/Components/Sections/PressCtaSection';
import { TwoPathCardsSection } from '@/Components/Sections/TwoPathCardsSection';
import { UpcomingClassesSection } from '@/Components/Sections/UpcomingClassesSection';
import { WhyChooseUsSection } from '@/Components/Sections/WhyChooseUsSection';
import ScrollPosition from '@/Components/UI/ScrollPosition';
import ScrollToAnchor from '@/Components/UI/ScrollToAnchor';
import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import schema from './schema';

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;

    return (
        <>
            <ScrollToAnchor />
            <ScrollPosition />

            <div className="min-h-screen w-full bg-white">
                <HeroSplitHeadlineSection
                    headlineLeft={data.hero.headlineLeft}
                    headlineRight={data.hero.headlineRight}
                    headlineSub={data.hero.headlineSub}
                    kicker={data.hero.kicker}
                    subheading={data.hero.subheading}
                    image={data.hero.image}
                    imageAlt={data.hero.imageAlt}
                    logo={data.hero.logo}
                />
                <PressCtaSection
                    heading={data.foxTv.heading}
                    headingLine2={data.foxTv.headingLine2}
                    ctaPrefix={data.foxTv.ctaPrefix}
                    ctaLabel={data.foxTv.ctaLabel}
                    ctaSuffix={data.foxTv.ctaSuffix}
                    ctaHref={data.foxTv.ctaHref}
                    tagline={data.foxTv.tagline}
                />
                <AboutWithStatsSection
                    heading={data.about.heading}
                    headingLine2={data.about.headingLine2}
                    paragraph1={data.about.paragraph1}
                    paragraph2={data.about.paragraph2}
                    image={data.about.image}
                    imageAlt={data.about.imageAlt}
                    stats={data.about.stats}
                />
                <WhyChooseUsSection heading={data.whyChooseUs.heading} cards={data.whyChooseUs.cards} />
                <UpcomingClassesSection
                    heading={data.upcomingClasses.heading}
                    intro={data.upcomingClasses.intro}
                    classes={data.upcomingClasses.items}
                />
                <CourseCarouselSection heading={data.courses.heading} courses={data.courses.items} />
                <TwoPathCardsSection
                    heading={data.pathways.heading}
                    intro={data.pathways.intro}
                    items={data.pathways.items}
                />
            </div>
        </>
    );
}
