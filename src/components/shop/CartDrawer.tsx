"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useShop, cartCount, cartTotal } from "@/lib/store";

const luxe = [0.22, 1, 0.36, 1] as const;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, lastAdded, clearLastAdded } = useShop();
  const count = useShop(cartCount);
  const total = useShop(cartTotal);

  // auto-dismiss "added" pulse
  useEffect(() => {
    if (!lastAdded) return;
    const id = setTimeout(clearLastAdded, 1600);
    return () => clearTimeout(id);
  }, [lastAdded, clearLastAdded]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  return (
    <>
      {/* sticky floating cart button */}
      <AnimatePresence>
        {count > 0 && !cartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="glass-deep fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(201,168,106,0.3)]"
          >
            <motion.div
              key={lastAdded ?? "cart"}
              animate={lastAdded ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8d5a4" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </motion.div>
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#b3905a] to-[#d8c49a] text-[10px] font-semibold text-black">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              aria-hidden
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: luxe }}
              className="glass-deep fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
            >
              <div className="flex items-center justify-between border-b hairline p-7">
                <div>
                  <h2 className="font-serif text-2xl font-light text-ivory">Your Selection</h2>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted">{count} {count === 1 ? "item" : "items"}</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-ivory/60 transition-colors duration-500 hover:border-white/30 hover:text-ivory"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-7">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="font-serif text-xl font-light italic text-muted">Your selection is empty.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 rounded-full border border-gold/40 px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-champagne transition-colors duration-500 hover:bg-gold/10"
                    >
                      Explore the Collection
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    <AnimatePresence initial={false}>
                      {cart.map(({ product, qty }) => (
                        <motion.li
                          key={product.id}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.5, ease: luxe }}
                          className="flex gap-5"
                        >
                          <div className="glass relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl">
                            <Image src={product.image} alt={product.name} fill sizes="80px" className="object-contain p-2" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-serif text-lg font-light text-ivory">{product.name}</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{product.tagline}</p>
                              </div>
                              <button
                                onClick={() => removeFromCart(product.id)}
                                aria-label={`Remove ${product.name}`}
                                className="text-muted/60 transition-colors duration-300 hover:text-ivory"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-4 rounded-full border border-white/12 px-3 py-1.5">
                                <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity" className="text-muted transition-colors hover:text-ivory">−</button>
                                <span className="w-4 text-center text-sm tabular-nums text-ivory">{qty}</span>
                                <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity" className="text-muted transition-colors hover:text-ivory">+</button>
                              </div>
                              <p className="font-serif text-lg text-champagne">${product.price * qty}</p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t hairline p-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted">Subtotal</p>
                    <p className="font-serif text-2xl font-light text-champagne">${total}</p>
                  </div>
                  <p className="mt-2 text-[11px] font-light text-muted/70">Complimentary shipping & gift wrap included.</p>
                  <button className="card-sheen group mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#b3905a] to-[#d8c49a] py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-black transition-shadow duration-700 hover:shadow-[0_0_45px_rgba(201,168,106,0.45)]">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
