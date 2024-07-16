import { create } from "zustand";
import { ICart, IQuantities } from "../types/carts.type";

export interface CartStore {
  cart: ICart[];
  quantities: IQuantities;
  totalPrice: number;
  discountInfo: { priceReduce: number; totalPriceDiscount: number; }
  isVoucherApplied: boolean;
  cartExpand: boolean;
  note: string;
  cartDistance: string;
  cartTimeArrival: number;
  actions: {
    setCart: (item: ICart[]) => void;
    setQuantities: (quantities: IQuantities) => void;
    setTotalPrice: (totalPrice: number) => void;
    setDiscountInfo: (discountInfo: { priceReduce: number; totalPriceDiscount: number; }) => void;
    setIsAppliedVoucher: (isVoucherApplied: boolean) => void;
    loadFromLocalStorage: () => void;
    setCartExpand: (cartExpand: boolean) => void;
    setNote: (note: string) => void;
    setCartDistance: (cartDistance: string) => void;
    setCartTimeArrival: (cartTimeArrival: number) => void;
  }
}

const cartStore = create<CartStore>((set) => ({
  cart: [],
  quantities: {},
  totalPrice: 0,
  discountInfo: { priceReduce: 0, totalPriceDiscount: 0 },
  isVoucherApplied: false,
  cartExpand: false,
  note: '',
  cartDistance: '',
  cartTimeArrival: 0,
  actions: {
    setCart: (cart) => {
      set({cart});
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    setQuantities: (quantities) => set({ quantities }),
    setTotalPrice: (totalPrice) => set({ totalPrice }),
    setDiscountInfo: (discountInfo) => {
      set({ discountInfo })
      localStorage.setItem('discountInfo', JSON.stringify(discountInfo));
    },
    setIsAppliedVoucher: (isVoucherApplied) => {
      set({ isVoucherApplied })
      localStorage.setItem('isVoucherApplied', JSON.stringify(isVoucherApplied));
    },
    loadFromLocalStorage: () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const discountInfo = JSON.parse(localStorage.getItem('discountInfo') || '{"priceReduce": 0, "totalPriceDiscount": 0}');
      const isVoucherApplied = JSON.parse(localStorage.getItem('isVoucherApplied') || 'false');
      set({ cart, discountInfo, isVoucherApplied });
    },
    setCartExpand: (cartExpand) => set({ cartExpand }),
    setNote: (note) => set({ note }),
    setCartDistance: (cartDistance) => set({ cartDistance }),
    setCartTimeArrival: (cartTimeArrival) => set({ cartTimeArrival }),
  },
}));

export const useCart = () => cartStore((state) => state.cart);
export const useQuantities = () => cartStore(state => state.quantities);
export const useTotalPrice = () => cartStore(state => state.totalPrice);
export const useDiscountInfo = () => cartStore(state => state.discountInfo);
export const useIsVoucherApplied = () => cartStore(state => state.isVoucherApplied);
export const useCartExpand = () => cartStore(state => state.cartExpand);
export const useNote = () => cartStore(state => state.note);
export const useCartDistance = () => cartStore(state => state.cartDistance);
export const useCartTimeArrival = () => cartStore(state => state.cartTimeArrival);
// ACTIONS
export const useCartActions = () => cartStore((state) => state.actions);
