/**
 * **CURSOR INFO**
 * SECTION TYPE: Site footer with links and contact
 * BEST FOR: Every page, global footer
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Multi-column grid (brand, explore, contact, etc.), bottom bar
 * CONTENT ELEMENTS: Logo, tagline, nav links, contact info, social icons, copyright
 * CONVERSION ROLE: Navigation, contact, trust
 * IDEAL POSITION: Bottom of page
 * NOTES / MODIFIERS: Accepts optional className, no client directive (server-safe)
 */

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { AMPLogo } from '@/components/UI/AMPLogo';
import { navigationItems } from '@/lib/navigation';
import type { SiteConfig } from '@/lib/siteConfig';
import { FacebookIcon, InstagramIcon } from '@/components/svg-icons';

type FooterProps = {
  className?: string;
  siteConfig: Pick<SiteConfig, 'site' | 'description' | 'email' | 'phone' | 'address'>;
};

export function Footer({ className, siteConfig }: FooterProps) {
  const { site, description, email, phone, address } = siteConfig;
  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone}`;
  const currentYear = format(new Date(), 'yyyy');

  return (
    <div className={`bg-zinc-900 text-white overflow-hidden ${className}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto py-6 md:py-16 lg:py-24 px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gold-500 mb-4">
                <Link href="/" className="hover:text-gold-400 transition-colors">{site}</Link>
              </h3>
              <p className="text-zinc-100 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gold-500 text-zinc-900 flex items-center justify-center" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gold-500 text-zinc-900 flex items-center justify-center" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold uppercase tracking-wide">Explore</h4>
            <div className="space-y-3">
              {navigationItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="block text-zinc-100 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold uppercase tracking-wide">Hours</h4>
            <div className="text-zinc-100">
              <p>Mon-Fri</p>
              <p>9am-6pm</p>
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
              <div> 
                <a href={telHref} className="text-zinc-100 hover:text-white transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden />
                  <span>{phone}</span>
                </a>
              </div>
              <div className="text-zinc-100">
                <p className="whitespace-pre-line">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-zinc-800' />

      {/* Bottom Footer */}
      <div className="container mx-auto py-6 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-zinc-400 text-sm">
            Copyright © {currentYear} {site}
          </div>
          <div className="flex flex-end space-x-6 mt-4 md:mt-0">
            <a href="https://advantagemediapartners.com" target="_blank" className="flex items-center gap-2 text-white text-xs sm:text-sm hover:text-zinc-300 transition-colors">
              <span>
                <AMPLogo variant="zinc" />
              </span>
              <span className="text-left text-zinc-400">
                Designed and developed by<br />
                Advantage Media Partners
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
