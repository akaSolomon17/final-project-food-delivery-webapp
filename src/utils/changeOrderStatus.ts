import { EOrderStatus, EToastifyStatus } from "../types/enums.type";
import { useUpdateHistoryOrderStatus } from "../apis/orders/updateHistoryOrderStatus.api";
import { notify } from "../hooks/Toastify/notify";
import { useRef } from "react";
import { useCartTimeArrival } from "../zustand/cartStore";

export const getTimeEstimateInMs = (timeEstimate: number) => {
  return timeEstimate * 60 * 1000;
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
      updateOrderMutate(
        { id: orderId, status },
        {
          onSuccess: () => {
            if (timeoutIdRef.current !== null) {
              clearTimeout(timeoutIdRef.current);
              timeoutIdRef.current = null;
            }
          },
          onError: (e) => {
            notify(`Failed to update order: ${e}`, EToastifyStatus.TOAST_ERROR);
          },
        },
      );
    }, deliveryTimeInMs) as unknown as number;

    timeoutIdRef.current = newTimeoutId;
  };

  return { updateOrderStatus };
};
