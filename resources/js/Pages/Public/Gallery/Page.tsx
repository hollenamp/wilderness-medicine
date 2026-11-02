import { mergeDefaults } from '@/Components/CMS/mergeDefaults';
import type { InferContent } from '@/Components/CMS/types';
import { GalleryGridSection } from '@/Components/Sections/GalleryGridSection';
import { SubpageBannerSection } from '@/Components/Sections/Heros/SubpageBannerSection';
import { PageCTASection } from '@/Components/Sections/PageCTASection';
import schema from './schema';

type GalleryCategoryProp = { id: number; name: string };

type GalleryImageProp = {
    id: number;
    url: string;
    alt_text: string | null;
    category_ids: number[];
};

export default function Page({
    content,
}: {
    content: Record<string, unknown> | null;
    galleryCategories?: GalleryCategoryProp[];
    galleryImages?: GalleryImageProp[];
}) {
    const data = mergeDefaults(schema, content) as InferContent<typeof schema>;
    const images = data.gallery.items.map((item, index) => ({
        id: index + 1,
        url: item.src,
        alt_text: item.alt,
        title: item.title.trim() || `Photo ${index + 1}`,
        category_ids: [] as number[],
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
            <GalleryGridSection
                eyebrow={data.gallery.eyebrow}
                title={data.gallery.title}
                description={data.gallery.description}
                images={images}
            />
            <PageCTASection
                heading={data.cta.heading}
                body={data.cta.body}
                hint={data.cta.scrollHint}
            />
        </div>
    );
}
