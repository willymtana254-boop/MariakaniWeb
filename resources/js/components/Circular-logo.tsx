// resources/js/components/circular-logo.tsx
export default function CircularLogo({ size = 96 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 200 200" className="select-none">
            <defs>
                {/* Top arc — text reads left-to-right along the upper curve */}
                <path id="topArc" d="M 20,100 A 80,80 0 0 1 180,100" fill="none" />
                {/* Bottom arc — drawn right-to-left so the text isn't upside down */}
                <path id="bottomArc" d="M 180,108 A 80,80 0 0 1 20,108" fill="none" />
                <clipPath id="logoClip">
                    <circle cx="100" cy="100" r="58" />
                </clipPath>
            </defs>

            {/* Outer rings */}
            <circle cx="100" cy="100" r="98" fill="#FFFFFF" stroke="#1F4737" strokeWidth="2" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="#D4A24C" strokeWidth="1.5" />

            {/* Logo image */}
            <image
                href="/images/logo/kilifi-crest.webp"
                x="42"
                y="42"
                width="116"
                height="116"
                clipPath="url(#logoClip)"
                preserveAspectRatio="xMidYMid slice"
            />

            {/* Curved top text */}
            <text fontSize="13.5" fontWeight="700" letterSpacing="1.3" fill="#1F4737">
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                    MARIAKANI MUNICIPALITY
                </textPath>
            </text>

            {/* Curved bottom text */}
            <text fontSize="13.5" fontWeight="700" letterSpacing="1.3" fill="#1F4737">
                <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                    KILIFI COUNTY
                </textPath>
            </text>
        </svg>
    );
}