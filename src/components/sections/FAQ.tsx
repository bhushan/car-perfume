"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";

const luxe = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-32 md:py-40" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading eyebrow="Questions" lines={[<>Considered <em className="gold-text not-italic">answers</em></>]} />

        <div className="mt-16">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.06} y={30}>
                <div className="border-b hairline">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={`font-serif text-xl font-light transition-colors duration-500 md:text-2xl ${
                        isOpen ? "text-champagne" : "text-ivory/85 group-hover:text-ivory"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: luxe }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                        isOpen ? "border-gold/60 text-gold" : "border-white/15 text-ivory/50 group-hover:border-white/35"
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: luxe }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-8 text-sm font-light leading-relaxed text-muted">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
