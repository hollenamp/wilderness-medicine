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
            default: 'Archery, Shotguns, Rifles, and Pistols',
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
            default: 'Expert Page Shooting activities Archery, Pistol, Shotgun and Rifle',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Call now [(303) 688-5176](tel:+13036885176) with a brief essence of the case and the state the activity is located in',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'Or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Carl has reviewed over 150 shooting activities [rifle, pistol, archery] hunting and on ranges. **Mr. Weil has been accepted by Civil and ++Criminal++ courts as an experienced expert in these fields**. Recommendation on case in this field follows. Other recommendation’s available.',
        }),
    },
    about: {
        eyebrow: field.text({
            label: 'About Eyebrow',
            default: 'Firearms & archery',
        }),
        title: field.text({
            label: 'About Title',
            default: 'Rifle, shotgun, pistol, and archery expertise',
        }),
        body: field.textarea({
            label: 'About Body',
            default:
                'Expertise in rifle, shotgun, pistol and archery. Available for consult on cases for plaintiff or defendants. Training from WWII personal Army, Marines, OSS.',
        }),
        supportContent: field.textarea({
            label: 'About Support Content',
            default:
                'Modern trained by; USMC, Border Patrol Instructor, Police departments, NRA, Private Firearms Schools. Expert report available for your case. Free initial evaluation on first call [(303) 688-5176](tel:+13036885176).',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/WMO-archery400.jpg',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Carl Weil, archery expert',
        }),
        trustSignals: field.repeater({
            label: 'Trust Signals',
            itemSchema: {
                value: field.text({ label: 'Value', default: '' }),
                label: field.text({ label: 'Label', default: '' }),
            },
            default: [
                { value: '150+', label: 'Shooting activities reviewed — rifle, pistol, archery, hunting and ranges' },
                { value: 'Civil & Criminal', label: 'Accepted by courts as an experienced expert in these fields' },
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
            default: 'Other recommendation’s available.',
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
                    name: 'James C. Plott, Esq.',
                    title: 'Denver, CO — jcp@plottlaw.com',
                    date: 'December 29, 2010',
                    testimonial:
                        'I want to thank you for your time and testimony in the Leal-Gomez case. I was confident in taking you to the jury based on your confidence, composure, and credibility. Your testimony bore me out, and we have a satisfied client. For your future reference, the Adams County District Court, Colorado, recognized you as an expert in firearms in a felony case. Obviously, your knowledge and expertise in firearms was paramount, but your ability to communicate with the jury congenially and knowledgably rendered you both memorable and credible. Your testimony was well-presented, consistent, and of the highest ethical standard. I believe that the demonstrative exhibits which you prepared were helpful to the jury and my client. Finally, your handling of the rather aggressive cross examinations by the deputy district attorneys at the rule 702 hearing and at trial was admirable as you maintained composure and confidence on the stand - it was a pleasure to see you give the other side some grief. It was a pleasure working with you, and I will certainly call on you should I need an expert in the field of firearms in the future.',
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
