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
            default: "Under Age 21",
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
            default: 'Parental Acknowledgement and Release',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'for Minors Wishing to Participate in WMO Classes',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "for Minors Wishing to Participate in WMO Classes",
        }),
    },
    terms: {
        eyebrow: field.text({
            label: 'Terms Eyebrow',
            default: 'Under Age 21',
        }),
        heading: field.text({
            label: 'Terms Heading',
            default: 'Parent and guardian terms',
        }),
        tagline: field.text({
            label: 'Terms Tagline',
            default: 'WMO offers education only not custodial supervision',
        }),
        body: field.textarea({
            label: 'Terms Body',
            default: '',
        }),
        items: field.repeater({
            label: 'Terms',
            itemSchema: {
                text: field.textarea({ label: 'Term', default: '' }),
            },
            default: [
                { text: "WMO offers education only not custodial supervision. Parents and guardians agree that WMO personnel are not responsible for enforcing any rules of conduct.\n\nAll students engage in practice physical exams of each other and are often involved with physical demonstrations as an example by an instructor. If there is any concern about having the minor touched by anyone they must not enroll in this course. Touching is only meant to be of proper examination nature and is instructed to the same standards of sensitivity as EMT classes. Students have the right and obligation to stop any activity\n\nthey are not comfortable with." },
                { text: "For maximum learning students should try as much as possible to work on varied practice patients of the opposite sex. They should also chose practice patients, where allowed by the instructors, who they are less acquainted as opposed to former friends from before this class." },
                { text: "Student may be removed from class if instructor deems their behavior disruptive. Example: bringing up problems in front of other students, versus in private with instructor." },
                { text: "If the student has any need of extra tutoring or special learning needs or issues these must be disclosed on the 3 questions turned in at sessions end. A tutor will be discretely sought from the class" },
                { text: "Consumption of alcohol and tobacco is not permitted during class sessions. WMO personnel WILL NOT monitor students outside of the class time. RESPONSIBILITY FOR CONDUCT LIES SOLELY WITH THE STUDENT." },
                { text: "The parent agrees to notify WMO (direct verbal or telephone communication is acceptable) if the minor has any medical or psychological issues upon same day as signing up for course, and if the student is accepted for class, written verification of this information must be provided to WMO no later than 48 hrs before the start of class." },
                { text: "No minor with life threatening issue history, or deemed to be a risk to their own safety or the safety of others, now or in the past, will be allowed to participate without a written release signed by a physician and the parent or guardian. This release must be provided to WMO no later than 48 hours before the start of class. For the safety of our instructors and students, there will be no exceptions to this requirement." },
            ],
        }),
        footerHeading: field.text({
            label: 'Signature Heading',
            default: 'Signature',
        }),
        footerBody: field.textarea({
            label: 'Signature Body',
            default: "8. Signature on this document constitutes (1) recognition that some activities in WMO education entail certain inherent risks of injury or death, which may be foreseen or unforeseen, and will involve physical contact between persons (and is a required element of the DOT curriculum) and (2) agreement by the parents and guardians enrolling minors in WMO classes (for themselves and on behalf of the minors) to indemnify, defend and hold harmless (find not liable, find not guilty and protect) WMO and its personnel from any claims of any kind or nature arising out of participation of the student in any activities of WMO.\n\nDate_____________ Student Name (print or type)_____________________________ Age____\n\nParent or Guardian (print or type)___________________________________\n\nSignature of parent or guardian_____________________________________",
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
