import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        tagline: field.text({
            label: 'Hero Tagline',
            default: 'About WMO',
        }),
        headline: field.text({
            label: 'Hero Headline',
            default: "Elizabeth Wildlife",
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
            default: "Elizabeth Wildlife",
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: "No hunting, only target practice",
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "Smart deer hiding in the WMO target range (no hunting, only target practice)",
        }),
    },
    photos: {
        eyebrow: field.text({
            label: 'Photos Eyebrow',
            default: 'Photos',
        }),
        title: field.text({
            label: 'Photos Title',
            default: "Wildlife at the Elizabeth property",
        }),
        description: field.textarea({
            label: 'Photos Description',
            default: "Wilderness First Responder students in Elizabeth see amazing wild life.",
        }),
        items: field.repeater({
            label: 'Photos',
            itemSchema: {
                src: field.image({ label: 'Image', default: '' }),
                alt: field.text({ label: 'Alt text', default: '' }),
            },
            default: [
                {
                    src: "/images/content/hawk.jpg",
                    alt: "Wilderness First Responder students in Elizabeth see amazing wild life",
                },
                {
                    src: "/images/content/Deer1.jpg",
                    alt: "Smart deer hiding in the WMO target range (no hunting, only target practice)",
                },
                {
                    src: "/images/content/Deer2.jpg",
                    alt: "Smart deer hiding in the WMO target range (no hunting, only target practice)",
                },
                {
                    src: "/images/content/DeerClose3.jpg",
                    alt: "Smart deer hiding in the WMO target range (no hunting, only target practice)",
                },
                {
                    src: "/images/content/deer4.jpg",
                    alt: "Smart deer hiding in the WMO target range (no hunting, only target practice)",
                },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: "Call (303) 688-5176",
        }),
        body: field.textarea({
            label: 'CTA Body',
            default: "Call [(303) 688-5176](tel:+13036885176) (best 9:00–10:00 am MT) or email [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com).",
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: "Prefer to write it out? Use the contact page",
        }),
    },
});
