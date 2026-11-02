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
            default: 'Horses - Ranching',
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
            default: 'Expert Page Horses, Livestock, Ranches',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Call now [(303) 688-5176](tel:+13036885176) with a brief essence of the case and the state the activity is located in',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'Or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Carl has reviewed over 700 horse activities, agricultural operations and working ranches. Recommendation on case in this field follows. Additional recommendations available.',
        }),
    },
    about: {
        eyebrow: field.text({
            label: 'About Eyebrow',
            default: 'Equine & ranching',
        }),
        title: field.text({
            label: 'About Title',
            default: 'Horse operations, livestock, and ranches',
        }),
        body: field.textarea({
            label: 'About Body',
            default:
                '**Expertise in horse operations, equine events, agricultural and ranching operations both working ranches and guest ranches. Available for consult on cases for plaintiff or defendants. Expert reports on each case available. Free initial evaluation on first call [(303) 688-5176](tel:+13036885176).**',
        }),
        supportContent: field.textarea({
            label: 'About Support Content',
            default:
                'Some of the various cases worked on included guided trail rides, Roping events, dressage competition, three day events, hunter jumper competition and horse boarding facilities. Carl has also done horse valuations and facility appraisals.',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/dad1967-400.jpg',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Capt. B.A. Weil, 4th Cavalry — Carl\'s father, 1967',
        }),
        imageCaption: field.text({
            label: 'About Image Caption',
            default: 'Capt. B.A. Weil 4th Cav — Carl\'s Father, 1967.',
        }),
        trustSignals: field.repeater({
            label: 'Trust Signals',
            itemSchema: {
                value: field.text({ label: 'Value', default: '' }),
                label: field.text({ label: 'Label', default: '' }),
            },
            default: [
                { value: '700+', label: 'Horse activities, agricultural operations, and working ranches reviewed' },
                { value: '3rd gen.', label: 'Grew up on a family ranch in the Colorado mountains as a horseman' },
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
            default: 'Recommendation on a case in this field',
        }),
        intro: field.textarea({
            label: 'Letter Intro',
            default: 'Additional recommendations available.',
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
                    name: 'Britt K. Beckstrom',
                    title: 'Gallian, Wilcox, Welker & Olson, L.C., St. George, Utah',
                    date: 'November 7, 2006',
                    testimonial:
                        'Recently I was involved in a case involving an attack by a bull on an elderly woman. I retained Mr. Carl Weil as an expert in the case related to animal behavior and fencing regulations and guidelines. I found Mr. Weil easy to work with and very diligent in all aspect of his involvement in the case. Through his efforts I was able to achieve a substantial settlement for my client. I am confident in Mr. Weil\'s ability and I would highly recommend his services. If you have any questions related to Mr. Weil\'s abilities please feel free to contact me.',
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
                'Call [(303) 688-5176](tel:+13036885176) with a brief essence of the case and the state the activity is located in — or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Free initial evaluation on first call.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
