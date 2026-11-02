/**
 * **CURSOR INFO**
 * SECTION TYPE: Contact information and form
 * BEST FOR: Contact page lead capture with driving directions
 * VISUAL STYLE: White two-column layout, dark charcoal form card, tea-green line button
 * LAYOUT: Driving directions and contact info left, form right in a dark card
 * CONTENT ELEMENTS: Directions copy, contact info card, heading, form
 * CONVERSION ROLE: Start conversation and capture leads
 * IDEAL POSITION: After the subpage banner on the contact page
 * NOTES / MODIFIERS: max-w-7xl content well; dark inputs; message field required by the contact API; LinkedIn from siteConfig
 */

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle, Linkedin, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { FormattedText } from '@/Components/UI/FormattedText';
import { LineButton } from '@/Components/UI/LineButton';
import { SectionHeading } from '@/Components/UI/SectionHeading';
import { getCookie } from '@/lib/cookies';
import { sectionSpacing } from '@/lib/sectionSpacing';
import type { SiteConfig } from '@/lib/siteConfig';

const initialFormData = {
    name: '',
    phone: '',
    email: '',
    message: '',
};

type ContactSectionProps = {
    siteConfig: Pick<
        SiteConfig,
        'email' | 'phone' | 'address' | 'linkedin_url' | 'facebook_url' | 'instagram_url' | 'twitter_url'
    >;
    directionsTagline?: string;
    directionsHeadline?: string;
    directionsBody?: string;
    heading?: string;
    body?: string;
    formHeading?: string;
    ctaLabel?: string;
};

type FieldName = keyof typeof initialFormData;

type ContactResponse = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
};

const inputClass =
    'w-full border border-zinc-500 bg-transparent px-3 py-2.5 text-white placeholder:text-zinc-400 focus:border-tea-green-400 focus:outline-none focus:ring-1 focus:ring-tea-green-400';

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <p id={id} className="text-sm text-red-200">
            {message}
        </p>
    );
}

export function ContactSection({
    siteConfig,
    directionsTagline,
    directionsHeadline = 'Driving Directions',
    directionsBody,
    heading = 'Contact Us',
    body = 'Planning a class for your group or joining one of ours? Call, email, or send a note — we will help you choose the right course.',
    formHeading = 'Send a Message',
    ctaLabel = 'Contact Me',
}: ContactSectionProps) {
    const { email, phone, address, linkedin_url: linkedinUrl } = siteConfig;
    const mailHref = `mailto:${email}`;
    const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined;
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
    const emailFallback = email ? ` or email us at ${email}` : '';

    const directionsParagraphs = (directionsBody ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    function errorMessageFor(status: number): string {
        switch (status) {
            case 422:
                return 'Please correct the highlighted fields and try again.';
            case 429:
                return `You've sent several messages in a short time. Please wait a minute and try again${emailFallback}.`;
            case 419:
                return 'Your session expired. Please reload the page and try again.';
            default:
                return `Something went wrong. Please try again${emailFallback}.`;
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = formRef.current;
        if (!form) {
            return;
        }

        setStatus('sending');
        setErrorMessage('');
        setFieldErrors({});

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') ?? ''),
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || null,
                    subject: 'Website Contact Form Submission',
                    message: formData.message.trim(),
                }),
            });
            const data = (await res.json().catch(() => ({}))) as ContactResponse;
            if (res.ok && data.success) {
                setStatus('success');
                form.reset();
                setFormData(initialFormData);
            } else {
                setStatus('error');
                setErrorMessage(errorMessageFor(res.status));
                if (res.status === 422 && data.errors) {
                    setFieldErrors(
                        Object.fromEntries(
                            Object.entries(data.errors).map(([field, messages]) => [field, messages[0]]),
                        ),
                    );
                }
            }
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please try again or email us directly.');
        }
    }

    return (
        <section className="bg-white text-charcoal-brown-800" id="contact">
            <div className={`mx-auto max-w-7xl px-4 md:px-8 lg:px-12 ${sectionSpacing()}`}>
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                    <div className="flex flex-col gap-6 md:gap-8" id="directions">
                        <div className="flex flex-col gap-3 md:gap-4">
                            <SectionHeading title={directionsHeadline} />
                            {directionsTagline ? (
                                <p className="text-xs font-semibold uppercase tracking-widest text-tea-green-600 md:text-sm">
                                    <FormattedText text={directionsTagline} />
                                </p>
                            ) : null}
                        </div>
                        {directionsParagraphs.length ? (
                            <div className="flex flex-col gap-4 md:gap-6">
                                {directionsParagraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 48)}
                                        className="text-base font-light leading-relaxed text-charcoal-brown-800 md:text-lg"
                                    >
                                        <FormattedText text={paragraph} />
                                    </p>
                                ))}
                            </div>
                        ) : null}

                        <div className="flex flex-col gap-6 rounded-lg bg-zinc-50 p-6 md:gap-8 md:p-8">
                            <h3 className="text-lg font-bold tracking-tight text-charcoal-brown-950 md:text-xl">{heading}</h3>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                <ul className="flex flex-col gap-4 text-sm md:text-base">
                                    {address ? (
                                        <li className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tea-green-600" aria-hidden />
                                            <span className="whitespace-pre-line">{address}</span>
                                        </li>
                                    ) : null}
                                    {phone && phoneHref ? (
                                        <li>
                                            <a
                                                href={phoneHref}
                                                className="flex items-center gap-3 hover:text-tea-green-600"
                                            >
                                                <Phone className="h-4 w-4 shrink-0 text-tea-green-600" aria-hidden />
                                                <span>{phone}</span>
                                            </a>
                                        </li>
                                    ) : null}
                                    <li>
                                        <a href={mailHref} className="flex items-center gap-3 hover:text-tea-green-600">
                                            <Mail className="h-4 w-4 shrink-0 text-tea-green-600" aria-hidden />
                                            <span>{email}</span>
                                        </a>
                                    </li>
                                </ul>
                                {linkedinUrl ? (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm uppercase tracking-wide text-zinc-600">Social Media</p>
                                        <a
                                            href={linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Carl Weil on LinkedIn"
                                            className="inline-flex w-fit text-charcoal-brown-800 hover:text-tea-green-600"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 rounded-lg bg-primary-800 p-6 text-white md:gap-10 md:p-8">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">{formHeading}</h3>
                            <p className="text-base font-light leading-relaxed text-zinc-100 md:text-lg">{body}</p>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" id="message">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm text-zinc-300">
                                    Your name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    aria-invalid={fieldErrors.name ? true : undefined}
                                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                                    placeholder="Your name"
                                    className={inputClass}
                                />
                                <FieldError id="name-error" message={fieldErrors.name} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm text-zinc-300">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    aria-invalid={fieldErrors.phone ? true : undefined}
                                    aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                                    placeholder="Phone number"
                                    className={inputClass}
                                />
                                <FieldError id="phone-error" message={fieldErrors.phone} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm text-zinc-300">
                                    Your E-mail
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    aria-invalid={fieldErrors.email ? true : undefined}
                                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                                    placeholder="Your e-mail"
                                    className={inputClass}
                                />
                                <FieldError id="email-error" message={fieldErrors.email} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="contact-message" className="text-sm text-zinc-300">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    aria-invalid={fieldErrors.message ? true : undefined}
                                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                                    placeholder="Tell us what you’d like to know…"
                                    className={inputClass}
                                />
                                <FieldError id="contact-message-error" message={fieldErrors.message} />
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-3 text-emerald-200" role="alert">
                                    <CheckCircle className="h-5 w-5 shrink-0" aria-hidden />
                                    <p>Thank you. Your message has been sent and we will get back to you soon.</p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex items-start gap-3 text-red-200" role="alert">
                                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <LineButton type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                        Sending...
                                    </span>
                                ) : (
                                    ctaLabel
                                )}
                            </LineButton>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
