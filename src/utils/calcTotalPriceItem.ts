import { IQuantities } from "../types/carts.type";
import { formatCurrency } from "./formatCurrency";

export const calcTotalPriceEachItem = (
  quantities: IQuantities,
  price: number,
  id: string,
) => {
  let totalPrice = 0;
  if (quantities[id]) {
    totalPrice = price * quantities[id];
  }
  return formatCurrency(totalPrice);
};
