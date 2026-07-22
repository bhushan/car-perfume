"use client";

import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";

const luxe = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    title: "Long-lasting fragrance",
    body: "Sixty days of consistent diffusion from a single vessel. Parfum-grade fixatives, not evaporating sprays.",
    icon: (
      <g>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </g>
    ),
  },
  {
    title: "Premium oils",
    body: "French perfume oils sourced from Grasse, the same houses that supply haute parfumerie.",
    icon: (
      <g>
        <path d="M12 3c3 4.5 6 7.5 6 11a6 6 0 1 1-12 0c0-3.5 3-6.5 6-11z" />
        <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
      </g>
    ),
  },
  {
    title: "Luxury packaging",
    body: "Hand-finished glass, weighted alloy base, soft-touch presentation box. Unboxing is part of the composition.",
    icon: (
      <g>
        <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
        <path d="M3 8l9 5 9-5" />
        <path d="M12 13v8" />
      </g>
    ),
  },
  {
    title: "Made for every drive",
    body: "Tuned in real cabins: city idle, motorway, windows down. Present at ignition, never loud at speed.",
    icon: (
      <g>
        <path d="M5 16l2-6a2 2 0 0 1 2-1.5h6A2 2 0 0 1 17 10l2 6" />
        <path d="M4 16h16v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z" />
      </g>
    ),
  },
  {
    title: "Safe for interiors",
    body: "IFRA-compliant formulas, sealed glass vessel. Tested against leather, Alcantara and piano-black trim.",
    icon: (
      <g>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </g>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-32 md:py-40" aria-label="Why Veloure">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Veloure Standard"
          lines={[<>Obsession, in</>, <>five <em className="gold-text not-italic">details</em></>]}
        />

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1} y={50}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: luxe }}
                className="glass card-sheen group h-full rounded-3xl p-7"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: luxe }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.06] text-gold transition-all duration-700 group-hover:border-gold/50 group-hover:bg-gold/[0.12] group-hover:shadow-[0_0_30px_rgba(201,168,106,0.25)]"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {r.icon}
                  </svg>
                </motion.div>
                <h3 className="mt-6 font-serif text-xl font-normal leading-snug text-ivory">{r.title}</h3>
                <p className="mt-3 text-[13px] font-light leading-relaxed text-muted">{r.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
