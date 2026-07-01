import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { ArrowLeft } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string | null;
    published_at: string | null;
}

interface Props {
    article: NewsItem;
    otherNews: NewsItem[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsShow({ article, otherNews }: Props) {
    return (
        <MainLayout title={article.title}>
            <section className="bg-[#1a2a4a] py-16 text-white">
                <div className="mx-auto max-w-3xl px-6">
                    <Link href="/news" className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-[#F5A623]">
                        <ArrowLeft size={16} /> Back to News
                    </Link>
                    {article.published_at && (
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#F5A623]">
                            {formatDate(article.published_at)}
                        </p>
                    )}
                    <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{article.title}</h1>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-6 py-16">
                <div className="mb-10 h-64 rounded-xl bg-[#1a2a4a]/10" />
                {article.body && (
                    <p className="whitespace-pre-line text-base leading-relaxed text-[#1a2a4a]/80">{article.body}</p>
                )}
            </section>

            {otherNews.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="font-serif text-2xl font-bold text-[#1a2a4a]">More News</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {otherNews.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.slug}`}
                                    className="group rounded-xl border border-[#1a2a4a]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    {item.published_at && (
                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#F5A623]">
                                            {formatDate(item.published_at)}
                                        </p>
                                    )}
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#1a2a4a] group-hover:text-[#F5A623]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#1a2a4a]/70">{item.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}