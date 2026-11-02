/**
 * **CURSOR INFO**
 * SECTION TYPE: Global header / navigation
 * BEST FOR: Landing pages, sites with not many pages, sticky or hide-on-scroll nav
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-width nav grid with logo left, centered link bar (mega-menu capable), CTA right; mobile hamburger and drawer
 * CONTENT ELEMENTS: Logo, nav links, mega-menu panel for items with children (optional description under the panel title), dark CTA column with phone or Learn More link, mail CTA, mobile menu with section anchors, nested groups, and user profile
 * CONVERSION ROLE: Navigation, primary CTA (get in touch), mega-menu phone or page CTA
 * IDEAL POSITION: Top of page, fixed, overlaying the hero
 * NOTES / MODIFIERS: Hide on scroll down, show on scroll up via `top` (not transform) so a fixed mega-menu panel can span the full viewport; mega-menu uses a 4-column layout with a contact/page CTA in the last column; Resource, Blog, and Contact Us collapse into a More dropdown below 2xl; responsive mobile menu with nested groups
 */

import { Link, usePage } from '@inertiajs/react';

import { useState, useEffect, useRef, useCallback } from 'react';

import { Mail, ChevronDown } from 'lucide-react';
import { Button } from '../../UI/Button';
import { HamburgerButton } from '../../UI/HamburgerButton';
import {
  MobileMenu,
  MobileMenuBody,
  MobileMenuFooter,
  MobileMenuGroup,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuPanel,
  MobileMenuTitle,
  MobileMenuTrigger,
} from '../../UI/MobileMenu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../UI/NavigationMenu';
import { ScrollArea } from '../../UI/ScrollArea';
import { isHeaderMoreItem, type NavItem } from '@/Pages/Public/navigation';
import { AgentProfile } from '../../UI/AgentProfile';
import { cx } from '@/lib/utils';
import NavMegaPanel from './mega-nav/NavMegaPanel';
import NavMorePanel from './mega-nav/NavMorePanel';

const SCROLL_EPSILON = 2;

export type NavigationProps = {
  siteLabel: string;
  email: string;
  phone?: string | null;
  ownerName?: string;
  items: NavItem[];
};

type HeaderNavItemProps = {
  item: NavItem;
  phone?: string | null;
  className?: string;
};

function HeaderNavItem({ item, phone, className }: HeaderNavItemProps) {
  const pathname = usePage().url.split(/[?#]/)[0];

  if (item.children?.length) {
    return <NavMegaPanel item={item} phone={phone} className={cx('shrink-0', className)} />;
  }

  const isActive = pathname === item.href;

  return (
    <NavigationMenuItem className={cx('-mb-px shrink-0', className)}>
      <NavigationMenuLink asChild active={isActive}>
        <Link
          href={item.href}
          className={cx(
            'h-auto whitespace-nowrap border-none py-0 text-sm font-medium',
            isActive ? 'text-white' : 'text-white/90 hover:text-white'
          )}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function Navigation({ siteLabel, email, phone, ownerName, items }: NavigationProps) {
  const mailHref = `mailto:${email}`;
  const moreItems = items.filter(isHeaderMoreItem);
  const primaryItems = items.filter((item) => !isHeaderMoreItem(item));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportReady, setViewportReady] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollHeight, clientHeight, scrollTop } = el;
    const hasOverflow = scrollHeight > clientHeight;
    setShowBottomIndicator(
      hasOverflow && scrollTop + clientHeight < scrollHeight - SCROLL_EPSILON
    );
    setShowTopIndicator(hasOverflow && scrollTop > SCROLL_EPSILON);
  }, []);

  const viewportRefCallback = useCallback((el: HTMLDivElement | null) => {
    viewportRef.current = el;
    if (el) setViewportReady(true);
  }, []);

  useEffect(() => {
    if (!viewportReady || !viewportRef.current) return;
    updateScrollIndicators();
    const ro = new ResizeObserver(updateScrollIndicators);
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [viewportReady, updateScrollIndicators]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Determine scroll direction
      if (scrollTop > lastScrollY && scrollTop > 100) {
        // Scrolling down - hide nav
        setIsVisible(false);
      } else if (scrollTop < lastScrollY) {
        // Scrolling up - show nav
        setIsVisible(true);
      }

      // At the top of the page, always show nav
      if (scrollTop < 10) {
        setIsVisible(true);
      }

      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      // `top`/`-top-20` (not translate) so a transform ancestor never traps the
      // fixed-position mega-menu panel inside the nav's own stacking context.
      className={`fixed left-0 right-0 z-50 transition-[top,background-color,box-shadow] duration-300 ${
        isScrolled
          ? 'bg-zinc-900 shadow-lg'
          : 'bg-transparent'
      } ${
        isVisible
          ? 'top-0'
          : '-top-20'
      }`}
    >
      <div className="grid h-[80px] w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:gap-6 md:px-8 lg:gap-8 lg:px-12">
        {/* Logo on the left */}
        <div className="justify-self-start shrink-0">
          <div className="text-white uppercase tracking-[2px] font-normal text-sm">
            <Link href="/">{siteLabel}</Link>
          </div>
        </div>

        {/* Center navigation items - hidden on mobile */}
        <NavigationMenu className="hidden lg:flex justify-self-center">
          <NavigationMenuList className="h-[80px] flex-nowrap">
            {primaryItems.map((item) => (
              <HeaderNavItem key={item.label} item={item} phone={phone} />
            ))}
            {moreItems.map((item) => (
              <HeaderNavItem key={item.label} item={item} phone={phone} className="max-2xl:hidden" />
            ))}
            {moreItems.length > 0 ? <NavMorePanel items={moreItems} className="2xl:hidden" /> : null}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA - hidden on mobile */}
        <div className="hidden lg:flex justify-self-end items-center gap-8">
          <Button asChild variant="primary">
            <Link href="/contact-us">Contact WMO</Link>
          </Button>
        </div>

        {/* Hamburger menu */}
        <div className="lg:hidden col-start-3 justify-self-end">
          <MobileMenu>
            <MobileMenuTrigger asChild>
              <HamburgerButton title="Open navigation" />
            </MobileMenuTrigger>
            <MobileMenuPanel variant="primary">
              <MobileMenuHeader className="bg-zinc-900">
                <AgentProfile variant="dark"
                  ownerName={ownerName ?? siteLabel}
                />
              </MobileMenuHeader>
                <div className="relative grow min-h-0 flex flex-col">
                  <ScrollArea
                    className="grow min-h-0"
                    viewportRef={viewportRefCallback}
                    onViewportScroll={updateScrollIndicators}
                  >
                    <MobileMenuBody>
                        <MobileMenuTitle>Menu</MobileMenuTitle>
                        <MobileMenuNav>
                          {items.map((item) => {
                            const Icon = item.icon;
                            if (item.children?.length) {
                              return (
                                <MobileMenuGroup key={item.label} label={item.label} href={item.href}>
                                  {item.children.map((child) => {
                                    const ChildIcon = child.icon;
                                    return (
                                      <MobileMenuLink key={child.href} href={child.href} className="flex items-center gap-3">
                                        {ChildIcon ? <ChildIcon className="h-4 w-4 shrink-0" aria-hidden /> : null}
                                        <span>{child.label}</span>
                                      </MobileMenuLink>
                                    );
                                  })}
                                </MobileMenuGroup>
                              );
                            }
                            return (
                              <MobileMenuLink key={item.label} href={item.href} className="flex items-center gap-3">
                                { Icon ? <Icon className="h-5 w-5 shrink-0" aria-hidden /> : null }
                                <span>{item.label}</span>
                              </MobileMenuLink>
                            );
                          })}
                        </MobileMenuNav>
                    </MobileMenuBody>
                  </ScrollArea>
                  {showTopIndicator && (
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10"
                      aria-hidden
                    />
                  )}
                  {showBottomIndicator && (
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 flex flex-col items-center z-10 "
                      aria-hidden
                    >
                      <div className="h-4 w-full bg-gradient-to-t from-white to-transparent flex items-center justify-center">
                        <ChevronDown className="h-4 w-4 text-zinc-400 -mt-5 shrink-0" />
                      </div>
                    </div>
                  )}
                </div>
                <MobileMenuFooter>
                  
                  <MobileMenuNav orientation="vertical">
                    <MobileMenuLink href={mailHref}>
                      <Mail className="h-5 w-5 shrink-0" aria-hidden />
                      <span>{email}</span>
                    </MobileMenuLink>
                    <Button variant="primary" className='w-full' asChild>
                      <MobileMenuLink href="/contact-us" className="mx-0 md:mx-6 my-1.5 md:my-3">
                            Contact WMO
                      </MobileMenuLink>
                    </Button>
                  </MobileMenuNav>
                </MobileMenuFooter>
            </MobileMenuPanel>
          </MobileMenu>
        </div>
      </div>
    </div>
  );
}
