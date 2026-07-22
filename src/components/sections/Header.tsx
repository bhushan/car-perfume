"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShop, cartCount } from "@/lib/store";

const links = ["Collection", "Experience", "Journal", "Atelier"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const count = useShop(cartCount);
  const wishlist = useShop((s) => s.wishlist);
  const setCartOpen = useShop((s) => s.setCartOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-deep py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <nav className="hidden flex-1 items-center gap-8 md:flex" aria-label="Primary">
          {links.slice(0, 2).map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative text-[11px] uppercase tracking-[0.28em] text-ivory/70 transition-colors duration-500 hover:text-ivory"
            >
              {l}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a href="#top" className="font-serif text-xl tracking-[0.35em] text-ivory pl-[0.35em]" aria-label="Veloure home">
          VELOURE
        </a>

        <div className="flex flex-1 items-center justify-end gap-6">
          <button className="relative hidden text-ivory/70 transition-colors duration-500 hover:text-ivory md:block" aria-label={`Wishlist, ${wishlist.length} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length ? "#c9a86a" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-black">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-ivory/70 transition-colors duration-500 hover:text-ivory"
            aria-label={`Open cart, ${count} items`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-black"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
