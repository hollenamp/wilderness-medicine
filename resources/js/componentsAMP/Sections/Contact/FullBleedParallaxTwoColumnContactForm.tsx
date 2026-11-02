'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-bleed parallax contact with split header and two-column details and form
 * BEST FOR: Landing pages that want to capture leads
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-width headline and intro, then two equal-height columns (contact panel left, form right)
 * CONTENT ELEMENTS: Form column title and blurb, form, address, hours, phone, email, social media links
 * CONVERSION ROLE: Start conversation and capture leads
 * IDEAL POSITION: Before the footer
 * NOTES / MODIFIERS: Background image w/ parallax, animation in view
 */

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/Inputs/Input';
import { TextArea } from '@/components/Inputs/TextArea';
import { Button } from '@/components/UI/Button';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/svg-icons';
import { Parallax } from '@/components/UI/Parallax';
import Image from 'next/image';
import type { SiteConfig } from '@/lib/siteConfig';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const BACKGROUND_IMAGE = {
  src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=2000',
  alt: 'Modern interior with warm lighting and clean architectural lines',
} as const;

type FullBleedParallaxTwoColumnContactFormProps = {
  siteConfig: Pick<SiteConfig, 'email' | 'phone' | 'address'>;
};

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
};

export function FullBleedParallaxTwoColumnContactForm({ siteConfig }: FullBleedParallaxTwoColumnContactFormProps) {
  const { email, phone, address } = siteConfig;
  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const name = (form.querySelector<HTMLInputElement>('[name="name"]')?.value ?? '').trim();
    const email = (form.querySelector<HTMLInputElement>('[name="email"]')?.value ?? '').trim();
    const phone = (form.querySelector<HTMLInputElement>('[name="phone"]')?.value ?? '').trim();
    const message = (form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value ?? '').trim();
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: 'Website Contact Form Submission',
          message,
          replyTo: email,
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        setStatus('success');
        form.reset();
        setFormData(initialFormData);
      } else {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or email us directly.');
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="container mx-auto py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12 relative z-10">
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start"
          >
            <div>
              <h2 className="text-3xl font-normal uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                Get In Touch
                <br />
                With Us Today
              </h2>
            </div>
            <div className="flex flex-col justify-end h-full">
              <p className="mt-auto text-base font-light leading-relaxed text-zinc-200 md:text-xl">
                Replace this with a short invitation to reach out. Mention what details help you
                respond faster, such as preferred dates, project scope, or how you found the site.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:items-stretch">
            {/* Left Column - Contact Information */}
            <motion.div className="flex flex-col min-h-0 lg:h-full" variants={fadeInUp} custom={1}>
              <motion.div
                className="bg-zinc-800/50 p-8 border border-zinc-700 backdrop-blur-sm flex flex-col flex-1 min-h-0"
                variants={fadeInUp}
                custom={1}
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-6 text-lg font-semibold uppercase tracking-tight text-white md:text-xl">
                      Get In Touch
                    </h3>
                    <motion.div
                      className="space-y-4"
                      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                    >
                      <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                        <motion.div
                          className="w-10 h-10 bg-gold-500 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="w-5 h-5 text-zinc-900" />
                        </motion.div>
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                            Email
                          </h4>
                          <a
                            href={mailHref}
                            className="text-zinc-100 hover:text-gold-400 transition-colors"
                          >
                            {email}
                          </a>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                        <motion.div
                          className="w-10 h-10 bg-gold-500 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Phone className="w-5 h-5 text-zinc-900" />
                        </motion.div>
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                            Phone
                          </h4>
                          <a
                            href={telHref}
                            className="text-zinc-100 hover:text-gold-400 transition-colors"
                          >
                            {phone}
                          </a>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                        <motion.div
                          className="w-10 h-10 bg-gold-500 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <MapPin className="w-5 h-5 text-zinc-900" />
                        </motion.div>
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                            Location
                          </h4>
                          <div className="text-zinc-100">
                            <p className="whitespace-pre-line">{address}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="max-w-[400px]">
                    <h3 className="mb-4 text-lg font-semibold uppercase tracking-tight text-white md:text-xl">
                      Business Hours
                    </h3>
                    <div className="space-y-3 text-zinc-100">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Monday - Friday</span>
                        <span className="text-gold-400 font-semibold">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Saturday</span>
                        <span className="text-gold-400 font-semibold">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Sunday</span>
                        <span className="text-gold-400 font-semibold">By Appointment</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold uppercase tracking-tight text-white md:text-xl">
                      Connect With Us
                    </h3>
                    <p className="mb-6 text-sm font-light leading-relaxed text-zinc-300 md:text-base">
                      Replace this line with a note about your social channels and what visitors can
                      expect when they follow you.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gold-500 flex items-center justify-center hover:bg-gold-600 transition-all duration-300 hover:scale-110"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-6 h-6 text-zinc-900 shrink-0" aria-hidden />
                      </Link>
                      <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gold-500 flex items-center justify-center hover:bg-gold-600 transition-all duration-300 hover:scale-110"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-6 h-6 text-zinc-900 shrink-0" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div className="flex flex-col min-h-0 lg:h-full" variants={fadeInUp} custom={2}>
              <motion.div
                className="bg-zinc-800/30 p-8 border border-zinc-700 backdrop-blur-sm flex flex-col flex-1 min-h-0"
                variants={fadeInUp}
                custom={2}
                id="message"
              >
                <div className="mb-8 space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-tight text-white md:text-xl">
                    Send a Message
                  </h3>
                  <p className="text-base font-light leading-relaxed text-zinc-200 md:text-lg">
                    Use the form below for questions or requests. We read every submission and respond
                    by email or phone as soon as we can.
                  </p>
                </div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-100 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-100 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-zinc-100 mb-2">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-100 mb-2">
                      Message *
                    </label>
                    <TextArea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help and any details that will help us respond..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  {status === 'success' && (
                    <div
                      className="flex items-center gap-3 p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-100"
                      role="alert"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden />
                      <p>Thank you. Your message has been sent and we&apos;ll get back to you soon.</p>
                    </div>
                  )}
                  {status === 'error' && (
                    <div
                      className="flex items-start gap-3 p-4 bg-red-950/50 border border-red-800 text-red-100"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden />
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" aria-hidden />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax className="w-full h-full">
          <div className="relative w-full h-full">
            <Image
              alt={BACKGROUND_IMAGE.alt}
              src={BACKGROUND_IMAGE.src}
              fill
              className="object-cover z-0"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-linear-to-b from-black/80 to-black/90" />
      </div>
    </section>
  );
}
