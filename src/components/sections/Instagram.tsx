"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { instagramPosts } from "@/lib/data";
import { SectionHeading } from "@/components/fx/Reveal";

const luxe = [0.22, 1, 0.36, 1] as const;

export default function Instagram() {
  return (
    <section className="relative py-32 md:py-40" aria-label="Instagram gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="@veloure.parfums"
          lines={[<>The world, through</>, <>our <em className="gold-text not-italic">lens</em></>]}
        />

        <div className="mt-16 columns-2 gap-5 md:columns-3 [&>*]:mb-5">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label={`Instagram post with ${post.likes} likes`}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.9, ease: luxe }}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <div className={`relative w-full ${post.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/45" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-700 group-hover:opacity-100">
                <div className="flex translate-y-3 items-center gap-2 transition-transform duration-700 group-hover:translate-y-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f2eee6">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="text-sm font-light text-ivory">{post.likes}</span>
                </div>
              </div>
              <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f2eee6" strokeWidth="1.6">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#f2eee6" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
