import { PropsWithChildren } from 'react';
import { Head, usePage } from '@inertiajs/react';

import { Footer } from '@/Components/Sections/Footer';
import { Navigation } from '@/Components/Sections/Navigation/Navigation';
import { MobileTabBar } from '@/Components/UI/MobileTabBar';
import { PWAInstallProvider } from '@/Components/UI/PWAInstallProvider';
import ScrollToTop from '@/Components/UI/ScrollToTop';
import ServiceWorkerRegister from '@/Components/UI/ServiceWorkerRegister';
import { resolveLocation, type NavigationBag } from '@/lib/resolveNavigation';
import type { SiteConfig } from '@/lib/siteConfig';
import type { ClassNavItem, PageSeo } from '@/types';

type PublicSiteConfig = Pick<SiteConfig, 'site' | 'title' | 'description' | 'email' | 'phone' | 'address' | 'hours' | 'logo_path'>;

function messageLinkFor(pathname: string): string {
    if (pathname === '/contact-us') return '/contact-us#message';
    return '/contact-us';
}

export default function PublicLayout({ children }: PropsWithChildren) {
    const { props, url } = usePage();
    const { siteConfig, seo, navigation, classNavItems } = props as unknown as {
        siteConfig: PublicSiteConfig;
        seo?: PageSeo | null;
        navigation: NavigationBag;
        classNavItems?: ClassNavItem[];
    };

    const pageTitle = seo?.meta_title || siteConfig.title || siteConfig.site;
    const messageLink = messageLinkFor(url.split(/[?#]/)[0]);
    const headerItems = resolveLocation(navigation, 'header', classNavItems);
    const footerItems = resolveLocation(navigation, 'footer', classNavItems);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                {(seo?.meta_description || siteConfig.description) && (
                    <meta name="description" content={seo?.meta_description || siteConfig.description} />
                )}
                {seo?.og_title && <meta property="og:title" content={seo.og_title} />}
                {seo?.og_description && <meta property="og:description" content={seo.og_description} />}
                {seo?.og_image && <meta property="og:image" content={seo.og_image} />}
                {seo?.canonical_url && <link rel="canonical" href={seo.canonical_url} />}
                {seo?.robots && <meta name="robots" content={seo.robots} />}
                {seo?.structured_data && (
                    <script type="application/ld+json">{seo.structured_data}</script>
                )}
            </Head>

            <PWAInstallProvider>
                <ServiceWorkerRegister />
                <div id="topOfPage" className="absolute -top-96" aria-hidden>
                    Top of page
                </div>
                <ScrollToTop />
                <Navigation
                    siteLabel={siteConfig.site}
                    email={siteConfig.email}
                    phone={siteConfig.phone}
                    items={headerItems}
                />

                {children}

                <MobileTabBar
                    contactEmail={`mailto:${siteConfig.email}`}
                    messageLink={messageLink}
                />
                <Footer className="pb-22 md:pb-0" siteConfig={siteConfig} items={footerItems} />
            </PWAInstallProvider>
        </>
    );
}
