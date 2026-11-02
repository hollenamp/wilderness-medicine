import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        headlineLeft: field.text({
            label: 'Hero Headline Left',
            default: 'Wilderness',
        }),
        headlineRight: field.text({
            label: 'Hero Headline Right',
            default: 'Medicine',
        }),
        headlineSub: field.text({
            label: 'Hero Headline Sub (glass)',
            default: 'Outfitters',
        }),
        kicker: field.text({
            label: 'Hero Kicker',
            default: 'Prevent - Assess - Treat',
        }),
        subheading: field.textarea({
            label: 'Hero Subheading',
            default: 'Wilderness Medicine Classes since 1967 — blended/online since 2004.',
        }),
        image: field.image({
            label: 'Hero Image',
            default: '/images/hero-04.webp',
        }),
        imageAlt: field.text({
            label: 'Hero Image Alt Text',
            default: 'Wilderness medicine students practicing field skills',
        }),
        logo: field.image({
            label: 'Hero Logo',
            default: '/images/wilderness-medicine-outfitters-logo-color-01.png',
        }),
    },
    foxTv: {
        heading: field.text({
            label: 'Fox TV Heading',
            default: 'Fox TV !!',
        }),
        headingLine2: field.text({
            label: 'Fox TV Heading Line 2',
            default: 'Carl as seen on several TV Feature Sessions',
        }),
        ctaPrefix: field.text({
            label: 'Fox TV Link Prefix',
            default: 'Click',
        }),
        ctaLabel: field.text({
            label: 'Fox TV Link Label',
            default: 'HERE',
        }),
        ctaSuffix: field.textarea({
            label: 'Fox TV Link Suffix',
            default: 'for TV lesson, download "Car Survival Tips" and "Safe Hiking Tips"',
        }),
        ctaHref: field.text({
            label: 'Fox TV Link',
            default: '/resource',
        }),
        tagline: field.text({
            label: 'Fox TV Tagline',
            default: 'wilderness medicine training since 1967',
        }),
    },
    whyChooseUs: {
        heading: field.text({
            label: 'Why Choose Us Heading',
            default: 'Why Choose Us',
        }),
        cards: field.repeater({
            label: 'Why Choose Us Cards',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                description: field.textarea({ label: 'Description', default: '' }),
                imageSrc: field.image({ label: 'Image', default: '/images/content/practicing-passing-01.jpg' }),
                imageAlt: field.text({ label: 'Image Alt', default: '' }),
            },
            default: [
                {
                    title: 'Training since 1967',
                    description:
                        'One of the longest-running wilderness medicine programs in the industry — Wilderness Medicine Classes since 1967, blended and online since 2004.',
                    imageSrc: '/images/content/practicing-passing-01.jpg',
                    imageAlt: 'Students practicing a litter carry during wilderness medicine training',
                },
                {
                    title: 'Master Fellow leadership',
                    description:
                        'Director Carl Weil is the first Master Fellow of the Academy of Wilderness Medicine, and the first non-physician Fellow.',
                    imageSrc: '/images/content/CARL.jpg',
                    imageAlt: 'Carl Weil at Wilderness Medicine Outfitters in Elizabeth, Colorado',
                },
                {
                    title: 'Fellow-level WFR classes',
                    description:
                        'Every WFR/WEMT class since 2012 includes a Fellow of the Academy of Wilderness Medicine — a distinction WMO says no other school matches.',
                    imageSrc: '/images/content/shadybrook400.jpg',
                    imageAlt: 'Instructor-led wilderness medicine class',
                },
            ],
        }),
    },
    about: {
        heading: field.text({
            label: 'About Heading',
            default: 'About',
        }),
        headingLine2: field.text({
            label: 'About Heading Line 2',
            default: 'Wilderness Medicine Outfitters',
        }),
        paragraph1: field.textarea({
            label: 'About Paragraph 1',
            default:
                'Since 1967, Wilderness Medicine Outfitters has trained people to access and treat injuries and illness when help is hours — not minutes — away. Founded by 3rd-generation guide and 3rd-generation medicinal professional Carl Weil, WMO teaches Wilderness First Aid through Wilderness Advanced Life Support, in person or blended online, at our Elizabeth, Colorado property or your own location.',
        }),
        paragraph2: field.textarea({
            label: 'About Paragraph 2',
            default:
                'Every WFR/WEMT class since 2012 has included at least one Fellow of the Academy of Wilderness Medicine — a distinction WMO says no other school matches. Beyond training, WMO supplies wholesale, factory-direct medical kits and hard-to-find items, and teaches outdoor skills from map & compass to wilderness survival.',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/ring-carry-01.jpg',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Wilderness Medicine Outfitters students with rescue gear on the Elizabeth property',
        }),
        stats: field.repeater({
            label: 'About Highlights',
            itemSchema: {
                text: field.textarea({ label: 'Text', default: '' }),
            },
            default: [
                { text: 'Wilderness Medicine Classes since 1967' },
                {
                    text: '1st wilderness medicine school with Wilderness Medicine Masters degree holder as director',
                },
                { text: 'Student class cap of 24' },
            ],
        }),
    },
    pathways: {
        heading: field.text({
            label: 'Pathways Heading',
            default: 'Train or Consult',
        }),
        intro: field.textarea({
            label: 'Pathways Intro',
            default:
                'Take a blended course on your schedule, or hire Carl Weil as an outdoor recreation expert witness.',
        }),
        items: field.repeater({
            label: 'Pathway Cards',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                description: field.textarea({ label: 'Description', default: '' }),
                eyebrow: field.text({ label: 'Eyebrow', default: '' }),
                stat: field.text({ label: 'Stat', default: '' }),
                href: field.text({ label: 'Link', default: '/distance-learning/other-dl-classes' }),
                ctaLabel: field.text({ label: 'CTA Label', default: 'Learn more' }),
            },
            default: [
                {
                    title: 'Distance Learning',
                    eyebrow: 'Blended since',
                    stat: '2004',
                    description:
                        'Wilderness medicine on your schedule — online lessons plus hands-on skills near you. AWFA, converting AWFA to WFR, EPI, and more.',
                    href: '/distance-learning/other-dl-classes',
                    ctaLabel: 'Explore Distance Learning',
                },
                {
                    title: 'Expert Outdoor Witness',
                    eyebrow: 'Cases worked',
                    stat: '300+',
                    description:
                        'Carl Weil has reviewed about 3,000 outdoor businesses and worked on 300+ cases. Free initial review — call (303) 688-5176.',
                    href: '/expert-witness',
                    ctaLabel: 'Explore Expert Witness',
                },
            ],
        }),
    },
    courses: {
        heading: field.text({
            label: 'Featured Courses Heading',
            default: 'Featured Courses',
        }),
        items: field.repeater({
            label: 'Featured Courses',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                imageSrc: field.image({ label: 'Image', default: '/images/content/web3half.jpg' }),
                imageAlt: field.text({ label: 'Image Alt', default: '' }),
                badge: field.text({ label: 'Badge (optional)', default: '' }),
                durationLabel: field.text({ label: 'Duration Label', default: 'Duration' }),
                durationValue: field.text({ label: 'Duration Value', default: '' }),
                href: field.text({ label: 'Link', default: '/classes' }),
                ctaLabel: field.text({ label: 'CTA Label', default: 'View More' }),
                features: field.textarea({ label: 'Features (one per line)', default: '' }),
            },
            default: [
                {
                    title: 'Wilderness First Aid',
                    imageSrc: '/images/content/web3half.jpg',
                    imageAlt: 'Wilderness First Aid skills practice',
                    badge: 'Blended',
                    durationLabel: 'Duration',
                    durationValue: '16 hrs',
                    href: '/classes/wfa16',
                    ctaLabel: 'View More',
                    features:
                        '16 hours\nIn person or blended\n4 online lessons\nHands-on skills\nYour location or ours\nCap of 24',
                },
                {
                    title: 'Wilderness First Aid Intermediate',
                    imageSrc: '/images/content/water_mid.jpg',
                    imageAlt: 'Intermediate wilderness first aid training',
                    badge: '',
                    durationLabel: 'Duration',
                    durationValue: '24 hrs',
                    href: '/classes/wfa24',
                    ctaLabel: 'View More',
                    features:
                        '24 hours\nIn person or blended\nExpanded skills\n4 online lessons\nNationwide classes\nCap of 24',
                },
                {
                    title: 'Advanced Wilderness First Aid',
                    imageSrc: '/images/content/ring-carry-01.jpg',
                    imageAlt: 'Advanced wilderness first aid field session',
                    badge: '',
                    durationLabel: 'Duration',
                    durationValue: '4 days',
                    href: '/classes/awfa',
                    ctaLabel: 'View More',
                    features:
                        '4 days in person\nOr blended format\n6 online lessons\n2 days of skills\nCertification track\nCap of 24',
                },
                {
                    title: 'Wilderness First Responder / WEMT',
                    imageSrc: '/images/content/shadybrook400.jpg',
                    imageAlt: 'Wilderness First Responder class',
                    badge: 'College credit',
                    durationLabel: 'Duration',
                    durationValue: '9 days',
                    href: '/classes/wfr',
                    ctaLabel: 'View More',
                    features:
                        '9 days or 6 weeks\nIn person or blended\n~60 online lessons\n5-day skills session\nCollege credit\nFellow instructor',
                },
            ],
        }),
    },
    upcomingClasses: {
        heading: field.text({
            label: 'Upcoming Classes Heading',
            default: 'Upcoming Classes',
        }),
        intro: field.textarea({
            label: 'Upcoming Classes Intro',
            default:
                'Dates vary — call (303) 688-5176 to confirm a session or host a class in your town.',
        }),
        items: field.repeater({
            label: 'Upcoming Classes',
            itemSchema: {
                name: field.text({ label: 'Upcoming Class', default: '' }),
                description: field.textarea({ label: 'Class Description', default: '' }),
                location: field.text({ label: 'Class Location', default: '' }),
            },
            default: [
                {
                    name: 'WMO Mission',
                    description: 'Help prevent medical problems and treat those not prevented.',
                    location: 'Access and treat what occurs',
                },
                {
                    name: '27 Free Mini-Lessons — Group 1, online',
                    description: 'Register free by emailing mediccarl@gmail.com.',
                    location: 'Applicable for many credential recertifications',
                },
                {
                    name: '10 to 30 FAWM Credits for WMS members',
                    description: 'Taught by an MD and Wilderness Medicine Master.',
                    location: 'Utah & Colorado',
                },
                {
                    name: '20-hour Wilderness First Aid',
                    description: '4 lessons online followed by a 4-hour skill session.',
                    location: 'In person or Zoom skills — (303) 688-5176',
                },
                {
                    name: 'WFA blended classes',
                    description: 'Monthly, April through August.',
                    location: 'Pennsylvania, Louisiana, Kansas, Colorado, Utah, Idaho, or your town',
                },
                {
                    name: 'EMR & AWFA',
                    description:
                        'EMR / AWFA module blended: 11 online lessons plus Zoom. Medical skills for self-reliant outdoors folk.',
                    location: 'Your town',
                },
                {
                    name: 'WFA Texto Español',
                    description: 'Bilingual English/Spanish, Washington, New Mexico, Arkansas.',
                    location: 'English is the class language; WFA Texto Español also available',
                },
                {
                    name: 'Ordering supplies',
                    description:
                        'Email to confirm in stock; confirm shipping address — call for foreign shipping.',
                    location: 'You pay state taxes',
                },
            ],
        }),
    },
});
