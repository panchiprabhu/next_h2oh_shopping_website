'use client';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number | string;
  name: string;
  price: number;
  quantity?: number;
};

type CartState = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number | string) => void;
  increaseQuantity: (id: number | string) => void;
  decreaseQuantity: (id: number | string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          toast.success(`${item.name} added to cart!`, {
            position: 'top-right',
            duration: 2000,
          });
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: (i.quantity || 1) + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: (item.quantity || 1) - 1 }
                : item
            )
            .filter((item) => (item.quantity ?? 1) > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', 
    }
  )
);
