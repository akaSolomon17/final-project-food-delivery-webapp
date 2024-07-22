import { create } from "zustand";
import { Food } from "../types/foods.type";

interface IProductManagementsStore {
  currentFood: Food | null;
  actions: {
    setCurrentFood: (food: Food | null) => void;
  };
}

const useProductManagementsStore = create<IProductManagementsStore>((set) => ({
  currentFood: {} as Food,
  actions: {
    setCurrentFood: (food) => set({ currentFood: food }),
  },
}));

export const useCurrentFood = () =>
  useProductManagementsStore((state) => state.currentFood);

export const useProductManagementsActions = () =>
  useProductManagementsStore((state) => state.actions);
