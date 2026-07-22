"use client";

import { Reveal } from "@/components/fx/Reveal";

const columns = [
  {
    title: "Collection",
    links: ["Noir Oud", "Santal Route", "Ambre Méridien", "Refill Amphoules", "Gift Sets"],
  },
  {
    title: "House",
    links: ["Our Story", "The Atelier", "Journal", "Press", "Careers"],
  },
  {
    title: "Care",
    links: ["Shipping & Delivery", "Returns & Exchanges", "Product Care", "FAQ", "Contact"],
  },
];

const socials = [
  {
    label: "Instagram",
    icon: (
      <g>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </g>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <g>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" />
      </g>
    ),
  },
  {
    label: "X",
    icon: (
      <g>
        <path d="M4 4l16 16M20 4L4 20" />
      </g>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 21c1-3.5 1.5-6 2-8.5" />
        <path d="M11.5 12.5a3.5 3.5 0 1 1 4 3" />
      </g>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t hairline" aria-label="Footer">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Reveal>
            <div>
              <p className="font-serif text-2xl tracking-[0.35em] text-ivory">VELOURE</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.4em] text-muted">Parfums d&apos;Automobile</p>
              <p className="mt-6 max-w-xs text-[13px] font-light leading-relaxed text-muted">
                Parfum-grade fragrance for the most designed room you own: the cabin of your car. Composed in the
                atelier, finished by hand.
              </p>
              <div className="mt-8 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-ivory/60 transition-all duration-500 hover:border-gold/60 hover:text-champagne hover:shadow-[0_0_25px_rgba(201,168,106,0.2)]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {columns.map((col, ci) => (
            <Reveal key={col.title} delay={0.1 + ci * 0.1}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/80">{col.title}</p>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="group relative text-[13px] font-light text-muted transition-colors duration-500 hover:text-ivory"
                      >
                        {link}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold/60 transition-all duration-500 group-hover:w-full" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t hairline pt-8 md:flex-row">
          <p className="text-[11px] font-light text-muted/70">© 2026 Maison Veloure. All rights reserved.</p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map((p) => (
              <a
                key={p}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] font-light text-muted/70 transition-colors duration-500 hover:text-ivory"
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* oversized watermark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="translate-y-[35%] whitespace-nowrap text-center font-serif text-[18vw] font-light leading-none tracking-[0.2em] text-white/[0.02]">
          VELOURE
        </p>
      </div>
    </footer>
  );
}
