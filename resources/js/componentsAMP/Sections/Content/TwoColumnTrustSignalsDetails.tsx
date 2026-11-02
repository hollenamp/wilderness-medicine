"use client";

/**
 * **CURSOR INFO**
 * SECTION TYPE: Detailed about and credentials section
 * BEST FOR: About pages, service pages, trust-building middle sections
 * VISUAL STYLE: Professional, modern, clean
 * LAYOUT: Two-column split (copy + image/trust signals) followed by four-card details grid
 * CONTENT ELEMENTS: Eyebrow, headline, body/support copy, image, trust signal cards, CV CTA, detail cards, contact CTA
 * CONVERSION ROLE: Build credibility and guide visitors to contact
 * IDEAL POSITION: Mid-page after intro/services and before testimonials or final CTA
 * NOTES / MODIFIERS: Motion-on-scroll reveals, optional trust signals via props, customizable copy/image content
 */

import Image from "next/image";
import { Award, Flame, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/Button";
import Link from "next/link";
import { BookOpen, Scale, Users } from "lucide-react";

interface TrustSignal {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface TwoColumnTrustSignalsDetailsProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  supportContent?: string;
  imageSrc?: string;
  imageAlt?: string;
  trustSignals?: TrustSignal[];
  id?: string;
}

const defaultTrustSignals: TrustSignal[] = [
  {
    value: "31+",
    label: "Years in the fire service with dedicated fire investigation experience",
    icon: Flame,
  },
  {
    value: "1,800+",
    label: "Fire incidents as primary investigator across residential, commercial, wildland, and vehicle cases",
    icon: ShieldCheck,
  },
  {
    value: "IAAI",
    label: "Certified Fire Investigator (CFI) with expert origin and cause investigations expertise.",
    icon: Award,
  },
];

export function TwoColumnTrustSignalsDetails({
  eyebrow = "Experience and credentials",
  title = "Independent investigations backed by extensive industry experience",
  body = "At Palmer Fire Investigations, we provide independent fire origin and cause investigations for insurance carriers, attorneys, and private clients.The company is led by Chris Palmer, a licensed private investigator and IAAI-certified fire investigator (CFI), bringing more than 31 years of hands-on experience in public safety and fire service experience, including over 18 years assigned to fire investigations and law enforcement.",
  supportContent = "Throughout his career, Mr. Palmer has served as the primary investigator on more than 1,800 fire incidents, including residential, commercial, wildland, and vehicle fires. His experience includes complex, high-value losses, fatalities, insurance fraud, and serial arson investigations. He has provided expert testimony in the Superior Court of California regarding fire origin and cause determinations. All investigations are conducted in accordance with NFPA 921, and professional qualifications and ongoing competency are maintained in alignment with NFPA 1033. Each case is approached using the scientific method, without assumption, and supported by thorough documentation to ensure reliable and defensible conclusions.",
  imageSrc = "/images/luxury-property-02.jpg",
  imageAlt = "Palmer Fire Investigations professional context",
  trustSignals = defaultTrustSignals,
  id = "about",
}: TwoColumnTrustSignalsDetailsProps) {
  return (
    <section
      id={id}
      className="bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      tremor-id="tremor-raw"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left column: copy */}
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-sm font-semibold tracking-wide text-primary-600 uppercase">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900">
              {title}
            </h2>
            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              {body}
            </p>
            <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
              {supportContent}
            </p>
            <motion.div
            className="mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <Button variant="primary" size="md" asChild>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            </Button>
          </motion.div>
          </div>
          

          {/* Right column: image + trust signals */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-zinc-100 bg-zinc-50 max-w-[600px] mx-auto">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {trustSignals?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 md:gap-3">
                {trustSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div
                      key={signal.label}
                      className="flex items-start gap-3 rounded-[3px] border border-zinc-100 bg-zinc-50 p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-primary-50 text-primary-700">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="space-y-1">
                        <div className="text-xl font-semibold text-primary-700">
                          {signal.value}
                        </div>
                        <p className="text-sm text-zinc-700 leading-snug">
                          {signal.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container mx-auto">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-6">
            {[
              {
                icon: Flame,
                title: "Investigation scope",
                bullets: [
                  "Residential, commercial, wildland, and vehicle fire investigations",
                  "Complex, high-value losses and sensitive casualty matters",
                  "Insurance fraud and serial arson investigations",
                  "Scene work spanning public-sector and private-sector contexts",
                ],
              },
              {
                icon: Scale,
                title: "Testimony and legal support",
                bullets: [
                  "Expert testimony in the Superior Court of California",
                  "Origin and cause determinations presented with clear documentation",
                  "Support for claims review, subrogation, and litigation strategy",
                  "Collaboration with counsel on defensible findings",
                ],
              },
              {
                icon: BookOpen,
                title: "Standards and methodology",
                bullets: [
                  "Investigations conducted in accordance with NFPA 921",
                  "Professional qualifications aligned with NFPA 1033",
                  "Scientific method without assumption",
                  "Thorough documentation for reliable conclusions",
                ],
              },
              {
                icon: Users,
                title: "Professional affiliations",
                bullets: [
                  "International Association of Arson Investigators (IAAI)",
                  "California Conference of Arson Investigators (CCAI)",
                  "National Association of Fire Investigators (NAFI)",
                ],
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-white p-6 md:p-8 rounded-[3px] border border-gold-500 shadow-[-10px_10px_0_0_var(--color-gold-500)]  transition ms-3 md:ms-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                >
                  <div
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[3px] bg-primary-500 text-white mb-6 "
                    aria-hidden="true"
                  >
                    <Icon className="size-7" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-2">
                    {service.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-800">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <Button variant="primary" size="md" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
    </section>
  );
}

TwoColumnTrustSignalsDetails.displayName = "TwoColumnTrustSignalsDetails";

