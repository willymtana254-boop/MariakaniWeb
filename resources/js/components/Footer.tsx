import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1a2a4a] text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin size={16} className="text-[#F5A623] shrink-0 mt-0.5"/>
                        <p className="text-sm text-white/80">Mariakani Municipality, Kilifi County</p>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <Phone size={16} className="text-[#F5A623] shrink-0"/>
                        <p className="text-sm text-white/80">+254 700 000 000</p>
                    </div>
                    <div className="flex items-start gap-2 mb-4">
                        <Clock size={16} className="text-[#F5A623] shrink-0 mt-0.5"/>
                        <div>
                            <p className="text-sm font-semibold text-[#F5A623]">Open Hours:</p>
                            <p className="text-sm text-white/80">Mon – Fri: 8 a.m.–5 p.m.</p>
                            <p className="text-sm text-white/80">Sat & Sun: CLOSED</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#F5A623]">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-white/75">
                        {[['Home','/'],['About Us','/about'],['Municipal Structure','/municipal-structure'],['Projects','/projects'],['Downloads','/downloads'],['News & Updates','/news'],['Contact Us','/contact']].map(([l,h])=>(
                            <li key={h}><Link href={h} className="flex items-center gap-1.5 hover:text-[#F5A623]"><span className="text-[#F5A623]">›</span>{l}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#F5A623]">Downloads</h4>
                    <ul className="space-y-2 text-sm text-white/75">
                        {['Board Affairs','Financial Reports','Budget Documents','Legal Documents','Newsletters'].map(c=>(
                            <li key={c}><Link href={`/downloads#${c.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="flex items-center gap-1.5 hover:text-[#F5A623]"><span className="text-[#F5A623]">›</span>{c}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#F5A623]">Newsletter</h4>
                    <p className="mb-3 text-sm text-white/75">Send us your email to get updates from Mariakani Municipality.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your email address" className="flex-1 rounded-l-md border-0 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"/>
                        <button className="rounded-r-md bg-[#F5A623] px-4 py-2 text-[#1a2a4a] font-bold hover:bg-[#e09b1a]">
                            <Mail size={16}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/50">
                {new Date().getFullYear()} © All rights reserved by{' '}
                <Link href="/" className="text-[#F5A623] hover:underline">Municipality of Mariakani</Link>
            </div>
        </footer>
    );
}
