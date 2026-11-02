'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Global header / navigation
 * BEST FOR: Landing pages, sites with not many pages, sticky or hide-on-scroll nav
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Horizontal nav with logo, phone number, CTA; mobile hamburger and drawer
 * CONTENT ELEMENTS: Logo, phone/mail CTAs, mobile menu with nav links and user profile
 * CONVERSION ROLE: Navigation, primary CTAs (call, contact)
 * IDEAL POSITION: Top of page, fixed or sticky
 * NOTES / MODIFIERS: Hide on scroll down, show on scroll up; responsive mobile menu
 */

import { useState, useEffect, useRef, useCallback } from 'react';

import Link from 'next/link';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { HamburgerButton } from '@/components/UI/HamburgerButton';
import {
  MobileMenu,
  MobileMenuBody,
  MobileMenuFooter,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuPanel,
  MobileMenuTitle,
  MobileMenuTrigger,
} from '@/components/UI/MobileMenu';
import { ScrollArea } from '@/components/UI/ScrollArea';
import { navigationItems } from '@/lib/navigation';
import { AgentProfile } from '@/components/UI/AgentProfile';

const SCROLL_EPSILON = 2;

export type NavigationProps = {
  siteLabel: string;
  phone: string;
  email: string;
};

export function Navigation({ siteLabel, phone, email }: NavigationProps) {
  const telHref = `tel:${phone}`;
  const mailHref = `mailto:${email}`;
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-900 shadow-lg' 
          : 'bg-transparent'
      } ${
        isVisible 
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto py-6 px-4 md:px-8 lg:px-12 flex items-center h-[80px] w-full gap-8">
        {/* Logo on the left */}
        <div className="grow">
          <div className="text-white uppercase tracking-[2px] font-normal text-lg">
            <Link href="/">{siteLabel}</Link>
          </div>
        </div>

        {/* Center navigation items - hidden on mobile */}
        <div className=" grow justify-end hidden lg:flex items-center gap-8">
          {/* Phone number */}
          <a href={telHref} className="text-white uppercase tracking-[1.5px] font-normal text-base hover:opacity-90 transition-opacity">
            {phone}
          </a>
          
          {/* Get Started button */}
          <Button asChild variant="primary">
            <a href="#contact">Get Started</a>
          </Button>
        </div>

        {/* Hamburger menu */}
        <div>
          <MobileMenu>
            <MobileMenuTrigger asChild>
              <HamburgerButton title="Open navigation" />
            </MobileMenuTrigger>
            <MobileMenuPanel>
              <MobileMenuHeader className="bg-zinc-900">
                <AgentProfile variant="dark"
                  ownerName="Alexandra Reed"
                  businessName={siteLabel}
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
                          {navigationItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <MobileMenuLink key={index} href={item.href} className="flex items-center gap-3">
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
                    <MobileMenuLink href={telHref}>
                      <Phone className="h-5 w-5 shrink-0" aria-hidden />
                      <span>{phone}</span>
                    </MobileMenuLink>
                    <MobileMenuLink href={mailHref}>
                      <Mail className="h-5 w-5 shrink-0" aria-hidden />
                      <span>{email}</span>
                    </MobileMenuLink>
                    <MobileMenuLink href="#contact" className="mx-0 md:mx-6 my-1.5 md:my-3">
                      <Button variant="primary" className='w-full'>
                          Contact
                      </Button>
                    </MobileMenuLink>
                  </MobileMenuNav>
                </MobileMenuFooter>
            </MobileMenuPanel>
          </MobileMenu>
        </div>
      </div>
    </div>
  );
}
