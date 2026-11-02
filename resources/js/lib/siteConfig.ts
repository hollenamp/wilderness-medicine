export const DEFAULT_SITE_LOGO = '/images/wilderness-medicine-outfitters-logo-color-01.png';
export const DEFAULT_HERO_LOGO = '/images/wilderness-medicine-outfitters-logo-color-01.png';

const LEGACY_LOGO_PATHS: Record<string, string> = {
    '/images/wm-logo.png': DEFAULT_SITE_LOGO,
    'images/wm-logo.png': DEFAULT_SITE_LOGO,
};

export function resolveSiteLogoUrl(
    src: unknown,
    fallback: string = DEFAULT_SITE_LOGO,
): string {
    if (typeof src !== 'string') {
        return fallback;
    }

    const trimmed = src.trim();

    if (!trimmed) {
        return fallback;
    }

    return LEGACY_LOGO_PATHS[trimmed] ?? trimmed;
}

/** Public marketing / footer fields (aligned with master-template `SiteConfig`). */
export type SiteConfig = {
    site: string;
    title?: string;
    tagline?: string;
    description: string;
    email: string;
    email_to?: string;
    email_from?: string;
    api_endpoint?: string;
    phone?: string | null;
    phone_two?: string | null;
    sms?: string | null;
    sms_two?: string | null;
    address?: string | null;
    hours?: string | null;
    logo_path?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
    twitter_url?: string | null;
    linkedin_url?: string | null;
};
