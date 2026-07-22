"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/fx/MagneticButton";
import Particles from "@/components/fx/Particles";
import { MaskLines } from "@/components/fx/Reveal";

const BottleScene = dynamic(() => import("@/components/three/BottleScene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBottle = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="top" className="relative flex h-[100svh] items-center justify-center overflow-hidden" aria-label="Hero">
      {/* ambient moving gradients */}
      <motion.div style={{ scale }} className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(201,168,106,0.10),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,139,58,0.08) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="absolute -left-40 top-1/4 h-[60vmin] w-[60vmin] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(60,70,110,0.12) 0%, transparent 65%)" }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,12,0.4),transparent_25%,transparent_70%,#0a0a0c)]" />
      </motion.div>

      <Particles density={46} />

      {/* 3D bottle */}
      <div className="absolute left-1/2 top-1/2 h-[62vh] w-[80vw] max-w-xl -translate-x-1/2 -translate-y-[52%]">
        <motion.div style={{ y: yBottle, opacity }} className="relative h-full w-full">
          <BottleScene />
          {/* floor reflection glow */}
          <div
            className="absolute -bottom-8 left-1/2 h-16 w-3/5 -translate-x-1/2 rounded-[100%] blur-2xl"
            style={{ background: "radial-gradient(ellipse, rgba(201,168,106,0.22) 0%, transparent 70%)" }}
            aria-hidden
          />
        </motion.div>
      </div>

      {/* copy */}
      <motion.div style={{ y: yText, opacity }} className="pointer-events-none relative z-10 mt-[38vh] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 2.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow pl-[0.5em]"
        >
          Parfums d&apos;Automobile
        </motion.p>
        <MaskLines
          as="h1"
          delay={2.15}
          className="mt-6 font-serif text-[11.5vw] font-light leading-[0.98] tracking-tight text-ivory sm:text-6xl md:text-7xl lg:text-8xl"
          lines={[
            <>Drive the Fragrance</>,
            <>
              of <em className="gold-text not-italic">Luxury</em>
            </>,
          ]}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-md text-sm font-light leading-relaxed text-muted"
        >
          Hand-finished glass. Premium French oils. Sixty days of quiet, cinematic presence, composed for the cabin of your car.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.95, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto mt-10 flex items-center justify-center gap-6"
        >
          <MagneticButton
            onClick={scrollToCollection}
            className="card-sheen group relative overflow-hidden rounded-full border border-gold/40 bg-gold/[0.08] px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-champagne transition-colors duration-700 hover:border-gold/80 hover:bg-gold/[0.16]"
            ariaLabel="Shop now"
          >
            Shop Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted pl-[0.4em]">Scroll</span>
          <div className="h-10 w-px overflow-hidden bg-white/10">
            <motion.div
              className="h-1/2 w-full bg-gold"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
