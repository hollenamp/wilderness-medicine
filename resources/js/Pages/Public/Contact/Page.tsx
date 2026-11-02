import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { ContactSection } from '@/Components/Sections/ContactSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import type { SiteConfig } from '@/lib/siteConfig';
import schema from './schema';

type PageSiteConfig = Pick<
    SiteConfig,
    'site' | 'title' | 'description' | 'email' | 'phone' | 'address' | 'hours' | 'linkedin_url'
>;

export default function Page({
    siteConfig,
    content,
}: {
    siteConfig: PageSiteConfig;
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
            <ContactSection
                siteConfig={siteConfig}
                directionsTagline={data.directions.tagline}
                directionsHeadline={data.directions.headline}
                directionsBody={data.directions.body}
                heading={data.contact.heading}
                body={data.contact.body}
                formHeading={data.contact.formHeading}
                ctaLabel={data.contact.ctaLabel}
            />
        </div>
    );
}
