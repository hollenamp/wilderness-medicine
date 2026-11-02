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
            default: 'Other DL Classes',
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
            default: 'Distance Learning Classes including AWFA, EPI Administration, Anaphylaxis and more!',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Distance Learning Courses offered',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'Distance Learning Courses offered\n\n- [Advanced Wilderness First Aid (AWFA)](/distance-learning/awfa)\n- [Converting AWFA to WFR](/distance-learning/converting-awfa-wfr)\n\nWMO uniquely offers a 3 hour EPI and Anaphylaxis course consisting of training in the innovative epinephrine autoinjector device, Twinject, as well as the older technology EpiPen. Course includes 3 DVDs, 2 trainers, a written exam as well as a protocol on the use of an epinephrine autoinjector for the treatment of anaphylaxis, a form letter to take to your prescribing physician, and a prescription form. This course prepares one to recognize and treat anaphylaxis in the field. Cost is $95.\n\nStudent must either have 2 different EPI trainers or receive them from WMO by mail. Student may select an overnight rush service with extra overnight rush fee when available.',
        }),
    },
    instructorResources: {
        eyebrow: field.text({
            label: 'Instructor Resources Eyebrow',
            default: 'Instructors course',
        }),
        heading: field.text({
            label: 'Instructor Resources Heading',
            default: '4 locations for resource',
        }),
        tagline: field.text({
            label: 'Instructor Resources Tagline',
            default: '',
        }),
        body: field.textarea({
            label: 'Instructor Resources Body',
            default:
                '++**WMO Instructors Course**++\n\nThis course shares 47 years of knowledge and the experience of close to 100 instructors on teaching wilderness medicine. There are 4 locations for resource which can be studied at the students own time schedule.',
        }),
        listIntro: field.text({
            label: 'Instructor Resources List Intro',
            default: 'There will be a pre-quiz on the material:',
        }),
        items: field.repeater({
            label: 'Instructor Resources',
            itemSchema: {
                text: field.textarea({ label: 'Resource', default: '' }),
            },
            default: [
                { text: 'Resources on [http://wildernessmedicine.com/resource](/resource).' },
                { text: 'Resource Center on the WMO learn site.' },
                { text: 'Student Resource Center on this WMO learn site.' },
                { text: 'WFA20 Skill Instructors Area on the WMO learn site. Skill Instructor:' },
            ],
        }),
        footerHeading: field.text({
            label: 'Instructor Resources Footer Heading',
            default: '',
        }),
        footerBody: field.textarea({
            label: 'Instructor Resources Footer Body',
            default:
                'With many single topic short 2 to 4 hour courses. This online course is new for 2014 having a price of $225. It is followed by a 2 day in person live class followed 2 to 3 mentored live WFA classes the student teaches while being mentored by a senior WMO instructor. Price for the live sessions varies and is some times at no cost to the instructor candidate.',
        }),
    },
    topics: {
        eyebrow: field.text({
            label: 'Topics Eyebrow',
            default: 'Short courses',
        }),
        heading: field.text({
            label: 'Topics Heading',
            default: 'WMO offers the following courses',
        }),
        tagline: field.text({
            label: 'Topics Tagline',
            default: 'Cost ranges from $75 up',
        }),
        body: field.textarea({
            label: 'Topics Body',
            default:
                'If you have a topic of interest let us know and we can develop it for you!\nWhile these courses have strong, accurate, up to date content, the filming is not "Hollywood" production quality.',
        }),
        items: field.repeater({
            label: 'Topics',
            itemSchema: {
                text: field.text({ label: 'Course', default: '' }),
            },
            default: [
                { text: 'Backcountry water treatment' },
                { text: 'History of Wilderness Medicine' },
                { text: 'Foot care and boot fitting' },
                { text: 'Medical Legal & Ethics concerns' },
                { text: 'EPI and Anaphylaxis' },
                { text: 'Wound Care (minor and major)' },
            ],
        }),
        footerHeading: field.text({
            label: 'Topics Footer Heading',
            default: '',
        }),
        footerBody: field.textarea({
            label: 'Topics Footer Body',
            default:
                'The courses are in the submission process for FAWM credit approval but may not ever be approved cost ranges from $75 up.',
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Ask about a distance learning topic',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) to enroll in AWFA, convert to WFR, take the EPI course, or request a custom topic. If you have a topic of interest let us know and we can develop it for you!',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
