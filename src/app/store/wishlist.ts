'use client';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number | string;
  name: string;
  price: number;
};

type WishlistState = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number | string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) {
          toast(`"${item.name}" is already in your wishlist.`, {
            icon: '💖',
            position: 'top-right',
          });
          return;
        }
        toast.success(`Added "${item.name}" to wishlist!`, {
          position: 'top-right',
          duration: 2000,
        });
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
