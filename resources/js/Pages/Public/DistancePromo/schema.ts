import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        tagline: field.text({
            label: 'Hero Tagline',
            default: 'Distance Learning',
        }),
        headline: field.text({
            label: 'Hero Headline',
            default: 'Distance Learning Promo video',
        }),
        headlineLine2: field.text({
            label: 'Hero Headline (Line 2)',
            default: '',
        }),
        subheading: field.text({
            label: 'Hero Subheading',
            default: '',
        }),
        backgroundImage: field.image({
            label: 'Hero Background',
            default: '/images/hero-04.webp',
        }),
    },
    intro: {
        headline: field.text({
            label: 'Intro Headline',
            default: 'Distance Learning Promo video',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Wilderness Medicine Outfitters',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: '',
        }),
    },
    video: {
        src: field.text({
            label: 'Video File',
            default: '/videos/WMO-DLPromo1-480x360.mp4',
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Ready to start a distance learning course?',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) to enroll in AWFA, WFA-BSA, EPI, or another distance learning course.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
