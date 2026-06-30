import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string | null;
    category: string | null;
    status: string;
    image_path: string | null;
}

interface Props {
    project: Project;
    otherProjects: Project[];
}

const STATUS_LABEL: Record<string, string> = {
    ongoing: 'Ongoing',
    completed: 'Completed',
    planned: 'Planned',
};

export default function ProjectsShow({ project, otherProjects }: Props) {
    return (
        <MainLayout title={project.title}>
            <section className="bg-[#007bff] py-16 text-white">
                <div className="mx-auto max-w-4xl px-6">
                    <Link href="/projects" className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-[#F7941D]">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                    <div className="mt-4 flex items-center gap-2">
                        {project.category && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-[#F7941D]">
                                {project.category}
                            </span>
                        )}
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                            {STATUS_LABEL[project.status] ?? project.status}
                        </span>
                    </div>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{project.title}</h1>
                    <p className="mt-4 text-base leading-relaxed text-white/85">{project.summary}</p>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-6 py-16">
                <div className="mb-10 h-64 rounded-xl bg-[#007bff]/10" />
                {project.description && (
                    <p className="whitespace-pre-line text-base leading-relaxed text-[#007bff]/80">
                        {project.description}
                    </p>
                )}
            </section>

            {otherProjects.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="font-serif text-2xl font-bold text-[#007bff]">Other Projects</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {otherProjects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.slug}`}
                                    className="group rounded-xl border border-[#007bff]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    {p.category && (
                                        <span className="text-xs font-semibold uppercase tracking-wide text-[#F7941D]">
                                            {p.category}
                                        </span>
                                    )}
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#007bff] group-hover:text-[#F7941D]">
                                        {p.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#007bff]/70">{p.summary}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}