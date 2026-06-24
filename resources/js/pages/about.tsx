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

export default function About({ mission, objectives, functions: municipalFunctions, boundaries, wards }: Props) {
    return (
        <MainLayout title="About Us">
            <section className="bg-[#1F4737] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">About Us</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{mission?.title ?? 'About Mariakani Municipality'}</h1>
                </div>
            </section>

            {mission && (
                <section className="mx-auto max-w-4xl px-6 py-16">
                    <p className="text-base leading-relaxed text-[#241F1A]/80">{mission.body}</p>
                </section>
            )}

            <section className="bg-[#EAE3D3] py-16">
                <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
                    {[objectives, municipalFunctions].filter(Boolean).map((block) => (
                        <div key={block!.key} className="rounded-xl border border-[#1F4737]/10 bg-white p-8 shadow-sm">
                            <h2 className="font-serif text-xl font-semibold text-[#1F4737]">{block!.title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#241F1A]/75">{block!.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                {boundaries && (
                    <div className="max-w-3xl">
                        <h2 className="font-serif text-2xl font-bold text-[#1F4737]">{boundaries.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-[#241F1A]/75">{boundaries.body}</p>
                    </div>
                )}
                {wards.length > 0 && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {wards.map((ward, i) => (
                            <div key={ward.id} className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                                <span className="font-serif text-sm font-bold text-[#D4A24C]">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="mt-1 font-serif text-base font-semibold text-[#1F4737]">{ward.name}</h3>
                                {ward.description && (
                                    <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{ward.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
