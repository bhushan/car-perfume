"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
};

/** Button that magnetically pulls toward the cursor, with inner label counter-drift. */
export default function MagneticButton({ children, className = "", strength = 0.35, onClick, ariaLabel }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const btn = btnRef.current!;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
      gsap.to(innerRef.current, { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.4, ease: "power3.out" });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <button
      ref={btnRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-3">
        {children}
      </span>
    </button>
  );
}
