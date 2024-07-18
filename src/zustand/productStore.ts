import { create } from "zustand";
import { IHistoryOrders } from "../types/historyOrders.type";

interface IProductStore {
  page: number;
  orderDetail: IHistoryOrders;
  actions: {
    setPage: (page: number) => void;
    setOrderDetail: (orderDetail: IHistoryOrders) => void;
  };
}

const useProductStore = create<IProductStore>((set) => ({
  page: 1,
  orderDetail: {} as IHistoryOrders,
  actions: {
    setPage: (page) => set({ page }),
    setOrderDetail: (orderDetail) => set({ orderDetail }),
  },
}));

export const usePage = () => useProductStore((state) => state.page);
export const useOrderDetail = () =>
  useProductStore((state) => state.orderDetail);
// ACTIONS
export const useProductActions = () =>
  useProductStore((state) => state.actions);
