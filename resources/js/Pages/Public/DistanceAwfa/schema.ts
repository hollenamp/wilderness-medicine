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
            default: 'AWFA',
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
            default: 'Advanced Wilderness First Aid (AWFA)',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: '48 hr Advanced Wilderness First Aid distance learning',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'The Advanced Wilderness First Aid (AWFA) credential is widely recognized. The AWFA is often accepted for professionals and guides. This twelve lesson program combines text books, videos, equipment that is yours to keep, and equipment to be returned, as well as email/telephone contact with an instructor, and student visual feedback through their choice of video-web cam- or photographs. Not a street medicine course, this is heavy improvisational care. This is truly an interactive learning program unique to the industry. Many of the graduates of this have said it was more detailed than other groups WFR class they have taken.\n\n**Simply put - take this course at your own speed [average for fast students is 3 months] with the assigned instructor over the internet from anywhere at any time will recertify most WFRs or WEMTs as well**\n\n[Order and Pay](/product/awfa48) by PayPal, Email completed waiver. We will promptly email intro letter and detailed outline.\n\nYour student package will be mailed after your payment and return of class registration form and supply form.\n\nNote: If you have ordered and paid for this course, you need to login using the username/password you created during the order process and then return to this page to access the "Students Area".',
        }),
        image: field.image({
            label: 'Intro Photo',
            default: '/images/content/distant.jpg',
        }),
        imageAlt: field.text({
            label: 'Intro Photo Alt',
            default: 'Wilderness Medicine Outfitters distance learning',
        }),
    },
    review: {
        eyebrow: field.text({
            label: 'Review Eyebrow',
            default: 'Student note',
        }),
        heading: field.text({
            label: 'Review Heading',
            default: 'What graduates have said',
        }),
        intro: field.textarea({
            label: 'Review Intro',
            default:
                'Many of the graduates of this have said it was more detailed than other groups WFR class they have taken.',
        }),
        items: field.repeater({
            label: 'Reviews',
            itemSchema: {
                name: field.text({ label: 'Name', default: '' }),
                title: field.text({ label: 'Title', default: '' }),
                testimonial: field.textarea({ label: 'Testimonial', default: '' }),
                date: field.text({ label: 'Date', default: '' }),
            },
            default: [
                {
                    name: '[Larry T.](http://www.linkedin.com/pub/larry-tyler/7a/835/451)',
                    title: 'professional at sea',
                    date: '7-2013',
                    testimonial:
                        '* **I work shipboard and treat wounds that may be dirty and contaminated. WMOs wound treatment method is very helpful. I have taken four of your courses and plan to take more. I have taken 3: on line WFA20, AWFA 48hr and pro CPR and liked the way you have upgraded them.** *',
                },
            ],
        }),
    },
    lessons: {
        eyebrow: field.text({
            label: 'Lessons Eyebrow',
            default: 'Brief synopsis',
        }),
        heading: field.text({
            label: 'Lessons Heading',
            default: 'The twelve lessons',
        }),
        tagline: field.text({
            label: 'Lessons Tagline',
            default: 'Each representing 4 hours work',
        }),
        body: field.textarea({
            label: 'Lessons Body',
            default: '**BRIEF SYNOPSIS --- FEEL FREE TO CALL FOR MORE DETAILS**\n\nThe twelve lessons each representing 4 hours work, are as follows:',
        }),
        items: field.repeater({
            label: 'Lessons',
            itemSchema: {
                text: field.textarea({ label: 'Lesson', default: '' }),
            },
            default: [
                {
                    text: '**Lesson One: Wilderness medicine introduction, medical legal, patient documentation, and rescuer safety**\nIncludes backcountry care books to keep and DVD/video to study and return',
                },
                {
                    text: '**Lesson Two: medications, Sanitation, communicable disease prevention, water treatment**\nIncludes chlorine dioxide tabs to keep and DVD/video to study and return',
                },
                {
                    text: '**Lesson Three: Basic anatomy, physiology, shock and students choice optional topic**\nIncludes anatomy and physiology book and DVD/video to study and return',
                },
                {
                    text: '**Lesson Four: Airway, rescue breathing, CPR and altitude**\nIncludes CPR shield, oral pharyngeal to keep, and DVD/video to study, and practice shield and return',
                },
                {
                    text: '**Lesson Five: Sight review, patient assessment, and vital signs**\nIncludes stethoscope, blood cuff and DVD/video to use study and return',
                },
                {
                    text: '**Lesson Six: Wound care including burns and blisters, lighten, triage**\nIncludes one wound closure kit, irrigation syringe, gloves to keep, triage tag and DVD/video to study and return',
                },
                {
                    text: '**Lesson Seven: Heat, Cold, and Altitude**\nIncludes text to study and keep, and DVD to study and return',
                },
                {
                    text: '**Lesson Eight: Allergies and Anaphylaxis with use of EPI**\nIncludes physician protocol letter to keep and DVD and video and EPI trainer to use, study and return',
                },
                {
                    text: '**Lesson Nine: Splinting including femur traction**\nIncludes Sam splint, 550 cord and DVD to study and return',
                },
                {
                    text: '**Lesson Ten: Bites, Stings, Poisons, and Abdominal**\nIncludes sawyer extractor and DVD to study and return',
                },
                {
                    text: '**Lesson Eleven: Diabetic, Seizure, Blisters, Burns, and Chest problems**\nIncludes text to study and DVD to study and return',
                },
                {
                    text: '**Lesson Twelve: cervical Spine, Evacuation, Testing, CSID, Disaster Preparedness**\nIncludes special wilderness medicine multi purpose triangle to keep and DVD to study and return',
                },
            ],
        }),
    },
    package: {
        headline: field.text({
            label: 'Package Headline',
            default: 'You are keeping over $150 worth of medical items',
        }),
        tagline: field.text({
            label: 'Package Tagline',
            default: 'Please ask about our first time caller discount',
        }),
        body: field.textarea({
            label: 'Package Body',
            default:
                'The cost normally is $445 tuition and $200 books and materials.\nPlease ask about our first time caller discount.\n\nStudent work policy: to more forcefully remind you to keep working and not let your learning go dormant, there is a $50 fee if you go 30 days without submitting work. The course may be voided after 60 days of no work being submitted. This is to give you consequences if you get lax in your work.\nSpecial exceptions for sound cause may be granted by the director.\n\nThere is additional information in this Registration document [Click for Registration Information PDF format](/files/AWFA48-Registration2016.pdf)',
        }),
        asideHeading: field.text({
            label: 'Package Aside Heading',
            default: '',
        }),
        highlights: field.repeater({
            label: 'Package Highlights',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                detail: field.textarea({ label: 'Detail', default: '' }),
            },
            default: [
                { title: 'Protocol papers for your Doctor', detail: '' },
                { title: 'WMO Triangle', detail: '' },
                { title: 'Sam splint', detail: '' },
                { title: 'CPR shield and 2 Oral pharyngeal airways', detail: '' },
                { title: 'Sawyer Extractor', detail: '' },
                { title: 'Wilderness First Responder Text', detail: '' },
                { title: 'Back country care pocket book', detail: '' },
                { title: 'Gloves surgical mask antiseptic wipes 550 cord', detail: '' },
                { title: 'Wound kits irrigation syringe', detail: '' },
                { title: 'Clorine dioxide tabs', detail: '' },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Order and Pay — feel free to call for more details',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176). [Order and Pay](/product/awfa48) by PayPal, Email completed waiver. We will promptly email intro letter and detailed outline. Please ask about our first time caller discount.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
