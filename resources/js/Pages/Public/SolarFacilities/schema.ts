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
            default: "Solar Facilities",
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
            default: "Solar Facilities",
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: "Wind, panels, showers, and trackers",
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "**Wilderness Medicine students train at a campus that uses wind, solar electricity, solar hot water, and solar heat.**",
        }),
    },
    photos: {
        eyebrow: field.text({
            label: 'Photos Eyebrow',
            default: 'Photos',
        }),
        title: field.text({
            label: 'Photos Title',
            default: "Solar facilities at WMO",
        }),
        description: field.textarea({
            label: 'Photos Description',
            default: "Wind generator power, fixed solar panels, phase change water heater, hot air heating panels, simple solar summer shower hot water, solar electricity for the student cabin, and a solar tracker.",
        }),
        items: field.repeater({
            label: 'Photos',
            itemSchema: {
                src: field.image({ label: 'Image', default: '' }),
                alt: field.text({ label: 'Alt text', default: '' }),
            },
            default: [
                {
                    src: "/images/content/WMOSign.jpg",
                    alt: "Wilderness Medicine students",
                },
                {
                    src: "/images/content/Solar1.jpg",
                    alt: "Wind Generator power",
                },
                {
                    src: "/images/content/Solar2.jpg",
                    alt: "Fixed Solar Panels",
                },
                {
                    src: "/images/content/Solar3.jpg",
                    alt: "Phase Change Water Heater",
                },
                {
                    src: "/images/content/Solar4.jpg",
                    alt: "Hot Air Heating Panels",
                },
                {
                    src: "/images/content/Solar5.jpg",
                    alt: "Simple Solar Summer Shower Hot Water",
                },
                {
                    src: "/images/content/Solar6.jpg",
                    alt: "Solar Electricity for Student Cabin",
                },
                {
                    src: "/images/content/Solar7.jpg",
                    alt: "Solar Tracker",
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
