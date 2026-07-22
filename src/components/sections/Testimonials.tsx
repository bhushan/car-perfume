"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";

const luxe = [0.22, 1, 0.36, 1] as const;

function Stars({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: i < rating ? 1 : 0.2, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.07, duration: 0.5, ease: luxe }}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#c9a86a"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5200);
    return () => clearInterval(id);
  }, [next, paused]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden py-32 md:py-40" aria-label="Testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_60%,rgba(201,168,106,0.05),transparent_70%)]" aria-hidden />
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading eyebrow="From the Cabin" lines={[<>Word of <em className="gold-text not-italic">mouth</em></>]} />

        <Reveal delay={0.2} className="mt-16">
          <div
            className="glass-deep card-sheen relative rounded-[2rem] p-10 md:p-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute -top-5 left-10 font-serif text-8xl leading-none text-gold/20" aria-hidden>
              &ldquo;
            </div>

            <div className="min-h-[220px] md:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: luxe }}
                >
                  <p className="font-serif text-2xl font-light leading-relaxed text-ivory/95 md:text-3xl">{t.quote}</p>
                  <footer className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-[#2a2a30] to-[#17171b] font-serif text-sm tracking-widest text-champagne">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm text-ivory">{t.name}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-muted">{t.title}</p>
                    </div>
                    <div className="ml-auto">
                      <Stars rating={t.rating} delay={0.4} />
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* progress dots */}
            <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="group relative h-6 w-8"
                >
                  <span
                    className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-colors duration-500 ${
                      i === index ? "bg-gold" : "bg-white/15 group-hover:bg-white/35"
                    }`}
                  />
                  {i === index && !paused && (
                    <motion.span
                      key={`progress-${index}`}
                      className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-champagne"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.2, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
