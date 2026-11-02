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
            default: "Students must Read",
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
            default: 'New Students Information',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Class structure, CPR, and forms',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "The following pages will help you understand the class structure and answer many questions that have been repeated over the years. Always feel free to ask any questions you have by phone or email.\n\nRE: WFA20 skill instruction, we suggest option 3 under the class description .\n\nIf you are under 21 please have your parent (s) sign and fill out the [accompanying form](/under-age-21). Nine day classes usually start on a Saturday at 7:30 am Nine day classes usually run from 8 to 6 pm getting out early on Wednesday and running longer on Thursday evening to 9 or 10 pm with a long group dinner time. Fees are always for Colorado classes and are subject to change. Other location classes may be higher.\n\nPROFESSIONAL RESCUER CPR is required for WFR/WEMT.\n\nIt is optional for some WFA classes. If you have taken a Pro Rescuer class in the last 6 months\n\njust send a card copy to us and bring a card copy to class.\n\nWMO includes Pro Rescuer CPR in most WFR/WEMT classes for no extra fee.\n\nYou may take it online through WMO before class for $25.\n\nIf you chose to take this ahead of class We RECOMMEND you start\n\nthis 2 to 4 week before class.\n\npeople take 1 to 2 hours to complete the online portion.\n\nEmail or call for site address and code number to enter\n\nafter mailing $25 or using paypal fund transfer of $26.\n\nMake up essays are often possible with lower than 80% test scores but must be selected, reviewed with instructor and first draft submitted in 5 days following class [by email if student has it] or a cost will be assessed. All such work must be turned in within 30 days following class or class cannot be passed.\n\nSend an email to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com) after the first class session of any 6 week [highly recommended and required for all with email access] or consecutive day class if convenient as we will then send you important up dates during class. If you do not have email, put that on your three questions the first 2 sessions and check frequently with your instructor for updates.",
        }),
    },
    forms: {
        eyebrow: field.text({
            label: 'Forms Eyebrow',
            default: 'Forms',
        }),
        heading: field.text({
            label: 'Forms Heading',
            default: 'Registration and student forms',
        }),
        intro: field.textarea({
            label: 'Forms Intro',
            default: "If you are under 21 please have your parent(s) sign and fill out the [accompanying form](/under-age-21).",
        }),
        items: field.repeater({
            label: 'Forms',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                description: field.textarea({ label: 'Description', default: '' }),
            },
            default: [
                {
                    title: '[Advanced Wilderness First Aid (AWFA48) Registration Form](/files/AWFA48-Registration2016.pdf)',
                    description: "[Download the form](/files/AWFA48-Registration2016.pdf)",
                },
                {
                    title: '[Student Policy Information](/files/house.doc)',
                    description: "[Download the form](/files/house.doc)",
                },
                {
                    title: '[Specific Information about our classes](/files/reminders.doc)',
                    description: "[Download the form](/files/reminders.doc)",
                },
                {
                    title: '[Forms For Under 21](/files/under21.doc)',
                    description: "[Download the form](/files/under21.doc)",
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
