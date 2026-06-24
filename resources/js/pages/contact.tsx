import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Mail, MapPin, Phone } from 'lucide-react';

interface Props {
    flash?: { success?: string };
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

    return (
        <MainLayout title="Contact Us">
            <section className="bg-[#1F4737] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">Get in touch</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Contact Mariakani Municipality</h1>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr]">
                <div className="space-y-6">
                    <div className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                        <MapPin className="text-[#D4A24C]" size={22} />
                        <h3 className="mt-3 font-serif font-semibold text-[#1F4737]">Address</h3>
                        <p className="mt-1 text-sm text-[#241F1A]/70">Mariakani Municipality, Kilifi County</p>
                    </div>
                    <div className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                        <Phone className="text-[#D4A24C]" size={22} />
                        <h3 className="mt-3 font-serif font-semibold text-[#1F4737]">Call Us</h3>
                        <p className="mt-1 text-sm text-[#241F1A]/70">+254 700 000 000 (Mon – Fri)</p>
                    </div>
                    <div className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                        <Mail className="text-[#D4A24C]" size={22} />
                        <h3 className="mt-3 font-serif font-semibold text-[#1F4737]">Email Us</h3>
                        <p className="mt-1 text-sm text-[#241F1A]/70">info@mariakanimunicipality.go.ke</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-5 rounded-xl border border-[#1F4737]/10 bg-white p-8 shadow-sm">
                    {flash?.success && (
                        <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{flash.success}</p>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-[#1F4737]">Full Name</label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 w-full rounded-md border border-[#1F4737]/20 px-3 py-2 text-sm focus:border-[#1F4737] focus:outline-none"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#1F4737]">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 w-full rounded-md border border-[#1F4737]/20 px-3 py-2 text-sm focus:border-[#1F4737] focus:outline-none"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1F4737]">Phone (optional)</label>
                        <input
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 w-full rounded-md border border-[#1F4737]/20 px-3 py-2 text-sm focus:border-[#1F4737] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-[#1F4737]">Subject</label>
                        <select
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            className="mt-1 w-full rounded-md border border-[#1F4737]/20 bg-white px-3 py-2 text-sm focus:border-[#1F4737] focus:outline-none"
                        >
                            <option value="">Select a subject</option>
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
                        <label className="text-sm font-medium text-[#1F4737]">Message</label>
                        <textarea
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="mt-1 w-full rounded-md border border-[#1F4737]/20 px-3 py-2 text-sm focus:border-[#1F4737] focus:outline-none"
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-[#D4A24C] px-6 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563] disabled:opacity-60"
                    >
                        {processing ? 'Sending…' : 'Send Message'}
                    </button>
                </form>
            </section>
        </MainLayout>
    );
}
