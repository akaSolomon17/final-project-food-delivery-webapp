import { ICart } from "./carts.type";
import {FoodHistory } from "./foods.type";

export interface IOrder {
    id: string;
    items: ICart[];
    status: 'ordering' | 'ordered';
    estimateTime: number;
}

export interface IOrderStatus{
    [key: string]: {
        status: string;
        startTime: number;
        endTime: number;
    };
}

export interface IHistoryOrders {
    id: string,
    status: 'completed' | 'canceled',
    orders: FoodHistory[]
}