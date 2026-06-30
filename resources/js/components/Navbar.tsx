import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { dashboard, login } from '@/routes';

const DOWNLOAD_CATEGORIES = [
    'Boards Affairs','Financial Reports','Budget Documents',
    'Development Plans','Legal Documents','Public Participation Resources','Newsletters',
];
function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Municipal Structure', href: '/municipal-structure' },
    { label: 'Projects', href: '/projects' },
    { label: 'Downloads', href: '/downloads', children: DOWNLOAD_CATEGORIES.map(c=>({label:c,href:`/downloads#${slugify(c)}`})) },
    { label: 'News & Updates', href: '/news' },
    { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string|null>(null);
    const { url } = usePage();
    const { auth } = usePage().props;

    return (
        <header className="sticky top-0 z-50 shadow-lg">
            {/* Top info bar - Blue */}
            <div className="bg-[#007bff] border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-2 flex-wrap">
                    
                    {/* Desktop Contact Info - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8 text-white">
                        <div className="flex items-center gap-2 border-r border-white/20 pr-4 lg:pr-8">
                            <Phone size={16} className="text-white shrink-0"/>
                            <p className="text-xs lg:text-sm whitespace-nowrap">+254 700 000 000</p>
                        </div>
                        <div className="flex items-center gap-2 border-r border-white/20 pr-4 lg:pr-8">
                            <Mail size={16} className="text-white shrink-0"/>
                            <p className="text-xs lg:text-sm whitespace-nowrap">info@mariakanimunicipality.go.ke</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-white shrink-0"/>
                            <p className="font-semibold text-white text-xs lg:text-sm whitespace-nowrap">Mariakani Municipality</p>
                        </div>
                    </div>

                    {/* Mobile Contact Icons */}
                    <div className="flex md:hidden items-center gap-3 text-white">
                        <Phone size={16} className="shrink-0"/>
                        <Mail size={16} className="shrink-0"/>
                        <MapPin size={16} className="shrink-0"/>
                    </div>
                </div>
            </div>

            {/* Main Nav Bar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center text-black">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 text-black">
                        <img src='/images/logo/kilifi-crest.webp' className='w-10 h-12'/>
                        <div className="hidden sm:block">
                            <p className="font-bold text-white text-xs sm:text-base leading-tight uppercase tracking-wide">Municipality</p>
                            <p className="font-bold text-white text-xs sm:text-base leading-tight uppercase tracking-wide">of Mariakani</p>
                        </div>
                    </Link>
                        {NAV_LINKS.map((link) => (
                            <div key={link.href} className="group relative">
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1 px-3 xl:px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        (url === link.href || (link.href !== '/' && url.startsWith(link.href)))
                                            ? 'border-[#007bff] text-[#007bff]'
                                            : 'border-transparent text-gray-700 hover:text-[#007bff] hover:border-[#007bff]'
                                    }`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={13} className="text-gray-500 group-hover:text-[#007bff]"/>}
                                </Link>
                                {link.children && (
                                    <div className="invisible absolute left-0 top-full z-50 w-64 pt-0 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                        <div className="overflow-hidden rounded-b-lg bg-white shadow-xl border-t-2 border-[#007bff]">
                                            {link.children.map((child) => (
                                                <Link 
                                                    key={child.href} 
                                                    href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#007bff] font-medium transition-colors border-b border-gray-100 last:border-0"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded bg-[#F7941D] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[#e08a1a] hover:scale-105 my-2"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded bg-[#F7941D] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[#e08a1a] hover:scale-105 my-2"
                            >
                                Log in
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setOpen(!open)} 
                        className="p-2 text-gray-700 lg:hidden hover:text-[#007bff] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="border-t border-gray-200 bg-white px-4 py-3 lg:hidden max-h-[80vh] overflow-y-auto">
                        {NAV_LINKS.map((link) => (
                            <div key={link.href} className="border-b border-gray-100 last:border-0">
                                <div className="flex items-center justify-between">
                                    <Link 
                                        href={link.href} 
                                        onClick={() => !link.children && setOpen(false)}
                                        className={`flex-1 rounded px-3 py-3 text-sm font-medium transition-colors ${
                                            (url === link.href || (link.href !== '/' && url.startsWith(link.href)))
                                                ? 'text-[#007bff] bg-blue-50'
                                                : 'text-gray-700 hover:text-[#007bff] hover:bg-gray-50'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <button 
                                            onClick={() => setMobileExpanded(mobileExpanded === link.href ? null : link.href)} 
                                            className="px-3 py-3 text-gray-500 hover:text-[#007bff] transition-colors"
                                            aria-label="Toggle submenu"
                                        >
                                            <ChevronDown 
                                                size={18} 
                                                className={`transition-transform duration-200 ${mobileExpanded === link.href ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    )}
                                </div>
                                {link.children && mobileExpanded === link.href && (
                                    <div className="ml-4 border-l-2 border-[#007bff] pl-3 mb-2">
                                        {link.children.map(child => (
                                            <Link 
                                                key={child.href} 
                                                href={child.href} 
                                                onClick={() => setOpen(false)}
                                                className="block rounded px-3 py-2.5 text-sm text-gray-600 hover:text-[#007bff] hover:bg-blue-50 transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Mobile Auth Buttons */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    onClick={() => setOpen(false)}
                                    className="block w-full rounded bg-[#F7941D] px-5 py-3 text-sm font-bold text-white text-center transition-all hover:bg-[#e08a1a]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    onClick={() => setOpen(false)}
                                    className="block w-full rounded bg-[#F7941D] px-5 py-3 text-sm font-bold text-white text-center transition-all hover:bg-[#e08a1a]"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}