import { useRef } from "react";
import { EOrderStatus } from "../types/enums.type";
import { useCartTimeArrival } from "../zustand/cartStore";
import { useUpdateHistoryOrderStatus } from "../apis/orders/updateHistoryOrderStatus.api";

export const getTimeEstimateInMs = (timeEstimate: number) => {
  return timeEstimate * 10 * 1000; //10s
};

export const useUpdateOrderStatus = () => {
  const { mutate: updateOrderMutate } = useUpdateHistoryOrderStatus();
  const timeoutIdRef = useRef<number | null>(null);
  const cartTimeArrival = useCartTimeArrival();

  const updateOrderStatus = (
    status: EOrderStatus.COMPLETED | EOrderStatus.CANCELED,
    orderId: string,
  ) => {
    const deliveryTimeInMs = getTimeEstimateInMs(cartTimeArrival);

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    const newTimeoutId = setTimeout(() => {
      updateOrderMutate({ id: orderId, status });
      return true;
    }, deliveryTimeInMs) as unknown as number;

    timeoutIdRef.current = newTimeoutId;
  };

  return { updateOrderStatus };
};
