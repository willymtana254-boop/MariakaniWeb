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
interface BoardMember { id: number; name: string; role: string; bio: string|null; }
interface NewsItem { id: number; title: string; slug: string; excerpt: string; published_at: string|null; }

interface Props {
    objectives: ContentBlock|null; functions: ContentBlock|null; boundaries: ContentBlock|null;
    governorMessage: ContentBlock|null; stats: Stat[]; wards: Ward[];
    featuredProjects: Project[]; boardPreview: BoardMember[]; latestNews: NewsItem[];
}

export default function Home({ objectives, functions: municipalFunctions, boundaries, governorMessage, stats, wards, featuredProjects, boardPreview, latestNews }: Props) {
    const [slide, setSlide] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setSlide(s => (s+1) % HERO_SLIDES.length), 6000);
        return () => clearInterval(t);
    }, []);

    return (
        <MainLayout title="Home">
            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-[#1a3a6b] text-white" style={{minHeight:'520px'}}>
                {HERO_SLIDES.map((s, i) => (
                    <div key={s.src} className="absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-1000"
                        style={{ backgroundImage: `url(${s.src})`, opacity: i === slide ? 1 : 0 }}/>
                ))}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a3a6b]/92 via-[#1a3a6b]/70 to-[#1a3a6b]/20"/>
                <button onClick={() => setSlide(s=>(s-1+HERO_SLIDES.length)%HERO_SLIDES.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white hover:bg-black/50 transition">
                    <ChevronLeft size={18}/>
                </button>
                <button onClick={() => setSlide(s=>(s+1)%HERO_SLIDES.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white hover:bg-black/50 transition">
                    <ChevronRight size={18}/>
                </button>
                <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFBC02]">{HERO_SLIDES[slide].tag}</p>
                    <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">{HERO_SLIDES[slide].headline}</h1>
                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{HERO_SLIDES[slide].sub}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/about" className="rounded bg-[#FFBC02] px-7 py-3 text-sm font-bold text-[#1a3a6b] hover:bg-[#e6aa00] transition">Learn More</Link>
                        <Link href="/contact" className="rounded border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:border-white transition">Contact Us</Link>
                    </div>
                    <div className="mt-10 flex gap-2">
                        {HERO_SLIDES.map((_,i) => (
                            <button key={i} onClick={()=>setSlide(i)} className={`h-1 rounded-full transition-all ${i===slide?'w-8 bg-[#FFBC02]':'w-3 bg-white/30'}`}/>
                        ))}
                    </div>
                </div>
            </section>

            {/* Welcome + Cards */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-center">
                        <div>
                            <div className="mb-3 h-0.5 w-10 bg-[#FFBC02]"/>
                            <h2 className="font-serif text-3xl font-bold text-[#1a3a6b]">Welcome to the<br/>Municipality of Mariakani.</h2>
                        </div>
                        <p className="text-sm leading-relaxed text-[#1a3a6b]/75">
                            Mariakani Municipality is set out to provide urban governance that will strive to ensure efficient and effective service delivery to the community as mandated by the Urban Areas and Cities Act and the Mariakani Municipal Charter.
                        </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {[objectives, municipalFunctions, boundaries].filter(Boolean).map((block, idx) => {
                            const Icon = CARD_ICONS[idx];
                            return (
                                <div key={block!.key} className="rounded-lg bg-[#1a3a6b] p-7 shadow-md border-l-4 border-[#FFBC02]">
                                    <Icon size={40} className="text-[#FFBC02] mb-4"/>
                                    <h3 className="font-bold text-[#FFBC02] text-base mb-3">{block!.title}</h3>
                                    <p className="text-sm leading-relaxed text-white/75">{block!.body}</p>
                                    {block!.key === 'boundaries' && wards.length > 0 && (
                                        <ul className="mt-4 space-y-1 text-xs text-white/60">
                                            {wards.map((w,i) => <li key={w.id}>{i+1}. {w.name}</li>)}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Governor's Message */}
            {governorMessage && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[auto_1fr] md:items-start">
                        <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#1a3a6b]/10 font-serif text-5xl font-bold text-[#1a3a6b]/30 shrink-0">
                            {governorMessage.byline?.[0] ?? 'G'}
                        </div>
                        <div>
                            <div className="mb-2 h-0.5 w-8 bg-[#FFBC02]"/>
                            <h2 className="font-serif text-2xl font-bold text-[#1a3a6b]">{governorMessage.title}</h2>
                            <p className="mt-4 text-sm italic leading-relaxed text-[#1a3a6b]/70">{governorMessage.body}</p>
                            <p className="mt-5 font-bold text-[#1a3a6b]">{governorMessage.byline}</p>
                            <p className="text-sm text-[#1a3a6b]/60">{governorMessage.byline_role}</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats */}
            {stats.length > 0 && (
                <section className="bg-[#1a3a6b] py-16 text-white">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-8">
                            <div className="mb-3 h-0.5 w-8 bg-[#FFBC02]"/>
                            <h2 className="font-serif text-2xl font-bold">Advancing Urban Renewal, Economic Growth, and Environmental Sustainability</h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map(stat => (
                                <div key={stat.id} className="flex flex-col items-center justify-center rounded-full border-2 border-[#FFBC02]/40 bg-white/5 aspect-square max-w-[160px] mx-auto text-center p-4">
                                    <p className="font-serif text-3xl font-bold text-white">{stat.value}<span className="text-[#FFBC02]">{stat.suffix}</span></p>
                                    <p className="mt-1 text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-8 flex items-end justify-between">
                            <div>
                                <div className="mb-2 h-0.5 w-8 bg-[#FFBC02]"/>
                                <h2 className="font-serif text-2xl font-bold text-[#1a3a6b]">Featured Projects</h2>
                            </div>
                            <Link href="/projects" className="flex items-center gap-1 text-sm font-semibold text-[#1a3a6b] hover:text-[#FFBC02]">
                                View all <ArrowRight size={16}/>
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {featuredProjects.map(p => (
                                <Link key={p.id} href={`/projects/${p.slug}`}
                                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                                    <div className="h-44 bg-[#1a3a6b]/10"/>
                                    <div className="p-5">
                                        {p.category && <span className="text-xs font-bold uppercase text-[#FFBC02]">{p.category}</span>}
                                        <h3 className="mt-2 font-bold text-[#1a3a6b] group-hover:text-[#FFBC02] transition">{p.title}</h3>
                                        <p className="mt-2 text-sm text-[#1a3a6b]/70 leading-relaxed">{p.summary}</p>
                                        <p className="mt-3 text-xs font-bold text-[#FFBC02] flex items-center gap-1">Read more <ArrowRight size={12}/></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Board Members */}
            {boardPreview.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-8">
                            <div className="mb-2 h-0.5 w-8 bg-[#FFBC02]"/>
                            <h2 className="font-serif text-2xl font-bold text-[#1a3a6b]">Board Members</h2>
                            <p className="mt-1 text-sm text-[#1a3a6b]/60">We always work with a great team.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {boardPreview.map(m => (
                                <div key={m.id} className="text-center">
                                    <div className="mx-auto h-24 w-24 rounded-full bg-[#1a3a6b]/10"/>
                                    <h3 className="mt-3 text-sm font-bold text-[#1a3a6b]">{m.name}</h3>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#FFBC02]">{m.role}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/municipal-structure" className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-[#1a3a6b] hover:text-[#FFBC02]">
                            View full municipal structure <ArrowRight size={16}/>
                        </Link>
                    </div>
                </section>
            )}

            {/* News */}
            {latestNews.length > 0 && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-8">
                            <div className="mb-2 h-0.5 w-8 bg-[#FFBC02]"/>
                            <h2 className="font-serif text-2xl font-bold text-[#1a3a6b]">News & Updates</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {latestNews.map(item => (
                                <Link key={item.id} href={`/news/${item.slug}`}
                                    className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                                    {item.published_at && (
                                        <p className="text-xs font-bold uppercase tracking-wide text-[#FFBC02]">
                                            {new Date(item.published_at).toLocaleDateString('en-KE',{year:'numeric',month:'long',day:'numeric'})}
                                        </p>
                                    )}
                                    <h3 className="mt-2 font-bold text-[#1a3a6b] group-hover:text-[#FFBC02] transition">{item.title}</h3>
                                    <p className="mt-2 text-sm text-[#1a3a6b]/70 leading-relaxed">{item.excerpt}</p>
                                    <p className="mt-3 text-xs font-bold text-[#FFBC02] flex items-center gap-1">Read more <ArrowRight size={12}/></p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}