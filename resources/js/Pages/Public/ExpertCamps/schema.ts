import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        tagline: field.text({
            label: 'Hero Tagline',
            default: 'Expert Outdoor Witness',
        }),
        headline: field.text({
            label: 'Hero Headline',
            default: 'Camps - Guest Ranches',
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
            default: 'Expert Page on Camps and Guest Ranches',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Call now [(303) 688-5176](tel:+13036885176) with a brief essence of the case and facility location',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'Or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Carl has reviewed over 200 camps. Recommendation on case in this field below. Other recommendation’s available.',
        }),
    },
    about: {
        eyebrow: field.text({
            label: 'About Eyebrow',
            default: 'Camps & guest ranches',
        }),
        title: field.text({
            label: 'About Title',
            default: 'Youth camps, adult camps, and guest ranches',
        }),
        body: field.textarea({
            label: 'About Body',
            default:
                '**Expertise in youth camps such as 4H, Boy Scouts, Girl Scouts and others for youth and adults including guest or dude ranches. Mr. Weil is available for consult on plaintiff or defendant cases. Expert case reports are available. Free initial evaluation on first call [(303) 688-5176](tel:+13036885176).**',
        }),
        supportContent: field.textarea({
            label: 'About Support Content',
            default:
                'Some of the camps teach or facilitate special skills such as horse riding, camping or craft skills. Other camps are more fun vacation locations such as guest ranches. Many of the camps are seasonal usually operating primarily in the summer.',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/shadybrook400.jpg',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Camp and guest ranch setting',
        }),
        trustSignals: field.repeater({
            label: 'Trust Signals',
            itemSchema: {
                value: field.text({ label: 'Value', default: '' }),
                label: field.text({ label: 'Label', default: '' }),
            },
            default: [
                { value: '200+', label: 'Camps reviewed, including youth, adult, and guest ranch programs' },
                { value: 'Overnight', label: 'Experience with injured-camper cases at overnight camps' },
                { value: 'Free', label: 'Initial evaluation on the first call — (303) 688-5176' },
            ],
        }),
    },
    letter: {
        eyebrow: field.text({
            label: 'Letter Eyebrow',
            default: 'Letter of recommendation',
        }),
        heading: field.text({
            label: 'Letter Heading',
            default: 'Recommendation from a youth camp case',
        }),
        intro: field.textarea({
            label: 'Letter Intro',
            default: 'Recommendation from a youth camp case involving an injured camper at an overnight camp.',
        }),
        items: field.repeater({
            label: 'Letters',
            itemSchema: {
                name: field.text({ label: 'Name', default: '' }),
                title: field.text({ label: 'Title', default: '' }),
                testimonial: field.textarea({ label: 'Letter', default: '' }),
                date: field.text({ label: 'Date', default: '' }),
            },
            default: [
                {
                    name: 'James T Leavitt JR.',
                    title: 'Leavitt Yamane & Soldner, Honolulu, Hawaii',
                    date: 'August 15, 2014',
                    testimonial:
                        'I want to thank you again for helping me with my climbing "accident case". I was impressed with your swift response and sound analyses of the many ways the defendant failed to protect the climber. [camper] The case settled favorably, thanks in part, to your efforts. If I have another similar case in the future I will be sure to call you.',
                },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Call now with the essence of the case',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) with a brief essence of the case and facility location — or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Free initial evaluation on first call.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
