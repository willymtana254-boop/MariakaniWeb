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

            {/* Banner */}
            <section
                className="relative py-20 text-white"
                style={{
                    backgroundImage: 'url(/images/hero/rabai-church.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-[#1a3a6b]/80" />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FFBC02]">Resources</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Downloads</h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
                        Policies, forms, reports and public documents from Mariakani Municipality.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
                        <Link href="/" className="hover:text-[#FFBC02] transition-colors">Home</Link>
                        <span>/</span>
                        <span>Downloads</span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 lg:grid-cols-[240px_1fr]">

                    {/* Sidebar — category nav */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 rounded-xl border border-[#1a3a6b]/10 bg-white p-4 shadow-sm">
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#FFBC02]">Categories</p>
                            <nav className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => scrollTo(cat)}
                                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                            activeCategory === cat
                                                ? 'bg-[#1a3a6b] text-white font-semibold'
                                                : 'text-[#1a3a6b]/70 hover:bg-[#1a3a6b]/5 hover:text-[#1a3a6b]'
                                        }`}
                                    >
                                        <FolderOpen size={14} className="shrink-0" />
                                        {cat}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div>
                        {/* Search */}
                        <div className="relative mb-10">
                            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1a3a6b]/40" size={18} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search documents…"
                                className="w-full rounded-xl border border-[#1a3a6b]/20 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm focus:border-[#1a3a6b] focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/10 transition"
                            />
                        </div>

                        {categories.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#1a3a6b]/20 py-20 text-center">
                                <DownloadIcon className="mx-auto mb-3 text-[#1a3a6b]/20" size={40} />
                                <p className="text-sm text-[#1a3a6b]/50">No documents published yet.</p>
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
                                                    <FolderOpen className="text-[#FFBC02]" size={22} />
                                                    <h2 className="font-serif text-xl font-semibold text-[#1a3a6b]">{category}</h2>
                                                    <span className="ml-auto rounded-full bg-[#1a3a6b]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1a3a6b]">
                                                        {docs.length}
                                                    </span>
                                                </div>
                                                {docs.length === 0 ? (
                                                    <p className="rounded-xl border border-dashed border-[#1a3a6b]/10 py-8 text-center text-sm text-[#1a3a6b]/50">
                                                        No documents in this category yet.
                                                    </p>
                                                ) : (
                                                    <div className="overflow-hidden rounded-xl border border-[#1a3a6b]/10 bg-white shadow-sm">
                                                        {docs.map((doc, i) => (
                                                            <a
                                                                key={doc.id}
                                                                href={`/storage/${doc.file_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[#1a3a6b]/5 ${
                                                                    i !== 0 ? 'border-t border-[#1a3a6b]/8' : ''
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFBC02]/10 text-[#FFBC02] group-hover:bg-[#FFBC02] group-hover:text-white transition-colors">
                                                                        <FileText size={16} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-[#1a3a6b] group-hover:text-[#FFBC02] transition-colors">
                                                                            {doc.title}
                                                                        </p>
                                                                        <div className="flex items-center gap-2 mt-0.5">
                                                                            {doc.file_size && (
                                                                                <span className="text-xs text-[#1a3a6b]/40">{doc.file_size}</span>
                                                                            )}
                                                                            {doc.uploaded_at && (
                                                                                <span className="text-xs text-[#1a3a6b]/40">
                                                                                    · {new Date(doc.uploaded_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#1a3a6b]/20 px-3 py-1.5 text-xs font-semibold text-[#1a3a6b] group-hover:border-[#FFBC02] group-hover:text-[#FFBC02] transition-colors">
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