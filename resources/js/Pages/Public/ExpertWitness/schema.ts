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
            default: 'Expert Witness',
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
            default: 'Expert Witness',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: '**Hire Mr. Weil before you take your first opposition deposition**',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                '**We made more head way with this case in 1 week with Carl\'s help than we did in a year and a half of diligent case work without him! His expertise, insight and guidance was invaluable giving us a strong position in what we were concerned was a weak case — Joe D., lead attorney of a 3 man team from a New York Law Firm, 2014.**',
        }),
    },
    about: {
        eyebrow: field.text({
            label: 'About Eyebrow',
            default: 'Experience',
        }),
        title: field.text({
            label: 'About Title',
            default: 'Expert witness and risk management in outdoor recreation',
        }),
        body: field.textarea({
            label: 'About Body',
            default:
                '**Expert Witness Main Areas:**\n\n1. Rock Climbing; Gyms & Out Doors Traditional\n2. Archery; Arrows, Bows Indoors & Out Doors\n3. Firearms; Shotguns, Pistols, Rifles, Hunting\n4. Camps & Guest / Working Ranches\n5. Horses; Riding, Trail Rides, Stables\n6. Emergency Medical Services\n7. Water Craft Accidents; Sail, Motor, Paddle',
        }),
        supportContent: field.textarea({
            label: 'About Support Content',
            default:
                'Carl Weil\'s strong hands on experience in many outdoor recreation areas including rock climbing, firearms, archery and horsemanship help him when reviewing a case as well as being deposed and taking the stand to testify.\n\nMr. Weil has reviewed approximately 3,000 outdoor businesses in the US, Canada and abroad as a risk manager. Many of these reviews were for insurance companies using recreational activity insurance programs he created. His expert witness clientele is approximately **60% Plaintive and 40% Defense** representation in 38 states. He is an accepted expert witness in both **Civil and Criminal** cases.\n\nHe grew up on a family ranch in the Colorado Mountains as a horseman and is a third generation guide. Public presentations in safety are frequent often in wilderness medicine.\n\nA list of his publications are available; many on wilderness medicine, outdoor recreation and horse topics. His unique monograph presentation on levels of outdoor liability and responsibility before the Wilderness Education Association was positively received and is often valuable to his cases.\n\nScholastically he has university degrees and a Master Fellow degree, plus hours of on going graduate work.\n\nHis field of cases has included: Archery, Appraisals, Camps, Climbing in gyms and on traditional rock, Equine activities, Guest and working ranches, General Aviation, Guiding, Hunting, Horses, Livestock, Mountaineering, Outfitting, Schools and Safety.\n\nYou can **increase your clients success** hiring Carl Weil. His letters of recommendation from satisfied attorney reflect his broad investigative experience backed by significant training leading to important winning observations. The attorneys\' positive comments below relate to many clients.\n\n**With today\'s expensive airline tickets and 8 hr fee days, as well as overnight expenses, your client can still easily afford his modest zoom fees and pay only for the hours involved with a little extra to have him on location, as opposed to a local, less experienced person.** The loss of a case never justifies the savings from hiring a local without Carl Weil\'s vast experience. Plus, today there are rarely the need for travel costs.',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/carlstanding.png',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Carl Weil, outdoor recreation expert witness',
        }),
        trustSignals: field.repeater({
            label: 'Trust Signals',
            itemSchema: {
                value: field.text({ label: 'Value', default: '' }),
                label: field.text({ label: 'Label', default: '' }),
            },
            default: [
                { value: '300+', label: 'Cases as an expert in civil and criminal matters' },
                { value: '3,000', label: 'Outdoor businesses reviewed in the US, Canada, and abroad' },
                { value: 'Free', label: 'Initial review on the first call — (303) 688-5176' },
            ],
        }),
        credentialsIntro: field.textarea({
            label: 'Associates Intro',
            default:
                'Carl Weil as of 2012 has four expert associates in addition to himself for better service to his clients these associates can work on cases with him or independently based on the clients needs:',
        }),
        credentials: field.repeater({
            label: 'Expert Associates',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                bullets: field.textarea({ label: 'Bullets (one per line)', default: '' }),
            },
            default: [
                {
                    title: 'College Dean, retired',
                    bullets:
                        'PhD — Human relations, training\nSecurity, Weapons, Survival [US Marine]',
                },
                {
                    title: 'Emergency Room Registered Nurse',
                    bullets: '25+ years experience',
                },
                {
                    title: 'Registered Nurse, Paramedic, EMS Educator',
                    bullets: 'SAR medical director experience',
                },
                {
                    title: 'Family Practice Physician',
                    bullets:
                        'Former ED Chief of staff\nChief surgeon\nSpecial Forces, retired',
                },
            ],
        }),
    },
    reviews: {
        eyebrow: field.text({
            label: 'Reviews Eyebrow',
            default: '',
        }),
        heading: field.text({
            label: 'Reviews Heading',
            default: 'Attorney Letters of Recommendation',
        }),
        intro: field.textarea({
            label: 'Reviews Intro',
            default:
                'Letters of recommendation from satisfied attorneys can be emailed upon request after an initial discussion.',
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
                    name: 'Joe D.',
                    title: 'Lead attorney, New York law firm',
                    date: '2014',
                    testimonial:
                        'We made more head way with this case in 1 week with Carl\'s help than we did in a year and a half of diligent case work without him! His expertise, insight and guidance was invaluable giving us a strong position in what we were concerned was a weak case.',
                },
                {
                    name: 'James C. Plott, Attorney',
                    title: 'Colorado',
                    date: '2010',
                    testimonial:
                        'Obliviously your knowledge and expertise in firearms was paramount, but your ability to communicate with the jury congenially and knowledgeably rendered you both memorable and credible. I believe that the demonstrative exhibits which you prepared were helpful to the jury and my client. Finally your handling of the rather aggressive examinations by the deputy district attorney at the rule 702 hearing and at trial was admirable as you maintained composure and confidence on the stand.',
                },
                {
                    name: 'Randy Godin',
                    title: 'Personal injury attorney, California',
                    date: '2012',
                    testimonial:
                        'During litigation, we affiliated with Mr. Carl Weil who is highly qualified in the area of wilderness medicine and recreational activities. His Curriculum Vitae sheds some light on his skills and values. What is not mentioned is that Mr. Weil is very knowledgeable with rock climbing standards, recreational activity standards and the practices of the professionals from each activity. Mr. Weil provided expert review of our case, made site inspections, appeared for deposition and prepared for trial. Mr. Weil\'s unique knowledge of film and television along with his mountaineering background as a member of the American Mountain Guide Association was invaluable to our case.',
                },
                {
                    name: 'Brad R. Irwin, Esq.',
                    title: 'IRWIN FRALEY, PLLC, Centennial, Colorado',
                    date: '2026',
                    testimonial:
                        'Carl was an expert for us in a difficult indoor rock climbing case. His knowledge and professionalism were exceptional and we were able to resolve the case for a severely disabled client that will help to support him throughout the rest of his life. Carl did an outstanding job and I would recommended him as an expert in any outdoor, wilderness, or rock climbing case. Thank you Carl for a job well done!',
                },
                {
                    name: 'Edward J. O\'Brien, Esq.',
                    title: 'Law Offices of Edward J. O\'Brien, Braintree, Massachusetts',
                    date: '2022',
                    testimonial:
                        'Great work on the Walsh case. I just wanted to let you know that your efforts were instrumental in resolving my rather difficult liability case where my client suffered a disabling injury at a rock climbing facility after signing a liability waiver. Your insight into the rock climbing facility industry and knowledge of applicable safety standards greatly assisted me in discovery and pursuit of legal theories. Your expert report concisely laid out the bases of liability and was the key piece in defeating the defendant\'s motion for summary judgment, which then led to a successful resolution of the case. Many thanks to you for a job well done!',
                },
            ],
        }),
    },
    fees: {
        headline: field.text({
            label: 'Fees Headline',
            default: 'Fees & scheduling',
        }),
        tagline: field.text({
            label: 'Fees Tagline',
            default: 'He offers a free initial review',
        }),
        body: field.textarea({
            label: 'Fees Body',
            default:
                'For away from home overnight trips, he charges for an 8 hr day plus meals, transportation and room. If the evening time is his to do as he sees fit, he does not charge for it. If he has to hire someone to cover evening teaching that he frequently does, there is an extra charge. Advanced scheduling usually prevents this extra charge.\n\nTrial and out of area deposition days are charged at a minimum of an 8 hour day for each day or partial day on location. Client need to arrange to prepays travel costs. Depositions in the Denver or Colorado Springs area are charged at a minimum of a ½ day.',
        }),
        asideHeading: field.text({
            label: 'Fees Aside Heading',
            default: 'At a glance',
        }),
        highlights: field.repeater({
            label: 'Fees Highlights',
            itemSchema: {
                title: field.text({ label: 'Title', default: '' }),
                detail: field.textarea({ label: 'Detail', default: '' }),
            },
            default: [
                {
                    title: 'Free initial review',
                    detail: 'Call [(303) 688-5176](tel:+13036885176) with a brief essence of the case and the state the activity is located in.',
                },
                {
                    title: 'Local depositions',
                    detail: 'Denver and Colorado Springs depositions are a ½-day minimum.',
                },
                {
                    title: 'Expert associates',
                    detail: 'Four associates can work with Carl or independently, based on the client’s needs.',
                },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Call now for a free initial review',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) with a brief essence of the case and the state the activity is located in — or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com).',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to send details in writing? Use the contact page',
        }),
    },
});
