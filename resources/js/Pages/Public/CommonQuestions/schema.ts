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
            default: "Common Questions",
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
            default: 'Frequently Asked Questions',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'Class format, deposits, camping, credits, and more',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "Answers to the questions students ask most about Wilderness Medicine Outfitters classes, locations, and credentials.",
        }),
    },
    faqs: {
        items: field.repeater({
            label: 'Questions',
            itemSchema: {
                question: field.text({ label: 'Question', default: '' }),
                answer: field.textarea({ label: 'Answer', default: '' }),
            },
            default: [
                {
                    question: "WFR or WEMT  which and why?",
                    answer: "**Background:** both are based on Department of Transportation Programs originated in the late 1960’s. First Responders (FR) is min of 40 hrs while EMT is 110. WFR programs are usually 70-80 hrs vs WEMT 110-200hrs. EMTs are only required on ambulances (most not all). Lower population rural counties by statue often accept FRs or first aiders on their ambulances. WMO was the first wilderness school to obtained approvals for both FR and EMTs from the State of Colorado. As of 2004 WMO no longer carries these approvals.\n\n**City Ambulance:** Become an EMT\n\nFor those folks who are actually a crew member on an ambulance.  These EMTs have to be very careful never to do more than their state statues allow. Many mistakenly think that their Dr., Government agency, or need, overrides the law and protects them. Not true, a rude awakening awaits those who have not read their states current statute. **EMTs MAY face Felony Criminal Charges for performing many accepted back country wilderness skills even with Physician approval as Physicians do not have authority to grant to EMTs**\n\n**Back Country Care:** Become a WFR.\n\nWilderness Medicine Outfitters (WMO) urges you to get high-level training but suggests, as has the state of Colorado EMS division (EMT director Dave Miller) that you become a WFR vs EMT unless you want to strictly limit your self to ambulance work.\n\n**What an EMT can DO:** Do only the limited acts allowed by the state. Docs must have state board approval to extend authority\n\nOnly give the following drugs **only advantage - work on an ambulance!**\n\n1. sugars\n\n2. oxygen\n\n3. albuterol\n\n4. charcoal\n\n5. aspirin\n\n6. patients auto injector Epi\n\nProvide standard transport with splinting and bandaging by ambulance\n\n**What a WFR can DO:** HAVE ANY EXTENSION OF CARE GIVING AS APPROVED BY PHYSICIANS\n\n  advantage - give great care only limited by your skills\n\nGive all drugs allowed by their physician including the EMT 6 such as:\n\n1. Altitude Meds; decahedron nifipidien, Diamox, etc.\n\n2. Antibotics: penicillin, bacterium, Cipro, Keflex, leviquine, etc.\n\n3. EPI in any form; auto injector, theirs, yours, inhaler, Anakit, Anaguard, needle / syringe\n\n4. Respiratory drugs: albuterol, etc.\n\n5. Specialty medications; numerous / varied\n\n6. Pain medications: Empirine 3, Codeine, Stadol, loracet, Demerol, Darvon, etc.\n\nProvide advanced care, small surgeries, improvised treatments, wound closure, as well as standard transport with splinting and bandaging by any transport means.\n\n**Do WEMTs have more training than WMOs WFRs?** No, WMOs WFRs uniquely have more skill and knowledge presented to them than most standard wemt or EMT program. WMOs WEMT  program has the same skills and knowledge as our WFR program. To advance take WMO Wilderness Advanced Life Support",
                },
                {
                    question: "What are the hours of the 9-day classes?",
                    answer: "Usually 8am - 6pm Saturday through the following Sunday.The first day starts 1/2 hour earlier at 7:30am as do evening sessions first night at 5:30 vs 6 pm.  Most classes get out between 2pm and 4pm Wednesday afternoon. Still a total of 76 Hrs.\n\nDirections to Elizabeth Driving Directions\n\nEast on highway 86 from Franktown to Elizabeth. Turn right (south) at 1st traffic light, which is Elizabeth Street (Safeway center on corner). Go to end of this street and turn left. Go to 4 way stop sign and turn right (south). Go to T intersection and turn right (west); go up and over the hill then down across a small valley. Start up 2nd hill and turn right into driveway marked \"C Weil.\"",
                },
                {
                    question: "FAWM How can WMO help me in the pursuit of my fellow degree?",
                    answer: "The FAWM candidate can use WMO Expedition Medic course along with WMO WFR/WEMT module to complete the majority of class requirements along with our specially developed experience credits program toward their Fellow pursuit.",
                },
                {
                    question: "Are there other scheduled classes I can take?",
                    answer: "Yes! In Boulder, Colorado Springs, Golden, Elizabeth, Western Slope-Colorado, Kansas and other locations from month to month as well as Distance Learning both short, WFA20 and long AWFA48, any time any where .  We offer classes that are two nights a week for 6 weeks with 3 weekend days selected on the 2nd or 3rd class night.\n\nClasses run from 6 to 10 PM.\n\n*Note: Occasionally, some classes are scheduled more on weekends - ask if you are interested in one of these classes. They usually are 8 amto 5 pm",
                },
                {
                    question: "Which course do you recommend?",
                    answer: "The Wilderness First Responder / Wilderness EMT module is for everyone from the inexperienced to the medically experienced (this class is even good for paramedics or MDs.Some folks just dont have 9 days they are willing to devote so WMO created the short distance learning 5 lesson WFA 20 and the longer AWFA 48 do be done from your computer in your owntime.Folks often do those and then take an in person class - call WMO to create your learning program.",
                },
                {
                    question: "What are Driving Instructions to Elizabeth?",
                    answer: "ELIZABETH DRIVING DIRECTIONS- East on highway 86 from Franktown to Elizabeth. Turn right (south) at 1st traffic light, which is Elizabeth Street (Safeway center on corner). Go to end of this street and turn left. Go to 4 way stop sign and turn right (south). Go to T intersection and turn right (west); go up and over the hill [do not turn left!]  then down across a small valley. Start up 2nd hill and turn right into driveway marked \"Wilderness Medicine Outfitters\" and \"C Weil.\"",
                },
                {
                    question: "Where is the Golden class usually held?",
                    answer: "Golden High School has been on of our locations for almost 2 decades. Class rooms and locations change. You should call WMO office for more details 30 days in advance and allow an hour extra first night if never there before.",
                },
                {
                    question: "Are there any prerequisites?",
                    answer: "Only that you read write, speak, and comprehend English and are able to lift and carry 125 lbs. by your self and 250 lbs. with a partner for a short distance. The expedition Medic class -WALS does require WFR/WEMT or approval of a strong background from the Director. Call for review.",
                },
                {
                    question: "What happens to my deposit?",
                    answer: "It applies to class cost. You can transfer classes for a $40 fee out of your earned deposit.  It is only refunded if the class is canceled.",
                },
                {
                    question: "Where do I mail my check?",
                    answer: "Wilderness Medicine Outfitters, 2477 Co. Rd. 132, Elizabeth CO  80107.\n\nWhile 2nd day USMail, UPS or Fed-X is a good choice, certified mail may delay delivery several days until we can get to the post office.",
                },
                {
                    question: "I want to sign up now and don't want someone else to get the last spot in the class. Does WMO take Credit Cards?",
                    answer: "We can do better. Mail your deposit of $100, then call us giving your NAME, PHONE#, WHEN MAILED, and we will hold a space for you as though we already had your deposit.\n\nIf you would prefer to pay with a credit card you can do so on Paypal to [carl@wildernessmedicine.com](mailto:carl@wildernessmedicine.com) (Note: There will be a 4% accounting fee with paypal.)",
                },
                {
                    question: "How many students are in each class?",
                    answer: "Class size is limited to 24 students.",
                },
                {
                    question: "Will it be outdoors or in a class room? What's the format?",
                    answer: "Nine day classes are held at a rural location with as much activity outdoors as weather allows.  Approximately 1/3 of the time is spent in lecture, 1/3 in Q&A and demonstration and 1/3 in student practice.  6 week classes are similar with 2/3 in evening class rooms and 1/3 on three weekend field days.",
                },
                {
                    question: "Structure of the 6 week class is as follows",
                    answer: "Two nights a week either Mon/Wed or Tue/Thu depending which night it starts.\n\n6pm to 10 pm\n\n3 weekend days in local area selected by the class on the third evening\n\nweekend days are 8am to 5:30pm [with minor variations]",
                },
                {
                    question: "Should I spend $10 to get my books sent early?",
                    answer: "We recommend getting your books early to study.  There are 3 books, 1 by Dr. Forgey and 2 by Carl Weil",
                },
                {
                    question: "Where can I see what is covered in the course?",
                    answer: "Class outlines are kept on our web site at: [WFR Outline](/classes/wfr)\n\nCopies can also be sent by email, mail or fax (sending a self addressed stamped envelope and request lets you get by postal)",
                },
                {
                    question: "Is the lunch program a good deal?",
                    answer: "There has not been enough interest recently, BUT if enough people [10+] sign up and request early we will attempt to set up again. When done, it is planned as a healthy & plentiful meal so you can make the most of your 1 hour break. There are food choices for vegetarians, vegans[if they let us know early] and omnivores. It is priced at the non-profit break even cost. Groups often must share in work load around meals.",
                },
                {
                    question: "What about camping at the Elizabeth location?",
                    answer: "It is a primitive tenting camp on 129 acre private site with porta potties, a solar shower stall, trees, hills, creek, ice chest, water coolers, picnic tables, 20 minutes from good rock climbing with county dirt roads good for ATVs.  There are starry nights with beautiful seasonal wildflowers and interesting flora and fauna. One primitive cabin for 1 or 2 is available $175 to $225, subject to change.",
                },
                {
                    question: "Who takes these classes?",
                    answer: "About 1/3 are professionals in the outdoor industry or are seeking jobs in the outdoor industry.  1/2 are outdoor recreational enthusiasts.  Some are self sufficiency enthusiast.  2/3 are men and 1/3 are women with an average age in their 20s ranging from their late teens to the 70s.  As a generalization, they are caring, educated folks who have seen an accident and want to be better prepared to handle the next one. first time camp counselors and scout leaders often take the distance learning WFA 20 before a longer course that gives them better caregiving skills.",
                },
                {
                    question: "Does WMO offer extra tests and what is recommended?",
                    answer: "While this varies from year to year, none are recommended as of 2011.",
                },
                {
                    question: "Is the training difficult?",
                    answer: "Academically, you will have to study, but it is not physically strenuous.",
                },
                {
                    question: "Does your web site have a complete class listing schedule?",
                    answer: "While we do update the web site, the most current data is obtained by calling.",
                },
                {
                    question: "We want a class at our location. What is the minimum cost?",
                    answer: "For medical classes, the minimum number of students is usually 10.  If you have fewer people than that, we still charge for the minimum number of people times the class cost.  Call for other subject matters on the class minimums.",
                },
                {
                    question: "Can I get College credits?",
                    answer: "Yes, the WFR/WEMT (76 hours) offers 4 hours of credit through the College Systems. This must be applied for at class start. Call for current cost.",
                },
                {
                    question: "Are Scholarships available?",
                    answer: "Yes!  $75 scholarship(s) are given at least once a year or more if funds allow in remembrance of:\n**Lilly Bell Fox Weil** (1892-1956) - A humanitarian and a Texan who always had a kind and helping hand for those who needed help.\n\n**Don McIntyre** (1942-1997) - Mountain guide, retired military, and diplomat who was a giver and was a friend to family, country, and friends.  Don was a friend and graduate of WMO.\n\n**Sgt. Hugh W. Purdy** (1923-1976) - Colorado State Patrol, public care giver, Hero Killed in the line of duty, while off-duty saving 100's of lives in the Big Thompson Flood.\n\n**To Apply:** Work study and loans can be arranged over the phone, but require a written confirmation of the agreement from the student before activated.\n\nScholarships require a written request before consideration.  Students applying for a scholarship should present a well-written letter demonstrating financial need, merit, past and planed future care of others. These are meant for those who \"engage in direct care giving efforts\"",
                },
                {
                    question: "Is there a professional organization devoted to helping teaching groups and students?",
                    answer: "POME. POME is a non-profit Professional Outdoor Medical Educator group open to all schools, meeting a higher standard, helping interested students find classes and making recertification easier.\n\n[CLICK HERE TO LEARN MORE AND FIND OTHER MEMBER SCHOOLS AROUND THE USA](/resource#pome)",
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
