import { Link, usePage } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { RiArrowDownSLine } from '@remixicon/react';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/Components/UI/NavigationMenu';
import type { NavItem } from '@/Pages/Public/navigation';
import { cx } from '@/lib/utils';

type NavMegaPanelProps = {
  item: NavItem;
  phone?: string | null;
  className?: string;
};

export default function NavMegaPanel({ item, phone, className }: NavMegaPanelProps) {
  const pathname = usePage().url.split(/[?#]/)[0];
  const children = item.children ?? [];
  const ParentIcon = item.icon;
  const isActive = pathname === item.href || children.some((child) => pathname === child.href);
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
  const ctaEyebrow = item.megaCta?.eyebrow ?? 'Free initial review';
  const ctaHeading = item.megaCta?.heading ?? 'Need an outdoor expert?';
  const ctaBody =
    item.megaCta?.body ??
    'Outdoor recreation case? Call for a free initial review — Carl Weil has worked on 300+ cases as an expert witness.';
  const ctaButtonLabel = item.megaCta?.buttonLabel;
  const ctaButtonHref = item.megaCta?.buttonHref;
  const showCtaEyebrow = Boolean(item.megaCta?.eyebrow ?? !item.megaCta);

  return (
    <NavigationMenuItem className={cx('-mb-px shrink-0', className)}>
      <NavigationMenuTrigger
        asChild
        className={cx(
          'text-white/90 hover:text-white',
          'data-[state=open]:text-white',
          isActive && 'text-white'
        )}
      >
        <Link href={item.href}>
          {item.label}
          <RiArrowDownSLine size={16} aria-hidden />
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="border-0 border-t-2 border-forest-green-600 bg-white text-charcoal-brown-950 shadow-xl">
        <div className="grid grid-cols-1 items-stretch gap-4 md:gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4 md:gap-6 lg:col-span-3">
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="flex items-center gap-2 text-base font-bold tracking-tight text-charcoal-brown-950 md:text-lg">
                {ParentIcon ? <ParentIcon className="h-4 w-4 shrink-0 text-tea-green-500" aria-hidden /> : null}
                {item.label}
              </p>
              {item.description ? (
                <p className="max-w-3xl text-sm font-light leading-relaxed text-charcoal-brown-700 md:text-base">
                  {item.description}
                </p>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {children.map((child) => {
                const Icon = child.icon;
                const childIsActive = pathname === child.href;

                return (
                  <NavigationMenuLink
                    asChild
                    key={child.href}
                    active={childIsActive}
                    className="h-auto px-4 py-3 hover:border-transparent"
                  >
                    <Link
                      href={child.href}
                      className="flex h-auto items-center gap-3 rounded-lg border-none text-charcoal-brown-950 transition-colors hover:bg-forest-green-50 hover:text-forest-green-700"
                    >
                      {Icon ? <Icon className="h-5 w-5 shrink-0 text-forest-green-600" aria-hidden /> : null}
                      <span className="text-sm font-semibold">{child.label}</span>
                    </Link>
                  </NavigationMenuLink>
                );
              })}
            </div>
            {!item.hideViewAll ? (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex h-auto items-center border-none p-0 text-sm font-semibold text-tea-green-600 transition-colors hover:bg-transparent hover:text-forest-green-700"
                >
                  View all
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </Link>
              </NavigationMenuLink>
            ) : null}
          </div>

          <aside
            className="flex h-full flex-col justify-between gap-4 rounded-lg bg-gradient-to-br from-charcoal-brown-900 via-charcoal-brown-950 to-charcoal-brown-950 p-6 text-white md:gap-6 md:p-8"
            aria-label="Call to action"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              {showCtaEyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-400">
                  {ctaEyebrow}
                </p>
              ) : null}
              <p className="text-xl font-bold tracking-tight md:text-2xl">{ctaHeading}</p>
              <p className="text-sm font-light leading-relaxed text-zinc-300">
                {ctaBody}
              </p>
            </div>
            {ctaButtonHref && ctaButtonLabel ? (
              <Link
                href={ctaButtonHref}
                className="inline-flex items-center justify-center bg-tea-green-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-950"
              >
                {ctaButtonLabel}
              </Link>
            ) : phoneHref && phone ? (
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-tea-green-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-950"
                aria-label={`Call ${phone}`}
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Call {phone}
              </a>
            ) : (
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center bg-tea-green-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-forest-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-tea-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-brown-950"
              >
                Contact WMO
              </Link>
            )}
          </aside>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
