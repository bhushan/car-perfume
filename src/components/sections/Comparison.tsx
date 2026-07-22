"use client";

import { motion } from "framer-motion";
import { comparison } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";

const luxe = [0.22, 1, 0.36, 1] as const;

export default function Comparison() {
  return (
    <section className="relative py-32 md:py-40" aria-label="Product comparison">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="No Comparison"
          lines={[<>This is not an</>, <>air <em className="gold-text not-italic">freshener</em></>]}
        />

        <Reveal delay={0.2} className="mt-16">
          <div className="glass-deep overflow-hidden rounded-[2rem]">
            {/* header */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b hairline">
              <div className="p-6 md:p-8" />
              <div className="relative border-l hairline p-6 text-center md:p-8">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.09] to-transparent" aria-hidden />
                <p className="relative font-serif text-lg tracking-[0.25em] text-champagne md:text-xl">VELOURE</p>
              </div>
              <div className="border-l hairline p-6 text-center md:p-8">
                <p className="text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted">Ordinary<br />Freshener</p>
              </div>
            </div>

            {comparison.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: luxe }}
                className="group grid grid-cols-[1.2fr_1fr_1fr] border-b hairline last:border-b-0"
              >
                <div className="p-5 md:p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 md:text-xs">{row.feature}</p>
                </div>
                <div className="relative border-l hairline p-5 text-center md:p-6">
                  <div className="absolute inset-0 bg-gold/[0.04] transition-colors duration-500 group-hover:bg-gold/[0.09]" aria-hidden />
                  <div className="relative flex items-center justify-center gap-2">
                    <motion.svg
                      initial={{ scale: 0, rotate: -60 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: luxe }}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c9a86a"
                      strokeWidth="2.2"
                      className="shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </motion.svg>
                    <p className="text-xs font-light text-champagne md:text-[13px]">{row.veloure}</p>
                  </div>
                </div>
                <div className="border-l hairline p-5 text-center md:p-6">
                  <p className="text-xs font-light text-muted/70 md:text-[13px]">{row.ordinary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
