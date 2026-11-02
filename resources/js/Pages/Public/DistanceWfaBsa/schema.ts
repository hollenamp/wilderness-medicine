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
            default: 'WFA-BSA',
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
            default: 'WFA-BSA Information',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Scouting and Scouts BSA Guidelines',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default:
                '**Scouting and Scouts BSA Guidelines** regarding Wilderness First Aid (WFA) training.\n\nWe have created a website dedicated to answering your questions on this topic at: [WFA-BSA.com](http://WFA-BSA.com)\n\n**We are asked daily if we can help with a skill instructor in *[blank]* town and YES WE CAN but we need your help to get you trained in time with the skill instruction listed** under details. [Read more about the WFA20 Course details](/classes/wfa20).\n\nWFA is required for all Philmont Treks, Northern Tier Canoe Expeditions and Seabase Adventures.\n\nPhilmont Treks, Northern Tier expeditions and Seabase now require at least one member per crew to have Wilderness First Aid (WFA) training. That is, ANY approved WFA training course where the certification is still current (typically 2 years) will qualify.\n\nThe change from past years is that the training must now be a *Wilderness First Aid* course, not simply a First Aid course.\n\n**** **NEW 2022 enrolled student can ask for WFA TEXTO ESPAÑOL helps with understanding for English as 2 language students** ***\n\nSo, if at least one member of your Philmont Trek, Northern Tier expedition crew or Seabase crew has an approved current Wilderness First Aid certification, you are good to go. If not, you will require training prior to arrival at your trek so check out WMO and sign up early.\n\n**Having TWO trained is far better** so the care giver can have care AND the boys [if more than one are injured] can have faster care.\n\nAt Wilderness Medicine Outfitters, we offer a Distance Learning, online and blended, WFA 20 Hour Course. **You set the time to study! You pick a location and date** for the hands on personal training near you! You are no longer tied to a schedule you have little control of. CPR and AED can be added as an option as well on line with hands on skill instruction from your private or group instructor in your area. We encourage you not to wait until the last minute. Click the link below to get started right away. WMO Distance learning can save your time and money.\n\nThere is a list of 12 Schools on the BSA Philmont trek site of which **WMO is one of the BSA listed approved schools.**',
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: 'Sign up early — do not wait until the last minute',
        }),
        body: field.textarea({
            label: 'CTA Body',
            default:
                'Call [(303) 688-5176](tel:+13036885176) to get started on the Distance Learning WFA 20 Hour Course, or visit [WFA-BSA.com](http://WFA-BSA.com) for Scouting-specific answers. WMO Distance learning can save your time and money.',
        }),
        scrollHint: field.text({
            label: 'CTA Scroll Hint',
            default: 'Prefer to write it out? Use the contact page',
        }),
    },
});
