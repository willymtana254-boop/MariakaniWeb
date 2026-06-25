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
            {/* Top info bar - white */}
            <div className="bg-white border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 flex-wrap">
                    <Link href="/" className="flex items-center gap-3">
                        <svg viewBox="0 0 200 200" className="h-14 w-14 shrink-0">
                            <defs>
                                <path id="topArc2" d="M 22,100 A 78,78 0 0 1 178,100" fill="none"/>
                                <path id="botArc2" d="M 30,100 A 70,70 0 0 0 170,100" fill="none"/>
                                <clipPath id="logoClip2"><circle cx="100" cy="100" r="48"/></clipPath>
                            </defs>
                            <circle cx="100" cy="100" r="96" fill="none" stroke="#1a3a6b" strokeWidth="2"/>
                            <circle cx="100" cy="100" r="48" fill="#1a3a6b"/>
                            <image href="/images/logo.webp" x="52" y="52" width="96" height="96" clipPath="url(#logoClip2)" preserveAspectRatio="xMidYMid slice"/>
                            <text fontSize="11.5" fontWeight="700" letterSpacing="1" fill="#1a3a6b">
                                <textPath href="#topArc2" startOffset="50%" textAnchor="middle">MARIAKANI MUNICIPALITY</textPath>
                            </text>
                            <text fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#1a3a6b">
                                <textPath href="#botArc2" startOffset="50%" textAnchor="middle">KILIFI COUNTY</textPath>
                            </text>
                        </svg>
                        <div>
                            <p className="font-bold text-[#1a3a6b] text-base leading-tight uppercase tracking-wide">Municipality</p>
                            <p className="font-bold text-[#1a3a6b] text-base leading-tight uppercase tracking-wide">of Mariakani</p>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2 border-r border-gray-200 pr-8">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a3a6b]/10">
                                <Phone size={16} className="text-[#1a3a6b]"/>
                            </div>
                            <div>
                                <p className="font-semibold text-[#1a3a6b] text-xs">Call Us:</p>
                                <p className="text-xs">+254 700 000 000</p>
                                <p className="text-[10px] text-gray-400">(Mon – Friday)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-r border-gray-200 pr-8">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a3a6b]/10">
                                <Mail size={16} className="text-[#1a3a6b]"/>
                            </div>
                            <div>
                                <p className="font-semibold text-[#1a3a6b] text-xs">Mail us:</p>
                                <p className="text-xs">info@mariakanimunicipality.go.ke</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a3a6b]/10">
                                <MapPin size={16} className="text-[#1a3a6b]"/>
                            </div>
                            <div>
                                <p className="font-semibold text-[#1a3a6b] text-xs">Mariakani Municipality,</p>
                                <p className="text-xs">Kilifi County</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dark nav bar */}
            <nav className="bg-black text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <div className="hidden lg:flex items-center">
                        {NAV_LINKS.map((link) => (
                            <div key={link.href} className="group relative">
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        (url === link.href || (link.href !== '/' && url.startsWith(link.href)))
                                            ? 'border-[#F5A623] text-[#F5A623]'
                                            : 'border-transparent text-white/90 hover:text-[#F5A623] hover:border-[#F5A623]'
                                    }`}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={13}/>}
                                </Link>
                                {link.children && (
                                    <div className="invisible absolute left-0 top-full z-50 w-64 pt-0 opacity-0 transition group-hover:visible group-hover:opacity-100">
                                        <div className="overflow-hidden rounded-b-lg bg-white shadow-xl border-t-2 border-[#F5A623]">
                                            {link.children.map((child) => (
                                                <Link key={child.href} href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-[#1a2a4a] hover:bg-[#1a3a6b]/5 hover:text-[#1a3a6b] font-medium">
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="hidden lg:block rounded bg-[#F5A623] px-5 py-2 text-sm font-bold text-[#1a2a4a] transition hover:bg-[#e09b1a] my-2"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="hidden lg:block rounded bg-[#F5A623] px-5 py-2 text-sm font-bold text-[#1a2a4a] transition hover:bg-[#e09b1a] my-2"
                    >
                        
                                Log in
                            </Link>
                            
                        </>
                    )}
                    
                    {/* <Link href="/login"
                        className="hidden lg:block rounded bg-[#F5A623] px-5 py-2 text-sm font-bold text-[#1a2a4a] transition hover:bg-[#e09b1a] my-2">
                        Log in
                    </Link> */}
                    <button onClick={()=>setOpen(!open)} className="p-2 text-white lg:hidden" aria-label="Toggle menu">
                        {open ? <X size={22}/> : <Menu size={22}/>}
                    </button>
                </div>
                {open && (
                    <div className="border-t border-white/10 px-4 py-3 lg:hidden">
                        {NAV_LINKS.map((link) => (
                            <div key={link.href}>
                                <div className="flex items-center justify-between">
                                    <Link href={link.href} onClick={()=>!link.children&&setOpen(false)}
                                        className="flex-1 rounded px-3 py-2 text-sm font-medium text-white/90 hover:text-[#F5A623]">
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <button onClick={()=>setMobileExpanded(mobileExpanded===link.href?null:link.href)} className="px-3 py-2 text-white/70">
                                            <ChevronDown size={16} className={`transition-transform ${mobileExpanded===link.href?'rotate-180':''}`}/>
                                        </button>
                                    )}
                                </div>
                                {link.children && mobileExpanded===link.href && (
                                    <div className="ml-4 border-l border-white/10 pl-3">
                                        {link.children.map(child=>(
                                            <Link key={child.href} href={child.href} onClick={()=>setOpen(false)}
                                                className="block rounded px-3 py-1.5 text-xs text-white/70 hover:text-[#F5A623]">
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
