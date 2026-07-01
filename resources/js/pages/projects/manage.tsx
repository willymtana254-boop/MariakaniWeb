import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { create, edit, destroy } from '@/routes/projects';

interface ProjectData {
    id: number;
    title: string;
    slug: string;
    status: string | null;
    image_path: string | null;
    order: number | null;
}

interface Props {
    projects: ProjectData[];
}

export default function Manage({ projects }: Props) {
    const handleDelete = (project: ProjectData) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(destroy.url(project.slug));
        }
    };

    return (
        <AppLayout>
            <Head title="Manage Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">Manage Projects</h1>
                        <Link
                            href={create.url()}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                        >
                            Add Project
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {projects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {project.image_path ? (
                                                <img
                                                    src={`/storage/${project.image_path}`}
                                                    alt={project.title}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-gray-200" />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {project.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{project.status ?? '—'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{project.order ?? '—'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                            <Link
                                                href={edit.url(project.slug)}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No projects found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}