"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lifestyleImages } from "@/lib/data";
import { Reveal } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** Pinned horizontal editorial gallery with per-image parallax and velocity skew. */
export default function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const total = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${total}`,
          scrub: reduced ? false : 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // parallax inside each frame
      track.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          }
        );
      });

      // velocity-based skew
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(track, "skewX", "deg");
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-4, 4, self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" aria-label="Lifestyle gallery">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="mx-auto mb-10 w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">The Drive</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-ivory md:text-6xl">
              Scenes from the <em className="gold-text not-italic">road</em>
            </h2>
          </Reveal>
        </div>

        <div ref={trackRef} className="flex gap-6 pl-6 will-change-transform md:flex-nowrap md:pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))] max-md:flex-col max-md:pr-6">
          {lifestyleImages.map((img, i) => (
            <figure
              key={img.src}
              className={`group relative shrink-0 overflow-hidden rounded-[1.75rem] max-md:!h-[46vh] max-md:w-full ${
                i % 2 === 0 ? "md:h-[58vh] md:w-[44vw]" : "md:mt-14 md:h-[48vh] md:w-[34vw]"
              }`}
            >
              <div data-parallax className="absolute inset-[-10%]">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 44vw"
                  className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden />
              <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" aria-hidden />
              <figcaption className="absolute bottom-6 left-7">
                <span className="text-[9px] uppercase tracking-[0.35em] text-gold">0{i + 1}</span>
                <p className="mt-1 font-serif text-2xl font-light italic text-ivory/95">{img.caption}</p>
              </figcaption>
            </figure>
          ))}

          <div className="flex shrink-0 items-center max-md:hidden md:w-[26vw]">
            <p className="max-w-[16ch] font-serif text-3xl font-light italic leading-snug text-muted">
              Every mile deserves an atmosphere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
