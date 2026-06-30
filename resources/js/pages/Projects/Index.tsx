import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    category: string | null;
    status: string;
}

interface Props {
    projects: Project[];
}

const STATUS_LABEL: Record<string, string> = {
    ongoing: 'Ongoing',
    completed: 'Completed',
    planned: 'Planned',
};

export default function ProjectsIndex({ projects }: Props) {
    return (
        <MainLayout title="Projects">
            <section className="bg-[#007bff] py-16 text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F7941D]">Development</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Projects</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
                        Infrastructure and development initiatives underway across Mariakani Municipality.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                {projects.length === 0 ? (
                    <p className="text-sm text-[#007bff]/60">No projects published yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`}
                                className="group overflow-hidden rounded-xl border border-[#007bff]/10 bg-white shadow-sm transition hover:shadow-md">
                                <div className="h-40 bg-[#007bff]/10" />
                                <div className="p-5">
                                    <div className="flex items-center gap-2">
                                        {project.category && (
                                            <span className="text-xs font-semibold uppercase tracking-wide text-[#F7941D]">{project.category}</span>
                                        )}
                                        <span className="rounded-full bg-[#007bff]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#007bff]">
                                            {STATUS_LABEL[project.status] ?? project.status}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#007bff] group-hover:text-[#F7941D]">{project.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#007bff]/70">{project.summary}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}