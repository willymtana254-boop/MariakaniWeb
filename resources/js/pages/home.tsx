import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface ContentBlock {
    key: string;
    title: string | null;
    body: string | null;
    image_path: string | null;
    byline: string | null;
    byline_role: string | null;
}

interface Stat {
    id: number;
    label: string;
    value: string;
    suffix: string | null;
}

interface Ward {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    category: string | null;
    image_path: string | null;
}

interface BoardMember {
    id: number;
    name: string;
    role: string;
    bio: string | null;
}

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string | null;
}

interface Props {
    objectives: ContentBlock | null;
    functions: ContentBlock | null;
    boundaries: ContentBlock | null;
    governorMessage: ContentBlock | null;
    stats: Stat[];
    wards: Ward[];
    featuredProjects: Project[];
    boardPreview: BoardMember[];
    latestNews: NewsItem[];
}

export default function Home({
    objectives,
    functions: municipalFunctions,
    boundaries,
    governorMessage,
    stats,
    wards,
    featuredProjects,
    boardPreview,
    latestNews,
}: Props) {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#1F4737] text-[#F3EEE2]">
                <svg
                    className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[420px] opacity-10"
                    viewBox="0 0 200 200"
                    fill="none"
                >
                    <path
                        d="M100 180 L100 100 Q60 95 50 60 Q45 40 60 50 Q55 25 75 35 Q75 15 95 28 Q110 10 120 30 Q140 25 135 50 Q155 50 145 70 Q160 75 150 95 Q120 100 100 100"
                        fill="#D4A24C"
                    />
                </svg>
                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">
                        Kilifi County
                    </p>
                    <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
                        Welcome to the Municipality of Mariakani
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F3EEE2]/85 sm:text-lg">
                        Mariakani Municipality provides urban governance that strives for efficient, effective
                        service delivery to the community — as mandated by the Urban Areas and Cities Act and
                        the Mariakani Municipal Charter.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link
                            href="/about"
                            className="rounded-md bg-[#D4A24C] px-6 py-3 text-sm font-semibold text-[#1A3C2F] transition hover:bg-[#e3b563]"
                        >
                            Learn About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-md border border-[#F3EEE2]/30 px-6 py-3 text-sm font-semibold text-[#F3EEE2] transition hover:border-[#F3EEE2]"
                        >
                            Contact the Municipality
                        </Link>
                    </div>
                </div>
            </section>

            {/* Objectives / Functions / Boundaries */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-6 md:grid-cols-3">
                    {[objectives, municipalFunctions, boundaries].filter(Boolean).map((block) => (
                        <div
                            key={block!.key}
                            className="rounded-xl border border-[#1F4737]/10 bg-white p-7 shadow-sm"
                        >
                            <h3 className="font-serif text-lg font-semibold text-[#1F4737]">{block!.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-[#241F1A]/75">{block!.body}</p>
                            {block!.key === 'boundaries' && wards.length > 0 && (
                                <ul className="mt-4 space-y-1 text-sm text-[#241F1A]/70">
                                    {wards.map((w, i) => (
                                        <li key={w.id}>
                                            {i + 1}. {w.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Governor's Message */}
            {governorMessage && (
                <section className="bg-[#EAE3D3] py-16">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1fr_2fr] md:items-center">
                        <div className="flex h-48 w-48 items-center justify-center justify-self-center rounded-full bg-[#1F4737]/10 font-serif text-5xl text-[#1F4737]/30 md:justify-self-start">
                            {governorMessage.byline?.[0] ?? 'G'}
                        </div>
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-[#1F4737]">{governorMessage.title}</h2>
                            <p className="mt-4 text-sm italic leading-relaxed text-[#241F1A]/80">
                                {governorMessage.body}
                            </p>
                            <p className="mt-5 font-semibold text-[#1F4737]">{governorMessage.byline}</p>
                            <p className="text-sm text-[#241F1A]/60">{governorMessage.byline_role}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats */}
            {stats.length > 0 && (
                <section className="bg-[#1A3C2F] py-14 text-[#F3EEE2]">
                    <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="text-center">
                                <p className="font-serif text-4xl font-bold text-[#D4A24C]">
                                    {stat.value}
                                    {stat.suffix}
                                </p>
                                <p className="mt-2 text-sm uppercase tracking-wide text-[#F3EEE2]/75">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <div className="flex items-end justify-between">
                        <h2 className="font-serif text-2xl font-bold text-[#1F4737]">Featured Projects</h2>
                        <Link href="/projects" className="flex items-center gap-1 text-sm font-semibold text-[#1F4737] hover:text-[#D4A24C]">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.slug}`}
                                className="group overflow-hidden rounded-xl border border-[#1F4737]/10 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="h-40 bg-[#1F4737]/10" />
                                <div className="p-5">
                                    {project.category && (
                                        <span className="text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
                                            {project.category}
                                        </span>
                                    )}
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#1F4737] group-hover:text-[#D4A24C]">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{project.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Board Members preview */}
            {boardPreview.length > 0 && (
                <section className="bg-[#EAE3D3] py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="font-serif text-2xl font-bold text-[#1F4737]">Board Members</h2>
                        <p className="mt-2 text-sm text-[#241F1A]/70">We always work with a great team.</p>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {boardPreview.map((member) => (
                                <div key={member.id} className="text-center">
                                    <div className="mx-auto h-24 w-24 rounded-full bg-[#1F4737]/10" />
                                    <h3 className="mt-3 text-sm font-semibold text-[#1F4737]">{member.name}</h3>
                                    <p className="text-xs uppercase tracking-wide text-[#D4A24C]">{member.role}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/municipal-structure"
                            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#1F4737] hover:text-[#D4A24C]"
                        >
                            View full municipal structure <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            )}

            {/* News teaser */}
            {latestNews.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <h2 className="font-serif text-2xl font-bold text-[#1F4737]">News & Updates</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {latestNews.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug}`}
                                className="group rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                {item.published_at && (
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
                                        {new Date(item.published_at).toLocaleDateString('en-KE', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                                <h3 className="mt-2 font-serif text-base font-semibold text-[#1F4737] group-hover:text-[#D4A24C]">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{item.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
