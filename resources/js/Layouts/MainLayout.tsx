import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface Props extends PropsWithChildren {
    title?: string;
}

export default function MainLayout({ children, title }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-[#F3EEE2] text-[#241F1A]">
            <Head title={title ? `${title} · Mariakani Municipality` : 'Mariakani Municipality'} />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
