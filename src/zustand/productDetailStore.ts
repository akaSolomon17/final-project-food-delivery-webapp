import { create } from "zustand";

interface IProductDetailStore {
  quantity: number;
  actions: {
    setQuantity: (quantity: number) => void;
  };
}

const useProductDetailStore = create<IProductDetailStore>((set) => ({
  quantity: 1,
  actions: {
    setQuantity: (quantity) => set({ quantity }),
  },
}));

export const useQuantity = () =>
  useProductDetailStore((state) => state.quantity);
export const useProductDetailsActions = () =>
  useProductDetailStore((state) => state.actions);
