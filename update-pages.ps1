Write-Host "Writing updated page files..." -ForegroundColor Cyan

# ── About.tsx ──────────────────────────────────────────────────────────────────
Set-Content -Path "resources\js\pages\About.tsx" -Encoding UTF8 -Value @'
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
            <section
                className="relative py-20 text-[#F3EEE2]"
                style={{ backgroundImage: 'url(/images/hero/mariakani-gorge.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
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

            {mission && (
                <section className="mx-auto max-w-4xl px-6 py-16 text-center">
                    <div className="mx-auto h-1 w-16 rounded bg-[#D4A24C] mb-8" />
                    <p className="text-lg leading-relaxed text-[#241F1A]/75">{mission.body}</p>
                </section>
            )}

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

            <section className="bg-[#1A3C2F] py-14 text-center text-[#F3EEE2]">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A24C]">Work With Us</p>
                <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Ready to engage with the Municipality?</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-[#F3EEE2]/70">
                    We welcome public participation and community engagement from all residents.
                </p>
                <Link href="/contact" className="mt-7 inline-block rounded-md bg-[#D4A24C] px-8 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563]">
                    Contact Us
                </Link>
            </section>
        </MainLayout>
    );
}
'@
Write-Host "  OK  About.tsx" -ForegroundColor Green

# ── Downloads.tsx ──────────────────────────────────────────────────────────────
Set-Content -Path "resources\js\pages\Downloads.tsx" -Encoding UTF8 -Value @'
import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { FileText, Download as DownloadIcon, Search, FolderOpen } from 'lucide-react';

interface Document {
    id: number;
    title: string;
    category: string | null;
    file_path: string;
    file_size: string | null;
    uploaded_at: string | null;
}

interface Props {
    documentsByCategory: Record<string, Document[]>;
}

function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function AnimatedSection({ children, index }: { children: React.ReactNode; index: number }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {children}
        </div>
    );
}

export default function Downloads({ documentsByCategory }: Props) {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const categories = Object.keys(documentsByCategory);
    const q = query.trim().toLowerCase();

    const scrollTo = (cat: string) => {
        setActiveCategory(cat);
        document.getElementById(slugify(cat))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <MainLayout title="Downloads">
            <section
                className="relative py-20 text-[#F3EEE2]"
                style={{ backgroundImage: 'url(/images/hero/rabai-church.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-[#1e3a8a]/80" />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A24C]">Resources</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Downloads</h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-[#F3EEE2]/80">
                        Policies, forms, reports and public documents from Mariakani Municipality.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#F3EEE2]/70">
                        <Link href="/" className="hover:text-[#D4A24C] transition-colors">Home</Link>
                        <span>/</span>
                        <span>Downloads</span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 rounded-xl border border-[#1F4737]/10 bg-white p-4 shadow-sm">
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4A24C]">Categories</p>
                            <nav className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => scrollTo(cat)}
                                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                            activeCategory === cat
                                                ? 'bg-[#1F4737] text-white font-semibold'
                                                : 'text-[#241F1A]/70 hover:bg-[#EAE3D3] hover:text-[#1F4737]'
                                        }`}
                                    >
                                        <FolderOpen size={14} className="shrink-0" />
                                        {cat}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <div>
                        <div className="relative mb-10">
                            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1F4737]/40" size={18} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search documents..."
                                className="w-full rounded-xl border border-[#1F4737]/20 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm focus:border-[#1F4737] focus:outline-none focus:ring-2 focus:ring-[#1F4737]/10 transition"
                            />
                        </div>

                        {categories.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#1F4737]/20 py-20 text-center">
                                <DownloadIcon className="mx-auto mb-3 text-[#1F4737]/20" size={40} />
                                <p className="text-sm text-[#241F1A]/50">No documents published yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {categories.map((category, catIndex) => {
                                    const docs = documentsByCategory[category].filter((d) =>
                                        q ? d.title.toLowerCase().includes(q) : true
                                    );
                                    if (q && docs.length === 0) return null;
                                    return (
                                        <AnimatedSection key={category} index={catIndex}>
                                            <div id={slugify(category)} className="scroll-mt-28">
                                                <div className="mb-4 flex items-center gap-3">
                                                    <FolderOpen className="text-[#D4A24C]" size={22} />
                                                    <h2 className="font-serif text-xl font-semibold text-[#1F4737]">{category}</h2>
                                                    <span className="ml-auto rounded-full bg-[#1F4737]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1F4737]">
                                                        {docs.length}
                                                    </span>
                                                </div>
                                                {docs.length === 0 ? (
                                                    <p className="rounded-xl border border-dashed border-[#1F4737]/10 py-8 text-center text-sm text-[#241F1A]/50">
                                                        No documents in this category yet.
                                                    </p>
                                                ) : (
                                                    <div className="overflow-hidden rounded-xl border border-[#1F4737]/10 bg-white shadow-sm">
                                                        {docs.map((doc, i) => (
                                                            
                                                                key={doc.id}
                                                                href={`/storage/${doc.file_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[#EAE3D3]/60 ${i !== 0 ? 'border-t border-[#1F4737]/8' : ''}`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4A24C]/10 text-[#D4A24C] group-hover:bg-[#D4A24C] group-hover:text-white transition-colors">
                                                                        <FileText size={16} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-[#1F4737] group-hover:text-[#D4A24C] transition-colors">{doc.title}</p>
                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                            {doc.file_size && <span className="text-xs text-[#241F1A]/40">{doc.file_size}</span>}
                                                                            {doc.uploaded_at && (
                                                                                <span className="text-xs text-[#241F1A]/40">
                                                                                    {new Date(doc.uploaded_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#1F4737]/20 px-3 py-1.5 text-xs font-semibold text-[#1F4737] group-hover:border-[#D4A24C] group-hover:text-[#D4A24C] transition-colors">
                                                                    <DownloadIcon size={13} />
                                                                    Download
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </AnimatedSection>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
'@
Write-Host "  OK  Downloads.tsx" -ForegroundColor Green

# ── Contact.tsx ────────────────────────────────────────────────────────────────
Set-Content -Path "resources\js\pages\Contact.tsx" -Encoding UTF8 -Value @'
import { useEffect, useRef, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';

interface Props {
    flash?: { success?: string };
}

function AnimatedCard({ children,