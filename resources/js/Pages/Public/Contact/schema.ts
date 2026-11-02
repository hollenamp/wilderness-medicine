import { definePage } from '@/Components/CMS/definePage';
import { field } from '@/Components/CMS/fields';

export default definePage({
    hero: {
        tagline: field.text({
            label: 'Hero Tagline',
            default: 'contact',
        }),
        headline: field.text({
            label: 'Hero Headline',
            default: 'Wilderness Medicine Outfitters',
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
    contact: {
        heading: field.text({
            label: 'Contact Section Heading',
            default: 'Contact Information',
        }),
        body: field.textarea({
            label: 'Contact Form Intro',
            default:
                'Please leave your phone number and questions so we can respond to your inquiry as quickly as possible.',
        }),
        formHeading: field.text({
            label: 'Contact Form Heading',
            default: 'Send a Message',
        }),
        ctaLabel: field.text({
            label: 'Contact Button Label',
            default: 'Contact Me',
        }),
    },
    directions: {
        tagline: field.text({
            label: 'Directions Tagline',
            default: '2477 County Road 132, Elizabeth, Colorado 80107',
        }),
        headline: field.text({
            label: 'Directions Headline',
            default: 'Driving Directions',
        }),
        body: field.textarea({
            label: 'Directions Body',
            default:
                'East on Highway 86 from Franktown to Elizabeth. Turn right (south) at the 1st traffic light, which is Elizabeth Street (Safeway center on the corner). Go to the end of this street and turn left. Go to the 4-way stop sign and turn right (south). Go to the "T" intersection and turn right (west) — go up and over the hill (do not turn left), then down across a small valley. Start up the 2nd hill and turn right into the driveway marked "C Weil."',
        }),
    },
});
