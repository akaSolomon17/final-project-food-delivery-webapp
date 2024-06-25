// import { create } from "zustand";

// interface DropdownFilterStore {
//     filterValue: number[];
//     selectedCheckboxes: string[];
//     selectedRating: string;
//     applyingFilters: boolean;
//     actions: {
//         setFilterValue: (value: number[]) => void;
//         setSelectedCheckboxes: (value: string[]) => void;
//         setSelectedRating: (value: string) => void;
//         setApplyingFilters: (value: boolean) => void;
//         handlePriceChange: (value: number | number[]) => void;
//         handleCheckboxChange: (value: string[]) => void;
//         handleRadioChange: (value: string) => void;
//         handleApplyFilters: () => void;
//     }
// }

// const useDropdownFilterStore = create<DropdownFilterStore>((set) => ({
//     filterValue: [30000, 300000],
//     selectedCheckboxes: [],
//     selectedRating: '0',
//     applyingFilters: false,
//     actions: {
//         setFilterValue: (value) => set({ filterValue: value }),
//         setSelectedCheckboxes: (value) => set({ selectedCheckboxes: value }),
//         setSelectedRating: (value) => set({ selectedRating: value }),
//         setApplyingFilters: (value) => set({ applyingFilters: value }),
//         handlePriceChange: (value) => {
//             if (Array.isArray(value)) {
//                 set({ filterValue: value });
//             }
//         },
//         handleCheckboxChange: (value) => set({ selectedCheckboxes: value }),
//         handleRadioChange: (value) => set({ selectedRating: value }),
//         handleApplyFilters: () => {
//             set({ applyingFilters: true });
//             // Thực hiện gọi API hoặc hook ở đây
//             // Sử dụng useGetFoodFiltered khi áp dụng filter
//         },
//     }
// }));

// // VARIABLES
// export const useFilterValue = () => useDropdownFilterStore((state) => state.filterValue);
// export const useSelectedCheckboxes = () => useDropdownFilterStore((state) => state.selectedCheckboxes);
// export const useSelectedRating = () => useDropdownFilterStore((state) => state.selectedRating);
// export const useApplyingFilters = () => useDropdownFilterStore((state) => state.applyingFilters);

// // ACTIONS
// export const useGlobalActionsFiltered = () => useDropdownFilterStore((state) => state.actions);