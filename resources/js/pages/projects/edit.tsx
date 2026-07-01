import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { update } from '@/routes/projects';
import { manage } from '@/routes/news';

interface ProjectData {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    status: string | null;
    image_path: string | null;
    order: number | null;
}

interface Props {
    project: ProjectData;
}

export default function Edit({ project }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        content: string;
        status: string;
        order: string;
        image: File | null;
        _method: string;
    }>({
        title: project.title,
        description: project.description ?? '',
        content: project.content ?? '',
        status: project.status ?? '',
        order: project.order?.toString() ?? '',
        image: null,
        _method: 'put',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(update.url(project.slug), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">Edit Project</h1>

                    {project.image_path && (
                        <img
                            src={`/storage/${project.image_path}`}
                            alt={project.title}
                            className="mb-4 h-32 w-full rounded-md object-cover"
                        />
                    )}

                    <form onSubmit={submit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={8}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <input
                                type="text"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                placeholder="e.g. Ongoing, Completed"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order</label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image {project.image_path && '(leave blank to keep current)'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full text-sm text-gray-700"
                            />
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link href={manage.url()} className="text-sm text-gray-600 hover:text-gray-900">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}