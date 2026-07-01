import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { create, edit, destroy } from '@/routes/news';

interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    image_path: string | null;
    published_at: string | null;
}

interface PaginatedNews {
    data: NewsArticle[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    news: PaginatedNews;
}

export default function Manage({ news }: Props) {
    const handleDelete = (article: NewsArticle) => {
        if (confirm('Are you sure you want to delete this article?')) {
            router.delete(destroy.url(article.slug));
        }
    };

    return (
        <AppLayout>
            <Head title="Manage News" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900">Manage News</h1>
                        <Link
                            href={create.url()}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                        >
                            Add Article
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Published</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {news.data.map((article) => (
                                    <tr key={article.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {article.image_path ? (
                                                <img
                                                    src={`/storage/${article.image_path}`}
                                                    alt={article.title}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-gray-200" />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {article.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            {article.published_at ? (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {article.published_at
                                                ? new Date(article.published_at).toLocaleDateString()
                                                : '—'}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                            <Link
                                                href={edit.url(article.slug)}
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {news.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No articles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {news.links.length > 3 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {news.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? '#'}
                                    className={`rounded px-3 py-1 text-sm ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}