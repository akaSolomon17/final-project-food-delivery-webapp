import { create } from "zustand";
import { EOrderStatus } from "../types/enums.type";

interface IFilterStore {
    OrderStatus: EOrderStatus;
    actions: {
        setOrderStatus: (OrderStatus: EOrderStatus) => void;
    }
}

const useFilterStore = create<IFilterStore>((set) => ({
    OrderStatus: EOrderStatus.ALL,
    actions: {
        setOrderStatus: (OrderStatus) => set({ OrderStatus }),
    }
}));

export const useOrderStatus = () => useFilterStore((state) => state.OrderStatus);
// ACTIONS
export const useFilterActions = () => useFilterStore((state) => state.actions);
