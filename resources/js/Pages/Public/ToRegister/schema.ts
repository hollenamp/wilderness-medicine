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
            default: 'To Register',
        }),
        headlineLine2: field.text({
            label: 'Hero Headline (Line 2)',
            default: 'Transfer funds and call',
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
            default: 'To Register: transfer funds and call',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'First call after your check is in the mail',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "You may mail a check to 2477 Co Rd 132, Elizabeth CO 80107 and call to get instant registration — important as those last few spots of a class fill up. Your registration is based on first call in after the check has been posted in U.S. mails.\n\nYou may use a credit card and send funds by PayPal (4% accounting fee). Please follow up with an email to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com).",
        }),
    },
    steps: {
        eyebrow: field.text({
            label: 'Steps Eyebrow',
            default: 'How to register',
        }),
        heading: field.text({
            label: 'Steps Heading',
            default: 'Registration steps',
        }),
        tagline: field.text({
            label: 'Steps Tagline',
            default: 'Few forms. Call the office.',
        }),
        body: field.textarea({
            label: 'Steps Body',
            default: 'We have few requirements, no registration forms except for the Distance Learning classes, and no prerequisites except for the Wilderness Advanced Life Support (WALS) Expedition Medic class.',
        }),
        items: field.repeater({
            label: 'Steps',
            itemSchema: {
                text: field.textarea({ label: 'Step', default: '' }),
            },
            default: [
                {
                    text: 'WFR/WEMT 76 hr: mail a minimum of $100, or $195 will hold your space *and* get your books out early unless sent too close to class start. Call the office and leave a message that you have mailed your check. You may send the money by PayPal to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com) if you include a 4% account opening fee.',
                },
                {
                    text: 'Distance Learning Advanced Wilderness First Aid: send 1 check for $595 (if signed up within 48 hours of first contact) or this may be sent in 2 checks for $298 each with one post-dated as arranged by phone with the WMO office. Some classes have a site fee that must be paid in advance. Balances can be paid at class start.',
                },
                {
                    text: 'Call [(303) 688-5176](tel:+13036885176) (best 9:00–10:00 am MT) after mailing payment so we can lock your seat. Email [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com) with your name, class, and the best phone number to reach you.',
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
            default: 'Call [(303) 688-5176](tel:+13036885176) (best 9:00–10:00 am MT) or email [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com).',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
