import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        tagline: field.text({
            label: 'Hero Tagline',
            default: 'Classes',
        }),
        headline: field.text({
            label: 'Hero Headline',
            default: 'Survival Expo',
        }),
        headlineLine2: field.text({
            label: 'Hero Headline (Line 2)',
            default: '',
        }),
        subheading: field.text({
            label: 'Hero Subheading',
            default: 'Jefferson County Fairgrounds, Golden, Colorado',
        }),
        backgroundImage: field.image({
            label: 'Hero Background',
            default: '/images/hero-04.webp',
        }),
    },
    intro: {
        headline: field.text({
            label: 'Intro Headline',
            default: 'Free off-grid and self-reliant seminars',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Plus AWFA advanced skills',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "November 22, 2025, 10am to 4pm at Jefferson County Fairgrounds in Golden, Colorado.\n\nFree off-grid seminar. Free self-reliant seminar. AWFA advanced skills session: 4 hours, $75 plus two books. WFA, AWFA, WFR, and WALS information available on site.\n\n++**WMO MISSION**++\n\n*To help people prevent medical problems yet cope with those that occur.*\n\nTraining is designed for the out of doors yet may be used in any remote or delayed-response situation.",
        }),
    },
    details: {
        eyebrow: field.text({
            label: 'Details Eyebrow',
            default: 'Why WMO',
        }),
        heading: field.text({
            label: 'Details Heading',
            default: 'What makes WMO unusual',
        }),
        tagline: field.text({
            label: 'Details Tagline',
            default: 'Compassion · Integrity · Proficiency',
        }),
        body: field.textarea({
            label: 'Details Body',
            default: '**WMO has been a part of wilderness medicine standards setting groups since 1994.** Probably the two most recognized standards setting groups based on number of peer reviewed publications with industry signature supporters of 2017 are Wilderness Medical Educators Coalition and [Professional Outdoor Medical Educators](/resource#pome). WMO supports and exceeds the standards / SOPs set by both.',
        }),
        items: field.repeater({
            label: 'Highlights',
            itemSchema: {
                text: field.textarea({ label: 'Highlight', default: '' }),
            },
            default: [
                {
                    text: '**Mature instructors who are outdoor skilled and experienced, and medically unusually highly trained — peace officers, lawyers, firefighters, US military veterans, firearms instructors, expert witnesses, risk managers, guides, rock climbers, mountaineers, and experienced foreign travelers.**',
                },
                {
                    text: 'WMO has trained USMC, Air Force, Coast Guard, and Army personnel. Wilderness medicine teaching traces to 1967 at Colorado State University.',
                },
                {
                    text: 'Core values: teach base knowledge and skills with a high level of retention under stressful conditions.',
                },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Call (303) 688-5176',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default: 'Call [(303) 688-5176](tel:+13036885176) (best 9:00–10:00 am MT) or email [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com) to ask about the expo or to register for class.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
