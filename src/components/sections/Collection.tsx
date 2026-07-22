"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products, type Product } from "@/lib/data";
import { useShop } from "@/lib/store";
import TiltCard from "@/components/fx/TiltCard";
import { Reveal, SectionHeading } from "@/components/fx/Reveal";

function Stars({ rating, accent }: { rating: number; accent: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: i < Math.round(rating) ? 1 : 0.25, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={accent}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </span>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addToCart = useShop((s) => s.addToCart);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const setQuickView = useShop((s) => s.setQuickView);
  const toggleWishlist = useShop((s) => s.toggleWishlist);
  const wishlist = useShop((s) => s.wishlist);
  const wished = wishlist.includes(product.id);

  return (
    <Reveal delay={index * 0.15} y={60}>
      <TiltCard className="h-full">
        <article className="glass card-sheen group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 transition-colors duration-700 hover:border-white/[0.14]">
          {/* per-product ambient glow */}
          <div
            className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-1000 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle, ${product.glow}, transparent 70%)` }}
            aria-hidden
          />

          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wished}
            className="absolute right-6 top-6 z-20 text-ivory/40 transition-all duration-500 hover:scale-110 hover:text-gold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "#c9a86a" : "none"} stroke={wished ? "#c9a86a" : "currentColor"} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* bottle render, rotates & lifts on hover */}
          <button
            onClick={() => setQuickView(product)}
            className="relative mx-auto block aspect-[3/4] w-3/4"
            aria-label={`Quick view ${product.name}`}
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="absolute inset-0 transition-all duration-1000 ease-luxe [transform-style:preserve-3d] group-hover:[transform:rotateY(14deg)_translateY(-10px)]">
              <Image
                src={product.image}
                alt={`${product.name} flacon`}
                fill
                sizes="(max-width: 768px) 70vw, 300px"
                className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div
              className="absolute -bottom-2 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[100%] blur-xl transition-all duration-1000 group-hover:w-1/2 group-hover:opacity-70"
              style={{ background: product.glow }}
              aria-hidden
            />
          </button>

          <div className="relative z-10 mt-8 flex flex-1 flex-col" style={{ transform: "translateZ(24px)" }}>
            <div className="flex items-baseline justify-between">
              <p className="text-[9px] uppercase tracking-[0.32em] text-muted">{product.collection}</p>
              <Stars rating={product.rating} accent={product.accent} />
            </div>
            <h3 className="mt-3 font-serif text-3xl font-light text-ivory">{product.name}</h3>
            <p className="mt-1 text-xs italic text-muted">{product.tagline}</p>
            <p className="mt-4 line-clamp-2 text-[13px] font-light leading-relaxed text-muted">{product.description}</p>

            <div className="mt-auto flex items-center justify-between pt-8">
              <p className="font-serif text-2xl font-light text-champagne">${product.price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                  setCartOpen(true);
                }}
                className="rounded-full border border-white/15 px-6 py-2.5 text-[10px] uppercase tracking-[0.24em] text-ivory/80 transition-all duration-500 hover:border-gold/60 hover:bg-gold/10 hover:text-champagne"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="relative py-32 md:py-40" aria-label="Signature collection">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Signature Collection"
          lines={[<>Three compositions.</>, <>One <em className="gold-text not-italic">philosophy</em>.</>]}
        />
        <Reveal delay={0.3} className="mx-auto mt-6 max-w-lg text-center">
          <p className="text-sm font-light leading-relaxed text-muted">
            Each fragrance is composed like a fine parfum, top, heart and base, then tuned for the acoustics of a moving cabin.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
