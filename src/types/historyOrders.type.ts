import { ICart } from "./carts.type";
import { EOrderStatus } from "./enums.type";

export interface IOrder {
  id: string;
  items: ICart[];
  status: "ordering" | "ordered";
  estimateTime: number;
}

export interface IOrderStatus {
  [key: string]: {
    status: string;
    startTime: number;
    endTime: number;
  };
}

export interface IOrderDetails {
  id: string;
  title: string;
  priceNumber: string;
  quantity: string;
}

export interface IHistoryOrders {
  id: string;
  status:
    | EOrderStatus.COMPLETED
    | EOrderStatus.DELIVERING
    | EOrderStatus.CANCELED;
  orderDate: number;
  totalPrice: number;
  discountPrice?: number;
  note?: string;
  orderDetails: IOrderDetails[];
}
