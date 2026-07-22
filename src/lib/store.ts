"use client";

import { create } from "zustand";
import type { Product } from "./data";

export type CartItem = { product: Product; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  quickView: Product | null;
  recentlyViewed: string[];
  lastAdded: string | null;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  setQuickView: (p: Product | null) => void;
  viewProduct: (id: string) => void;
  clearLastAdded: () => void;
};

export const useShop = create<ShopState>((set) => ({
  cart: [],
  wishlist: [],
  cartOpen: false,
  quickView: null,
  recentlyViewed: [],
  lastAdded: null,
  addToCart: (p) =>
    set((s) => {
      const existing = s.cart.find((i) => i.product.id === p.id);
      const cart = existing
        ? s.cart.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...s.cart, { product: p, qty: 1 }];
      return { cart, lastAdded: p.id };
    }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i.product.id !== id) })),
  setQty: (id, qty) =>
    set((s) => ({
      cart:
        qty <= 0
          ? s.cart.filter((i) => i.product.id !== id)
          : s.cart.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    })),
  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    })),
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setQuickView: (quickView) =>
    set((s) => ({
      quickView,
      recentlyViewed: quickView
        ? [quickView.id, ...s.recentlyViewed.filter((r) => r !== quickView.id)].slice(0, 4)
        : s.recentlyViewed,
    })),
  viewProduct: (id) =>
    set((s) => ({
      recentlyViewed: [id, ...s.recentlyViewed.filter((r) => r !== id)].slice(0, 4),
    })),
  clearLastAdded: () => set({ lastAdded: null }),
}));

export const cartCount = (s: { cart: CartItem[] }) => s.cart.reduce((n, i) => n + i.qty, 0);
export const cartTotal = (s: { cart: CartItem[] }) =>
  s.cart.reduce((n, i) => n + i.qty * i.product.price, 0);
