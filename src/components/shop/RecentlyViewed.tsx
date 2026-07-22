"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data";
import { useShop } from "@/lib/store";

const luxe = [0.22, 1, 0.36, 1] as const;

/** Slim recently-viewed rail that appears once the visitor has opened a quick view. */
export default function RecentlyViewed() {
  const recentlyViewed = useShop((s) => s.recentlyViewed);
  const setQuickView = useShop((s) => s.setQuickView);
  const items = recentlyViewed.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.8, ease: luxe }}
          aria-label="Recently viewed"
          className="overflow-hidden border-t hairline"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-6 py-10 lg:px-10">
            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-muted">Recently<br />Viewed</p>
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => setQuickView(p)}
                className="group flex shrink-0 items-center gap-4 rounded-2xl border border-transparent p-2 pr-5 transition-colors duration-500 hover:border-white/10 hover:bg-white/[0.03]"
                aria-label={`Quick view ${p.name}`}
              >
                <div className="glass relative h-16 w-12 overflow-hidden rounded-xl">
                  <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                </div>
                <div className="text-left">
                  <p className="font-serif text-base font-light text-ivory/90 transition-colors group-hover:text-ivory">{p.name}</p>
                  <p className="text-xs font-light text-champagne">${p.price}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
