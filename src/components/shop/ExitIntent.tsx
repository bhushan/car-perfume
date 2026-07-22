"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const luxe = [0.22, 1, 0.36, 1] as const;

/** Exit-intent offer, fires once per session when the cursor leaves the viewport top. */
export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (fired) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !fired) {
        setFired(true);
        setShow(true);
      }
    };
    const timer = setTimeout(() => document.addEventListener("mouseleave", onLeave), 12000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [fired]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
            aria-hidden
          />
          <div className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, y: 30, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: luxe }}
              className="glass-deep pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[2rem] p-10 text-center"
              role="dialog"
              aria-modal="true"
              aria-label="Special offer"
            >
              <div
                className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(201,168,106,0.25), transparent 70%)" }}
                aria-hidden
              />
              <button
                onClick={() => setShow(false)}
                aria-label="Close offer"
                className="absolute right-5 top-5 text-ivory/50 transition-colors hover:text-ivory"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <p className="eyebrow">Before you go</p>
              <h3 className="mt-4 font-serif text-3xl font-light text-ivory">
                Your first drive,<br />
                <em className="gold-text not-italic">10% lighter</em>
              </h3>
              <p className="mx-auto mt-4 max-w-xs text-[13px] font-light leading-relaxed text-muted">
                Join the private list and receive 10% off your first composition, with complimentary gift wrap.
              </p>
              <button
                onClick={() => {
                  setShow(false);
                  document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="card-sheen mt-8 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#b3905a] to-[#d8c49a] py-4 text-[10px] font-medium uppercase tracking-[0.28em] text-black"
              >
                Claim the Welcome Offer
              </button>
              <button onClick={() => setShow(false)} className="mt-4 text-[11px] font-light text-muted/70 underline-offset-4 transition-colors hover:text-muted hover:underline">
                No thank you, I prefer full price
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
