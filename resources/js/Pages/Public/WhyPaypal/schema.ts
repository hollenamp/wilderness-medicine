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
            default: "Why PayPal?",
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
            default: 'Why does WMO use PayPal?',
        }),
        tagline: field.text({
            label: 'Intro Tagline',
            default: 'You do not have to create a PayPal account',
        }),
        body: field.textarea({
            label: 'Intro Body',
            default: "Some folks don't like using (or not allowed to use) PayPal. So, why does Wilderness Medicine Outfitters (WMO) use PayPal?",
        }),
    },
    reasons: {
        eyebrow: field.text({
            label: 'Reasons Eyebrow',
            default: 'Why PayPal?',
        }),
        heading: field.text({
            label: 'Reasons Heading',
            default: 'Five reasons WMO uses PayPal',
        }),
        tagline: field.text({
            label: 'Reasons Tagline',
            default: 'Safe, easy, and reliable',
        }),
        body: field.textarea({
            label: 'Reasons Body',
            default: '',
        }),
        items: field.repeater({
            label: 'Reasons',
            itemSchema: {
                text: field.textarea({ label: 'Reason', default: '' }),
            },
            default: [
                { text: "**Its safe.**\n\nWilderness Medicine Outfitters (WMO) is a small company. By the very nature of our business, we are \"low tech\".\n\nPayPal is probably the single largest online payment processing service in existence in terms of both transactions and dollars processed. They know more about security, firewalls, encryption, SSL and all that stuff than probably anybody. If WMO were to accept and process Credit Cards ourselves, you would have to provide your credit card number directly to WMO. We simply cannot protect that valuable information the way PayPal can. Whether someone is \"dumpster diving\", an unscrupulous employee at our ISP, our webmaster, database backups, WiFi hacking, etc. WMO cannot safeguard it like PayPal can. By using PayPal, WMO NEVER even comes into contact with your credit card number, so we can't lose it. Truthfully, whenever we use online retailers that we know are small companies as well, and they are not using PayPal or a large online store service such as \"Yahoo Stores\" (that is, they are running their own website, online store and CC service), we get concerned about handing over our CC number for all the above reasons." },
                { text: "**Its Easy for the customer**\n\nYou DO NOT have to create a PayPal account in order to pay us *through* PayPal. PayPal accepts all major credit cards. Just pay your single transaction and you are done. You do not have to create an account, link it to a bank, or anything like that. Simply click on the \"Don't have a PayPal account?\" link on the lower right side when you get to the PayPal website. You receive an email direct from PayPal with all the transaction details for your records." },
                { text: "**Its reliable**\n\nIf WMO processed credit card payments ourselves, we would have to use a \"gateway\" and related services. Plus we would have to encrypt our databases, use SSL, etc. Frankly, it would probably be broken most of the time. With PayPal, we know it will be up and running all the time with no lost transactions." },
                { text: "**Its easy for WMO**\n\nAll of the above adds up to ease for us. That doesn't benefit you directly, but by making WMO lives easier, we can focus on providing quality training and products to our customers." },
                { text: "**But I had a bad experience with PayPal or my company doesn't allow this...**\n\nPerhaps you had a bad experience with PayPal or their parent company eBay. Maybe you knew someone that did. Or you heard about how on the internet, PayPal users have... whatever. We have used PayPal for over 7 years with no problems. In the millions (billions?) of transactions PayPal has processed, we're sure there are more than a few that have not gone as smoothly as intended. If you simply do not want to pay for our products and services with PayPal, then contact our office and we will arrange another method such as check or money order." },
            ],
        }),
        footerHeading: field.text({
            label: 'Closing Heading',
            default: 'Sincerely',
        }),
        footerBody: field.textarea({
            label: 'Closing Body',
            default: "Carl Weil - Director\nWilderness Medicine Outfitters",
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
