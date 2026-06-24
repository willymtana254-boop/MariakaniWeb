import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { FileText, Download as DownloadIcon, Search } from 'lucide-react';

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

export default function Downloads({ documentsByCategory }: Props) {
    const [query, setQuery] = useState('');
    const categories = Object.keys(documentsByCategory);
    const q = query.trim().toLowerCase();

    return (
        <MainLayout title="Downloads">
            <section className="bg-[#1F4737] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">Resources</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Downloads</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F3EEE2]/80">
                        Policies, forms, and public documents from Mariakani Municipality.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="relative mb-10">
                    <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1F4737]/40" size={18} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search documents…"
                        className="w-full rounded-lg border border-[#1F4737]/20 bg-white py-3 pl-11 pr-4 text-sm focus:border-[#1F4737] focus:outline-none"
                    />
                </div>

                {categories.length === 0 ? (
                    <p className="text-sm text-[#241F1A]/60">No documents published yet.</p>
                ) : (
                    <div className="space-y-12">
                        {categories.map((category) => {
                            const docs = documentsByCategory[category].filter((d) =>
                                q ? d.title.toLowerCase().includes(q) : true
                            );
                            if (q && docs.length === 0) return null;
                            return (
                                <div key={category} id={slugify(category)} className="scroll-mt-28">
                                    <h2 className="font-serif text-xl font-semibold text-[#1F4737]">{category}</h2>
                                    {docs.length === 0 ? (
                                        <p className="mt-3 text-sm text-[#241F1A]/50">No documents in this category yet.</p>
                                    ) : (
                                        <div className="mt-4 divide-y divide-[#1F4737]/10 rounded-xl border border-[#1F4737]/10 bg-white shadow-sm">
                                            {docs.map((doc) => (
                                                <a key={doc.id} href={`/storage/${doc.file_path}`}
                                                    className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-[#EAE3D3]/40">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="shrink-0 text-[#D4A24C]" size={20} />
                                                        <div>
                                                            <p className="text-sm font-medium text-[#1F4737]">{doc.title}</p>
                                                            {doc.file_size && <p className="text-xs text-[#241F1A]/50">{doc.file_size}</p>}
                                                        </div>
                                                    </div>
                                                    <DownloadIcon className="shrink-0 text-[#1F4737]/40" size={18} />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
