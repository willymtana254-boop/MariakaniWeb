import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

interface ContentBlock {
    key: string;
    title: string | null;
    body: string | null;
}

interface Ward {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    mission: ContentBlock | null;
    objectives: ContentBlock | null;
    functions: ContentBlock | null;
    boundaries: ContentBlock | null;
    wards: Ward[];
}

function AnimatedCard({ children, index, className = '' }: { children: React.ReactNode; index: number; className?: string }) {
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
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {children}
        </div>
    );
}

export default function About({ mission, objectives, functions: municipalFunctions, boundaries, wards }: Props) {
    return (
        <MainLayout title="About Us">

            {/* Page title banner with background image */}
            <section
                className="relative py-20 text-[#F3EEE2]"
                style={{
                    backgroundImage: 'url(/images/hero/mariakani-gorge.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-[#1e3a8a]/80" />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A24C]">About Us</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
                        {mission?.title ?? 'About Mariakani Municipality'}
                    </h1>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#F3EEE2]/70">
                        <Link href="/" className="hover:text-[#D4A24C] transition-colors">Home</Link>
                        <span>/</span>
                        <span>About Us</span>
                    </div>
                </div>
            </section>

            {/* Mission statement */}
            {mission && (
                <section className="mx-auto max-w-4xl px-6 py-16 text-center">
                    <div className="mx-auto h-1 w-16 rounded bg-[#D4A24C] mb-8" />
                    <p className="text-lg leading-relaxed text-[#241F1A]/75">{mission.body}</p>
                </section>
            )}

            {/* Objectives & Functions — two column animated cards */}
            <section className="bg-[#EAE3D3] py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Our Mandate</p>
                        <h2 className="mt-3 font-serif text-3xl font-bold text-[#1F4737]">What We Stand For</h2>
                        <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#D4A24C]" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[objectives, municipalFunctions].filter(Boolean).map((block, i) => (
                            <AnimatedCard key={block!.key} index={i}>
                                <div className="group h-full rounded-xl border border-[#1F4737]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#D4A24C]/40">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4737]/10 text-[#1F4737] group-hover:bg-[#D4A24C] group-hover:text-white transition-colors duration-300">
                                        <span className="font-serif text-lg font-bold">{i + 1}</span>
                                    </div>
                                    <h2 className="font-serif text-xl font-semibold text-[#1F4737]">{block!.title}</h2>
                                    <div className="mt-2 h-0.5 w-10 rounded bg-[#D4A24C]" />
                                    <p className="mt-4 text-sm leading-relaxed text-[#241F1A]/75">{block!.body}</p>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Boundaries & Wards */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                {boundaries && (
                    <div className="mb-12 max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Jurisdiction</p>
                        <h2 className="mt-3 font-serif text-3xl font-bold text-[#1F4737]">{boundaries.title}</h2>
                        <div className="mt-3 h-1 w-16 rounded bg-[#D4A24C]" />
                        <p className="mt-4 text-sm leading-relaxed text-[#241F1A]/75">{boundaries.body}</p>
                    </div>
                )}
                {wards.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {wards.map((ward, i) => (
                            <AnimatedCard key={ward.id} index={i % 3}>
                                <div className="group rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#D4A24C]/50 hover:shadow-md">
                                    <span className="font-serif text-2xl font-bold text-[#D4A24C]/40 group-hover:text-[#D4A24C] transition-colors">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#1F4737]">{ward.name}</h3>
                                    {ward.description && (
                                        <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{ward.description}</p>
                                    )}
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA strip */}
            <section className="bg-[#1A3C2F] py-14 text-center text-[#F3EEE2]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Work With Us</p>
                <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                    Ready to engage with the Municipality?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#F3EEE2]/70">
                    We welcome public participation and community engagement from all residents.
                </p>
                <Link
                    href="/contact"
                    className="mt-7 inline-block rounded-md bg-[#D4A24C] px-8 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563]"
                >
                    Contact Us
                </Link>
            </section>

        </MainLayout>
    );
}