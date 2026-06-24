import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
}

interface Props {
    news: Paginated<NewsItem>;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function NewsIndex({ news }: Props) {
    return (
        <MainLayout title="News & Updates">
            <section className="bg-[#1F4737] py-16 text-[#F3EEE2]">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A24C]">Stay informed</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">News & Updates</h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                {news.data.length === 0 ? (
                    <p className="text-sm text-[#241F1A]/60">No news published yet.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {news.data.map((item) => (
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
                )}

                {news.links.length > 3 && (
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        {news.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                preserveScroll
                                className={`rounded-md px-3 py-1.5 text-sm ${
                                    link.active
                                        ? 'bg-[#1F4737] text-white'
                                        : link.url
                                          ? 'text-[#1F4737] hover:bg-[#1F4737]/10'
                                          : 'pointer-events-none text-[#241F1A]/30'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
