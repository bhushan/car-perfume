"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, MaskLines } from "@/components/fx/Reveal";
import Counter from "@/components/fx/Counter";

const stats = [
  { to: 60, suffix: "", label: "Days of fragrance" },
  { to: 27, suffix: "", label: "Notes per composition" },
  { to: 14, suffix: "", label: "Months in development" },
];

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-44" aria-label="Brand story">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_50%,rgba(201,168,106,0.05),transparent_70%)]" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 lg:gap-24 lg:px-10">
        <div>
          <Reveal>
            <p className="eyebrow">The House of Veloure</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="mt-6 font-serif text-4xl font-light leading-[1.08] tracking-tight text-ivory md:text-6xl"
            lines={[
              <>A car is not</>,
              <>a vehicle.</>,
              <>
                It is a <em className="gold-text not-italic">room</em>
              </>,
              <>that moves.</>,
            ]}
          />
          <Reveal delay={0.25} className="mt-8 max-w-md">
            <p className="text-base font-light leading-relaxed text-muted">
              We began with a simple observation: the most designed interior most people ever own is their car, and it
              smells like nothing they chose. Veloure composes parfum-grade fragrance for that room. French oils,
              hand-finished glass, an alloy base weighted like a watch crown.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-6 max-w-md">
            <p className="text-base font-light leading-relaxed text-muted">
              Every composition is tuned inside real cabins: against leather, at speed, with the windows down, until it
              behaves less like a scent and more like an atmosphere.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-8 border-t hairline pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.12}>
                <div>
                  <Counter to={s.to} suffix={s.suffix} className="font-serif text-4xl font-light text-champagne md:text-5xl" />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <motion.div style={{ y: yImage, scale: scaleImage }} className="absolute inset-[-12%]">
                <Image
                  src="/images/story.png"
                  alt="Veloure flacon resting on stitched leather in low golden light"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-8 left-8">
                <p className="font-serif text-2xl font-light italic text-ivory/90">&ldquo;Atmosphere, engineered.&rdquo;</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ivory/50">Maison Veloure · Est. 2024</p>
              </div>
            </div>
          </Reveal>
          <motion.div
            className="absolute -right-10 -top-10 -z-10 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(201,168,106,0.14), transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
