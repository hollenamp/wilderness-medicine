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
            default: 'Converting AWFA to WFR',
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
            default: 'Converting AWFA to WFR',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: '',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                "WMO's Distance Learning Wilderness Advanced Aid First CAN be converted into a Wilderness First Responder / Wilderness EMT Module.\n\nThis program is designed for those who can not attend a full 9-day regular class. This 72 hour program starts out with the above 48 hours done over the internet with email, study of lessons, hands on practice with dozen of wilderness medical training items including training CD's and videos as well as telephone time with an instructor. The student may use web cam, digital photos, or film photos to show skill competency along with written exams and personal time with an instructor over the web and by telephone. For an addition $350 fee (paid with AWFA registration or $400 later) the student receives 4- special day of hands on sessions which are offered 8 to 10 times a year to advance the course further in order to obtain the WFR or WEMT credential. One of these 4 days is a private day with an instructor while the other two are with a WFR class practicing skills. Cost does not include room and board.",
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Convert AWFA into a WFR or WEMT credential',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) to add the conversion sessions when you register for AWFA, or to schedule the 4 special days later.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
