import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, Target, Eye, Award, Building2, Briefcase } from 'lucide-react';

interface AboutContent {
    mission: string | null;
    vision: string | null;
    coreValues: string[] | null;
    history: string | null;
    objectives: string[] | null;
    functions: string[] | null;
}

interface Stat {
    id: number;
    label: string;
    value: string;
    suffix: string | null;
}

interface Props {
    aboutContent?: AboutContent;
    stats?: Stat[];
}

export default function About({ aboutContent, stats }: Props) {
    const mission = aboutContent?.mission ?? 'To provide sustainable urban governance and quality services that improve the livelihoods of our community.';
    const vision = aboutContent?.vision ?? 'A model municipality that fosters inclusive growth, economic prosperity, and environmental sustainability.';
    const coreValues = aboutContent?.coreValues ?? ['Integrity', 'Transparency', 'Accountability', 'Innovation', 'Excellence'];
    const history = aboutContent?.history ?? 'Mariakani Municipality was established to provide efficient and effective service delivery to the community as mandated by the Urban Areas and Cities Act and the Mariakani Municipal Charter.';
    const objectives = aboutContent?.objectives ?? [];
    const functions = aboutContent?.functions ?? [];

    return (
        <MainLayout title="About Us">
            {/* ============ HERO ============ */}
            <section className="relative isolate overflow-hidden bg-[#007bff] py-24 text-white sm:py-28">
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#007bff] via-[#0066d6] to-[#0B2545]" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <p className="mx-auto mb-4 flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-[#F7941D]">
                        <span className="h-px w-8 bg-[#F7941D]" /> Who we are <span className="h-px w-8 bg-[#F7941D]" />
                    </p>
                    <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">About Mariakani Municipality</h1>
                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base">
                        Mariakani Municipality is a vibrant urban center in Kilifi County, committed to providing
                        efficient and effective service delivery to the community.
                    </p>
                    <div className="mt-9">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-md bg-[#F7941D] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#e08a1a] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Contact Us
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                {/* coastal wave signature, matches homepage */}
                <svg
                    className="absolute -bottom-px left-0 z-10 h-12 w-full text-white sm:h-16"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
                </svg>
            </section>

            {/* ============ MISSION & VISION ============ */}
            <section className="bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-7 md:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                            <span className="absolute left-0 top-0 h-full w-1 bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]" />
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]">
                                <Target size={22} className="text-white" />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">Our Mission</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{mission}</p>
                        </div>
                        <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                            <span className="absolute left-0 top-0 h-full w-1 bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]" />
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]">
                                <Eye size={22} className="text-white" />
                            </div>
                            <h3 className="mb-3 font-serif text-xl font-bold text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">Our Vision</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{vision}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CORE VALUES ============ */}
            <section className="bg-[#F8FAFC] py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <p className="mx-auto mb-3 flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                            <span className="h-px w-8 bg-[#F7941D]" /> What guides us <span className="h-px w-8 bg-[#F7941D]" />
                        </p>
                        <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">Our Core Values</h2>
                        <p className="mt-2 text-sm text-slate-500">The principles that guide our service delivery</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F7941D]/40 hover:shadow-xl hover:shadow-slate-200/60"
                            >
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#007bff]/10 transition-colors duration-300 group-hover:bg-[#F7941D]/15">
                                    <Award size={22} className="text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]" />
                                </div>
                                <h4 className="text-sm font-bold text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">{value}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ HISTORY ============ */}
            <section className="bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> Our story
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">Our History</h2>
                            <div className="relative mt-6 flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-[#007bff] to-[#0B2545]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,148,29,0.25),transparent_60%)]" />
                                <Building2 size={56} className="relative text-white/80" />
                            </div>
                        </div>
                        <div>
                            <p className="relative pl-5 text-[15px] leading-relaxed text-slate-600 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#F7941D]/40">
                                {history}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ OBJECTIVES & FUNCTIONS ============ */}
            <section className="bg-[#F8FAFC] py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-7 md:grid-cols-2">
                        {/* Objectives */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                            <span className="absolute left-0 top-0 h-full w-1 bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]" />
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]">
                                    <Target size={22} className="text-white" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">Our Objectives</h3>
                            </div>
                            {objectives.length > 0 ? (
                                <ul className="space-y-3.5">
                                    {objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#007bff]/10 text-[11px] font-bold text-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]/15 group-hover:text-[#F7941D]">
                                                {index + 1}
                                            </span>
                                            {objective}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-500">No objectives listed.</p>
                            )}
                        </div>

                        {/* Functions */}
                        <div className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
                            <span className="absolute left-0 top-0 h-full w-1 bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]" />
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]">
                                    <Briefcase size={22} className="text-white" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">Our Functions</h3>
                            </div>
                            {functions.length > 0 ? (
                                <ul className="space-y-3.5">
                                    {functions.map((func, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#007bff]/10 text-[11px] font-bold text-[#007bff] transition-colors duration-300 group-hover:bg-[#F7941D]/15 group-hover:text-[#F7941D]">
                                                {index + 1}
                                            </span>
                                            {func}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-500">No functions listed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ STATS ============ */}
            {stats && stats.length > 0 && (
                <section className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <p className="mx-auto mb-3 flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#F7941D]">
                                <span className="h-px w-8 bg-[#F7941D]" /> By the numbers <span className="h-px w-8 bg-[#F7941D]" />
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-[#007bff] sm:text-3xl">Mariakani Municipality in Numbers</h2>
                        </div>
                        <div className="grid gap-px overflow-hidden rounded-xl border border-slate-100 bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map(stat => (
                                <div
                                    key={stat.id}
                                    className="group flex flex-col items-center justify-center gap-1 bg-white px-4 py-10 text-center transition-colors duration-300 hover:bg-[#007bff]/3"
                                >
                                    <p className="font-serif text-3xl font-bold text-[#0B2545] transition-colors duration-300 group-hover:text-[#007bff]">
                                        {stat.value}
                                        <span className="text-[#007bff] transition-colors duration-300 group-hover:text-[#F7941D]">{stat.suffix}</span>
                                    </p>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}