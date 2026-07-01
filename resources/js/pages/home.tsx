import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Landmark, MapPinned } from 'lucide-react';

const HERO_SLIDES = [
    { src: '/images/hero-rabai-church.jpg', alt: "St Paul's Church, New Rabai", tag: 'MARIAKANI THE PLACE TO BE', headline: 'A Transport & Trade Hub of the Coast', sub: 'Mariakani sits at the heart of the Mombasa–Nairobi corridor, a gateway to opportunity and growth in Kilifi County.' },
    { src: '/images/hero-marafa-gorge.webp', alt: 'Marafa Gorge, Kilifi', tag: 'DISCOVER MARIAKANI', headline: 'Rich Heritage, Vibrant Future', sub: 'Home to breathtaking landscapes and a growing urban economy, Mariakani Municipality is building a better tomorrow.' },
];

const CARD_ICONS = [Building2, Landmark, MapPinned];

interface ContentBlock { key: string; title: string|null; body: string|null; image_path: string|null; byline: string|null; byline_role: string|null; }
interface Stat { id: number; label: string; value: string; suffix: string|null; }
interface Ward { id: number; name: string; }
interface Project { id: number; title: string; slug: string; summary: string; category: string|null; image_path: string|null; }
interface BoardMember { id: number; name: string; role: string; bio: string|null; photo_path: string|null; }
interface NewsItem { id: number; title: string; slug: string; excerpt: string; published_at: string|null; image_path: string|null; }

interface Props {
    objectives: ContentBlock|null; functions: ContentBlock|null; boundaries: ContentBlock|null;
    governorMessage: ContentBlock|null; stats: Stat[]; wards: Ward[];
    featuredProjects: Project[]; boardPreview: BoardMember[]; latestNews: NewsItem[];
}

export default function Home({ objectives, functions: municipalFunctions, boundaries, governorMessage, stats, wards, featuredProjects, boardPreview, latestNews }: Props) {
    const [slide, setSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6500);
        return () => clearInterval(t);
    }, [paused]);

    return (
        <MainLayout title="Home">
            {/* ============ HERO ============ */}
            <section
                className="relative isolate overflow-hidden text-white"
                style={{ minHeight: '600px' }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {HERO_SLIDES.map((s, i) => (
                    <div
                        key={s.src}
                        aria-hidden={i !== slide}
                        className="absolute inset-0 -z-20 scale-105 bg-cover bg-center transition-opacity duration-1400 ease-out"
                        style={{ backgroundImage: `url(${s.src})`, opacity: i === slide ? 1 : 0 }}
                    />
                ))}
                

                <button
                    onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    aria-label="Previous slide"
                    className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#F7941D]"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)}
                    aria-label="Next slide"
                    className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#F7941D]"
                >
                    <ChevronRight size={18} />
                </button>

                <div className="relative mx-auto flex min-h-150 max-w-7xl flex-col justify-center px-6 py-28">
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-[#F7941D]">
                        <span className="h-px w-8 bg-[#F7941D]" />
                        {HERO_SLIDES[slide].tag}
                    </p>
                    <h1 className="mt-5 max-w-3xl font-serif text-[2.5rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                        {HERO_SLIDES[slide].headline.split(' ').map((word, idx, arr) =>
                            idx === arr.length - 1
                                ? <span key={idx} className="text-[#5BBE6B]">{word}</span>
                                : <span key={idx}>{word} </span>
                        )}
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
                        {HERO_SLIDES[slide].sub}
                    </p>
                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 rounded-md bg-[#F7941D] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F7941D]/20 transition hover:bg-[#e08a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Learn More
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-md border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="mt-12 flex gap-2" role="tablist" aria-label="Hero slides">
                        {HERO_SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                role="tab"
                                aria-selected={i === slide}
                                aria-label={`Show slide ${i + 1}: ${s.alt}`}
                                onClick={() => setSlide(i)}
                                className={`h-1 rounded-full transition-all duration-300 ${i === slide ? 'w-9 bg-[#F7941D]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* coastal wave signature, divides hero from page */}
                <svg
                    className="absolute -bottom-px left-0 z-10 h-12 w-full text-white sm:h-16"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
                        fill="currentColor"
                    />
                </svg>
            </section>

            {/* ============ WELCOME + PILLARS ============ */}
            <section className="bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
                        <div>
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> Welcome
                            </p>
                            <h2 className="font-serif text-3xl font-bold leading-tight text-[#007bff] sm:text-4xl">
                                Welcome to the Municipality<br className="hidden sm:block" /> of Mariakani.
                            </h2>
                        </div>
                        <p className="text-[15px] leading-relaxed text-slate-600">
                            Mariakani Municipality is set out to provide urban governance that will strive to ensure
                            efficient and effective service delivery to the community as mandated by the Urban Areas
                            and Cities Act and the Mariakani Municipal Charter.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[objectives, municipalFunctions, boundaries].filter(Boolean).map((block, idx) => {
                            const Icon = CARD_ICONS[idx];
                            return (
                                <div
                                    key={block!.key}
                                    className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                                >
                                    <span className="absolute left-0 top-0 h-full w-1 bg-[#F7941D] transition-all duration-300 group-hover:w-1.5" />
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#007bff]">
                                        <Icon size={22} className="text-[#F7941D]" />
                                    </div>
                                    <h3 className="mb-3 font-serif text-lg font-bold text-[#007bff]">{block!.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-600">{block!.body}</p>
                                    {block!.key === 'boundaries' && wards.length > 0 && (
                                        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                            {wards.map((w, i) => (
                                                <li key={w.id} className="flex items-center gap-1.5">
                                                    <span className="text-[#F7941D]">{String(i + 1).padStart(2, '0')}</span> {w.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ GOVERNOR'S MESSAGE ============ */}
            {governorMessage && (
                <section className="bg-[#F8FAFC] py-20 sm:py-24">
                    <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[220px_1fr] md:items-start">
                        {governorMessage.image_path ? (
                            <img
                                src={`/storage/${governorMessage.image_path}`}
                                alt={governorMessage.byline ?? 'Governor'}
                                className="h-44 w-44 shrink-0 rounded-full object-cover shadow-md ring-4 ring-white"
                            />
                        ) : (
                            <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-[#007bff] font-serif text-5xl font-bold text-[#F7941D] shadow-md">
                                {governorMessage.byline?.[0] ?? 'G'}
                            </div>
                        )}
                        <div>
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> Message
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">{governorMessage.title}</h2>
                            <p className="relative mt-6 pl-5 text-[15px] italic leading-relaxed text-slate-600 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#F7941D]/40">
                                {governorMessage.body}
                            </p>
                            <p className="mt-6 font-bold text-[#007bff]">{governorMessage.byline}</p>
                            <p className="text-sm text-slate-500">{governorMessage.byline_role}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* ============ STATS ============ */}
            {stats.length > 0 && (
                <section className="relative overflow-hidden bg-[#007bff] py-20 sm:py-24">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
                        aria-hidden="true"
                    />
                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="mb-12 max-w-2xl">
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> By the numbers
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                                Advancing urban renewal, economic growth, and environmental sustainability.
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4">
                            {stats.map(stat => (
                                <div
                                    key={stat.id}
                                    className="flex flex-col items-center justify-center gap-1 bg-[#007bff] px-4 py-10 text-center transition-colors hover:bg-white/4"
                                >
                                    <p className="font-serif text-4xl font-bold text-white">
                                        {stat.value}<span className="text-[#F7941D]">{stat.suffix}</span>
                                    </p>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ FEATURED PROJECTS ============ */}
            {featuredProjects.length > 0 && (
                <section className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                    <span className="h-px w-8 bg-[#F7941D]" /> Projects
                                </p>
                                <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">Featured Projects</h2>
                            </div>
                            <Link
                                href="/projects"
                                className="group flex items-center gap-1.5 text-sm font-semibold text-[#007bff] transition hover:text-[#F7941D]"
                            >
                                View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <div className="grid gap-7 md:grid-cols-3">
                            {featuredProjects.map(p => (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.slug}`}
                                    className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                                >
                                    {p.image_path ? (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={`/storage/${p.image_path}`}
                                                alt={p.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative h-48 overflow-hidden bg-linear-to-br from-[#007bff] to-[#007bff]/70">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,148,29,0.25),transparent_60%)]" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        {p.category && (
                                            <span className="text-[11px] font-bold uppercase tracking-wide text-[#F7941D]">{p.category}</span>
                                        )}
                                        <h3 className="mt-2 font-serif text-lg font-bold text-[#007bff] transition-colors group-hover:text-[#F7941D]">
                                            {p.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                                        <p className="mt-4 flex items-center gap-1 text-xs font-bold text-[#F7941D]">
                                            Read more
                                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============ BOARD MEMBERS ============ */}
            {boardPreview.length > 0 && (
                <section className="bg-[#F8FAFC] py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12">
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> Leadership
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">Board Members</h2>
                            <p className="mt-2 text-sm text-slate-500">We always work with a great team.</p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                            {boardPreview.map(m => (
                                <div key={m.id} className="group text-center">
                                    {m.photo_path ? (
                                        <img
                                            src={`/storage/${m.photo_path}`}
                                            alt={m.name}
                                            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-linear-to-br from-[#007bff] to-[#007bff]/70 ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                                            <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-bold text-[#F7941D]">
                                                {m.name.charAt(0)}
                                            </div>
                                        </div>
                                    )}
                                    <h3 className="mt-4 text-sm font-bold text-[#007bff]">{m.name}</h3>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#F7941D]">{m.role}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/municipal-structure"
                            className="group mt-12 inline-flex items-center gap-1.5 text-sm font-bold text-[#007bff] transition hover:text-[#F7941D]"
                        >
                            View full municipal structure
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </section>
            )}

            {/* ============ NEWS ============ */}
            {latestNews.length > 0 && (
                <section className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12">
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> Latest
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">News &amp; Updates</h2>
                        </div>
                        <div className="grid gap-7 md:grid-cols-3">
                            {latestNews.map(item => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.slug}`}
                                    className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                                >
                                    {item.image_path && (
                                        <div className="h-40 overflow-hidden">
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-7">
                                        {item.published_at && (
                                            <p className="text-[11px] font-bold uppercase tracking-wide text-[#F7941D]">
                                                {new Date(item.published_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        )}
                                        <h3 className="mt-3 font-serif text-lg font-bold text-[#007bff] transition-colors group-hover:text-[#F7941D]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
                                        <p className="mt-4 flex items-center gap-1 text-xs font-bold text-[#F7941D]">
                                            Read more
                                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}