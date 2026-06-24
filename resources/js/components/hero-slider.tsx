// resources/js/components/hero-slider.tsx
import { useEffect, useState } from "react";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

const slides: Slide[] = [
  {
    image: "/images/hero/rabai-church.jpg",
    eyebrow: "MARIAKANI — RICH IN HERITAGE",
    title: "A Town Rooted in History",
    subtitle: "Home to landmarks like St Paul's Church, New Rabai — a glimpse into our region's living heritage.",
    ctaText: "Learn More",
    ctaHref: "/about",
  },
  {
    image: "/images/hero/mariakani-gorge.webp",
    eyebrow: "MARIAKANI — NATURAL WONDERS",
    title: "Breathtaking Landscapes Await",
    subtitle: "From dramatic gorges to scenic countryside, discover what makes our municipality unforgettable.",
    ctaText: "Explore Projects",
    ctaHref: "/projects",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000); // change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      {/* Background images, cross-fading */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-xl rounded-md bg-white/95 p-8 shadow-lg">
          <p className="mb-2 text-sm font-semibold tracking-wide text-amber-600">
            {slides[active].eyebrow}
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {slides[active].title}
          </h1>
          <p className="mb-6 text-slate-600">{slides[active].subtitle}</p>
          {slides[active].ctaText && (
            <a
              href={slides[active].ctaHref}
              className="inline-block rounded bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              {slides[active].ctaText}
            </a>
          )}
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === active ? "w-6 bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next arrows, matching the Malindi screenshot's < > controls */}
      <button
        onClick={() => setActive((active - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => setActive((active + 1) % slides.length)}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}