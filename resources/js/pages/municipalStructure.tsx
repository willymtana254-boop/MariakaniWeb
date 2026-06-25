// resources/js/pages/MunicipalStructure.tsx
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';

interface BoardMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
    photo_path: string | null;
}

interface Ward {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    boardMembers: BoardMember[];
    wards: Ward[];
}

function MemberCard({ member, index }: { member: BoardMember; index: number }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${(index % 3) * 100}ms` }}
        >
            <div className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#1F4737]/8">
                {/* Photo area */}
                <div className="relative overflow-hidden bg-[#EAE3D3] h-56">
                    {member.photo_path ? (
                        <img
                            src={member.photo_path}
                            alt={member.name}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1F4737]/10 to-[#1F4737]/20">
                            <span className="font-serif text-5xl font-bold text-[#1F4737]/30">
                                {member.name.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Hover overlay with social links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#1F4737]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-[#D4A24C] transition-colors">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-[#D4A24C] transition-colors">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Info area */}
                <div className="p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-[#1F4737]">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#D4A24C]">
                        {member.role}
                    </p>
                    {member.bio && (
                        <p className="mt-3 text-sm leading-relaxed text-[#241F1A]/65 line-clamp-3">
                            {member.bio}
                        </p>
                    )}
                    <Link
                        href="/municipal-structure"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[#1F4737]/20 px-4 py-2 text-xs font-semibold text-[#1F4737] transition hover:bg-[#1F4737] hover:text-white"
                    >
                        Details
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function WardCard({ ward, index }: { ward: Ward; index: number }) {
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
            style={{ transitionDelay: `${(index % 3) * 80}ms` }}
        >
            <div className="group rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm hover:border-[#D4A24C]/50 hover:shadow-md transition-all duration-300">
                <span className="font-serif text-2xl font-bold text-[#D4A24C]/40 group-hover:text-[#D4A24C] transition-colors">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-serif text-base font-semibold text-[#1F4737]">{ward.name}</h3>
                {ward.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/60">{ward.description}</p>
                )}
            </div>
        </div>
    );
}

export default function MunicipalStructure({ boardMembers, wards }: Props) {
    return (
        <MainLayout title="Municipal Structure">

            {/* Page title banner — background image style like Malindi */}
            <section
                className="relative py-20 text-[#F3EEE2]"
                style={{
                    backgroundImage: 'url(/images/hero/mariakani-gorge.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-[#1F4737]/75" />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A24C]">Governance</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Municipal Structure</h1>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#F3EEE2]/70">
                        <Link href="/" className="hover:text-[#D4A24C] transition-colors">Home</Link>
                        <span>/</span>
                        <span>Municipal Structure</span>
                    </div>
                </div>
            </section>

            {/* Two-column intro — mirrors Malindi's heading layout */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">
                            Board Members
                        </p>
                        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#1F4737] sm:text-4xl">
                            We draw on expertise to serve the people of Mariakani.
                        </h2>
                        <div className="mt-4 h-1 w-16 rounded bg-[#D4A24C]" />
                    </div>
                    <p className="text-base leading-relaxed text-[#241F1A]/70 md:pt-6">
                        The Board of the Municipality of Mariakani, established under the Urban Areas and Cities
                        Act, brings together diverse expertise to provide governance, service delivery, and
                        development oversight across all wards of the municipality.
                    </p>
                </div>
            </section>

            {/* Board Members grid */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                {boardMembers.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {boardMembers.map((member, i) => (
                            <MemberCard key={member.id} member={member} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-[#1F4737]/20 py-20 text-center">
                        <p className="text-sm text-[#241F1A]/50">Board members will appear here once added.</p>
                    </div>
                )}
            </section>

            {/* Wards section */}
            {wards.length > 0 && (
                <section className="bg-[#EAE3D3] py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Coverage</p>
                            <h2 className="mt-3 font-serif text-3xl font-bold text-[#1F4737]">Municipality Wards</h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm text-[#241F1A]/65">
                                The wards that make up the Municipality of Mariakani, as set out in the Municipal Charter.
                            </p>
                            <div className="mx-auto mt-4 h-1 w-16 rounded bg-[#D4A24C]" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {wards.map((ward, i) => (
                                <WardCard key={ward.id} ward={ward} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA strip */}
            <section className="bg-[#1A3C2F] py-14 text-center text-[#F3EEE2]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Get in touch</p>
                <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
                    Have questions about governance?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#F3EEE2]/70">
                    The Municipal Manager's office is open Monday to Friday, 8am – 5pm.
                </p>
                <Link
                    href="/contact"
                    className="mt-7 inline-block rounded-md bg-[#D4A24C] px-8 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563]"
                >
                    Contact the Municipality
                </Link>
            </section>

        </MainLayout>
    );
}