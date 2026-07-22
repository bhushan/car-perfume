"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/** Animated counter that eases to its value when scrolled into view. */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2200, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
