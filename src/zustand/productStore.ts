import { Key } from "react";
import {create} from "zustand";
import { Food } from "../types/foods.type";

interface IProductStore {
    dataFoodList: Food[];
    selectedKeys: string | Set<Key> | Selection;
    page: number;
    actions: {
        setDataFoodList: (dataFoodList: Food[]) => void;
        setPage: (page: number) => void;
        setSelectedKeys: (selectedKeys: string | Set<Key>) => void;
    }
}

const useProductStore = create<IProductStore>((set) => ({
    dataFoodList: [],
    selectedKeys: new Set<string>(),
    page: 1,
    actions: {
        setDataFoodList: (dataFoodList) => set({ dataFoodList }),
        setPage: (page) => set({ page }),
        setSelectedKeys: (selectedKeys) => set({ selectedKeys })
    }
}))

export const useDataFoodList = () => useProductStore((state) => state.dataFoodList);
export const usePage = () => useProductStore((state) => state.page);
export const useSelectedKeys = () => useProductStore((state) => state.selectedKeys);

// ACTIONS
export const useProductActions = () => useProductStore((state) => state.actions);