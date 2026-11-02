import { DEFAULT_SITE_LOGO } from '@/lib/siteConfig';
import { cx } from '@/lib/utils';

type FeaturedImageSource = {
    url: string;
    alt_text?: string | null;
};

type FeaturedImageWithLogoFallbackProps = {
    featuredImage?: FeaturedImageSource | null;
    title: string;
    objectFit?: 'cover' | 'contain';
    imageClassName?: string;
};

export function FeaturedImageWithLogoFallback({
    featuredImage,
    title,
    objectFit = 'cover',
    imageClassName,
}: FeaturedImageWithLogoFallbackProps) {
    if (featuredImage?.url) {
        return (
            <img
                src={featuredImage.url}
                alt={featuredImage.alt_text ?? title}
                className={cx(
                    'h-full w-full',
                    objectFit === 'cover' ? 'object-cover' : 'object-contain',
                    imageClassName,
                )}
            />
        );
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-zinc-50 p-8">
            <img
                src={DEFAULT_SITE_LOGO}
                alt=""
                aria-hidden="true"
                width={248}
                height={218}
                className="h-auto w-auto"
            />
        </div>
    );
}
