import { PropsWithChildren, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props extends PropsWithChildren {
    title?: string;
}

export default function MainLayout({ children, title }: Props) {
    useEffect(() => {
        const unsubscribe = router.on('navigate', () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white text-[#241F1A]">
            <Head title={title ? `${title} · Mariakani Municipality` : 'Mariakani Municipality'} />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
