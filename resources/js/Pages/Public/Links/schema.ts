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
            default: "Links",
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
            default: 'Links',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Organizations, gear, and training partners',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "A short list of organizations, gear makers, and training partners WMO students often find useful.",
        }),
    },
    links: {
        eyebrow: field.text({
            label: 'Links Eyebrow',
            default: 'Partners and resources',
        }),
        heading: field.text({
            label: 'Links Heading',
            default: 'Recommended links',
        }),
        intro: field.textarea({
            label: 'Links Intro',
            default: "AMGA recognizes the Wilderness First Responders training module that Wilderness Medicine Outfitter's teaches.",
        }),
        items: field.repeater({
            label: 'Links',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                description: field.textarea({ label: 'Description', default: '' }),
            },
            default: [
                {
                    title: "Gunjitsu.com - Advanced pistol training",
                    description: "Civilian's focus and goals based on the use of a weapon in a defensive situation. Designed for civilian who chooses to carry or use firearms for self-protection needs. A good place for WMOs: WFA, WFR, WEMT, WALS to broaden their skills. [Link](http://www.gunjitsu.net)"
                },
                {
                    title: "Wilderness Medicine Facebook page",
                    description: "A portal of sharing Wilderness Medicine information. WMOs: WFA, WFR, WEMT, WALS trained caregivers can send in their questions for the latest information and read about new information in the field of Wilderness Medicine. [Link](http://www.facebook.com/WildernessMedicineOutfitters)"
                },
                {
                    title: "BrookSidePress.org",
                    description: "Medical Education Products for medical providers working in isolated, wilderness, and military environments. [Link](http://www.brooksidepress.org/)"
                },
                {
                    title: "TechSpun",
                    description: "TechSpun's \"Environmental Sock System\" with a guaranteed comfort range of -40F to 120F, do not feel, look, wear or perform like any other sock. [Link](http://www.techspun.com)"
                },
                {
                    title: "California Whitewater Rafting",
                    description: "California Whitewater Rafting is an informational website designed to give rafters the best possible information about rafting in California, including outfitters, lodging, restaurants, directions, and details about popular whitewater runs. [Link](http://www.c-w-r.com)"
                },
                {
                    title: "Hollowtop Outdoor Primitive School, LLC",
                    description: "Learn about nature by developing your primitive skills with shelter, fire, water, and food. Silver Star, MT 59751. [Link](http://www.hollowtop.com)"
                },
                {
                    title: "ENGO Foot Care Products",
                    description: "ENGO friction and Blister relief products perfect for WMOs: WFA, WFR, WEMT trained caregivers. [Link](http://www.goengo.com)"
                },
                {
                    title: "Wilderness Medical Society",
                    description: "Founded in 1983. An international non profit medical group serving the medical interests of the outdoor and wilderness community. Offering annual seminar meetings. WMS hosts the Academy of Wilderness Medicine and the FAWM program. Salt Lake City, UT (801) 990-2988. [Link](http://www.wms.org)"
                },
                {
                    title: "American Mountain Guides Association",
                    description: "The American Mountain Guides Association, AMGA, is a non-profit association of professional mountain guides working throughout the United States. AMGA requires the successful completion of a Wilderness First Responders training module in the certification process of all their guides. AMGA recognizes the Wilderness First Responders training module that Wilderness Medicine Outfitter's teaches. [Link](http://amga.com)"
                },
                {
                    title: "Bent Gate Mountaineering",
                    description: "Golden, Colorado. [Link](http://www.bentgate.com)"
                },
                {
                    title: "Survival World.com",
                    description: "[Link](http://www.survivalworld.com)"
                },
                {
                    title: "Katadyn",
                    description: "The Premiere manufacturer of water filters, water treatments, dehydrated foods and backpacker Optimus line stoves. Perfect equipment for the WFA and WRF trained outdoorsman. [Link](http://www.katadyn.com)"
                },
                {
                    title: "Zanfel",
                    description: "Poison plant prevention information for the WFA and WFR trained. most importantly this is the treatment. [Link](http://www.zanfel.com)"
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
