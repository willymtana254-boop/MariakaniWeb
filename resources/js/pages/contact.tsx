import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';

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

const quickLinks = [
    { label: 'Board Members', href: '/municipal-structure' },
    { label: 'Services', href: '/projects' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About Us', href: '/about' },
    { label: 'News', href: '/news' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Contact Us', href: '/contact' },
];

export default function Contact({ flash }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [newsletter, setNewsletter] = useState('');

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    return (
        <MainLayout title="Contact Us">

            {/* Page Banner */}
            <section
                className="relative py-20 text-white"
                style={{
                    backgroundImage: 'url(/images/hero-rabai-church.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative mx-auto max-w-7xl px-6">
                    <h1 className="font-serif text-4xl font-bold sm:text-5xl">Contact Us</h1>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                        <Link href="/" className="hover:text-[#F5A623] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-white">Contact Us</span>
                    </div>
                </div>
            </section>

            {/* Intro bar */}
            <section className="bg-[#1a3a6b/5] py-6">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="font-serif text-xl font-bold text-[#1a2a4a]">
                        If you need any information, please contact us!
                    </p>
                </div>
            </section>

            {/* Main content */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[1fr_340px] lg:gap-10">

                    {/* LEFT — info + form */}
                    <div>

                        {/* Quick info row */}
                        <div className="mb-10 grid gap-6 sm:grid-cols-3">
                            <AnimatedCard index={0}>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2a4a] text-white">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">Head office address:</p>
                                        <p className="mt-1 text-sm text-[#1a2a4a]/80 leading-relaxed">
                                            Mariakani Municipality<br />Kilifi County, Kenya
                                        </p>
                                    </div>
                                </div>
                            </AnimatedCard>
                            <AnimatedCard index={1}>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2a4a] text-white">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">Mail for information:</p>
                                        <p className="mt-1 text-sm text-[#1a2a4a]/80 leading-relaxed break-all">
                                            info@mariakanimunicipality.go.ke
                                        </p>
                                    </div>
                                </div>
                            </AnimatedCard>
                            <AnimatedCard index={2}>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a2a4a] text-white">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">Call for help:</p>
                                        <p className="mt-1 text-sm text-[#1a2a4a]/80">+254 700 000 000</p>
                                    </div>
                                </div>
                            </AnimatedCard>
                        </div>

                        {/* Divider */}
                        <hr className="mb-10 border-[#1a2a4a]/10" />

                        {/* Contact Form */}
                        <div className="mb-10">
                            <p className="mb-6 text-sm font-semibold text-[#1a2a4a]/60 uppercase tracking-wider">
                                For any inquiries relating to our services *
                            </p>

                            {flash?.success && (
                                <div className="mb-5 flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200">
                                    <Send size={16} className="shrink-0" />
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-[#1a2a4a]">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1a2a4a] focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/10 transition bg-white"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-[#1a2a4a]">
                                            Email address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1a2a4a] focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/10 transition bg-white"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#1a2a4a]">
                                        Phone (optional)
                                    </label>
                                    <input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+254 7XX XXX XXX"
                                        className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1a2a4a] focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/10 transition bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#1a2a4a]">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[#1a2a4a] focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/10 transition"
                                    >
                                        <option value="">Subject *</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Service Request">Service Request</option>
                                        <option value="Complaint">Complaint</option>
                                        <option value="Business Permit & Licensing">Business Permit & Licensing</option>
                                        <option value="Land & Planning">Land & Planning</option>
                                        <option value="Procurement / Tenders">Procurement / Tenders</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-[#1a2a4a]">
                                        Your message
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us how we can help..."
                                        className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1a2a4a] focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/10 transition bg-white"
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded bg-[#1a2a4a] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#F5A623] hover:text-[#1a2a4a] disabled:opacity-60"
                                >
                                    <Send size={15} />
                                    {processing ? 'Sending...' : 'Send message'}
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="mt-12 space-y-8 lg:mt-0">

                        {/* Address card */}
                        <div className="rounded-lg bg-[#1a2a4a] p-6 text-white">
                            <div className="flex items-start gap-3 border-b border-white/10 pb-5">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-[#F5A623]" />
                                <p className="text-sm leading-relaxed text-white/85">
                                    Mariakani Municipality, Mariakani, Kilifi County
                                </p>
                            </div>
                            <div className="flex items-center gap-3 border-b border-white/10 py-5">
                                <Phone size={18} className="shrink-0 text-[#F5A623]" />
                                <p className="text-sm text-white/85">+254 700 000 000</p>
                            </div>
                            <div className="pt-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={16} className="text-[#F5A623]" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">Open Hours:</p>
                                </div>
                                <p className="text-sm text-white/80">Mon – Fri: 8 a.m. – 5 p.m.</p>
                                <p className="text-sm text-white/80">Sat & Sun: CLOSED</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-serif text-base font-bold text-[#1a2a4a] border-b border-gray-100 pb-3">
                                Links
                            </h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-2 text-sm text-[#1a2a4a]/70 hover:text-[#F5A623] transition-colors"
                                        >
                                            <ChevronRight size={14} className="text-[#F5A623]" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="rounded-lg bg-[#1a3a6b/5] p-6">
                            <h3 className="font-serif text-base font-bold text-[#1a2a4a]">Newsletter</h3>
                            <p className="mt-1 text-sm text-[#1a2a4a]/75">
                                Subscribe to our newsletter to get updates
                            </p>
                            <div className="mt-4 flex flex-col gap-2">
                                <input
                                    type="email"
                                    value={newsletter}
                                    onChange={(e) => setNewsletter(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full rounded border border-[#1a2a4a]/20 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a4a]/20 transition"
                                />
                                <button
                                    type="button"
                                    className="w-full rounded bg-[#1a2a4a] py-2.5 text-sm font-bold text-white hover:bg-[#243d6a] transition"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </aside>
                </div>
            </section>

        </MainLayout>
    );
}