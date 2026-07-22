"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, MaskLines } from "@/components/fx/Reveal";
import Particles from "@/components/fx/Particles";
import MagneticButton from "@/components/fx/MagneticButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(valid ? "done" : "error");
  };

  return (
    <section className="relative overflow-hidden py-32 md:py-44" aria-label="Newsletter">
      <Particles density={30} />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <motion.div
          className="h-full w-full rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(201,168,106,0.09) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow">The Private List</p>
        </Reveal>
        <MaskLines
          as="h2"
          className="mt-6 font-serif text-4xl font-light leading-[1.08] tracking-tight text-ivory md:text-6xl"
          lines={[<>First to every</>, <>new <em className="gold-text not-italic">composition</em></>]}
        />
        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-muted">
            Limited releases, atelier notes, and early access. One considered email a month, nothing more.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-12">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass mx-auto max-w-md rounded-full px-8 py-5"
            >
              <p className="text-sm font-light text-champagne">Welcome to the list. Your first note arrives soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] p-2 backdrop-blur-xl transition-colors duration-700 focus-within:border-gold/50" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="your@email.com"
                className="w-full bg-transparent px-6 py-3 text-sm font-light text-ivory placeholder:text-muted/60 focus:outline-none"
                aria-invalid={status === "error"}
              />
              <MagneticButton
                strength={0.25}
                className="shrink-0 rounded-full bg-gradient-to-r from-[#b3905a] to-[#d8c49a] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black transition-shadow duration-700 hover:shadow-[0_0_35px_rgba(201,168,106,0.4)]"
                ariaLabel="Subscribe"
              >
                Join
              </MagneticButton>
            </form>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-xs text-[#c98570]" role="alert">
              Please enter a valid email address.
            </motion.p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
