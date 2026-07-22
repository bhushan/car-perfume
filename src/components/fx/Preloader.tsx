"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t >= 1) {
        setTimeout(() => setDone(true), 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const failsafe = setTimeout(() => setDone(true), 4000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0c]"
          exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl tracking-[0.35em] gold-text pl-[0.35em]"
          >
            VELOURE
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-[10px] uppercase tracking-[0.5em] text-muted pl-[0.5em]"
          >
            Parfums d&apos;Automobile
          </motion.p>
          <div className="mt-12 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#b3905a] via-[#e8d5a4] to-[#c9a86a]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="mt-4 text-[10px] tracking-[0.3em] text-muted tabular-nums">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
