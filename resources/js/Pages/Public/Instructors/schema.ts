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
            default: "WMO Instructors",
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
            default: 'Wilderness Medicine Outfitters Staff Members',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Prevention - Assessment - Treatment',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "**Prevention - Assessment - Treatment**\n\nAll classes are taught by carefully selected qualified instructors with Emergency Medical Training (often EMT), outdoor recreation experience, and wilderness medical teaching experience. Classes are accepted by most agencies and institutions, including: Colorado State Outfitters Board, Colorado River Authority, Utah River Authority, The American Mountain Guides Association, Outward Bound, and NOLS. Certificates may be available from: Wilderness Medicine Outfitters, the Emergency Care and Safety Institute, American Heart Association, Colorado Department of Public Safety. EMT Recertification credits available. National Registering First Responder, National Ski Patrol's Outdoor Emergency Care as well as other organizations, availability changing from time to time.",
        }),
    },
    director: {
        headline: field.text({
            label: 'Director Headline',
            default: 'Director - Carl Weil',
        }),
        tagline: field.text({
            label: 'Director Tagline',
            default: 'First Master Fellow who is a full time Wilderness Medicine instructor',
        }),
        body: field.textarea({
            label: 'Director Body',
            default: "[Director - Carl Weil](/director-carl-weil)\n\nCarl Weil is the first Wilderness school director to receive/earn the coveted designation of Fellowship in the Academy of Wilderness Medicine. The Fellow designation requires the completion of 80 unites of specific education and 20 units of professional experience. Mr Weil was recognized as having over 260 units in this pursuit a probable Academy record. He is one of the first  to receive the Fellowship Degree in 2007. In 2012 he became the first to be designated as the Academy's first Master Fellow [alpha designation] after completing their 5 year program. He has passed both the National Registry EMT and First Responder exams.  His has also been certificated as; EMT-IV/MAST, Colorado Instructor-Coordinator with a National Wilderness Instructor designation.  Carl started his EMT career iafter graduating CSU. He grew up in the Colorado mountains with a family ranch and guide service.  He began working with Search and Rescue units in highschool, and started teaching First Aid to Ski Patrollers while at CSU.  He has been a Trip Medic on numerous treks, including being a Medic and Guide on a Mt. Everest expedition .  He brings practical outdoor experience to the classroom.  His emergency medical experience includes working in Denver General's Emergency Department to starting and operating a rural ambulance service.  Carl hold training certificates from many sources and has served on the Colorado First Responder and the Wilderness Medical Society PETSAC working committees.  He was one of seven school directors that created a new national standard for 16 hr. WFA SOP in 2013. He has taught at many schools, universities, local and national conferences, as well as for the USMC, US Army and US Air Force.",
        }),
        asideHeading: field.text({
            label: 'Director Aside Heading',
            default: '++**Staff**++',
        }),
        highlights: field.repeater({
            label: 'Director Highlights',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                detail: field.textarea({ label: 'Detail', default: '' }),
            },
            default: [
                {
                    title: 'Experience',
                    detail: "WMO staff are experienced in Educational Activities, Outdoor Pursuits and Medical Experience. WMO appears to have the largest number of Fellows of the Academy of Wilderness Medicine of any school and the only Master Fellow who is a full time Wilderness Medicine instructor.",
                },
                {
                    title: 'With help from',
                    detail: "WMO staff are experienced in Educational Activities, Outdoor Pursuits and Medical Experience. WMO appears to have the largest number of Fellows of the Academy of Wilderness Medicine of any school and the only Master Fellow who is a full time Wilderness Medicine instructor.\n\n++**WMO programs owe Thanks to many especially**++\n\nWith help from: Steve Anderson, Keith Cubbedge, DeAnn Masin, Waffle Illingworth, Marc McDonald, Nathan Mesnikoff, Jim Moss, Liz Owen, Dan Stepner, Eben Widlund, Patricia Wright, Don Glasgow, A Fakhri.  Folks Carl considers important in his carrier development; Doc Hecht, Steve Perhson md, William Forgey md, Denis Meade [phd candidate], J Vitanza md, Danny Gillum [phd], Buck Tilton, Paul Aubrach md,, Steve Lyons, Roger Wood, Peter Goth md, Dr. Shaffer, Dr Gerald Mitchell, Dr Bob Norris, Rick Kendrick, Allen Harris md, Dr. Heimlich, Murry Hammet dvm, Charles Houston MD and others to whom I apologize for leaving out. Special acknowledgement to Sandy Long and Allen Duckworth who we taught that first class together in CSU days\n\nWilderness Medicine Outfitters Staff Members",
                },
            ],
        }),
    },
    roster: {
        eyebrow: field.text({
            label: 'Roster Eyebrow',
            default: '++**Staff**++',
        }),
        heading: field.text({
            label: 'Roster Heading',
            default: 'Instructor Certifications',
        }),
        tagline: field.text({
            label: 'Roster Tagline',
            default: 'Wilderness Medicine Outfitters Staff Members',
        }),
        body: field.textarea({
            label: 'Roster Body',
            default: '',
        }),
        items: field.repeater({
            label: 'Instructors',
            itemSchema: {
                text: field.textarea({ label: 'Instructor', default: '' }),
            },
            default: [
                { text: "Steve Anderson - WEMT, AHA, CPR inst, WFR Instructor" },
                { text: "Carl Weil - **Master degree, Fellow**, **Fellow degree, FAWM**, NREMTW/IC - Instructor trainer: CPR, WFA, WFR, WEMT, WALS" },
                { text: "Marc McDonald - WEMT, NREMT, AHA, ECSI, **FAWM**, CPR inst, WALS Instructor" },
                { text: "Danny Gillum - WEMT, CPR inst,WFA instructor" },
                { text: "Ryan Beishline - WFR, AHA, CPR ins, WFA instructort" },
                { text: "Ken Adams - Pharmacist, WALS Instructor" },
                { text: "Denis Meade - NREMTP MS, WALS Instructor" },
                { text: "Dr. Alan Gerbholz - DDDS, WALS Instructor" },
                { text: "Barb Foster - NREMTP , WALS Instructor" },
                { text: "Dr. John Fedack - MD, **FAWM**, WALS Instructor,WMO Medical Director" },
                { text: "Justin Mast - RN, BSRN, WEMT, **FAWM**, WALS Instructor" },
                { text: "Pat Tabor - WFR, WALS, **FAWM**, WFA instructor" },
                { text: "Gary Moore - WFR, WALS, **FAWM** candidate, WFA instructor" },
                { text: "Liz Owen - WEMTP, AHA, CPR, RN, WALS Instructor" },
                { text: "Dr. Michael Woods - WFR, **FAWM**, WALS Instructor" },
                { text: "Jim Thompsom - WEMT **FAWM**" },
                { text: "Terry Young- WEMT" },
                { text: "Alim Sharif WEMT, WALS" },
                { text: "Alan Jolly - WFR," },
                { text: "Bryan Taylor - WEMTA, WALS" },
                { text: "John Long - Pharmacist, WALS Instructor" },
                { text: "Todd Garcia - Master Anatomist, WALS Instructor" },
                { text: "Sam  Ritter - WFR" },
                { text: "Nick Fedack RN, WFR, WALS, **FAWM**" },
                { text: "Sammie Martinez - WFR, AHA, CPR inst" },
                { text: "Jaime Levine - WFR" },
                { text: "Keith Cubbage - WFR instructor" },
                { text: "Howard Paul - EMT, WFR instructor" },
                { text: "Robert Grossaint - WEMT, AHA, CPR" },
                { text: "Robert Gaas - WFR, Special Nueromuscular Surgery Tech" },
                { text: "Nathan Mesnikoff - WEMT, AHA, CPR" },
                { text: "Mark Liao - WFR, CPR, First Aid" },
                { text: "Chris Thralls - WFR" },
                { text: "Alicia Tanrath - WEMT" },
                { text: "Dr. Shaun Adams - WFR" },
                { text: "Howard Handler - EMT, Risk Manager" },
                { text: "Dr. Stephanie Gammons Ferri - WFR" },
                { text: "Dr. David Thiel - WFR" },
                { text: "Dr. Buch Levy - WFR" },
                { text: "Mary Lou Morgan - WEMT, WFR instructor" },
                { text: "Kim Allen - RN, WEMT, WFR instructor" },
                { text: "Yolanda Anderson - RN, WALS Instructor" },
                { text: "Dr. J.M.Vitanza - M.D., Allergist, Immunologist, WALS Instructor" },
                { text: "Rebecca Bredfelt - WEMT, ARNP, WFR instructor" },
                { text: "JR McGee - WEMT, WFR instructor" },
                { text: "Sandy Miller - WEMT, WFR instructor, CPR inst **[dear friend of WMO** - deceased 2013" },
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
