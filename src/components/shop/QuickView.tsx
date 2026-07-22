"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/lib/store";

const luxe = [0.22, 1, 0.36, 1] as const;

export default function QuickView() {
  const { quickView, setQuickView, addToCart, setCartOpen, toggleWishlist, wishlist } = useShop();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setQuickView(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuickView]);

  const p = quickView;

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            aria-hidden
          />
          <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(8px)" }}
              transition={{ duration: 0.65, ease: luxe }}
              className="glass-deep pointer-events-auto relative grid w-full max-w-3xl gap-0 overflow-hidden rounded-[2rem] md:grid-cols-2"
              role="dialog"
              aria-modal="true"
              aria-label={`${p.name} quick view`}
            >
              <button
                onClick={() => setQuickView(null)}
                aria-label="Close quick view"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/30 text-ivory/70 transition-colors duration-500 hover:text-ivory"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative flex items-center justify-center overflow-hidden p-10 md:p-12">
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${p.glow}, transparent 70%)` }}
                  aria-hidden
                />
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.8, ease: luxe }}
                  className="relative aspect-[3/4] w-full max-w-[240px]"
                >
                  <Image src={p.image} alt={`${p.name} flacon`} fill sizes="240px" className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]" />
                </motion.div>
              </div>

              <div className="flex flex-col p-8 md:p-10">
                <p className="text-[9px] uppercase tracking-[0.32em] text-muted">{p.collection}</p>
                <h3 className="mt-3 font-serif text-4xl font-light text-ivory">{p.name}</h3>
                <p className="mt-1 text-sm italic text-muted">{p.tagline}</p>
                <p className="mt-5 text-[13px] font-light leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 space-y-2.5 border-t hairline pt-6">
                  {(["top", "heart", "base"] as const).map((layer) => (
                    <div key={layer} className="flex items-baseline justify-between gap-4">
                      <span className="text-[9px] uppercase tracking-[0.28em] text-muted">{layer}</span>
                      <span className="text-right text-xs font-light text-ivory/80">{p.notes[layer].join(" · ")}</span>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[9px] uppercase tracking-[0.28em] text-muted">Longevity</span>
                    <span className="text-xs font-light text-champagne">{p.longevity}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-8">
                  <button
                    onClick={() => {
                      addToCart(p);
                      setQuickView(null);
                      setCartOpen(true);
                    }}
                    className="card-sheen flex-1 overflow-hidden rounded-full bg-gradient-to-r from-[#b3905a] to-[#d8c49a] py-3.5 text-[10px] font-medium uppercase tracking-[0.25em] text-black transition-shadow duration-700 hover:shadow-[0_0_35px_rgba(201,168,106,0.4)]"
                  >
                    Add to Cart, ${p.price}
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Toggle wishlist"
                    aria-pressed={wishlist.includes(p.id)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-500 hover:border-gold/50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? "#c9a86a" : "none"} stroke={wishlist.includes(p.id) ? "#c9a86a" : "#f2eee6"} strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
