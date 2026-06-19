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

export default function MunicipalStructure({ boardMembers, wards }: Props) {
    return (
        <MainLayout title="Municipal Structure">
            {/* Hero */}
            <section className="bg-[#1F4737] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">Governance</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Municipal Structure</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F3EEE2]/80">
                        The Board of the Municipality, established under the Urban Areas and Cities Act, oversees
                        governance, service delivery, and development across all wards.
                    </p>
                </div>
            </section>

            {/* Board Members */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <h2 className="font-serif text-2xl font-bold text-[#1F4737]">Board Members</h2>
                <p className="mt-2 text-sm text-[#241F1A]/70">We always work with a great team.</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {boardMembers.map((member) => (
                        <div key={member.id} className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                            <div className="mx-auto h-20 w-20 rounded-full bg-[#1F4737]/10" />
                            <h3 className="mt-4 text-center font-serif text-base font-semibold text-[#1F4737]">
                                {member.name}
                            </h3>
                            <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
                                {member.role}
                            </p>
                            {member.bio && (
                                <p className="mt-3 text-center text-sm leading-relaxed text-[#241F1A]/70">
                                    {member.bio}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Wards */}
            {wards.length > 0 && (
                <section className="bg-[#EAE3D3] py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="font-serif text-2xl font-bold text-[#1F4737]">Wards</h2>
                        <p className="mt-2 text-sm text-[#241F1A]/70">
                            The Municipality's wards, as set out in the Municipal Charter.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {wards.map((ward, i) => (
                                <div key={ward.id} className="rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm">
                                    <span className="font-serif text-sm font-bold text-[#D4A24C]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-1 font-serif text-base font-semibold text-[#1F4737]">{ward.name}</h3>
                                    {ward.description && (
                                        <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{ward.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}