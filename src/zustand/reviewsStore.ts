import { create } from "zustand";
import { Key } from "react";
import { Feedback } from "../types/feedbacks.type";

interface IReviewsStore {
    dataFeedbacks: Feedback[],
    selectedKeys: string | Set<Key> | Selection,
    page: number,
    actions: {
        setDataFeedbacks: (dataFeedbacks: Feedback[]) => void
        setSelectedKeys: (selectedKeys: string | Set<Key>) => void
        setPage: (page: number) => void
    }
}


export const useReviewsStore = create<IReviewsStore>((set) => ({
    dataFeedbacks: [],
    selectedKeys: new Set(),
    page: 1,
    actions: {
        setDataFeedbacks: (dataFeedbacks) => set({ dataFeedbacks }),
        setSelectedKeys: (selectedKeys) => set({ selectedKeys }),
        setPage: (page) => set({ page })
    }
}));

export const useSelectedKeys = () => useReviewsStore((state) => state.selectedKeys);
export const useDataFeedbacks = () => useReviewsStore((state) => state.dataFeedbacks);
export const usePage = () => useReviewsStore((state) => state.page)

// ACTIONS
export const useReviewsActions = () => useReviewsStore((state) => state.actions);
