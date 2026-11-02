/**
 * **CURSOR INFO**
 * SECTION TYPE: Upcoming class schedule table
 * BEST FOR: Home page class listings and registration prompts
 * VISUAL STYLE: Sharp, minimal, professional; charcoal header, tea-green accents
 * LAYOUT: Section heading and intro above a three-column table (stacked cards on mobile)
 * CONTENT ELEMENTS: Heading, intro, class name, description, location
 * CONVERSION ROLE: Show current offerings and drive a call or contact to register
 * IDEAL POSITION: After about/stats, before featured courses
 * NOTES / MODIFIERS: Zinc-50 band between white sections; semantic table with mobile card fallback; CMS-driven rows
 */

import { MapPin } from 'lucide-react';
import { SectionHeading } from '@/Components/UI/SectionHeading';

export type UpcomingClass = {
    name: string;
    description: string;
    location: string;
};

type UpcomingClassesSectionProps = {
    heading?: string;
    intro?: string;
    nameColumn?: string;
    descriptionColumn?: string;
    locationColumn?: string;
    classes?: UpcomingClass[];
};

const defaultClasses: UpcomingClass[] = [
    {
        name: 'WMO Mission',
        description: 'Help prevent medical problems and treat those not prevented.',
        location: 'Access and treat what occurs',
    },
    {
        name: '27 Free Mini-Lessons — Group 1, online',
        description: 'Register free by emailing mediccarl@gmail.com.',
        location: 'Applicable for many credential recertifications',
    },
    {
        name: '10 to 30 FAWM Credits for WMS members',
        description: 'Taught by an MD and Wilderness Medicine Master.',
        location: 'Utah & Colorado',
    },
    {
        name: '20-hour Wilderness First Aid',
        description: '4 lessons online followed by a 4-hour skill session.',
        location: 'In person or Zoom skills — (303) 688-5176',
    },
    {
        name: 'WFA blended classes',
        description: 'Monthly, April through August.',
        location: 'Pennsylvania, Louisiana, Kansas, Colorado, Utah, Idaho, or your town',
    },
    {
        name: 'EMR & AWFA',
        description:
            'EMR / AWFA module blended: 11 online lessons plus Zoom. Medical skills for self-reliant outdoors folk.',
        location: 'Your town',
    },
    {
        name: 'WFA Texto Español',
        description: 'Bilingual English/Spanish, Washington.',
        location: 'English is the class language; WFA Texto Español also available',
    },
    {
        name: 'Ordering supplies',
        description: 'Email to confirm in stock; confirm shipping address — call for foreign shipping.',
        location: 'You pay state taxes',
    },
];

export function UpcomingClassesSection({
    heading = 'Upcoming Classes',
    intro = 'Dates vary — call (303) 688-5176 to confirm a session or host a class in your town.',
    nameColumn = 'Upcoming Class',
    descriptionColumn = 'Class Description',
    locationColumn = 'Class Location',
    classes = defaultClasses,
}: UpcomingClassesSectionProps) {
    return (
        <section
            id="upcoming-classes"
            className="bg-zinc-50 py-8 md:py-16 lg:py-24"
        >
            <div className="mx-auto max-w-7xl flex flex-col gap-8 px-4 md:gap-12 md:px-8 lg:px-12">
                <SectionHeading title={heading} />
                {intro ? (
                    <p className="max-w-2xl text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg">
                        {intro}
                    </p>
                ) : null}

                <div className="flex flex-col gap-4 md:hidden">
                    {classes.map((item) => (
                        <article
                            key={item.name}
                            className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4"
                        >
                            <h3 className="text-base font-bold text-charcoal-brown-950">{item.name}</h3>
                            <p className="text-sm font-light leading-relaxed text-charcoal-brown-800">
                                {item.description}
                            </p>
                            <p className="flex items-start gap-2 text-sm text-charcoal-brown-800">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tea-green-500" aria-hidden />
                                <span>{item.location}</span>
                            </p>
                        </article>
                    ))}
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-left">
                        <caption className="sr-only">{heading}</caption>
                        <thead className="bg-charcoal-brown-900 text-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-4 text-xs font-semibold uppercase tracking-widest lg:px-6"
                                >
                                    {nameColumn}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-4 text-xs font-semibold uppercase tracking-widest lg:px-6"
                                >
                                    {descriptionColumn}
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-4 text-xs font-semibold uppercase tracking-widest lg:px-6"
                                >
                                    {locationColumn}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((item) => (
                                <tr
                                    key={item.name}
                                    className="border-b border-zinc-200 align-top last:border-b-0"
                                >
                                    <th
                                        scope="row"
                                        className="px-4 py-4 text-sm font-bold text-charcoal-brown-950 lg:px-6 lg:py-5 lg:text-base"
                                    >
                                        {item.name}
                                    </th>
                                    <td className="px-4 py-4 text-sm font-light leading-relaxed text-charcoal-brown-800 lg:px-6 lg:py-5 lg:text-base">
                                        {item.description}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-charcoal-brown-800 lg:px-6 lg:py-5 lg:text-base">
                                        <span className="flex items-start gap-2">
                                            <MapPin
                                                className="mt-0.5 h-4 w-4 shrink-0 text-tea-green-500"
                                                aria-hidden
                                            />
                                            <span>{item.location}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
