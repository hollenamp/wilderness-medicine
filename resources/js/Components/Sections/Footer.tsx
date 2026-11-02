/**
 * **CURSOR INFO**
 * SECTION TYPE: Site footer with links and contact
 * BEST FOR: Every page, global footer
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Four-column grid (brand, explore, about, contact), bottom bar
 * CONTENT ELEMENTS: Logo, company name, tagline, top-level nav links, contact info, copyright
 * CONVERSION ROLE: Navigation, contact, trust
 * IDEAL POSITION: Bottom of page
 * NOTES / MODIFIERS: Full-width padded layout; accepts optional className, no client directive (server-safe); menus show top-level links only
 */

import { Link } from '@inertiajs/react';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { AMPLogo } from '@/Components/UI/AMPLogo';
import type { NavItem } from '@/Pages/Public/navigation';
import { DEFAULT_SITE_LOGO, resolveSiteLogoUrl, type SiteConfig } from '@/lib/siteConfig';

type FooterProps = {
    className?: string;
    siteConfig: Pick<SiteConfig, 'site' | 'description' | 'email' | 'phone' | 'address' | 'hours' | 'logo_path'>;
    items: NavItem[];
};

const isAboutItem = (item: NavItem): boolean =>
    /about/i.test(item.label) || item.href === '/contact-us';

export function Footer({ className, siteConfig, items }: FooterProps) {
    const { site, description, email, phone, address, hours, logo_path: logoPath } = siteConfig;
    const mailHref = `mailto:${email}`;
    const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
    const currentYear = format(new Date(), 'yyyy');
    const logoSrc = resolveSiteLogoUrl(
        logoPath ? `/storage/${logoPath}` : DEFAULT_SITE_LOGO,
    );
    const aboutItems = items.filter(isAboutItem);
    const exploreItems = items.filter((item) => !isAboutItem(item));

    return (
        <div className={`bg-charcoal-brown-950 text-white overflow-hidden ${className}`}>
            {/* Main Footer Content */}
            <div className="w-full py-6 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-950"
                            >
                                <img
                                    src={logoSrc}
                                    alt={site}
                                    className="h-16 w-auto md:h-20"
                                />
                            </Link>
                            <h3 className="text-2xl font-bold text-tea-green-400">
                                <Link href="/" className="hover:text-tea-green-300 transition-colors">{site}</Link>
                            </h3>
                            <p className="text-zinc-100 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold uppercase tracking-wide">Explore</h4>
                        <div className="space-y-3">
                            {exploreItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="block text-zinc-100 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* About Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold uppercase tracking-wide">About</h4>
                        <div className="space-y-3">
                            {aboutItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="block text-zinc-100 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold uppercase tracking-wide">Contact Information</h4>
                        <div className="space-y-4">
                            <div>
                                <a href={mailHref} className="text-zinc-100 hover:text-white transition-colors flex items-center space-x-2">
                                    <Mail className="w-4 h-4 shrink-0" aria-hidden />
                                    <span>{email}</span>
                                </a>
                            </div>
                            {phone && (
                                <div>
                                    <a href={phoneHref} className="text-zinc-100 hover:text-white transition-colors flex items-center space-x-2">
                                        <Phone className="w-4 h-4 shrink-0" aria-hidden />
                                        <span>{phone}</span>
                                    </a>
                                </div>
                            )}
                            {address && (
                                <div className="text-zinc-100 flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
                                    <span className="whitespace-pre-line">{address}</span>
                                </div>
                            )}
                            {hours && (
                                <div className="text-zinc-100 flex items-start space-x-2">
                                    <Clock className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
                                    <span className="whitespace-pre-line">{hours}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t border-zinc-800' />

            {/* Bottom Footer */}
            <div className="w-full py-6 px-4 md:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-zinc-400 text-sm text-center md:text-left">
                        Copyright © {currentYear} {site}
                    </div>
                    <a
                        href="https://advantagemediapartners.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white text-xs sm:text-sm hover:text-zinc-300 transition-colors"
                    >
                        <AMPLogo variant="white" />
                        <span className="text-left text-white pr-8">
                            Designed and developed by<br />
                            Advantage Media Partners
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
