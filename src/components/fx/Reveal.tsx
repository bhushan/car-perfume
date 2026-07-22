"use client";

import { motion, useReducedMotion } from "framer-motion";

const luxe = [0.22, 1, 0.36, 1] as const;

/** Blur-to-focus rise reveal on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease: luxe }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-masked text reveal, each line slides up from an overflow-hidden mask.
 * The viewport trigger lives on the (unclipped) parent and propagates via variants:
 * observing the clipped line itself would never intersect while it sits below the mask.
 */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const reduced = useReducedMotion();
  const lineVariants = {
    hidden: reduced ? {} : { y: "115%", rotate: 2 },
    visible: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 1.15, delay: delay + i * stagger, ease: luxe },
    }),
  };
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {lines.map((line, i) => (
          <span className="mask-line" key={i}>
            <motion.span className={lineClassName} custom={i} variants={lineVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Section eyebrow + headline block used across the page for consistent rhythm. */
export function SectionHeading({
  eyebrow,
  lines,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <Reveal delay={0.05}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <MaskLines
        as="h2"
        lines={lines}
        className="mt-5 font-serif text-4xl font-light leading-[1.08] tracking-tight text-ivory md:text-6xl"
      />
    </div>
  );
}
