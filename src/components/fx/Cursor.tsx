"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Custom cursor: gold dot + trailing ring + large ambient glow following the pointer. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    return () => document.body.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const glow = glowRef.current!;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const xGlow = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const yGlow = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
      xGlow(e.clientX); yGlow(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [role='button'], input, [data-cursor='hover']");
      gsap.to(ring, { scale: t ? 2.2 : 1, opacity: t ? 0.9 : 0.45, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: t ? 0.4 : 1, duration: 0.35 });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[5] -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,168,106,0.05) 0%, transparent 60%)" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-4 -mt-4 h-8 w-8 rounded-full border border-[#c9a86a]/60 opacity-45"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#e8d5a4]"
        aria-hidden
      />
    </>
  );
}
