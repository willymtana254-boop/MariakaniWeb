import { useEffect, useRef, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';

interface Props {
    flash?: { success?: string };
}

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {children}
        </div>
    );
}

export default function Contact({ flash }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            lines: ['Mariakani Municipality', 'Kilifi County, Kenya'],
        },
        {
            icon: Phone,
            title: 'Call Us',
            lines: ['+254 700 000 000', 'Mon – Fri, 8am – 5pm'],
        },
        {
            icon: Mail,
            title: 'Email Us',
            lines: ['info@mariakanimunicipality.go.ke'],
        },
        {
            icon: Clock,
            title: 'Office Hours',
            lines: ['Monday – Friday: 8am – 5pm', 'Saturday & Sunday: Closed'],
        },
    ];

    return (
        <MainLayout title="Contact Us">

            {/* Banner */}
            <section
                className="relative py-20 text-[#F3EEE2]"
                style={{
                    backgroundImage: 'url(/images/hero/rabai-church.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-[#1e3a8a]/80" />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A24C]">Get in Touch</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Contact the Municipality</h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-[#F3EEE2]/80">
                        We are here to serve the residents of Mariakani. Reach out with questions, requests, or feedback.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#F3EEE2]/70">
                        <Link href="/" className="hover:text-[#D4A24C] transition-colors">Home</Link>
                        <span>/</span>
                        <span>Contact Us</span>
                    </div>
                </div>
            </section>

            {/* Contact info cards */}
            <section className="bg-[#1A3C2F] py-12">
                <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
                    {contactInfo.map((info, i) => (
                        <AnimatedCard key={info.title} index={i}>
                            <div className="group rounded-xl bg-white/10 p-6 text-[#F3EEE2] transition-all hover:bg-[#D4A24C] hover:text-[#1A3C2F]">
                                <info.icon size={24} className="text-[#D4A24C] group-hover:text-[#1A3C2F] transition-colors" />
                                <h3 className="mt-3 font-serif font-semibold">{info.title}</h3>
                                {info.lines.map((line) => (
                                    <p key={line} className="mt-1 text-sm text-[#F3EEE2]/80 group-hover:text-[#1A3C2F]/80 transition-colors">{line}</p>
                                ))}
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </section>

            {/* Form + map section */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1.5fr]">

                {/* Left — extra info */}
                <div className="space-y-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">We'd Love to Hear From You</p>
                        <h2 className="mt-3 font-serif text-2xl font-bold text-[#1F4737]">
                            How can we help you today?
                        </h2>
                        <div className="mt-3 h-1 w-16 rounded bg-[#D4A24C]" />
                        <p className="mt-4 text-sm leading-relaxed text-[#241F1A]/70">
                            Whether you have a complaint, service request, or general inquiry, our team is
                            ready to assist. We aim to respond to all messages within 2 working days.
                        </p>
                    </div>

                    {/* Map placeholder — swap with real embed later */}
                    <div className="overflow-hidden rounded-xl border border-[#1F4737]/10 shadow-sm">
                        <iframe
                            title="Mariakani Municipality Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.5!2d39.4833!3d-3.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTInMDAuMCJTIDM5wrAyOCc1OS45IkU!5e0!3m2!1sen!2ske!4v1234567890"
                            width="100%"
                            height="260"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* Right — contact form */}
                <form
                    onSubmit={submit}
                    className="space-y-5 rounded-xl border border-[#1F4737]/10 bg-white p-8 shadow-sm"
                >
                    {flash?.success && (
                        <div className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200">
                            <Send size={16} className="shrink-0" />
                            {flash.success}
                        </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-semibold text-[#1F4737]">Full Name *</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. John Mwangi"
                                className="mt-1.5 w-full rounded-lg border border-[#1F4737]/20 px-3 py-2.5 text-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-[#1F4737]">Email *</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your@email.com"
                                className="mt-1.5 w-full rounded-lg border border-[#1F4737]/20 px-3 py-2.5 text-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#1F4737]">Phone (optional)</label>
                        <input
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="+254 7XX XXX XXX"
                            className="mt-1.5 w-full rounded-lg border border-[#1F4737]/20 px-3 py-2.5 text-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#1F4737]">Subject *</label>
                        <select
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-[#1F4737]/20 bg-white px-3 py-2.5 text-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                        >
                            <option value="">Select a subject…</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Service Request">Service Request</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Business Permit & Licensing">Business Permit &amp; Licensing</option>
                            <option value="Land & Planning">Land &amp; Planning</option>
                            <option value="Procurement / Tenders">Procurement / Tenders</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#1F4737]">Message *</label>
                        <textarea
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Tell us how we can help…"
                            className="mt-1.5 w-full rounded-lg border border-[#1F4737]/20 px-3 py-2.5 text-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4A24C] px-6 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563] disabled:opacity-60"
                    >
                        <Send size={16} />
                        {processing ? 'Sending…' : 'Send Message'}
                    </button>
                </form>
            </section>

        </MainLayout>
    );
}