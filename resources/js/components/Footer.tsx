import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1A3C2F] text-[#F3EEE2]">
            {/* Acacia silhouette divider — the site's signature motif */}
            <svg viewBox="0 0 1200 60" className="block h-12 w-full text-[#1A3C2F]" preserveAspectRatio="none">
                <path
                    fill="#F3EEE2"
                    d="M0,60 L0,40 Q40,38 60,20 Q70,10 80,20 Q85,5 95,15 Q100,2 108,16 Q120,8 130,22 Q150,15 160,30 L160,60 Z
                       M260,60 L260,30 Q300,28 320,12 Q335,0 345,14 Q355,4 365,18 Q380,10 395,24 L395,60 Z
                       M650,60 L650,35 Q680,33 700,18 Q712,8 722,20 Q730,8 740,20 Q755,12 768,26 L768,60 Z
                       M980,60 L980,38 Q1015,36 1035,18 Q1048,6 1058,18 Q1068,6 1078,20 Q1095,12 1110,28 L1110,60 Z"
                />
            </svg>

            <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <h3 className="font-serif text-lg font-semibold text-[#D4A24C]">Mariakani Municipality</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#F3EEE2]/75">
                        Urban governance for Mariakani's residents, traders, and investors — under the Urban
                        Areas and Cities Act and the Mariakani Municipal Charter.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A24C]">Quick Links</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#F3EEE2]/75">
                        <li><Link href="/about" className="hover:text-[#D4A24C]">About Us</Link></li>
                        <li><Link href="/municipal-structure" className="hover:text-[#D4A24C]">Municipal Structure</Link></li>
                        <li><Link href="/projects" className="hover:text-[#D4A24C]">Projects</Link></li>
                        <li><Link href="/downloads" className="hover:text-[#D4A24C]">Downloads</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A24C]">Resources</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#F3EEE2]/75">
                        <li><Link href="/news" className="hover:text-[#D4A24C]">News & Updates</Link></li>
                        <li><Link href="/contact" className="hover:text-[#D4A24C]">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A24C]">Get in Touch</h4>
                    <ul className="mt-3 space-y-2.5 text-sm text-[#F3EEE2]/75">
                        <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Mariakani Municipality, Kilifi County</li>
                        <li className="flex items-center gap-2"><Phone size={16} className="shrink-0" /> +254 700 000 000</li>
                        <li className="flex items-center gap-2"><Mail size={16} className="shrink-0" /> info@mariakanimunicipality.go.ke</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-[#F3EEE2]/60">
                © {new Date().getFullYear()} Mariakani Municipality, Kilifi County. All rights reserved.
            </div>
        </footer>
    );
}
