import { create } from "zustand";

interface IFilterStore {
    filterValue: number[] ;
    selectedCheckboxes: string[] | undefined;
    selectedRating: string;
    isApplyingFilters: boolean;
    actions: {
        setFilterValue: (filterValue: number[] | undefined) => void;
        setSelectedCheckboxes: (selectedCheckboxes: string[] | undefined) => void;
        setSelectedRating: (selectedRating: string) => void;
        setApplyingFilters: (isApplyingFilters: boolean) => void;
    }
}

const useFilterStore = create<IFilterStore>((set) => ({
    filterValue: [30000, 300000],
    selectedCheckboxes: [],
    selectedRating: '0',
    isApplyingFilters: false,
    actions: {
        setFilterValue: (filterValue) => set({ filterValue }),
        setSelectedCheckboxes: (selectedCheckboxes) => set({ selectedCheckboxes }),
        setSelectedRating: (selectedRating) => set({ selectedRating }),
        setApplyingFilters: (isApplyingFilters) => set({ isApplyingFilters })
    }
}));

export const useFilterValue = () => useFilterStore((state) => state.filterValue);
export const useSelectedCheckboxes = () => useFilterStore((state) => state.selectedCheckboxes);
export const useSelectedRating = () => useFilterStore((state) => state.selectedRating);
export const useIsApplyingFilters = () => useFilterStore((state) => state.isApplyingFilters);
// ACTIONS
export const useFilterActions = () => useFilterStore((state) => state.actions);
