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
            default: "Gallery",
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
    gallery: {
        eyebrow: field.text({
            label: 'Gallery Eyebrow',
            default: '',
        }),
        title: field.text({
            label: 'Gallery Title',
            default: 'Class Photos',
        }),
        description: field.textarea({
            label: 'Gallery Description',
            default: '',
        }),
        items: field.repeater({
            label: 'Class Photos',
            itemSchema: {
                src: field.image({ label: 'Image', default: '' }),
                alt: field.text({ label: 'Alt text', default: '' }),
                title: field.text({ label: 'Title', default: '' }),
            },
            default: [
                {
                    src: "/images/content/CARL.jpg",
                    alt: "Director Carl Weil",
                    title: "Director Carl Weil",
                },
                {
                    src: "/images/content/Litter_building_Elizabeth_090816_web.jpg",
                    alt: "Wilderness First Responder students at work",
                    title: "Wilderness First Responder students learning",
                },
                {
                    src: "/images/content/helo_med.jpg",
                    alt: "Students get an upclose look at a medical evacuation helicopter",
                    title: "Students learn real helicopter evacuation procedures",
                },
                {
                    src: "/images/content/landscape_II_full.jpg",
                    alt: "Scenic view around the school",
                    title: "Scenic view around the school",
                },
                {
                    src: "/images/content/med_full.jpg",
                    alt: "Students having fun and learning!",
                    title: "Students having fun and learning!",
                },
                {
                    src: "/images/content/students_full.jpg",
                    alt: "Students making the most of the beautiful day",
                    title: "Students working as a team",
                },
                {
                    src: "/images/content/trauma_full.jpg",
                    alt: "Students at work",
                    title: "More teamwork",
                },
                {
                    src: "/images/content/web2half.jpg",
                    alt: "The facilities at WMO",
                    title: "Teaching facilities",
                },
                {
                    src: "/images/content/eviseration_med.jpg",
                    alt: "Wilderness First Responder Students at work",
                    title: "Practice scenario",
                },
                {
                    src: "/images/content/AFD-small.jpg",
                    alt: "Avalanche Flotation Device",
                    title: "Practice with Avalanche Flotation Device",
                },
                {
                    src: "/images/content/MarinesClass1.jpg",
                    alt: "Wilderness First Responder student assisting Carl Weil, WMO's Director, doing Heavy Trauma Training for Marines on their way to Iraq",
                    title: "Carl and staff training marines before deployment",
                },
                {
                    src: "/images/content/MarinesClass2.jpg",
                    alt: "Carl Weil, WMO's Director, doing Heavy Trauma Training for Marines on their way to Iraq",
                    title: "Carl and staff giving Heavy Trauma Training before deployment.",
                },
                {
                    src: "/images/content/skills_med.jpg",
                    alt: "Many different skills are practiced during training, including knots and some rope work",
                    title: "Teaching useful knots",
                },
                {
                    src: "/images/content/Page2-untitled1.jpg",
                    alt: "Director Carl playing around on Pikes Peak",
                    title: "Director carl doing rope training on pikes peak",
                },
                {
                    src: "/images/content/Page2-untitled2.jpg",
                    alt: "WFR student learning how to safely carry your own weight for evacuation (and fun!)",
                    title: "Learning how to carry a safe weight for evacuation.",
                },
                {
                    src: "/images/content/Page2-untitled3.jpg",
                    alt: "WMO's annual winter 9 day in beautiful Pikes Peak Lodge",
                    title: "WMO's annual winter 9 day in beautiful Pikes Peak Lodge",
                },
                {
                    src: "/images/content/Page2-untitled4.jpg",
                    alt: "One more picture of the lodge",
                    title: "One more picture of the lodge",
                },
                {
                    src: "/images/content/Page2-untitled5.jpg",
                    alt: "Learning safety rope work",
                    title: "Learning safety rope work",
                },
                {
                    src: "/images/content/cwandrobert.jpg",
                    alt: "Director Carl and Instructor Robert relaxing after class at the Colorado YMCA",
                    title: "Director Carl and Instructor Robert relaxing after class at the Colorado YMCA",
                },
                {
                    src: "/images/content/final2_med.jpg",
                    alt: "Come join us for some of the best wilderness training to be found in Colorado, let alone the U.S.!",
                    title: "",
                },
                {
                    src: "/images/content/final_med.jpg",
                    alt: "Come join us for some of the best wilderness training to be found in Colorado, let alone the U.S.!",
                    title: "More group training",
                },
                {
                    src: "/images/content/shower_med.jpg",
                    alt: "The school has a solar shower for those who choose to camp at the school during training",
                    title: "Solar shower for those camping at school",
                },
                {
                    src: "/images/content/water_mid.jpg",
                    alt: "Wilderness Medicine Outfitters prides itself on the variety of training that we can provide",
                    title: "WMO Doing water rescue training",
                },
                {
                    src: "/images/content/web1half.jpg",
                    alt: "It added additional protection from the elements, as well as creating more teaching space",
                    title: "WMO facilities on its 120 conservation acres",
                },
                {
                    src: "/images/content/web3half.jpg",
                    alt: "Practice, practice, practice....",
                    title: "Practice for automobile accident on the way to an outdoor adventure",
                },
                {
                    src: "/images/content/web5half.jpg",
                    alt: "Our students come from all walks of life...",
                    title: "Students making new friends and practicing new skills",
                },
                {
                    src: "/images/content/web7half.jpg",
                    alt: "Another group of satisfied students!",
                    title: "Practicing rescue work",
                },
                {
                    src: "/images/content/DirectorsHome_250.JPG",
                    alt: "directors home with heavy summer grass",
                    title: "",
                },
                {
                    src: "/images/content/SouthFacingSolar_250.JPG",
                    alt: "south facing solar gain",
                    title: "",
                },
                {
                    src: "/images/content/HappyCamperStudents_250.jpg",
                    alt: "happy camper students packaging a happy patient",
                    title: "",
                },
                {
                    src: "/images/content/RingCarry_250.jpg",
                    alt: "ring carry with one triangle",
                    title: "Evacuating only using a triangle bandage",
                },
                {
                    src: "/images/content/2PersonPackCarry_250.jpg",
                    alt: "2 person pack carry",
                    title: "More robust setup for longer evacuation",
                },
                {
                    src: "/images/content/ElizWFRAug2014_250.jpg",
                    alt: "Elizabeth WFR class",
                    title: "Typical class of new friends",
                },
                {
                    src: "/images/content/WinterClass10000_250.png",
                    alt: "Winter in lodge class at 10,000'",
                    title: "",
                },
            ],
        }),
    },
    cta: {
        heading: field.text({
            label: 'CTA Heading',
            default: "Ready to join a class?",
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
