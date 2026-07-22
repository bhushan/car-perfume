"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";
import Particles from "@/components/fx/Particles";

type Layer = "top" | "heart" | "base";

const layers: { key: Layer; label: string; radius: number; duration: number; description: string }[] = [
  { key: "top", label: "Top Notes", radius: 42, duration: 26, description: "The first thirty seconds. Bright, volatile, an introduction at ignition." },
  { key: "heart", label: "Heart Notes", radius: 29, duration: 34, description: "The body of the drive. Emerges within minutes and defines the cabin." },
  { key: "base", label: "Base Notes", radius: 16, duration: 44, description: "The memory. Deep fixative notes that linger for weeks." },
];

export default function ScentNotes() {
  const [productIdx, setProductIdx] = useState(0);
  const [active, setActive] = useState<Layer>("heart");
  const product = products[productIdx];
  const activeLayer = layers.find((l) => l.key === active)!;

  return (
    <section id="experience" className="relative overflow-hidden py-32 md:py-44" aria-label="Fragrance experience">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(201,168,106,0.06),transparent_70%)]" aria-hidden />
      <Particles density={26} />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Fragrance Experience"
          lines={[<>Anatomy of</>, <>an <em className="gold-text not-italic">atmosphere</em></>]}
        />

        {/* fragrance switcher */}
        <Reveal delay={0.25} className="mt-10 flex justify-center">
          <div className="glass flex rounded-full p-1">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setProductIdx(i)}
                aria-pressed={i === productIdx}
                className={`relative rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  i === productIdx ? "text-black" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {i === productIdx && (
                  <motion.span
                    layoutId="scent-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b3905a] to-[#d8c49a]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{p.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">
          {/* radial visualization */}
          <Reveal className="relative mx-auto aspect-square w-full max-w-[480px]">
            <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={`Scent structure of ${product.name}`}>
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor={product.accent} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={product.accent} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="24" fill="url(#coreGlow)">
                <animate attributeName="r" values="22;26;22" dur="5s" repeatCount="indefinite" />
              </circle>

              {layers.map((layer) => (
                <g key={layer.key}>
                  <circle
                    cx="50"
                    cy="50"
                    r={layer.radius}
                    fill="none"
                    stroke={active === layer.key ? product.accent : "rgba(242,238,230,0.12)"}
                    strokeWidth={active === layer.key ? 0.5 : 0.25}
                    strokeDasharray={layer.key === "top" ? "0.5 1.5" : layer.key === "heart" ? "2 1.2" : "none"}
                    className="transition-all duration-700"
                  />
                  {/* orbiting notes */}
                  <g style={{ transformOrigin: "50px 50px", animation: `spin ${layer.duration}s linear infinite` }}>
                    {product.notes[layer.key].map((note, i) => {
                      const angle = (i / product.notes[layer.key].length) * Math.PI * 2;
                      const x = 50 + Math.cos(angle) * layer.radius;
                      const y = 50 + Math.sin(angle) * layer.radius;
                      return (
                        <circle
                          key={note}
                          cx={x}
                          cy={y}
                          r={active === layer.key ? 1.6 : 1}
                          fill={active === layer.key ? product.accent : "rgba(242,238,230,0.4)"}
                          className="transition-all duration-700"
                        />
                      );
                    })}
                  </g>
                </g>
              ))}
              <circle cx="50" cy="50" r="2.5" fill={product.accent} />
            </svg>

            {/* layer hover zones */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden={false}>
              {layers.map((layer) => (
                <button
                  key={layer.key}
                  onMouseEnter={() => setActive(layer.key)}
                  onFocus={() => setActive(layer.key)}
                  onClick={() => setActive(layer.key)}
                  aria-pressed={active === layer.key}
                  aria-label={`${layer.label} of ${product.name}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${layer.radius * 2}%`,
                    height: `${layer.radius * 2}%`,
                  }}
                />
              ))}
            </div>
          </Reveal>

          {/* layer details */}
          <div>
            <div className="flex gap-3">
              {layers.map((layer) => (
                <button
                  key={layer.key}
                  onClick={() => setActive(layer.key)}
                  aria-pressed={active === layer.key}
                  className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.22em] transition-all duration-500 ${
                    active === layer.key
                      ? "border-gold/60 bg-gold/10 text-champagne"
                      : "border-white/10 text-ivory/50 hover:border-white/25 hover:text-ivory"
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${product.id}-${active}`}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <h3 className="font-serif text-4xl font-light text-ivory md:text-5xl">
                  {activeLayer.label.split(" ")[0]} <em className="gold-text not-italic">{activeLayer.label.split(" ")[1]}</em>
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-muted">{activeLayer.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {product.notes[active].map((note, i) => (
                    <motion.span
                      key={note}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="glass rounded-full px-6 py-3 text-sm font-light text-ivory/90"
                      style={{ borderColor: `${product.accent}33` }}
                    >
                      {note}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
