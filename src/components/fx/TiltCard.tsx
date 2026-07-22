"use client";

import { useRef } from "react";
import gsap from "gsap";

/** 3D perspective tilt on hover with light-source tracking. */
export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(lightRef.current, {
      opacity: 1,
      x: `${px * 100}%`,
      y: `${py * 100}%`,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
    gsap.to(lightRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative h-full w-full will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
        <div
          ref={lightRef}
          className="pointer-events-none absolute left-0 top-0 -ml-32 -mt-32 h-64 w-64 rounded-full opacity-0"
          style={{ background: "radial-gradient(circle, rgba(232,213,164,0.08) 0%, transparent 65%)" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
