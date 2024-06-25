import { create } from "zustand";
import { ICart } from "../types/carts.type";

export interface CartStore {
  cart: ICart[];
  actions: {
    setCart: (item: ICart) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  }
}

const store = create<CartStore>((set) => ({
  cart: [],
  actions: {
    setCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    clearCart: () => set({ cart: [] }),
  },
}));

export const useCart = () => store((state) => state.cart);
export const useGlobalActions = () => store((state) => state.actions);
