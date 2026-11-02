import {
    Mail,
    Gavel,
    Mountain,
    Target,
    Trees,
    Tent,
    GraduationCap,
    BookOpen,
    RefreshCw,
    Library,
    Clapperboard,
    Syringe,
    BadgeCheck,
    MessageSquareQuote,
    User,
    HelpCircle,
    Users,
    Images,
    ClipboardList,
    MapPin,
    Shield,
    Link2,
    Bird,
    Sun,
    Wallet,
    Newspaper,
    ShoppingBag,
    HeartPulse,
    Flame,
    Pill,
    Package,
    Shirt,
    type LucideIcon,
} from 'lucide-react';
import { defineNavigation } from '@/Components/CMS/defineNavigation';

export type NavMegaCta = {
    eyebrow?: string;
    heading: string;
    body: string;
    /** When set, mega-menu CTA shows this link instead of the phone fallback. */
    buttonLabel?: string;
    buttonHref?: string;
};

export type NavItem = {
    label: string;
    href: string;
    icon?: LucideIcon;
    children?: NavItem[];
    /** Optional intro copy shown under the mega-menu panel title. */
    description?: string;
    megaCta?: NavMegaCta;
    /** When true, the mega-menu omits the "View all" link under the child grid. */
    hideViewAll?: boolean;
};

const mainDefaults: NavItem[] = [
    {
        label: 'Classes',
        href: '/classes-information',
        icon: GraduationCap,
        hideViewAll: true,
        megaCta: {
            heading: 'To Register',
            body: 'Mail a check or pay by PayPal, then call to lock your seat. Spots go by first call after payment is in the mail.',
            buttonLabel: 'Learn More',
            buttonHref: '/to-register',
        },
        children: [
            { label: 'Wilderness First Responder (WFR) / Wilderness Emergency Medical Technician (WEMT)', href: '/classes/wfr', icon: GraduationCap },
            { label: 'Wilderness First Responder (WFR) Recertification', href: '/classes/wilderness-first-responder-recertification-course', icon: RefreshCw },
            { label: 'Wilderness Advanced Life Support (WALS) Expedition Medic', href: '/classes/wals', icon: HeartPulse },
            { label: 'Become an Instructor / Leave No Trace (LNT) Trainer', href: '/classes/become-instructor-lnt-trainer', icon: BadgeCheck },
            { label: 'Class at your Location', href: '/classes/setting-class-your-location', icon: MapPin },
            { label: 'Hard [Survival] Skills', href: '/classes/hard-survival-skills', icon: Flame },
            { label: 'Wilderness First Aid (WFA) 16 Hr', href: '/classes/wfa16', icon: BookOpen },
            { label: 'Wilderness First Aid (WFA) 20 Hr', href: '/classes/wfa20', icon: BookOpen },
            { label: 'Wilderness First Aid (WFA) 24 Hr', href: '/classes/wfa24', icon: BookOpen },
            { label: 'Advanced Wilderness First Aid(AWFA) & Emergency Medical Respond (EMR)', href: '/classes/awfa', icon: BookOpen },
            { label: 'Anaphylaxis and Epinephrine', href: '/classes/epi', icon: Syringe },
            { label: 'Leave No Trace', href: '/classes/leave-no-trace', icon: Trees },
        ],
    },
    {
        label: 'Distance Blended Learning',
        href: '/distance-learning/other-dl-classes',
        icon: GraduationCap,
        hideViewAll: true,
        megaCta: {
            eyebrow: 'Blended since 2004',
            heading: 'Train on your schedule',
            body: 'Distance learning wilderness medicine — online lessons plus hands-on skills near you. Call (303) 688-5176 to get started.',
        },
        children: [
            { label: 'Wilderness First Aid - Boy Scouts of America (WFA-BSA)', href: '/wfa-bsa', icon: Tent },
            { label: 'Advanced Wilderness First Aid (AWFA)', href: '/distance-learning/awfa', icon: BookOpen },
            {
                label: 'Converting Advanced Wilderness First Aid (AWFA) to Wilderness First Responder (WFR)',
                href: '/distance-learning/converting-awfa-wfr',
                icon: RefreshCw,
            },
            {
                label: 'Other Distance Learning (DL) Classes',
                href: '/distance-learning/other-dl-classes',
                icon: Library,
            },
            {
                label: 'Distance Learning (DL) Promo Video',
                href: '/distance-learning/promo',
                icon: Clapperboard,
            },
            { label: 'Epinephrine (EPI) Course', href: '/epi-course', icon: Syringe },
        ],
    },
    {
        label: 'Expert Outdoor Witness',
        href: '/expert-witness',
        icon: Gavel,
        hideViewAll: true,
        description:
            'Approximately 325 cases involving 40% defence clients and 60% plaintiffs. Carl looks at the facts and shares with documentation the Good the Bad and the Confusing.',
        children: [
            {
                label: 'Climbing Gyms, Rock Climbing, Mountaineering',
                href: '/expert-page-rock-climbing-gyms-traditional-climbing-and-mountaineering',
                icon: Mountain,
            },
            {
                label: 'Archery, Shotguns, Rifles, and Pistols',
                href: '/expert-page-shooting-activities-archery-pistol-shotgun-and-rifle',
                icon: Target,
            },
            { label: 'Horses, Horse Events, Ranching', href: '/expert-page-horses-livestock-ranches', icon: Trees },
            { label: 'Camps - Guest Ranches', href: '/expert-page-camps-and-guest-ranches', icon: Tent },
        ],
    },
    {
        label: 'Store',
        href: '/store',
        icon: ShoppingBag,
        megaCta: {
            eyebrow: 'Call to order',
            heading: 'Kits, books, and gear',
            body: 'Browse the Wilderness Medicine Outfitters catalog. Call (303) 688-5176 to purchase any product.',
        },
        children: [
            { label: 'Books', href: '/store/books', icon: Library },
            { label: 'Blended Learning', href: '/store/blended-learning', icon: GraduationCap },
            { label: 'Distance Learning', href: '/store/distance-learning', icon: BookOpen },
            { label: 'In-person Classes', href: '/store/in-person', icon: Users },
            { label: 'Medical Kits', href: '/store/medical-kit', icon: HeartPulse },
            { label: 'Survival Items', href: '/store/survival-items', icon: Flame },
            { label: 'Over the Counter Med Items', href: '/store/over-the-counter-med-items', icon: Pill },
            { label: 'Individual Items', href: '/store/individual-items', icon: Package },
            { label: 'Non-Medical Items', href: '/store/non-medical-items', icon: Shirt },
        ],
    },
    {
        label: 'About WMO',
        href: '/why-choose-wmo',
        icon: BadgeCheck,
        hideViewAll: true,
        megaCta: {
            eyebrow: 'Since 1967',
            heading: 'The oldest wilderness medicine school',
            body: 'WMO answers yes to the quality questions that matter — Fellow-taught WFR classes, recertification almost anywhere, and personal attention since 1967. Call (303) 688-5176.',
        },
        children: [
            { label: 'Why choose WMO', href: '/why-choose-wmo', icon: BadgeCheck },
            { label: 'Contact Us', href: '/contact-us', icon: Mail },
            { label: 'Testimonials', href: '/wmo-testimonials', icon: MessageSquareQuote },
            { label: 'Director', href: '/director-carl-weil', icon: User },
            { label: 'Common Questions', href: '/faq-page', icon: HelpCircle },
            { label: 'WMO Instructors', href: '/staff-members', icon: Users },
            { label: 'Gallery', href: '/gallery', icon: Images },
            { label: 'Students must Read', href: '/new-students-information', icon: ClipboardList },
            { label: 'Under Age 21', href: '/under-age-21', icon: Shield },
            { label: 'Links', href: '/links', icon: Link2 },
            { label: 'Elizabeth Wildlife', href: '/elizabeth-wildlife', icon: Bird },
            { label: 'Solar Facilities', href: '/solar-facilities', icon: Sun },
            { label: 'Why PayPal?', href: '/why-paypal', icon: Wallet },
        ],
    },
    { label: 'Resource', href: '/resource', icon: BookOpen },
    { label: 'Blog', href: '/blog', icon: Newspaper },
    { label: 'Contact Us', href: '/contact-us', icon: Mail },
];

/** Top-level header items that collapse into the "More" dropdown below 2xl. */
export const headerMoreItemHrefs = ['/resource', '/blog', '/contact-us'] as const;

export function isHeaderMoreItem(item: NavItem): boolean {
    return (headerMoreItemHrefs as readonly string[]).includes(item.href) && !item.children?.length;
}

/**
 * Source of truth for navigation locations: stable keys, admin labels, and
 * default items. PHP only stores opaque menu rows keyed by these location slugs.
 */
export const navigation = defineNavigation({
    header: {
        label: 'Header Navigation',
        defaults: mainDefaults,
    },
    footer: {
        label: 'Footer Navigation',
        defaults: mainDefaults,
    },
});

export type NavigationLocation = keyof typeof navigation;

export const navigationLocations = (
    Object.entries(navigation) as [NavigationLocation, (typeof navigation)[NavigationLocation]][]
).map(([key, value]) => ({
    key,
    label: value.label,
}));
