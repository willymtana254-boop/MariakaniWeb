import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image_path: string | null;
    published_at: string | null;
}

interface Props {
    article: NewsArticle;
}

export default function Edit({ article }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        excerpt: string;
        content: string;
        published_at: string;
        image: File | null;
        _method: string;
    }>({
        title: article.title,
        excerpt: article.excerpt ?? '',
        content: article.content,
        published_at: article.published_at ? article.published_at.slice(0, 16) : '',
        image: null,
        _method: 'put',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/news/${article.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit ${article.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">Edit News Article</h1>

                    {article.image_path && (
                        <img
                            src={`/storage/${article.image_path}`}
                            alt={article.title}
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
                            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                            <textarea
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={10}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Published At</label>
                            <input
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            <p className="mt-1 text-xs text-gray-500">Leave blank to keep as a draft (unpublished).</p>
                            {errors.published_at && <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image {article.image_path && '(leave blank to keep current)'}
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
                            <Link href="/news" className="text-sm text-gray-600 hover:text-gray-900">
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