export type Product = {
  id: string;
  name: string;
  collection: string;
  price: number;
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  accent: string;
  glow: string;
  image: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  longevity: string;
};

export const products: Product[] = [
  {
    id: "noir-oud",
    name: "Noir Oud",
    collection: "Signature Collection",
    price: 145,
    rating: 4.9,
    reviews: 412,
    tagline: "Midnight in motion",
    description:
      "Smoked oud wrapped in black amber and cedar. Composed for the long night drive. Assertive at ignition, velvet by the third mile.",
    accent: "#c9a86a",
    glow: "rgba(201,168,106,0.35)",
    image: "/images/product-noir.png",
    notes: {
      top: ["Black Pepper", "Bergamot Noir"],
      heart: ["Smoked Oud", "Leather Accord"],
      base: ["Black Amber", "Cedarwood"],
    },
    longevity: "60 days",
  },
  {
    id: "santal-route",
    name: "Santal Route",
    collection: "Signature Collection",
    price: 115,
    rating: 4.8,
    reviews: 367,
    tagline: "The coastal ascent",
    description:
      "Creamy Australian sandalwood lifted by bergamot and white musk. Weightless, clean, quietly expensive. A morning coastline in glass.",
    accent: "#d8c49a",
    glow: "rgba(216,196,154,0.32)",
    image: "/images/product-santal.png",
    notes: {
      top: ["Bergamot", "Sea Salt"],
      heart: ["Australian Sandalwood", "Iris"],
      base: ["White Musk", "Tonka Bean"],
    },
    longevity: "55 days",
  },
  {
    id: "ambre-meridien",
    name: "Ambre Méridien",
    collection: "Signature Collection",
    price: 125,
    rating: 4.9,
    reviews: 389,
    tagline: "Golden hour, preserved",
    description:
      "Saffron-laced amber over bourbon vanilla. Warm, low, unhurried. The exact temperature of a sunset held at speed.",
    accent: "#d9a05b",
    glow: "rgba(217,160,91,0.35)",
    image: "/images/product-ambre.png",
    notes: {
      top: ["Saffron", "Pink Pepper"],
      heart: ["Golden Amber", "Rose Absolute"],
      base: ["Bourbon Vanilla", "Labdanum"],
    },
    longevity: "60 days",
  },
];

export const testimonials = [
  {
    name: "Arjun Mehta",
    title: "Porsche 911 Carrera",
    quote:
      "The first fragrance that matches the interior of the car. Guests ask about it before they ask about the engine.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Sophie Laurent",
    title: "Range Rover Autobiography",
    quote:
      "Subtle in the best way. It doesn't announce itself. It just makes every drive feel considered.",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Daniel Okafor",
    title: "BMW M5 Competition",
    quote:
      "Two months in and Noir Oud still opens exactly like day one. Nothing else I've tried lasted past week two.",
    rating: 5,
    initials: "DO",
  },
  {
    name: "Isabella Rossi",
    title: "Mercedes-AMG GT",
    quote:
      "Veloure understood something obvious that no one else did: a beautiful car deserves a beautiful atmosphere.",
    rating: 5,
    initials: "IR",
  },
  {
    name: "Rahul Kapoor",
    title: "Audi RS7 Sportback",
    quote:
      "Bought Santal Route as a gift, kept it for myself, ordered two more. The packaging alone justifies the price.",
    rating: 4,
    initials: "RK",
  },
];

export const comparison = [
  { feature: "Fragrance oils", veloure: "Premium French perfume oils", ordinary: "Synthetic air freshener blend" },
  { feature: "Longevity", veloure: "Up to 60 days", ordinary: "5–7 days" },
  { feature: "Scent evolution", veloure: "Top, heart & base notes", ordinary: "Single flat note" },
  { feature: "Vessel", veloure: "Hand-finished glass & alloy", ordinary: "Printed cardboard / plastic" },
  { feature: "Interior safety", veloure: "Leather & trim safe, IFRA compliant", ordinary: "May stain or off-gas" },
  { feature: "Intensity control", veloure: "Adjustable diffusion", ordinary: "None" },
];

export const faqs = [
  {
    q: "How long does one bottle last?",
    a: "Each Veloure vessel diffuses for 55–60 days at medium intensity. The adjustable cap lets you slow diffusion for a subtler presence, extending life well beyond two months.",
  },
  {
    q: "Is it safe for leather and interior trim?",
    a: "Yes. Every formula is IFRA-compliant and tested against leather, Alcantara, piano-black trim and open-pore wood. The sealed glass vessel never contacts your surfaces.",
  },
  {
    q: "How strong is the scent?",
    a: "Veloure is composed like a fine parfum, not an air freshener. It reads as an atmosphere rather than a smell, present at ignition, never overwhelming at speed.",
  },
  {
    q: "How does it attach to my car?",
    a: "A weighted alloy base sits in any cup holder or console tray, with an optional low-profile vent mount included. No adhesives, no clips on your dashboard.",
  },
  {
    q: "Do you offer refills?",
    a: "Yes. Refill amphoules are available for every fragrance at 40% of the original price. The glass vessel is designed to last for years.",
  },
  {
    q: "What is your return policy?",
    a: "30-day returns, no questions. If a fragrance doesn't suit your interior, return it, even opened, for a full refund or exchange.",
  },
];

export const instagramPosts = [
  { id: 1, image: "/images/insta-1.png", likes: "12.4k", tall: true },
  { id: 2, image: "/images/insta-2.png", likes: "9.8k", tall: false },
  { id: 3, image: "/images/insta-3.png", likes: "15.2k", tall: false },
  { id: 4, image: "/images/insta-4.png", likes: "11.1k", tall: true },
  { id: 5, image: "/images/insta-5.png", likes: "8.7k", tall: false },
  { id: 6, image: "/images/insta-6.png", likes: "13.9k", tall: false },
];

export const lifestyleImages = [
  { src: "/images/lifestyle-1.png", caption: "The Night Route" },
  { src: "/images/lifestyle-2.png", caption: "Cabin, Composed" },
  { src: "/images/lifestyle-3.png", caption: "Golden Meridian" },
  { src: "/images/lifestyle-4.png", caption: "Coastal Santal" },
];
