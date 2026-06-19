import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Municipal Structure', href: '/municipal-structure' },
    { label: 'Projects', href: '/projects' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'News & Updates', href: '/news' },
    { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { url } = usePage();

    return (
        <header className="sticky top-0 z-50 bg-[#1F4737] text-[#F3EEE2] shadow-md">
            <div className="border-b border-white/10 bg-[#1A3C2F]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6">
                    <span className="hidden sm:inline">Office hours: Mon – Fri, 8:00am – 5:00pm</span>
                    <a href="tel:+254700000000" className="flex items-center gap-1.5 font-medium">
                        <Phone size={12} /> +254 700 000 000
                    </a>
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                <Link href="/" className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D4A24C] font-serif text-lg font-bold text-[#D4A24C]">
                        MM
                    </span>
                    <span className="font-serif text-lg font-semibold leading-tight sm:text-xl">
                        Mariakani
                        <span className="block text-xs font-sans font-normal tracking-[0.2em] text-[#D4A24C]">
                            MUNICIPALITY
                        </span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-[#D4A24C] ${
                                url === link.href ? 'text-[#D4A24C]' : 'text-[#F3EEE2]/90'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => setOpen(!open)}
                    className="rounded-md p-2 text-[#F3EEE2] lg:hidden"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#1A3C2F] px-4 py-3 lg:hidden">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                url === link.href ? 'bg-white/10 text-[#D4A24C]' : 'text-[#F3EEE2]/90'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
