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
            default: 'Climbing - Mountaineering',
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
            default: 'Expert Page on Rock Climbing Gyms, Traditional Climbing and Mountaineering',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Call now [(303) 688-5176](tel:+13036885176) with a brief essence of the case and climbing location',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                'Or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Carl has reviewed over 400 climbing situations, gyms and traditional. Recommendation on a case in this field follows. Other recommendation’s available.',
        }),
    },
    about: {
        eyebrow: field.text({
            label: 'About Eyebrow',
            default: 'Climbing expertise',
        }),
        title: field.text({
            label: 'About Title',
            default: 'Rock climbing gyms, traditional climbing, and mountaineering',
        }),
        body: field.textarea({
            label: 'About Body',
            default:
                'Expertise in the field of Rock Climbing [traditional and bolted], rock climbing gyms [belayed or solo free] and Mountaineering [from technical to hiking]. Available for consult on cases for plaintiff or defendants. Expert reports on each case available. Free initial evaluation on first call.',
        }),
        supportContent: field.textarea({
            label: 'About Support Content',
            default:
                'Mr. Weil provided expert review, site inspections, deposition, and trial preparation on climbing cases, including film and television work. His mountaineering background as a member of the American Mountain Guide Association is frequently cited by counsel.',
        }),
        image: field.image({
            label: 'About Image',
            default: '/images/content/carlinriver.png',
        }),
        imageAlt: field.text({
            label: 'About Image Alt',
            default: 'Carl Weil in a river during outdoor work',
        }),
        trustSignals: field.repeater({
            label: 'Trust Signals',
            itemSchema: {
                value: field.text({ label: 'Value', default: '' }),
                label: field.text({ label: 'Label', default: '' }),
            },
            default: [
                { value: '400+', label: 'Climbing situations, gyms, and traditional reviews' },
                { value: 'AMGA', label: 'Mountaineering background, American Mountain Guide Association' },
                { value: 'Free', label: 'Initial evaluation on the first call' },
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
                    name: 'Randy Godin, Esq.',
                    title: 'Law Offices of Lowell Steiger, Beverly Hills, CA',
                    date: 'May 16, 2012',
                    testimonial:
                        'I am a personal injury and medical malpractice attorney practicing law in the State of California before the federal and state courts. In 2011 and 2012, I was lead counsel in the case of RC Everbeck v. Anonymous Content, LLC et al. LASC Case No.: SC106967. The Everbeck case involved a stunt actor who suffered serious personal injuries while rock climbing during the filming of a television commercial. I represented Plaintiff in an action brought against numerous defendants alleging personal injury and products liability. During litigation, we affiliated with Mr. Carl Weil. Mr. Weil is highly qualified in the area of wilderness medicine and recreational activities. His Curriculum Vitae sheds some light on his skills and values. What is not mentioned is that Mr. Weil is very knowledgeable with rock climbing standards, recreational activity standards and the practices of the professionals from each activity. Mr. Weil provided expert review of our case, made site inspections, appeared for deposition and prepared for trial. Mr. Weil\'s unique knowledge of film and television along with his mountaineering background as a member of the American Mountain Guide Association was invaluable to our case. Accordingly, I highly recommend Carl Weil as an expert in the area of recreation and mountaineering.',
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
                'Call [(303) 688-5176](tel:+13036885176) with a brief essence of the case and climbing location — or email the same information to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com). Free initial evaluation on first call.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
