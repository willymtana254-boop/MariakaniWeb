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
        <section className="bg-[#1e3a8a] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-3xl px-6">
                    <Link href="/news" className="flex items-center gap-1 text-sm font-medium text-[#F3EEE2]/80 hover:text-[#D4A24C]">
                        <ArrowLeft size={16} /> Back to News
                    </Link>
                    {article.published_at && (
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
                            {formatDate(article.published_at)}
                        </p>
                    )}
                    <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{article.title}</h1>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-6 py-16">
                <div className="mb-10 h-64 rounded-xl bg-[#1F4737]/10" />
                {article.body && (
                    <p className="whitespace-pre-line text-base leading-relaxed text-[#1F4737]">{article.body}</p>
                )}
            </section>

            {otherNews.length > 0 && (
                <section className="bg-[#EAE3D3] py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="font-serif text-2xl font-bold text-[#1F4737]">More News</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {otherNews.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.slug}`}
                                    className="group rounded-xl border border-[#1F4737]/10 bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    {item.published_at && (
                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#D4A24C]">
                                            {formatDate(item.published_at)}
                                        </p>
                                    )}
                                    <h3 className="mt-2 font-serif text-base font-semibold text-[#1F4737] group-hover:text-[#D4A24C]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#241F1A]/70">{item.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
        

