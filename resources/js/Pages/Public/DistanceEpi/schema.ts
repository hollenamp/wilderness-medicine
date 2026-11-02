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
            default: 'EPI Course',
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
            default: 'Epinephrine Course',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Certification requires level 2 and 3',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'WMO uniquely offers an online EPI and Anaphylaxis course consisting of training with a newer epinephrine autoinjector device such as Twinject, as well as the older technology EpiPen. Course includes company training videos, self test quiz, a written exam as well as a protocol on the use of an epinephrine autoinjector for the treatment of anaphylaxis, a form letter to take to your prescribing physician, and a prescription form. This course prepares one to recognize and treat anaphylaxis in the field. See the online store (link below) for the current cost for level 2 and level 3. Certification requires level 2 and 3.\n\nStudent must either have EPI trainer or may use a white board marker as a substitute.\n\nLearn more on the EPI page: [epi](/classes/epi)',
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Ask about current EPI course cost',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) for the current cost for level 2 and level 3, or to enroll in the online EPI and Anaphylaxis course. See the [online store](/store/distance-learning) and the [epi](/classes/epi) class page.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
